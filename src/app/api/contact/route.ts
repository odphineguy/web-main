import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const to = "odphineguy@yahoo.com";
    const subject = `New Contact Message from ${name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fa8130; border-bottom: 2px solid #fa8130; padding-bottom: 10px;">
          New Contact Message
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #fa8130; border-radius: 4px;">
          <p style="margin: 0; color: #333;">
            <strong>Next Steps:</strong> Please respond to this contact message within 24 hours.
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Abe Media <hello@abemedia.online>",
      to,
      subject,
      html,
      replyTo: email,
    });
    if (error) {
      const message = (error as { message?: string } | Error | unknown) &&
        (error as { message?: string }).message
          ? (error as { message: string }).message
          : error instanceof Error
            ? error.message
            : String(error);
      console.error("Resend error", error);
      return NextResponse.json({ ok: false, error: message }, { status: 502 });
    }
    return NextResponse.json({ ok: true, result: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


