import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { abePerezPage } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";

const baseUrl = "https://abemedia.online";

const perezMeta = {
  en: { title: "Abe Perez — Founder of Abe Media | Operations Software Builder", description: "Meet Abe Perez, Phoenix-based founder of Abe Media and an operations-software builder with 17 years at Waste Management." },
  es: { title: "Abe Perez — Fundador de Abe Media | Software de Operaciones", description: "Conoce a Abe Perez, fundador de Abe Media en Phoenix y constructor de software de operaciones con 17 años en Waste Management." },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = locale === "es" ? perezMeta.es : perezMeta.en;
  return constructMetadata({ title: m.title, description: m.description, path: "/about/abe-perez", locale, hasSpanishEquivalent: true });
}

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "background", label: "Background" },
  { id: "brings", label: "What that brings" },
  { id: "work", label: "Published work" },
];

const workLinks = [
  { href: "/en/portfolio/saguarotransport", title: "Saguaro Transport", body: "Transportation operations software, built and delivered." },
  { href: "/en/portfolio/rejunk", title: "Rejunk", body: "Lead handling, dispatch, and browser-based driver workflows." },
  { href: "/en/portfolio/artificial-turf-ai-design-studio", title: "AI Design Studio for an Artificial Turf Franchise", body: "Photo intake, AI visualization, estimating, and CRM handoff." },
];

export default async function AbePerezPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const c = isEs ? abePerezPage.es : abePerezPage.en;
  const lp = isEs ? "/es" : "/en";
  const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${baseUrl}${lp}/about/abe-perez#person`, name: "Abe Perez", jobTitle: "Founder", worksFor: { "@id": `${baseUrl}/#organization` }, homeLocation: { "@type": "Place", name: "Phoenix, Arizona" }, knowsLanguage: ["en", "es"], knowsAbout: ["AI voice agents", "Dispatch and operations software", "Lead-pipeline automation", "Bilingual English-Spanish automation", "Waste management operations", "Commercial hauling operations"] };
  const profile = { "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${baseUrl}${lp}/about/abe-perez#profile`, url: `${baseUrl}${lp}/about/abe-perez`, name: "Abe Perez — Founder of Abe Media", dateCreated: "2026-08-06", dateModified: "2026-08-06", mainEntity: { "@id": `${baseUrl}${lp}/about/abe-perez#person` }, publisher: { "@id": `${baseUrl}/#organization` } };
  const safe = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <PageShell railCap="FOUNDER" railItems={RAIL}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(profile) }} />

      <div id="overview">
        <PageHero
          title={
            isEs ? (
              <>Estuve en despacho antes de <span className="text-[var(--ds-accent)]">automatizarlo.</span></>
            ) : (
              <>I ran dispatch before I <span className="text-[var(--ds-accent)]">automated it.</span></>
            )
          }
          lede={c.lede}
        />
      </div>

      <Section id="background" title={c.backgroundTitle}>
        <div className="space-y-6 text-[var(--ds-ink-mute)]">
          {c.background.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="brings" bleed title={c.bringTitle}>
        <ul className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {c.bring.map((item, i) => (
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

      <Section id="work" title={c.workTitle}>
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-3">
          {workLinks.map((item, i) => (
            <Reveal key={item.href} index={i}>
              <DsCard href={item.href} title={item.title} description={item.body} />
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
