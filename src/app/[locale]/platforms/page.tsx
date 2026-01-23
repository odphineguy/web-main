"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FooterCTA } from "@/components/ui/footer-cta";
import ConsultationForm from "@/components/ConsultationForm";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
    key: "admin",
    image: "/images/assets-platforms/admin.png",
  },
  {
    key: "accounting",
    image: "/images/assets-platforms/accounting.png",
  },
  {
    key: "hr",
    image: "/images/assets-platforms/human-resources.png",
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

export default function PlatformsPage() {
  const t = useTranslations("Platforms.Page");
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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section with Video */}
      <section className="bg-white dark:bg-black pt-8 md:pt-16 pb-16 lg:pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              {t("Hero.badge")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6 leading-tight">
              {t("Hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {t("Hero.titleAccent")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto">
              {t("Hero.subtitle")}
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-12px_rgba(249,115,22,0.15)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
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
          </motion.div>
        </div>
      </section>

      {/* Saguaro Transport Section */}
      <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Badges row */}
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {t("Saguaro.badge")}
              </span>
              <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {t("Saguaro.forSaleBadge")}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              {t("Saguaro.title")}
            </h2>
            <p className="text-lg text-orange-500 font-medium mb-4">
              {t("Saguaro.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6">
              {t("Saguaro.description")}
            </p>
            {/* Inquiry Button */}
            <button
              onClick={() => {
                setInquiryService("platform-inquiry");
                setIsConsultationOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/25"
            >
              {t("Saguaro.inquireButton")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saguaroFeatures.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() =>
                  openLightbox(
                    feature.image,
                    t(`Saguaro.features.${feature.key}.title`)
                  )
                }
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 ease-out bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 hover:from-orange-500/30 hover:to-orange-600/10 shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                  <div className="h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-900">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={t(`Saguaro.features.${feature.key}.title`)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-2">
                        {t(`Saguaro.features.${feature.key}.title`)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                        {t(`Saguaro.features.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Driver App Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-4">
                {t("DriverApp.badge")}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-3">
                {t("DriverApp.title")}
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
                {t("DriverApp.description")}
              </p>
            </div>

            {/* Carousel */}
            <div className="relative">
              {/* Desktop: Show all 3 phones */}
              <div className="hidden md:flex justify-center items-end gap-6 lg:gap-10">
                {driverAppScreens.map((screen, index) => (
                  <motion.div
                    key={screen.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className={`group cursor-pointer transition-all duration-300 ${
                      index === 1 ? "scale-105 z-10" : "scale-95 opacity-90 hover:opacity-100 hover:scale-100"
                    }`}
                    onClick={() =>
                      openLightbox(screen.image, t(`DriverApp.screens.${screen.key}.title`))
                    }
                  >
                    {/* Phone Frame */}
                    <div className="relative w-48 lg:w-56 rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-2xl shadow-black/30 dark:shadow-orange-500/10 group-hover:shadow-orange-500/20 transition-shadow">
                      {/* Screen */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-black">
                        <Image
                          src={screen.image}
                          alt={t(`DriverApp.screens.${screen.key}.title`)}
                          width={224}
                          height={485}
                          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                      {/* Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                    </div>
                    {/* Label */}
                    <p className="text-center mt-4 text-sm font-medium text-gray-700 dark:text-neutral-300">
                      {t(`DriverApp.screens.${screen.key}.title`)}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Mobile: Carousel with arrows */}
              <div className="md:hidden">
                <div className="flex justify-center items-center">
                  {/* Left Arrow */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 z-20 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
                  </button>

                  {/* Phone */}
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
                      <div className="relative rounded-[2rem] overflow-hidden bg-black">
                        <Image
                          src={driverAppScreens[currentSlide].image}
                          alt={t(`DriverApp.screens.${driverAppScreens[currentSlide].key}.title`)}
                          width={208}
                          height={450}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                    </div>
                    <p className="text-center mt-4 text-sm font-medium text-gray-700 dark:text-neutral-300">
                      {t(`DriverApp.screens.${driverAppScreens[currentSlide].key}.title`)}
                    </p>
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 z-20 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {driverAppScreens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-orange-500 w-6"
                          : "bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              {t("ComingSoon.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              {t("ComingSoon.title")}
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t("ComingSoon.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <FooterCTA
          heading={t("CTA.title")}
          subtext={t("CTA.subtitle")}
          buttonText={t("CTA.button").toUpperCase()}
          onButtonClick={() => setIsConsultationOpen(true)}
        />
      </section>

      {/* Consultation Form Modal */}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[80vh]">
                <Image
                  src={lightboxImage}
                  alt={lightboxTitle}
                  width={1920}
                  height={1080}
                  className="max-h-[80vh] w-auto h-auto object-contain"
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
