import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { asInput, LeadValidationError, optionalString, rejectOversizedRequest, requiredString, validatedEmail } from "@/lib/leadValidation";

// Helper function to verify Turnstile token
async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is missing");
    return false; // Fail open or closed depending on preference; usually fail closed for security
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json() as { success: boolean };
    if (!outcome.success) {
      console.error("Turnstile verification failed:", outcome);
    }
    return outcome.success;
  } catch (e) {
    console.error("Turnstile verification error:", e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    rejectOversizedRequest(req.headers.get("content-length"));
    const body = asInput(await req.json());
    const turnstileToken = requiredString(body, "cf-turnstile-response", 2048);

    // 1. Verify Turnstile Token
    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
    }

    // 2. Validate and pick only expected fields. TypeScript types do not
    // protect an Internet-facing route at runtime.
    const name = requiredString(body, "name", 100);
    const email = validatedEmail(body);
    const subject = optionalString(body, "subject", 80);
    const message = requiredString(body, "message", 5000);
    const referralSource = requiredString(body, "referralSource", 80);
    const landingPage = optionalString(body, "landingPage", 240);
    const firstTouchSource = optionalString(body, "firstTouchSource", 120);
    const utmCampaign = optionalString(body, "utmCampaign", 120);

    // 3. Send Email (using Resend)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking success for demo.");
      // For development without keys, return success to not break the UI
      return NextResponse.json({ ok: true, message: "Message received (Mock)" });
    }

    const { data, error } = await resend.emails.send({
      from: "Abe Media Contact <contact@abemedia.online>",
      to: ["abe@abemedia.online"],
      replyTo: email,
      subject: `New Contact Form: ${subject || "General Inquiry"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        How they heard about Abe Media: ${referralSource}
        First-touch source: ${firstTouchSource || "N/A"}
        Landing page: ${landingPage || "N/A"}
        UTM campaign: ${utmCampaign || "N/A"}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    // 4. Save to Convex database
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      await convex.mutation(api.formSubmissions.saveContactSubmission, {
        serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
        name,
        email,
        subject: subject || undefined,
        message,
        referralSource,
        landingPage,
        firstTouchSource,
        utmCampaign,
      });
    } catch (convexError) {
      console.error("Convex save error:", convexError);
      // Don't fail the request if Convex save fails - email was already sent
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    console.error("Contact API Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
