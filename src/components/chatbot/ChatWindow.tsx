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
    <div className="flex-1 p-4 overflow-y-auto bg-white">
      <div className="text-center text-gray-500 text-sm mb-4">Chat started</div>
      
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          {message.role === 'user' ? (
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-blue-600 text-white p-3 rounded-lg text-sm">
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mt-1">
                <img 
                  src="/images/ashlee-profile.svg" 
                  alt="Ashlee" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Ashlee</div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm max-w-[80%] relative">
                  <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100"></div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mt-1">
            <img 
              src="/images/ashlee-profile.svg" 
              alt="Ashlee" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Ashlee</div>
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm max-w-[80%] relative">
              <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;