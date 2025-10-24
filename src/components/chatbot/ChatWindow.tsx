import React, { useEffect, useRef } from 'react';
import { Message } from '../../lib/types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-2 overflow-y-auto bg-muted/20">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] p-2 rounded-lg text-sm ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : message.role === 'model'
                ? 'bg-card text-card-foreground border border-border'
                : 'bg-destructive/10 text-destructive border border-destructive/20' // Error message style
            }`}
          >
            <p className="whitespace-pre-wrap">{message.text}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="mb-2 flex justify-start">
          <div className="max-w-[80%] p-2 rounded-lg bg-card text-card-foreground border border-border animate-pulse text-sm">
            <p>Thinking...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;