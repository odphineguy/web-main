import Link from "next/link";
import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";
import { FaqBlock } from "@/components/FaqAccordion";
import type { ContentPageData } from "@/content/discoverability";

const baseUrl = "https://abemedia.online";

const rail = [
  { id: "overview", label: "Overview" },
  { id: "fit", label: "Good fit" },
  { id: "system", label: "System" },
  { id: "process", label: "Process" },
  { id: "proof", label: "Proof" },
  { id: "questions", label: "FAQ" },
];

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function LeadPipelinePage({ data }: { data: ContentPageData }) {
  const path = "/en/services/lead-pipeline-automation";
  const related = data.related.filter((item) => item.href !== "/en/contact");
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}${path}#service`,
    name: data.title,
    description: data.description,
    url: `${baseUrl}${path}`,
    areaServed: { "@type": "Country", name: "United States" },
    provider: { "@id": `${baseUrl}/#organization` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/en` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/en/services` },
      { "@type": "ListItem", position: 3, name: data.eyebrow, item: `${baseUrl}${path}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <PageShell railCap="LEAD → JOB" railItems={rail}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />

      <div id="overview">
        <PageHero
          eyebrow={data.eyebrow}
          title={
            <>
              Move a lead from first message to <span className="text-[var(--ds-accent)]">booked job</span>—without dropping a handoff.
            </>
          }
          lede={data.intro}
          actions={
            <Link href="/en/contact" className="ds-btn ds-btn-primary">
              Discuss your workflow
            </Link>
          }
        />
      </div>

      <Section id="fit" eyebrow="Good fit when" title="The handoffs cost more than the tools">
        <ul className="grid gap-px bg-[var(--ds-line)] sm:grid-cols-2">
          {data.goodFit.map((item, index) => (
            <li key={item} className="grid min-h-32 grid-cols-[2.5rem_1fr] items-start gap-3 bg-background p-6">
              <span className="ds-meta pt-1 text-[var(--ds-accent)]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-lg font-semibold leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="system" eyebrow="One observable pipeline" title="Three jobs the system must do">
        <div className="grid gap-px bg-[var(--ds-line-soft)] md:grid-cols-3">
          {data.sections.map((section, index) => (
            <DsCard
              key={section.title}
              index={index}
              title={section.title}
              description={section.body}
              points={section.items}
              className="min-h-[28rem]"
            />
          ))}
        </div>
      </Section>

      <section id="process" className="lead-pipeline-process scroll-mt-16">
        <header>
          <p className="ds-eyebrow">Process</p>
          <h2>{data.processTitle}</h2>
        </header>
        <ol>
          {data.process.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="proof" className="lead-pipeline-proof scroll-mt-16">
        <div className="lead-pipeline-proof__mark" aria-hidden="true">
          <span>LEAD</span><b>/</b><span>JOB</span>
        </div>
        <div className="lead-pipeline-proof__copy">
          <p className="ds-eyebrow">Proof and boundaries</p>
          <h2>{data.proofTitle}</h2>
          <p>{data.proof}</p>
          <Link href="/en/how-it-works">See the live workflow</Link>
        </div>
      </section>

      <section id="questions" className="scroll-mt-16 py-[var(--ds-space-2xl)]">
        <FaqBlock
          eyebrow="Buyer questions"
          title="Direct answers"
          items={data.faqs.map((faq) => ({ key: faq.question, question: faq.question, answer: faq.answer }))}
        />
      </section>

      <Section eyebrow="Related" title="Keep exploring" className="border-t border-[var(--ds-line-soft)]">
        <div className="grid gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {related.map((item, index) => (
            <DsCard
              key={item.href}
              index={index}
              title={item.label}
              description={item.description}
              href={item.href}
              cta="Open"
              className="min-h-56"
            />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
