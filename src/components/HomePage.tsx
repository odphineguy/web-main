"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import ConsultationForm from "@/components/ConsultationForm";
import { Bot, Users, Zap, Globe, TrendingUp, Heart, Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

// Lazy load below-fold components to reduce initial bundle size
const HomeFaq = dynamic(() => import("@/components/HomeFaq"), {
  ssr: false,
  loading: () => <div className="py-20 px-6 text-center text-gray-400">Loading...</div>,
});

const SlidingHighlightGrid = dynamic(() => import("@/components/SlidingHighlightGrid"), {
  ssr: false,
});

const PartnerSteps = dynamic(() => import("@/components/PartnerSteps"), {
  ssr: false,
});

// Client logos for the carousel
// isDark: true for black logos that need to be inverted in dark mode
const clientLogos = [
  { name: "DispatchAI", src: "/images/logo-maker/dispatchai.svg", isDark: false },
  { name: "Meal Saver", src: "/images/logo-maker/Meal-Saver.svg", isDark: false },
  { name: "Paw Relief", src: "/images/logo-maker/paw-relief.svg", isDark: false },
  { name: "SafeHub", src: "/images/logo-maker/safehub.svg", isDark: false },
  { name: "Tacos", src: "/images/logo-maker/tacos.svg", isDark: true },
  { name: "InAction", src: "/images/logo-maker/inaction.svg", isDark: false },
  { name: "Abe Media", src: "/images/logo-maker/abem.svg", isDark: false },
  { name: "MyLab", src: "/images/logo-maker/mylab.svg", isDark: false },
];

export default function HomePage() {
  const t = useTranslations('Home');
  const [avatarErrors, setAvatarErrors] = useState<Set<number>>(new Set());
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section - Black background */}
      <section className="bg-white dark:bg-black px-6 pt-8 md:pt-16 pb-16 lg:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content - Animations removed for LCP optimization */}
            <div
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('Hero.titlePart1')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {t('Hero.titlePart2')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 max-w-xl">
                {t('Hero.subtitle')}
              </p>
              <ScheduleCallButton
                type="button"
                onClick={() => setIsConsultationOpen(true)}
              />
            </div>

            {/* Right: Hero Image - Animations removed for LCP optimization */}
            <div
              className="relative"
            >
              <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto lg:scale-[1.20] lg:translate-x-8">
                {/* Light mode hero */}
                <Image
                  src="/images/home/home-hero-light.png"
                  alt="Smart chatbot illustration"
                  fill
                  className="object-contain block dark:hidden"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                {/* Dark mode hero */}
                <Image
                  src="/images/home/home-hero.png"
                  alt="Smart chatbot illustration"
                  fill
                  className="object-contain hidden dark:block scale-110"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual Web Development Services Section */}
      <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('BilingualServices.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t('BilingualServices.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('BilingualServices.benefit1.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                {t('BilingualServices.benefit1.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('BilingualServices.benefit2.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                {t('BilingualServices.benefit2.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('BilingualServices.benefit3.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                {t('BilingualServices.benefit3.description')}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/services/bilingual-web-development"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              {t('BilingualServices.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Chatbot Features - Black background */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            {t('Features.title')}
          </motion.h2>

          <SlidingHighlightGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('Features.bilingualSupport.title')}
                  </h3>
                  <div className="h-px w-full mb-4 bg-orange-500/30" />
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Features.bilingualSupport.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('Features.aiPowered.title')}
                  </h3>
                  <div className="h-px w-full mb-4 bg-orange-500/30" />
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Features.aiPowered.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('Features.leadCapture.title')}
                  </h3>
                  <div className="h-px w-full mb-4 bg-orange-500/30" />
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Features.leadCapture.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('Features.seamlessIntegration.title')}
                  </h3>
                  <div className="h-px w-full mb-4 bg-orange-500/30" />
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Features.seamlessIntegration.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </SlidingHighlightGrid>
        </div>
      </section>

      {/* Partner Steps Section */}
      <PartnerSteps />

      {/* Trusted By / Logo Carousel - Gray background */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-10">
        <div className="px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-500 dark:text-neutral-400 text-center mb-6"
          >
            {t('TrustedBy.text')}
          </motion.p>
        </div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden py-4">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-100 dark:from-neutral-900 to-transparent pointer-events-none" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-100 dark:from-neutral-900 to-transparent pointer-events-none" />
          <div className="flex animate-marquee items-center">
            {/* Double the logos for seamless loop */}
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-12 flex items-center justify-center grayscale opacity-60"
              >
                <div className="h-24 w-64 relative flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={240}
                    height={96}
                    className={`object-contain max-h-24 ${
                      logo.isDark 
                        ? "dark:invert" 
                        : "invert dark:invert-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Black background */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text & Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {t('Benefits.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t('Benefits.titlePart1')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {t('Benefits.titlePart2')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                {t('Benefits.p1')}
              </p>
              <p className="text-gray-600 dark:text-neutral-400">
                {t('Benefits.p2')}
              </p>
            </motion.div>

            {/* Right: Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Image
                    src="/images/home/check.png"
                    alt="Check"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t('Benefits.instantResponses.title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Benefits.instantResponses.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Image
                    src="/images/home/check.png"
                    alt="Check"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t('Benefits.availability.title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Benefits.availability.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Image
                    src="/images/home/check.png"
                    alt="Check"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {t('Benefits.smartData.title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {t('Benefits.smartData.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Gray background with dark cards */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-10">
        <div className="px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-500 dark:text-neutral-400 text-center mb-6"
          >
            {t('Testimonials.title')}
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-100 dark:from-neutral-900 to-transparent pointer-events-none" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-100 dark:from-neutral-900 to-transparent pointer-events-none" />
          
          <div className="flex animate-marquee-slow items-stretch py-4">
            {/* Double the testimonials for seamless loop */}
            {[
              {
                id: "lucia",
                name: "Lucía Hernández",
                avatar: "/images/testimonials/lucia-hernandez.png",
              },
              {
                id: "daniel",
                name: "Daniel Ortiz",
                avatar: "/images/testimonials/daniel-ortiz.png",
              },
              {
                id: "rebecca",
                name: "Rebecca Collins",
                avatar: "/images/testimonials/rebecca-collins.png",
              },
              {
                id: "salvador",
                name: "Salvador Alvarez",
                avatar: "/images/testimonials/salvador-alvarez.png",
              },
              {
                id: "ricardo",
                name: "Ricardo Lopez",
                avatar: "/images/testimonials/ricardo-lopez.png",
              },
              {
                id: "sam",
                name: "Sam Akers",
                avatar: "/images/testimonials/sam-akers.png",
              },
              {
                id: "lucia",
                name: "Lucía Hernández",
                avatar: "/images/testimonials/lucia-hernandez.png",
              },
              {
                id: "daniel",
                name: "Daniel Ortiz",
                avatar: "/images/testimonials/daniel-ortiz.png",
              },
              {
                id: "rebecca",
                name: "Rebecca Collins",
                avatar: "/images/testimonials/rebecca-collins.png",
              },
              {
                id: "salvador",
                name: "Salvador Alvarez",
                avatar: "/images/testimonials/salvador-alvarez.png",
              },
              {
                id: "ricardo",
                name: "Ricardo Lopez",
                avatar: "/images/testimonials/ricardo-lopez.png",
              },
              {
                id: "sam",
                name: "Sam Akers",
                avatar: "/images/testimonials/sam-akers.png",
              }
            ].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-80 md:w-96 mx-3"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-300 dark:from-white/10 to-gray-200 dark:to-white/5">
                  <div className="h-full rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 bg-black text-white dark:bg-neutral-950">
                    <blockquote className="text-gray-100 dark:text-neutral-200 mb-6 text-sm">
                      &ldquo;{t(`Testimonials.${testimonial.id}.quote`)}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-orange-500/20 flex-shrink-0 bg-gray-100 dark:bg-neutral-800">
                        {!avatarErrors.has(index % 6) ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            onError={() => {
                              setAvatarErrors((prev) => new Set(prev).add(index % 6));
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-orange-500/10">
                            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                              {getInitials(testimonial.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                        <p className="text-xs text-gray-300 dark:text-neutral-400">{t(`Testimonials.${testimonial.id}.role`)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs - Black background */}
      <div className="bg-white dark:bg-black">
        <HomeFaq />
      </div>

      {/* Final CTA - Gray background */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-px bg-gradient-to-b from-orange-500/30 to-orange-600/10">
            <div className="rounded-2xl p-10 md:p-16 bg-gray-50 dark:bg-neutral-950 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {t('CTA.title')}
              </motion.h2>
              <ScheduleCallButton
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
