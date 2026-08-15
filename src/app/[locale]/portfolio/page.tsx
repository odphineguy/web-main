"use client";

import { useState } from "react";
import PortfolioPreviewModal from "@/components/PortfolioPreviewModal";
import { ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";

interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  siteUrl: string;
  category: string;
  /** When true, the site refuses iframe embedding (X-Frame-Options / CSP).
   * Card opens the URL in a new tab directly instead of trying to preview it. */
  externalOnly?: boolean;
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: "dental",
    name: "Dental Office",
    description: "Dental practice website",
    siteUrl: "https://odphineguy.github.io/dental/",
    category: "Healthcare",
  },
  {
    id: "phoenix-balloon-decor",
    name: "Phoenix Balloon Decor",
    description: "Balloon decoration services",
    siteUrl: "https://phx-balloon-decor.vercel.app/",
    category: "Events",
  },
  {
    id: "gor-jess",
    name: "Gor-Jess Grazing",
    description: "Luxury grazing boards and catering",
    siteUrl: "https://odphineguy.github.io/gor-jess-grazing/first.html",
    category: "Catering",
  },
  {
    id: "inaction",
    name: "InAction",
    description: "Professional business website",
    siteUrl: "https://odphineguy.github.io/inaction/",
    category: "Business",
  },
  {
    id: "saguaro",
    name: "Saguaro Transport",
    description: "Custom operations system for trucking and logistics",
    siteUrl: "https://www.saguarotransport.com/",
    category: "Custom Software",
  },
  {
    id: "thedrone-college",
    name: "The Drone College",
    description: "Drone training and certification",
    siteUrl: "https://odphineguy.github.io/thedrone-college/",
    category: "Education",
  },
  {
    id: "paw-relief",
    name: "Paw Relief",
    description: "Pet care and relief services",
    siteUrl: "https://paw-relief-landing.vercel.app/",
    category: "Pet Care",
  },
  {
    id: "misana",
    name: "MiSana",
    description: "Private health system",
    siteUrl: "https://misana.app/",
    category: "Private Health",
  },
];

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "case-studies", label: "Case studies" },
];

export default function PortfolioPage() {
  const locale = useLocale();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const caseStudies = [
    {
      href: `/${locale}/portfolio/mylabcompliance`,
      title: "myLabCompliance.io",
      description:
        "From critical SEO failures to excellent performance. 95% bug reduction, 500 SEO pages, and 981ms load time.",
    },
    {
      href: `/${locale}/portfolio/saguarotransport`,
      title: "Saguaro Transport",
      description:
        "A full trucking operation built in 4 months — Dispatch Command Center, Fleet, CRM, HR, Accounting, Driver App, and Client Portal.",
    },
    {
      href: "/en/portfolio/rejunk",
      title: "Rejunk",
      description:
        "Lead handling, dispatch, driver activation, job management, and live location in one browser-based systerm.",
    },
    {
      href: "/en/portfolio/artificial-turf-ai-design-studio",
      title: "AI Design Studio for an Artificial Turf Franchise",
      description:
        "Photo intake, AI-assisted visualization, estimate output, and CRM lead creation in one customer journey.",
    },
    {
      href: "/en/portfolio/elena-ai-voice-agent",
      title: "Bilingual AI Voice Agent",
      description:
        "A bilingual personal-injury intake demonstration with emergency checks, qualification, booking, and guardrails.",
    },
  ];

  return (
    <PageShell railCap="WORK" railItems={RAIL}>
      <div id="overview">
        <PageHero
          title={
            <>
              Software Portfolio &amp;{" "}
              <span className="text-[var(--ds-accent)]">Case Studies</span>
            </>
          }
          lede="Operational software, AI automation, mobile apps, and selected web projects built by Abe Media."
        />
      </div>

      <Section id="projects">
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2">
          {portfolioProjects.map((project, i) => {
            const cardBody = (
              <article className="group flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6 transition-colors hover:border-[var(--ds-accent)]">
                <div className="relative aspect-[16/10] overflow-hidden border border-[var(--ds-line-soft)] bg-[var(--ds-accent-bg)]">
                  {project.externalOnly && project.siteUrl ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--ds-ink-mute)]">
                      <ExternalLink className="h-7 w-7 opacity-70 transition-colors group-hover:text-[var(--ds-accent)]" />
                      <span className="ds-meta transition-colors group-hover:text-[var(--ds-accent)]">
                        Visit live site
                      </span>
                    </div>
                  ) : project.siteUrl ? (
                    <iframe
                      src={project.siteUrl}
                      className="pointer-events-none absolute inset-0 h-[200%] w-[200%] origin-top-left scale-50"
                      title={`${project.name} preview`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--ds-ink-mute)]">
                      <span className="text-lg">Coming Soon</span>
                    </div>
                  )}
                </div>
                <span className="ds-meta mt-5 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2">{project.category}</h3>
                <p className="mt-1 text-[0.95rem] text-[var(--ds-ink-mute)]">
                  {project.name}
                </p>
              </article>
            );

            if (project.externalOnly && project.siteUrl) {
              return (
                <Reveal key={project.id} index={i}>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full text-left"
                  >
                    {cardBody}
                  </a>
                </Reveal>
              );
            }

            return (
              <Reveal key={project.id} index={i}>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="block h-full w-full text-left"
                >
                  {cardBody}
                </button>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        id="case-studies"
        bleed
        title={
          <>
            Case <span className="text-[var(--ds-accent)]">Studies</span>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-px bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.href} index={i}>
              <DsCard
                index={i}
                href={study.href}
                title={study.title}
                description={study.description}
                cta="Read Case Study"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {selectedProject && (
        <PortfolioPreviewModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          projectName={selectedProject.name}
          siteUrl={selectedProject.siteUrl}
        />
      )}
    </PageShell>
  );
}
