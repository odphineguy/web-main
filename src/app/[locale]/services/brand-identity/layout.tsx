import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = constructMetadata({
    title: "Brand Identity Packages | Professional Logo & Corporate Design",
    description: "Professional brand identity design services. Get a unique logo, business cards, letterhead, and complete corporate identity packages. Start with a 30% deposit.",
    path: "/services/brand-identity",
    locale: locale,
  });

  return {
    ...baseMetadata,
    keywords: [
      "brand identity",
      "logo design",
      "corporate identity",
      "business card design",
      "letterhead design",
      "stationery design",
      "brand style guide",
      "professional logo",
      "business branding",
      "visual identity",
      "logo packages",
      "small business logo",
    ],
  };
}

export default function BrandIdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
