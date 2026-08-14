import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { aboutPage } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";

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
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(227,79,11,0.14),transparent_40%)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-[-0.035em] md:text-6xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{c.lede}</p>
        </div>
      </header>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{c.factsTitle}</p>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            {c.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/35 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-medium">{c.factsTitle}</h2>
          <ul className="mt-9 grid gap-4 md:grid-cols-2">
            {c.facts.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-medium">{c.linksTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50">
                <h3 className="flex items-center justify-between text-xl font-medium">
                  {item.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-neutral-950 p-8 text-white md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-medium">{c.ctaTitle}</h2>
              <p className="mt-2 text-neutral-300">{c.ctaBody}</p>
            </div>
            <Link href={`${lp}/contact`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-semibold md:mt-0">
              {c.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
