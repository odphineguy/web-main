import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

/**
 * Post-call webhook for the ElevenLabs phone agent on (213) 845-2704.
 * ElevenLabs POSTs a post_call_transcription payload when a call ends; this
 * route stores the transcript as an agentLead (referralSource "phone-agent")
 * and emails Abe a copy via Resend.
 *
 * Auth, either of:
 *  - x-agent-booking-secret header equal to AGENT_BOOKING_SECRET (manual
 *    tests, curl), or
 *  - a valid ElevenLabs-Signature HMAC header verified against
 *    ELEVENLABS_WEBHOOK_SECRET (whsec_... from the ElevenLabs webhook UI) -
 *    ElevenLabs post-call webhooks sign requests instead of sending custom
 *    headers. Format: "t=<unix>,v0=<hex hmac_sha256(secret, `${t}.${body}`)>".
 * Fails closed when neither env var matches.
 */

export const dynamic = "force-dynamic";

function verifyElevenLabsSignature(rawBody: string, header: string | null, secret: string | undefined): boolean {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const idx = p.indexOf("=");
      return [p.slice(0, idx).trim(), p.slice(idx + 1).trim()];
    }),
  ) as { t?: string; v0?: string };
  if (!parts.t || !parts.v0) return false;
  const timestamp = Number(parts.t);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 30 * 60) return false;
  const expected = createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest("hex");
  const provided = parts.v0.replace(/^sha256=/, "");
  if (expected.length !== provided.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(provided, "hex"));
  } catch {
    return false;
  }
}

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
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > 1_000_000) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }
  const rawBody = await req.text();

  const sharedSecret = process.env.AGENT_BOOKING_SECRET;
  const headerAuthorized = Boolean(sharedSecret && req.headers.get("x-agent-booking-secret") === sharedSecret);
  const hmacAuthorized = verifyElevenLabsSignature(
    rawBody,
    req.headers.get("elevenlabs-signature"),
    process.env.ELEVENLABS_WEBHOOK_SECRET,
  );
  if (!headerAuthorized && !hmacAuthorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
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
