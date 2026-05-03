"use client";

import { useState } from "react";
import Link from "next/link";
import PortfolioPreviewModal from "@/components/PortfolioPreviewModal";
import { ArrowRight, ExternalLink } from "lucide-react";

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
    description: "Custom operations platform for trucking and logistics",
    siteUrl: "https://www.saguarotransport.com/",
    category: "Custom Platform",
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
    description: "Private health platform",
    siteUrl: "https://misana.app/",
    category: "Private Health",
  },
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-foreground mb-6">
            Website Design{" "}
            <span className="text-primary">
              Previews
            </span>
          </h1>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project) => {
              const cardBody = (
                <>
                  <div className="relative overflow-hidden rounded-lg border border-border hover:border-gray-300 dark:hover:border-neutral-600 transition-all duration-300">
                    <div className="aspect-[16/10] relative bg-gray-100 dark:bg-neutral-900">
                      {project.externalOnly && project.siteUrl ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                          <ExternalLink className="w-7 h-7 opacity-70 group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            Visit live site
                          </span>
                        </div>
                      ) : project.siteUrl ? (
                        <iframe
                          src={project.siteUrl}
                          className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                          title={`${project.name} preview`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground dark:text-neutral-600">
                          <span className="text-lg">Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl md:text-[28px] font-normal tracking-normal text-foreground">
                      {project.category}
                    </h3>
                    <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">
                      {project.name}
                    </p>
                  </div>
                </>
              );

              if (project.externalOnly && project.siteUrl) {
                return (
                  <a
                    key={project.id}
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-left"
                  >
                    {cardBody}
                  </a>
                );
              }

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group text-left"
                >
                  {cardBody}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-8 text-foreground text-center">
            Case{" "}
            <span className="text-primary">
              Studies
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* myLabCompliance Case Study */}
            <Link
              href="/portfolio/mylabcompliance"
              className="group block p-6 rounded-xl bg-card border border-border hover:border-orange-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                B2B SaaS
              </div>
              <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-2 text-foreground group-hover:text-orange-500 transition-colors">
                myLabCompliance.io
              </h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed mb-4">
                From critical SEO failures to excellent performance. 95% bug reduction, 500 SEO pages, and 981ms load time.
              </p>
              <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                Read Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Saguaro Transport Case Study */}
            <Link
              href="/portfolio/saguarotransport"
              className="group block p-6 rounded-xl bg-card border border-border hover:border-orange-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Custom Platform
              </div>
              <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-2 text-foreground group-hover:text-orange-500 transition-colors">
                Saguaro Transport
              </h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed mb-4">
                A full trucking operation built in 4 months — Dispatch Command Center, Fleet, CRM, HR, Accounting, Driver App, and Client Portal.
              </p>
              <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                Read Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {selectedProject && (
        <PortfolioPreviewModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          projectName={selectedProject.name}
          siteUrl={selectedProject.siteUrl}
        />
      )}
    </div>
  );
}
