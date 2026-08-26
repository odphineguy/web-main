import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscoverabilityPage } from "@/components/DiscoverabilityPage";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { caseStudyPages } from "@/content/discoverability";
import { projects } from "@/content/projects";
import { projectsEs } from "@/content/projects.es";
import { constructMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return [
    ...Object.keys(projects).flatMap((slug) => [
      { locale: "en", slug },
      { locale: "es", slug },
    ]),
    // Remaining DiscoverabilityPage case studies are English-only.
    ...Object.keys(caseStudyPages).map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = locale === "es" ? projectsEs[slug] ?? projects[slug] : projects[slug];
  if (project) {
    return constructMetadata({
      title: project.metaTitle,
      description: project.metaDescription,
      image: project.thumbnail.src,
      path: `/portfolio/${slug}`,
      locale,
      hasSpanishEquivalent: true,
    });
  }
  const data = caseStudyPages[slug];
  if (!data || locale !== "en") return constructMetadata({ title: "Page not found | Abe Media", noIndex: true, locale, hasSpanishEquivalent: false });
  return constructMetadata({ title: data.metaTitle, description: data.description, path: `/portfolio/${slug}`, locale, hasSpanishEquivalent: false });
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = locale === "es" ? projectsEs[slug] ?? projects[slug] : projects[slug];
  if (project) return <ProjectCaseStudy project={project} locale={locale} />;
  const data = caseStudyPages[slug];
  if (!data || locale !== "en") notFound();
  return <DiscoverabilityPage data={data} path={`/en/portfolio/${slug}`} />;
}
