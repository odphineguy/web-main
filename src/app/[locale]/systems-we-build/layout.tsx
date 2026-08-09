import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Systems We Build — Custom Operations Software | Abe Media",
    description: "Custom operations software built for growing service businesses. Saguaro Transport: complete operations management for trucking and logistics companies with fleet tracking, CRM, accounting, and HR tools.",
    path: "/systems-we-build",
    locale: locale,
    hasSpanishEquivalent: false,
    noIndex: locale === "es",
  });
}

export default function SystemsWeBuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
