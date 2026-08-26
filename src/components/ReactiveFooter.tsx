"use client";

import { useCallback, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Music2, Twitter } from "lucide-react";
import ClutchWidget from "@/components/ClutchWidget";
import ConsultationForm from "@/components/ConsultationForm";

type ReactiveFooterProps = { locale: string };

const footerCopy = {
  en: {
    eyebrow: "The next shift can run itself",
    title: "Ready for a real operational push?",
    primary: "Let’s Talk",
    secondary: "Schedule a call",
    services: "Services",
    explore: "Explore",
    follow: "Follow",
    contact: "Contact",
    missedCallTextBack: "Missed call text back",
    privacy: "Privacy",
    terms: "Terms",
    items: ["Voice agents", "Dispatch systems", "Lead automation", "Custom apps"],
  },
  es: {
    eyebrow: "El próximo turno puede operar solo",
    title: "¿Listo para llevar tu operación más lejos?",
    primary: "Hablemos",
    secondary: "Agenda una llamada",
    services: "Servicios",
    explore: "Explorar",
    follow: "Síguenos",
    contact: "Contacto",
    missedCallTextBack: "Respuesta por texto",
    privacy: "Privacidad",
    terms: "Términos",
    items: ["Agentes de voz", "Sistemas de dispatch", "Automatización de leads", "Apps a medida"],
  },
} as const;

export default function ReactiveFooter({ locale }: ReactiveFooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const copy = locale === "es" ? footerCopy.es : footerCopy.en;

  const openConsultation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setConsultationOpen(true);
  };

  const moveGlow = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const footer = footerRef.current;
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      footer.style.setProperty("--footer-glow-x", `${x}px`);
      footer.style.setProperty("--footer-glow-y", `${y}px`);
      footer.dataset.glow = "active";
    });
  }, []);

  const hideGlow = useCallback(() => {
    if (footerRef.current) footerRef.current.dataset.glow = "idle";
  }, []);

  return (
    <>
    <footer
      ref={footerRef}
      className="reactive-footer"
      data-glow="idle"
      onPointerMove={moveGlow}
      onPointerLeave={hideGlow}
    >
      <div className="reactive-footer__glow" aria-hidden="true" />
      <div className="reactive-footer__watermark" aria-hidden="true">ABEMEDIA</div>

      <div className="reactive-footer__top">
        <div>
          <p>{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
        </div>
        <div className="reactive-footer__ctas">
          <Link href={`/${locale}/contact`} onClick={openConsultation}><span />{copy.primary}<b>↗</b></Link>
          <a href="https://cal.com/abe-p-698781/talk-with-abe" target="_blank" rel="noreferrer"><span />{copy.secondary}<b>↗</b></a>
        </div>
      </div>

      <div className="reactive-footer__grid">
        <div className="reactive-footer__brand">
          <Link href={`/${locale}`} aria-label="Abe Media home">
            <Image src="/images/portfolio/abemedia.white.svg" alt="Abe Media" width={864} height={225} />
          </Link>
          <p>Los Angeles · Phoenix<br />AI systems built from real operations.</p>
        </div>

        <div>
          <h3>{copy.contact}</h3>
          <a href="mailto:abe@abemedia.online">abe@abemedia.online</a>
          <a href="tel:+12138452704">+1 213 845 2704</a>
        </div>

        <div>
          <h3>{copy.services}</h3>
          {copy.items.map((item) => <span key={item}>{item}</span>)}
        </div>

        <div>
          <h3>{copy.explore}</h3>
          <Link href={`/${locale}/about/abe-perez`}>About</Link>
          <Link href={`/${locale}/services`}>Services</Link>
          <Link href={`/${locale}/portfolio`}>Case studies</Link>
          <Link href={`/${locale}/industries`}>Industries</Link>
          <Link href={`/${locale}/systems-we-build`}>Our builds</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
          <Link href={`/${locale}/missed-call-text-back`}>{copy.missedCallTextBack}</Link>
        </div>

        <div className="reactive-footer__social">
          <h3>{copy.follow}</h3>
          <div>
            <a href="https://x.com/abe_vision" target="_blank" rel="noreferrer" aria-label="X / Twitter"><Twitter /></a>
            <a href="https://www.instagram.com/abevision_" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://www.facebook.com/profile.php?id=100091085333551" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href="https://www.tiktok.com/@abevision_" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 /></a>
          </div>
        </div>
      </div>

      <div className="reactive-footer__bottom">
        <ClutchWidget className="reactive-footer__clutch" />
        <p>© 2026 Abevision LLC</p>
        <p><Link href={`/${locale}/privacy`}>{copy.privacy}</Link><Link href={`/${locale}/terms`}>{copy.terms}</Link></p>
      </div>
    </footer>
    <ConsultationForm isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  );
}
