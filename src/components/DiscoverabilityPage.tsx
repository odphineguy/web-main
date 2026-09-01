import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ContentPageData } from "@/content/discoverability";
import { FaqBlock } from "@/components/FaqAccordion";

const baseUrl = "https://abemedia.online";

// Page chrome shown around the content. Kept beside the component rather than in
// messages/*.json because these strings only ever appear on these pages.
const ui = {
  en: {
    home: "Home",
    services: "Services",
    industries: "Industries",
    caseStudies: "Case Studies",
    ctaPrimary: "Discuss your workflow",
    ctaSecondary: "See how we work",
    goodFitEyebrow: "Good fit when",
    goodFitTitle: "The handoffs are costing more than the tools",
    processEyebrow: "Process",
    proofEyebrow: "Proof and boundaries",
    faqEyebrow: "Buyer questions",
    faqTitle: "Direct answers",
    relatedTitle: "Continue the research",
  },
  es: {
    home: "Inicio",
    services: "Servicios",
    industries: "Industrias",
    caseStudies: "Casos de estudio",
    ctaPrimary: "Cuéntanos tu flujo de trabajo",
    ctaSecondary: "Mira cómo trabajamos",
    goodFitEyebrow: "Encaja cuando",
    goodFitTitle: "Los pases entre personas cuestan más que las herramientas",
    processEyebrow: "Proceso",
    proofEyebrow: "Evidencia y límites",
    faqEyebrow: "Preguntas de quien contrata",
    faqTitle: "Respuestas directas",
    relatedTitle: "Sigue investigando",
  },
} as const;

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function DiscoverabilityPage({ data, path, locale = "en" }: { data: ContentPageData; path: string; locale?: string }) {
  const t = locale === "es" ? ui.es : ui.en;
  const lp = locale === "es" ? "/es" : "/en";
  const sectionSlug = data.kind === "service" ? "services" : data.kind === "industry" ? "industries" : "portfolio";
  const breadcrumbs = [
    { name: t.home, item: `${baseUrl}${lp}` },
    { name: data.kind === "service" ? t.services : data.kind === "industry" ? t.industries : t.caseStudies, item: `${baseUrl}${lp}/${sectionSlug}` },
    { name: data.eyebrow.replace(/^Case study · |^Product demonstration · /, ""), item: `${baseUrl}${path}` },
  ];
  const primarySchema = data.kind === "service"
    ? { "@context": "https://schema.org", "@type": "Service", "@id": `${baseUrl}${path}#service`, name: data.title, description: data.description, url: `${baseUrl}${path}`, areaServed: { "@type": "Country", name: "United States" }, provider: { "@id": `${baseUrl}/#organization` } }
    : data.kind === "case-study"
      ? { "@context": "https://schema.org", "@type": "Article", "@id": `${baseUrl}${path}#article`, headline: data.title, description: data.description, url: `${baseUrl}${path}`, datePublished: "2026-08-06", dateModified: "2026-08-06", author: { "@type": "Person", name: "Abe Perez" }, publisher: { "@id": `${baseUrl}/#organization` }, about: data.eyebrow }
      : { "@context": "https://schema.org", "@type": "WebPage", "@id": `${baseUrl}${path}#webpage`, name: data.title, description: data.description, url: `${baseUrl}${path}`, about: data.eyebrow, publisher: { "@id": `${baseUrl}/#organization` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: crumb.item })) };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <article className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(primarySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />

      <header className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(227,79,11,0.14),transparent_38%)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.item} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link className="hover:text-foreground" href={new URL(crumb.item).pathname}>{crumb.name}</Link>}
              </span>
            ))}
          </nav>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{data.eyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-medium tracking-[-0.035em] md:text-6xl md:leading-[1.03]">{data.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{data.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`${lp}/contact`} className="inline-flex items-center gap-2 rounded-[var(--radius-action)] bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">{t.ctaPrimary}{" "} <ArrowRight className="h-4 w-4" /></Link>
            <Link href={`${lp}/how-it-works`} className="inline-flex items-center gap-2 rounded-[var(--radius-action)] border border-border bg-card px-6 py-3 font-semibold transition-colors hover:border-primary/50">{t.ctaSecondary}</Link>
          </div>
        </div>
      </header>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.goodFitEyebrow}</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em]">{t.goodFitTitle}</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.goodFit.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm leading-6"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-muted/35 px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {data.sections.map((section, index) => (
            <section key={section.title} className="rounded-3xl border border-border bg-background p-7">
              <span className="text-sm font-semibold text-primary">0{index + 1}</span>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.02em]">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.body}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {section.items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-primary">—</span><span>{item}</span></li>)}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.processEyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-[-0.025em] md:text-4xl">{data.processTitle}</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {data.process.map((step, index) => <li key={step.title} className="bg-background p-7"><span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 text-xl font-medium">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-400">{t.proofEyebrow}</p>
          <div><h2 className="text-3xl font-medium tracking-[-0.025em] md:text-4xl">{data.proofTitle}</h2><p className="mt-5 max-w-3xl text-base leading-7 text-neutral-300">{data.proof}</p></div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <FaqBlock
          className="mx-auto max-w-6xl"
          eyebrow={t.faqEyebrow}
          title={t.faqTitle}
          items={data.faqs.map((faq) => ({ key: faq.question, question: faq.question, answer: faq.answer }))}
        />
      </section>

      <section className="border-t border-border bg-muted/35 px-6 py-16">
        <div className="mx-auto max-w-6xl"><h2 className="text-2xl font-medium">{t.relatedTitle}</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{data.related.map((link) => <Link key={link.href} href={link.href} className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/50"><span className="flex items-center justify-between font-semibold">{link.label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span><span className="mt-2 block text-sm leading-6 text-muted-foreground">{link.description}</span></Link>)}</div></div>
      </section>
    </article>
  );
}
