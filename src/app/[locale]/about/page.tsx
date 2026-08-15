import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutPage } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";

const baseUrl = "https://abemedia.online";

const meta = {
  en: {
    title: "About Abe Media — Phoenix AI Agents & Operations Software",
    description:
      "Abe Media builds AI voice agents, custom dispatch systems, and lead automation for service businesses. Founded and operated in Phoenix, Arizona, in English and Spanish.",
  },
  es: {
    title: "Acerca de Abe Media — Agentes de IA y Software de Operaciones en Phoenix",
    description:
      "Abe Media construye agentes de voz con IA, sistemas de despacho a medida y automatización de leads para negocios de servicio. Con base en Phoenix, Arizona, en inglés y español.",
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = locale === "es" ? meta.es : meta.en;
  return constructMetadata({ title: m.title, description: m.description, path: "/about", locale, hasSpanishEquivalent: true });
}

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "story", label: "Story" },
  { id: "facts", label: "Facts" },
  { id: "explore", label: "Explore" },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";
  const c = isEs ? aboutPage.es : aboutPage.en;
  const lp = isEs ? "/es" : "/en";

  const organization = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}${lp}/about#aboutpage`,
    url: `${baseUrl}${lp}/about`,
    name: c.title,
    inLanguage: isEs ? "es-US" : "en-US",
    mainEntity: { "@id": `${baseUrl}/#organization` },
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  const links = isEs
    ? [
        { href: "/es/services", label: "Servicios", body: "Lo que Abe Media construye y cómo se entrega." },
        { href: "/es/about/abe-perez", label: "Abe Perez", body: "El fundador y de dónde viene el enfoque." },
        { href: "/es/portfolio", label: "Trabajo publicado", body: "Sistemas que ya están en producción." },
      ]
    : [
        { href: "/en/services", label: "Services", body: "What Abe Media builds and how it is delivered." },
        { href: "/en/about/abe-perez", label: "Abe Perez", body: "The founder, and where the approach comes from." },
        { href: "/en/portfolio", label: "Published work", body: "Systems already running in production." },
      ];

  return (
    <PageShell railCap="ABOUT" railItems={RAIL}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />

      <div id="overview">
        <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      </div>

      <Section id="story" eyebrow={c.factsTitle}>
        <div className="space-y-6 text-[var(--ds-ink-mute)]">
          {c.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="facts" bleed title={c.factsTitle}>
        <ul className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {c.facts.map((item, i) => (
            <Reveal key={item} index={i}>
              <li className="flex h-full gap-3 border border-[var(--ds-line)] bg-[var(--ds-raise)] p-5">
                <span aria-hidden className="text-[var(--ds-accent)]">
                  /
                </span>
                <span className="text-[var(--ds-ink-mute)]">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="explore" title={c.linksTitle}>
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-3">
          {links.map((item, i) => (
            <Reveal key={item.href} index={i}>
              <DsCard index={i} href={item.href} title={item.label} description={item.body} />
            </Reveal>
          ))}
        </div>

        <div className="mt-[var(--ds-space-xl)] border border-[var(--ds-line)] bg-[var(--ds-raise)] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3>{c.ctaTitle}</h3>
            <p className="mt-2 text-[var(--ds-ink-mute)]">{c.ctaBody}</p>
          </div>
          <Link href={`${lp}/contact`} className="ds-btn ds-btn-primary mt-6 shrink-0 md:mt-0">
            {c.ctaLabel} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
