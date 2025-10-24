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
    const subject = `New contact from ${name}`;
    const html = `
      <div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap">${message}</pre>
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


