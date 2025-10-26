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
    <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-black">
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">Chat started</div>
      
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          {message.role === 'user' ? (
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-orange-500 text-white p-3 rounded-lg text-sm">
                {message.image && (
                  <img
                    src={`data:${message.image.mimeType};base64,${message.image.data}`}
                    alt="Attached image"
                    className="max-w-full max-h-32 object-contain rounded-md mb-2"
                  />
                )}
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mt-1">
                <img 
                  src="/images/ashlee-profile.png" 
                  alt="Ashlee" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ashlee</div>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg text-sm max-w-[80%] relative">
                  <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100 dark:border-r-gray-800"></div>
                  {message.image && (
                    <img
                      src={`data:${message.image.mimeType};base64,${message.image.data}`}
                      alt="Generated image"
                      className="max-w-full max-h-32 object-contain rounded-md mb-2"
                    />
                  )}
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.isAudioPlaying && (
                    <div className="absolute -bottom-1 -right-1 animate-pulse">
                      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9.383 3.017C9.614 2.08 10.96 2.08 11.192 3.017l.791 3.165a1 1 0 00.732.607l3.298.824c.937.234.937 1.68 0 1.914l-3.298.824a1 1 0 00-.732.607l-.791 3.165c-.231.937-1.577.937-1.809 0l-.791-3.165a1 1 0 00-.732-.607l-3.298-.824c-.937-.234-.937-1.68 0-1.914l3.298-.824a1 1 0 00.732-.607l.791-3.165z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
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
              src="/images/ashlee-profile.png" 
              alt="Ashlee" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ashlee</div>
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg text-sm max-w-[80%] relative">
              <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-100 dark:border-r-gray-800"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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