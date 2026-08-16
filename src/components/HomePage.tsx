"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { homeFaqIds } from "@/components/HomeFaq";
import VideoHero from "@/components/home/VideoHero";
import KineticManifesto from "@/components/home/KineticManifesto";
import OperationsStory from "@/components/home/OperationsStory";
import BuildsChapter from "@/components/home/BuildsChapter";

const pageCopy = {
  en: {
    hero: {
      eyebrow: "AI systems for service businesses · Phoenix, AZ",
      title: "When the phone rings,",
      accent: "your business moves.",
      subtitle: "AI agents, dispatch software, and bilingual automation—built by someone who ran the operation first.",
      secondary: "See it work",
    },
    estimateIndex: "02 / Visual estimate",
    estimateNote: "What arrives with the lead",
    estimateItems: ["Finished design", "Traced square footage", "Budget range", "Customer intent"],
    estimatePrompt: "Drag the handle. This is the exact experience your customer gets.",
    servicesIndex: "04 / What we build",
    servicesTitle: {
      before: "Software shaped by the ",
      accent: "operation",
      after: ", not an industry label.",
    },
    servicesLede: "We build around how your team actually works—exceptions, handoffs, and all.",
    founderIndex: "06 / Why Abe Media",
    founderQuote: {
      before: "I ran dispatch before I ",
      accent: "automated",
      after: " it.",
    },
    founderBody: "Seventeen years managing dispatch at Waste Management Los Angeles—including recycLA, a billion-dollar franchise. Now I build the tools I wished I had.",
    founderName: "Abe Perez · Founder, operator, builder",
    faqIndex: "07 / Straight answers",
    faqTitle: "Before you put an agent on the phones.",
    contactIndex: "Ready when you are",
    contactTitle: "Put an agent on your phones this month.",
    contactBody: "Tell us what your operation looks like. We’ll tell you what it takes—scope, timeline, and cost.",
    contactCta: "Schedule a call",
    contactMeta: "No obligation · Replies within 1 business day",
  },
  es: {
    hero: {
      eyebrow: "Sistemas de IA para empresas de servicios · Phoenix, AZ",
      title: "Cuando suena el teléfono,",
      accent: "tu negocio se mueve.",
      subtitle: "Agentes de IA, software de dispatch y automatización bilingüe—creados por alguien que primero operó el negocio.",
      secondary: "Ver cómo funciona",
    },
    estimateIndex: "02 / Estimado visual",
    estimateNote: "Lo que llega con el lead",
    estimateItems: ["Diseño terminado", "Pies cuadrados trazados", "Rango de presupuesto", "Intención del cliente"],
    estimatePrompt: "Arrastra el control. Esta es la experiencia exacta que recibe tu cliente.",
    servicesIndex: "04 / Lo que construimos",
    servicesTitle: {
      before: "Software diseñado por ",
      accent: "la operación",
      after: ", no por una etiqueta de industria.",
    },
    servicesLede: "Construimos alrededor de cómo trabaja tu equipo—excepciones, entregas y todo lo demás.",
    founderIndex: "06 / Por qué Abe Media",
    founderQuote: {
      before: "Operé dispatch antes de ",
      accent: "automatizarlo",
      after: ".",
    },
    founderBody: "Diecisiete años dirigiendo dispatch en Waste Management Los Angeles—including recycLA, una franquicia de mil millones de dólares. Ahora construyo las herramientas que necesitaba entonces.",
    founderName: "Abe Perez · Fundador, operador, constructor",
    faqIndex: "07 / Respuestas directas",
    faqTitle: "Antes de poner un agente en tus teléfonos.",
    contactIndex: "Cuando estés listo",
    contactTitle: "Pon un agente en tus teléfonos este mes.",
    contactBody: "Cuéntanos cómo funciona tu operación. Te diremos qué requiere—alcance, tiempo y costo.",
    contactCta: "Agenda una llamada",
    contactMeta: "Sin compromiso · Respuesta en 1 día hábil",
  },
} as const;

const serviceKeys = ["voice", "dispatch", "pipeline", "apps"] as const;
const serviceRoutes = ["/services/ai-voice-agents", "/services/dispatch-operations-software", "/services/lead-pipeline-automation", "/systems-we-build"];

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("Home");
  const text = locale === "es" ? pageCopy.es : pageCopy.en;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqIds.map((id) => ({
      "@type": "Question",
      name: t(`Faq.${id}.question`),
      acceptedAnswer: { "@type": "Answer", text: t(`Faq.${id}.answer`) },
    })),
  };

  return (
    <div className="bold-home">
      <VideoHero
        locale={locale}
        title={text.hero.title}
        accent={text.hero.accent}
        subtitle={text.hero.subtitle}
        primaryLabel={t("Hero.scheduleCta")}
        eyebrow={text.hero.eyebrow}
        secondaryLabel={text.hero.secondary}
      />

      <KineticManifesto locale={locale} />

      <section id="visual-estimate" className="bold-estimate">
        <div className="bold-home__shell">
          <header className="bold-home__intro">
            <p className="bold-home__index">{text.estimateIndex}</p>
            <h2>{t("VisualEstimate.title")}</h2>
            <p>{t("VisualEstimate.lede")}</p>
          </header>

          <div className="bold-estimate__layout">
            <BeforeAfterSlider
              className="bold-estimate__compare"
              beforeLabel={t("VisualEstimate.beforeLabel")}
              afterLabel={t("VisualEstimate.afterLabel")}
              tabsLabel={t("VisualEstimate.tabsLabel")}
              frameAspectClassName="aspect-[4/3] sm:aspect-[16/9]"
              pairs={[{
                id: "turf",
                label: t("VisualEstimate.turfLabel"),
                beforeSrc: "/images/home/turf-before.webp",
                afterSrc: "/images/home/turf-after.webp",
                beforeAlt: t("VisualEstimate.turfBeforeAlt"),
                afterAlt: t("VisualEstimate.turfAfterAlt"),
              }]}
            />
            <aside className="bold-estimate__note">
              <p className="bold-home__index">{text.estimateNote}</p>
              <ol>{text.estimateItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b></li>)}</ol>
              <p>{text.estimatePrompt}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bold-proof" aria-label="Abe Media experience">
        <div className="bold-home__shell">
          {[t("ProofBar.item1"), t("ProofBar.item2"), t("ProofBar.item3"), t("ProofBar.item4")].map((item, index) => (
            <p key={item}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{item}</span></p>
          ))}
        </div>
      </section>

      <OperationsStory locale={locale} />

      <section className="bold-services" id="services">
        <div className="bold-home__shell">
          <header className="bold-home__intro bold-home__intro--services">
            <p className="bold-home__index">{text.servicesIndex}</p>
            <h2>{text.servicesTitle.before}<span>{text.servicesTitle.accent}</span>{text.servicesTitle.after}</h2>
            <p>{text.servicesLede}</p>
          </header>
          <div className="bold-services__list">
            {serviceKeys.map((key, index) => (
              <Link key={key} href={`/${locale}${serviceRoutes[index]}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(`ServicesGrid.${key}.title`)}</h3>
                <p>{t(`ServicesGrid.${key}.description`)}</p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BuildsChapter locale={locale} />

      <section className="bold-founder">
        <div className="bold-home__shell">
          <p className="bold-home__index">{text.founderIndex}</p>
          <blockquote>“{text.founderQuote.before}<span>{text.founderQuote.accent}</span>{text.founderQuote.after}”</blockquote>
          <div>
            <p>{text.founderBody}</p>
            <p>{text.founderName}</p>
          </div>
        </div>
      </section>

      <section className="bold-faq" id="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
        <div className="bold-home__shell">
          <header>
            <p className="bold-home__index">{text.faqIndex}</p>
            <h2>{text.faqTitle}</h2>
          </header>
          <div className="bold-faq__list">
            {homeFaqIds.slice(3).map((id, index) => (
              <details key={id}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{t(`Faq.${id}.question`)}<b aria-hidden="true">+</b></summary>
                <p>{t(`Faq.${id}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bold-contact">
        <div className="bold-contact__orb bold-contact__orb--small" aria-hidden="true" />
        <div className="bold-contact__orb bold-contact__orb--large" aria-hidden="true" />
        <div className="bold-home__shell">
          <p className="bold-home__index">{text.contactIndex}</p>
          <h2>{text.contactTitle}</h2>
          <p>{text.contactBody}</p>
          <Link href={`/${locale}/contact`}>{text.contactCta}<span>↗</span></Link>
          <small>{text.contactMeta}</small>
        </div>
      </section>
    </div>
  );
}
