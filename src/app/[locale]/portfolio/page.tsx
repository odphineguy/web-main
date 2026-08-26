"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";
import { projectOrder, projects } from "@/content/projects";
import { projectsEs } from "@/content/projects.es";

// Page copy lives here (the ReactiveFooter pattern) rather than messages/*.json
// because these strings only ever appear on this page.
const pageCopy = {
  en: {
    heroTitleA: "Projects &",
    heroTitleB: "Case Studies",
    heroLede: "Real systems in production — voice AI, operations platforms, and mobile apps built end to end by Abe Media.",
    projects: "Projects",
    moreTitle: "More case studies",
    readCase: "Read the story",
    readStudy: "Read case study",
    rail: { overview: "Overview", projects: "Projects", more: "More case studies" },
  },
  es: {
    heroTitleA: "Proyectos y",
    heroTitleB: "casos de estudio",
    heroLede: "Sistemas reales en producción — IA de voz, plataformas de operaciones y apps móviles construidas de punta a punta por Abe Media.",
    projects: "Proyectos",
    moreTitle: "Más casos de estudio",
    readCase: "Leer la historia",
    readStudy: "Leer el caso",
    rail: { overview: "Resumen", projects: "Proyectos", more: "Más casos" },
  },
} as const;

export default function PortfolioPage() {
  const locale = useLocale();
  const copy = locale === "es" ? pageCopy.es : pageCopy.en;
  const record = locale === "es" ? projectsEs : projects;

  const rail = [
    { id: "overview", label: copy.rail.overview },
    { id: "projects", label: copy.rail.projects },
    { id: "more-case-studies", label: copy.rail.more },
  ];

  const moreStudies = [
    {
      href: `/${locale}/portfolio/mylabcompliance`,
      title: "myLabCompliance.io",
      description:
        locale === "es"
          ? "De fallas críticas de SEO a un rendimiento excelente. 95% menos bugs, 500 páginas SEO y 981 ms de carga."
          : "From critical SEO failures to excellent performance. 95% bug reduction, 500 SEO pages, and 981ms load time.",
    },
    // The next two case studies exist in English only, so they link to /en
    // deliberately even for Spanish visitors.
    {
      href: "/en/portfolio/artificial-turf-ai-design-studio",
      title: locale === "es" ? "Estudio de diseño con IA para una franquicia de pasto sintético" : "AI Design Studio for an Artificial Turf Franchise",
      description:
        locale === "es"
          ? "Recepción de fotos, visualización asistida por IA, cotización y creación de leads en el CRM en un solo recorrido."
          : "Photo intake, AI-assisted visualization, estimate output, and CRM lead creation in one customer journey.",
    },
    {
      href: "/en/portfolio/elena-ai-voice-agent",
      title: locale === "es" ? "Agente de voz con IA bilingüe" : "Bilingual AI Voice Agent",
      description:
        locale === "es"
          ? "Una demostración bilingüe de intake de lesiones personales con revisión de emergencias, calificación, agenda y salvaguardas."
          : "A bilingual personal-injury intake demonstration with emergency checks, qualification, booking, and guardrails.",
    },
  ];

  return (
    <PageShell railCap={locale === "es" ? "TRABAJO" : "WORK"} railItems={rail}>
      <div id="overview">
        <PageHero
          title={
            <>
              {copy.heroTitleA}{" "}
              <span className="text-[var(--ds-accent)]">{copy.heroTitleB}</span>
            </>
          }
          lede={copy.heroLede}
        />
      </div>

      <Section id="projects">
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {projectOrder.map((slug, i) => {
            const project = record[slug] ?? projects[slug];
            return (
              <Reveal key={slug} index={i}>
                <Link href={`/${locale}/portfolio/${slug}`} className="block h-full">
                  <article className="group flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6 transition-colors hover:border-[var(--ds-accent)]">
                    <div className="relative aspect-[16/10] overflow-hidden border border-[var(--ds-line-soft)] bg-[var(--ds-accent-bg)]">
                      <Image
                        src={project.thumbnail.src}
                        alt={project.thumbnail.alt}
                        fill
                        sizes="(min-width: 768px) 24rem, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-3">
                      <span className="ds-meta block">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ds-meta block">{project.year}</span>
                    </div>
                    <h3 className="mt-2">{project.name}</h3>
                    <p className="mt-1 text-[0.95rem] text-[var(--ds-ink-mute)]">
                      {project.tagline}
                    </p>
                    <span className="ds-meta mt-auto pt-5 text-[var(--ds-accent)]">
                      {copy.readCase}
                    </span>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        id="more-case-studies"
        bleed
        title={copy.moreTitle}
      >
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-3">
          {moreStudies.map((study, i) => (
            <Reveal key={study.href} index={i}>
              <DsCard
                href={study.href}
                title={study.title}
                description={study.description}
                cta={copy.readStudy}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
