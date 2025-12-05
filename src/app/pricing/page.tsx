"use client";

import { useState } from "react";
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
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "STARTER CHATBOT",
    price: "$1,500",
    description: "Perfect for small businesses looking to automate customer support",
    features: [
      "Custom AI Chatbot",
      "24/7 Lead Capture",
      "Basic Analytics",
      "Email Integration",
      "Limited Support",
    ],
    cta: "Select Starter",
  },
  {
    id: "professional",
    name: "PROFESSIONAL WEB & APP",
    price: "$3,500",
    description: "Complete digital solution for growing businesses",
    features: [
      "Custom Website & App Design",
      "SEO Optimization",
      "Advanced Chatbot Integration",
      "Content Management System",
      "Priority Support",
      "Dedicated Project Manager",
    ],
    cta: "Choose Professional",
    popular: true,
  },
  {
    id: "enterprise",
    name: "ENTERPRISE SEO & GROWTH",
    price: "Custom",
    description: "Tailored solutions for large-scale operations",
    features: [
      "Comprehensive SEO Strategy",
      "Global Market Reach",
      "Multi-platform App Development",
      "Custom AI Solutions",
      "24/7 Premium Support",
    ],
    cta: "Contact Abe",
    isEnterprise: true,
  },
];

export default function PricingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const handleSelectPlan = async (tier: PricingTier) => {
    if (tier.isEnterprise) {
      setIsConsultationOpen(true);
      return;
    }

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Success/Cancel Messages */}
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

      <div className="relative z-10 px-6 pt-8 md:pt-12 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-6xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Flexible Plans for Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Digital Growth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto font-light">
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
                    : "bg-gradient-to-b from-white/10 to-white/5"
                }`}
              >
                <div
                  className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 text-center bg-black"
                >
                  {/* Tier Name */}
                  <h3 className="text-sm font-bold tracking-widest text-neutral-400 mb-6">
                    {tier.name}
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-full mb-6 bg-orange-500/60" />

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      {tier.price}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-neutral-300 text-sm"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(tier)}
                    disabled={loadingPlan === tier.id}
                    className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                        : "bg-white/10 text-white border border-white/20 hover:bg-orange-500 hover:border-orange-500"
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

        {/* Request Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-20 text-center"
        >
          <div className="rounded-2xl p-px bg-gradient-to-r from-white/10 via-white/5 to-white/10">
            <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-neutral-900/50">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Need a Custom Solution?
              </h2>
              <p className="text-neutral-400 mb-6">
                Every business is unique. Let&apos;s discuss your specific requirements and create a tailored plan.
              </p>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
