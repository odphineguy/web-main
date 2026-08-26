"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PhoneFrame from "@/components/PhoneFrame";
import { homeFaqIds } from "@/components/HomeFaq";
import VideoHero from "@/components/home/VideoHero";
import KineticManifesto from "@/components/home/KineticManifesto";
import OperationsStory from "@/components/home/OperationsStory";
import CallProof from "@/components/home/CallProof";
import BuildsChapter from "@/components/home/BuildsChapter";
import ConsultationForm from "@/components/ConsultationForm";

const pageCopy = {
  en: {
    hero: {
      title: "When the phone rings,",
      accent: "your business moves.",
      subtitle: "AI voice agents, dispatch systems, lead automation, and estimating tools for service businesses.",
      secondary: "See a live workflow",
    },
    estimateIndex: "Visual estimate",
    leadIndex: "The owner's inbox",
    leadTitle: "The render lands in your inbox as a lead.",
    leadBody: "Name, phone, the finished design, traced square footage, and a budget range — attached to an email before you ever pick up the phone.",
    leadAlt1: "Lead email a business owner receives, part one: customer details and the finished AI design",
    leadAlt2: "Lead email a business owner receives, part two: traced square footage and budget range",
    servicesIndex: "What we build",
    servicesTitle: {
      before: "Software built around how your ",
      accent: "operation",
      after: " actually runs.",
    },
    servicesLede: "Exceptions, handoffs, pricebooks, and escalation paths shape the build.",
    faqIndex: "Straight answers",
    faqTitle: "Before you put an agent on the phones.",
    contactIndex: "Ready when you are",
    contactTitle: "Put an AI agent on your phones this month.",
    contactBody: "Tell us how your calls and handoffs work today. We will give you the scope, timeline, integration plan, and cost.",
    contactCta: "Let’s Talk",
    contactSecondary: "Or schedule a call",
    contactMeta: "No obligation · Replies within 1 business day",
  },
  es: {
    hero: {
      title: "Cuando suena el teléfono,",
      accent: "tu negocio se mueve.",
      subtitle: "Agentes de voz con IA, sistemas de dispatch, automatización de leads y herramientas de estimación para negocios de servicios.",
      secondary: "Verlo en acción",
    },
    estimateIndex: "Estimado visual",
    leadIndex: "El inbox del dueño",
    leadTitle: "El diseño llega a tu inbox como un lead.",
    leadBody: "Nombre, teléfono, el diseño terminado, los pies cuadrados trazados y un rango de presupuesto — adjuntos a un correo antes de que levantes el teléfono.",
    leadAlt1: "Correo de lead que recibe el dueño del negocio, parte uno: datos del cliente y el diseño terminado con IA",
    leadAlt2: "Correo de lead que recibe el dueño del negocio, parte dos: pies cuadrados trazados y rango de presupuesto",
    servicesIndex: "Lo que construimos",
    servicesTitle: {
      before: "Software construido alrededor de cómo funciona tu ",
      accent: "operación",
      after: ".",
    },
    servicesLede: "Las excepciones, los handoffs, los pricebooks y las rutas de escalación definen el sistema.",
    faqIndex: "Respuestas directas",
    faqTitle: "Antes de poner un agente en tus teléfonos.",
    contactIndex: "Cuando estés listo",
    contactTitle: "Pon un agente de IA en tus teléfonos este mes.",
    contactBody: "Cuéntanos cómo funcionan hoy tus llamadas y handoffs. Te daremos el alcance, plazo, plan de integración y costo.",
    contactCta: "Hablemos",
    contactSecondary: "O agenda una llamada",
    contactMeta: "Sin compromiso · Respuesta en 1 día hábil",
  },
} as const;

const serviceKeys = ["voice", "dispatch", "pipeline", "apps"] as const;
const serviceRoutes = ["/services/ai-voice-agents", "/services/dispatch-operations-software", "/services/lead-pipeline-automation", "/systems-we-build"];

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("Home");
  const text = locale === "es" ? pageCopy.es : pageCopy.en;
  const [consultationOpen, setConsultationOpen] = useState(false);

  const openConsultation = (event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    setConsultationOpen(true);
  };

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
        secondaryLabel={text.hero.secondary}
        onPrimaryClick={openConsultation}
      />

      <KineticManifesto locale={locale} />

      <section id="visual-estimate" className="bold-estimate">
        <div className="bold-home__shell">
          <header className="bold-home__intro bold-home__intro--wide">
            <p className="bold-home__index">{text.estimateIndex}</p>
            <h2>{t.rich("VisualEstimate.title", { accent: (chunks) => <span>{chunks}</span> })}</h2>
            <p>{t("VisualEstimate.lede")}</p>
          </header>

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
            }, {
              id: "paint",
              label: t("VisualEstimate.paintLabel"),
              beforeSrc: "/images/home/paint-before.webp",
              afterSrc: "/images/home/paint-after.webp",
              beforeAlt: t("VisualEstimate.paintBeforeAlt"),
              afterAlt: t("VisualEstimate.paintAfterAlt"),
            }, {
              id: "doors",
              label: t("VisualEstimate.doorsLabel"),
              beforeSrc: "/images/home/door-before.webp",
              afterSrc: "/images/home/door-after.webp",
              beforeAlt: t("VisualEstimate.doorsBeforeAlt"),
              afterAlt: t("VisualEstimate.doorsAfterAlt"),
            }, {
              id: "windows",
              label: t("VisualEstimate.windowsLabel"),
              beforeSrc: "/images/home/windows-before.webp",
              afterSrc: "/images/home/windows-after.webp",
              beforeAlt: t("VisualEstimate.windowsBeforeAlt"),
              afterAlt: t("VisualEstimate.windowsAfterAlt"),
            }]}
          />

          <div className="bold-estimate__lead">
            <div className="bold-estimate__lead-copy">
              <p className="bold-home__index">{text.leadIndex}</p>
              <h3>{text.leadTitle}</h3>
              <p>{text.leadBody}</p>
            </div>
            <PhoneFrame
              mode="fade"
              framed={false}
              className="bold-estimate__phone"
              screens={[
                { src: "/images/home/phone-lead1.webp", alt: text.leadAlt1, width: 1530, height: 3036 },
                { src: "/images/home/phone-lead2.webp", alt: text.leadAlt2, width: 1530, height: 3036 },
              ]}
            />
          </div>
        </div>
      </section>

      <OperationsStory locale={locale} />

      <CallProof locale={locale} />

      <section className="bold-services" id="services">
        <div className="bold-home__shell">
          <header className="bold-home__intro bold-home__intro--wide">
            <p className="bold-home__index">{text.servicesIndex}</p>
            <h2>{text.servicesTitle.before}<span>{text.servicesTitle.accent}</span>{text.servicesTitle.after}</h2>
            <p>{text.servicesLede}</p>
          </header>
          <div className="bold-services__list">
            {serviceKeys.map((key, index) => (
              <Link key={key} href={`/${locale}${serviceRoutes[index]}`}>
                <h3>{t(`ServicesGrid.${key}.title`)}</h3>
                <p>{t(`ServicesGrid.${key}.description`)}</p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BuildsChapter locale={locale} />

      <section className="bold-faq" id="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
        <div className="bold-home__shell">
          <header>
            <p className="bold-home__index">{text.faqIndex}</p>
            <h2>{text.faqTitle}</h2>
          </header>
          <div className="bold-faq__list">
            {homeFaqIds.slice(3).map((id) => (
              <details key={id}>
                <summary>{t(`Faq.${id}.question`)}<b aria-hidden="true">+</b></summary>
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
          <Link href={`/${locale}/contact`} onClick={openConsultation}>{text.contactCta}<span>↗</span></Link>
          <p className="bold-contact__secondary">
            <a href="https://cal.com/abe-p-698781/talk-with-abe" target="_blank" rel="noreferrer">{text.contactSecondary}</a>
          </p>
          <small>{text.contactMeta}</small>
        </div>
      </section>
      <ConsultationForm isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
