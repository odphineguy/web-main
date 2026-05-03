import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Contact Abe Media — Free Bilingual Web & AI Consultation",
    description: "Book a free consultation for your bilingual website, AI chatbot, or custom platform. We'll outline scope, timeline, and cost so you can decide what's worth building.",
    path: "/contact",
    locale: locale,
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
