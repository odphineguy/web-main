"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import ConsultationForm from "@/components/ConsultationForm";
import PricingDecisionTree from "@/components/pricing/PricingDecisionTree";
import { type ScopeId } from "@/lib/pricingData";

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
    <div className="min-h-screen bg-background">
      <section className="px-6 pt-10 pb-24 md:pt-16 md:pb-32">
        <header className="mx-auto w-full max-w-4xl text-center mb-14">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] m-0">
            {t("Hero.titleStart")}{" "}
            <span className="text-primary">{t("Hero.titleAccent")}</span>
            {t("Hero.titleEnd")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Hero.subtitle")}
          </p>
        </header>

        <div className="mx-auto w-full max-w-2xl">
          <Suspense fallback={<div className="h-96" />}>
            <PricingDecisionTree onBookCall={handleBookCall} />
          </Suspense>
        </div>
      </section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={preselectedService}
        prefilledDescription={prefilledDescription}
      />
    </div>
  );
}
