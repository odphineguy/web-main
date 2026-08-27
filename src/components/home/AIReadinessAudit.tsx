"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useLocale } from "next-intl";
import TurnstileWidget from "@/components/TurnstileWidget";
import { calculateAuditResult, type AuditAnswers } from "@/lib/aiAudit";
import { getLeadAttribution } from "@/lib/leadAttribution";
import { humanizeError, isValidEmail } from "@/lib/humanizeError";

type QuestionKey = keyof AuditAnswers;

type AuditCopy = {
  index: string;
  title: string;
  titleAccent: string;
  lede: string;
  time: string;
  checks: string;
  start: string;
  question: string;
  of: string;
  back: string;
  questions: Array<{
    key: QuestionKey;
    label: string;
    prompt: string;
    options: Array<{ value: string; label: string; detail: string }>;
  }>;
  levels: Record<"foundation" | "ready" | "priority", { label: string; title: string; summary: string }>;
  businessNames: Record<AuditAnswers["businessType"], string>;
  businessPrefix: string;
  recommendationsLabel: string;
  recommendations: Record<string, { title: string; body: string }>;
  captureTitle: string;
  captureBody: string;
  name: string;
  email: string;
  phone: string;
  consent: string;
  send: string;
  sending: string;
  sent: string;
  sentBody: string;
  verification: string;
  emailError: string;
  phoneError: string;
  restart: string;
};

const copy: Record<"en" | "es", AuditCopy> = {
  en: {
    index: "Free AI audit",
    title: "Find the leaks in your",
    titleAccent: "call operation.",
    lede: "Answer five questions. Get a practical readiness score and the first automations worth building.",
    time: "60–90 seconds",
    checks: "checks",
    start: "Start my audit",
    question: "Question",
    of: "of",
    back: "Back",
    questions: [
      { key: "businessType", label: "Business type", prompt: "What kind of operation are you running?", options: [
        { value: "home-services", label: "Home services", detail: "HVAC, plumbing, junk removal, landscaping" },
        { value: "field-services", label: "Field services", detail: "Moving, logistics, delivery, mobile teams" },
        { value: "health-wellness", label: "Health & wellness", detail: "Clinics, dental, med spas, therapy" },
        { value: "professional-services", label: "Professional services", detail: "Legal, financial, real estate, consulting" },
        { value: "other", label: "Another service business", detail: "A call-driven operation in another industry" },
      ] },
      { key: "missedCalls", label: "Missed calls", prompt: "How often do good calls go unanswered?", options: [
        { value: "rarely", label: "Rarely", detail: "Nearly every call reaches a person" },
        { value: "weekly", label: "A few each week", detail: "Busy periods create gaps" },
        { value: "daily", label: "Every day", detail: "Voicemail and callbacks are part of the routine" },
      ] },
      { key: "afterHours", label: "After-hours coverage", prompt: "What happens when customers call after hours?", options: [
        { value: "covered", label: "A person answers", detail: "Your team or answering service covers it" },
        { value: "voicemail", label: "They reach voicemail", detail: "The team follows up later" },
        { value: "urgent-only", label: "Urgent calls get coverage", detail: "Routine calls wait until business hours" },
        { value: "all-calls", label: "We need full coverage", detail: "Every caller should be answered and qualified" },
      ] },
      { key: "bilingual", label: "Bilingual demand", prompt: "Do callers need service in English and Spanish?", options: [
        { value: "no", label: "Rarely", detail: "English covers nearly every caller" },
        { value: "sometimes", label: "Sometimes", detail: "Language gaps cost time or leads" },
        { value: "yes", label: "Every week", detail: "Bilingual coverage is operationally important" },
      ] },
      { key: "intake", label: "Current intake", prompt: "How does a new caller become a booked job or qualified lead?", options: [
        { value: "documented", label: "Documented workflow", detail: "Required details and handoffs are consistent" },
        { value: "mixed", label: "A mix of tools", detail: "Forms, texts, notes, and software all play a part" },
        { value: "manual", label: "Mostly manual", detail: "Someone asks questions and re-enters the details" },
        { value: "inconsistent", label: "It depends who answers", detail: "Questions and follow-up vary by person" },
      ] },
    ],
    levels: {
      foundation: { label: "Foundation", title: "Start with one controlled handoff.", summary: "Your operation has a solid base. The best first move is a narrow workflow that saves staff time without disrupting what already works." },
      ready: { label: "Workflow ready", title: "Your calls are ready for automation.", summary: "A focused AI intake workflow can cover your biggest gaps now, then expand once the handoff is proven." },
      priority: { label: "High priority", title: "Revenue is leaking through the phone.", summary: "Your answers show repeated coverage and intake gaps. An AI receptionist can create an immediate operating layer around every inbound call." },
    },
    businessNames: { "home-services": "home-service", "field-services": "field-service", "health-wellness": "health and wellness", "professional-services": "professional-service", other: "service" },
    businessPrefix: "This result is calibrated for a",
    recommendationsLabel: "Your recommended build order",
    recommendations: {
      "missed-call": { title: "Recover missed calls", body: "Reply instantly by text, capture intent, and route qualified opportunities back to the team." },
      "after-hours": { title: "Cover calls after hours", body: "Answer common questions, collect job details, and escalate urgent calls using approved rules." },
      bilingual: { title: "Make bilingual coverage standard", body: "Use one English and Spanish intake flow so language never changes the quality of the handoff." },
      intake: { title: "Standardize intake", body: "Ask the same required questions on every call and send clean data into the system your team uses." },
      handoff: { title: "Automate the handoff", body: "Turn a complete call summary into a booked appointment, dispatch alert, or qualified lead record." },
    },
    captureTitle: "Send me the full recommendations",
    captureBody: "Get this result, the workflow order, and the questions your AI agent should ask.",
    name: "Full name",
    email: "Work email",
    phone: "Phone number",
    consent: "By submitting, you agree that Abe Media may contact you about your audit. No automated sales blasts.",
    send: "Email my audit",
    sending: "Sending audit…",
    sent: "Audit delivered.",
    sentBody: "Check your inbox. Abe also received your answers so any follow-up starts with context.",
    verification: "Complete the verification check before sending.",
    emailError: "Enter a valid email address.",
    phoneError: "Enter a valid phone number.",
    restart: "Retake audit",
  },
  es: {
    index: "Auditoría de IA gratis",
    title: "Encuentra las fugas en tu",
    titleAccent: "operación de llamadas.",
    lede: "Responde cinco preguntas. Recibe tu nivel de preparación y las primeras automatizaciones que vale la pena construir.",
    time: "60–90 segundos",
    checks: "puntos",
    start: "Iniciar mi auditoría",
    question: "Pregunta",
    of: "de",
    back: "Atrás",
    questions: [
      { key: "businessType", label: "Tipo de negocio", prompt: "¿Qué tipo de operación manejas?", options: [
        { value: "home-services", label: "Servicios para el hogar", detail: "HVAC, plomería, junk removal, jardinería" },
        { value: "field-services", label: "Servicios en campo", detail: "Mudanzas, logística, entregas, equipos móviles" },
        { value: "health-wellness", label: "Salud y bienestar", detail: "Clínicas, dental, med spas, terapia" },
        { value: "professional-services", label: "Servicios profesionales", detail: "Legal, finanzas, bienes raíces, consultoría" },
        { value: "other", label: "Otro negocio de servicios", detail: "Otra operación que depende de llamadas" },
      ] },
      { key: "missedCalls", label: "Llamadas perdidas", prompt: "¿Con qué frecuencia quedan buenas llamadas sin respuesta?", options: [
        { value: "rarely", label: "Casi nunca", detail: "Casi cada llamada llega a una persona" },
        { value: "weekly", label: "Algunas por semana", detail: "Los momentos ocupados crean huecos" },
        { value: "daily", label: "Todos los días", detail: "El buzón de voz y los callbacks son rutina" },
      ] },
      { key: "afterHours", label: "Fuera de horario", prompt: "¿Qué pasa cuando un cliente llama fuera de horario?", options: [
        { value: "covered", label: "Contesta una persona", detail: "Tu equipo o servicio de llamadas lo cubre" },
        { value: "voicemail", label: "Llega al buzón de voz", detail: "El equipo responde después" },
        { value: "urgent-only", label: "Solo cubrimos urgencias", detail: "Las demás llamadas esperan" },
        { value: "all-calls", label: "Necesitamos cobertura total", detail: "Cada llamada debe contestarse y calificarse" },
      ] },
      { key: "bilingual", label: "Demanda bilingüe", prompt: "¿Tus clientes necesitan atención en inglés y español?", options: [
        { value: "no", label: "Casi nunca", detail: "El inglés cubre casi todas las llamadas" },
        { value: "sometimes", label: "A veces", detail: "Las diferencias de idioma cuestan tiempo o leads" },
        { value: "yes", label: "Cada semana", detail: "La cobertura bilingüe es importante para operar" },
      ] },
      { key: "intake", label: "Intake actual", prompt: "¿Cómo se convierte una llamada nueva en trabajo agendado o lead calificado?", options: [
        { value: "documented", label: "Flujo documentado", detail: "Los datos y handoffs son consistentes" },
        { value: "mixed", label: "Una mezcla de herramientas", detail: "Formularios, textos, notas y software" },
        { value: "manual", label: "Mayormente manual", detail: "Alguien pregunta y vuelve a ingresar los datos" },
        { value: "inconsistent", label: "Depende de quién contesta", detail: "Las preguntas y el seguimiento cambian" },
      ] },
    ],
    levels: {
      foundation: { label: "Base lista", title: "Empieza con un handoff controlado.", summary: "Tu operación tiene una buena base. El mejor primer paso es un flujo específico que ahorre tiempo sin interrumpir lo que ya funciona." },
      ready: { label: "Flujo listo", title: "Tus llamadas están listas para IA.", summary: "Un flujo de intake con IA puede cubrir tus huecos principales y crecer después de comprobar el handoff." },
      priority: { label: "Alta prioridad", title: "El teléfono está dejando escapar ingresos.", summary: "Tus respuestas muestran huecos repetidos de cobertura e intake. Un recepcionista con IA puede crear una capa operativa para cada llamada." },
    },
    businessNames: { "home-services": "servicios para el hogar", "field-services": "servicios en campo", "health-wellness": "salud y bienestar", "professional-services": "servicios profesionales", other: "servicios" },
    businessPrefix: "Este resultado está calibrado para una operación de",
    recommendationsLabel: "El orden recomendado para construir",
    recommendations: {
      "missed-call": { title: "Recupera llamadas perdidas", body: "Responde por texto al instante, captura la intención y devuelve oportunidades calificadas al equipo." },
      "after-hours": { title: "Cubre llamadas fuera de horario", body: "Responde preguntas, recopila datos y escala urgencias con reglas aprobadas." },
      bilingual: { title: "Haz estándar la cobertura bilingüe", body: "Usa un solo flujo en inglés y español para mantener la calidad de cada handoff." },
      intake: { title: "Estandariza el intake", body: "Haz las mismas preguntas requeridas y envía datos limpios al sistema que usa tu equipo." },
      handoff: { title: "Automatiza el handoff", body: "Convierte el resumen de la llamada en una cita, alerta de dispatch o lead calificado." },
    },
    captureTitle: "Envíame las recomendaciones completas",
    captureBody: "Recibe este resultado, el orden del flujo y las preguntas que debe hacer tu agente de IA.",
    name: "Nombre completo",
    email: "Correo de trabajo",
    phone: "Número de teléfono",
    consent: "Al enviar, aceptas que Abe Media te contacte sobre tu auditoría. No enviamos blasts automatizados.",
    send: "Enviar mi auditoría",
    sending: "Enviando auditoría…",
    sent: "Auditoría entregada.",
    sentBody: "Revisa tu inbox. Abe también recibió tus respuestas para dar seguimiento con contexto.",
    verification: "Completa la verificación antes de enviar.",
    emailError: "Ingresa un correo válido.",
    phoneError: "Ingresa un teléfono válido.",
    restart: "Repetir auditoría",
  },
};

export default function AIReadinessAudit() {
  const locale = useLocale() === "es" ? "es" : "en";
  const text = copy[locale];
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AuditAnswers>>({});
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const current = text.questions[step];
  const result = useMemo(() => complete ? calculateAuditResult(answers as AuditAnswers) : null, [answers, complete]);

  function choose(value: string) {
    const nextAnswers = { ...answers, [current.key]: value };
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      if (step === text.questions.length - 1) setComplete(true);
      else {
        setStep((value) => value + 1);
        window.setTimeout(() => questionHeading.current?.focus(), 0);
      }
    }, 180);
  }

  function restart() {
    setStarted(true);
    setStep(0);
    setAnswers({});
    setComplete(false);
    setStatus("idle");
    setError(null);
    setTurnstileToken(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    if (!isValidEmail(email)) {
      setError(text.emailError);
      form.querySelector<HTMLInputElement>('[name="email"]')?.focus();
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError(text.phoneError);
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    if (!turnstileToken) {
      setError(text.verification);
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData.entries()),
          ...answers,
          locale,
          ...getLeadAttribution(),
          "cf-turnstile-response": turnstileToken,
        }),
      });
      const data: { ok?: boolean; error?: unknown } = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(typeof data.error === "string" ? data.error : `HTTP ${response.status}`);
      setStatus("sent");
      form.reset();
    } catch (requestError) {
      setStatus("error");
      setError(humanizeError(requestError));
    }
  }

  return (
    <section className="bold-audit" id="free-ai-audit" aria-labelledby="audit-title">
      <div className="bold-home__shell bold-audit__layout">
        <header className="bold-audit__intro">
          <p className="bold-home__index">{text.index}</p>
          <h2 id="audit-title">{text.title} <span>{text.titleAccent}</span></h2>
          <p>{text.lede}</p>
          <div className="bold-audit__time"><span aria-hidden="true" />{text.time}</div>
        </header>

        <div className="bold-audit__workbench">
          {!started ? (
            <div className="bold-audit__start">
              <div className="bold-audit__dial" aria-hidden="true"><span>05</span><small>{text.checks}</small></div>
              <p>{locale === "es" ? "Diagnóstico rápido de llamadas, cobertura y handoffs." : "A fast diagnosis of coverage, intake, and handoffs."}</p>
              <button type="button" onClick={() => setStarted(true)}>{text.start}<ArrowRight aria-hidden="true" /></button>
            </div>
          ) : !complete ? (
            <div className="bold-audit__question" key={current.key}>
              <div className="bold-audit__progress" aria-label={`${text.question} ${step + 1} ${text.of} ${text.questions.length}`}>
                <span>{String(step + 1).padStart(2, "0")}</span>
                <div aria-hidden="true"><i style={{ transform: `scaleX(${(step + 1) / text.questions.length})` }} /></div>
                <span>{String(text.questions.length).padStart(2, "0")}</span>
              </div>
              <p className="bold-audit__question-label">{current.label}</p>
              <h3 ref={questionHeading} tabIndex={-1}>{current.prompt}</h3>
              <div className="bold-audit__options" role="radiogroup" aria-label={current.prompt}>
                {current.options.map((option, index) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={answers[current.key] === option.value}
                    key={option.value}
                    onClick={() => choose(option.value)}
                    className={answers[current.key] === option.value ? "is-selected" : ""}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{option.label}</b>
                    <small>{option.detail}</small>
                    <i aria-hidden="true"><Check /></i>
                  </button>
                ))}
              </div>
              {step > 0 ? <button type="button" className="bold-audit__back" onClick={() => setStep((value) => value - 1)}><ArrowLeft />{text.back}</button> : null}
            </div>
          ) : result ? (
            <div className="bold-audit__result" aria-live="polite">
              <div className="bold-audit__result-head">
                <div className="bold-audit__score"><strong>{result.score}</strong><span>/100</span></div>
                <div>
                  <p>{text.levels[result.level].label}</p>
                  <h3>{text.levels[result.level].title}</h3>
                </div>
              </div>
              <p className="bold-audit__summary">{text.businessPrefix} {text.businessNames[(answers as AuditAnswers).businessType]}{locale === "es" ? ". " : " operation. "}{text.levels[result.level].summary}</p>
              <p className="bold-audit__recommendations-label">{text.recommendationsLabel}</p>
              <ol className="bold-audit__recommendations">
                {result.recommendationKeys.map((key, index) => (
                  <li key={key}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{text.recommendations[key].title}</b><p>{text.recommendations[key].body}</p></div></li>
                ))}
              </ol>

              {status === "sent" ? (
                <div className="bold-audit__success" role="status">
                  <span><Check /></span><div><h3>{text.sent}</h3><p>{text.sentBody}</p></div>
                  <button type="button" onClick={restart}><RotateCcw />{text.restart}</button>
                </div>
              ) : (
                <form className="bold-audit__capture" onSubmit={submit}>
                  <div className="bold-audit__capture-copy"><h3>{text.captureTitle}</h3><p>{text.captureBody}</p></div>
                  <div className="bold-audit__fields">
                    <label><span>{text.name}</span><input name="name" required autoComplete="name" maxLength={100} /></label>
                    <label><span>{text.email}</span><input name="email" required type="email" autoComplete="email" maxLength={254} /></label>
                    <label><span>{text.phone}</span><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={40} /></label>
                  </div>
                  <div className="bold-audit__submit-row">
                    <TurnstileWidget className="justify-start overflow-hidden" onVerify={(token) => { setTurnstileToken(token); setError(null); }} onExpire={() => setTurnstileToken(null)} onError={() => setError(text.verification)} />
                    <button type="submit" disabled={status === "sending" || !turnstileToken}>{status === "sending" ? text.sending : text.send}<ArrowRight /></button>
                  </div>
                  <small>{text.consent}</small>
                  {error ? <p className="bold-audit__error" role="alert">{error}</p> : null}
                </form>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
