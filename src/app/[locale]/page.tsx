import HomePage from "@/components/HomePage";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Abe Media — Bilingual Web Development & AI Solutions for Small Business",
    description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses. Modern websites, mobile apps, and AI automation in English & Spanish. Get started with a free consultation.",
    locale: locale,
    path: "", // Homepage path
  });
}

export default function Page() {
  return <HomePage />;
}
