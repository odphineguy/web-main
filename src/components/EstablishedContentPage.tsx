import Link from "next/link";

import DsCard from "@/components/ds/Card";
import PageHero from "@/components/ds/PageHero";
import PageShell from "@/components/ds/PageShell";
import Section from "@/components/ds/Section";
import { FaqBlock } from "@/components/FaqAccordion";
import type { ContentPageData } from "@/content/discoverability";

const baseUrl = "https://abemedia.online";

const copy = {
  en: {
    primary: "Let’s talk",
    fitEyebrow: "Good fit when",
    fitTitle: "The handoffs are costing more than the tools",
    systemEyebrow: "What we build",
    systemTitle: "One operating system for the work",
    processEyebrow: "Process",
    proofEyebrow: "Proof and boundaries",
    proofLink: "See the live workflow",
    faqEyebrow: "Buyer questions",
    faqTitle: "Direct answers",
    relatedEyebrow: "Related",
    relatedTitle: "Keep exploring",
    open: "Open",
  },
  es: {
    primary: "Hablemos",
    fitEyebrow: "Encaja cuando",
    fitTitle: "Los pases entre personas cuestan más que las herramientas",
    systemEyebrow: "Lo que construimos",
    systemTitle: "Un sistema operativo para el trabajo",
    processEyebrow: "Proceso",
    proofEyebrow: "Evidencia y límites",
    proofLink: "Mira el flujo en vivo",
    faqEyebrow: "Preguntas de quien contrata",
    faqTitle: "Respuestas directas",
    relatedEyebrow: "Relacionado",
    relatedTitle: "Sigue explorando",
    open: "Abrir",
  },
} as const;

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

export default function EstablishedContentPage({
  data,
  path,
  locale = "en",
}: {
  data: ContentPageData;
  path: string;
  locale?: string;
}) {
  const lang = locale === "es" ? "es" : "en";
  const t = copy[lang];
  const related = data.related.filter((item) => !item.href.endsWith("/contact"));
  const sectionName = data.kind === "industry" ? "Industries" : "Services";
  const mark = data.kind === "industry" ? ["ONE", "VIEW"] : ["WORK", "FLOW"];
  const heroTitle = (() => {
    switch (data.slug) {
      case "custom-business-software":
        return <>Software built around your <span className="text-[var(--ds-accent)]">operation.</span></>;
      case "dispatch-operations-software":
        return <>Dispatch software for <span className="text-[var(--ds-accent)]">real exceptions.</span></>;
      case "logistics-transportation":
        return <>Dispatch and drivers in <span className="text-[var(--ds-accent)]">one operating view.</span></>;
      case "waste-management-commercial-hauling":
        return <>Hauling software built for <span className="text-[var(--ds-accent)]">route exceptions.</span></>;
      case "artificial-turf-landscaping":
        return <>Give homeowners a faster visual estimate without pretending AI replaces <span className="text-[var(--ds-accent)]">site judgment.</span></>;
      case "home-service-businesses":
        return <>Answer the call, capture the job, and give the field team a <span className="text-[var(--ds-accent)]">clean handoff.</span></>;
      case "moving-companies":
        return <>Connect lead response, pricebook rules, crew scheduling, and <span className="text-[var(--ds-accent)]">job completion.</span></>;
      case "ai-voice-agents":
        return <>AI voice agents built around your <span className="text-[var(--ds-accent)]">call flow.</span></>;
      case "bilingual-ai-automation":
        return <>Bilingual automation for the <span className="text-[var(--ds-accent)]">full customer journey.</span></>;
      case "bilingual-seo-phoenix":
        return <>Be found in Phoenix in <span className="text-[var(--ds-accent)]">English and Spanish.</span></>;
      default:
        return data.title;
    }
  })();
  const primarySchema = data.kind === "service"
    ? { "@context": "https://schema.org", "@type": "Service", "@id": `${baseUrl}${path}#service`, name: data.title, description: data.description, url: `${baseUrl}${path}`, areaServed: { "@type": "Country", name: "United States" }, provider: { "@id": `${baseUrl}/#organization` } }
    : { "@context": "https://schema.org", "@type": "WebPage", "@id": `${baseUrl}${path}#webpage`, name: data.title, description: data.description, url: `${baseUrl}${path}`, about: data.eyebrow, publisher: { "@id": `${baseUrl}/#organization` } };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: sectionName, item: `${baseUrl}/${lang}/${data.kind === "industry" ? "industries" : "services"}` },
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
    <PageShell railCap={data.kind === "industry" ? "OPERATIONS" : "SERVICES"} railItems={rail}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(primarySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />

      <div id="overview">
        <PageHero
          title={heroTitle}
          lede={data.intro}
          actions={
            <Link href={`/${lang}/contact`} className="ds-btn ds-btn-primary">
              {t.primary}
            </Link>
          }
        />
      </div>

      <Section id="fit" eyebrow={t.fitEyebrow} title={t.fitTitle}>
        <ul className="grid gap-px bg-[var(--ds-line)] sm:grid-cols-2">
          {data.goodFit.map((item, index) => (
            <li key={item} className="grid min-h-32 grid-cols-[2.5rem_1fr] items-start gap-3 bg-background p-6">
              <span className="ds-meta pt-1 text-[var(--ds-accent)]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-lg font-semibold leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="system" eyebrow={t.systemEyebrow} title={t.systemTitle}>
        <div className="grid gap-px bg-[var(--ds-line-soft)] md:grid-cols-3">
          {data.sections.map((section) => (
            <DsCard
              key={section.title}
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
          <p className="ds-eyebrow">{t.processEyebrow}</p>
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
          <span>{mark[0]}</span><span>{mark[1]}</span>
        </div>
        <div className="lead-pipeline-proof__copy">
          <p className="ds-eyebrow">{t.proofEyebrow}</p>
          <h2>{data.proofTitle}</h2>
          <p>{data.proof}</p>
          <Link href={`/${lang}/how-it-works`}>{t.proofLink}</Link>
        </div>
      </section>

      <section id="questions" className="scroll-mt-16 py-[var(--ds-space-2xl)]">
        <FaqBlock
          eyebrow={t.faqEyebrow}
          title={t.faqTitle}
          items={data.faqs.map((faq) => ({ key: faq.question, question: faq.question, answer: faq.answer }))}
        />
      </section>

      <Section eyebrow={t.relatedEyebrow} title={t.relatedTitle} className="border-t border-[var(--ds-line-soft)]">
        <div className="grid gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {related.map((item) => (
            <DsCard key={item.href} title={item.label} description={item.description} href={item.href} cta={t.open} className="min-h-56" />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
