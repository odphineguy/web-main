"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import ChatWindow from './chatbot/ChatWindow';
import ChatInput from './chatbot/ChatInput';
import { Message } from '../lib/types';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I\'m here to help you with Abe Media. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = async (text: string, image?: { data: string; mimeType: string }) => {
    const userMessage: Message = { role: 'user', text, image };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const tempModelMessageIndex = messages.length + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'model', text: '' }, 
    ]);

    try {
      // For now, simulate a response
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

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden border-2 border-orange-500"
          aria-label="Open chat with Ashlee"
        >
          <img 
            src="/images/ashlee-profile.png" 
            alt="Chat with Ashlee" 
            className="w-full h-full object-cover"
          />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-[500px] bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-orange-500 dark:bg-orange-500 text-white p-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src="/images/ashlee-profile.png" 
                    alt="Ashlee" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">Ashlee</div>
                  <div className="text-xs text-orange-100">Abe Media Support Specialist</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border">
            <ChatInput onSendMessage={handleSendMessage} onVoiceToggle={toggleRecording} isRecording={isRecording} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
