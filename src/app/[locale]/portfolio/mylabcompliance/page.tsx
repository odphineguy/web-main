"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  MessageSquare,
  TrendingUp,
  Lock,
  BarChart3,
  X,
  Check
} from "lucide-react";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import ConsultationForm from "@/components/ConsultationForm";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1500
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function CaseStudyMyLabCompliance() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const metrics = [
    {
      id: "performance",
      before: "Critical Failure",
      beforeDetail: "31 mobile / 33 desktop",
      after: "Excellent",
      afterDetail: "981ms load time",
    },
    {
      id: "bugs",
      before: "5-10 daily",
      beforeDetail: "Constant user disruption",
      after: "1-2 weekly",
      afterDetail: "95% reduction",
    },
    {
      id: "leads",
      before: "Bot spam",
      beforeDetail: "Fake submissions flooding CRM",
      after: "Clean leads",
      afterDetail: "Qualified prospects only",
    },
    {
      id: "contract",
      before: "2-week job",
      beforeDetail: "Bug fixes only",
      after: "2+ months",
      afterDetail: "Ongoing partnership",
    },
  ];

  const deliverables = [
    {
      title: "Stability & Monitoring",
      description: "Reduced bugs from 5-10 daily to 1-2 weekly. Implemented Sentry for real-time error tracking and proactive issue resolution.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "AI Chatbot with RAG",
      description: "Built a custom AI chatbot using Retrieval-Augmented Generation to handle compliance questions using their documentation.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "SEO Overhaul",
      description: "Created 500 niche-specific content pages targeting lab compliance keywords, driving organic traffic and search rankings.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Security Hardening",
      description: "Stopped bot attacks filling leads with spam by implementing Cloudflare Turnstile verification.",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      title: "Lead Generation Tools",
      description: "Building interactive quizzes and ROI calculators to capture and qualify leads before they reach sales.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />

        <div className="max-w-5xl mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-500 mb-8">
            <Link href="/portfolio" className="hover:text-orange-500 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-neutral-400">myLabCompliance.io</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-500 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            B2B SaaS &bull; Lab Compliance
          </div>

          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-6 leading-tight">
            From Critical SEO Failures to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Excellent Performance
            </span>
          </h1>

          <p className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-neutral-400 max-w-3xl mb-12">
            A 2-week bug fix turned into a 2+ month partnership that transformed
            site stability, search rankings, and lead quality.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                <AnimatedCounter value={95} suffix="%" duration={1200} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">Bug Reduction</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                <AnimatedCounter value={500} duration={1400} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">SEO Pages Created</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                <AnimatedCounter value={981} suffix="ms" duration={1300} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">Load Time</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                <AnimatedCounter value={2} suffix="+" duration={800} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">Months Ongoing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 uppercase tracking-wider mb-4">
            The Challenge
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-4">A Site Plagued by Issues</h3>
              <p className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-neutral-400">
                Sam from myLabCompliance.io reached out for help with persistent bugs—5-10 errors
                occurring daily that were disrupting user experience and reliability. What was
                scoped as a 2-week engagement revealed deeper issues: critical SEO failures,
                bot attacks polluting their lead pipeline, and no system for monitoring problems
                before users reported them.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
              <h4 className="text-red-600 dark:text-red-400 font-semibold mb-4">Initial Assessment</h4>
              <ul className="space-y-3 text-gray-600 dark:text-neutral-400">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Performance: Critical Failure (31 mobile / 33 desktop)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>5-10 bugs daily impacting users</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Bot attacks filling CRM with fake leads</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No error monitoring or alerting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-16 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 uppercase tracking-wider mb-4">
            The Work
          </h2>
          <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-8">Complete Technical Overhaul</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl md:text-[28px] font-normal tracking-normal mb-2">{item.title}</h4>
                <p className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 uppercase tracking-wider mb-4">
            The Results
          </h2>
          <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-8">Before & After</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-500/30 transition-all"
                onMouseEnter={() => setActiveMetric(metric.id)}
                onMouseLeave={() => setActiveMetric(null)}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Before */}
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 dark:text-neutral-500 uppercase tracking-wider mb-1">Before</div>
                    <div className="text-xl md:text-[28px] font-normal tracking-normal text-red-500 dark:text-red-400">{metric.before}</div>
                    <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">{metric.beforeDetail}</div>
                  </div>

                  {/* Arrow */}
                  <div className={`transition-transform duration-300 ${activeMetric === metric.id ? "translate-x-1" : ""}`}>
                    <ArrowRight className="w-6 h-6 text-orange-500" />
                  </div>

                  {/* After */}
                  <div className="flex-1 text-right">
                    <div className="text-xs text-gray-500 dark:text-neutral-500 uppercase tracking-wider mb-1">After</div>
                    <div className="text-xl md:text-[28px] font-normal tracking-normal text-green-600 dark:text-green-400">{metric.after}</div>
                    <div className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">{metric.afterDetail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-orange-100 dark:from-orange-500/10 to-transparent border border-orange-200 dark:border-orange-500/20">
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 text-6xl text-orange-300 dark:text-orange-500/30 font-serif">&ldquo;</div>

            <blockquote className="relative">
              <p className="text-xl md:text-[28px] font-normal tracking-normal leading-relaxed text-gray-700 dark:text-gray-200 mb-8">
                Abe from Abe Media helped us dramatically improve our online presence and lead quality.
                He rebuilt our SEO strategy, taking us from critical issues to excellent performance,
                and created hundreds of SEO pages that now rank for competitive keywords. Abe also added
                smart lead-capture tools, blocked bot traffic that was polluting our leads, and built
                systems that actually support growth. He understands SEO, marketing, and conversion—not
                just websites.
              </p>

              <footer className="flex items-center gap-4">
                <Image
                  src="/images/testimonials/sam-akers.png"
                  alt="Sam Akers"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">Sam Akers</div>
                  <div className="text-sm text-gray-500 dark:text-neutral-500">myLabCompliance.io</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-10 md:p-16 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 shadow-xl shadow-orange-500/25 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready for Similar Results?
            </h2>
            <p className="text-orange-100 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss how we can improve your site&apos;s performance, SEO, and lead quality.
            </p>
            <ScheduleCallButton
              onClick={() => setIsConsultationOpen(true)}
              className="mx-auto bg-white hover:bg-orange-50 text-orange-600 shadow-lg shadow-black/10"
            />
          </div>
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
