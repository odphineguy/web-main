import ChatbotApp from "@/components/chatbot/ChatbotApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot — Get Help & Support | Abe Media",
  description: "Chat with our AI assistant to learn about Abe Media services, pricing, bilingual web development, AI chatbot solutions, and how we can help your small business.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://abemedia.online/chatbot",
  },
};

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto h-screen">
        <div className="h-full flex flex-col">
          <div className="p-6 text-center border-b border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Abe Media Support
            </h1>
            <p className="text-muted-foreground">
              Ask me anything about our services, pricing, or how we can help you!
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatbotApp />
          </div>
        </div>
      </div>
    </div>
  );
}
