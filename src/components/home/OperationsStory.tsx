"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type OperationsStoryProps = { locale: string };

const stories = {
  en: {
    eyebrow: "03 / Lead → job",
    title: "From missed call to booked job in under a minute.",
    lede: "The happy path runs by itself. Anything unusual reaches a human with the context already attached.",
    steps: [
      { short: "Lead arrives", hint: "Call, form, Thumbtack, or chat", status: "Incoming lead", kicker: "New request · Phoenix", title: "Garage cleanout", body: "Answered in 8 seconds. English detected. Intake started.", tags: ["After hours", "New customer", "Web lead"] },
      { short: "Agent decides", hint: "Qualifies, prices, checks capacity", status: "Agent working", kicker: "Intent confirmed · 00:22", title: "2-car garage", body: "Volume, access, material type, and timing collected without a form.", tags: ["Qualified", "Pricebook matched", "No hazards"] },
      { short: "Customer books", hint: "A real slot lands on the calendar", status: "Slot reserved", kicker: "Tomorrow · 9:30 AM", title: "Job booked", body: "The customer chose a real opening. Confirmation sent immediately.", tags: ["Calendar synced", "SMS sent", "$425 range"] },
      { short: "Your crew moves", hint: "Dispatch receives every detail", status: "Dispatch updated", kicker: "Crew 02 · Route assigned", title: "Ready to move", body: "Your team receives the job, address, photos, notes, and full call summary.", tags: ["Crew notified", "Route updated", "CRM logged"] },
    ],
  },
  es: {
    eyebrow: "03 / Lead → trabajo",
    title: "De llamada perdida a trabajo reservado en menos de un minuto.",
    lede: "El camino normal funciona solo. Cualquier excepción llega a una persona con todo el contexto adjunto.",
    steps: [
      { short: "Llega el lead", hint: "Llamada, formulario, Thumbtack o chat", status: "Lead entrante", kicker: "Nueva solicitud · Phoenix", title: "Limpieza de garaje", body: "Contestada en 8 segundos. Español detectado. Intake iniciado.", tags: ["Fuera de horario", "Cliente nuevo", "Lead web"] },
      { short: "El agente decide", hint: "Califica, cotiza y revisa capacidad", status: "Agente trabajando", kicker: "Intención confirmada · 00:22", title: "Garaje para 2 autos", body: "Volumen, acceso, materiales y horario recopilados sin formulario.", tags: ["Calificado", "Precio encontrado", "Sin riesgos"] },
      { short: "El cliente reserva", hint: "Un horario real llega al calendario", status: "Horario reservado", kicker: "Mañana · 9:30 AM", title: "Trabajo reservado", body: "El cliente eligió un horario real. La confirmación salió al instante.", tags: ["Calendario listo", "SMS enviado", "Rango $425"] },
      { short: "El equipo se mueve", hint: "Dispatch recibe cada detalle", status: "Dispatch actualizado", kicker: "Equipo 02 · Ruta asignada", title: "Listo para salir", body: "Tu equipo recibe el trabajo, dirección, fotos, notas y resumen completo.", tags: ["Equipo avisado", "Ruta lista", "CRM actualizado"] },
    ],
  },
} as const;

export default function OperationsStory({ locale }: OperationsStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const text = locale === "es" ? stories.es : stories.en;
  const item = text.steps[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(max-width: 800px)").matches) return;
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / range));
      const next = Math.min(text.steps.length - 1, Math.floor(progress * text.steps.length));
      setActive((current) => (current === next ? current : next));
      section.style.setProperty("--operation-progress", String(progress));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestUpdate();
    });

    observer.observe(section);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [text.steps.length]);

  const goToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section || window.innerWidth <= 800) {
      setActive(index);
      return;
    }
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * (index / (text.steps.length - 1)), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="bold-operation" id="process">
      <header className="bold-operation__intro bold-home__shell">
        <p className="bold-home__index">{text.eyebrow}</p>
        <h2>{text.title}</h2>
        <p>{text.lede}</p>
      </header>

      <div className="bold-operation__sticky bold-home__shell">
        <div className="bold-operation__steps" role="list" aria-label="Lead to job process">
          {text.steps.map((step, index) => (
            <button key={step.short} type="button" className={active === index ? "is-active" : undefined} onClick={() => goToStep(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{step.short}</b>
              <small>{step.hint}</small>
            </button>
          ))}
        </div>

        <div className="bold-operation__visual">
          <div className="bold-operation__orbit" aria-hidden="true"><span /></div>
          <div className="bold-operation__card">
            <div className="bold-operation__card-head">
              <i />
              <span>{item.status}</span>
              <span>11:30:{String(8 + active * 14).padStart(2, "0")}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="bold-operation__screen"
              >
                <div className="bold-operation__avatar">{active === 3 ? "02" : "JM"}</div>
                <p>{item.kicker}</p>
                <h3>{item.title}</h3>
                <div className="bold-operation__rule" />
                <p>{item.body}</p>
                <div className="bold-operation__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.div>
            </AnimatePresence>
            <div className="bold-operation__card-foot">
              <span>Automated</span>
              <div aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map((bar) => <i key={bar} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
