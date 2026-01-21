"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import SlidingHighlightGrid from "@/components/SlidingHighlightGrid";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  isEnterprise?: boolean;
  isMonthly?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "STARTER",
    price: "$499",
    description: "Perfect for small businesses looking to automate customer support",
    features: [
      "Custom AI Chatbot",
      "Up to 3 pages",
      "24/7 Lead Capture",
      "Mobile responsive",
      "Basic Analytics",
      "Email Integration",
      "14-day support",
    ],
    cta: "Select Starter",
  },
  {
    id: "business",
    name: "BUSINESS",
    price: "$1,499",
    description: "Complete website and chatbot solution for growing businesses",
    features: [
      "Custom website (up to 7 pages)",
      "AI Chatbot included",
      "Basic SEO setup",
      "Blog setup",
      "Integration with your tools",
      "30-day support",
    ],
    cta: "Choose Business",
    popular: true,
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    price: "$3,500",
    description: "Complete digital solution for established businesses",
    features: [
      "Custom website & app design",
      "Unlimited pages",
      "Advanced AI Chatbot",
      "Full SEO optimization",
      "Content Management System",
      "Priority support",
      "Dedicated Project Manager",
    ],
    cta: "Choose Professional",
  },
];

const addonTiers: PricingTier[] = [
  {
    id: "bilingual",
    name: "BILINGUAL ADD-ON",
    price: "+$500",
    description: "Add to any tier",
    features: [
      "Full EN/ES translation",
      "Bilingual AI chatbot",
      "Spanish keyword SEO",
      "Culturally-adapted content",
    ],
    cta: "Add Bilingual",
  },
  {
    id: "seo-maintenance",
    name: "SEO MAINTENANCE",
    price: "$99",
    description: "Keep rankings with monthly optimization",
    features: [
      "Monthly SEO audit",
      "Keyword monitoring",
      "Performance reports",
      "Content optimization",
    ],
    cta: "Add SEO",
    isMonthly: true,
  },
  {
    id: "social-media",
    name: "SOCIAL MEDIA",
    price: "$99",
    description: "Weekly content across platforms",
    features: [
      "Weekly post",
      "Content creation",
      "Platform management",
      "Engagement monitoring",
    ],
    cta: "Add Social",
    isMonthly: true,
  },
  {
    id: "website-care",
    name: "WEBSITE CARE PLAN",
    price: "$99",
    description: "Ongoing updates, backups, security",
    features: [
      "Regular updates",
      "Daily backups",
      "Security monitoring",
      "Priority bug fixes",
    ],
    cta: "Add Care Plan",
    isMonthly: true,
  },
];

function PricingMessages() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg"
        >
          <span className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Payment successful! Welcome aboard.
          </span>
        </motion.div>
      )}

      {canceled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-neutral-700/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg"
        >
          Payment canceled. Feel free to try again when you&apos;re ready.
        </motion.div>
      )}
    </>
  );
}

export default function PricingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (tier: PricingTier) => {
    setLoadingPlan(tier.id);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId: tier.id }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create checkout session:", data.error);
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Success/Cancel Messages */}
      <Suspense fallback={null}>
        <PricingMessages />
      </Suspense>

      {/* Header */}
      <section className="bg-white dark:bg-black px-6 pt-8 md:pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-6xl mx-auto mb-16"
        >
          <h1 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6">
            Flexible Plans for Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Digital Growth
            </span>
          </h1>
          <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Transparent pricing for custom chatbots, web development, and marketing solutions.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <SlidingHighlightGrid className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group h-full"
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5 shadow-lg shadow-orange-500/30 whitespace-nowrap">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`h-full rounded-2xl p-px transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-b from-orange-500/50 to-orange-600/20"
                    : "bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5"
                }`}
              >
                <div
                  className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 text-center bg-gray-50 dark:bg-neutral-900"
                >
                  {/* Tier Name */}
                  <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-500 dark:text-neutral-400 mb-6">
                    {tier.name}
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-full mb-6 bg-orange-500/60" />

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white">
                      {tier.price}
                    </span>
                    {tier.isMonthly && (
                      <span className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-500 dark:text-neutral-400">/mo</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-300"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(tier)}
                    disabled={loadingPlan === tier.id}
                    className={`w-full py-3.5 px-6 rounded-full text-[14px] font-medium transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                        : "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loadingPlan === tier.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      tier.cta
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </SlidingHighlightGrid>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-6xl mx-auto mt-20 mb-12"
        >
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
            Add-ons &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Monthly Services
            </span>
          </h2>
          <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Enhance any package with bilingual support or ongoing monthly services.
          </p>
        </motion.div>

        <SlidingHighlightGrid className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {addonTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative group h-full"
            >
              <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 text-center bg-gray-50 dark:bg-neutral-900">
                  <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-500 dark:text-neutral-400 mb-6">
                    {tier.name}
                  </h3>
                  <div className="h-px w-full mb-6 bg-orange-500/60" />
                  <div className="mb-2">
                    <span className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white">
                      {tier.price}
                    </span>
                    {tier.isMonthly && (
                      <span className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-500 dark:text-neutral-400">/mo</span>
                    )}
                  </div>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-500 dark:text-neutral-500 mb-6">
                    {tier.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-300"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(tier)}
                    disabled={loadingPlan === tier.id}
                    className="w-full py-3.5 px-6 rounded-full text-[14px] font-medium transition-all duration-300 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingPlan === tier.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      tier.cta
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </SlidingHighlightGrid>
      </section>

      {/* Request Quote Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="rounded-2xl p-10 md:p-16 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 shadow-xl shadow-orange-500/25 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-orange-100 max-w-2xl mx-auto mb-8">
              Every business is unique. Let&apos;s discuss your specific requirements and create a tailored plan.
            </p>
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-orange-50 transition-all duration-300 shadow-lg shadow-black/10"
            >
              Request a Quote
            </button>
          </div>
        </motion.div>
      </section>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
