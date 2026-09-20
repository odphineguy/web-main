import { readFileSync } from "node:fs";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";

const WIDGET_URI = "ui://abemedia-chatgpt-plugin/call-coverage-v2.html";
const widgetHtml = readFileSync(join(process.cwd(), "src", "ui", "index.html"), "utf8");
const bookingUrl = "https://abemedia.online/en#contact";

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

// --- Lead delivery ---
function isValidPhone(value: string) {
  return (value.match(/\d/g) ?? []).length >= 10;
}

async function persistLead(input: Record<string, string>) {
  const convexUrl = process.env.CONVEX_URL;
  const secret = process.env.CHATGPT_PLUGIN_SUBMISSION_SECRET;
  if (!convexUrl || !secret) return { ok: false, detail: "Convex env not configured — persistence skipped." };
  const response = await fetch(`${convexUrl}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: "formSubmissions:saveConsultationSubmission",
      args: {
        serverSecret: secret,
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.businessName,
        service: input.primaryNeed,
        description: `ChatGPT app lead. Business type: ${input.businessType}. Timeline: ${input.timeline}. Consent explicitly confirmed in ChatGPT.`,
        referralSource: "chatgpt-app",
        firstTouchSource: "chatgpt-app",
        landingPage: "chatgpt://abemedia-chatgpt-plugin",
      },
      format: "json",
    }),
  });
  if (!response.ok) {
    return { ok: false, detail: `Convex mutation failed with status ${response.status}.` };
  }
  const result = (await response.json().catch(() => null)) as { status?: string; errorMessage?: string } | null;
  if (result?.status === "error") return { ok: false, detail: `Convex mutation error: ${result.errorMessage ?? "unknown"}` };
  return { ok: true, detail: "Persisted to Convex consultationSubmissions." };
}

async function emailLead(input: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  if (!apiKey) return { ok: false, detail: "RESEND_API_KEY not configured — email skipped." };
  if (!to) return { ok: false, detail: "LEAD_EMAIL not configured — email skipped." };
  const esc = (v: string) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const row = (label: string, value: string) => `<tr><td style="padding:6px 14px 6px 0;color:#666;font-size:13px">${label}</td><td style="padding:6px 0;color:#111;font-size:14px;font-weight:600">${esc(value)}</td></tr>`;
  const html = `<div style="max-width:560px;margin:0 auto;font-family:sans-serif;border:1px solid #eee;border-radius:12px;padding:24px"><h1 style="font-size:19px;margin:0 0 4px">New Abe Media Lead — ChatGPT App</h1><p style="color:#888;font-size:12px;margin:0 0 16px">${esc(new Date().toISOString())}</p><table style="border-collapse:collapse;width:100%">${row("Name", input.name)}${row("Phone", input.phone)}${row("Email", input.email)}${row("Business", input.businessName)}${row("Type", input.businessType)}${row("Primary need", input.primaryNeed)}${row("Timeline", input.timeline)}${row("Consent", "Explicitly confirmed in ChatGPT")}</table></div>`;
  const from = process.env.LEAD_FROM_EMAIL || "Abe Media ChatGPT Plugin <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: `New Abe Media Lead — ${input.name} — ${input.primaryNeed}`, html }),
  });
  if (!response.ok) {
    return { ok: false, detail: `Resend send failed with status ${response.status}.` };
  }
  return { ok: true, detail: `Emailed lead to ${to}.` };
}

async function submitLead(input: Record<string, string>) {
  const persisted = await persistLead(input).catch((error) => ({
    ok: false,
    detail: `Convex mutation threw: ${error instanceof Error ? error.message : String(error)}`,
  }));
  if (!persisted.ok) {
    console.error("[submit_lead]", persisted.detail);
    throw new Error("We could not securely save this follow-up request. Please try again or use the Abe Media website.");
  }

  const emailed = await emailLead(input).catch((error) => ({
    ok: false,
    detail: `Resend send threw: ${error instanceof Error ? error.message : String(error)}`,
  }));
  if (!emailed.ok) console.error("[submit_lead]", emailed.detail);
}
// --- end lead delivery ---

const businessTypes = ["HVAC", "plumbing", "electrical", "landscaping", "turf", "junk removal", "hauling", "transportation", "other"] as const;
const calculatorIndustries = ["junk removal", "hvac", "plumbing", "moving", "turf", "waste", "other"] as const;
const nonNegativeInteger = z.number().int().min(0).max(100_000);
const nonNegativeCurrency = z.number().min(0).max(10_000_000);

// Mirrors src/components/MissedCallCalculator.tsx in the Abe Media website.
// Keep these values in sync until both products consume a shared config source.
const afterHoursDefaults = {
  "junk removal": { closeRatePercent: 55, averageTicket: 400 },
  hvac: { closeRatePercent: 50, averageTicket: 450 },
  plumbing: { closeRatePercent: 55, averageTicket: 350 },
  moving: { closeRatePercent: 40, averageTicket: 1500 },
  turf: { closeRatePercent: 40, averageTicket: 3800 },
  waste: { closeRatePercent: 50, averageTicket: 500 },
  other: { closeRatePercent: 40, averageTicket: 500 },
} as const;

type CalculatorIndustry = keyof typeof afterHoursDefaults;

function calculatorIndustryForBusiness(businessType: (typeof businessTypes)[number]): CalculatorIndustry {
  if (businessType === "HVAC") return "hvac";
  if (businessType === "plumbing") return "plumbing";
  if (businessType === "turf" || businessType === "landscaping") return "turf";
  if (businessType === "junk removal" || businessType === "hauling") return "junk removal";
  if (businessType === "transportation") return "moving";
  return "other";
}

function resolveCalculatorAssumptions(industry: CalculatorIndustry, estimatedCloseRatePercent?: number, averageJobValue?: number) {
  const defaults = afterHoursDefaults[industry];
  return {
    industry,
    estimatedCloseRatePercent: estimatedCloseRatePercent ?? defaults.closeRatePercent,
    averageJobValue: averageJobValue ?? defaults.averageTicket,
    usedWebsiteCloseRateDefault: estimatedCloseRatePercent === undefined,
    usedWebsiteAverageTicketDefault: averageJobValue === undefined,
  };
}

const assessmentSchema = z.object({
  responseLanguage: z.enum(["English", "Spanish"]).optional().describe("Language for the scorecard and result text. Use Spanish when the user is speaking Spanish; otherwise use English."),
  businessType: z.enum(businessTypes).describe("The closest service-business category."),
  weeklyInboundCalls: nonNegativeInteger.describe("Average inbound calls per week, including after-hours calls."),
  weeklyMissedCalls: nonNegativeInteger.describe("Average calls per week that receive no same-day response."),
  averageJobValue: nonNegativeCurrency.optional().describe("Typical completed-job value in US dollars. If omitted, use the matching Abe Media website calculator's industry default."),
  estimatedCloseRatePercent: z.number().min(0).max(100).optional().describe("Estimated percent of qualified calls that become completed jobs. If omitted, use the matching Abe Media website calculator's industry default."),
  afterHoursCoverage: z.enum(["none", "voicemail", "on-call person", "live answering", "ai agent"]).describe("How inbound calls are handled outside normal business hours."),
  bookingMethod: z.enum(["none", "manual callback", "calendar", "crm or field service platform"]).describe("The usual method for moving a qualified lead to an appointment or follow-up."),
  spanishDemand: z.enum(["none", "occasional", "regular"]).describe("How often callers need Spanish-language support."),
  dispatchNeeds: z.enum(["none", "next business day", "same day", "emergency"]).describe("The fastest response category the business routinely handles."),
});
const assessmentInput = assessmentSchema.shape;

function monthlyOpportunity(missedCalls: number, closeRate: number, averageJobValue: number) {
  const rawMonthlyMissedCalls = missedCalls * 4.33;
  const estimatedCompletedJobs = Math.round(rawMonthlyMissedCalls * (closeRate / 100) * 10) / 10;
  const estimatedMonthlyValue = Math.round(rawMonthlyMissedCalls * (closeRate / 100) * averageJobValue);
  const monthlyMissedCalls = Math.round(rawMonthlyMissedCalls);
  return { monthlyMissedCalls, estimatedCompletedJobs, estimatedMonthlyValue };
}

function automationRecommendation(input: z.infer<typeof assessmentSchema>, spanish: boolean) {
  const recommendations: string[] = [];
  if (input.afterHoursCoverage === "none" || input.afterHoursCoverage === "voicemail") recommendations.push(spanish ? "Agente de voz con IA fuera del horario, con saludo aprobado, flujo de calificación y reglas de escalamiento a una persona." : "After-hours AI voice agent with an approved greeting, qualification flow, and human escalation rules.");
  if (input.bookingMethod === "none" || input.bookingMethod === "manual callback") recommendations.push(spanish ? "Flujo de agenda o CRM para que cada prospecto calificado reciba un siguiente paso mientras el equipo está ocupado." : "Calendar or CRM-connected booking workflow so qualified callers receive a defined next step while the team is busy.");
  if (input.spanishDemand === "regular") recommendations.push(spanish ? "Flujo bilingüe en inglés y español, escrito para los servicios y el área de cobertura reales del negocio." : "Bilingual English/Spanish intake flow written for the business's actual services and service area.");
  if (input.dispatchNeeds === "same day" || input.dispatchNeeds === "emergency") recommendations.push(spanish ? "Clasificación de urgencia y entrega a despacho, con una ruta documentada para escalar al personal de guardia." : "Urgency classification and dispatch handoff workflow with a documented on-call escalation path.");
  return recommendations.length ? recommendations : [spanish ? "Revisa el manejo de llamadas, las citas y las entregas al CRM con una evaluación corta de cobertura." : "Review existing call handling, booking, and CRM handoffs with a short coverage audit."];
}

export function createAbeMediaServer() {
  const server = new McpServer(
    { name: "abemedia-chatgpt-plugin", version: "0.2.0" },
    {
      instructions: "Use owner-provided aggregate business estimates only. Never request or process customer, caller, payment, health, password, or government-ID data. Present calculations as planning estimates, not promised revenue. Emergency workflows always require a business-approved human escalation path. Before requesting contact fields, ask: \"Do you confirm Abe Media may collect your contact details and business information for follow-up?\" Call submit_lead only after explicit confirmation and after every required field is provided. Help service-business owners assess lead coverage before recommending a solution. Abe Media provides bilingual AI voice agents, lead automation, and dispatch platforms. When a real coverage gap is found, offer the free AI Readiness Audit once as a relevant next step, never as a repeated sales pitch. The scheduling tool only returns a public URL and submits nothing.",
    },
  );

  registerAppResource(server, "Abe Media ChatGPT Plugin", WIDGET_URI, {
    description: "A concise visual summary of service-business lead coverage recommendations.",
  }, async () => ({
    contents: [{
      uri: WIDGET_URI,
      mimeType: RESOURCE_MIME_TYPE,
      text: widgetHtml,
      _meta: {
        ui: {
          prefersBorder: true,
          domain: "https://abemedia.online",
          csp: { connectDomains: [], resourceDomains: [] },
        },
      },
    }],
  }));

  const widgetMeta = {
    ui: { resourceUri: WIDGET_URI },
    "openai/outputTemplate": WIDGET_URI,
    "openai/toolInvocation/invoking": "Checking your call coverage…",
    "openai/toolInvocation/invoked": "Call coverage checked.",
  };
  registerAppTool(server, "assess_call_coverage", {
    title: "Assess service-business call coverage",
    description: "Use this when a service-business owner wants a complete call-coverage check using their aggregate call-handling numbers. Returns a visual scorecard, specific gaps, recommended priorities, and transparent missed-call opportunity math. Do not use it for a single calculation when estimate_missed_call_value is sufficient. Never enter customer or caller details.",
    inputSchema: assessmentInput,
    outputSchema: {
      coverageScore: z.number(), band: z.string(), gaps: z.array(z.string()), priorities: z.array(z.string()), monthlyOpportunity: z.object({ monthlyMissedCalls: z.number(), estimatedCompletedJobs: z.number(), estimatedMonthlyValue: z.number() }), calculatorAssumptions: z.object({ industry: z.string(), estimatedCloseRatePercent: z.number(), averageJobValue: z.number(), usedWebsiteCloseRateDefault: z.boolean(), usedWebsiteAverageTicketDefault: z.boolean() }), disclaimer: z.string(),
    },
    annotations: { title: "Assess call coverage", ...readOnlyAnnotations }, _meta: widgetMeta,
  }, async (input) => {
    const spanish = input.responseLanguage === "Spanish";
    if (input.weeklyInboundCalls > 0 && input.weeklyMissedCalls > input.weeklyInboundCalls) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: spanish ? "Las llamadas perdidas por semana no pueden superar el total de llamadas recibidas. Revisa esos dos números." : "Weekly missed calls cannot be greater than total weekly inbound calls. Please check those two numbers." }],
      };
    }
    let score = 100;
    const gaps: string[] = [];
    if (input.afterHoursCoverage === "none") { score -= 35; gaps.push(spanish ? "No hay una cobertura definida fuera del horario." : "No defined after-hours coverage."); }
    if (input.afterHoursCoverage === "voicemail") { score -= 25; gaps.push(spanish ? "Fuera del horario, las llamadas llegan al buzón de voz en lugar de pasar por un flujo de calificación o enrutamiento." : "After-hours callers reach voicemail instead of a qualification or routing path."); }
    if (input.bookingMethod === "none") { score -= 20; gaps.push(spanish ? "Los prospectos calificados no tienen una ruta inmediata para agendar." : "Qualified callers have no immediate booking path."); }
    if (input.bookingMethod === "manual callback") { score -= 10; gaps.push(spanish ? "Las citas dependen de una devolución de llamada manual, lo que puede retrasar la respuesta mientras el equipo está ocupado." : "Booking depends on a manual callback, which can delay response while crews are busy."); }
    if (input.spanishDemand === "regular") { score -= 12; gaps.push(spanish ? "La demanda regular en español necesita una ruta bilingüe de cobertura documentada." : "Regular Spanish-language demand needs a documented bilingual coverage path."); }
    if (input.dispatchNeeds === "same day" || input.dispatchNeeds === "emergency") { score -= 12; gaps.push(spanish ? "El trabajo urgente necesita reglas de prioridad y escalamiento aprobadas por el negocio." : "Time-sensitive work needs business-approved urgency and escalation rules."); }
    if (input.weeklyInboundCalls > 0 && input.weeklyMissedCalls / input.weeklyInboundCalls > 0.1) { score -= 15; gaps.push(spanish ? "Más del 10% de las llamadas recibidas reportadas no reciben respuesta el mismo día." : "More than 10% of reported inbound calls are not receiving a same-day response."); }
    score = Math.max(0, score);
    const band = spanish
      ? score >= 80 ? "Buena base operativa" : score >= 55 ? "Hay brechas de cobertura" : "Alto riesgo de perder prospectos"
      : score >= 80 ? "Strong foundation" : score >= 55 ? "Coverage gaps to address" : "High risk of lead leakage";
    const calculatorAssumptions = resolveCalculatorAssumptions(calculatorIndustryForBusiness(input.businessType), input.estimatedCloseRatePercent, input.averageJobValue);
    const priorities = automationRecommendation(input, spanish);
    if (score < 80) priorities.push(spanish ? "Evaluación gratuita de preparación para IA de Abe Media. Mapea el flujo de llamadas y prospectos, identifica las mejores oportunidades de automatización y estima el impacto antes de construir. Usa request_ai_readiness_audit o visita " + bookingUrl + "." : "Free AI Readiness Audit from Abe Media. It maps your call and lead workflow, identifies the best automation opportunities, and estimates the impact before anything is built. Use request_ai_readiness_audit or visit " + bookingUrl + ".");
    return {
      structuredContent: { coverageScore: score, band, gaps, priorities, monthlyOpportunity: monthlyOpportunity(input.weeklyMissedCalls, calculatorAssumptions.estimatedCloseRatePercent, calculatorAssumptions.averageJobValue), calculatorAssumptions, disclaimer: spanish ? "Es una estimación para planificación. Los resultados reales dependen de la calidad de los prospectos, el tiempo de respuesta, el personal, los precios y la ejecución." : "Planning estimate only. Actual results depend on lead quality, response time, staffing, pricing, and execution." },
      content: [{ type: "text", text: spanish ? `Puntuación de cobertura: ${score}/100. ${band}. Revisa las brechas y prioridades del plan.` : `Coverage score: ${score}/100. ${band}. Review the structured plan for gaps and priorities.` }],
    };
  });

  server.registerTool("estimate_missed_call_value", {
    title: "Estimate missed-call opportunity",
    description: "Use this when the user only wants a quick dollar estimate for missed calls, without a full coverage assessment. Uses the same industry defaults and formula as the Abe Media website calculator, while allowing the owner to supply a real close rate or average ticket. Do not use for general revenue forecasting. Returns planning math, not a revenue promise.",
    inputSchema: {
      weeklyMissedCalls: nonNegativeInteger.describe("Average inbound calls per week that receive no same-day response."),
      industry: z.enum(calculatorIndustries).optional().describe("Industry used to select the same starting close rate and average ticket as the Abe Media website calculator. Defaults to other when unknown."),
      estimatedCloseRatePercent: z.number().min(0).max(100).optional().describe("Optional override for the website calculator's industry-default close rate."),
      averageJobValue: nonNegativeCurrency.optional().describe("Optional override for the website calculator's industry-default average ticket in US dollars."),
    },
    outputSchema: { monthlyMissedCalls: z.number(), estimatedCompletedJobs: z.number(), estimatedMonthlyValue: z.number(), calculatorAssumptions: z.object({ industry: z.string(), estimatedCloseRatePercent: z.number(), averageJobValue: z.number(), usedWebsiteCloseRateDefault: z.boolean(), usedWebsiteAverageTicketDefault: z.boolean() }), formula: z.string(), disclaimer: z.string() },
    annotations: { title: "Estimate missed-call value", ...readOnlyAnnotations },
  }, async (input) => {
    const calculatorAssumptions = resolveCalculatorAssumptions(input.industry ?? "other", input.estimatedCloseRatePercent, input.averageJobValue);
    const value = monthlyOpportunity(input.weeklyMissedCalls, calculatorAssumptions.estimatedCloseRatePercent, calculatorAssumptions.averageJobValue);
    return { structuredContent: { ...value, calculatorAssumptions, formula: "weekly missed calls × 4.33 × close rate × average ticket", disclaimer: "Planning estimate only; it is not a forecast or guarantee." }, content: [{ type: "text", text: `Estimated monthly opportunity: $${value.estimatedMonthlyValue.toLocaleString()} (planning estimate).` }] };
  });

  server.registerTool("build_intake_playbook", {
    title: "Build an intake and escalation playbook",
    description: "Use this when a service-business owner wants a practical phone or messaging intake playbook with collection, routing, booking, and human-escalation steps. Do not use it to handle a live emergency or to process a real caller's personal details. The output is an internal draft that the owner must approve before live use.",
    inputSchema: {
      businessType: z.enum(businessTypes).describe("The closest service-business category."),
      services: z.array(z.string().min(1).max(80)).min(1).max(12).describe("Service categories the business wants the intake flow to handle, such as repair, installation, or estimates."),
      businessHours: z.string().min(3).max(120).describe("The business's stated operating hours, for example Monday–Friday 8 AM–5 PM."),
      languages: z.array(z.enum(["English", "Spanish"])).min(1).describe("Languages the approved intake flow needs to support."),
      dispatchNeeds: z.enum(["none", "next business day", "same day", "emergency"]).describe("The fastest response category the business routinely handles."),
      bookingMethod: z.enum(["manual callback", "calendar", "crm or field service platform"]).describe("How the business will follow up or book a qualified caller."),
      humanEscalationContactRole: z.string().min(2).max(80).describe("Role, not a person's name or phone number, responsible for approving or receiving escalations; for example, on-call dispatcher."),
    },
    outputSchema: { opening: z.string(), collect: z.array(z.string()), routing: z.array(z.string()), escalation: z.array(z.string()), bookingHandoff: z.string(), reviewChecklist: z.array(z.string()), disclaimer: z.string() },
    annotations: { title: "Build intake playbook", ...readOnlyAnnotations },
  }, async (input) => {
    const bilingual = input.languages.includes("Spanish");
    const urgent = input.dispatchNeeds === "same day" || input.dispatchNeeds === "emergency";
    const result = {
      opening: `Thank the caller, state the ${input.businessType} business name, confirm whether they prefer English${bilingual ? " or Spanish" : ""}, and say the team will identify the right next step.`,
      collect: ["Caller name and preferred callback number", "Service address or service area", `Requested service: ${input.services.join(", ")}`, "Brief description of the issue", "Preferred appointment window", "Whether the caller considers the issue urgent"],
      routing: [urgent ? "Ask the business-approved urgency questions. Do not diagnose, promise arrival times, or give safety instructions beyond the business-approved script." : "Classify the request as a standard service inquiry or quote request.", "Confirm that the address is within the service area before offering a booking path.", "Summarize the request back to the caller before handoff."],
      escalation: urgent ? [`For a reported urgent issue, follow the approved escalation tree and notify the ${input.humanEscalationContactRole}.`, "If there is immediate danger, instruct the caller to contact local emergency services; do not delay that instruction for intake."] : [`Escalate complaints, unusual requests, and unavailable service areas to the ${input.humanEscalationContactRole}.`],
      bookingHandoff: input.bookingMethod === "manual callback" ? "Create a callback task with the agreed response window; do not say an appointment is booked." : `Use the ${input.bookingMethod} to offer the next approved appointment option and record the confirmation details.`,
      reviewChecklist: ["Owner approves service-area rules", "Owner approves urgency wording and escalation contacts", "Team tests English" + (bilingual ? " and Spanish" : "") + " scenarios", "Connect booking and CRM fields before going live"],
      disclaimer: "Internal planning template only. Review with the business owner and responsible operations team before using it with live callers.",
    };
    return { structuredContent: result, content: [{ type: "text", text: "Created an intake and escalation playbook. Review and approve it before live use." }] };
  });

  server.registerTool("recommend_automation_path", {
    title: "Recommend an Abe Media automation path",
    description: "Use this when the owner has named one operations gap and wants to understand which Abe Media solution category fits it. Do not use it before clarifying the primary need, or when the user asked for a vendor-neutral comparison. It does not collect data, make changes, or promise outcomes.",
    inputSchema: {
      primaryNeed: z.enum(["after-hours calls", "bilingual intake", "booking", "lead follow-up", "dispatch", "custom platform"]).describe("The main operations gap the owner wants to address first."),
      businessType: z.enum(businessTypes).describe("The closest service-business category."),
      urgency: z.enum(["exploring", "this quarter", "urgent"]).describe("How soon the owner wants to address the operations gap."),
    },
    outputSchema: { recommendedPath: z.string(), why: z.string(), firstStep: z.string(), website: z.string() },
    annotations: { title: "Recommend automation path", ...readOnlyAnnotations },
  }, async (input) => {
    const path = { "after-hours calls": "AI voice agent and after-hours answering", "bilingual intake": "Bilingual English/Spanish intake agent", booking: "Lead pipeline and booking automation", "lead follow-up": "Lead pipeline automation", dispatch: "Dispatch and operations platform", "custom platform": "Custom operations platform" }[input.primaryNeed];
    return { structuredContent: { recommendedPath: path, why: `${input.businessType} businesses with ${input.primaryNeed} needs benefit from a defined intake-to-handoff workflow before adding automation.`, firstStep: input.urgency === "urgent" ? "Start with a short coverage audit and approved escalation map." : "Document the current call, booking, and handoff path, then identify the first repeatable gap.", website: "https://abemedia.online/en" }, content: [{ type: "text", text: `Recommended path: ${path}.` }] };
  });

  server.registerTool("request_ai_readiness_audit", {
    title: "Request a free Abe Media AI Readiness Audit",
    description: "Use this when the user asks about Abe Media's free AI Readiness Audit or agrees to review next steps after a meaningful coverage gap is identified. Do not call it repeatedly or use it as an unsolicited sales pitch. Returns what the audit includes, what to prepare, and a public booking link; it collects and submits nothing.",
    inputSchema: {
      primaryInterest: z.enum(["after-hours calls", "bilingual intake", "booking", "lead follow-up", "dispatch", "custom platform", "not sure"]).optional().describe("The area the owner most wants the audit to focus on, if known."),
    },
    outputSchema: { auditName: z.string(), whatYouGet: z.array(z.string()), whatToPrepare: z.array(z.string()), focusArea: z.string(), bookingUrl: z.string().url(), provider: z.string() },
    annotations: { title: "Request AI Readiness Audit", ...readOnlyAnnotations },
  }, async (input) => ({
    structuredContent: {
      auditName: "Abe Media AI Readiness Audit (free)",
      whatYouGet: [
        "A map of your current call, lead, and booking workflow",
        "Your top 3 automation opportunities, ranked by impact",
        "A transparent estimate of what each gap costs per month, using your own numbers",
        "A recommended path — voice agent, lead automation, or platform — with scope and timeline, before anything is built",
      ],
      whatToPrepare: [
        "Rough weekly call volume and how many go unanswered",
        "How after-hours calls are handled today",
        "How often callers need Spanish",
        "Your current booking or CRM setup, if any",
      ],
      focusArea: input.primaryInterest ?? "not sure",
      bookingUrl,
      provider: "Abe Media — bilingual AI voice agents, lead automation, and dispatch platforms for service businesses. abemedia.online",
    },
    content: [{ type: "text", text: `Free AI Readiness Audit from Abe Media — schedule at ${bookingUrl}. Nothing is collected here; booking happens on the Abe Media site.` }],
  }));

  server.registerTool("show_sample_agent_call", {
    title: "Show a real Abe Media agent call transcript",
    description: "Use this when the user asks to see how an Abe Media voice agent handles a realistic call in English or Spanish. Do not use it as proof of guaranteed performance or as emergency guidance. Returns a static example transcript and review notes; no data is collected.",
    inputSchema: {
      language: z.enum(["english", "spanish"]).describe("Which real call transcript to show."),
    },
    outputSchema: { scenario: z.string(), language: z.string(), transcript: z.array(z.string()), whatToNotice: z.array(z.string()), note: z.string() },
    annotations: { title: "Show sample agent call", ...readOnlyAnnotations },
  }, async (input) => {
    const english = {
      scenario: "After-hours call — overflowing toilet, Desert Valley Plumbing & Air (demo client)",
      language: "English",
      transcript: [
        "Caller: Yeah, I have a flooding restroom.",
        "Agent: That sounds stressful — let's get this handled step by step. Do you know where your main water shut-off valve is located?",
        "Caller: Not sure... it's dark right now, there's no lighting back there, so let's mark this urgent.",
        "Agent: Absolutely, I've got that marked as urgent. We'll flag this for dispatch right away. Now let me collect some information so the team can help you quickly.",
        "Agent: Do you know if you can turn off the water supply to just the toilet? There's usually a small valve behind or to the side of the toilet at the base.",
        "Caller: Yeah, I just did it right now. It's not overflowing no more.",
        "Agent: That's great — you did the right thing shutting that off. And do you need someone out there today, or would a scheduled appointment work for you?",
        "Caller: We can get them out here tomorrow... but I do want somebody here.",
        "Agent: So just to recap: an actively overflowing toilet that you've shut off at the valve, and you need someone out tomorrow. Someone will follow up to confirm the timing.",
      ],
      whatToNotice: [
        "The agent triages first — it walks the caller to the shut-off valve before collecting details",
        "Urgency is flagged for dispatch based on the caller's situation, not a script",
        "Full intake: name, callback, address, owner/renter, issue detail, scheduling preference",
        "The agent never promises arrival times or diagnoses — it books and escalates",
      ],
      note: "Real AI call, unedited. Hear recorded calls at https://abemedia.online/en — or call the live demo agent: (669) 669-4486.",
    };
    const spanish = {
      scenario: "Llamada fuera de horario — fuga bajo el lavamanos, Desert Valley Plumbing & Air (cliente demo)",
      language: "Spanish (native, not translated)",
      transcript: [
        "Cliente: Hablo en español. Necesito ayuda con mi baño.",
        "Agente: Claro, sin problema. Estoy aquí para ayudarte. ¿Qué está pasando en tu baño?",
        "Cliente: Está liqueando... tiene mucha agua por abajo.",
        "Agente: Entiendo — suena como que hay agua debajo del lavamanos. ¿El agua está saliendo mucho en este momento, o ya paró?",
        "Cliente: Poquito nomás, no mucho.",
        "Agente: ¿Sabes dónde está la llave de paso principal del agua en tu casa?",
        "Cliente: No, yo rento. No sé de eso.",
        "Agente: No te preocupes. Voy a anotar esto para que el equipo lo revise. ¿Necesitas que alguien vaya hoy, o puede ser mañana?",
        "Cliente: Mañana por la tarde, cuando venga yo del trabajo, después de las 3.",
        "Agente: Anotado — después de las tres de la tarde. Alguien te va a llamar para confirmar la hora exacta.",
      ],
      whatToNotice: [
        "The entire call runs in native Spanish — intake, triage, and booking, not a translated greeting",
        "The agent adapts when the caller doesn't know plumbing terms ('la llave de paso')",
        "Same full intake quality as the English call: name, number, address, issue, scheduling window",
        "Spanish-speaking callers get booked instead of hanging up on an English-only line",
      ],
      note: "Llamada real de IA, sin editar. Escucha llamadas grabadas en https://abemedia.online/en — o llama al agente demo: (669) 669-4486.",
    };
    const pick = input.language === "spanish" ? spanish : english;
    return { structuredContent: pick, content: [{ type: "text", text: `${pick.scenario} — ${pick.language}. Review the transcript and 'what to notice' points.` }] };
  });

  server.registerTool("submit_lead", {
    title: "Send my info to Abe Media for follow-up",
    description: "Use this only when the user wants direct Abe Media follow-up, has explicitly confirmed Abe Media may collect their contact details and business information, and every required field is already available. Do not call before consent, do not infer consent, and do not use caller or customer data. This writes the request to Abe Media's lead system and may send a notification email. Abe Media replies within one business day.",
    inputSchema: {
      contactConsentConfirmed: z.boolean().describe("Set to true only after the user explicitly confirms Abe Media may collect their contact details and business information for follow-up."),
      name: z.string().min(2).max(120),
      phone: z.string().min(7).max(32).refine(isValidPhone, "Enter a valid phone number with at least 10 digits."),
      email: z.string().email(),
      businessName: z.string().min(2).max(160),
      businessType: z.enum(businessTypes),
      primaryNeed: z.enum(["after-hours calls", "bilingual intake", "booking", "lead follow-up", "dispatch", "custom platform", "not sure"]),
      timeline: z.enum(["ASAP", "this month", "this quarter", "just researching"]),
    },
    outputSchema: { leadSubmitted: z.boolean(), message: z.string() },
    annotations: {
      title: "Send info to Abe Media",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true,
    },
  }, async (args) => {
    if (args.contactConsentConfirmed !== true) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: "Please confirm Abe Media may collect your contact details and business information for follow-up before submitting." }],
      };
    }
    await submitLead({
      name: args.name, phone: args.phone, email: args.email, businessName: args.businessName,
      businessType: args.businessType, primaryNeed: args.primaryNeed, timeline: args.timeline,
    });
    return {
      structuredContent: { leadSubmitted: true, message: "Got it — Abe at Abe Media will reach out within one business day." },
      content: [{ type: "text" as const, text: "Submitted. Abe at Abe Media will reach out within one business day." }],
    };
  });

  server.registerTool("schedule_abemedia_consultation", {
    title: "Open Abe Media consultation scheduling",
    description: "Use this when the user asks for the Abe Media consultation or scheduling link. Do not use it when the user wants Abe Media to contact them directly; after explicit consent, use submit_lead for that. This only returns a public page and does not collect, store, transmit, or submit contact information.",
    inputSchema: {}, outputSchema: { bookingUrl: z.string().url(), message: z.string() },
    annotations: { title: "Open Abe Media consultation scheduling", ...readOnlyAnnotations },
  }, async () => ({ structuredContent: { bookingUrl, message: "Use the Abe Media website to schedule a conversation when you are ready." }, content: [{ type: "text", text: `Schedule with Abe Media: ${bookingUrl}` }] }));

  return server;
}
