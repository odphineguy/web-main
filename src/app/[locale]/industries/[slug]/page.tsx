import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industryPages } from "@/content/discoverability";
import { industryPagesEs } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";
import EstablishedContentPage from "@/components/EstablishedContentPage";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Only the slugs present in industryPagesEs exist in Spanish; the rest stay
// English-only so hreflang never advertises a page that 404s.
const pagesFor = (locale: string) => (locale === "es" ? industryPagesEs : industryPages);

export function generateStaticParams() {
  return [
    ...Object.keys(industryPages).map((slug) => ({ locale: "en", slug })),
    ...Object.keys(industryPagesEs).map((slug) => ({ locale: "es", slug })),
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
    path: `/industries/${slug}`,
    locale,
    hasSpanishEquivalent: Boolean(industryPagesEs[slug]),
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const data = pagesFor(locale)[slug];
  if (!data) notFound();
  return <EstablishedContentPage data={data} path={`/${locale}/industries/${slug}`} locale={locale} />;
}
