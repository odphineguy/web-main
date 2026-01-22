import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Custom Platforms — Business Operations Software | Abe Media",
    description: "Purpose-built software platforms for growing businesses. Saguaro Transport: complete operations management for trucking and logistics companies with fleet tracking, CRM, accounting, and HR tools.",
    path: "/platforms",
    locale: locale,
  });
}

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
