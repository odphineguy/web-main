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
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 dark:bg-neutral-900 min-h-0" style={{ maxHeight: '100%' }}>
      {messages.map((message, index) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        
        return (
          <div key={index} className="mb-3">
            {message.role === 'user' ? (
              <div className="flex justify-end">
                <div className="max-w-[80%]">
                  <div className="bg-orange-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm shadow-sm">
                    {message.image && (
                      <img
                        src={`data:${message.image.mimeType};base64,${message.image.data}`}
                        alt="Attached image"
                        className="max-w-full max-h-32 object-contain rounded-lg mb-2"
                      />
                    )}
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 text-right mt-1 px-1">
                    {timestamp}
                  </div>
                </div>
              </div>
            ) : message.role === 'error' ? (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-red-100 dark:bg-red-900/30 flex-shrink-0 flex items-center justify-center">
                  <span className="text-red-500 text-xs">!</span>
                </div>
                <div className="flex-1">
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-[85%] border border-red-100 dark:border-red-800">
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-orange-100 dark:bg-orange-900/30 flex-shrink-0 ring-1 ring-orange-200 dark:ring-orange-800">
                  <img 
                    src="/images/ashlee-profile.png" 
                    alt="Ashlee" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-[85%] shadow-sm border border-gray-100 dark:border-neutral-700">
                    {message.image && (
                      <img
                        src={`data:${message.image.mimeType};base64,${message.image.data}`}
                        alt="Generated image"
                        className="max-w-full max-h-32 object-contain rounded-lg mb-2"
                      />
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    {message.isAudioPlaying && (
                      <div className="absolute -bottom-1 -right-1 animate-pulse">
                        <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9.383 3.017C9.614 2.08 10.96 2.08 11.192 3.017l.791 3.165a1 1 0 00.732.607l3.298.824c.937.234.937 1.68 0 1.914l-3.298.824a1 1 0 00-.732.607l-.791 3.165c-.231.937-1.577.937-1.809 0l-.791-3.165a1 1 0 00-.732-.607l-3.298-.824c-.937-.234-.937-1.68 0-1.914l3.298-.824a1 1 0 00.732-.607l.791-3.165z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                    {timestamp}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {isLoading && (
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-orange-100 dark:bg-orange-900/30 flex-shrink-0 ring-1 ring-orange-200 dark:ring-orange-800">
            <img 
              src="/images/ashlee-profile.png" 
              alt="Ashlee" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-2xl rounded-bl-md text-sm shadow-sm border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
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
