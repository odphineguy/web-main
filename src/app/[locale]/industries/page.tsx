import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { industryPages } from "@/content/discoverability";
import { industriesIndexEs, industryPagesEs } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";

const meta = {
  en: {
    title: "Service-Business Industries | Abe Media",
    description:
      "Operational software and automation for logistics, junk removal, turf and landscaping, home services, waste hauling, and moving companies.",
  },
  es: {
    title: "Industrias de Negocios de Servicio | Abe Media",
    description:
      "Software de operaciones y automatización para retiro de escombros, servicios del hogar, HVAC, plomería, transporte y mudanzas.",
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = locale === "es" ? meta.es : meta.en;
  return constructMetadata({ title: m.title, description: m.description, path: "/industries", locale, hasSpanishEquivalent: true });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const pages = isEs ? industryPagesEs : industryPages;

  const copy = isEs
    ? industriesIndexEs
    : {
        eyebrow: "Industries",
        title: "Software shaped by the operation, not an industry label",
        intro:
          "These pages focus on workflows Abe Media has direct experience building or operating. Each one covers the exceptions, handoffs, and proof relevant to that work.",
        cta: "Explore the workflow",
        note: "",
      };

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-[-0.035em] md:text-6xl">{copy.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {Object.values(pages).map((page) => (
            <Link
              key={page.slug}
              href={`/${locale}/industries/${page.slug}`}
              className="group rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{page.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.02em]">{page.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{page.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                {copy.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        {copy.note && (
          <p className="mt-10 text-sm text-muted-foreground">
            {copy.note}{" "}
            <Link href="/en/industries" className="font-semibold text-primary hover:underline">
              Ver todas en inglés
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
