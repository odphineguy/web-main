"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import ConsultationForm from "@/components/ConsultationForm";
import PricingDecisionTree from "@/components/pricing/PricingDecisionTree";
import { type ScopeId } from "@/lib/pricingData";
import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";

function formatDescription(
  scopeId: ScopeId | null,
  scopeNames: Record<ScopeId, string>,
): string {
  const lines: string[] = [];
  if (scopeId) {
    lines.push(`Recommended scope: ${scopeNames[scopeId]}`);
  } else {
    lines.push("Custom scope — not sure what fits yet.");
  }
  lines.push("");
  lines.push("About my operation: ");
  return lines.join("\n");
}

function pickServiceKey(scopeId: ScopeId | null): string {
  if (!scopeId) return "other";
  return scopeId === "voice"
    ? "ai-voice-agent"
    : scopeId === "pipeline"
      ? "lead-automation"
      : "dispatch-platform";
}

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Find your scope" },
];

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefilledDescription, setPrefilledDescription] = useState<string>("");
  const [preselectedService, setPreselectedService] = useState<string>("");

  const scopeNames: Record<ScopeId, string> = {
    voice: t("Scopes.voice.name"),
    pipeline: t("Scopes.pipeline.name"),
    platform: t("Scopes.platform.name"),
  };

  const handleBookCall = ({ scopeId }: { scopeId: ScopeId | null }) => {
    setPrefilledDescription(formatDescription(scopeId, scopeNames));
    setPreselectedService(pickServiceKey(scopeId));
    setIsConsultationOpen(true);
  };

  return (
    <PageShell railCap="PRICING" railItems={RAIL}>
      <div id="overview">
        <PageHero
          title={
            <>
              {t("Hero.titleStart")}{" "}
              <span className="text-[var(--ds-accent)]">{t("Hero.titleAccent")}</span>
              {t("Hero.titleEnd")}
            </>
          }
          lede={t("Hero.subtitle")}
        />
      </div>

      <Section id="scope">
        <div className="mx-auto w-full max-w-2xl">
          <Suspense fallback={<div className="h-96" />}>
            <PricingDecisionTree onBookCall={handleBookCall} />
          </Suspense>
        </div>
        <div className="mx-auto mt-12 w-full max-w-2xl space-y-2 text-sm text-[var(--ds-ink-mute)]">
          <p>{t("Terms.scope")}</p>
          <p>{t("Terms.support")}</p>
          <p>{t("Terms.ownership")}</p>
        </div>
      </Section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={preselectedService}
        prefilledDescription={prefilledDescription}
      />
    </PageShell>
  );
}
