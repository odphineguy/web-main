import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Services — Web Development, AI Chatbots & Mobile Apps | Abe Media",
    description: "Comprehensive digital services for small businesses: bilingual web development, AI chatbots & agents, mobile app development, UI/UX design, custom solutions, and performance optimization. English & Spanish support.",
    path: "/services",
    locale: locale,
  });
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
