"use client";

import { useState } from "react";
import Link from "next/link";
import PortfolioPreviewModal from "@/components/PortfolioPreviewModal";
import { ArrowRight } from "lucide-react";

interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  siteUrl: string;
  category: string;
}

const portfolioProjects: PortfolioProject[] = [
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
    name: "Saguaro",
    description: "Transportation services website",
    siteUrl: "https://saguaro.vercel.app/",
    category: "Transportation",
  },
  {
    id: "thedrone-college",
    name: "The Drone College",
    description: "Drone training and certification",
    siteUrl: "https://odphineguy.github.io/thedrone-college/",
    category: "Education",
  },
  {
    id: "mealsaver",
    name: "Meal Saver",
    description: "Food rescue and savings app",
    siteUrl: "https://mealsaver.app/",
    category: "Food App",
  },
  {
    id: "saguaro-transport",
    name: "Saguaro Transport",
    description: "Transportation services website",
    siteUrl: "https://saguaro-transport.vercel.app/",
    category: "Transportation",
  },
  {
    id: "paisanos",
    name: "Paisanos",
    description: "Restaurant website design",
    siteUrl: "https://odphineguy.github.io/paisanos-restaurant/",
    category: "Restaurant",
  },
  {
    id: "phoenix-balloon-decor",
    name: "Phoenix Balloon Decor",
    description: "Balloon decoration services",
    siteUrl: "https://phx-balloon-decor.vercel.app/",
    category: "Events",
  },
  {
    id: "paw-relief",
    name: "Paw Relief",
    description: "Pet care and relief services",
    siteUrl: "https://paw-relief-landing.vercel.app/",
    category: "Pet Care",
  },
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6">
            Website Design{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Previews
            </span>
          </h1>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-all duration-300">
                  <div className="aspect-[16/10] relative bg-gray-100 dark:bg-neutral-900">
                    <iframe
                      src={project.siteUrl}
                      className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                      title={`${project.name} preview`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl md:text-[28px] font-normal tracking-normal text-gray-700 dark:text-neutral-300">
                    {project.category}
                  </h3>
                  <p className="text-sm md:text-base font-normal leading-relaxed text-gray-500 dark:text-neutral-500">{project.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-8 text-gray-900 dark:text-white text-center">
            Case{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Studies
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* myLabCompliance Case Study */}
            <Link
              href="/portfolio/mylabcompliance"
              className="group block p-6 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:border-orange-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                B2B SaaS
              </div>
              <h3 className="text-xl md:text-[28px] font-normal tracking-normal mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                myLabCompliance.io
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm md:text-base font-normal leading-relaxed mb-4">
                From critical SEO failures to excellent performance. 95% bug reduction, 500 SEO pages, and 981ms load time.
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
