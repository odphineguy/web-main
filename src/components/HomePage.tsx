"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { track } from "@vercel/analytics";
import HomeFaq, { homeFaqIds } from "@/components/HomeFaq";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";


// Lazy load below-fold components to reduce initial bundle size
const MissedCallCalculator = dynamic(() => import("@/components/MissedCallCalculator"), {
  ssr: false,
});

// Recorded transcript + live call, together in one section below the fold.
const AgentDemoSection = dynamic(() => import("@/components/AgentDemoSection"), {
  ssr: false,
});

export default function HomePage() {
  const t = useTranslations("Home");
  const p = useTranslations("Builds");
  const locale = useLocale();
  const [avatarErrors, setAvatarErrors] = useState<Set<number>>(new Set());
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  // Fire-and-forget attribution log; never block the tel: navigation
  const handleDemoCallClick = (source: string) => {
    track("demo_call_click", {
      locale,
      source,
    });
  };

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const serviceCards = [
    { key: "voice" },
    { key: "dispatch" },
    { key: "pipeline" },
    { key: "apps" },
    { key: "plugins" },
    { key: "web" },
  ] as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqIds.map((id) => ({
      "@type": "Question",
      name: t(`Faq.${id}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`Faq.${id}.answer`),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero — agents & after-hours positioning. Single centered column since the
          transcript player moved down to sit beside the live-call demo. */}
      <section className="bg-background px-6 pt-16 md:pt-24 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animations removed for LCP optimization */}
          <h1 className="text-[36px] md:text-[44px] lg:text-[48px] font-medium tracking-[-0.02em] text-foreground leading-tight">
            {t("Hero.titlePart1")}{" "}
            <span className="text-primary">{t("Hero.titlePart2")}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground mx-auto max-w-xl">
            {t("Hero.subtitle")}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
            >
              {t("Hero.scheduleCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* AI visual estimate — drag-to-compare render from the turf design studio.
          Only artificial turf has a before/after pair today; the slider takes an
          array so doors, windows, exterior paint and counters drop in as tabs the
          moment those pairs exist, with no change here beyond another entry. */}
      <section id="visual-estimate" className="bg-background pb-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            {t("VisualEstimate.eyebrow")}
          </p>
          <h2 className="mt-3 text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground max-w-3xl">
            {t("VisualEstimate.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            {t("VisualEstimate.lede")}
          </p>
          <BeforeAfterSlider
            className="mt-10"
            beforeLabel={t("VisualEstimate.beforeLabel")}
            afterLabel={t("VisualEstimate.afterLabel")}
            tabsLabel={t("VisualEstimate.tabsLabel")}
            pairs={[
              {
                id: "turf",
                label: t("VisualEstimate.turfLabel"),
                beforeSrc: "/images/home/turf-before.webp",
                afterSrc: "/images/home/turf-after.webp",
                beforeAlt: t("VisualEstimate.turfBeforeAlt"),
                afterAlt: t("VisualEstimate.turfAfterAlt"),
              },
            ]}
          />
        </div>
      </section>

      {/* Proof bar — single muted row */}
      <section className="border-y border-border bg-band px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted-foreground">
          <span>{t("ProofBar.item1")}</span>
          <span className="text-orange-500/60" aria-hidden="true">·</span>
          <span>{t("ProofBar.item2")}</span>
          <span className="text-orange-500/60" aria-hidden="true">·</span>
          <span>{t("ProofBar.item3")}</span>
          <span className="text-orange-500/60" aria-hidden="true">·</span>
          <span>{t("ProofBar.item4")}</span>
        </div>
      </section>

      {/* Three-column jab — what a missed call actually costs */}
      <section className="bg-background pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground max-w-3xl">
            {t("Jab.title")}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["one", "two", "three"] as const).map((k) => (
              <div
                key={k}
                className="h-full rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5"
              >
                <div className="h-full rounded-2xl p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`Jab.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`Jab.${k}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid — 6 cards (3x2), agents first, websites/chatbots as add-on */}
      <section id="agents" className="bg-background py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 max-w-3xl"
          >
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground mb-4">
              {t("ServicesGrid.title")}
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground max-w-2xl">
              {t("ServicesGrid.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map(({ key }) => (
              <motion.div
                key={key}
                className="relative group h-full"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                  <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(`ServicesGrid.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`ServicesGrid.${key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/how-it-works`}
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
            >
              {t("ServicesGrid.howItWorksLink")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Agent demos — recorded call (moved up from the hero) beside the live call.
          Replaces the retired industry-tabs showcase. */}
      <AgentDemoSection
        onRecordedPlay={() => handleDemoCallClick("agent-demos-transcript-play")}
        onCtaClick={() => setIsConsultationOpen(true)}
      />

      {/* Case studies strip */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 max-w-3xl"
          >
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground">
              {t("CaseStudies.title")}
            </h2>
          </motion.div>

          {/* Saguaro Transport — laptop mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="relative"
            >
              <button
                type="button"
                aria-label={`Enlarge ${p("Preview.subtitle")} screenshot`}
                className="relative block w-full rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 cursor-pointer group text-left"
                onClick={() => openLightbox("/images/assets-platforms/laptop.png", p("Preview.subtitle"))}
              >
                <Image
                  src="/images/assets-platforms/laptop.png"
                  alt="Saguaro Transport operations system"
                  width={800}
                  height={500}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-foreground/80 text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Click to enlarge
                  </span>
                </div>
              </button>
            </motion.div>

            <motion.div
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-orange-500">{p("Preview.subtitle")}</h3>
              <p className="text-muted-foreground">{p("Preview.description")}</p>
              <Link
                href={`/${locale}/systems-we-build`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
              >
                {p("Preview.cta")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Rejunk + anonymized artificial-turf design-studio cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["rejunk", "turfStudio"] as const).map((study, index) => (
              <motion.div
                key={study}
                className="h-full rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5"
              >
                <Link href={`/en/portfolio/${study === "rejunk" ? "rejunk" : "artificial-turf-ai-design-studio"}`} hrefLang="en" className="block h-full rounded-2xl p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900 transition-colors hover:bg-white dark:hover:bg-neutral-800">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`CaseStudies.${study}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`CaseStudies.${study}.description`)}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-orange-500">{t("CaseStudies.readCase")} →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missed-call revenue calculator */}
      <section id="missed-call" className="bg-band py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <MissedCallCalculator />
        </div>
      </section>

      {/* Testimonials - Gray background with dark cards */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-10">
        {/* Two-up: real testimonial + results stat card */}
        <div className="px-6 pb-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-300 dark:from-white/10 to-gray-200 dark:to-white/5">
              <div className="h-full rounded-2xl p-8 bg-band flex flex-col justify-center">
                <blockquote className="text-foreground text-base">
                  &ldquo;{t("Testimonials.sam.quote")}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-orange-500/20 flex-shrink-0 bg-gray-100 dark:bg-neutral-800">
                    {!avatarErrors.has(0) ? (
                      <Image
                        src="/images/testimonials/sam-akers.png"
                        alt="Sam Akers"
                        fill
                        className="object-cover"
                        sizes="40px"
                        onError={() => {
                          setAvatarErrors((prev) => new Set(prev).add(0));
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-orange-500/10">
                        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                          {getInitials("Sam Akers")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Sam Akers</p>
                    <p className="text-xs text-muted-foreground">{t("Testimonials.sam.role")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results stat card — Rejunk lead pipeline */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-orange-500/40 to-orange-600/10">
              <div className="h-full rounded-2xl p-8 bg-band flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                  {t("Testimonials.stat.label")}
                </p>
                <p className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                  {t("Testimonials.stat.spend")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("Testimonials.stat.spendLabel")}
                </p>
                <p className="mt-4 text-lg font-semibold text-foreground tabular-nums">
                  {t("Testimonials.stat.cpl")}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href="/en/portfolio/rejunk"
                    hrefLang="en"
                    className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
                  >
                    {t("Testimonials.stat.link")} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-6 text-center">
            <Link
              href={`/${locale}/portfolio`}
              className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
            >
              {t("Testimonials.caseStudiesLink")} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs - Black background */}
      <div className="bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
        <HomeFaq />
      </div>

      {/* Final CTA - Gray background */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <FooterCTA
          heading={t("CTA.title")}
          subtext={t("CTA.subtitle")}
          buttonText={t("CTA.button")}
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill={t("CTA.metaPill")}
          metaText={t("CTA.metaText")}
        />
      </section>
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={lightboxImage}
                  alt={lightboxTitle}
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-white/80 mt-4 text-lg">
                {lightboxTitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
