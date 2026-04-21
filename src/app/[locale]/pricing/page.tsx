"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import ConsultationForm from "@/components/ConsultationForm";
import PricingDecisionTree from "@/components/pricing/PricingDecisionTree";
import { type AddOnId, type TierId } from "@/lib/pricingData";

function StatusBanner() {
  const searchParams = useSearchParams();
  const t = useTranslations("Pricing.Status");
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  if (!success && !canceled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 rounded-full border px-6 py-3 text-sm shadow-lg backdrop-blur ${
        success
          ? "border-primary/30 bg-background/90 text-foreground"
          : "border-border bg-background/90 text-muted-foreground"
      }`}
    >
      <span className="flex items-center gap-2">
        {success && <Check aria-hidden className="h-4 w-4 text-primary" />}
        {success ? t("paymentSuccess") : t("paymentCanceled")}
      </span>
    </motion.div>
  );
}

function formatDescription(
  tierId: TierId | null,
  addOns: AddOnId[],
  tierNames: Record<TierId, string>,
  addOnNames: Record<AddOnId, string>,
): string {
  const lines: string[] = [];
  if (tierId) {
    lines.push(`Recommended tier: ${tierNames[tierId]}`);
  } else {
    lines.push("Custom scope — not sure which tier fits.");
  }
  if (addOns.length > 0) {
    lines.push(`Add-ons: ${addOns.map((id) => addOnNames[id]).join(", ")}`);
  }
  lines.push("");
  lines.push("About my project: ");
  return lines.join("\n");
}

function pickServiceKey(tierId: TierId | null): string {
  if (!tierId) return "custom-solutions";
  return tierId === "starter" ? "ai-chatbot" : "web-development";
}

function TreeWrapper({
  onBookCall,
}: {
  onBookCall: (context: { tierId: TierId | null; selectedAddOns: AddOnId[] }) => void;
}) {
  return <PricingDecisionTree onBookCall={onBookCall} />;
}

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefilledDescription, setPrefilledDescription] = useState<string>("");
  const [preselectedService, setPreselectedService] = useState<string>("");

  const tierNames: Record<TierId, string> = {
    starter: t("Tiers.starter.name"),
    business: t("Tiers.business.name"),
    professional: t("Tiers.professional.name"),
  };
  const addOnNames: Record<AddOnId, string> = {
    bilingual: t("AddOns.items.bilingual.name"),
    seo: t("AddOns.items.seo.name"),
    social: t("AddOns.items.social.name"),
    care: t("AddOns.items.care.name"),
  };

  const handleBookCall = ({
    tierId,
    selectedAddOns,
  }: {
    tierId: TierId | null;
    selectedAddOns: AddOnId[];
  }) => {
    setPrefilledDescription(
      formatDescription(tierId, selectedAddOns, tierNames, addOnNames),
    );
    setPreselectedService(pickServiceKey(tierId));
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <StatusBanner />
      </Suspense>

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
            <TreeWrapper onBookCall={handleBookCall} />
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
