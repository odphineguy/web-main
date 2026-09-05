import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { Resend } from "resend";
import { api } from "../../../../convex/_generated/api";
import { calculateAuditResult, isAuditAnswer, type AuditAnswers } from "@/lib/aiAudit";
import { buildAuditEmailHtml, buildAuditEmailText, getAuditPlan } from "@/lib/aiAuditReport";
import { createAuditReportToken } from "@/lib/aiAuditReportToken";
import { asInput, LeadValidationError, optionalString, rejectOversizedRequest, requiredString, validatedEmail } from "@/lib/leadValidation";

const labels = {
  en: {
    recommendations: {
      "missed-call": "Recover missed calls with instant text-back and qualification.",
      "after-hours": "Cover after-hours calls, collect details, and escalate urgent requests.",
      bilingual: "Run one consistent intake flow in English and Spanish.",
      intake: "Standardize the required questions and data captured on every call.",
      handoff: "Send complete call summaries into booking, dispatch, or your lead system.",
    },
    subject: "Your AI Call Opportunity Plan | Abe Media",
  },
  es: {
    recommendations: {
      "missed-call": "Recupera llamadas perdidas con texto inmediato y calificación.",
      "after-hours": "Cubre llamadas fuera de horario, recopila datos y escala urgencias.",
      bilingual: "Usa un flujo de intake consistente en inglés y español.",
      intake: "Estandariza las preguntas y datos requeridos en cada llamada.",
      handoff: "Envía resúmenes completos al sistema de citas, dispatch o leads.",
    },
    subject: "Tu Plan de Oportunidad para Llamadas con IA | Abe Media",
  },
} as const;

async function verifyTurnstileToken(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: formData });
    const result = await response.json() as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    rejectOversizedRequest(request.headers.get("content-length"));
    const input = asInput(await request.json());
    const token = requiredString(input, "cf-turnstile-response", 2048);
    if (!await verifyTurnstileToken(token)) {
      return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
    }

    const name = requiredString(input, "name", 100);
    const email = validatedEmail(input);
    const phone = requiredString(input, "phone", 40);
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) throw new LeadValidationError("Invalid phone");
    const locale = input.locale === "es" ? "es" : "en";
    const answerKeys: Array<keyof AuditAnswers> = ["businessType", "missedCalls", "afterHours", "bilingual", "intake"];
    const answers = {} as AuditAnswers;
    for (const key of answerKeys) {
      if (!isAuditAnswer(key, input[key])) throw new LeadValidationError(`Invalid ${key}`);
      Object.assign(answers, { [key]: input[key] });
    }

    const result = calculateAuditResult(answers);
    const text = labels[locale];
    const plan = getAuditPlan(answers, locale);
    const reportToken = createAuditReportToken(answers, locale);
    const reportOrigin = process.env.NODE_ENV === "production" ? "https://abemedia.online" : request.nextUrl.origin;
    const reportUrl = reportToken
      ? `${reportOrigin}/api/ai-audit/report?report=${encodeURIComponent(reportToken)}`
      : null;
    const recommendations = result.recommendationKeys.map((key, index) => `${index + 1}. ${text.recommendations[key]}`).join("\n");
    const auditDetails = [
      `AI opportunity score: ${result.score}/100 (${plan.opportunityLabel})`,
      `Business type: ${answers.businessType}`,
      `Missed calls: ${answers.missedCalls}`,
      `After hours: ${answers.afterHours}`,
      `Bilingual: ${answers.bilingual}`,
      `Intake: ${answers.intake}`,
      "",
      recommendations,
    ].join("\n");

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const safeName = name.replace(/[\r\n]+/g, " ");
      const delivery = await resend.emails.send({
        from: "Abe Media AI Audit <contact@abemedia.online>",
        to: [email],
        replyTo: "abe@abemedia.online",
        subject: text.subject,
        text: buildAuditEmailText({ name: safeName, plan, reportUrl }),
        html: buildAuditEmailHtml({ name: safeName, plan, reportUrl }),
      });
      if (delivery.error) throw new Error("Audit delivery failed");
      const notification = await resend.emails.send({
        from: "Abe Media AI Audit <contact@abemedia.online>",
        to: ["abe@abemedia.online"],
        replyTo: email,
        subject: `New AI audit lead: ${safeName} (${result.score}/100)`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${auditDetails}`,
      });
      if (notification.error) console.error("AI audit owner notification failed", notification.error);
    } else {
      console.warn("RESEND_API_KEY is missing. Mocking AI audit email delivery.");
    }

    try {
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
      if (convexUrl) {
        const convex = new ConvexHttpClient(convexUrl);
        await convex.mutation(api.formSubmissions.saveConsultationSubmission, {
          serverSecret: process.env.FORM_SUBMISSION_SECRET || "",
          name,
          email,
          phone,
          company: answers.businessType,
          service: "ai-readiness-audit",
          description: auditDetails,
          referralSource: "Free AI Audit",
          landingPage: optionalString(input, "landingPage", 240),
          firstTouchSource: optionalString(input, "firstTouchSource", 120),
          utmCampaign: optionalString(input, "utmCampaign", 120),
        });
      }
    } catch (error) {
      console.error("AI audit Convex save failed", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    console.error("AI audit API error", error);
    return NextResponse.json({ ok: false, error: "Unable to deliver the audit right now." }, { status: 500 });
  }
}
