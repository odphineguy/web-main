"use client";

import Link from "next/link";
import { Archive, ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Inbox, MessageSquareText, MoreHorizontal, RotateCcw, Send, Sparkles, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ThumbtackReplayProps = { locale: string };
type ReplayItem = { from: "customer" | "ai" | "review"; text: string; meta?: string; label?: string; delay: number; typing?: boolean };

const originalConversation: ReplayItem[] = [
  { from: "customer", text: "It’s off a moving truck to my apartment. I have a mattress/boxspring, dresser, chest of drawers, mirror, 2 TVs, 2 chairs, and 4 boxes.", meta: "August 17 · 3:30 PM", delay: 650 },
  { from: "ai", label: "Sent by Progressive Transportation Services", text: "Hi Gosezett, thanks for the details. Since we’re just handling labor, that’s $95/hr for a 2-man crew, no trip fee, with a 2-hour minimum. For a 1-bedroom load like yours, we’d estimate 2–3 hours, roughly $190–$285 all in. How many flights of stairs are there? Tomorrow is open morning and afternoon.", meta: "Replied in under 1 min", delay: 1800, typing: true },
  { from: "customer", text: "About 18 stairs to second level. 2 flights.", meta: "August 17 · 3:37 PM", delay: 1800 },
  { from: "ai", label: "Sent by Progressive Transportation Services", text: "Got it, two flights adds some time. With those stairs factored in, I’d estimate closer to 3–4 hours, so around $285–$380 all in. Still just an estimate, not fixed. Tomorrow’s wide open, morning and afternoon, if you want to lock in Aug 18.", meta: "Quote adjusted instantly", delay: 1600, typing: true },
  { from: "review", label: "Review posted", text: "Great service provided for the cost. Professional service provided", meta: "August 20 · 2:06 PM", delay: 2100 },
  { from: "customer", text: "We have a new move if you can accommodate. Tomorrow we need a pickup truck to unload the rest of our belongings and transport it to the apartment, then unload into the apartment. It’s packed in a 16ft POD, half full.", meta: "Returned for another move · August 20 · 2:08 PM", delay: 2400 },
  { from: "ai", label: "Sent by Progressive Transportation Services", text: "Thanks for the update — since this one needs pickup and transport, that shifts it to our moving rate: 2 movers with our 26-ft liftgate truck, $95/hr, travel included, 2-hour minimum. I’d estimate 3–4 hours, roughly $350–$445 all in. Tomorrow is open morning and afternoon.", meta: "AI handled the return request", delay: 1700, typing: true },
];

const copy = {
  en: { eyebrow: "Real lead · real outcome", titleBefore: "First to reply. Hired. Then rated ", titleAccent: "five stars.", lede: "A real Thumbtack thread, replayed. The AI quoted from the mover’s rate card in under a minute, adjusted when the details changed, and kept the relationship moving when the customer returned.", original: "Real conversation · customer details redacted · lightly condensed", responseTitle: "Gosezett B. contacted 4 pros · 3 responded", you: "You", replied: "Initially replied in", response: "Customer has responded", notResponse: "Customer has not responded", active: "Last activity", replay: "Replay conversation", scheduled: "Scheduled", review: "Review posted", insights: "Market insights", paid: "What you paid", directLead: "Direct lead", total: "Total", manage: "Manage lead prices", commitment: "Thumbtack Quality Commitment", auditEyebrow: "Fast response is one part of the picture", auditTitle: "See when your best Thumbtack leads arrive.", auditBody: "Turn your contacts export into a clear view of response time, spend, and cost per matched hire.", auditCta: "Analyze my Thumbtack spend" },
  es: { eyebrow: "Lead real · resultado real", titleBefore: "Respondió primero. Contratado. Y luego, ", titleAccent: "cinco estrellas.", lede: "Una conversación real de Thumbtack, reproducida. La IA cotizó con el tarifario en menos de un minuto, ajustó el precio cuando cambiaron los detalles y respondió cuando la clienta volvió.", original: "Conversación real en inglés · datos del cliente ocultos · resumida", responseTitle: "Gosezett B. contactó a 4 profesionales · 3 respondieron", you: "Tú", replied: "Respondió inicialmente en", response: "La clienta respondió", notResponse: "La clienta no respondió", active: "Última actividad", replay: "Reproducir conversación", scheduled: "Programado", review: "Reseña publicada", insights: "Información del mercado", paid: "Lo que pagaste", directLead: "Lead directo", total: "Total", manage: "Administrar precios", commitment: "Compromiso de calidad de Thumbtack", auditEyebrow: "La velocidad es solo una parte", auditTitle: "Descubre cuándo llegan tus mejores leads de Thumbtack.", auditBody: "Convierte tu exportación de contactos en una vista clara del tiempo de respuesta, gasto y costo por contratación vinculada.", auditCta: "Analiza mi gasto de Thumbtack" },
} as const;

const LOOP_HOLD_MS = 7000;

export default function ThumbtackReplay({ locale }: ThumbtackReplayProps) {
  const text = locale === "es" ? copy.es : copy.en;
  const sectionRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(false);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [reduced, setReduced] = useState(false);

  const clearTimer = useCallback(() => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = null }, []);
  const scheduleFrom = useCallback((index: number) => {
    clearTimer();
    if (index >= originalConversation.length) {
      timerRef.current = setTimeout(() => { setCount(0); setTyping(false); scheduleFrom(0) }, LOOP_HOLD_MS);
      return;
    }
    const next = originalConversation[index];
    setTyping(Boolean(next.typing));
    timerRef.current = setTimeout(() => { setTyping(false); setCount(index + 1); scheduleFrom(index + 1) }, next.delay);
  }, [clearTimer]);

  const replay = useCallback(() => {
    if (reduced) return;
    clearTimer(); playingRef.current = true; setCount(0); setTyping(false); scheduleFrom(0);
  }, [clearTimer, reduced, scheduleFrom]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) { setReduced(true); setCount(originalConversation.length); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !playingRef.current) { playingRef.current = true; scheduleFrom(0) }
      else if (!entry.isIntersecting && playingRef.current) { playingRef.current = false; clearTimer(); setCount(0); setTyping(false) }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => { observer.disconnect(); clearTimer() };
  }, [clearTimer, scheduleFrom]);

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [count, reduced, typing]);

  return (
    <section ref={sectionRef} className="bold-replay" id="process">
      <div className="bold-home__shell">
        <header className="bold-home__intro bold-home__intro--wide bold-replay__intro">
          <p className="bold-home__index">{text.eyebrow}</p>
          <h2>{text.titleBefore}<span>{text.titleAccent}</span></h2>
          <p>{text.lede}</p>
        </header>

        <div className="tt-window" aria-label="Recreated Thumbtack conversation">
          <div className="tt-topbar">
            <div className="tt-mark" aria-label="Thumbtack"><span>T</span></div>
            <nav aria-label="Thumbtack preview navigation"><span>Jobs</span><b>Messages</b><span>Performance</span><span>Services</span><span>Calendar</span></nav>
            <button type="button" onClick={replay} aria-label={text.replay} title={text.replay}><RotateCcw aria-hidden="true" /><span>{text.replay}</span></button>
          </div>

          <div className="tt-layout">
            <aside className="tt-folders" aria-label="Message folders">
              <b>Folders</b>
              <span className="is-current"><MessageSquareText /> Messages</span><span><Inbox /> Unread</span><span><Archive /> Archived</span><span><Send /> Sent quotes</span><span><Star /> Starred</span>
              <hr /><b>Job status</b><span><i /> Not scheduled</span><span><i /> Scheduled</span><span><i /> Job done</span>
            </aside>

            <main className="tt-conversation">
              <div className="tt-conversation__head">
                <ArrowLeft aria-hidden="true" /><strong>Gosezett Band</strong><span>{text.scheduled} <ChevronDown aria-hidden="true" /></span>
                <div><Archive aria-hidden="true" /><Star aria-hidden="true" /><MoreHorizontal aria-hidden="true" /></div>
              </div>
              <div ref={threadRef} className="tt-thread" aria-live="off">
                <div className="tt-thread__origin"><span />{text.original}<span /></div>
                {originalConversation.slice(0, count).map((item, index) => item.from === "review" ? (
                  <div className="tt-review" key={`${item.from}-${index}`}>
                    <div><Star fill="currentColor" /> <b>{text.review}</b></div><div className="tt-review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>{item.text}</p><small>{item.meta}</small>
                  </div>
                ) : (
                  <div className={`tt-message tt-message--${item.from}`} key={`${item.from}-${index}`}>
                    <span className="tt-avatar">{item.from === "customer" ? "RL" : <Sparkles />}</span>
                    <div className="tt-message__content">{item.label && <b><Sparkles /> {item.label}</b>}<p>{item.text}</p><small>{item.meta}</small></div>
                  </div>
                ))}
                {typing && <div className="tt-message tt-message--ai"><span className="tt-avatar"><Sparkles /></span><div className="tt-message__content tt-typing" aria-label="AI agent is replying"><i /><i /><i /></div></div>}
              </div>
              <div className="tt-composer" aria-hidden="true"><span>Type message</span><Send /></div>
            </main>

            <aside className="tt-response" aria-label="Professional response comparison">
              <h3>{text.responseTitle}</h3>
              <ProRow name={text.you} rating="4.7" time="1 min" active="8 days ago" customerResponded copy={text} featured />
              <ProRow name="Pro A" rating="5.0" time="11 min" active="9 days ago" customerResponded copy={text} />
              <ProRow name="Pro B" rating="5.0" time="18 min" active="11 days ago" copy={text} />
              <ProRow name="Pro C" rating="4.8" time="1 min" active="10 days ago" customerResponded copy={text} />
              <p className="tt-response__note"><Check /> Fastest response</p>
              <div className="tt-cost">
                <h4>{text.insights} <ChevronDown /></h4>
                <h4>{text.paid}</h4>
                <p><span>{text.directLead}</span><span>$22.94</span></p>
                <p><strong>{text.total}</strong><strong>$22.94</strong></p>
                <span className="tt-cost__link">{text.manage}</span>
                <small>{text.commitment}</small>
              </div>
            </aside>
          </div>
        </div>

        <aside className="tt-audit-cta" aria-label="Thumbtack Lead Spend Audit">
          <div>
            <p>{text.auditEyebrow}</p>
            <h3>{text.auditTitle}</h3>
            <span>{text.auditBody}</span>
          </div>
          <Link href="/en/thumbtack-lead-spend-audit">{text.auditCta}<ArrowRight aria-hidden="true" /></Link>
        </aside>
      </div>
    </section>
  );
}

type ProRowProps = { name: string; rating: string; time: string; active: string; customerResponded?: boolean; featured?: boolean; copy: typeof copy.en | typeof copy.es };
function ProRow({ name, rating, time, active, customerResponded = false, featured = false, copy: text }: ProRowProps) {
  return <div className={`tt-pro ${featured ? "tt-pro--featured" : ""}`}>
    <span className="tt-pro__avatar">{featured ? <Check /> : name.slice(-1)}</span>
    <div><b>{name}</b><p><Star fill="currentColor" /> <strong>{rating}</strong></p><small><ArrowLeft /> {text.replied} <b>{time}</b></small><small><MessageSquareText /> {customerResponded ? text.response : text.notResponse}</small><small><Clock3 /> {text.active}: <b>{active}</b></small></div>
  </div>;
}
