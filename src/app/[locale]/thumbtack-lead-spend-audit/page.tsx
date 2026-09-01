import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileSpreadsheet,
  Gauge,
  MapPin,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import PageHero from "@/components/ds/PageHero";
import PageShell from "@/components/ds/PageShell";
import ThumbtackAuditRequestForm from "@/components/thumbtack-audit/ThumbtackAuditRequestForm";
import { FaqBlock } from "@/components/FaqAccordion";
import ThumbtackAuditSample from "@/components/thumbtack-audit/ThumbtackAuditSample";
import { constructMetadata } from "@/lib/seo";

const pageUrl = "https://abemedia.online/en/thumbtack-lead-spend-audit";

const rail = [
  { id: "overview", label: "Overview" },
  { id: "sample", label: "Sample report" },
  { id: "deliverables", label: "Deliverables" },
  { id: "process", label: "Process" },
  { id: "request", label: "Request audit" },
];

const baselineItems = [
  [BarChart3, "Core economics", "Spend, leads, matched hires, Thumbtack-reported hires, refunds, and cost per matched hire."],
  [Gauge, "Category and timing", "Cost per hire by service; hire rate by day, time block, and response-time band."],
  [MapPin, "Travel-area performance", "ZIP and travel-area patterns, separated from categories with too little evidence."],
  [SlidersHorizontal, "Action plan", "Recommended max lead prices, targeting changes, and a controlled 30-day experiment."],
] as const;

const faqs = [
  ["Do you need my Thumbtack login?", "No. The free snapshot uses your Thumbtack contacts CSV export, approximate monthly spend, and service category. I do not need account access."],
  ["What is included in the free snapshot?", "One page with exactly three findings: your best observed day, worst observed day, and hire rate by response-time band. Every rate includes its lead count, cost per matched hire, and a sample-size label."],
  ["Why separate matched hires from Thumbtack-reported hires?", "They answer different questions. Matched hires can be tied back to individual contacts and used in the analysis. Thumbtack-reported hires are retained as a separate platform total, not blended into the matched cohort."],
  ["Does this promise more hires?", "No. The audit promises clearer spend and response-time decisions from your own historical data. It does not promise a hire-rate increase."],
  ["What happens after the first 10?", "The first 10 are a concierge pilot: I prepare each snapshot by hand and deliver it on a 15-minute call. The workflow may change after the pilot based on what the data actually requires."],
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Free Thumbtack Lead Spend Audit | Abe Media",
    description: "See when your Thumbtack budget produces hires. Get a hand-built snapshot from your contacts CSV with lead counts, response-time impact, and cost per hire.",
    path: "/thumbtack-lead-spend-audit",
    locale,
    hasSpanishEquivalent: false,
    noIndex: locale !== "en",
  });
}

export default async function ThumbtackLeadSpendAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Thumbtack Lead Spend Audit",
      description: "A hand-built analysis of Thumbtack lead spend, matched hires, response time, and observed lead efficiency.",
      url: pageUrl,
      provider: { "@id": "https://abemedia.online/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: "Thumbtack lead spend analysis",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <PageShell railCap="LEAD → HIRE" railItems={rail}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <div id="overview" className="scroll-mt-28">
        <PageHero
          eyebrow="Free Thumbtack lead-spend audit · first 10"
          title={<>See where your Thumbtack budget <span className="text-[var(--ds-accent)]">produces hires.</span></>}
          lede="Send your contacts export, monthly spend, and service category. I’ll map your strongest and weakest day, response-time impact, and cost per matched hire—then review it with you on a 15-minute call."
          actions={
            <>
              <Link href="#request" className="ds-btn ds-btn-primary">Analyze my Thumbtack spend <ArrowRight className="h-4 w-4" /></Link>
              <Link href="#sample" className="ds-btn ds-btn-secondary">See the redacted sample</Link>
            </>
          }
          media={<ThumbtackAuditSample compact />}
        />

        <div className="grid border-y border-[var(--ds-line)] md:grid-cols-[1fr_1fr_1fr_1.6fr]">
          {[["314", "contacts analyzed"], ["42", "matched hires"], ["95", "Thumbtack-reported hires"]].map(([value, label]) => (
            <div key={label} className="border-b border-[var(--ds-line)] py-6 md:border-b-0 md:border-r md:px-6 first:md:pl-0">
              <strong className="block font-[family-name:var(--font-ds-display)] text-4xl leading-none">{value}</strong>
              <span className="ds-meta mt-2 block">{label}</span>
            </div>
          ))}
          <p className="my-0 flex items-center py-6 text-sm leading-6 text-[var(--ds-ink-mute)] md:pl-6">
            Our data, approximately 300 leads. The 42 contact-level matches drive the reference findings; the 95 platform-reported hires stay visible as a separate metric.
          </p>
        </div>
      </div>

      <section className="grid gap-10 border-b border-[var(--ds-line-soft)] py-[var(--ds-space-2xl)] lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="ds-eyebrow">The problem behind the report</p>
          <h2 className="mt-5">My $500 budget was gone by Tuesday.</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-[var(--ds-ink-mute)]">
          <p>Thumbtack can spend whatever budget is available before you know whether those leads arrived on the right day, at the right hour, or in a category that tends to produce hires.</p>
          <p>This audit turns the contact history you already own into a budget map. It is designed to make response-time and spend decisions clearer—not to manufacture a promise about future hire rate.</p>
          <div className="border-l-4 border-[var(--ds-accent)] bg-[var(--ds-raise)] p-5 text-sm leading-6">
            <strong className="text-[var(--ds-ink)]">No black-box benchmark.</strong> Every percentage is paired with the number of leads behind it. Thin samples are labeled, not dressed up as certainty.
          </div>
        </div>
      </section>

      <section id="sample" className="scroll-mt-28 py-[var(--ds-space-2xl)]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="ds-eyebrow">Redacted reference example</p>
            <h2 className="mt-5">Three findings. No dashboard theater.</h2>
          </div>
          <p className="m-0 max-w-2xl text-[var(--ds-ink-mute)]">The public example uses our contact-level cohort of 314 leads and 42 matched hires. Monthly spend was not included in the reference export, so its cost-per-hire field is deliberately left blank instead of estimated.</p>
        </div>
        <ThumbtackAuditSample />
      </section>

      <section id="deliverables" className="scroll-mt-28 border-y border-[var(--ds-line)] py-[var(--ds-space-2xl)]">
        <div className="mb-12 max-w-3xl">
          <p className="ds-eyebrow">One method · three moments</p>
          <h2 className="mt-5">Start with clarity. Keep the baseline alive.</h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-[var(--ds-line)] bg-[var(--ds-line)] lg:grid-cols-3">
          <article className="bg-[var(--ds-paper)] p-7">
            <span className="ds-meta text-[var(--ds-accent)]">01 · Lead magnet</span>
            <h3 className="mt-4 text-2xl font-semibold">Free Snapshot</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">A one-page decision brief, prepared by hand for the first 10 businesses.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Best and worst observed day", "Response-time hire-rate bands", "Lead count, cost per hire, and sample label on every finding", "15-minute delivery call"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-accent)]" />{item}</li>)}
            </ul>
          </article>
          <article className="bg-[#151719] p-7 text-white">
            <span className="ds-meta text-[#f16b35]">02 · Paid onboarding</span>
            <h3 className="mt-4 text-2xl font-semibold">Lead Efficiency Baseline</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">The full operating baseline delivered when a client starts Thumbtack automation.</p>
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              {["Spend, leads, hires, and refunds", "Day, time, response, category, and ZIP analysis", "Max lead-price and targeting recommendations", "30-day controlled experiment plan"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#20b986]" />{item}</li>)}
            </ul>
            <p className="mt-6 border-t border-white/15 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-white/55">Every recommendation: high · promising · insufficient data</p>
          </article>
          <article className="bg-[var(--ds-paper)] p-7">
            <span className="ds-meta text-[var(--ds-accent)]">03 · Retention</span>
            <h3 className="mt-4 text-2xl font-semibold">Monthly Optimization</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">A re-run of the baseline, focused on what moved and what to change next.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Month-over-month deltas", "Confidence changes as evidence grows", "Short “change this month” list", "Experiment result and next test"].map((item) => <li key={item} className="flex gap-2"><RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-accent)]" />{item}</li>)}
            </ul>
          </article>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {baselineItems.map(([Icon, title, body]) => (
            <div key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--ds-line)] pt-5">
              <Icon className="h-6 w-6 text-[var(--ds-accent)]" />
              <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ds-ink-mute)]">{body}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="scroll-mt-28 py-[var(--ds-space-2xl)]">
        <div className="mb-10 max-w-3xl">
          <p className="ds-eyebrow">Concierge pilot</p>
          <h2 className="mt-5">No account access. No upload pipeline.</h2>
          <p className="mt-5 text-[var(--ds-ink-mute)]">The first 10 reports are intentionally manual. That keeps the analysis close to the source data while the report format is proven.</p>
        </div>
        <ol className="grid gap-px border border-[var(--ds-line)] bg-[var(--ds-line)] md:grid-cols-4">
          {[
            ["01", "Request", "Tell me the service category, monthly spend, and reporting period."],
            ["02", "Handoff", "I reply with instructions for sending the Thumbtack contacts CSV separately."],
            ["03", "Analysis", "I reconcile the export, label the sample, and calculate cost per matched hire."],
            ["04", "Review", "We walk through the one-page snapshot together on a 15-minute call."],
          ].map(([number, title, body]) => (
            <li key={number} className="list-none bg-[var(--ds-paper)] p-6">
              <span className="font-mono text-xs text-[var(--ds-accent)]">{number}</span>
              <h3 className="mt-7 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ds-ink-mute)]">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="request" className="scroll-mt-28 grid gap-8 border-y border-[var(--ds-line)] py-[var(--ds-space-2xl)] lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="ds-eyebrow">Request a snapshot</p>
          <h2 className="mt-5">Bring the export. I’ll bring the questions.</h2>
          <div className="mt-7 space-y-4 text-sm leading-6 text-[var(--ds-ink-mute)]">
            <p className="flex gap-3"><FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ds-accent)]" />Thumbtack contacts CSV export</p>
            <p className="flex gap-3"><Gauge className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ds-accent)]" />Approximate monthly spend</p>
            <p className="flex gap-3"><SlidersHorizontal className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ds-accent)]" />Primary service category</p>
            <p className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#11825f]" />No Thumbtack credentials</p>
          </div>
        </div>
        <ThumbtackAuditRequestForm />
      </section>

      <section id="faq" className="scroll-mt-28 py-[var(--ds-space-2xl)]" aria-labelledby="audit-faq-title">
        <FaqBlock
          eyebrow="Straight answers"
          title="Before you send the export"
          titleId="audit-faq-title"
          items={faqs.map(([question, answer]) => ({ key: question, question, answer }))}
        />
      </section>

      <section className="mb-[var(--ds-space-2xl)] grid gap-6 bg-[#151719] p-8 text-white md:grid-cols-[1fr_auto] md:items-end md:p-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#f16b35]">Your spend · your evidence</p>
          <h2 className="mt-5 max-w-3xl">Know what happened before the next budget refill.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65">A clear baseline for response time and spend decisions, built from your own history. No promised lift.</p>
        </div>
        <Link href="#request" className="ds-btn bg-[#f16b35] text-white hover:bg-[#d95624]">Analyze my Thumbtack spend <ArrowRight className="h-4 w-4" /></Link>
      </section>
    </PageShell>
  );
}
