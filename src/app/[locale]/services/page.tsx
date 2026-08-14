"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";
import { Reveal } from "@/components/ds/PageShell";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";

const services = [
  {
    id: "aiVoice",
    image: "/images/services/ai-chatbots-agents.png",
    link: "/services/ai-voice-agents",
  },
  {
    id: "dispatch",
    image: "/images/services/mobile-app-development.png",
    link: "/services/dispatch-operations-software",
  },
  {
    id: "leadPipeline",
    image: "/images/services/web-development.png",
    link: "/services/lead-pipeline-automation",
  },
  {
    id: "aiEstimating",
    image: "/images/services/ui-ux-design.png",
    link: "/services/ai-estimating-tools",
  },
  {
    id: "bilingualAutomation",
    image: "/images/services/bilingual-web-development.png",
    link: "/services/bilingual-ai-automation",
  },
  {
    id: "customSoftware",
    image: "/images/services/brand-identity.png",
    link: "/services/custom-business-software",
  },
] as const;

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "what-we-build", label: "What we build" },
  { id: "start", label: "Get started" },
];

export default function Services() {
  const t = useTranslations("Services");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <PageShell railCap="SERVICES" railItems={RAIL}>
      <div id="overview">
        <PageHero
          eyebrow={t("Hero.eyebrow")}
          title={
            <>
              {t("Hero.title")}{" "}
              <span className="text-[var(--ds-accent)]">
                {t("Hero.highlight")}
              </span>
            </>
          }
          lede={t("Hero.subtitle")}
          meta={<span className="ds-meta">{t("Hero.meta")}</span>}
          actions={
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="ds-btn ds-btn-primary"
            >
              {t("Hero.cta")}
            </button>
          }
        />
      </div>

      <Section
        id="what-we-build"
        eyebrow={t("GridEyebrow")}
        title={t("GridTitle")}
      >
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} index={i}>
              <DsCard
                index={i}
                href={`/en${service.link}`}
                title={t(`Cards.${service.id}.title`)}
                description={t(`Cards.${service.id}.description`)}
                points={(["f1", "f2", "f3", "f4"] as const).map((k) =>
                  t(`Cards.${service.id}.features.${k}`),
                )}
                cta={t("CTA.link")}
                media={
                  <div className="relative h-40 w-full">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="start">
        <FooterCTA
          heading={t("CTA.title")}
          subtext={t("CTA.description")}
          buttonText="SCHEDULE A CALL"
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="No obligation"
          metaText="Replies within 1 business day"
        />
      </Section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </PageShell>
  );
}
