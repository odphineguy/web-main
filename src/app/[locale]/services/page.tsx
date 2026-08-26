"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";
import { Reveal } from "@/components/ds/PageShell";
import ConsultationForm from "@/components/ConsultationForm";
import { servicePagesEs } from "@/content/discoverability.es";

const services = [
  {
    id: "aiVoice",
    link: "/services/ai-voice-agents",
  },
  {
    id: "dispatch",
    link: "/services/dispatch-operations-software",
  },
  {
    id: "leadPipeline",
    link: "/services/lead-pipeline-automation",
  },
  {
    id: "aiEstimating",
    link: "/services/ai-estimating-tools",
  },
  {
    id: "bilingualAutomation",
    link: "/services/bilingual-ai-automation",
  },
  {
    id: "customSoftware",
    link: "/services/custom-business-software",
  },
] as const;

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "what-we-build", label: "What we build" },
];

export default function Services() {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <PageShell railCap="SERVICES" railItems={RAIL}>
      <div id="overview">
        <PageHero
          title={
            <>
              {t("Hero.title")}{" "}
              <span className="text-[var(--ds-accent)]">
                {t("Hero.highlight")}
              </span>
            </>
          }
          lede={t("Hero.subtitle")}
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
        title={t("GridTitle")}
      >
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} index={i}>
              <DsCard
                // Detail pages exist in Spanish only for slugs present in
                // servicePagesEs; the rest stay on their English URL.
                href={
                  locale === "es" && !servicePagesEs[service.link.replace("/services/", "")]
                    ? `/en${service.link}`
                    : `/${locale}${service.link}`
                }
                title={t(`Cards.${service.id}.title`)}
                description={t(`Cards.${service.id}.description`)}
                points={(["f1", "f2", "f3", "f4"] as const).map((k) =>
                  t(`Cards.${service.id}.features.${k}`),
                )}
                cta={t("CTA.link")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </PageShell>
  );
}
