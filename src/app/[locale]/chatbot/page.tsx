import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHAT_ENABLED } from "@/lib/flags";
import { EmberChatPanel } from "@/components/chatbot/EmberChat";

export const metadata: Metadata = {
  title: "AI Assistant | Abe Media",
  description:
    "Chat with the Abe Media assistant about AI call agents, lead pipeline automation, and dispatch software - in English or Spanish.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://abemedia.online/chatbot",
  },
};

export default function ChatbotPage() {
  // Gated by the same flag as the floating widget: while chat is off this
  // route 404s instead of serving a chat UI.
  if (!CHAT_ENABLED) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium tracking-[-0.02em] text-foreground mb-2">
            Abe Media Assistant
          </h1>
          <p className="text-muted-foreground">
            Ask about what we build, or book a free call - English or Spanish.
          </p>
        </div>
        <EmberChatPanel heightClass="h-[55vh]" />
      </div>
    </div>
  );
}
