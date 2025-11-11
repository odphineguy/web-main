
import React from 'react';
import { ChatMessage } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isLoading = false }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-indigo-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}>
        {isBot ? <BotIcon /> : <UserIcon />}
      </div>
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
            : 'bg-indigo-600 text-white rounded-tr-none'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }}></div>
        )}
      </div>
    </div>
  );
};

export default Message;
