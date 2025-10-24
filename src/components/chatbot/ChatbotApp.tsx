"use client";

import React, { useState, useCallback } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Message } from '../../lib/types';
import { sendMessageToGemini } from '../../lib/geminiService';

const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I\'m here to help you with Abe Media. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = { role: 'user', text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Add a placeholder message for the model's streaming response
    const tempModelMessageIndex = messages.length + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'model', text: '' }, 
    ]);

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
        messages,
      );

      // After streaming is complete, update the placeholder with the final response
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
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 bg-primary text-primary-foreground text-center text-xl font-semibold shadow-md">
        Abe Media Support Chat
      </header>
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatbotApp;
