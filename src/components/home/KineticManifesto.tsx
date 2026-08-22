"use client";

import { useEffect, useRef } from "react";

type KineticManifestoProps = {
  locale: string;
};

const copy = {
  en: {
    label: "The operation in motion",
    lines: ["Answer every call", "Qualify every lead", "Book approved jobs", "Move the crew"],
    closing: "First-party Thumbtack and Housecall Pro exports from one live junk-removal pipeline show weekly lead spend falling from $1,644 to $582. Cost per lead fell from $32 to $17.",
  },
  es: {
    label: "La operación en movimiento",
    lines: ["Contesta cada llamada", "Califica cada lead", "Agenda trabajos aprobados", "Mueve al equipo"],
    closing: "Exportaciones propias de Thumbtack y Housecall Pro de un pipeline activo para retiro de escombros muestran que el gasto semanal bajó de $1,644 a $582. El costo por lead bajó de $32 a $17.",
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
      // Progress runs from the section's first visible pixel through the end
      // of the pin, so the lines start flying in as soon as the section
      // appears instead of waiting for the sticky region to engage.
      const range = Math.max(1, rect.height);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / range));
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
        <p className="bold-home__index">{text.label}</p>
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
