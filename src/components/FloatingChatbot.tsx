"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Minimize2 } from 'lucide-react';
import ChatWindow from './chatbot/ChatWindow';
import ConsultationForm from './ConsultationForm';
import { Message } from '../lib/types';
import { sendMessageToGemini, INITIAL_MESSAGE } from '../lib/geminiService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

// Quick action button types
type QuickAction = 'faq' | 'consultation' | 'services' | 'pricing';

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
    
    setIsLoading(true);
    setInput('');

    // Calculate the index synchronously before the state update
    // messagesRef.current is kept in sync with messages state
    const currentMessages = messagesRef.current;
    const messagesWithUser = [...currentMessages, userMessage];
    const tempModelMessageIndex = messagesWithUser.length; // Index where model message will be (after user message)
    
    // Add user message AND model placeholder in a single state update to ensure correct order
    setMessages(() => {
      const updated = [...messagesWithUser, { role: 'model' as const, text: '' }];
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
      let errorMessage = "Failed to get response. Please try again. If the issue persists, contact abe@abemedia.online.";
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
    setIsOpen(false); // Close the chat widget

    switch (action) {
      case 'faq':
        // Navigate to home page and scroll to FAQ section
        if (window.location.pathname === '/') {
          // Already on home page, just scroll
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Navigate to home page with hash
          window.location.href = '/#faq';
        }
        break;
      case 'consultation':
        // Open consultation popup
        setIsConsultationOpen(true);
        break;
      case 'services':
        // Navigate to services page
        window.location.href = '/services';
        break;
      case 'pricing':
        // Navigate to pricing page
        window.location.href = '/pricing';
        break;
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
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(249,115,22,0.35),0_0_0_3px_rgba(249,115,22,0.1)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.45),0_0_0_4px_rgba(249,115,22,0.15)] transition-all duration-300 hover:scale-110 overflow-hidden border-2 border-orange-500"
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
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[580px] bg-white dark:bg-neutral-950 border border-orange-200/50 dark:border-neutral-800 rounded-2xl shadow-[0_25px_60px_-12px_rgba(249,115,22,0.25),0_0_0_1px_rgba(249,115,22,0.05)] dark:shadow-[0_25px_60px_-12px_rgba(249,115,22,0.15)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-slate-950 text-white px-4 py-3">
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
            <div className="flex-1 flex flex-col px-6 py-6 bg-gradient-to-b from-white via-orange-50/30 to-orange-50/50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
              {/* Top Section - Avatar and Welcome Text */}
              <div className="flex flex-col items-center pt-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-orange-200 dark:ring-orange-900/30 shadow-[0_0_25px_rgba(249,115,22,0.3),0_8px_20px_rgba(249,115,22,0.15)] dark:shadow-[0_0_25px_rgba(249,115,22,0.2)] mb-6">
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
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Choose an option below or start a conversation
                </p>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Quick Action Buttons - Near bottom */}
              <div className="grid grid-cols-2 gap-3 w-full mb-4">
                <button
                  onClick={() => handleQuickAction('faq')}
                  className="px-4 py-3 rounded-full border border-orange-200/60 dark:border-orange-500/25 bg-white/80 dark:bg-white/5 text-slate-800 dark:text-orange-100 text-sm font-medium hover:bg-white hover:border-orange-300 dark:hover:border-orange-400 dark:hover:text-orange-300 dark:hover:bg-white/10 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.12),0_1px_3px_rgba(249,115,22,0.08)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2),0_2px_6px_rgba(249,115,22,0.1)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.15)]"
                >
                  FAQ
                </button>
                <button
                  onClick={() => handleQuickAction('consultation')}
                  className="px-4 py-3 rounded-full border border-orange-200/60 dark:border-orange-500/25 bg-white/80 dark:bg-white/5 text-slate-800 dark:text-orange-100 text-sm font-medium hover:bg-white hover:border-orange-300 dark:hover:border-orange-400 dark:hover:text-orange-300 dark:hover:bg-white/10 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.12),0_1px_3px_rgba(249,115,22,0.08)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2),0_2px_6px_rgba(249,115,22,0.1)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.15)]"
                >
                  Consultation
                </button>
                <button
                  onClick={() => handleQuickAction('services')}
                  className="px-4 py-3 rounded-full border border-orange-200/60 dark:border-orange-500/25 bg-white/80 dark:bg-white/5 text-slate-800 dark:text-orange-100 text-sm font-medium hover:bg-white hover:border-orange-300 dark:hover:border-orange-400 dark:hover:text-orange-300 dark:hover:bg-white/10 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.12),0_1px_3px_rgba(249,115,22,0.08)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2),0_2px_6px_rgba(249,115,22,0.1)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.15)]"
                >
                  Services
                </button>
                <button
                  onClick={() => handleQuickAction('pricing')}
                  className="px-4 py-3 rounded-full border border-orange-200/60 dark:border-orange-500/25 bg-white/80 dark:bg-white/5 text-slate-800 dark:text-orange-100 text-sm font-medium hover:bg-white hover:border-orange-300 dark:hover:border-orange-400 dark:hover:text-orange-300 dark:hover:bg-white/10 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.12),0_1px_3px_rgba(249,115,22,0.08)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2),0_2px_6px_rgba(249,115,22,0.1)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.15)]"
                >
                  Pricing
                </button>
              </div>

              {/* Floating Input Box */}
              <div className="flex items-center gap-2 bg-white/90 dark:bg-white/5 border border-orange-200/50 dark:border-orange-500/25 rounded-2xl px-4 py-2 shadow-[0_4px_20px_rgba(249,115,22,0.1),0_0_0_1px_rgba(249,115,22,0.03)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.12)] transition-all focus-within:shadow-[0_8px_30px_rgba(249,115,22,0.15),0_0_0_2px_rgba(249,115,22,0.1)] dark:focus-within:shadow-[0_18px_45px_rgba(249,115,22,0.2)]">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent text-sm text-slate-800 dark:text-orange-50 placeholder-slate-500 dark:placeholder-orange-200/50 outline-none"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || isRecording}
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-700 text-white border border-orange-400/50 dark:border-transparent shadow-[0_4px_15px_rgba(249,115,22,0.3),0_1px_2px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4),0_2px_4px_rgba(249,115,22,0.25)] dark:shadow-[0_10px_25px_rgba(249,115,22,0.25)] hover:brightness-105 dark:hover:brightness-110 disabled:opacity-50 transition-all"
                  aria-label="Send message"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Send
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80 group-hover:translate-x-0.5 transition-transform"></span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-gradient-to-b from-white to-orange-50/30 dark:from-neutral-900 dark:to-neutral-900">
              <ChatWindow messages={messages} isLoading={isLoading} />
            </div>
          )}

          {/* Chat Input - Only shown when not in welcome state */}
          {!showWelcome && (
            <div className="p-3 bg-gradient-to-t from-orange-50/50 to-white dark:from-neutral-900 dark:to-neutral-900">
              <div className="flex items-center gap-2 bg-white/90 dark:bg-white/5 border border-orange-200/50 dark:border-orange-500/25 rounded-2xl px-4 py-2 shadow-[0_4px_20px_rgba(249,115,22,0.1),0_0_0_1px_rgba(249,115,22,0.03)] dark:shadow-[0_18px_45px_rgba(249,115,22,0.12)] transition-all focus-within:shadow-[0_8px_30px_rgba(249,115,22,0.15),0_0_0_2px_rgba(249,115,22,0.1)] dark:focus-within:shadow-[0_18px_45px_rgba(249,115,22,0.2)]">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent text-sm text-slate-800 dark:text-orange-50 placeholder-slate-500 dark:placeholder-orange-200/50 outline-none"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || isRecording}
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-700 text-white border border-orange-400/50 dark:border-transparent shadow-[0_4px_15px_rgba(249,115,22,0.3),0_1px_2px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4),0_2px_4px_rgba(249,115,22,0.25)] dark:shadow-[0_10px_25px_rgba(249,115,22,0.25)] hover:brightness-105 dark:hover:brightness-110 disabled:opacity-50 transition-all"
                  aria-label="Send message"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Send
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80 group-hover:translate-x-0.5 transition-transform"></span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Powered by abemedia */}
          <div className="text-center py-2 bg-gradient-to-t from-orange-50/30 to-white dark:from-neutral-900 dark:to-neutral-900">
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
