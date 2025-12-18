import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Web Development, AI Chatbots & Mobile Apps | Abe Media",
  description: "Comprehensive digital services for small businesses: bilingual web development, AI chatbots & agents, mobile app development, UI/UX design, custom solutions, and performance optimization. English & Spanish support.",
  keywords: [
    "web development services",
    "AI chatbot development",
    "mobile app development",
    "UI/UX design",
    "bilingual website services",
    "custom software development",
    "small business web services",
    "performance optimization",
    "AI agents",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Services — Web Development, AI Chatbots & Mobile Apps | Abe Media",
    description: "Comprehensive digital services for small businesses: bilingual web development, AI chatbots & agents, mobile app development, UI/UX design, and custom solutions.",
    url: "https://abemedia.online/services",
  },
  twitter: {
    title: "Services — Web Development, AI Chatbots & Mobile Apps | Abe Media",
    description: "Comprehensive digital services for small businesses: bilingual web development, AI chatbots & agents, mobile app development, UI/UX design, and custom solutions.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

