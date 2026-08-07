import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Software Portfolio & Case Studies — Abe Media",
    description: "Explore operational software, AI automation, mobile apps, and selected web projects built by Abe Media for service businesses.",
    path: "/portfolio",
    locale: locale,
    hasSpanishEquivalent: false,
    noIndex: locale === "es",
  });
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
