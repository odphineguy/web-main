
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter
      handleSend();
    }
  };

  return (
    <div className="p-2 bg-muted/20 border-t border-border">
      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 p-2 border border-input rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-muted text-sm min-h-[32px] max-h-[80px]"
          rows={1}
          placeholder={isLoading ? "Please wait..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[32px]"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
