
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
    <div className="p-4 bg-muted/30 border-t border-border">
      <div className="flex items-center gap-3">
        <textarea
          className="flex-1 p-3 border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted text-base min-h-[44px]"
          rows={1}
          placeholder={isLoading ? "Please wait..." : "Enter your question"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
