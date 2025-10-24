"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatWindow from './chatbot/ChatWindow';
import ChatInput from './chatbot/ChatInput';
import { Message } from '../lib/types';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I\'m here to help you with Abe Media. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Add a placeholder message for the model's response
    const tempModelMessageIndex = messages.length + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'model', text: '' }, 
    ]);

    try {
      // For now, simulate a response since the API key needs investigation
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          if (newMessages[tempModelMessageIndex] && newMessages[tempModelMessageIndex].role === 'model') {
            newMessages[tempModelMessageIndex] = { 
              role: 'model', 
              text: "I'm here to help with Abe Media! We offer website development, logo design, and marketing services. For immediate assistance, please contact us at support@abemedia.online or visit our contact page."
            };
          }
          return newMessages;
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error during chat:", error);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[tempModelMessageIndex]?.role === 'model') {
          newMessages[tempModelMessageIndex] = { 
            role: 'error', 
            text: "I'm having trouble connecting right now. Please contact us directly at support@abemedia.online for immediate assistance."
          };
        }
        return newMessages;
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-background border border-border rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Abe Media Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
