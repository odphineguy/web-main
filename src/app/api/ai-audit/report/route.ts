import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAuditPlan, buildAuditReportHtml } from "@/lib/aiAuditReport";
import { readAuditReportToken } from "@/lib/aiAuditReportToken";

export const dynamic = "force-dynamic";

const securityHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("report") || "";
  const payload = readAuditReportToken(token);

  if (!payload) {
    return new NextResponse(
      "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"noindex,nofollow\"><title>Report unavailable | Abe Media</title></head><body style=\"margin:0;padding:48px;background:#e4e2dd;color:#20242b;font-family:Arial,sans-serif\"><main style=\"max-width:640px;margin:auto;border:1px solid #cbc7bf;background:#fbfaf7;padding:40px\"><b>ABE <span style=\"color:#e34f0b\">MEDIA</span></b><h1>This report link is unavailable.</h1><p>The link may be incomplete or no longer valid. Retake the free audit to generate a new plan.</p><a href=\"https://abemedia.online/en#free-ai-audit\" style=\"color:#e34f0b\">Retake the free audit</a></main></body></html>",
      {
        status: 404,
        headers: { ...securityHeaders, "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }

  const nonce = randomBytes(16).toString("base64");
  const plan = getAuditPlan(payload.answers, payload.locale);
  const html = buildAuditReportHtml({ plan, nonce });

  return new NextResponse(html, {
    headers: {
      ...securityHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": `default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
    },
  });
}
