import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { getAvailableSlots, createBooking, CalcomError } from "@/lib/calcom";
import { asInput, LeadValidationError, optionalString, rejectOversizedRequest, requiredString, validatedEmail } from "@/lib/leadValidation";

/**
 * Booking endpoint shared by the ElevenLabs phone agent (webhook tool) and
 * the site chatbot's server route. Two actions on one POST:
 *
 *  { "action": "slots", "startDate": "2026-08-11", "endDate": "2026-08-15" }
 *    -> { ok, slots: { "2026-08-11": [{ start }...], ... } }
 *
 *  { "action": "book" (default), name, email, phone?, preferredTime (UTC ISO),
 *    notes?, language?, referralSource? }
 *    -> { ok, booking: { uid, start, end, duration, status } }
 *
 * Auth: x-agent-booking-secret header must equal AGENT_BOOKING_SECRET.
 * Unlike agent-context, this endpoint mutates state, so a missing env var
 * fails closed.
 */

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const expected = process.env.AGENT_BOOKING_SECRET;
  if (!expected || req.headers.get("x-agent-booking-secret") !== expected) {
    return unauthorized();
  }

  try {
    rejectOversizedRequest(req.headers.get("content-length"));
    const body = asInput(await req.json());
    const action = optionalString(body, "action", 20) ?? "book";

    if (action === "slots") {
      const startDate = requiredString(body, "startDate", 10);
      const endDate = requiredString(body, "endDate", 10);
      const slots = await getAvailableSlots(startDate, endDate);
      return NextResponse.json({ ok: true, slots });
    }

    if (action !== "book") {
      return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
    }

    const name = requiredString(body, "name", 100);
    const email = validatedEmail(body);
    const phone = optionalString(body, "phone", 40);
    const preferredTime = requiredString(body, "preferredTime", 40);
    const notes = optionalString(body, "notes", 2000);
    const languageRaw = optionalString(body, "language", 5);
    const language = languageRaw === "es" ? "es" : "en";
    const referralSourceRaw = optionalString(body, "referralSource", 40);
    const referralSource = referralSourceRaw === "site-chat" ? "site-chat" : "phone-agent";

    if (Number.isNaN(Date.parse(preferredTime))) {
      return NextResponse.json({ ok: false, error: "preferredTime must be an ISO 8601 datetime." }, { status: 400 });
    }

    const booking = await createBooking({
      startIso: preferredTime,
      name,
      email,
      phone,
      notes,
      language,
    });

    // Lead write is best-effort: the booking already exists, so a Convex
    // hiccup should not fail the request.
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      await convex.mutation(api.agentLeads.saveAgentLead, {
        serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
        name,
        email,
        phone,
        notes,
        language,
        referralSource,
        bookingUid: booking.uid,
        bookingStart: booking.start,
      });
    } catch (convexError) {
      console.error("agent-booking Convex save error:", convexError);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    if (error instanceof CalcomError) {
      console.error("agent-booking Cal.com error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }
    console.error("agent-booking error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
