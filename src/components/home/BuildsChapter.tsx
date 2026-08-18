"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type BuildsChapterProps = { locale: string };

const content = {
  en: {
    index: "Live systems",
    statement: ["Built for the field.", "Running today."],
    category: "Logistics & transportation",
    title: "Saguaro Transport",
    body: "Saguaro Transport runs fleet tracking and dispatch in one operating view. Customer records, invoicing, compliance, and driver history stay attached to the work.",
    points: ["Real-time GPS and task assignment", "Route planning and maintenance schedules", "Customer records and invoicing", "Driver onboarding and compliance"],
    cta: "Explore our builds",
  },
  es: {
    index: "Sistemas en vivo",
    statement: ["Hechos para el campo.", "Operando hoy."],
    category: "Logística y transporte",
    title: "Saguaro Transport",
    body: "Saguaro Transport maneja el rastreo de flota y dispatch en una sola vista operativa. Los clientes, facturas, cumplimiento e historial de conductores permanecen unidos al trabajo.",
    points: ["GPS y asignación de tareas en tiempo real", "Planeación de rutas y mantenimiento", "Registros de clientes y facturación", "Onboarding y cumplimiento de conductores"],
    cta: "Explorar nuestros sistemas",
  },
} as const;

export default function BuildsChapter({ locale }: BuildsChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const text = locale === "es" ? content.es : content.en;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      section.style.setProperty("--build-shift", `${progress * -66}vw`);
      section.style.setProperty("--build-progress", String(progress));
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
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bold-builds" id="builds">
      <div className="bold-builds__sticky">
        <div className="bold-builds__track">
          <div className="bold-builds__statement">
            <p className="bold-home__index">{text.index}</p>
            <h2>{text.statement.map((line, index) => <span key={line} className={index === text.statement.length - 1 ? "is-accent" : undefined}>{line}</span>)}</h2>
          </div>

          <article className="bold-builds__case">
            <div className="bold-builds__copy">
              <p className="bold-home__index">{text.category}</p>
              <h3>{text.title}</h3>
              <p>{text.body}</p>
              <ul>{text.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link href={`/${locale}/systems-we-build`}>{text.cta}<span>↗</span></Link>
            </div>
            <div className="bold-builds__laptop">
              <Image src="/images/assets-platforms/laptop.png" alt="Saguaro Transport dispatch and operations dashboard" width={1200} height={750} sizes="(max-width: 900px) 90vw, 62vw" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
