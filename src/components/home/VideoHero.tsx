import Image from "next/image";
import Link from "next/link";

type VideoHeroProps = {
  locale: string;
  title: string;
  accent: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export default function VideoHero({
  locale,
  title,
  accent,
  subtitle,
  primaryLabel,
  secondaryLabel,
}: VideoHeroProps) {
  return (
    <section className="home-video-hero" data-home-hero>
      <video
        className="home-video-hero__media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/workflow-hero-poster.jpg"
        aria-hidden="true"
      >
        {/* Temporary reel. Replace this single path when Abe's product montage is ready. */}
        <source src="/video/workflow-hero.mp4" type="video/mp4" />
      </video>
      <div className="home-video-hero__wash" aria-hidden="true" />

      <div className="home-video-hero__top">
        <Link href={`/${locale}`} aria-label="Abe Media home" className="home-video-hero__brand">
          <Image
            src="/images/home/abemedia-new-darkmode.png"
            alt="Abe Media"
            width={2172}
            height={724}
            priority
          />
        </Link>
        <Link href={`/${locale}/contact`} className="home-video-hero__project-link">
          <span aria-hidden="true" />
          {primaryLabel}
          <b aria-hidden="true">↗</b>
        </Link>
      </div>

      <div className="home-video-hero__content">
        <h1 className="home-video-hero__title">
          {title} <em>{accent}</em>
        </h1>
        <p className="home-video-hero__subtitle">{subtitle}</p>
        <div className="home-video-hero__actions">
          <Link href={`/${locale}/contact`} className="home-video-hero__primary">
            <span aria-hidden="true" />
            {primaryLabel}
            <b aria-hidden="true">↗</b>
          </Link>
          <a href="#visual-estimate" className="home-video-hero__secondary">
            {secondaryLabel} <b aria-hidden="true">↓</b>
          </a>
        </div>
      </div>

      <div className="home-video-hero__outcomes" aria-label={locale === "es" ? "Resultados del sistema en vivo" : "Live system outcomes"}>
        <p><span>00:08</span><small>{locale === "es" ? "tiempo de respuesta" : "answer time"}</small></p>
        <p><span>EN ⇄ ES</span><small>{locale === "es" ? "cambio nativo" : "native switching"}</small></p>
        <p><span>24/7</span><small>{locale === "es" ? "cobertura de llamadas" : "call coverage"}</small></p>
        <p><span>{locale === "es" ? "PERSONA" : "HUMAN"}</span><small>{locale === "es" ? "recibe excepciones" : "gets exceptions"}</small></p>
      </div>

      <span className="home-video-hero__scroll" aria-hidden="true">Scroll</span>
      <span className="home-video-hero__sentinel" data-home-hero-end aria-hidden="true" />
    </section>
  );
}
