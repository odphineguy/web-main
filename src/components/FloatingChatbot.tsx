"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Minimize2, Send } from 'lucide-react';
import ChatWindow from './chatbot/ChatWindow';
import ConsultationForm from './ConsultationForm';
import { Message } from '../lib/types';
import { sendMessageToGemini, INITIAL_MESSAGE } from '../lib/geminiService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

// Quick action button types
type QuickAction = 'faq' | 'consultation' | 'services' | 'pricing';

const QUICK_ACTION_PROMPTS: Record<QuickAction, string> = {
  faq: "I have some questions about your services. Can you help me with frequently asked questions?",
  consultation: "I'd like to schedule a free consultation to discuss my project.",
  services: "Can you tell me about the services Abe Media offers?",
  pricing: "I'd like to learn about your pricing and packages.",
};

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const messagesRef = useRef<Message[]>(messages);
  const inputRef = useRef<HTMLInputElement>(null);

  // Convex mutations
  const createConversation = useMutation(api.conversations.createConversation);
  const addMessage = useMutation(api.conversations.addMessage);

  // Keep ref in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Generate session ID on mount
  const sessionIdRef = useRef<string>('');
  useEffect(() => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Initialize conversation when chat opens
  const initializeConversation = useCallback(async () => {
    if (!conversationId) {
      try {
        const id = await createConversation({
          sessionId: sessionIdRef.current,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        });
        setConversationId(id);
        return id;
      } catch (error) {
        console.error('Failed to create conversation:', error);
        return null;
      }
    }
    return conversationId;
  }, [conversationId, createConversation]);

  const handleSendMessage = useCallback(async (text: string, image?: { data: string; mimeType: string }) => {
    if (!text.trim()) return;
    
    setShowWelcome(false);
    const userMessage: Message = { role: 'user', text, image };
    
    // Initialize conversation if needed
    const convId = await initializeConversation();
    
    // Save user message to Convex
    if (convId) {
      try {
        await addMessage({
          conversationId: convId,
          role: 'user',
          text,
          hasImage: !!image,
        });
      } catch (error) {
        console.error('Failed to save message:', error);
      }
    }
    
    // Add user message and update ref immediately
    let messagesWithUser: Message[] = [];
    setMessages((prevMessages) => {
      messagesWithUser = [...prevMessages, userMessage];
      messagesRef.current = messagesWithUser;
      return messagesWithUser;
    });
    
    setIsLoading(true);
    setInput('');

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
        messagesWithUser,
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

      // Save model response to Convex
      if (convId) {
        try {
          await addMessage({
            conversationId: convId,
            role: 'model',
            text: finalResponseText,
          });
        } catch (error) {
          console.error('Failed to save model response:', error);
        }
      }

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
  }, [initializeConversation, addMessage]);

  const handleQuickAction = (action: QuickAction) => {
    if (action === 'consultation') {
      setIsConsultationOpen(true);
      setIsOpen(false);
    } else {
      handleSendMessage(QUICK_ACTION_PROMPTS[action]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
  };
  void toggleRecording; // Unused for now

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
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[580px] bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/30">
                  <Image 
                    src="/images/ashlee-profile.png" 
                    alt="Ashlee" 
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">Abe Media Support</div>
                  <div className="text-xs text-orange-100">Hi Visitor!</div>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Screen or Chat Window */}
          {showWelcome ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-gray-50 dark:bg-neutral-900">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-orange-100 dark:ring-orange-900/30 shadow-lg mb-6">
                <Image 
                  src="/images/ashlee-profile.png" 
                  alt="Ashlee" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Welcome Text */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How can we help?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                Choose an option below or start a conversation
              </p>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
                <button
                  onClick={() => handleQuickAction('faq')}
                  className="px-4 py-3 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all hover:shadow-md"
                >
                  FAQ
                </button>
                <button
                  onClick={() => handleQuickAction('consultation')}
                  className="px-4 py-3 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all hover:shadow-md"
                >
                  Consultation
                </button>
                <button
                  onClick={() => handleQuickAction('services')}
                  className="px-4 py-3 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all hover:shadow-md"
                >
                  Services
                </button>
                <button
                  onClick={() => handleQuickAction('pricing')}
                  className="px-4 py-3 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all hover:shadow-md opacity-60 cursor-not-allowed"
                  disabled
                  title="Coming soon"
                >
                  Pricing
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-gray-50 dark:bg-neutral-900">
              <ChatWindow messages={messages} isLoading={isLoading} />
            </div>
          )}

          {/* Chat Input */}
          <div className="border-t border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-950">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || isRecording}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="p-2 text-gray-400 hover:text-orange-500 disabled:text-gray-300 dark:disabled:text-gray-600 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Powered by abemedia */}
          <div className="text-center py-2 border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <p className="text-[10px] text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Powered by{' '}
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#F97316' }}>abe</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }} className="text-gray-600 dark:text-gray-300">media</span>
            </p>
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
