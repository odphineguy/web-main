import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
    const body = await req.json();
    const { name, email, subject, message, "cf-turnstile-response": turnstileToken } = body;

    // 1. Verify Turnstile Token
    if (!turnstileToken) {
      return NextResponse.json({ ok: false, error: "Missing verification token" }, { status: 400 });
    }

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
    }

    // 2. Validate Fields
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // 3. Send Email (using Resend)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking success for demo.");
      // For development without keys, return success to not break the UI
      return NextResponse.json({ ok: true, message: "Message received (Mock)" });
    }

    const { data, error } = await resend.emails.send({
      from: "Abe Media Contact <onboarding@resend.dev>", // Update this to your verified domain later
      to: ["support@abemedia.online"], // Your support email
      replyTo: email,
      subject: `New Contact Form: ${subject || "General Inquiry"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
