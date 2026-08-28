import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

const url = "https://abemedia.online/en/blog/thumbtack-lead-automation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Thumbtack AI Lead Response — Official Pro API Partner (Replies in Under a Minute)",
    description:
      "AI that answers your Thumbtack leads in under a minute, quotes from your own rates, follows up, and books the job — built by an official Thumbtack Pro API partner. Real client numbers inside.",
    path: "/blog/thumbtack-lead-automation",
    locale,
    hasSpanishEquivalent: false,
    noIndex: locale !== "en",
  });
}

const faqs = [
  {
    q: "Does Thumbtack allow automation?",
    a: "Yes — through the official Thumbtack Pro API. We’re a Pro API partner and integrate directly with Thumbtack’s platform, the same way Thumbtack’s own tools do. No scraping, no browser bots, nothing that puts your account at risk.",
  },
  {
    q: "How fast should I respond to a Thumbtack lead?",
    a: "Within minutes. Thumbtack’s own guidance and every pro’s experience agree: the first responder usually wins the conversation. Our agent replies in under a minute, 24/7 — including nights and weekends, when most pros lose leads.",
  },
  {
    q: "Can it book jobs, or just reply?",
    a: "It books. The agent reads your live calendar, offers real openings, and sends your booking link. If the customer isn’t ready, it follows up automatically and stops the moment they answer.",
  },
  {
    q: "What happens when the AI isn’t sure?",
    a: "It escalates. The customer gets a brief holding message; you get an email within seconds with the lead and a drafted reply. The AI never guesses on price — quotes only come from your approved rate card.",
  },
  {
    q: "Does it work with my field service software?",
    a: "Yes — it runs alongside Housecall Pro today (calendar, customers, jobs), and the pipeline is built to feed whatever CRM you run your business on.",
  },
  {
    q: "What does it cost?",
    a: "Depends on your lead volume and how much of the pipeline you want automated. Start with the free audit — we’ll look at your Thumbtack account and show you exactly where leads are leaking.",
  },
];

const results = [
  { metric: "Weekly lead spend", before: "$1,644", after: "$582" },
  { metric: "Cost per lead", before: "$32", after: "$17" },
  { metric: "Free-lead share (customer contacted us first)", before: "11%", after: "34%" },
  { metric: "Leads per week", before: "30", after: "52" },
  { metric: "Lead-fee refunds recovered", before: "—", after: "$1,236" },
];

type ChatLine = { from: "customer" | "ai" | "owner"; text: string };

function ChatTranscript({ label, lines }: { label: string; lines: ChatLine[] }) {
  const who = { customer: "Customer", ai: "AI agent", owner: "Owner" } as const;
  return (
    <figure className="my-8 rounded-2xl border border-border bg-card p-5 md:p-6">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</figcaption>
      <div className="grid gap-3">
        {lines.map((line, index) => (
          <div key={index} className={`max-w-[92%] md:max-w-[85%] ${line.from === "customer" ? "" : "justify-self-end"}`}>
            <p className={`mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${line.from === "customer" ? "text-muted-foreground" : "text-primary"}`}>
              {who[line.from]}
            </p>
            <p
              className={`rounded-xl px-4 py-3 text-[0.95rem] leading-6 ${
                line.from === "customer"
                  ? "rounded-bl-sm border border-border bg-background"
                  : "rounded-br-sm bg-neutral-950 text-neutral-100"
              }`}
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export default async function ThumbtackLeadAutomationPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: "AI That Answers Your Thumbtack Leads in Under a Minute",
      description:
        "Thumbtack lead response automation via the official Pro API: quotes from your own rates, automatic follow-up, real bookings, and real client numbers.",
      datePublished: "2026-08-27",
      dateModified: "2026-08-27",
      author: { "@type": "Person", "@id": "https://abemedia.online/en/about/abe-perez#person", name: "Abe Perez" },
      publisher: { "@id": "https://abemedia.online/#organization" },
      about: ["Thumbtack lead response automation", "AI lead response", "Home service lead management"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Thumbtack AI Lead Response",
      provider: { "@id": "https://abemedia.online/#organization" },
      areaServed: "US",
      serviceType: "AI lead response automation for Thumbtack",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  const auditCta = (
    <Link
      href="/en/#free-ai-audit"
      className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-orange-500"
    >
      Get Your Free AI Readiness Audit <ArrowRight className="h-4 w-4" />
    </Link>
  );

  return (
    <article className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <header className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Lead automation · By Abe Perez</p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.035em] md:text-6xl">
            AI that answers your Thumbtack leads in under a minute
          </h1>
          <p className="mt-7 text-lg leading-8 text-muted-foreground">
            Thumbtack lead response automation means software replies to every new lead the moment it arrives — with a
            real quote, not a canned greeting. AbeMedia builds this on the official Thumbtack Pro API: our AI reads the
            job details, quotes from your rates, offers real openings from your calendar, follows up, and books the job.
          </p>
          <p className="mt-5 leading-8">
            <strong>Built by an official Thumbtack Pro API partner.</strong> We connect your Thumbtack account under our
            partner API — direct integration, no Zapier, no browser extensions, no copy-paste.
          </p>
          <div className="mt-8">{auditCta}</div>
          <div className="mt-8 flex gap-3 text-sm text-muted-foreground">
            <span>Published August 27, 2026</span>
            <span aria-hidden="true">·</span>
            <span>7-minute read</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-14 px-6 py-16 text-lg leading-8">
        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">Speed decides who wins the lead</h2>
          <p className="mt-5 text-muted-foreground">
            On Thumbtack, the first pro to respond usually gets the conversation — and the customer often hires the
            first pro who sounds ready to do the job.
          </p>
          <p className="mt-4 text-muted-foreground">
            Here’s a real competition panel from a live lead (names removed). Our agent replied in{" "}
            <strong className="text-foreground">1 minute</strong>. The competing pros replied in 6 minutes, 5 minutes,
            and 47 minutes.
          </p>
          <figure className="my-8 rounded-2xl border border-border bg-card p-6">
            <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Response times on one live lead — Thumbtack competition panel, names removed
            </figcaption>
            <div className="grid gap-3">
              {[
                { who: "Our AI agent", time: "1 min", pct: 4, win: true },
                { who: "Competing pro", time: "5 min", pct: 14 },
                { who: "Competing pro", time: "6 min", pct: 17 },
                { who: "Competing pro", time: "47 min", pct: 100 },
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-[8.5rem_1fr_3.5rem] items-center gap-3 text-sm">
                  <span className={row.win ? "font-semibold text-primary" : "text-muted-foreground"}>{row.who}</span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${row.win ? "bg-orange-600" : "bg-neutral-400"}`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className={`text-right font-mono text-xs ${row.win ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </figure>
          <p className="text-muted-foreground">
            You can’t beat that with your phone in your pocket and a couch in your hands. The agent answers while you
            work.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">It doesn’t just reply — it quotes and books</h2>
          <p className="mt-5 text-muted-foreground">
            Most Thumbtack autoresponders send one templated message and stop. Ours holds the whole conversation.
          </p>
          <p className="mt-4 text-muted-foreground">
            Here’s one real conversation, start to finish, from a Phoenix moving company we run this for (customer
            details redacted):
          </p>
          <ChatTranscript
            label="Real Thumbtack conversation — customer details redacted"
            lines={[
              { from: "customer", text: "Moving help needed — queen mattress, dresser, 2 TVs, and about 15 boxes." },
              { from: "ai", text: "We can handle that. It’s a 2-man crew at $95/hr with a 2-hour minimum — you’re looking at $190–$285 all-in. Any stairs or elevator at either address?" },
              { from: "customer", text: "About 18 stairs to second level. 2 flights." },
              { from: "ai", text: "Thanks — with the stairs it’s $285–$380 all-in. We have openings tomorrow morning; here’s the booking link to lock one in." },
            ]}
          />
          <ul className="mt-4 list-disc space-y-3 pl-6 text-muted-foreground">
            <li>The customer lists what’s on the truck: mattress, dresser, TVs, boxes.</li>
            <li>
              The AI quotes from the company’s actual pricebook within a minute: $95/hr for a 2-man crew, 2-hour
              minimum, “$190–$285 all-in.”
            </li>
            <li>
              The customer adds a detail: “About 18 stairs to second level. 2 flights.” The AI re-quotes on the spot —
              $285–$380 — and offers next-day openings from the live calendar, with the booking link.
            </li>
            <li>Booked for the next morning.</li>
          </ul>
          <p className="mt-5 text-muted-foreground">
            Every price comes from the client’s own rate card. The AI never invents a number — it extracts the job
            details, and the pricebook sets the price.
          </p>
          <p className="mt-4 text-muted-foreground">Here’s what happened after the job:</p>
          <figure className="my-8 rounded-2xl border border-border bg-card p-6">
            <blockquote className="text-lg leading-8">
              “Great service provided for the cost. Professional service provided.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">5-star Thumbtack review, two days after the move</figcaption>
          </figure>
          <p className="text-muted-foreground">
            The customer left that 5-star review — and two days later they called. The call was missed, so they messaged
            the same thread with a second job: a half-full storage pod. The AI re-quoted it in under a minute and
            offered next-day slots. That repeat job was worth $635. The phone missed the customer; the agent didn’t.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">How it works</h2>
          <ol className="mt-6 space-y-4 text-muted-foreground">
            {[
              ["A lead arrives", "via the official Thumbtack Pro API — pushed to us the second the customer submits it."],
              ["The AI reads the job", "— item list, addresses, distance, dates, stairs, anything the customer wrote."],
              ["It quotes from your pricebook", "and checks your live calendar for real openings."],
              ["It books or follows up", "— booking link on the first message when it fits, polite nudges at 4, 24, and 72 hours if the customer stalls, and it stops the moment they reply."],
              ["Everything is logged", "— every message, quote, and booking lands in your CRM (Housecall Pro today; the same pipeline handles leads from multiple sources)."],
            ].map(([bold, rest], index) => (
              <li key={index} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="font-mono text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong className="text-foreground">{bold}</strong> {rest}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted-foreground">Setup is done for you. You approve the rates and the tone; we wire the rest.</p>
        </section>

        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">When the AI can’t quote, a human gets it instantly</h2>
          <p className="mt-5 text-muted-foreground">
            The number one fear with AI lead response: it says something wrong to a real customer.
          </p>
          <p className="mt-4 text-muted-foreground">
            We built for that first. When a lead falls outside the rules you approved — an unusual job, a heavy item that
            needs special equipment, a price question the rate card doesn’t cover — the AI doesn’t guess. It sends a
            short holding message to the customer, then emails the owner within seconds with the lead details and a
            drafted reply, ready to edit and send.
          </p>
          <figure className="my-8 rounded-2xl border border-border bg-card p-6 font-mono text-sm leading-6">
            <figcaption className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Escalation email — sent seconds after the lead arrived
            </figcaption>
            <p className="text-primary">Subject: Lead needs your call — piano move, outside approved pricing</p>
            <p className="mt-3 text-muted-foreground">
              New Thumbtack lead requests an upright piano move. Pianos are outside the approved rate card, so no price
              was quoted. The customer received a holding message. Drafted reply below — edit and send, or take over the
              thread.
            </p>
          </figure>
          <p className="text-muted-foreground">The AI handles the routine 80%. You keep the close on the judgment calls.</p>
          <p className="mt-4 text-muted-foreground">
            And those judgment calls make the AI smarter. Real example: a customer needed a single couch moved across
            town. The AI quoted the standard hourly rate; the owner stepped in and closed it with a flat van rate
            instead. Two weeks later, that flat-rate tier was in the AI’s pricing playbook — it now quotes it
            automatically on every single-item lead. Human insight becomes automated policy.
          </p>
          <ChatTranscript
            label="Human-in-the-loop — the owner’s move became the AI’s new pricing tier"
            lines={[
              { from: "customer", text: "Just need one couch moved across town — what would that run?" },
              { from: "ai", text: "For a single-item move it’s our 2-man crew at $95/hr with a 2-hour minimum." },
              { from: "owner", text: "Since it’s just the couch, we can do a flat van rate and save you money. Want me to lock that in?" },
              { from: "customer", text: "That works — let’s book it." },
            ]}
          />
        </section>

        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">Real results from a live deployment</h2>
          <p className="mt-5 text-muted-foreground">
            This system runs in production for a Phoenix moving and junk removal company. Same Thumbtack account, before
            and after:
          </p>
          <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border text-sm uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Metric</th>
                  <th className="py-3 pr-4 font-semibold">Before</th>
                  <th className="py-3 font-semibold text-primary">After</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.metric} className="border-b border-border">
                    <td className="py-3.5 pr-4">{row.metric}</td>
                    <td className="py-3.5 pr-4 text-muted-foreground">{row.before}</td>
                    <td className="py-3.5 font-semibold text-primary">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">
            The refund line matters: the system also watches for leads that never engage and files Thumbtack refund
            requests inside the eligibility window — money most pros leave on the table.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-medium tracking-[-0.025em]">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="cursor-pointer list-none text-xl font-medium tracking-[-0.01em] marker:content-none">
                  {faq.q}
                </summary>
                <p className="mt-3 leading-8 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-neutral-950 p-8 text-white md:p-10">
          <h2 className="text-3xl font-medium tracking-[-0.02em] md:text-4xl">
            Your next Thumbtack lead arrives at 9:47 tonight. Who’s answering?
          </h2>
          <p className="mt-5 leading-8 text-neutral-300">
            Get a free AI Readiness Audit: we review your Thumbtack profile, response times, and lead spend, and show
            you what an AI agent would have done with last month’s leads. No obligation, no generic pitch deck.
          </p>
          <div className="mt-7">{auditCta}</div>
        </section>

        <section className="text-base leading-7 text-muted-foreground">
          <p>
            Related:{" "}
            <Link href="/en/industries/junk-removal" className="font-semibold text-primary">AI answering for junk removal</Link>,{" "}
            <Link href="/en/smith-ai-alternatives-home-services" className="font-semibold text-primary">how we compare to answering services</Link>, and the{" "}
            <Link href="/en/services/lead-pipeline-automation" className="font-semibold text-primary">lead pipeline automation service</Link> behind this system.
          </p>
        </section>
      </div>
    </article>
  );
}
