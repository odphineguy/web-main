import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Portfolio — Our Work & Projects | Abe Media",
    description: "Explore our portfolio of innovative web development projects, mobile apps, and AI chatbot solutions. See how we help small businesses with bilingual websites and custom digital tools.",
    path: "/portfolio",
    locale: locale,
  });
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
