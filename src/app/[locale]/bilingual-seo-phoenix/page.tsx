"use client";

import { useState } from "react";
import {
  Search,
  Globe,
  Code,
  MapPin,
  Check,
  AlertTriangle,
  Building2,
  Hammer,
  Stethoscope,
  Scale,
  Users,
  ArrowRight,
} from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";

export default function BilingualSEOPhoenixPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6">
            Bilingual SEO for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Phoenix Local Businesses
            </span>
          </h1>
          <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Reach customers searching in English and Spanish. One-third of Phoenix households speak Spanish at home—is your website visible to them?
          </p>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[14px] font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get a Free SEO Audit
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Why Bilingual SEO Matters */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4 text-center">
            Why Bilingual SEO Matters in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Phoenix
            </span>
          </h2>
          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            Many Spanish-speaking users actively search for local services in Spanish, yet few businesses are optimized to reach them.
          </p>

          {/* Stat Callout */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-10 text-center text-white">
            <p className="text-4xl md:text-5xl font-bold mb-2">35%+</p>
            <p className="text-lg opacity-90">of Phoenix metro households speak Spanish at home</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Rank in Spanish AND English Google searches",
              "Capture high-intent local customers your competitors miss",
              "Avoid duplicate content penalties",
              "Build trust with bilingual audiences",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700"
              >
                <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-neutral-300">{benefit}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 dark:text-neutral-400 mt-8 font-medium">
            This isn&apos;t about translation—it&apos;s about optimization.
          </p>
        </div>
      </section>

      {/* What Makes Bilingual SEO Different */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4 text-center">
            What Makes Bilingual SEO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Different
            </span>
          </h2>
          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            English and Spanish users don&apos;t search the same way. Keywords, phrasing, and intent often differ—even for the same service.
          </p>

          {/* Keyword Comparison */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">EN</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-neutral-300">English Search</span>
              </div>
              <p className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-900 px-4 py-3 rounded-lg">
                &quot;bilingual web design Phoenix&quot;
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">ES</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-neutral-300">Spanish Search</span>
              </div>
              <p className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-900 px-4 py-3 rounded-lg">
                &quot;diseño web bilingüe en Phoenix&quot;
              </p>
            </div>
          </div>

          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mt-8">
            Effective bilingual SEO accounts for these differences while keeping your site technically sound and easy for Google to understand.
          </p>
        </div>
      </section>

      {/* Our Approach - 3 Column Grid */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4 text-center">
            Our Approach to Bilingual SEO in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Phoenix
            </span>
          </h2>
          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
            We focus on practical, beginner-friendly strategies that work for small and local businesses.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Language-Specific Strategy */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-3">
                Language-Specific Strategy
              </h3>
              <ul className="space-y-2">
                {[
                  "Separate keyword research per language",
                  "Phoenix-focused modifiers",
                  "Human-written content (no machine translation)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-neutral-400">
                    <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Structure */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-3">
                Technical Structure
              </h3>
              <ul className="space-y-2">
                {[
                  "Clean /en/ and /es/ URLs",
                  "Correct hreflang implementation",
                  "Self-referencing canonicals",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-neutral-400">
                    <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mt-4 italic">
                This ensures both language versions can rank independently.
              </p>
            </div>

            {/* Local Optimization */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-3">
                Local Optimization
              </h3>
              <ul className="space-y-2">
                {[
                  "Phoenix service area pages",
                  "Spanish Google Business Profile support",
                  "Strategic internal linking",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-neutral-400">
                    <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4 text-center">
            Who This Is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              For
            </span>
          </h2>
          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-10">
            If your customers are bilingual, your SEO should be too.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Building2, label: "Service Businesses" },
              { icon: Hammer, label: "Contractors & Trades" },
              { icon: Stethoscope, label: "Medical Clinics" },
              { icon: Scale, label: "Law Firms" },
              { icon: Users, label: "Agencies" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-5 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-orange-500/50 transition-colors"
              >
                <item.icon className="w-8 h-8 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes We Fix */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4 text-center">
            Common Mistakes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              We Fix
            </span>
          </h2>
          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-10">
            Many Phoenix businesses struggle with bilingual SEO because of these issues:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { issue: "Auto-translated pages", note: "Google penalizes low-quality translations" },
              { issue: "Language toggles Google can't crawl", note: "JavaScript-only switching hides content" },
              { issue: "Spanish pages canonicalized to English", note: "Tells Google to ignore Spanish version" },
              { issue: "Missing or broken hreflang tags", note: "Confuses search engines about language targeting" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700"
              >
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.issue}</span>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mt-8">
            Fixing these issues often leads to quick improvements in visibility.{" "}
            <span className="font-semibold text-orange-500">We audit these issues for free.</span>
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
            Serving Phoenix and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Surrounding Areas
            </span>
          </h2>
          <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 mb-8">
            We work with businesses across the Phoenix metro area—without relying on thin city pages or keyword stuffing.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["Phoenix", "Scottsdale", "Mesa", "Tempe", "Chandler"].map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-full"
              >
                <Globe className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-700 dark:text-neutral-300">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <FooterCTA
          heading="Ready to Reach Phoenix's Bilingual Market?"
          subtext="Get a free audit of your bilingual SEO setup and see what opportunities you're missing."
          buttonText="SCHEDULE FREE CONSULTATION"
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="Free audit"
          metaText="Find missed opportunities"
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
