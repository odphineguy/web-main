import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Services — Web Development, AI Chatbots & Mobile Apps | Abe Media",
    description: "Websites, AI chatbots, mobile apps, and custom platforms for small businesses. Built bilingual in English and Spanish from day one.",
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
