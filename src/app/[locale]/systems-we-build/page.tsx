"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import ConsultationForm from "@/components/ConsultationForm";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";

const saguaroFeatures = [
  {
    key: "fleet",
    image: "/images/assets-platforms/fleet.png",
  },
  {
    key: "crm",
    image: "/images/assets-platforms/crm.png",
  },
  {
    key: "accounting",
    image: "/images/assets-platforms/accounting.png",
  },
];

const driverAppScreens = [
  {
    key: "login",
    image: "/images/assets-platforms/sag-app-login.png",
  },
  {
    key: "tasks",
    image: "/images/assets-platforms/sag-app-home.png",
  },
  {
    key: "earnings",
    image: "/images/assets-platforms/sag-app-pay.png",
  },
];

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "saguaro", label: "Saguaro Transport" },
  { id: "driver-app", label: "Driver app" },
  { id: "next", label: "What's next" },
];

export default function SystemsWeBuildPage() {
  const t = useTranslations("Builds.Page");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string | undefined>(undefined);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % driverAppScreens.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + driverAppScreens.length) % driverAppScreens.length);
  };

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle("");
  };

  return (
    <PageShell railCap="BUILDS" railItems={RAIL}>
      <div id="overview">
        <PageHero
          title={
            <>
              {t("Hero.title")}{" "}
              <span className="text-[var(--ds-accent)]">{t("Hero.titleAccent")}</span>
            </>
          }
          lede={t("Hero.subtitle")}
        />

        {/* Video demo */}
        <Reveal index={2}>
          <div className="overflow-hidden border border-[var(--ds-line)]">
            <video autoPlay loop muted playsInline className="h-auto w-full">
              <source
                src="/images/assets-platforms/demo-vid.mov"
                type="video/quicktime"
              />
              <source
                src="/images/assets-platforms/demo-vid.mov"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>
      </div>

      <Section id="saguaro" bleed title={t("Saguaro.title")} lede={t("Saguaro.subtitle")}>
        <Reveal index={0}>
          <p className="mb-[var(--ds-space-md)] max-w-[68ch] text-[var(--ds-ink-mute)]">
            {t("Saguaro.description")}
          </p>
        </Reveal>
        <Reveal index={1}>
          <button
            onClick={() => {
              setInquiryService("platform-inquiry");
              setIsConsultationOpen(true);
            }}
            className="ds-btn ds-btn-primary mb-[var(--ds-space-xl)]"
          >
            {t("Saguaro.inquireButton")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </Reveal>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-3">
          {saguaroFeatures.map((feature, index) => (
            <Reveal key={feature.key} index={index}>
              <button
                type="button"
                onClick={() =>
                  openLightbox(feature.image, t(`Saguaro.features.${feature.key}.title`))
                }
                className="block h-full w-full text-left"
              >
                <article className="group flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] transition-colors hover:border-[var(--ds-accent)]">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={t(`Saguaro.features.${feature.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="ds-meta mb-3 block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{t(`Saguaro.features.${feature.key}.title`)}</h3>
                    <p className="mt-3 text-[0.95rem] text-[var(--ds-ink-mute)]">
                      {t(`Saguaro.features.${feature.key}.description`)}
                    </p>
                  </div>
                </article>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="driver-app" title={t("DriverApp.title")} lede={t("DriverApp.description")}>
        {/* Desktop: all 3 phones */}
        <div className="hidden items-end justify-center gap-6 md:flex lg:gap-10">
          {driverAppScreens.map((screen, index) => (
            <Reveal key={screen.key} index={index}>
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  index === 1
                    ? "z-10 scale-105"
                    : "scale-95 opacity-90 hover:scale-100 hover:opacity-100"
                }`}
                onClick={() =>
                  openLightbox(screen.image, t(`DriverApp.screens.${screen.key}.title`))
                }
              >
                {/* Phone frame — a device mockup, not UI chrome */}
                <div className="relative w-48 rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-2xl shadow-black/30 lg:w-56">
                  <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950">
                    <Image
                      src={screen.image}
                      alt={t(`DriverApp.screens.${screen.key}.title`)}
                      width={224}
                      height={485}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-950" />
                </div>
                <p className="ds-meta mt-4 text-center">
                  {t(`DriverApp.screens.${screen.key}.title`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: carousel with arrows */}
        <div className="md:hidden">
          <div className="relative flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-2 z-20 rounded-full border border-[var(--ds-line)] bg-[var(--ds-raise)] p-2 transition-colors hover:border-[var(--ds-accent)]"
              aria-label="Previous screen"
            >
              <ChevronLeft className="h-6 w-6 text-[var(--ds-ink)]" />
            </button>

            <div
              className="cursor-pointer"
              onClick={() =>
                openLightbox(
                  driverAppScreens[currentSlide].image,
                  t(`DriverApp.screens.${driverAppScreens[currentSlide].key}.title`)
                )
              }
            >
              <div className="relative w-52 rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-2xl shadow-black/30">
                <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950">
                  <Image
                    src={driverAppScreens[currentSlide].image}
                    alt={t(`DriverApp.screens.${driverAppScreens[currentSlide].key}.title`)}
                    width={208}
                    height={450}
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-950" />
              </div>
              <p className="ds-meta mt-4 text-center">
                {t(`DriverApp.screens.${driverAppScreens[currentSlide].key}.title`)}
              </p>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-2 z-20 rounded-full border border-[var(--ds-line)] bg-[var(--ds-raise)] p-2 transition-colors hover:border-[var(--ds-accent)]"
              aria-label="Next screen"
            >
              <ChevronRight className="h-6 w-6 text-[var(--ds-ink)]" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {driverAppScreens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-6 bg-[var(--ds-accent)]"
                    : "w-2.5 bg-[var(--ds-line)] hover:bg-[var(--ds-ink-faint)]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section id="next" bleed title={t("ComingSoon.title")} lede={t("ComingSoon.description")}>
        <div />
      </Section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setInquiryService(undefined);
        }}
        preselectedService={inquiryService}
      />

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 rounded-full p-2 text-white/80 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative max-h-[80vh] overflow-hidden border border-[var(--ds-line)] shadow-2xl">
                <Image
                  src={lightboxImage}
                  alt={lightboxTitle}
                  width={1920}
                  height={1080}
                  className="h-auto max-h-[80vh] w-auto object-contain"
                />
              </div>
              <p className="ds-meta mt-4 text-center text-white/80">{lightboxTitle}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
