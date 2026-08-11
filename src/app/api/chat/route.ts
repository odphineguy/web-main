import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { buildSystemPrompt } from "@/lib/agent-knowledge";
import { getAvailableSlots, createBooking, CalcomError } from "@/lib/calcom";
import type { Message } from "@/lib/types";

export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5";
const MAX_TOOL_ROUNDS = 4;

interface ChatRequestBody {
  messages: Message[];
  lang?: "en" | "es";
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: "get_available_slots",
    description:
      "Fetch available consultation slots from the calendar. Call this before offering times. Dates are YYYY-MM-DD; keep the range within the next 14 days.",
    input_schema: {
      type: "object",
      properties: {
        startDate: { type: "string", description: "First day to check, YYYY-MM-DD" },
        endDate: { type: "string", description: "Last day to check, YYYY-MM-DD" },
      },
      required: ["startDate", "endDate"],
    },
  },
  {
    name: "book_consultation",
    description:
      "Book a free consultation call at one of the slots returned by get_available_slots. Requires the visitor's name and email. startIso must be the exact slot start time in ISO 8601 as returned by get_available_slots.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        startIso: { type: "string", description: "Exact slot start, ISO 8601" },
        notes: { type: "string", description: "Business type, pain point, timeline - anything learned" },
      },
      required: ["name", "email", "startIso"],
    },
  },
  {
    name: "capture_lead",
    description:
      "Save the visitor's details and the conversation so Abe can follow up personally. Call when you have contact details, when the visitor asks for human follow-up, or when their question is beyond your knowledge.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        company: { type: "string" },
        notes: { type: "string", description: "What they need and why Abe should follow up" },
      },
      required: ["notes"],
    },
  },
];

function transcriptFrom(messages: Message[]): string {
  return messages
    .map((m) => `${m.role === "model" ? "Assistant" : "Visitor"}: ${m.text}`)
    .join("\n")
    .slice(0, 90_000);
}

async function saveLead(args: {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  notes?: string;
  lang: string;
  transcript: string;
  bookingUid?: string;
  bookingStart?: string;
}) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  await convex.mutation(api.agentLeads.saveAgentLead, {
    serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
    name: args.name,
    email: args.email,
    phone: args.phone,
    company: args.company,
    notes: args.notes,
    language: args.lang,
    referralSource: "site-chat",
    transcript: args.transcript,
    bookingUid: args.bookingUid,
    bookingStart: args.bookingStart,
  });
}

async function emailTranscript(subject: string, args: { notes?: string; transcript: string; contact?: string }) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Abe Media Chat <contact@abemedia.online>",
    to: ["abe@abemedia.online"],
    subject,
    text: [
      args.contact ? `Contact: ${args.contact}` : null,
      args.notes ? `Notes: ${args.notes}` : null,
      `\nTranscript:\n${args.transcript}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

async function runTool(
  name: string,
  input: Record<string, unknown>,
  context: { lang: string; transcript: string },
): Promise<string> {
  const str = (key: string, max: number) => {
    const value = input[key];
    return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : undefined;
  };

  if (name === "get_available_slots") {
    const startDate = str("startDate", 10);
    const endDate = str("endDate", 10);
    if (!startDate || !endDate) return JSON.stringify({ error: "startDate and endDate are required." });
    const slots = await getAvailableSlots(startDate, endDate);
    return JSON.stringify({ timeZoneNote: "Slot times are for America/Phoenix.", slots });
  }

  if (name === "book_consultation") {
    const nameArg = str("name", 100);
    const email = str("email", 254);
    const startIso = str("startIso", 40);
    if (!nameArg || !email || !startIso || Number.isNaN(Date.parse(startIso))) {
      return JSON.stringify({ error: "name, email, and a valid ISO startIso are required." });
    }
    const booking = await createBooking({
      startIso,
      name: nameArg,
      email,
      phone: str("phone", 40),
      notes: str("notes", 2000),
      language: context.lang === "es" ? "es" : "en",
    });
    try {
      await saveLead({
        name: nameArg,
        email,
        phone: str("phone", 40),
        notes: str("notes", 2000),
        lang: context.lang,
        transcript: context.transcript,
        bookingUid: booking.uid,
        bookingStart: booking.start,
      });
      await emailTranscript(`Chat booked a call: ${nameArg}`, {
        contact: `${nameArg} <${email}>`,
        notes: str("notes", 2000),
        transcript: context.transcript,
      });
    } catch (sideEffectError) {
      console.error("chat booking side-effect error:", sideEffectError);
    }
    return JSON.stringify({ booked: true, start: booking.start, end: booking.end, status: booking.status });
  }

  if (name === "capture_lead") {
    const notes = str("notes", 2000);
    const nameArg = str("name", 100);
    const email = str("email", 254);
    await saveLead({
      name: nameArg,
      email,
      phone: str("phone", 40),
      company: str("company", 160),
      notes,
      lang: context.lang,
      transcript: context.transcript,
    });
    try {
      await emailTranscript(`Chat lead${nameArg ? `: ${nameArg}` : ""}`, {
        contact: [nameArg, email, str("phone", 40)].filter(Boolean).join(" / ") || undefined,
        notes,
        transcript: context.transcript,
      });
    } catch (emailError) {
      console.error("chat lead email error:", emailError);
    }
    return JSON.stringify({ saved: true });
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured on the server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: ChatRequestBody;
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > 60_000) {
      return new Response(JSON.stringify({ error: "Request body is too large." }), {
        status: 413,
        headers: { "Content-Type": "application/json" },
      });
    }
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages = [], lang = "en" } = body;
  if (!Array.isArray(messages) || !["en", "es"].includes(lang)) {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const safeMessages = messages
    .slice(-24)
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "model") &&
        typeof m.text === "string" &&
        m.text.length > 0 &&
        m.text.length <= 4000,
    );
  if (
    safeMessages.length === 0 ||
    safeMessages[safeMessages.length - 1].role !== "user" ||
    safeMessages.reduce((total, m) => total + m.text.length, 0) > 30_000
  ) {
    return new Response(JSON.stringify({ error: "Invalid message history." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });
  const context = { lang, transcript: transcriptFrom(safeMessages) };

  const history: Anthropic.MessageParam[] = safeMessages.map((m) => ({
    role: m.role === "model" ? ("assistant" as const) : ("user" as const),
    content: m.text,
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const messageStream = client.messages.stream({
            model: MODEL,
            max_tokens: 1024,
            system: [
              {
                type: "text",
                text: buildSystemPrompt(),
                cache_control: { type: "ephemeral" },
              },
            ],
            tools: TOOLS,
            messages: history,
          });

          messageStream.on("text", (delta) => {
            controller.enqueue(encoder.encode(delta));
          });

          const finalMessage = await messageStream.finalMessage();

          if (finalMessage.stop_reason !== "tool_use" || round === MAX_TOOL_ROUNDS) {
            break;
          }

          history.push({ role: "assistant", content: finalMessage.content });
          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const block of finalMessage.content) {
            if (block.type !== "tool_use") continue;
            let result: string;
            try {
              result = await runTool(block.name, block.input as Record<string, unknown>, context);
            } catch (toolError) {
              const message =
                toolError instanceof CalcomError ? toolError.message : "The tool failed. Apologize and offer the contact page instead.";
              console.error(`chat tool ${block.name} error:`, toolError);
              result = JSON.stringify({ error: message });
            }
            toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
          }
          history.push({ role: "user", content: toolResults });
        }
        controller.close();
      } catch (err) {
        console.error("Anthropic chat error:", err instanceof Error ? err.message : "Unknown error");
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
