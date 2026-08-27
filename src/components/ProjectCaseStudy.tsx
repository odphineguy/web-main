import Link from "next/link";
import type { Project } from "@/content/projects";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import ProjectGallery from "@/components/ProjectGallery";

const baseUrl = "https://abemedia.online";

// Page chrome around the project story. Kept beside the component (the
// DiscoverabilityPage pattern) because these strings only appear here.
const ui = {
  en: {
    railCap: "WORK",
    overview: "Overview",
    contextEyebrow: "Context",
    contextTitle: "The starting point",
    problem: "The problem",
    problemEyebrow: "Problem",
    problemTitle: "What needed to change",
    approach: "Approach",
    approachEyebrow: "Approach",
    approachTitle: "How I solved it",
    role: "What I built",
    roleEyebrow: "My role",
    roleTitle: "What I owned",
    outcome: "Outcome",
    outcomeEyebrow: "Outcome",
    outcomeTitle: "The result",
    live: "Live at",
    ctaTitle: "Want a system like this for your operation?",
    cta: "Let’s Talk",
    back: "All projects",
    home: "Home",
    work: "Work",
    gallery: {
      open: "Enlarge image",
      close: "Close image viewer",
      previous: "Previous image",
      next: "Next image",
      dialogTitle: "Project image viewer",
      count: "Image",
    },
  },
  es: {
    railCap: "TRABAJO",
    overview: "Resumen",
    contextEyebrow: "Contexto",
    contextTitle: "El punto de partida",
    problem: "El problema",
    problemEyebrow: "Problema",
    problemTitle: "Lo que tenía que cambiar",
    approach: "Enfoque",
    approachEyebrow: "Enfoque",
    approachTitle: "Cómo lo resolví",
    role: "Lo que construí",
    roleEyebrow: "Mi rol",
    roleTitle: "Lo que estuvo a mi cargo",
    outcome: "Resultado",
    outcomeEyebrow: "Resultado",
    outcomeTitle: "El resultado",
    live: "En vivo en",
    ctaTitle: "¿Quieres un sistema así para tu operación?",
    cta: "Hablemos",
    back: "Todos los proyectos",
    home: "Inicio",
    work: "Trabajo",
    gallery: {
      open: "Ampliar imagen",
      close: "Cerrar visor de imágenes",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
      dialogTitle: "Visor de imágenes del proyecto",
      count: "Imagen",
    },
  },
} as const;

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-[68ch] space-y-[var(--ds-space-md)]">
      {items.map((p, i) => (
        <Reveal key={i} index={i}>
          <p className="text-[var(--ds-ink-mute)]">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default function ProjectCaseStudy({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = locale === "es" ? ui.es : ui.en;
  const lp = `/${locale}`;
  const path = `${lp}/portfolio/${project.slug}`;

  const rail = [
    { id: "overview", label: t.overview },
    { id: "problem", label: t.problem },
    { id: "approach", label: t.approach },
    { id: "role", label: t.role },
    ...(project.extraGallery ? [{ id: "extra-gallery", label: project.extraGallery.title }] : []),
    { id: "outcome", label: t.outcome },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${baseUrl}${path}#article`,
    headline: project.metaTitle,
    description: project.metaDescription,
    url: `${baseUrl}${path}`,
    author: { "@type": "Person", name: "Abe Perez" },
    publisher: { "@id": `${baseUrl}/#organization` },
    about: project.name,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `${baseUrl}${lp}` },
      { "@type": "ListItem", position: 2, name: t.work, item: `${baseUrl}${lp}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${baseUrl}${path}` },
    ],
  };

  return (
    <PageShell railCap={t.railCap} railItems={rail}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />

      <div id="overview">
        <PageHero
          title={project.name}
          lede={project.tagline}
        />

        <Reveal index={2}>
          <div className="mt-[var(--ds-space-xl)] grid gap-px bg-[var(--ds-line-soft)] sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div key={metric.value} className="border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6">
                <p className="text-3xl font-semibold tracking-tight text-[var(--ds-accent)]">{metric.value}</p>
                <p className="mt-2 text-[0.95rem] text-[var(--ds-ink-mute)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Section eyebrow={t.contextEyebrow} title={t.contextTitle}>
          <Paragraphs items={project.context} />
        </Section>

        {project.images.length > 0 && (
          <div className="pb-[var(--ds-space-2xl)]">
            <ProjectGallery images={project.images} labels={t.gallery} />
          </div>
        )}
      </div>

      <Section id="problem" bleed eyebrow={t.problemEyebrow} title={t.problemTitle}>
        <Paragraphs items={project.problem} />
      </Section>

      <Section id="approach" eyebrow={t.approachEyebrow} title={t.approachTitle}>
        <Paragraphs items={project.approach} />
      </Section>

      <Section id="role" bleed eyebrow={t.roleEyebrow} title={t.roleTitle}>
        <Reveal index={0}>
          <p className="max-w-[68ch] text-[var(--ds-ink-mute)]">{project.roleIntro}</p>
        </Reveal>
        <ul className="mt-[var(--ds-space-lg)] max-w-[68ch] space-y-3">
          {project.roleItems.map((item, i) => (
            <Reveal key={item} index={i}>
              <li className="flex gap-3 text-[0.95rem] text-[var(--ds-ink-mute)]">
                <span aria-hidden className="text-[var(--ds-accent)]">/</span>
                <span>{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {project.extraGallery && (
        <Section
          id="extra-gallery"
          title={project.extraGallery.title}
          lede={project.extraGallery.description}
        >
          <ProjectGallery images={project.extraGallery.images} labels={t.gallery} />
        </Section>
      )}

      <Section id="outcome" eyebrow={t.outcomeEyebrow} title={t.outcomeTitle}>
        <Paragraphs items={project.outcome} />
        {project.liveUrl && (
          <Reveal index={project.outcome.length}>
            <p className="mt-[var(--ds-space-lg)] text-[0.95rem]">
              {t.live}{" "}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ds-accent)] underline underline-offset-4"
              >
                {project.liveLabel ?? project.liveUrl}
              </a>
            </p>
          </Reveal>
        )}
      </Section>

      <Section bleed>
        <div className="flex flex-wrap items-center justify-between gap-[var(--ds-space-lg)]">
          <h2 className="max-w-[24ch]">{t.ctaTitle}</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`${lp}/contact`} className="ds-btn ds-btn-primary">
              {t.cta}
            </Link>
            <Link href={`${lp}/portfolio`} className="ds-btn">
              {t.back}
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
