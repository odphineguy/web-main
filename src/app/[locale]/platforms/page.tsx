"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FooterCTA } from "@/components/ui/footer-cta";
import ConsultationForm from "@/components/ConsultationForm";
import { X } from "lucide-react";

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

export default function PlatformsPage() {
  const t = useTranslations("Platforms.Page");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

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
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              {t("Saguaro.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              {t("Saguaro.title")}
            </h2>
            <p className="text-lg text-orange-500 font-medium mb-4">
              {t("Saguaro.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
              {t("Saguaro.description")}
            </p>
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
        onClose={() => setIsConsultationOpen(false)}
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
