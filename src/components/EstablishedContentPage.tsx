import Link from "next/link";
import { ArrowRight } from "lucide-react";

import DsCard from "@/components/ds/Card";
import PageHero from "@/components/ds/PageHero";
import PageShell from "@/components/ds/PageShell";
import Section from "@/components/ds/Section";
import type { ContentPageData } from "@/content/discoverability";

const baseUrl = "https://abemedia.online";

const copy = {
  en: {
    primary: "Discuss your workflow",
    secondary: "See how we work",
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
    primary: "Cuéntanos tu flujo de trabajo",
    secondary: "Mira cómo trabajamos",
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
          eyebrow={data.eyebrow}
          title={data.title}
          lede={data.intro}
          actions={
            <>
              <Link href={`/${lang}/contact`} className="ds-btn ds-btn-primary">
                {t.primary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${lang}/how-it-works`} className="ds-btn ds-btn-ghost">
                {t.secondary}
              </Link>
            </>
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
          <span>{mark[0]}</span><b>→</b><span>{mark[1]}</span>
        </div>
        <div className="lead-pipeline-proof__copy">
          <p className="ds-eyebrow">{t.proofEyebrow}</p>
          <h2>{data.proofTitle}</h2>
          <p>{data.proof}</p>
          <Link href={`/${lang}/how-it-works`}>{t.proofLink} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <Section id="questions" eyebrow={t.faqEyebrow} title={t.faqTitle}>
        <div className="lead-pipeline-faq">
          {data.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<b aria-hidden="true">+</b></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section eyebrow={t.relatedEyebrow} title={t.relatedTitle} className="border-t border-[var(--ds-line-soft)]">
        <div className="grid gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {related.map((item, index) => (
            <DsCard key={item.href} index={index} title={item.label} description={item.description} href={item.href} cta={t.open} className="min-h-56" />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
