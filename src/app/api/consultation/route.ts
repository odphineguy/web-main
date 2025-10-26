import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, service, description, budget } = await req.json();
    
    if (!name || !email || !description) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    const to = "odphineguy@yahoo.com";
    const subject = `New Consultation Request from ${name}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fa8130; border-bottom: 2px solid #fa8130; padding-bottom: 10px;">
          New Consultation Request
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Project Details</h3>
          ${service ? `<p><strong>Service Interest:</strong> ${service.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>` : ''}
          ${budget ? `<p><strong>Budget Range:</strong> ${budget.replace('-', ' - ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>` : ''}
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Project Description</h3>
          <div style="white-space: pre-wrap; line-height: 1.6;">${description}</div>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #fa8130; border-radius: 4px;">
          <p style="margin: 0; color: #333;">
            <strong>Next Steps:</strong> Please contact this client within 24 hours to schedule their free consultation.
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
    console.error("Consultation API error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
