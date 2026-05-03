import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Pricing — Bilingual Websites, Chatbots & Custom Apps | Abe Media",
    description: "Transparent pricing for bilingual websites, AI chatbots, and custom platforms. Starter, Professional, and Enterprise tiers built for small businesses.",
    path: "/pricing",
    locale: locale,
  });
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
