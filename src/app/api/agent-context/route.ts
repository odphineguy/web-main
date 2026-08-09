import { NextRequest, NextResponse } from "next/server";

/**
 * Conversation initiation webhook for the ElevenLabs voice agents.
 *
 * Phone agents have no browser to compute anything for them, and the LLM cannot
 * be trusted to do date arithmetic — asked for "this Monday" it drifts a day, on
 * both haiku-4-5 and sonnet-4-5. So we hand it a literal calendar to read from.
 *
 * ElevenLabs POSTs here at the start of an inbound call and expects
 * `dynamic_variables` to contain every variable the agent's prompt references.
 */

export const dynamic = "force-dynamic";

const AGENT_TZ = "America/Phoenix";
const CALENDAR_DAYS = 15;

function buildDateContext(now: Date): string {
  const format = new Intl.DateTimeFormat("en-US", {
    timeZone: AGENT_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format;
  const days = Array.from({ length: CALENDAR_DAYS }, (_, i) =>
    format(new Date(now.getTime() + i * 86_400_000)),
  );
  return `Today is ${days[0]}. The following days, in order, are: ${days.slice(1).join("; ")}.`;
}

function buildResponse() {
  const now = new Date();
  return NextResponse.json({
    type: "conversation_initiation_client_data",
    dynamic_variables: {
      date_context: buildDateContext(now),
      current_time_local: new Intl.DateTimeFormat("en-US", {
        timeZone: AGENT_TZ,
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(now),
    },
  });
}

export async function POST(request: NextRequest) {
  // Optional shared secret. ElevenLabs can attach it as a request header; when
  // the env var is unset we stay open, since the payload is only a calendar.
  const expected = process.env.AGENT_CONTEXT_SECRET;
  if (expected && request.headers.get("x-agent-context-secret") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return buildResponse();
}

// Convenience for eyeballing what the agents will receive.
export async function GET() {
  return buildResponse();
}
