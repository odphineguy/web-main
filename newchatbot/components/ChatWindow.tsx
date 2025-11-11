import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import Message from './Message';
import { SendIcon } from './icons/SendIcon';
import { BotIcon } from './icons/BotIcon';
import { CloseIcon } from './icons/CloseIcon';


// In a production app, you would use the File API to upload this content once
// and then reference it in your prompts. For this demo, we'll hardcode it.
const SOP_CONTEXT = `
--- START OF DOCUMENT: Abe Media Services & Pricing SOP ---

## Company Overview
Abe Media is a digital marketing and content creation agency specializing in helping small to medium-sized businesses grow their online presence.

## Services Offered

### 1. Social Media Management
- **Description**: Full management of up to 3 social media platforms (Instagram, Facebook, Twitter). Includes content creation (15 posts/month), scheduling, community engagement, and monthly performance reports.
- **Price**: $500/month

### 2. Content Creation Package
- **Description**: Professional content creation. Includes 4 blog posts (up to 1000 words each) and 8 social media graphics per month. SEO optimization for blogs is included.
- **Price**: $750/month

### 3. SEO Audit & Strategy
- **Description**: A one-time comprehensive audit of your website's SEO performance. Includes a keyword research report, backlink analysis, on-page SEO recommendations, and a 6-month strategic roadmap.
- **Price**: $1,200 (one-time fee)

### 4. "The Works" All-in-One Package
- **Description**: Combines all services above: Social Media Management, Content Creation Package, and an initial SEO Audit & Strategy. Best value for businesses looking for a complete digital marketing solution.
- **Price**: $2,200/month (includes the one-time SEO audit fee spread over the first month)

## Policies
- **Contract Length**: All monthly services require a minimum 3-month commitment.
- **Payment**: Invoices are sent on the 1st of each month and are due by the 15th.
- **Cancellation**: A 30-day written notice is required for cancellation of services.

--- END OF DOCUMENT: Abe Media Services & Pricing SOP ---
`;


interface ChatWindowProps {
    onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      text: "Hello! I'm the Abe Media support assistant. How can I help you with our services, pricing, or policies today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const aiRef = useRef<GoogleGenAI | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initAI = () => {
      try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        aiRef.current = ai;
        setError(null);
      } catch (e) {
        console.error('Failed to initialize AI:', e);
        setError('Failed to initialize AI. Please check your API key.');
      }
    };
    initAI();
  }, []);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!aiRef.current) {
        throw new Error('AI is not initialized.');
      }

      const systemInstruction = `You are a helpful customer support chatbot for a company called "Abe Media". 
Your role is to answer questions about the business, products, services, and policies. 
You should also recommend products or services with rough price estimates when asked. 
Use the provided context from business documents AND the ongoing conversation history to give accurate, relevant, and contextual answers.
If the user's question cannot be answered from the provided documents or context, politely state that you don't have that information.
Be friendly, professional, and concise. Format your answers clearly, using markdown for lists or emphasis where appropriate.`;
      
      const historyForPrompt = messages
        .slice(1) // skip initial bot message
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Model'}: ${msg.text}`)
        .join('\n');

      const fullPrompt = `
      Please answer the user's question based ONLY on the following documents and the conversation history.
      
      CONTEXT DOCUMENTS:
      ${SOP_CONTEXT}
      
      CONVERSATION HISTORY:
      ${historyForPrompt}
      
      USER QUESTION:
      ${input}
      `;
      
      const response = await aiRef.current.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const botMessage: ChatMessage = {
        id: Date.now().toString() + '-bot',
        text: response.text,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e: any) {
      console.error('Gemini API error:', e);
      const errorMessage = "Sorry, I couldn't get a response. Please try again. Error: " + (e.message || 'Unknown error');
      setError(errorMessage);
      const botErrorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        text: errorMessage,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <div className="w-[440px] h-[70vh] max-h-[700px] flex flex-col bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between space-x-3 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500 rounded-full text-white">
              <BotIcon />
          </div>
          <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Abe Media Support</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Gemini</p>
          </div>
        </div>
        <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close chat"
        >
            <CloseIcon />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <Message message={{ id: 'loading', text: 'Thinking...', sender: 'bot' }} isLoading={true} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as any);
                }
            }}
            placeholder="Ask a question..."
            rows={1}
            className="flex-1 w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 dark:text-gray-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-indigo-600 text-white rounded-full disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;