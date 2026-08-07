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
    return false;
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

    // 2. Runtime validation and explicit field allowlist.
    const name = requiredString(body, "name", 100);
    const email = validatedEmail(body);
    const phone = optionalString(body, "phone", 40);
    const company = optionalString(body, "company", 160);
    const service = optionalString(body, "service", 80);
    const description = requiredString(body, "description", 6000);
    const referralSource = requiredString(body, "referralSource", 80);
    const landingPage = optionalString(body, "landingPage", 240);
    const firstTouchSource = optionalString(body, "firstTouchSource", 120);
    const utmCampaign = optionalString(body, "utmCampaign", 120);

    // 3. Send Email (using Resend)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking success.");
      return NextResponse.json({ ok: true, message: "Consultation requested (Mock)" });
    }

    const { data, error } = await resend.emails.send({
      from: "Abe Media Consultation <contact@abemedia.online>",
      to: ["abe@abemedia.online"],
      replyTo: email,
      subject: `New Consultation Request: ${name} (${company || "Individual"})`,
      text: `
        New Consultation Request
        ------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Company: ${company || "N/A"}
        Service Interest: ${service || "Not specified"}
        How they heard about Abe Media: ${referralSource}
        First-touch source: ${firstTouchSource || "N/A"}
        Landing page: ${landingPage || "N/A"}
        UTM campaign: ${utmCampaign || "N/A"}
        
        Project Description:
        ${description}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    // 4. Save to Convex database
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      await convex.mutation(api.formSubmissions.saveConsultationSubmission, {
        serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        service: service || undefined,
        description,
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
    console.error("Consultation API Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
