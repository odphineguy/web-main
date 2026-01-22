"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ConsultationForm from "@/components/ConsultationForm";
import SlidingHighlightGrid from "@/components/SlidingHighlightGrid";
import { FooterCTA } from "@/components/ui/footer-cta";
import { Check, Palette, ArrowRight } from "lucide-react";

interface Package {
  id: string;
  planId: string;
  name: string;
  price: string;
  features: string[];
}

const packages: Package[] = [
  {
    id: "logo",
    planId: "brand-logo",
    name: "Logo",
    price: "$125",
    features: [
      "Unique Design",
      "Up to 4 Logo Concept Designs",
      "Unlimited Revision Rounds",
      "Logo Transparency",
      "High Resolution",
      "Full rights to your design",
      "File types: .jpg, .png, .pdf & vectors (.eps, .ai)",
    ],
  },
  {
    id: "stationery",
    planId: "brand-stationery",
    name: "Logo + Stationery",
    price: "$249",
    features: [
      "Unique Design",
      "Up to 6 Logo Concept Designs",
      "Unlimited Revision Rounds",
      "Logo Transparency",
      "High Resolution",
      "Stationery Design",
      "2-Side Business Card Design",
      "Letterhead & Envelope Designs",
      "Social Media Kit Designs",
      "Full rights to your design",
      "File types: .jpg, .png, .pdf & vectors",
    ],
  },
  {
    id: "corporate",
    planId: "brand-corporate",
    name: "Full Corporate Identity",
    price: "$599",
    features: [
      "Unique Design",
      "Up to 10 Logo Concept Designs",
      "Unlimited Revision Rounds",
      "Logo Transparency",
      "High Resolution",
      "Stationery Design",
      "2-Side Business Card Design",
      "Letterhead & Envelope Design",
      "Social Media Kit Design",
      "Alternate Logo",
      "Full-color logo (main version)",
      "Grayscale logo",
      "Logo to use with a color background",
      "Logo to use as a favicon or icon",
      "Brand style guide Document",
      "Full rights to your design",
      "File types: .jpg, .png, .pdf & vectors",
    ],
  },
];

export default function BrandIdentity() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const t = useTranslations("BrandIdentity");

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoadingPlan(null);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black pt-8 md:pt-16 pb-16 lg:pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              <Palette className="h-3.5 w-3.5" />
              {t("badge")}
            </span>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-neutral-300 mb-4 max-w-3xl mx-auto">
              {t("description")}
            </p>
            <p className="text-xl md:text-2xl font-normal text-orange-500 mb-8">
              {t("depositNote")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SlidingHighlightGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 hover:from-orange-500/30 hover:to-orange-600/10">
                  <div className="h-full rounded-2xl p-6 lg:p-8 bg-white dark:bg-neutral-950 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-normal text-center text-gray-900 dark:text-white mb-4">
                      {pkg.name}
                    </h3>
                    <div className="h-px w-full mb-6 bg-orange-500/30" />

                    <ul className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-neutral-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-center mb-6">
                      <span className="text-3xl lg:text-4xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                        {pkg.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCheckout(pkg.planId)}
                      disabled={loadingPlan === pkg.planId}
                      className="w-full py-3.5 px-6 rounded-full text-sm font-medium text-center transition-all duration-300 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 hover:bg-orange-500 hover:text-white hover:border-orange-500 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingPlan === pkg.planId ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          {t("orderNow")}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </SlidingHighlightGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <FooterCTA
          heading={t("cta.title")}
          subtext={t("cta.description")}
          buttonText={t("cta.button").toUpperCase()}
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="Custom design"
          metaText="100% satisfaction"
        />
      </section>

      {/* Consultation Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
