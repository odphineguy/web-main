import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

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
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      company, 
      service, 
      description, 
      "cf-turnstile-response": turnstileToken 
    } = body;

    // 1. Verify Turnstile Token
    if (!turnstileToken) {
      return NextResponse.json({ ok: false, error: "Missing verification token" }, { status: 400 });
    }

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
    }

    // 2. Validate Required Fields
    if (!name || !email || !description) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // 3. Send Email (using Resend)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking success.");
      return NextResponse.json({ ok: true, message: "Consultation requested (Mock)" });
    }

    const { data, error } = await resend.emails.send({
      from: "Abe Media Consultation <contact@abemedia.online>",
      to: ["support@abemedia.online"],
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
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        service: service || undefined,
        description,
      });
    } catch (convexError) {
      console.error("Convex save error:", convexError);
      // Don't fail the request if Convex save fails - email was already sent
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Consultation API Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
