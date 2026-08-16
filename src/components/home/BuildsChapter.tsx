"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type BuildsChapterProps = { locale: string };

const content = {
  en: {
    index: "05 / Running now",
    statement: ["Not decks.", "Not demos.", "Operating systems."],
    category: "Logistics & transportation",
    title: "Saguaro Transport",
    body: "Live fleet tracking, dispatch, CRM, accounting, and HR—one dashboard, not six tabs.",
    points: ["Real-time GPS and task assignment", "Driver onboarding and compliance", "Customer, invoice, and fleet history"],
    cta: "Explore our builds",
  },
  es: {
    index: "05 / Operando ahora",
    statement: ["No son decks.", "No son demos.", "Son sistemas reales."],
    category: "Logística y transporte",
    title: "Saguaro Transport",
    body: "Flota en vivo, dispatch, CRM, contabilidad y RR. HH.—un tablero, no seis pestañas.",
    points: ["GPS y asignación en tiempo real", "Onboarding y cumplimiento de conductores", "Historial de clientes, facturas y flota"],
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
            <h2>{text.statement.map((line, index) => <span key={line} className={index === 2 ? "is-accent" : undefined}>{line}</span>)}</h2>
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
