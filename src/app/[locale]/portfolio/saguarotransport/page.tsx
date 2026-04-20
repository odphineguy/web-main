"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Radio,
  Truck,
  Users,
  Briefcase,
  Calculator,
  Smartphone,
  Building2,
  GitCompare,
  X,
} from "lucide-react";
import { FooterCTA } from "@/components/ui/footer-cta";
import ConsultationForm from "@/components/ConsultationForm";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1500,
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
      {count}
      {suffix}
    </span>
  );
}

export default function CaseStudySaguaroTransport() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const metrics = [
    {
      id: "tooling",
      before: "No platform",
      beforeDetail: "Startup with nothing in place",
      after: "Full custom stack",
      afterDetail: "Seven integrated modules",
    },
    {
      id: "dispatch",
      before: "Improvised",
      beforeDetail: "Phones, spreadsheets, sticky notes",
      after: "Command Center",
      afterDetail: "Real-time dispatch hub",
    },
    {
      id: "drivers",
      before: "Paper & calls",
      beforeDetail: "Manual updates from the road",
      after: "Native driver app",
      afterDetail: "Live status, docs, and routing",
    },
    {
      id: "timeline",
      before: "9–12 months typical",
      beforeDetail: "For a platform this size",
      after: "4 months end-to-end",
      afterDetail: "Daily shipping cadence",
    },
  ];

  const deliverables = [
    {
      title: "Dispatch Command Center",
      description:
        "The central hub of the operation. Shipped first so the team had a working nerve center from week one — assign loads, track drivers, and manage the whole day from a single screen.",
      icon: <Radio className="w-6 h-6" />,
    },
    {
      title: "Fleet Management",
      description:
        "Truck, trailer, and equipment records with maintenance tracking, document storage, and status visibility across the entire fleet.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "CRM",
      description:
        "Built-in customer relationship management so sales, dispatch, and billing all work from the same source of truth on every account.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Human Resources",
      description:
        "Driver and staff records, onboarding workflows, document expirations, and compliance tracking — all inside the platform, not scattered across folders.",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: "Accounting",
      description:
        "Invoicing, settlements, and financial reporting wired directly into dispatch and CRM so numbers update the moment a load closes out.",
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      title: "Driver Mobile App",
      description:
        "A purpose-built app for drivers — trip details, status updates, document capture, and direct communication with dispatch, all from their phone.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Client Portal",
      description:
        "A branded portal where customers can book, track, and manage their shipments — turning customer service calls into self-service confidence.",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Plan vs. Action Analytics",
      description:
        "Not in the original scope. A driver performance tool that compares actual route data — times, stops, completion — against the projected plan and surfaces variances. Credited by the client with 10% YoY savings on operating costs.",
      icon: <GitCompare className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-primary/5" />

        <div className="max-w-5xl mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link
              href="/portfolio"
              className="hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-muted-foreground">Saguaro Transport</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-500 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Custom Platform &bull; Trucking &amp; Logistics
          </div>

          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-6 leading-tight">
            A Full Trucking Operation,{" "}
            <span className="text-primary">Built in 4 Months</span>
          </h1>

          <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground max-w-3xl mb-12">
            Saguaro Transport came to us as a startup with a clock already ticking.
            We built them an end-to-end platform — Dispatch, Fleet, CRM, HR,
            Accounting, Driver App, and Client Portal — and shipped it in four
            months of daily builds.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-primary">
                <AnimatedCounter value={4} suffix=" mo" duration={1000} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                Start to Launch
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-primary">
                <AnimatedCounter value={7} duration={1200} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                Integrated Modules
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-primary">
                <AnimatedCounter value={10} suffix="%" duration={1200} />
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                YoY OpCost Savings
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-xl md:text-[28px] font-normal tracking-normal text-primary">
                Daily
              </div>
              <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                Shipping Cadence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Challenge
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-4">
                A Startup That Needed to Move Yesterday
              </h3>
              <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                Frank Ballesteros reached out with an ambitious goal: stand up a
                full trucking company and the software to run it — at the same
                time. No legacy systems to lean on, no dispatch tool, no CRM, no
                driver workflow. Off-the-shelf platforms would have locked him
                into compromises on day one. He needed something built to fit the
                way his team was going to work, and he needed it fast enough that
                the business could actually start earning.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted border border-border">
              <h4 className="text-red-600 dark:text-red-400 font-semibold mb-4">
                Starting Point
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No operational software of any kind</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Dispatch, HR, and billing all manual</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Drivers with no app, portal, or tooling</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Hard launch date — business couldn&apos;t wait</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Approach
          </h2>
          <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-4">
            Start With the Nerve Center, Then Build Outward
          </h3>
          <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground max-w-3xl">
            Rather than disappear for months and resurface with a finished
            product, we led with the Dispatch Command Center — the one screen the
            business couldn&apos;t live without. Once the hub was live, every
            other module plugged into it: fleet, CRM, HR, accounting, the driver
            app, and the client portal. The Abe Media team worked day and night,
            shipping builds daily so Frank&apos;s team could see the product
            grow in real time and push back on what wasn&apos;t right while
            there was still time to change it.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Work
          </h2>
          <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-8">
            Seven Modules, One Platform
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl md:text-[28px] font-normal tracking-normal mb-2">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Results
          </h2>
          <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-8">
            Before &amp; After
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
                onMouseEnter={() => setActiveMetric(metric.id)}
                onMouseLeave={() => setActiveMetric(null)}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Before */}
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Before
                    </div>
                    <div className="text-xl md:text-[28px] font-normal tracking-normal text-red-500 dark:text-red-400">
                      {metric.before}
                    </div>
                    <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                      {metric.beforeDetail}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`transition-transform duration-300 ${
                      activeMetric === metric.id ? "translate-x-1" : ""
                    }`}
                  >
                    <ArrowRight className="w-6 h-6 text-orange-500" />
                  </div>

                  {/* After */}
                  <div className="flex-1 text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      After
                    </div>
                    <div className="text-xl md:text-[28px] font-normal tracking-normal text-green-600 dark:text-green-400">
                      {metric.after}
                    </div>
                    <div className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                      {metric.afterDetail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-2xl bg-primary/5 border border-orange-200 dark:border-orange-500/20">
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 text-6xl text-orange-300 dark:text-orange-500/30 font-serif">
              &ldquo;
            </div>

            <blockquote className="relative space-y-5 text-base md:text-lg font-normal leading-relaxed text-foreground">
              <p>Dear Abe Media Team,</p>

              <p>
                I wanted to take a moment to sincerely thank you for the
                exceptional work you&rsquo;ve done for Saguaro Transport over
                the past four months. When I first reached out, I wasn&rsquo;t
                sure where to turn for help building a dispatch and operations
                platform, but your team immediately caught my attention&mdash;and
                you&rsquo;ve exceeded every expectation since.
              </p>

              <p>
                The system you built has completely transformed how we run our
                day-to-day operations. One feature that has been an absolute
                game-changer (and wasn&rsquo;t even in our original scope) is
                the <strong>&ldquo;Plan vs. Action&rdquo; tool</strong>. It
                automatically compares a driver&rsquo;s actual route
                performance&mdash;including times, stops, and completion
                metrics&mdash;against our projected model, instantly highlighting
                variances. This gives us clear, actionable insights into driver
                performance and pinpoints exact areas for improvement, whether
                it&rsquo;s route optimization, break management, or overall
                efficiency.{" "}
                <strong>
                  That tool alone has saved us 10% YoY on OpCosts.
                </strong>{" "}
                Those are real savings for a small company like us.
              </p>

              <p>
                Beyond the technology, what truly sets Abe Media apart is your
                team. You&rsquo;ve been highly flexible, proactive, and
                genuinely invested in our success from day one. It&rsquo;s been
                a true pleasure working alongside you, and I&rsquo;m incredibly
                grateful for your willingness to adapt and help us every step
                of the way.
              </p>

              <p>
                Thank you for your partnership, your expertise, and the
                measurable impact you&rsquo;ve made on Saguaro Transport. I
                wouldn&rsquo;t hesitate to recommend you to any business looking
                to scale with smart, custom-built technology.
              </p>

              <footer className="flex items-center gap-4 pt-4">
                <Image
                  src="/images/testimonials/frank-ballesteros.png"
                  alt="Frank Ballesteros"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">Frank Ballesteros</div>
                  <div className="text-sm text-muted-foreground">
                    Owner, Saguaro Transport
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-20">
        <FooterCTA
          heading="Need a platform like this?"
          subtext="If you're standing up something ambitious and the clock is already ticking, let's talk about how to get you shipping."
          buttonText="SCHEDULE A CALL"
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="No obligation"
          metaText="Replies within 1 business day"
        />
      </section>

      {/* Consultation Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
