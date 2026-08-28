"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ThumbtackReplayProps = { locale: string };

type ReplayMessage = {
  from: "customer" | "ai" | "system";
  text: string;
  meta?: string;
  phase: number;
  /** ms to wait before this message appears */
  delay: number;
  /** show the typing indicator during the delay (AI messages) */
  typing?: boolean;
};

const replays = {
  en: {
    eyebrow: "Lead → job",
    title: {
      before: "From missed call to ",
      accent: "booked job",
      after: " in under a minute.",
    },
    lede: "A real Thumbtack conversation, replayed. The AI reads the job, quotes from the client's own rate card, re-quotes when details change, and books a real slot — while the crew keeps working.",
    cardTitle: "Thumbtack · New lead",
    cardMeta: "Moving help · Phoenix, AZ",
    footNote: "AI responses active",
    footTimer: "Replied in 1 min",
    steps: [
      { short: "Lead arrives", hint: "Pushed the second it's submitted, via the official Pro API" },
      { short: "AI quotes", hint: "Real prices from the client's rate card, in under a minute" },
      { short: "Details change", hint: "Stairs added — the quote adjusts on the spot" },
      { short: "Job booked", hint: "A real calendar slot, confirmation sent" },
    ],
    messages: [
      { from: "customer", text: "Hi — need help moving Saturday. Queen mattress, dresser, 2 TVs, and about 15 boxes. Second-floor apartment.", meta: "Customer · 9:47 PM", phase: 0, delay: 700 },
      { from: "ai", text: "We can do Saturday. For that load it's a 2-man crew at $95/hr with a 2-hour minimum — you're looking at $190–$285 all-in. Does the building have elevator access?", meta: "AI · 9:48 PM · replied in 1 min", phase: 1, delay: 2300, typing: true },
      { from: "customer", text: "No elevator. About 18 stairs to the second level, 2 flights.", meta: "Customer · 9:51 PM", phase: 2, delay: 2600 },
      { from: "ai", text: "Got it — with the stairs that's $285–$380 all-in. We have Saturday 8:00 AM or 11:30 AM open. Here's the booking link to lock one in.", meta: "AI · 9:51 PM · re-quoted from rate card", phase: 2, delay: 2400, typing: true },
      { from: "customer", text: "8 AM works. Booking now.", meta: "Customer · 9:54 PM", phase: 3, delay: 2600 },
      { from: "system", text: "Job booked — Saturday 8:00 AM. Confirmation sent. Logged to the CRM with the full conversation.", meta: "Calendar synced", phase: 3, delay: 1600 },
    ] as ReplayMessage[],
  },
  es: {
    eyebrow: "Lead → trabajo",
    title: {
      before: "De llamada perdida a ",
      accent: "trabajo reservado",
      after: " en menos de un minuto.",
    },
    lede: "Una conversación real de Thumbtack, reproducida. La IA lee el trabajo, cotiza con las tarifas del cliente, recalcula cuando cambian los detalles y reserva un horario real — mientras el equipo sigue trabajando.",
    cardTitle: "Thumbtack · Lead nuevo",
    cardMeta: "Mudanza · Phoenix, AZ",
    footNote: "Respuestas de IA activas",
    footTimer: "Respondió en 1 min",
    steps: [
      { short: "Llega el lead", hint: "Enviado al instante por el API oficial de Thumbtack Pro" },
      { short: "La IA cotiza", hint: "Precios reales del tarifario del cliente, en menos de un minuto" },
      { short: "Cambian los detalles", hint: "Aparecen escaleras — la cotización se ajusta al momento" },
      { short: "Trabajo reservado", hint: "Un horario real en el calendario, confirmación enviada" },
    ],
    messages: [
      { from: "customer", text: "Hola — necesito ayuda con una mudanza el sábado. Colchón queen, cómoda, 2 TVs y unas 15 cajas. Departamento en segundo piso.", meta: "Cliente · 9:47 PM", phase: 0, delay: 700 },
      { from: "ai", text: "Sí podemos el sábado. Para esa carga es un equipo de 2 personas a $95/hr con mínimo de 2 horas — entre $190 y $285 en total. ¿El edificio tiene elevador?", meta: "IA · 9:48 PM · respondió en 1 min", phase: 1, delay: 2300, typing: true },
      { from: "customer", text: "Sin elevador. Unas 18 escaleras al segundo nivel, 2 tramos.", meta: "Cliente · 9:51 PM", phase: 2, delay: 2600 },
      { from: "ai", text: "Entendido — con las escaleras queda entre $285 y $380 en total. Tenemos el sábado a las 8:00 AM o 11:30 AM. Aquí está el enlace para reservar.", meta: "IA · 9:51 PM · recalculado del tarifario", phase: 2, delay: 2400, typing: true },
      { from: "customer", text: "Las 8 AM me funcionan. Reservando ahora.", meta: "Cliente · 9:54 PM", phase: 3, delay: 2600 },
      { from: "system", text: "Trabajo reservado — sábado 8:00 AM. Confirmación enviada. Registrado en el CRM con la conversación completa.", meta: "Calendario sincronizado", phase: 3, delay: 1600 },
    ] as ReplayMessage[],
  },
} as const;

const LOOP_HOLD_MS = 6500;

export default function ThumbtackReplay({ locale }: ThumbtackReplayProps) {
  const text = locale === "es" ? replays.es : replays.en;
  const messages = text.messages;

  const sectionRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(false);

  // count = messages currently shown; typing = indicator visible before the next one
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleFrom = useCallback(
    (index: number) => {
      clearTimer();
      if (index >= messages.length) {
        timerRef.current = setTimeout(() => {
          setCount(0);
          setTyping(false);
          scheduleFrom(0);
        }, LOOP_HOLD_MS);
        return;
      }
      const next = messages[index];
      if (next.typing) {
        setTyping(true);
        timerRef.current = setTimeout(() => {
          setTyping(false);
          setCount(index + 1);
          scheduleFrom(index + 1);
        }, next.delay);
      } else {
        setTyping(false);
        timerRef.current = setTimeout(() => {
          setCount(index + 1);
          scheduleFrom(index + 1);
        }, next.delay);
      }
    },
    [messages],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setReduced(true);
      setCount(messages.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playingRef.current) {
          playingRef.current = true;
          scheduleFrom(0);
        } else if (!entry.isIntersecting && playingRef.current) {
          playingRef.current = false;
          clearTimer();
          setCount(0);
          setTyping(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimer();
    };
  }, [messages.length, scheduleFrom]);

  // Keep the newest message in view inside the thread without scrolling the page.
  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTo({ top: thread.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [count, typing, reduced]);

  const visible = messages.slice(0, count);
  const activePhase = visible.length ? visible[visible.length - 1].phase : 0;

  const jumpToPhase = (phase: number) => {
    if (reduced) return;
    const start = messages.findIndex((m) => m.phase === phase);
    if (start < 0) return;
    playingRef.current = true;
    clearTimer();
    setTyping(false);
    setCount(start + 1);
    scheduleFrom(start + 1);
  };

  return (
    <section ref={sectionRef} className="bold-replay" id="process">
      <div className="bold-home__shell">
        <header className="bold-home__intro bold-home__intro--wide bold-replay__intro">
          <p className="bold-home__index">{text.eyebrow}</p>
          <h2>{text.title.before}<span>{text.title.accent}</span>{text.title.after}</h2>
          <p>{text.lede}</p>
        </header>

        <div className="bold-replay__stage">
          <div className="bold-replay__steps" role="list" aria-label="Lead to job process">
            {text.steps.map((step, index) => (
              <button
                key={step.short}
                type="button"
                className={activePhase === index && count > 0 ? "is-active" : undefined}
                onClick={() => jumpToPhase(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{step.short}</b>
                <small>{step.hint}</small>
              </button>
            ))}
          </div>

          <div className="bold-replay__card" aria-label="Replayed Thumbtack conversation">
            <div className="bold-replay__card-head">
              <i />
              <span>{text.cardTitle}</span>
              <span>{text.cardMeta}</span>
            </div>
            <div ref={threadRef} className="bold-replay__thread" aria-live="off">
              {visible.map((message, index) => (
                <div key={index} className={`bold-replay__msg bold-replay__msg--${message.from}`}>
                  {message.from !== "system" && (
                    <span className="bold-replay__who">{message.from === "ai" ? "AI" : "R"}</span>
                  )}
                  <div className="bold-replay__bubble">
                    <p>{message.text}</p>
                    {message.meta && <small>{message.meta}</small>}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="bold-replay__msg bold-replay__msg--ai">
                  <span className="bold-replay__who">AI</span>
                  <div className="bold-replay__bubble bold-replay__bubble--typing" aria-hidden="true">
                    <i /><i /><i />
                  </div>
                </div>
              )}
            </div>
            <div className="bold-replay__card-foot">
              <span>{text.footNote}</span>
              <span>{text.footTimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
