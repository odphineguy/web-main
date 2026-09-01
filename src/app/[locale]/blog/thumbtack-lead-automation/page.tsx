import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MoreHorizontal, Sparkles, Star } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";

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

const rail = [
  { id: "overview", label: "Overview" },
  { id: "speed", label: "Response speed" },
  { id: "workflow", label: "Workflow" },
  { id: "results", label: "Results" },
  { id: "questions", label: "FAQ" },
];

type ChatLine = { from: "customer" | "ai" | "owner"; text: string };

function chatLineMeta(line: ChatLine, index: number) {
  if (index === 0) return "Customer message · 3:30 PM";
  if (index === 1) return "Replied in under 1 min";
  if (index === 2) return line.from === "customer" ? "Customer message · 3:37 PM" : "Owner replied · 3:32 PM";
  return line.from === "customer" ? "Customer replied · 3:33 PM" : "Quote adjusted instantly";
}

function ChatTranscript({ label, lines }: { label: string; lines: ChatLine[] }) {
  const who = { customer: "Customer", ai: "Sent by AI agent", owner: "Owner takeover" } as const;
  return (
    <figure className="tt-blog-chat my-8">
      <div className="tt-blog-chat__top">
        <span className="tt-blog-chat__mark">T</span>
        <b>Messages</b>
        <MoreHorizontal aria-hidden="true" />
      </div>
      <div className="tt-blog-chat__contact">
        <ArrowLeft aria-hidden="true" />
        <span>Customer details redacted</span>
        <Star aria-hidden="true" />
      </div>
      <figcaption>{label}</figcaption>
      <div className="tt-blog-chat__thread">
        {lines.map((line, index) => (
          <div key={index} className={`tt-blog-line tt-blog-line--${line.from}`}>
            <span className="tt-blog-line__avatar">{line.from === "customer" ? "C" : <Sparkles />}</span>
            <div>
              {line.from !== "customer" && <b><Sparkles /> {who[line.from]}</b>}
              <p>{line.text}</p>
              <small>{chatLineMeta(line, index)}</small>
            </div>
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
      dateModified: "2026-09-01",
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
      href="/en/thumbtack-lead-spend-audit"
      className="ds-btn ds-btn-primary"
    >
      Analyze my Thumbtack spend <ArrowRight className="h-4 w-4" />
    </Link>
  );

  return (
    <PageShell railCap="FIELD NOTE" railItems={rail}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <div id="overview">
        <PageHero
          eyebrow="Lead automation · By Abe Perez"
          title={
            <>
              AI that answers your Thumbtack leads <span className="text-[var(--ds-accent)]">in under a minute.</span>
            </>
          }
          lede="Software replies to every new lead the moment it arrives—with a real quote, not a canned greeting. It reads the job, quotes from your rates, checks the calendar, follows up, and books."
          actions={auditCta}
        />
        <div className="ds-article-intro mx-auto max-w-3xl border-b border-[var(--ds-line-soft)] pb-12 pt-10 md:pb-16">
          <p>
            <strong>Built by an official Thumbtack Pro API partner.</strong> We connect your Thumbtack account under our
            partner API—direct integration, no Zapier, no browser extensions, no copy-paste.
          </p>
          <p className="ds-meta mt-6">Published August 27, 2026 · 7-minute read</p>
        </div>
      </div>

      <div className="ds-article mx-auto max-w-3xl pb-[var(--ds-space-2xl)]">
        <section id="speed">
          <h2>Speed decides who wins the lead</h2>
          <p className="mt-5 text-muted-foreground">
            On Thumbtack, the first pro to respond usually gets the conversation — and the customer often hires the
            first pro who sounds ready to do the job.
          </p>
          <p className="mt-4 text-muted-foreground">
            Here’s a real competition panel from a live lead (names removed). Our agent replied in{" "}
            <strong className="text-foreground">1 minute</strong>. The competing pros replied in 6 minutes, 5 minutes,
            and 47 minutes.
          </p>
          <figure className="my-8 border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6">
            <figcaption className="ds-meta mb-4">
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
                  <div className="h-2.5 overflow-hidden bg-muted">
                    <div
                      className={`h-full ${row.win ? "bg-orange-600" : "bg-neutral-400"}`}
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

          <aside className="my-10 grid gap-6 bg-[#151719] p-7 text-white md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="ds-meta text-[#f16b35]">Free Thumbtack Lead Spend Audit</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">Fast response matters. So does knowing when your budget produces hires.</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">Send your contacts export and monthly spend. I’ll show the strongest and weakest observed day, response-time impact, lead counts, and cost per matched hire—without needing account access.</p>
            </div>
            <Link href="/en/thumbtack-lead-spend-audit" className="ds-btn bg-[#f16b35] text-white hover:bg-[#d95624]">
              Analyze my Thumbtack spend <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section>
          <h2>It doesn’t just reply — it quotes and books</h2>
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
          <figure className="my-8 border-l-4 border-[var(--ds-accent)] bg-[var(--ds-raise)] p-6">
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

        <section id="workflow">
          <h2>How it works</h2>
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
          <h2>When the AI can’t quote, a human gets it instantly</h2>
          <p className="mt-5 text-muted-foreground">
            The number one fear with AI lead response: it says something wrong to a real customer.
          </p>
          <p className="mt-4 text-muted-foreground">
            We built for that first. When a lead falls outside the rules you approved — an unusual job, a heavy item that
            needs special equipment, a price question the rate card doesn’t cover — the AI doesn’t guess. It sends a
            short holding message to the customer, then emails the owner within seconds with the lead details and a
            drafted reply, ready to edit and send.
          </p>
          <figure className="my-8 border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6 font-mono text-sm leading-6">
            <figcaption className="ds-meta mb-4 font-sans">
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

        <section id="results">
          <h2>Real results from a live deployment</h2>
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

        <section id="questions">
          <h2>Frequently asked questions</h2>
          <div className="mt-6 border-y border-[var(--ds-line)]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-[var(--ds-line)] last:border-b-0">
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 py-5 text-xl font-semibold marker:content-none">
                  {faq.q}<b aria-hidden="true" className="text-2xl font-normal text-[var(--ds-accent)] transition-transform group-open:rotate-45">+</b>
                </summary>
                <p className="pb-6 pr-10 leading-8 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t-0 bg-[var(--ds-ink)] p-8 text-background md:p-10">
          <p className="ds-eyebrow mb-4">Your next lead</p>
          <h2>
            Your next Thumbtack lead arrives at 9:47 tonight. Who’s answering?
          </h2>
          <p className="mt-5 leading-8 text-background/75">
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
    </PageShell>
  );
}
