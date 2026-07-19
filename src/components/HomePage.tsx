"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";
import { PhoneCall, Truck, Workflow, Smartphone, Globe, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";


// Lazy load below-fold components to reduce initial bundle size
const HomeFaq = dynamic(() => import("@/components/HomeFaq"), {
  ssr: false,
  loading: () => <div className="py-20 px-6 text-center text-muted-foreground">Loading...</div>,
});

const ChatDemoShowcase = dynamic(() => import("@/components/demos/ChatDemoShowcase"), {
  ssr: false,
});

// Scroll-world section must never block LCP — hero renders before any of its assets load
const AfterHoursScroll = dynamic(() => import("@/components/AfterHoursScroll"), {
  ssr: false,
});

const MissedCallCalculator = dynamic(() => import("@/components/MissedCallCalculator"), {
  ssr: false,
});

const TranscriptPlayer = dynamic(() => import("@/components/TranscriptPlayer"), {
  ssr: false,
});

export default function HomePage() {
  const t = useTranslations("Home");
  const p = useTranslations("Platforms");
  const locale = useLocale();
  const logDemoCallClick = useMutation(api.formSubmissions.logDemoCallClick);
  const [avatarErrors, setAvatarErrors] = useState<Set<number>>(new Set());
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  // Fire-and-forget attribution log; never block the tel: navigation
  const handleDemoCallClick = (source: string) => {
    logDemoCallClick({
      locale,
      source,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    }).catch(() => {});
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
    { key: "voice", Icon: PhoneCall },
    { key: "dispatch", Icon: Truck },
    { key: "pipeline", Icon: Workflow },
    { key: "apps", Icon: Smartphone },
    { key: "web", Icon: Globe, isAddOn: true },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero — agents & after-hours positioning */}
      <section className="bg-background px-6 pt-8 md:pt-16 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content - Animations removed for LCP optimization */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
                  {t("Hero.eyebrow")}
                </span>
              </div>
              <h1 className="text-[36px] md:text-[44px] lg:text-[48px] font-medium tracking-[-0.02em] text-foreground leading-tight">
                {t("Hero.titlePart1")}{" "}
                <span className="text-primary">{t("Hero.titlePart2")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {t("Hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <ScheduleCallButton
                  type="button"
                  label={t("CTA.button")}
                  className="bg-orange-500 hover:bg-orange-600 !text-white border-0"
                  onClick={() => setIsConsultationOpen(true)}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{t("Hero.callCtaSub")}</p>
                <p className="text-sm text-muted-foreground">{t("Hero.followUp")}</p>
              </div>
            </div>

            {/* Right: Elena real-call transcript player */}
            <div className="relative lg:flex lg:justify-end">
              <div className="w-full max-w-lg mx-auto lg:mx-0 rounded-2xl p-px bg-gradient-to-b from-orange-500/40 to-white/5">
                <TranscriptPlayer onFirstPlay={() => handleDemoCallClick("hero-transcript-play")} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof bar — single muted row */}
      <section className="border-y border-border bg-gray-50 dark:bg-neutral-950 px-6 py-5">
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

      {/* Scroll-world "after hours" sequence */}
      <AfterHoursScroll />

      {/* Services grid — 5 cards, agents first, websites/chatbots as add-on */}
      <section id="agents" className="bg-background py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-4">
              {t("ServicesGrid.badge")}
            </span>
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground mb-4">
              {t("ServicesGrid.title")}
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground max-w-2xl">
              {t("ServicesGrid.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map(({ key, Icon, ...card }, index) => (
              <motion.div
                key={key}
                className="relative group h-full"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                  <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-orange-500" />
                      </div>
                      {"isAddOn" in card && card.isAddOn && (
                        <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-500">
                          {t("ServicesGrid.addOnBadge")}
                        </span>
                      )}
                    </div>
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
        </div>
      </section>

      {/* Industry Demo Showcase (retitled to agents) */}
      <ChatDemoShowcase onCtaClick={() => setIsConsultationOpen(true)} />

      {/* Case studies strip */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-4">
              {t("CaseStudies.badge")}
            </span>
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] text-foreground">
              {t("CaseStudies.title")}
            </h2>
          </motion.div>

          {/* Saguaro Transport — laptop mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="relative"
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 cursor-pointer group"
                onClick={() => openLightbox("/images/assets-platforms/laptop.png", p("Preview.subtitle"))}
              >
                <Image
                  src="/images/assets-platforms/laptop.png"
                  alt="Saguaro Transport Platform"
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
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {p("Preview.badge")}
              </span>
              <h3 className="text-xl font-semibold text-orange-500">{p("Preview.subtitle")}</h3>
              <p className="text-muted-foreground">{p("Preview.description")}</p>
              <Link
                href="/platforms"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
              >
                {p("Preview.cta")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Rejunk + Waterloo cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["rejunk", "waterloo"] as const).map((study, index) => (
              <motion.div
                key={study}
                className="h-full rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5"
              >
                <div className="h-full rounded-2xl p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`CaseStudies.${study}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`CaseStudies.${study}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missed-call revenue calculator */}
      <section id="missed-call" className="bg-gray-50 dark:bg-neutral-950 py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-center mb-10"
          >
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              {t("MissedCall.badge")}
            </span>
          </motion.div>
          <MissedCallCalculator />
        </div>
      </section>

      {/* Testimonials - Gray background with dark cards */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-10">
        <div className="px-6">
          <motion.div
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              {t("Testimonials.title")}
            </span>
          </motion.div>
        </div>

        {/* Single real testimonial */}
        <div className="px-6 pb-6">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-300 dark:from-white/10 to-gray-200 dark:to-white/5">
              <div className="rounded-2xl p-8 bg-gray-50 dark:bg-neutral-950">
                <blockquote className="text-foreground mb-6 text-base">
                  &ldquo;{t("Testimonials.sam.quote")}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
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
            <div className="mt-6 text-center">
              <Link
                href={`/${locale}/portfolio`}
                className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
              >
                {t("Testimonials.caseStudiesLink")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs - Black background */}
      <div className="bg-background">
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
