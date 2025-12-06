import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom AI Chatbot Solutions | 24/7 Customer Support Automation",
  description:
    "Transform your customer service with custom AI chatbots. Answer questions instantly, qualify leads automatically, and provide 24/7 bilingual support. Industry-specific solutions for law firms, healthcare, real estate & more.",
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
  openGraph: {
    title: "Custom AI Chatbot Solutions | 24/7 Customer Support",
    description:
      "Transform your customer service with custom AI chatbots designed for your business. Answer questions instantly and qualify leads automatically.",
    url: "https://abemedia.online/services/ai-chatbots",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom AI Chatbot Solutions",
    description:
      "24/7 customer support automation with custom AI chatbots. Industry-specific solutions for law firms, healthcare, real estate & more.",
  },
  alternates: {
    canonical: "https://abemedia.online/services/ai-chatbots",
  },
};

export default function AIChatbotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

