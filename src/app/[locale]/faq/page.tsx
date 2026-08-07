import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";

const faqs = [
  { q: "What does an AI voice agent cost?", a: "Cost depends on call volume, integrations, languages, booking logic, and support requirements. Abe Media scopes the actual call flow first, then provides the implementation and ongoing costs before work begins." },
  { q: "Can the agent speak English and Spanish naturally?", a: "Yes. The English and Spanish paths are written and tested as complete customer journeys, including qualification, confirmations, errors, escalation, and CRM output—not translated as an afterthought." },
  { q: "Can it book jobs and update our existing CRM?", a: "Often, yes. Abe Media verifies the calendar and CRM's supported APIs, defines which system owns each field, and designs retry and exception behavior before enabling writes." },
  { q: "What happens when the AI is uncertain or a caller asks for a person?", a: "The agent follows the approved fallback: transfer, take a message, or flag the interaction for human review. It should not invent an answer or continue beyond its permitted scope." },
  { q: "Can Abe Media integrate with our existing software?", a: "Yes, when the vendor provides an authorized integration path. Access, rate limits, data ownership, retries, and failure visibility are validated during scoping." },
  { q: "How long does a pilot take?", a: "The timeline depends on workflow complexity, integration access, content approval, and testing. A focused pilot is scoped around one measurable workflow, and the timeline is agreed before payment or development." },
  { q: "When should a business use custom software instead of another SaaS subscription?", a: "Use SaaS when a standard product represents the workflow well. Consider custom software when a proven, important process cannot be modeled safely, or repeated manual handoffs create a durable operating cost." },
  { q: "Who owns the code and data?", a: "Code ownership, data ownership, hosting accounts, third-party services, and handoff terms are stated in the project agreement before development begins." },
  { q: "What monitoring, logs, retries, and human review are included?", a: "Those controls are designed for the workflow. Production automations should record key events, retry only safe actions, prevent duplicates, alert on failures, and route low-confidence decisions to a person." },
  { q: "What service businesses are a good fit?", a: "The strongest fit has repeatable intake or operations, enough volume for handoffs to matter, clear business rules, and a person who can own exceptions. Abe Media has direct experience in transportation, waste operations, moving, junk removal, turf, and related home services." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({ title: "AI Agents & Operations Software FAQ | Abe Media", description: "Direct answers about AI voice agents, integrations, bilingual flows, pilots, monitoring, custom software, code ownership, and human escalation.", path: "/faq", locale, hasSpanishEquivalent: false, noIndex: locale !== "en" });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  return <main className="min-h-screen bg-background px-6 py-16 md:py-24"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><div className="mx-auto max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Frequently asked questions</p><h1 className="mt-5 text-4xl font-medium tracking-[-0.035em] md:text-6xl">Straight answers before you scope the build</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">These are the questions operators ask about AI agents, automation, integrations, ownership, and failure handling.</p><div className="mt-14 divide-y divide-border border-y border-border">{faqs.map((item) => <details key={item.q} className="group py-6"><summary className="cursor-pointer list-none pr-10 text-xl font-medium marker:hidden">{item.q}<span aria-hidden="true" className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl pr-10 leading-7 text-muted-foreground">{item.a}</p></details>)}</div><div className="mt-12 rounded-3xl border border-border bg-muted/35 p-8"><h2 className="text-2xl font-medium">Have a workflow-specific question?</h2><p className="mt-3 text-muted-foreground">Describe the tools, the handoff, and what happens when it fails. Abe Media will tell you what needs investigation before a proposal.</p><Link href="/en/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Ask Abe about your workflow</Link></div></div></main>;
}
