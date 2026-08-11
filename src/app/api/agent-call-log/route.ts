import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

/**
 * Post-call webhook for the ElevenLabs phone agent on (213) 845-2704.
 * ElevenLabs POSTs a post_call_transcription payload when a call ends; this
 * route stores the transcript as an agentLead (referralSource "phone-agent")
 * and emails Abe a copy via Resend.
 *
 * Auth: x-agent-booking-secret header must equal AGENT_BOOKING_SECRET (same
 * secret as /api/agent-booking so ElevenLabs only needs one header value).
 * Fails closed when the env var is missing.
 */

export const dynamic = "force-dynamic";

interface TranscriptTurn {
  role?: string;
  message?: string | null;
}

function flattenTranscript(turns: unknown): string {
  if (!Array.isArray(turns)) return "";
  return (turns as TranscriptTurn[])
    .filter((t) => t && typeof t.message === "string" && t.message.trim())
    .map((t) => `${t.role === "agent" ? "Agent" : "Caller"}: ${t.message}`)
    .join("\n");
}

export async function POST(req: NextRequest) {
  const expected = process.env.AGENT_BOOKING_SECRET;
  if (!expected || req.headers.get("x-agent-booking-secret") !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > 1_000_000) {
      return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
    }
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // ElevenLabs wraps the conversation data under `data` for webhook events;
  // accept both wrapped and bare shapes so a test payload also works.
  const data = (payload.data ?? payload) as Record<string, unknown>;
  const conversationId = typeof data.conversation_id === "string" ? data.conversation_id : undefined;
  const transcript = flattenTranscript(data.transcript);
  const metadata = (data.metadata ?? {}) as Record<string, unknown>;
  const phoneCall = (metadata.phone_call ?? {}) as Record<string, unknown>;
  const callerNumber =
    typeof phoneCall.external_number === "string"
      ? phoneCall.external_number
      : typeof metadata.caller_id === "string"
        ? (metadata.caller_id as string)
        : undefined;
  const analysis = (data.analysis ?? {}) as Record<string, unknown>;
  const summary = typeof analysis.transcript_summary === "string" ? analysis.transcript_summary : undefined;

  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    await convex.mutation(api.agentLeads.saveAgentLead, {
      serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
      notes: summary,
      referralSource: "phone-agent",
      transcript: transcript || undefined,
      callerNumber,
      conversationId,
    });
  } catch (convexError) {
    console.error("agent-call-log Convex save error:", convexError);
    return NextResponse.json({ ok: false, error: "Failed to store call log." }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Abe Media Phone Agent <contact@abemedia.online>",
        to: ["abe@abemedia.online"],
        subject: `Phone agent call${callerNumber ? ` from ${callerNumber}` : ""}`,
        text: [
          callerNumber ? `Caller: ${callerNumber}` : null,
          conversationId ? `Conversation: ${conversationId}` : null,
          summary ? `\nSummary:\n${summary}` : null,
          transcript ? `\nTranscript:\n${transcript}` : "\n(No transcript in payload)",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (emailError) {
      // The lead is already stored; log and move on.
      console.error("agent-call-log Resend error:", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
