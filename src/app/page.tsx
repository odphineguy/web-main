"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";
import HomeFaq from "@/components/HomeFaq";
import { Sparkles } from "lucide-react";

const products = [
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  // Second row starts here: website images
  {
    title: "Barbershop Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/barbershop-website.png",
  },
  {
    title: "Green Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/green-website.png",
  },
  {
    title: "InAction Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/inaction-website-hero.png",
  },
  {
    title: "Smart Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/smart-website.png",
  },
  {
    title: "Paisanos Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/paisanos-website.png",
  },
  {
    title: "Solar Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/solar-website.png",
  },
  {
    title: "Yummy Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/yummy-website.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Tacos Slopes",
    link: "https://example.com",
    thumbnail: "/images/portfolio/tacos-slopes-carousel.png",
  },
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
    <div className="relative min-h-screen bg-white dark:bg-black">
      <HeroParallax products={products} />
      
      {/* Content Section: Image Left, Text Right */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative min-h-[320px] rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/20 overflow-hidden">
            <Image
              src="/images/home/frustrated-business-owner.png"
              alt="A frustrated business owner staring at their outdated phone website"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              Small Business
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Tired of feeling invisible online?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Most small business owners say the same things:
            </p>
            <ul className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;My website looks basic.&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;No one clicks my ads.&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;I don&rsquo;t even know where to start with AI or automation.&rdquo;</span>
              </li>
            </ul>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              And every day it stays like that you lose trust, lose clients, and lose opportunities — especially when
              people check your business online first.
            </p>
            <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600" />
          </div>
        </div>
      </section>

      {/* Content Section: Text Left, Image Right */}
      <section className="py-24 pb-32 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-gray-50 dark:bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              Bilingual Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              We build custom bilingual digital tools that make you look legit.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Abe Media gives you the clean, modern, bilingual (English / Español) digital presence that makes people say:
              “wow — this business looks professional.”
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Satisfaction guaranteed.
            </p>
            <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600" />
          </div>
          <div className="order-1 lg:order-2 relative min-h-[320px] rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/20 overflow-hidden">
            <Image
              src="/images/home/portrait-headshot.png"
              alt="Friendly portrait: clean headshot, simple background, approachable vibe"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 pb-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: index * 0.4, repeatType: "loop" }}
                  className="relative flex-1 rounded-3xl border border-orange-500/20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-6 py-8 shadow-sm"
                >
                  <div className="absolute -top-4 left-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                      <Sparkles className="h-4 w-4" />
                      Testimonial
                    </span>
                  </div>
                  <blockquote className="mt-6 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-orange-500/20 flex-shrink-0 bg-white dark:bg-white">
                      {!avatarErrors.has(index) ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          onError={() => {
                            setAvatarErrors((prev) => new Set(prev).add(index));
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-orange-500/10">
                          <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                            {getInitials(testimonial.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <HomeFaq />

      {/* CTA */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Start this month and get a free 30-minute strategy call.
          </p>
          <Link href="/contact" className="inline-block">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base md:text-lg">
              Let&apos;s Talk
            </Button>
          </Link>
        </div>
      </section>

      {/* Additional Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
      </section>
    </div>
  );
}
