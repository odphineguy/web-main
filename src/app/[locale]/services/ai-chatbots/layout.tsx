import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = constructMetadata({
    title: "Custom AI Chatbot Solutions | 24/7 Customer Support Automation",
    description: "Transform your customer service with custom AI chatbots. Answer questions instantly, qualify leads automatically, and provide 24/7 bilingual support. Get a free consultation today.",
    path: "/services/ai-chatbots",
    locale: locale,
  });

  return {
    ...baseMetadata,
    keywords: [
      "AI chatbot",
      "custom chatbot",
      "customer service automation",
      "lead capture chatbot",
      "AI legal chatbot",
      "healthcare chatbot",
      "real estate chatbot",
      "bilingual chatbot",
      "24/7 customer support",
      "chatbot for small business",
      "law firm lead capture",
      "attorney client intake automation",
    ],
  };
}

export default function AIChatbotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

