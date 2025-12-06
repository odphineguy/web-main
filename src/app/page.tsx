"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HomeFaq from "@/components/HomeFaq";
import { Bot, Users, Zap, Clock, Database, Globe } from "lucide-react";
import SlidingHighlightGrid from "@/components/SlidingHighlightGrid";

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

const testimonials = [
  {
    quote: "Abe Media delivered a beautiful site and a bilingual chatbot that now handles 70% of our inbound questions.",
    name: "Lucía Hernández",
    role: "Casa Verde",
    avatar: "/images/testimonials/lucia-hernandez.png",
  },
  {
    quote: "Their team trained AI agents that feel like real teammates—our response time is faster than ever.",
    name: "Daniel Ortiz",
    role: "Operations Lead, MetroFit",
    avatar: "/images/testimonials/daniel-ortiz.png",
  },
  {
    quote: "We launched in weeks with a polished product and smarter support automation. Clients rave about the experience.",
    name: "Rebecca Collins",
    role: "Collins & Morales",
    avatar: "/images/testimonials/rebecca-collins.png",
  },
];

const features = [
  {
    icon: Globe,
    title: "Bilingual Support",
    description: "Bilingual support and chat built for your small business.",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    description: "AI-Powered to complete with thousands made and refined in chatbots.",
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Concentrate AI in lead and lead capture controls and container metric data.",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Generates seamless integration with tools and seamless integration.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Instant autoresponder enables chatbots extraordinarily rays your bot and intel responses.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Rcatese chatbots emit coaploveless originating fontless and methods.",
  },
  {
    icon: Database,
    title: "Smart Data Collection",
    description: "Smart data collection sames help ostithoriteas year accunness.",
  },
];

export default function Home() {
  const [avatarErrors, setAvatarErrors] = useState<Set<number>>(new Set());

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
      <section className="bg-white dark:bg-black px-6 pt-8 md:pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Custom Chatbots:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Your 24/7 Digital Workforce.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 max-w-xl">
                Boost engagement, capture leads, and automate support with intelligent, bilingual chatbots tailored for your business.
              </p>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base md:text-lg">
                  Talk to Abe
                </Button>
              </Link>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto lg:scale-125 lg:translate-x-8">
                <Image
                  src="/images/home/home-hero.png"
                  alt="Smart chatbot illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories / Logo Carousel - Gray background */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10"
          >
            Success Stories
          </motion.h2>

          {/* Logo Marquee */}
          <div className="relative overflow-hidden py-8">
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
                      loading="eager"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-8" />
            <blockquote className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 italic max-w-2xl mx-auto">
              &ldquo;Abe Media&apos;s chatbot handles 70% of our inquiries!&rdquo;
            </blockquote>
            <p className="mt-4 text-gray-500 dark:text-neutral-400">— Lucía Hernández</p>
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
            Core Chatbot Features
          </motion.h2>

          <SlidingHighlightGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                  <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <div className="h-px w-full mb-4 bg-orange-500/30" />
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </SlidingHighlightGrid>
        </div>
      </section>

      {/* Benefits Section - Gray background */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
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
                Tired of feeling invisible
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Automate Your Growth.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Never Miss a Lead.
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                Most small business owners say the same things. Use autoresponders.
              </p>
              <p className="text-gray-600 dark:text-neutral-400">
                And every day it stays the flat you lose lead, lose clients, and lose opportunities — especially when people check your business cite first.
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
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Black background */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Testimonials
          </motion.h2>

          <SlidingHighlightGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
                  <div className="h-full rounded-2xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 bg-gray-50 dark:bg-neutral-900">
                    <blockquote className="text-gray-700 dark:text-neutral-300 mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-orange-500/20 flex-shrink-0 bg-gray-100 dark:bg-neutral-800">
                        {!avatarErrors.has(index) ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            onError={() => {
                              setAvatarErrors((prev) => new Set(prev).add(index));
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
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </SlidingHighlightGrid>
        </div>
      </section>

      {/* FAQs - Gray background */}
      <div className="bg-gray-100 dark:bg-neutral-900">
        <HomeFaq />
      </div>

      {/* Final CTA - Black background */}
      <section className="bg-white dark:bg-black py-20 px-6">
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
                Start Building Your Chatbot Today
              </motion.h2>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base md:text-lg">
                  Talk to Abe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
