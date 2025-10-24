import ChatbotApp from "@/components/chatbot/ChatbotApp";

export const metadata = {
  title: "Chatbot | Abe Media",
  description: "Get help with Abe Media services and support",
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
