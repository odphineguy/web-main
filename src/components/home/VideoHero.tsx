import Image from "next/image";
import Link from "next/link";

type VideoHeroProps = {
  locale: string;
  title: string;
  accent: string;
  subtitle: string;
  primaryLabel: string;
  eyebrow: string;
  secondaryLabel: string;
};

export default function VideoHero({
  locale,
  title,
  accent,
  subtitle,
  primaryLabel,
  eyebrow,
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
            src="/images/portfolio/abemedia.white.svg"
            alt="Abe Media"
            width={864}
            height={225}
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
        <p className="home-video-hero__eyebrow">{eyebrow}</p>
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

      <div className="home-video-hero__outcomes" aria-label="Live system outcomes">
        <p><span>00:08</span><small>{locale === "es" ? "tiempo de respuesta" : "answer time"}</small></p>
        <p><span>EN ⇄ ES</span><small>{locale === "es" ? "cambio nativo" : "native switching"}</small></p>
        <p><span>24/7</span><small>{locale === "es" ? "siempre activo" : "always moving"}</small></p>
      </div>

      <p className="home-video-hero__meta">Phoenix, Arizona&nbsp;&nbsp;/&nbsp;&nbsp;English y español</p>
      <span className="home-video-hero__scroll" aria-hidden="true">Scroll</span>
      <span className="home-video-hero__sentinel" data-home-hero-end aria-hidden="true" />
    </section>
  );
}
