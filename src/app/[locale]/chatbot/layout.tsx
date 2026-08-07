import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "Abe Media Chatbot Demo",
    description: "Interactive Abe Media chatbot demonstration.",
    path: "/chatbot",
    locale,
    hasSpanishEquivalent: false,
    noIndex: true,
  });
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
