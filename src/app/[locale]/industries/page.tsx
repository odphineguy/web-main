import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industryPages } from "@/content/discoverability";
import { industriesIndexEs, industryPagesEs } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";

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

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "workflows", label: "Workflows" },
];

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const pages = isEs ? industryPagesEs : industryPages;

  const copy = isEs
    ? {
        ...industriesIndexEs,
        title: (
          <>
            Software formado por la <span className="text-[var(--ds-accent)]">operación</span>, no por la etiqueta de la industria
          </>
        ),
      }
    : {
        eyebrow: "Industries",
        title: (
          <>
            Software shaped by the <span className="text-[var(--ds-accent)]">operation</span>, not an industry label
          </>
        ),
        intro:
          "These pages focus on workflows Abe Media has direct experience building or operating. Each one covers the exceptions, handoffs, and proof relevant to that work.",
        cta: "Explore the workflow",
        note: "",
      };

  return (
    <PageShell railCap="INDUSTRIES" railItems={RAIL}>
      <div id="overview">
        <PageHero title={copy.title} lede={copy.intro} />
      </div>

      <Section id="workflows">
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {Object.values(pages).map((page, i) => (
            <Reveal key={page.slug} index={i}>
              <DsCard
                eyebrow={page.eyebrow}
                title={page.title}
                description={page.description}
                href={`/${locale}/industries/${page.slug}`}
                cta={copy.cta}
              />
            </Reveal>
          ))}
        </div>
        {copy.note && (
          <p className="mt-[var(--ds-space-lg)] text-sm text-[var(--ds-ink-mute)]">
            {copy.note}{" "}
            <Link href="/en/industries" className="font-semibold text-[var(--ds-accent)] hover:underline">
              Ver todas en inglés
            </Link>
          </p>
        )}
      </Section>
    </PageShell>
  );
}
