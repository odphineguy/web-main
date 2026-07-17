import { readFileSync } from "node:fs";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";

const WIDGET_URI = "ui://abemedia-service-operations-planner/main.html";
const widgetHtml = readFileSync(join(process.cwd(), "src", "ui", "index.html"), "utf8");
const bookingUrl = "https://abemedia.online/en#contact";

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const businessTypes = ["HVAC", "plumbing", "electrical", "landscaping", "turf", "junk removal", "hauling", "transportation", "other"] as const;
const calculatorIndustries = ["law", "hvac", "plumbing", "turf", "dental", "other"] as const;
const nonNegativeInteger = z.number().int().min(0).max(100_000);
const nonNegativeCurrency = z.number().min(0).max(10_000_000);

// Mirrors src/components/MissedCallCalculator.tsx in the AbeMedia website.
// Keep these values in sync until both products consume a shared config source.
const afterHoursDefaults = {
  law: { closeRatePercent: 25, averageTicket: 4500 },
  hvac: { closeRatePercent: 50, averageTicket: 450 },
  plumbing: { closeRatePercent: 55, averageTicket: 350 },
  turf: { closeRatePercent: 40, averageTicket: 3800 },
  dental: { closeRatePercent: 45, averageTicket: 900 },
  other: { closeRatePercent: 40, averageTicket: 500 },
} as const;

type CalculatorIndustry = keyof typeof afterHoursDefaults;

function calculatorIndustryForBusiness(businessType: (typeof businessTypes)[number]): CalculatorIndustry {
  if (businessType === "HVAC") return "hvac";
  if (businessType === "plumbing") return "plumbing";
  if (businessType === "turf" || businessType === "landscaping") return "turf";
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
  businessType: z.enum(businessTypes).describe("The closest service-business category."),
  weeklyInboundCalls: nonNegativeInteger.describe("Average inbound calls per week, including after-hours calls."),
  weeklyMissedCalls: nonNegativeInteger.describe("Average calls per week that receive no same-day response."),
  averageJobValue: nonNegativeCurrency.optional().describe("Typical completed-job value in US dollars. If omitted, use the matching AbeMedia website calculator's industry default."),
  estimatedCloseRatePercent: z.number().min(0).max(100).optional().describe("Estimated percent of qualified calls that become completed jobs. If omitted, use the matching AbeMedia website calculator's industry default."),
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

function automationRecommendation(input: z.infer<typeof assessmentSchema>) {
  const recommendations: string[] = [];
  if (input.afterHoursCoverage === "none" || input.afterHoursCoverage === "voicemail") recommendations.push("After-hours AI voice agent with an approved greeting, qualification flow, and human escalation rules.");
  if (input.bookingMethod === "none" || input.bookingMethod === "manual callback") recommendations.push("Calendar or CRM-connected booking workflow so qualified callers receive a defined next step while the team is busy.");
  if (input.spanishDemand === "regular") recommendations.push("Bilingual English/Spanish intake flow written for the business's actual services and service area.");
  if (input.dispatchNeeds === "same day" || input.dispatchNeeds === "emergency") recommendations.push("Urgency classification and dispatch handoff workflow with a documented on-call escalation path.");
  return recommendations.length ? recommendations : ["Review existing call handling, booking, and CRM handoffs with a short coverage audit."];
}

export function createAbeMediaServer() {
  const server = new McpServer(
    { name: "abemedia-service-operations-planner", version: "0.1.0" },
    {
      instructions: "Help service-business owners assess operations and plan better lead coverage. Use owner-provided aggregate estimates only; do not request or process customer, caller, payment, or health data. Present all calculated values as planning estimates, never as promised revenue. Never claim an agent can safely handle emergencies without a business-approved human escalation process. The scheduling tool only returns a public booking URL and does not submit contact information.",
    },
  );

  registerAppResource(server, "AbeMedia Service Operations AI Planner", WIDGET_URI, {
    description: "A concise visual summary of service-business lead coverage recommendations.",
  }, async () => ({
    contents: [{
      uri: WIDGET_URI,
      mimeType: RESOURCE_MIME_TYPE,
      text: widgetHtml,
      _meta: { ui: { csp: { connectDomains: ["https://abemedia.online"], resourceDomains: ["https://abemedia.online"] } } },
    }],
  }));

  const widgetMeta = { ui: { resourceUri: WIDGET_URI } };
  registerAppTool(server, "assess_call_coverage", {
    title: "Assess service-business call coverage",
    description: "Read-only assessment for a service-business owner's aggregate call-handling inputs. Returns a planning score, gaps, recommended priorities, and a transparent estimate of missed-call opportunity. Do not enter customer or caller details.",
    inputSchema: assessmentInput,
    outputSchema: {
      coverageScore: z.number(), band: z.string(), gaps: z.array(z.string()), priorities: z.array(z.string()), monthlyOpportunity: z.object({ monthlyMissedCalls: z.number(), estimatedCompletedJobs: z.number(), estimatedMonthlyValue: z.number() }), calculatorAssumptions: z.object({ industry: z.string(), estimatedCloseRatePercent: z.number(), averageJobValue: z.number(), usedWebsiteCloseRateDefault: z.boolean(), usedWebsiteAverageTicketDefault: z.boolean() }), disclaimer: z.string(),
    },
    annotations: { title: "Assess call coverage", ...readOnlyAnnotations }, _meta: widgetMeta,
  }, async (input) => {
    let score = 100;
    const gaps: string[] = [];
    if (input.afterHoursCoverage === "none") { score -= 35; gaps.push("No defined after-hours coverage."); }
    if (input.afterHoursCoverage === "voicemail") { score -= 25; gaps.push("After-hours callers reach voicemail instead of a qualification or routing path."); }
    if (input.bookingMethod === "none") { score -= 20; gaps.push("Qualified callers have no immediate booking path."); }
    if (input.bookingMethod === "manual callback") { score -= 10; gaps.push("Booking depends on a manual callback, which can delay response while crews are busy."); }
    if (input.spanishDemand === "regular") { score -= 12; gaps.push("Regular Spanish-language demand needs a documented bilingual coverage path."); }
    if (input.dispatchNeeds === "same day" || input.dispatchNeeds === "emergency") { score -= 12; gaps.push("Time-sensitive work needs business-approved urgency and escalation rules."); }
    if (input.weeklyInboundCalls > 0 && input.weeklyMissedCalls / input.weeklyInboundCalls > 0.1) { score -= 15; gaps.push("More than 10% of reported inbound calls are not receiving a same-day response."); }
    score = Math.max(0, score);
    const band = score >= 80 ? "Strong foundation" : score >= 55 ? "Coverage gaps to address" : "High risk of lead leakage";
    const calculatorAssumptions = resolveCalculatorAssumptions(calculatorIndustryForBusiness(input.businessType), input.estimatedCloseRatePercent, input.averageJobValue);
    return {
      structuredContent: { coverageScore: score, band, gaps, priorities: automationRecommendation(input), monthlyOpportunity: monthlyOpportunity(input.weeklyMissedCalls, calculatorAssumptions.estimatedCloseRatePercent, calculatorAssumptions.averageJobValue), calculatorAssumptions, disclaimer: "Planning estimate only. Actual results depend on lead quality, response time, staffing, pricing, and execution." },
      content: [{ type: "text", text: `Coverage score: ${score}/100 — ${band}. Review the structured plan for gaps and priorities.` }],
    };
  });

  server.registerTool("estimate_missed_call_value", {
    title: "Estimate missed-call opportunity",
    description: "Read-only calculator using the same industry defaults and formula as the AbeMedia website's after-hours missed-call calculator. The owner may override the default close rate or average ticket with their real numbers. Returns transparent planning math, not a revenue promise.",
    inputSchema: {
      weeklyMissedCalls: nonNegativeInteger.describe("Average inbound calls per week that receive no same-day response."),
      industry: z.enum(calculatorIndustries).optional().describe("Industry used to select the same starting close rate and average ticket as the AbeMedia website calculator. Defaults to other when unknown."),
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
    description: "Read-only generator for an internal service-business phone and messaging playbook. Uses business-level service and routing information only; do not provide customer or caller details. Emergency responses always require a business-approved human escalation path.",
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
    title: "Recommend an AbeMedia automation path",
    description: "Read-only routing that matches service-business operations needs to a likely AbeMedia solution path. It does not collect data, make changes, or promise outcomes.",
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

  server.registerTool("schedule_abemedia_consultation", {
    title: "Open AbeMedia consultation scheduling",
    description: "Returns the public AbeMedia consultation page. It does not collect, store, transmit, or submit contact information, and it makes no external changes.",
    inputSchema: {}, outputSchema: { bookingUrl: z.string().url(), message: z.string() },
    annotations: { title: "Open AbeMedia consultation scheduling", ...readOnlyAnnotations },
  }, async () => ({ structuredContent: { bookingUrl, message: "Use the AbeMedia website to schedule a conversation when you are ready." }, content: [{ type: "text", text: `Schedule with AbeMedia: ${bookingUrl}` }] }));

  return server;
}
