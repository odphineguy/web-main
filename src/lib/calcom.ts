/**
 * Cal.com API v2 client, shared by /api/agent-booking and the chatbot's
 * booking tool. Endpoint shapes verified against cal.com/docs/api-reference/v2
 * on 2026-08-10:
 *  - GET  /v2/slots     header cal-api-version: 2024-09-04
 *  - POST /v2/bookings  header cal-api-version: 2026-02-25, attendee object
 * Auth for both: Authorization: Bearer <CALCOM_API_KEY>.
 */

const CALCOM_BASE = "https://api.cal.com/v2";
const BUSINESS_TZ = "America/Phoenix";

export class CalcomError extends Error {}

function requireEnv(name: "CALCOM_API_KEY" | "CALCOM_EVENT_TYPE_ID"): string {
  const value = process.env[name];
  if (!value) throw new CalcomError(`${name} is not configured on the server.`);
  return value;
}

export interface AvailableSlot {
  start: string;
}

/** Fetch available slots for the configured event type between two dates (YYYY-MM-DD). */
export async function getAvailableSlots(startDate: string, endDate: string): Promise<Record<string, AvailableSlot[]>> {
  const apiKey = requireEnv("CALCOM_API_KEY");
  const eventTypeId = requireEnv("CALCOM_EVENT_TYPE_ID");
  const params = new URLSearchParams({
    eventTypeId,
    start: startDate,
    end: endDate,
    timeZone: BUSINESS_TZ,
  });
  const res = await fetch(`${CALCOM_BASE}/slots?${params}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-09-04",
    },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.status !== "success") {
    throw new CalcomError(`Cal.com slots request failed (HTTP ${res.status}).`);
  }
  return body.data as Record<string, AvailableSlot[]>;
}

export interface BookingResult {
  uid: string;
  start: string;
  end: string;
  duration: number;
  status: string;
}

/** Create a booking at `startIso` (UTC ISO 8601) for the configured event type. */
export async function createBooking(input: {
  startIso: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  language?: "en" | "es";
}): Promise<BookingResult> {
  const apiKey = requireEnv("CALCOM_API_KEY");
  const eventTypeId = Number(requireEnv("CALCOM_EVENT_TYPE_ID"));
  const res = await fetch(`${CALCOM_BASE}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2026-02-25",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventTypeId,
      start: input.startIso,
      attendee: {
        name: input.name,
        email: input.email,
        timeZone: BUSINESS_TZ,
        language: input.language ?? "en",
        ...(input.phone ? { phoneNumber: input.phone } : {}),
      },
      ...(input.notes ? { metadata: { notes: input.notes.slice(0, 500) } } : {}),
    }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.status !== "success") {
    const message = typeof body?.error?.message === "string" ? body.error.message : `HTTP ${res.status}`;
    throw new CalcomError(`Cal.com booking failed: ${message}`);
  }
  const data = body.data;
  return {
    uid: String(data.uid ?? ""),
    start: String(data.start ?? input.startIso),
    end: String(data.end ?? ""),
    duration: Number(data.duration ?? 0),
    status: String(data.status ?? "accepted"),
  };
}
