import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscoverabilityPage } from "@/components/DiscoverabilityPage";
import { servicePages } from "@/content/discoverability";
import { constructMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = servicePages[slug];
  if (!data || locale !== "en") return constructMetadata({ title: "Page not found | Abe Media", noIndex: true, locale, hasSpanishEquivalent: false });
  return constructMetadata({ title: data.metaTitle, description: data.description, path: `/services/${slug}`, locale, hasSpanishEquivalent: false });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const data = servicePages[slug];
  if (!data || locale !== "en") notFound();
  return <DiscoverabilityPage data={data} path={`/en/services/${slug}`} />;
}
