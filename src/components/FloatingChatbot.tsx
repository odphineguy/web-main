"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import ChatWindow from './chatbot/ChatWindow';
import ChatInput from './chatbot/ChatInput';
import ConsultationForm from './ConsultationForm';
import { Message } from '../lib/types';
import { sendMessageToGemini, INITIAL_MESSAGE } from '../lib/geminiService';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const messagesRef = useRef<Message[]>(messages);

  // Keep ref in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string, image?: { data: string; mimeType: string }) => {
    const userMessage: Message = { role: 'user', text, image };
    
    // Add user message and update ref immediately
    let messagesWithUser: Message[] = [];
    setMessages((prevMessages) => {
      messagesWithUser = [...prevMessages, userMessage];
      messagesRef.current = messagesWithUser;
      return messagesWithUser;
    });
    
    setIsLoading(true);

    // Calculate index where model message will be (after user message)
    const tempModelMessageIndex = messagesWithUser.length;
    
    // Add placeholder for model response
    setMessages((prevMessages) => {
      const updated = [...prevMessages, { role: 'model' as const, text: '' }];
      messagesRef.current = updated;
      return updated;
    });

    try {
      const finalResponseText = await sendMessageToGemini(
        text,
        (chunk) => {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const lastModelMessage = newMessages[tempModelMessageIndex];
            if (lastModelMessage && lastModelMessage.role === 'model') {
              lastModelMessage.text += chunk;
            }
            return newMessages;
          });
        },
        messagesWithUser, // Use messages with user message but without the empty model message
      );

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[tempModelMessageIndex] && newMessages[tempModelMessageIndex].role === 'model') {
          newMessages[tempModelMessageIndex] = { 
            role: 'model', 
            text: finalResponseText, 
          };
        }
        return newMessages;
      });

    } catch (error: unknown) {
      console.error("Error during chat:", error);
      let errorMessage = "Failed to get response. Please try again. If the issue persists, contact support@abemedia.online.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[tempModelMessageIndex]?.role === 'model') {
          newMessages[tempModelMessageIndex] = { role: 'error', text: `Error: ${errorMessage}` };
        } else {
          newMessages.push({ role: 'error', text: `Error: ${errorMessage}` });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          <Image 
            src="/images/ashlee-profile.png" 
            alt="Chat with Ashlee" 
            width={64}
            height={64}
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
                  <Image 
                    src="/images/ashlee-profile.png" 
                    alt="Ashlee" 
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">Ashlee</div>
                  <div className="text-xs text-orange-100">Media Specialist</div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setIsConsultationOpen(true);
                    setIsOpen(false);
                  }}
                  className="bg-white text-orange-600 hover:bg-orange-50 dark:bg-white dark:text-orange-600 dark:hover:bg-orange-50 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
                  aria-label="Book consultation"
                  title="Book Consultation"
                >
                  <span>Book Consultation</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border">
            <ChatInput onSendMessage={handleSendMessage} onVoiceToggle={toggleRecording} isRecording={isRecording} isLoading={isLoading} />
          </div>
        </div>
      )}

      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </>
  );
};

export default FloatingChatbot;
