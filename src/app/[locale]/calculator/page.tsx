"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ROICalculator from "@/components/ROICalculator";
import ConsultationForm from "@/components/ConsultationForm";

// Animated counter component
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  decimals = 0
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * target;

      setCount(currentValue);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, hasAnimated]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function CalculatorPage() {
  const t = useTranslations("CalculatorPage");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black px-6 pt-8 md:pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6 leading-tight">
            {t("hero.titlePart1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {t("hero.titlePart2")}
            </span>
          </h1>
          <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
            <p className="text-[20px] md:text-[28px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-1">
              <AnimatedCounter target={62} suffix="M+" duration={1200} />
            </p>
            <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400">{t("stats.hispanicPopulation")}</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
            <p className="text-[20px] md:text-[28px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-1">
              <AnimatedCounter target={41} suffix="M" duration={1200} />
            </p>
            <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400">{t("stats.spanishSpeakers")}</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
            <p className="text-[20px] md:text-[28px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-1">
              <AnimatedCounter target={2.8} prefix="$" suffix="T" duration={1200} decimals={1} />
            </p>
            <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400">{t("stats.buyingPower")}</p>
          </div>
        </motion.div>
      </section>

      {/* Calculator Section */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ROICalculator />
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 dark:bg-neutral-900 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              {t("info.title")}
            </h2>
            <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t("info.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
            >
              <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-3">
                {t("info.methodology.title")}
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400">
                {t("info.methodology.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
            >
              <h3 className="text-[20px] md:text-[24px] font-normal tracking-[0em] text-gray-900 dark:text-white mb-3">
                {t("info.disclaimer.title")}
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal leading-[1.5] text-gray-600 dark:text-neutral-400">
                {t("info.disclaimer.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-2xl p-10 md:p-16 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 shadow-xl shadow-orange-500/25 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-orange-100 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss how bilingual marketing can help you reach new customers and increase your revenue.
            </p>
            <Button
              size="lg"
              onClick={() => setIsConsultationOpen(true)}
              className="text-[14px] px-8 py-6 bg-white hover:bg-orange-50 text-orange-600 font-medium rounded-full shadow-lg shadow-black/10 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
