"use client";

import React, { useState, useCallback } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Message } from '../../lib/types';
import { sendMessageToGemini, INITIAL_MESSAGE } from '../../lib/geminiService';

const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string, image?: { data: string; mimeType: string }) => {
    const userMessage: Message = { role: 'user', text, image };
    setIsLoading(true);

    // Calculate the index synchronously before the state update
    const messagesWithUser = [...messages, userMessage];
    const tempModelMessageIndex = messagesWithUser.length; // Index where model message will be (after user message)

    // Add user message AND model placeholder in a single state update to ensure correct order
    setMessages([...messagesWithUser, { role: 'model', text: '' }]);

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
