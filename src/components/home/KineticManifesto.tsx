"use client";

import { useEffect, useRef } from "react";

type KineticManifestoProps = {
  locale: string;
};

const copy = {
  en: {
    label: "The operation, compressed",
    lines: ["Answer in seconds", "Qualify the job", "Book the slot", "Move the crew"],
    closing: "One continuous system. No voicemail. No copy-and-paste. No lead left waiting.",
  },
  es: {
    label: "La operación, comprimida",
    lines: ["Contesta en segundos", "Califica el trabajo", "Reserva el horario", "Mueve al equipo"],
    closing: "Un solo sistema continuo. Sin buzón de voz. Sin copiar y pegar. Ningún lead esperando.",
  },
} as const;

export default function KineticManifesto({ locale }: KineticManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const distance = window.innerWidth < 700 ? 4 : 20;
      const shift = (progress - 0.5) * distance;
      section.style.setProperty("--manifesto-shift", `${shift}vw`);
      section.style.setProperty("--manifesto-shift-reverse", `${-shift}vw`);
      section.style.setProperty("--manifesto-progress", String(progress));
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
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
  }, []);

  const text = locale === "es" ? copy.es : copy.en;

  return (
    <section ref={sectionRef} className="bold-manifesto" aria-labelledby="manifesto-title">
      <div className="bold-manifesto__sticky">
        <p className="bold-home__index">01 / {text.label}</p>
        <h2 id="manifesto-title" className="sr-only">{text.lines.join(". ")}</h2>
        <div className="bold-manifesto__lines" aria-hidden="true">
          {text.lines.map((line, index) => (
            <p key={line} className={index === 3 ? "is-accent" : undefined}>
              {line}
            </p>
          ))}
        </div>
        <p className="bold-manifesto__closing">{text.closing}</p>
      </div>
    </section>
  );
}
