import "server-only";

import { calculateAuditResult, type AuditAnswers, type AuditResult } from "@/lib/aiAudit";

type Locale = "en" | "es";
type RecommendationKey = AuditResult["recommendationKeys"][number];

type Workflow = {
  title: string;
  intro: string;
  steps: string[];
};

export type AuditPlan = {
  locale: Locale;
  score: number;
  opportunityLabel: string;
  reportLabel: string;
  title: string;
  summary: string;
  businessLabel: string;
  preparedLabel: string;
  findingsLabel: string;
  observations: string[];
  workflowLabel: string;
  workflow: Workflow;
  orderLabel: string;
  buildOrder: Array<{ title: string; body: string }>;
  rolloutLabel: string;
  rollout: Array<{ label: string; body: string }>;
  metricsLabel: string;
  metrics: string[];
  controlTitle: string;
  controlBody: string;
  nextTitle: string;
  nextBody: string;
  cta: string;
  print: string;
  printHint: string;
  privateLabel: string;
  invalidTitle: string;
  invalidBody: string;
};

const copy = {
  en: {
    reportLabel: "AI call opportunity plan",
    title: "Your phone operation has a clear next move.",
    labels: { foundation: "Emerging opportunity", ready: "Strong opportunity", priority: "Immediate opportunity" },
    summaries: {
      foundation: "Your operation has a solid base. A narrow first workflow can save staff time while keeping the parts that already work under human control.",
      ready: "Your answers show enough coverage and intake pressure for a focused AI workflow to create practical value now.",
      priority: "Repeated coverage and intake gaps are putting good inquiries at risk. A controlled AI workflow can protect those calls now.",
    },
    business: {
      "home-services": "Home services",
      "field-services": "Field services",
      "health-wellness": "Health and wellness",
      "professional-services": "Professional services",
      other: "Service business",
    },
    preparedLabel: "Prepared for your",
    findingsLabel: "What your answers revealed",
    observations: {
      missedCalls: {
        rarely: "Nearly every call reaches a person. Automation should protect the exceptions without replacing a process that works.",
        weekly: "Good calls go unanswered a few times each week, creating a repeatable recovery opportunity.",
        daily: "Good calls go unanswered every day, making response time the most urgent gap.",
      },
      afterHours: {
        covered: "A person already covers after-hours calls, so the first workflow should support the team rather than duplicate coverage.",
        voicemail: "After-hours callers reach voicemail and wait for a callback, which slows the first response.",
        "urgent-only": "Urgent calls receive coverage, while routine inquiries wait until business hours.",
        "all-calls": "You want every after-hours caller answered and qualified, not sent to voicemail.",
      },
      bilingual: {
        no: "English covers nearly every caller, so bilingual automation is not an immediate requirement.",
        sometimes: "Spanish support is sometimes needed, and those callers should receive the same intake quality.",
        yes: "Bilingual coverage is an operating requirement every week.",
      },
      intake: {
        documented: "Your intake workflow is documented, giving automation a reliable process to follow.",
        mixed: "Intake moves between different tools, texts, forms, or notes, which can weaken the handoff.",
        manual: "The team collects and re-enters most intake details by hand.",
        inconsistent: "Questions and follow-up change depending on who answers the call.",
      },
    },
    workflowLabel: "The first workflow to build",
    workflows: {
      "missed-call": {
        title: "Missed-call recovery",
        intro: "Respond while the caller is still looking for help, collect the essentials, and return a qualified opportunity to the team.",
        steps: ["Detect the unanswered call", "Send an immediate text-back", "Confirm the service and language", "Collect location, urgency, and details", "Route urgent or sensitive requests to a person", "Send a clean summary and next step"],
      },
      "after-hours": {
        title: "After-hours AI call coverage",
        intro: "Cover the hours when your team is unavailable without changing how normal business-hour calls are handled.",
        steps: ["Answer in English or Spanish", "Identify why the person is calling", "Collect contact, location, urgency, and details", "Answer approved common questions", "Escalate urgent requests using your rules", "Send the summary and confirm the next step"],
      },
      bilingual: {
        title: "Bilingual call intake",
        intro: "Give English and Spanish callers one consistent path from the first question to the final handoff.",
        steps: ["Detect or confirm the caller’s language", "Use the same approved intake requirements", "Capture names and details accurately", "Explain the next step in the caller’s language", "Escalate exceptions to a person", "Deliver one consistent summary to the team"],
      },
      intake: {
        title: "Standardized AI intake",
        intro: "Turn an inconsistent conversation into a repeatable set of required questions and a useful handoff.",
        steps: ["Identify the request", "Ask every required question", "Capture contact and location details", "Check urgency against approved rules", "Confirm missing information", "Send structured data to the system your team uses"],
      },
      handoff: {
        title: "Automated call handoff",
        intro: "Keep the current call experience and remove the manual work between a completed call and the team’s next action.",
        steps: ["Complete the approved intake", "Summarize the caller’s request", "Flag urgency and exceptions", "Create the correct record or alert", "Assign the next owner", "Confirm the follow-up with the caller"],
      },
    } satisfies Record<RecommendationKey, Workflow>,
    orderLabel: "Recommended build order",
    recommendations: {
      "missed-call": { title: "Recover missed calls", body: "Reply by text, capture intent, and route qualified opportunities back to the team." },
      "after-hours": { title: "Cover calls after hours", body: "Collect details and escalate urgent requests using rules your team approves." },
      bilingual: { title: "Make bilingual coverage consistent", body: "Use one English and Spanish intake standard for every caller." },
      intake: { title: "Standardize intake", body: "Ask the same required questions and deliver complete information every time." },
      handoff: { title: "Automate the handoff", body: "Turn the call summary into the right appointment, alert, or lead record." },
    },
    rolloutLabel: "A controlled 30-day rollout",
    rollout: [
      { label: "Week 01", body: "Document call types, required questions, approved answers, and escalation rules." },
      { label: "Week 02", body: "Build the English and Spanish flows and connect the destination for each handoff." },
      { label: "Week 03", body: "Test real scenarios with the team, including urgent requests and unclear answers." },
      { label: "Week 04", body: "Launch the narrow workflow, review every interaction, and correct weak handoffs." },
    ],
    metricsLabel: "What to measure",
    metrics: ["Calls answered", "Qualified inquiries", "First response time", "Human escalations", "Next steps created", "Missing intake details"],
    controlTitle: "Keep a person in control",
    controlBody: "The AI follows approved scripts, rules, and pricebooks. Sensitive requests, uncertain answers, pricing exceptions, and urgent situations reach a person.",
    nextTitle: "Map the first workflow with Abe",
    nextBody: "We’ll define what the AI should answer, what it should collect, where each handoff goes, and when your team takes over.",
    cta: "Review my call workflow",
    print: "Save as PDF",
    printHint: "Use your browser’s print window and choose Save as PDF.",
    privateLabel: "Private report link · No contact details stored in this URL",
    invalidTitle: "This report link is unavailable.",
    invalidBody: "The link may be incomplete or no longer valid. Retake the free audit to generate a new plan.",
  },
  es: {
    reportLabel: "Plan de oportunidad para llamadas con IA",
    title: "Tu operación telefónica tiene un próximo paso claro.",
    labels: { foundation: "Oportunidad inicial", ready: "Oportunidad clara", priority: "Oportunidad inmediata" },
    summaries: {
      foundation: "Tu operación tiene una base sólida. Un primer flujo específico puede ahorrar tiempo sin quitarle control a tu equipo.",
      ready: "Tus respuestas muestran suficiente presión de cobertura e intake para que un flujo de IA específico genere valor práctico ahora.",
      priority: "Los huecos repetidos de cobertura e intake ponen buenas oportunidades en riesgo. Un flujo controlado de IA puede proteger esas llamadas.",
    },
    business: {
      "home-services": "Servicios para el hogar",
      "field-services": "Servicios en campo",
      "health-wellness": "Salud y bienestar",
      "professional-services": "Servicios profesionales",
      other: "Negocio de servicios",
    },
    preparedLabel: "Preparado para tu operación de",
    findingsLabel: "Lo que revelaron tus respuestas",
    observations: {
      missedCalls: {
        rarely: "Casi cada llamada llega a una persona. La automatización debe cubrir las excepciones sin reemplazar un proceso que funciona.",
        weekly: "Algunas buenas llamadas quedan sin respuesta cada semana, lo que crea una oportunidad repetible de recuperación.",
        daily: "Buenas llamadas quedan sin respuesta todos los días, haciendo que el tiempo de respuesta sea el hueco más urgente.",
      },
      afterHours: {
        covered: "Una persona ya cubre las llamadas fuera de horario, así que el primer flujo debe apoyar al equipo sin duplicar la cobertura.",
        voicemail: "Las llamadas fuera de horario llegan al buzón de voz y esperan un callback.",
        "urgent-only": "Las urgencias reciben cobertura, mientras las consultas rutinarias esperan hasta el horario laboral.",
        "all-calls": "Quieres que cada llamada fuera de horario sea contestada y calificada, sin mandarla al buzón de voz.",
      },
      bilingual: {
        no: "El inglés cubre casi todas las llamadas, así que la automatización bilingüe no es un requisito inmediato.",
        sometimes: "A veces se necesita español, y esas personas deben recibir la misma calidad de intake.",
        yes: "La cobertura bilingüe es un requisito operativo cada semana.",
      },
      intake: {
        documented: "Tu proceso de intake está documentado, lo que le da a la automatización un flujo confiable que seguir.",
        mixed: "El intake pasa por diferentes herramientas, textos, formularios o notas, lo que puede debilitar el handoff.",
        manual: "El equipo recopila y vuelve a ingresar manualmente la mayoría de los datos.",
        inconsistent: "Las preguntas y el seguimiento cambian según quién conteste la llamada.",
      },
    },
    workflowLabel: "El primer flujo que debes construir",
    workflows: {
      "missed-call": {
        title: "Recuperación de llamadas perdidas",
        intro: "Responde mientras la persona todavía busca ayuda, recopila lo esencial y devuelve una oportunidad calificada al equipo.",
        steps: ["Detectar la llamada sin respuesta", "Enviar un texto inmediato", "Confirmar el servicio y el idioma", "Recopilar ubicación, urgencia y detalles", "Escalar solicitudes sensibles o urgentes", "Enviar un resumen limpio y el próximo paso"],
      },
      "after-hours": {
        title: "Cobertura de llamadas fuera de horario",
        intro: "Cubre las horas cuando tu equipo no está disponible sin cambiar la operación durante el horario laboral.",
        steps: ["Contestar en inglés o español", "Identificar el motivo de la llamada", "Recopilar contacto, ubicación, urgencia y detalles", "Responder preguntas comunes aprobadas", "Escalar urgencias con tus reglas", "Enviar el resumen y confirmar el próximo paso"],
      },
      bilingual: {
        title: "Intake bilingüe de llamadas",
        intro: "Dale a quienes hablan inglés o español un camino consistente desde la primera pregunta hasta el handoff.",
        steps: ["Detectar o confirmar el idioma", "Usar los mismos requisitos aprobados", "Capturar nombres y detalles correctamente", "Explicar el próximo paso en su idioma", "Escalar excepciones a una persona", "Entregar un resumen consistente al equipo"],
      },
      intake: {
        title: "Intake estandarizado con IA",
        intro: "Convierte una conversación inconsistente en preguntas requeridas y un handoff útil.",
        steps: ["Identificar la solicitud", "Hacer cada pregunta requerida", "Capturar contacto y ubicación", "Revisar la urgencia con reglas aprobadas", "Confirmar información faltante", "Enviar datos estructurados al sistema del equipo"],
      },
      handoff: {
        title: "Handoff automatizado",
        intro: "Mantén la experiencia actual de llamadas y elimina el trabajo manual entre la llamada y la próxima acción.",
        steps: ["Completar el intake aprobado", "Resumir la solicitud", "Marcar urgencias y excepciones", "Crear el registro o alerta correcto", "Asignar el próximo responsable", "Confirmar el seguimiento con la persona"],
      },
    } satisfies Record<RecommendationKey, Workflow>,
    orderLabel: "Orden recomendado para construir",
    recommendations: {
      "missed-call": { title: "Recupera llamadas perdidas", body: "Responde por texto, captura la intención y devuelve oportunidades calificadas al equipo." },
      "after-hours": { title: "Cubre llamadas fuera de horario", body: "Recopila detalles y escala urgencias con reglas aprobadas por tu equipo." },
      bilingual: { title: "Haz consistente la cobertura bilingüe", body: "Usa el mismo estándar de intake en inglés y español." },
      intake: { title: "Estandariza el intake", body: "Haz las mismas preguntas y entrega información completa cada vez." },
      handoff: { title: "Automatiza el handoff", body: "Convierte el resumen en la cita, alerta o registro correcto." },
    },
    rolloutLabel: "Un lanzamiento controlado de 30 días",
    rollout: [
      { label: "Semana 01", body: "Documenta tipos de llamada, preguntas requeridas, respuestas aprobadas y reglas de escalación." },
      { label: "Semana 02", body: "Construye los flujos en inglés y español y conecta el destino de cada handoff." },
      { label: "Semana 03", body: "Prueba casos reales con el equipo, incluyendo urgencias y respuestas inciertas." },
      { label: "Semana 04", body: "Lanza el flujo específico, revisa cada interacción y corrige handoffs débiles." },
    ],
    metricsLabel: "Qué debes medir",
    metrics: ["Llamadas contestadas", "Consultas calificadas", "Tiempo de respuesta", "Escalaciones humanas", "Próximos pasos creados", "Datos faltantes"],
    controlTitle: "Mantén a una persona en control",
    controlBody: "La IA sigue guiones, reglas y pricebooks aprobados. Las solicitudes sensibles, respuestas inciertas, excepciones de precios y urgencias llegan a una persona.",
    nextTitle: "Mapea el primer flujo con Abe",
    nextBody: "Definiremos qué debe responder la IA, qué debe recopilar, a dónde va cada handoff y cuándo interviene tu equipo.",
    cta: "Revisar mi flujo de llamadas",
    print: "Guardar como PDF",
    printHint: "Usa la ventana de impresión de tu navegador y elige Guardar como PDF.",
    privateLabel: "Enlace privado · Este URL no guarda datos de contacto",
    invalidTitle: "Este enlace no está disponible.",
    invalidBody: "El enlace está incompleto o ya no es válido. Repite la auditoría gratis para generar un plan nuevo.",
  },
} as const;

export function getAuditPlan(answers: AuditAnswers, locale: Locale): AuditPlan {
  const text = copy[locale];
  const result = calculateAuditResult(answers);
  const primaryKey = result.recommendationKeys[0];

  return {
    locale,
    score: result.score,
    opportunityLabel: text.labels[result.level],
    reportLabel: text.reportLabel,
    title: text.title,
    summary: text.summaries[result.level],
    businessLabel: text.business[answers.businessType],
    preparedLabel: text.preparedLabel,
    findingsLabel: text.findingsLabel,
    observations: [
      text.observations.missedCalls[answers.missedCalls],
      text.observations.afterHours[answers.afterHours],
      text.observations.bilingual[answers.bilingual],
      text.observations.intake[answers.intake],
    ],
    workflowLabel: text.workflowLabel,
    workflow: text.workflows[primaryKey],
    orderLabel: text.orderLabel,
    buildOrder: result.recommendationKeys.map((key) => text.recommendations[key]),
    rolloutLabel: text.rolloutLabel,
    rollout: [...text.rollout],
    metricsLabel: text.metricsLabel,
    metrics: [...text.metrics],
    controlTitle: text.controlTitle,
    controlBody: text.controlBody,
    nextTitle: text.nextTitle,
    nextBody: text.nextBody,
    cta: text.cta,
    print: text.print,
    printHint: text.printHint,
    privateLabel: text.privateLabel,
    invalidTitle: text.invalidTitle,
    invalidBody: text.invalidBody,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

export function buildAuditEmailText({ name, plan, reportUrl }: { name: string; plan: AuditPlan; reportUrl?: string | null }) {
  const hello = plan.locale === "es" ? `Hola ${name},` : `Hi ${name},`;
  const scoreLine = `${plan.score}/100 — ${plan.opportunityLabel}`;
  const findings = plan.observations.map((item) => `• ${item}`).join("\n");
  const steps = plan.workflow.steps.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const rollout = plan.rollout.map((item) => `${item.label}: ${item.body}`).join("\n");
  const link = reportUrl ? `\n${plan.print}: ${reportUrl}\n` : "";

  return `${hello}\n\n${plan.reportLabel.toUpperCase()}\n${scoreLine}\n${plan.title}\n\n${plan.summary}\n\n${plan.findingsLabel}\n${findings}\n\n${plan.workflowLabel}\n${plan.workflow.title}\n${plan.workflow.intro}\n${steps}\n\n${plan.rolloutLabel}\n${rollout}\n\n${plan.metricsLabel}\n${plan.metrics.map((item) => `• ${item}`).join("\n")}\n\n${plan.controlTitle}\n${plan.controlBody}\n\n${plan.nextTitle}\n${plan.nextBody}\n${link}\nAbe Media\nabe@abemedia.online`;
}

export function buildAuditEmailHtml({ name, plan, reportUrl }: { name: string; plan: AuditPlan; reportUrl?: string | null }) {
  const safeName = escapeHtml(name);
  const safeUrl = reportUrl ? escapeHtml(reportUrl) : null;
  const hello = plan.locale === "es" ? `Hola ${safeName},` : `Hi ${safeName},`;
  const findings = plan.observations.map((item) => `<tr><td style="padding:0 0 13px;color:#343942;font-size:15px;line-height:1.55;"><span style="color:#E34F0B;font-weight:800;">→</span>&nbsp;&nbsp;${escapeHtml(item)}</td></tr>`).join("");
  const steps = plan.workflow.steps.map((item, index) => `<tr><td style="width:35px;padding:10px 0;border-top:1px solid #d8d5cf;color:#E34F0B;font:700 11px/1.4 'Courier New',monospace;">${String(index + 1).padStart(2, "0")}</td><td style="padding:10px 0;border-top:1px solid #d8d5cf;color:#20242b;font-size:14px;line-height:1.45;">${escapeHtml(item)}</td></tr>`).join("");
  const rollout = plan.rollout.map((item) => `<td width="25%" valign="top" style="padding:15px 12px;border-top:3px solid #E34F0B;background:#f3f0ea;"><div style="color:#E34F0B;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;">${escapeHtml(item.label)}</div><div style="padding-top:8px;color:#343942;font-size:12px;line-height:1.45;">${escapeHtml(item.body)}</div></td>`).join("");
  const metrics = plan.metrics.map((item) => `<span style="display:inline-block;margin:0 6px 7px 0;padding:6px 8px;border:1px solid #cecac2;color:#343942;font:700 10px/1.3 'Courier New',monospace;text-transform:uppercase;letter-spacing:.4px;">${escapeHtml(item)}</span>`).join("");
  const cta = safeUrl ? `<tr><td style="padding:0 34px 34px;"><a href="${safeUrl}" style="display:inline-block;padding:14px 19px;border-radius:4px;background:#E34F0B;color:#fff7ed;font-size:14px;font-weight:800;text-decoration:none;text-transform:uppercase;letter-spacing:.3px;">${escapeHtml(plan.print)} →</a></td></tr>` : "";

  return `<!doctype html><html><body style="margin:0;padding:0;background:#e4e2dd;color:#20242b;font-family:Arial,Helvetica,sans-serif;"><div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(plan.workflow.title)} · ${plan.score}/100 ${escapeHtml(plan.opportunityLabel)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#e4e2dd;"><tr><td align="center" style="padding:28px 12px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;background:#fbfaf7;border:1px solid #c9c5bd;"><tr><td style="padding:22px 30px;border-bottom:1px solid #d8d5cf;"><table role="presentation" width="100%"><tr><td style="color:#181b21;font-size:17px;font-weight:900;letter-spacing:-.5px;">ABE <span style="color:#E34F0B;">MEDIA</span></td><td align="right" style="color:#E34F0B;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(plan.reportLabel)}</td></tr></table></td></tr><tr><td style="padding:32px 34px;background:#20242b;color:#f7f3ea;"><div style="color:#f2a37e;font:700 11px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;">${hello}</div><table role="presentation" width="100%" style="margin-top:16px;"><tr><td valign="bottom"><div style="font-size:46px;font-weight:900;line-height:.95;letter-spacing:-2px;">${plan.score}<span style="font-size:18px;color:#b8b6b1;letter-spacing:0;">/100</span></div></td><td valign="bottom" align="right" style="color:#E34F0B;font:700 11px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;">${escapeHtml(plan.opportunityLabel)}</td></tr></table><h1 style="max-width:520px;margin:21px 0 10px;color:#f7f3ea;font-size:30px;line-height:1.05;letter-spacing:-1px;text-transform:uppercase;">${escapeHtml(plan.title)}</h1><p style="max-width:570px;margin:0;color:#d2d0ca;font-size:15px;line-height:1.6;">${escapeHtml(plan.summary)}</p></td></tr><tr><td style="padding:29px 34px 10px;"><div style="color:#E34F0B;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(plan.findingsLabel)}</div><table role="presentation" width="100%" style="margin-top:17px;">${findings}</table></td></tr><tr><td style="padding:20px 34px 30px;"><div style="color:#E34F0B;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(plan.workflowLabel)}</div><h2 style="margin:9px 0 6px;color:#20242b;font-size:25px;line-height:1.1;text-transform:uppercase;">${escapeHtml(plan.workflow.title)}</h2><p style="margin:0 0 17px;color:#555a62;font-size:14px;line-height:1.55;">${escapeHtml(plan.workflow.intro)}</p><table role="presentation" width="100%">${steps}</table></td></tr><tr><td style="padding:28px 34px;background:#20242b;color:#f7f3ea;"><div style="color:#f2a37e;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(plan.rolloutLabel)}</div><table role="presentation" width="100%" cellspacing="7" style="margin:13px -7px 0;">${rollout}</table></td></tr><tr><td style="padding:28px 34px 18px;"><div style="color:#E34F0B;font:700 10px/1.4 'Courier New',monospace;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(plan.metricsLabel)}</div><div style="padding-top:13px;">${metrics}</div><table role="presentation" width="100%" style="margin-top:18px;background:#eeeae3;"><tr><td style="padding:18px 20px;"><strong style="display:block;color:#20242b;font-size:14px;text-transform:uppercase;">${escapeHtml(plan.controlTitle)}</strong><span style="display:block;padding-top:6px;color:#555a62;font-size:13px;line-height:1.5;">${escapeHtml(plan.controlBody)}</span></td></tr></table></td></tr><tr><td style="padding:20px 34px 14px;"><h2 style="margin:0;color:#20242b;font-size:24px;line-height:1.1;text-transform:uppercase;">${escapeHtml(plan.nextTitle)}</h2><p style="max-width:560px;margin:8px 0 0;color:#555a62;font-size:14px;line-height:1.55;">${escapeHtml(plan.nextBody)}</p></td></tr>${cta}<tr><td style="padding:20px 30px;border-top:1px solid #d8d5cf;color:#696d73;font-size:11px;line-height:1.5;">Abe Media · AI agents, dispatch software, and bilingual automation<br><a href="mailto:abe@abemedia.online" style="color:#E34F0B;text-decoration:none;">abe@abemedia.online</a></td></tr></table></td></tr></table></body></html>`;
}

export function buildAuditReportHtml({ plan, nonce }: { plan: AuditPlan; nonce: string }) {
  const findings = plan.observations.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const steps = plan.workflow.steps.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(item)}</p></li>`).join("");
  const order = plan.buildOrder.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p></div></li>`).join("");
  const rollout = plan.rollout.map((item) => `<li><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.body)}</p></li>`).join("");
  const metrics = plan.metrics.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const locale = plan.locale;

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeHtml(plan.reportLabel)} | Abe Media</title><style nonce="${nonce}">:root{--paper:#e4e2dd;--sheet:#fbfaf7;--ink:#20242b;--soft:#5b6068;--line:#cbc7bf;--orange:#e34f0b;--dark:#20242b;--cream:#f7f3ea;--space-sm:8px;--space-md:16px;--space-lg:24px;--space-xl:32px}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:"Helvetica Neue",Arial,sans-serif}.toolbar{display:flex;align-items:center;justify-content:space-between;width:min(100% - 32px,900px);margin:18px auto 12px;color:var(--soft);font-size:12px}.toolbar button{border:0;border-radius:4px;padding:11px 15px;background:var(--orange);color:#fff7ed;font-weight:800;text-transform:uppercase;cursor:pointer}.sheet{width:min(100% - 32px,900px);margin:0 auto 40px;border:1px solid var(--line);background:var(--sheet)}header{display:flex;align-items:center;justify-content:space-between;padding:20px 30px;border-bottom:1px solid var(--line)}.brand{font-size:17px;font-weight:900;letter-spacing:-.04em}.brand span,.kicker,.score-label,.section-label,.number{color:var(--orange)}.kicker,.score-label,.section-label,.number,.meta{font-family:"Courier New",monospace;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.hero{display:grid;grid-template-columns:180px 1fr;gap:32px;padding:28px 30px;background:var(--dark);color:var(--cream)}.score strong{display:block;font-size:72px;line-height:.8;letter-spacing:-.07em}.score small{color:#bbb7af;font-size:17px}.score-label{margin-top:16px}.hero h1{max-width:560px;margin:0;font-family:"Arial Narrow","Helvetica Neue",sans-serif;font-size:40px;line-height:.92;text-transform:uppercase}.hero p{max-width:620px;margin:14px 0 0;color:#d0cdc6;font-size:14px;line-height:1.5}.meta{margin-top:17px;color:#aaa79f}.main{display:grid;grid-template-columns:1.05fr .95fr}.column{padding:26px 30px}.column+.column{border-left:1px solid var(--line)}h2{margin:8px 0 10px;font-family:"Arial Narrow","Helvetica Neue",sans-serif;font-size:25px;line-height:1;text-transform:uppercase}p{margin:0;color:var(--soft);font-size:13px;line-height:1.5}.findings,.steps,.order,.rollout,.metrics{margin:15px 0 0;padding:0;list-style:none}.findings{display:grid;gap:10px}.findings li{position:relative;padding-left:18px;color:#3d424a;font-size:12px;line-height:1.45}.findings li:before{position:absolute;left:0;color:var(--orange);content:"→"}.steps li,.order li{display:grid;grid-template-columns:30px 1fr;gap:8px;padding:8px 0;border-top:1px solid var(--line)}.steps p{color:var(--ink)}.order strong{font-size:12px}.order p{margin-top:2px;font-size:11px}.band{padding:24px 30px;background:var(--dark);color:var(--cream)}.rollout{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.rollout li{padding:12px;border-top:3px solid var(--orange);background:#302f31}.rollout strong{color:#f2a37e;font:700 9px/1.4 "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase}.rollout p{margin-top:7px;color:#ddd8cf;font-size:10px;line-height:1.42}.bottom{display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:24px 30px}.metrics{display:flex;flex-wrap:wrap;gap:6px}.metrics li{padding:5px 7px;border:1px solid var(--line);font:700 9px/1.3 "Courier New",monospace;text-transform:uppercase}.control{margin-top:15px;padding:13px 15px;background:#efebe4}.control strong{font-size:11px;text-transform:uppercase}.control p{margin-top:4px;font-size:10px}.next{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}.next a{display:inline-block;margin-top:14px;border-radius:4px;padding:11px 14px;background:var(--orange);color:#fff7ed;font-size:11px;font-weight:800;text-decoration:none;text-transform:uppercase}footer{display:flex;justify-content:space-between;padding:15px 30px;border-top:1px solid var(--line);color:#757981;font-size:9px}footer a{color:var(--orange);text-decoration:none}@media(max-width:700px){.toolbar{align-items:flex-start;gap:12px}.toolbar span{max-width:220px}.sheet{width:100%;margin-bottom:0;border-left:0;border-right:0}.hero,.main,.bottom{grid-template-columns:1fr}.hero{gap:25px}.column+.column{border-top:1px solid var(--line);border-left:0}.rollout{grid-template-columns:1fr 1fr}.hero h1{font-size:35px}header,.hero,.column,.band,.bottom,footer{padding-left:22px;padding-right:22px}}@page{size:letter;margin:.28in}@media print{body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.toolbar,footer{display:none}.sheet{width:100%;margin:0;border:1px solid var(--line);page-break-inside:avoid}.hero{grid-template-columns:1.2in 1fr;padding:18px 22px;gap:22px}.score strong{font-size:54px}.hero h1{font-size:30px}.hero p{font-size:11px}.meta{margin-top:10px}.main{grid-template-columns:1.05fr .95fr}.column{padding:17px 22px}.column+.column{border-top:0;border-left:1px solid var(--line)}h2{font-size:19px}.findings{gap:6px}.findings li,.steps p{font-size:9px}.steps li,.order li{padding:5px 0}.order strong{font-size:9px}.order p{font-size:8px}.band{padding:15px 22px}.rollout{grid-template-columns:repeat(4,1fr);margin-top:10px}.rollout li{padding:8px}.rollout p{font-size:7.5px}.bottom{grid-template-columns:1fr 1fr;padding:15px 22px}.metrics li{font-size:7px}.control{margin-top:9px;padding:9px}.next a{margin-top:9px;padding:8px 11px;font-size:8px}html[lang=es] .hero{padding:12px 18px;gap:16px}html[lang=es] .score strong{font-size:48px}html[lang=es] .hero h1{font-size:25px}html[lang=es] .hero p{font-size:9px}html[lang=es] .meta{margin-top:7px}html[lang=es] .column{padding:12px 18px}html[lang=es] h2{font-size:16px}html[lang=es] .findings{gap:4px}html[lang=es] .findings li,html[lang=es] .steps p{font-size:8px}html[lang=es] .steps li,html[lang=es] .order li{padding:3px 0}html[lang=es] .band{padding:10px 18px}html[lang=es] .rollout{margin-top:7px}html[lang=es] .rollout li{padding:6px}html[lang=es] .rollout p{font-size:6.5px}html[lang=es] .bottom{padding:10px 18px}html[lang=es] .control{margin-top:6px;padding:7px}html[lang=es] .next a{margin-top:6px;padding:7px 9px}}</style></head><body><div class="toolbar"><span>${escapeHtml(plan.printHint)}</span><button id="print-report" type="button">${escapeHtml(plan.print)}</button></div><main class="sheet"><header><div class="brand">ABE <span>MEDIA</span></div><div class="kicker">${escapeHtml(plan.reportLabel)}</div></header><section class="hero"><div class="score"><strong>${plan.score}</strong><small>/100</small><div class="score-label">${escapeHtml(plan.opportunityLabel)}</div></div><div><h1>${escapeHtml(plan.title)}</h1><p>${escapeHtml(plan.summary)}</p><div class="meta">${escapeHtml(plan.preparedLabel)} ${escapeHtml(plan.businessLabel)}</div></div></section><section class="main"><div class="column"><div class="section-label">${escapeHtml(plan.findingsLabel)}</div><ul class="findings">${findings}</ul></div><div class="column"><div class="section-label">${escapeHtml(plan.workflowLabel)}</div><h2>${escapeHtml(plan.workflow.title)}</h2><p>${escapeHtml(plan.workflow.intro)}</p><ol class="steps">${steps}</ol></div></section><section class="band"><div class="section-label">${escapeHtml(plan.rolloutLabel)}</div><ol class="rollout">${rollout}</ol></section><section class="bottom"><div><div class="section-label">${escapeHtml(plan.orderLabel)}</div><ol class="order">${order}</ol></div><div class="next"><div class="section-label">${escapeHtml(plan.metricsLabel)}</div><ul class="metrics">${metrics}</ul><div class="control"><strong>${escapeHtml(plan.controlTitle)}</strong><p>${escapeHtml(plan.controlBody)}</p></div><h2>${escapeHtml(plan.nextTitle)}</h2><p>${escapeHtml(plan.nextBody)}</p><a href="https://abemedia.online/${locale}/contact">${escapeHtml(plan.cta)} →</a></div></section><footer><span>${escapeHtml(plan.privateLabel)}</span><span>Abe Media · <a href="mailto:abe@abemedia.online">abe@abemedia.online</a></span></footer></main><script nonce="${nonce}">document.getElementById("print-report").addEventListener("click",function(){window.print()});</script></body></html>`;
}
