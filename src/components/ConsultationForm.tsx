"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { useLocale } from "next-intl";
import TurnstileWidget from "@/components/TurnstileWidget";
import { humanizeError, isValidEmail } from "@/lib/humanizeError";
import { getLeadAttribution } from "@/lib/leadAttribution";

const CALENDAR_URL = "https://cal.com/abe-p-698781/talk-with-abe";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  prefilledDescription?: string;
}

const copy = {
  en: {
    eyebrow: "START A CONVERSATION",
    title: "Let’s build something useful.",
    intro: "Tell us where the operation gets stuck. We usually reply within one business day.",
    name: "Full name *",
    email: "Email address *",
    phone: "Phone number",
    company: "Company or website",
    service: "Select a service",
    referral: "How did you hear about us? *",
    description: "Share your goals, timeline, and requirements...",
    send: "Send inquiry",
    sending: "Sending...",
    sent: "Request sent",
    sentMessage: "Request sent. We’ll be in touch within one business day.",
    verification: "Complete the verification check before sending.",
    divider: "or choose a time now",
    calendar: "Book a 30-minute call",
    emailUs: "Prefer email?",
    close: "Close consultation form",
    emailError: "Double-check this address. It looks like an @ or domain is missing.",
  },
  es: {
    eyebrow: "INICIA UNA CONVERSACIÓN",
    title: "Construyamos algo útil.",
    intro: "Cuéntanos dónde se traba la operación. Solemos responder en un día hábil.",
    name: "Nombre completo *",
    email: "Correo electrónico *",
    phone: "Teléfono",
    company: "Empresa o sitio web",
    service: "Selecciona un servicio",
    referral: "¿Cómo supiste de nosotros? *",
    description: "Comparte tus metas, plazo y requisitos...",
    send: "Enviar consulta",
    sending: "Enviando...",
    sent: "Solicitud enviada",
    sentMessage: "Solicitud enviada. Te contactaremos en un día hábil.",
    verification: "Completa la verificación antes de enviar.",
    divider: "o elige una hora ahora",
    calendar: "Agenda una llamada de 30 minutos",
    emailUs: "¿Prefieres correo?",
    close: "Cerrar formulario de consulta",
    emailError: "Revisa el correo. Parece que falta el @ o el dominio.",
  },
} as const;

const fieldClass =
  "min-h-11 w-full rounded-none border border-foreground/20 bg-background/55 px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color,background-color] placeholder:text-muted-foreground/80 hover:border-foreground/35 focus:border-orange-500 focus:bg-background focus:ring-1 focus:ring-orange-500";

export default function ConsultationForm({ isOpen, onClose, preselectedService, prefilledDescription }: ConsultationFormProps) {
  const locale = useLocale();
  const text = locale === "es" ? copy.es : copy.en;
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => firstInputRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    if (!isValidEmail(email)) {
      setEmailError(text.emailError);
      form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setEmailError(null);

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage(text.verification);
      return;
    }

    setStatus("sending");
    const payload = {
      ...Object.fromEntries(formData.entries()),
      ...getLeadAttribution(),
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: unknown } = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(typeof data.error === "string" ? data.error : `HTTP ${response.status}`);
      }

      setStatus("sent");
      setErrorMessage(null);
      form.reset();
      setTurnstileToken(null);
      window.setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2200);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(humanizeError(error));
    }
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#09090b]/78 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={closeFromBackdrop}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        aria-describedby="consultation-intro"
        className="relative w-full max-w-[760px] overflow-hidden border border-foreground/15 bg-card text-card-foreground shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
      >
        <div className="h-1 w-full bg-orange-500" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 min-h-9 border border-foreground/15 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground/35 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:right-5 sm:top-5"
          aria-label={text.close}
        >
          {locale === "es" ? "Cerrar" : "Close"}
        </button>

        <div className="px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
          <header className="mb-4 max-w-[36rem] pr-12">
            <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-orange-500">{text.eyebrow}</p>
            <h2 id="consultation-title" className="mt-1.5 font-[var(--font-ds-display)] text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[2.5rem]">
              {text.title}
            </h2>
            <p id="consultation-intro" className="mt-2 max-w-[52ch] text-sm leading-5 text-muted-foreground">{text.intro}</p>
          </header>

          <form className="grid gap-3" onSubmit={onSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="sr-only">{text.name}</span>
                <input ref={firstInputRef} name="name" type="text" autoComplete="name" required placeholder={text.name} className={fieldClass} />
              </label>
              <label>
                <span className="sr-only">{text.email}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={text.email}
                  aria-invalid={emailError ? "true" : "false"}
                  aria-describedby={emailError ? "consultation-email-error" : undefined}
                  onChange={() => emailError && setEmailError(null)}
                  className={fieldClass}
                />
              </label>
            </div>
            {emailError ? <p id="consultation-email-error" className="-mt-1 text-xs text-red-600 dark:text-red-400">{emailError}</p> : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="sr-only">{text.phone}</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder={text.phone} className={fieldClass} />
              </label>
              <label>
                <span className="sr-only">{text.company}</span>
                <input name="company" type="text" autoComplete="organization" placeholder={text.company} className={fieldClass} />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="sr-only">{text.service}</span>
                <select name="service" defaultValue={preselectedService || ""} className={`${fieldClass} cursor-pointer`}>
                  <option value="">{text.service}</option>
                  <option value="ai-voice-agent">AI Voice Agent</option>
                  <option value="dispatch-platform">Custom Dispatch or Operations System</option>
                  <option value="lead-automation">Lead-Pipeline Automation</option>
                  <option value="ai-estimating">AI Estimating Tool</option>
                  <option value="bilingual-automation">Bilingual AI Automation</option>
                  <option value="custom-software">Custom Business Software</option>
                  <option value="website-chatbot-addon">Website or Chatbot Add-on</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                <span className="sr-only">{text.referral}</span>
                <select name="referralSource" required defaultValue="" className={`${fieldClass} cursor-pointer`}>
                  <option value="" disabled>{text.referral}</option>
                  <option value="AI search or assistant">AI search or assistant</option>
                  <option value="Google or Bing">Google or Bing</option>
                  <option value="Client or colleague referral">Client or colleague referral</option>
                  <option value="Clutch or directory">Clutch or directory</option>
                  <option value="Social media">Social media</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label>
              <span className="sr-only">{text.description}</span>
              <textarea
                name="description"
                rows={2}
                required
                defaultValue={prefilledDescription || ""}
                placeholder={text.description}
                className={`${fieldClass} min-h-[72px] resize-none`}
              />
            </label>

            <div className="grid items-center gap-3 sm:grid-cols-[minmax(300px,1fr)_minmax(190px,0.72fr)]">
              <TurnstileWidget
                className="justify-start overflow-hidden"
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setErrorMessage(null);
                }}
                onError={() => setErrorMessage("Verification failed. Please try again.")}
                onExpire={() => setTurnstileToken(null)}
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "sent" || !turnstileToken}
                className="group inline-flex min-h-[65px] items-center justify-between rounded-[var(--radius-action)] bg-orange-500 px-6 text-left text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? text.sending : status === "sent" ? text.sent : text.send}
              </button>
            </div>

            {status === "error" && errorMessage ? (
              <p role="alert" aria-live="assertive" className="text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
            ) : null}
            {status === "sent" ? (
              <p role="status" aria-live="polite" className="text-xs font-semibold text-green-700 dark:text-green-400">{text.sentMessage}</p>
            ) : null}
          </form>

          <div className="my-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground" aria-hidden="true">
            <span className="h-px flex-1 bg-foreground/15" />
            {text.divider}
            <span className="h-px flex-1 bg-foreground/15" />
          </div>

          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-12 w-full items-center justify-between rounded-[var(--radius-action)] border border-foreground/70 px-5 text-sm font-semibold uppercase tracking-[0.05em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <span>{text.calendar}</span>
          </a>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            {text.emailUs} <a className="font-medium text-foreground underline underline-offset-4" href="mailto:abe@abemedia.online">abe@abemedia.online</a>
          </p>
        </div>
      </div>
    </div>
  );
}
