import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscoverabilityPage } from "@/components/DiscoverabilityPage";
import { servicePages } from "@/content/discoverability";
import { servicePagesEs } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";
import LeadPipelinePage from "@/components/LeadPipelinePage";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Only the slugs present in servicePagesEs exist in Spanish; the rest stay
// English-only so hreflang never advertises a page that 404s.
const pagesFor = (locale: string) => (locale === "es" ? servicePagesEs : servicePages);

export function generateStaticParams() {
  return [
    ...Object.keys(servicePages).map((slug) => ({ locale: "en", slug })),
    ...Object.keys(servicePagesEs).map((slug) => ({ locale: "es", slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "es") return constructMetadata({ title: "Page not found | Abe Media", noIndex: true, locale, hasSpanishEquivalent: false });
  const data = pagesFor(locale)[slug];
  if (!data) return constructMetadata({ title: "Page not found | Abe Media", noIndex: true, locale, hasSpanishEquivalent: false });
  return constructMetadata({
    title: data.metaTitle,
    description: data.description,
    path: `/services/${slug}`,
    locale,
    hasSpanishEquivalent: Boolean(servicePagesEs[slug]),
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const data = pagesFor(locale)[slug];
  if (!data) notFound();
  if (locale === "en" && slug === "lead-pipeline-automation") {
    return <LeadPipelinePage data={data} />;
  }
  return <DiscoverabilityPage data={data} path={`/${locale}/services/${slug}`} locale={locale} />;
}
