import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { abePerezPage } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";

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

export default async function AbePerezPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const c = isEs ? abePerezPage.es : abePerezPage.en;
  const lp = isEs ? "/es" : "/en";
  const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${baseUrl}${lp}/about/abe-perez#person`, name: "Abe Perez", jobTitle: "Founder", worksFor: { "@id": `${baseUrl}/#organization` }, homeLocation: { "@type": "Place", name: "Phoenix, Arizona" }, knowsAbout: ["AI voice agents", "Dispatch and operations software", "Lead-pipeline automation", "Bilingual English-Spanish automation", "Waste management operations", "Commercial hauling operations"] };
  const profile = { "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${baseUrl}${lp}/about/abe-perez#profile`, url: `${baseUrl}${lp}/about/abe-perez`, name: "Abe Perez — Founder of Abe Media", dateCreated: "2026-08-06", dateModified: "2026-08-06", mainEntity: { "@id": `${baseUrl}${lp}/about/abe-perez#person` }, publisher: { "@id": `${baseUrl}/#organization` } };
  const safe = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(profile) }} />
      <header className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(234,88,12,0.14),transparent_40%)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.eyebrow}</p><h1 className="mt-5 max-w-5xl text-4xl font-medium tracking-[-0.035em] md:text-6xl">{c.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{c.lede}</p></div>
      </header>
      <section className="px-6 py-16 md:py-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{c.backgroundEyebrow}</p><h2 className="mt-3 text-3xl font-medium">{c.backgroundTitle}</h2></div><div className="space-y-6 text-lg leading-8 text-muted-foreground">{c.background.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
      <section className="border-y border-border bg-muted/35 px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-medium">{c.bringTitle}</h2><ul className="mt-9 grid gap-4 md:grid-cols-2">{c.bring.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{item}</span></li>)}</ul></div></section>
      <section className="px-6 py-16 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{c.workEyebrow}</p><h2 className="mt-3 text-3xl font-medium">{c.workTitle}</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[{ href: "/en/portfolio/saguarotransport", title: "Saguaro Transport", body: "Transportation operations software, built and delivered." }, { href: "/en/portfolio/rejunk", title: "Rejunk", body: "Lead handling, dispatch, and browser-based driver workflows." }, { href: "/en/portfolio/artificial-turf-ai-design-studio", title: "AI Design Studio for an Artificial Turf Franchise", body: "Photo intake, AI visualization, estimating, and CRM handoff." }].map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-border p-6 hover:border-primary/50"><h3 className="flex items-center justify-between text-xl font-medium">{item.title}<ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p></Link>)}</div><div className="mt-12 rounded-3xl bg-neutral-950 p-8 text-white md:flex md:items-center md:justify-between"><div><h2 className="text-2xl font-medium">{c.ctaTitle}</h2><p className="mt-2 text-neutral-300">{c.ctaBody}</p></div><Link href={`${lp}/contact`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-semibold md:mt-0">{c.ctaLabel}{" "}<ArrowRight className="h-4 w-4" /></Link></div></div></section>
    </main>
  );
}
