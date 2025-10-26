
import React, { useState, useRef, useCallback } from 'react';
import { Send, Paperclip as PaperclipIcon, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, image?: { data: string; mimeType: string }) => void;
  onVoiceToggle: () => void;
  isRecording: boolean;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onVoiceToggle, isRecording, isLoading }) => {
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((input.trim() || attachedImage) && !isLoading) {
      onSendMessage(input.trim(), attachedImage || undefined);
      setInput('');
      setAttachedImage(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1];
          setAttachedImage({ data: base64Data, mimeType: file.type });
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleClearImage = () => {
    setAttachedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
      {attachedImage && (
        <div className="relative inline-block mb-2 mr-2">
          <img
            src={`data:${attachedImage.mimeType};base64,${attachedImage.data}`}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-md border border-gray-300"
          />
          <button
            onClick={handleClearImage}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[40px]"
          aria-label="Attach image"
        >
          <PaperclipIcon className="h-5 w-5" />
        </button>
        <textarea
          className="flex-1 p-3 border border-gray-300 bg-white dark:bg-gray-800 dark:text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 text-sm min-h-[40px] max-h-[100px]"
          rows={1}
          placeholder={isRecording ? "Listening..." : ""}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || isRecording}
        />
        <button
          className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[40px]"
          onClick={handleSend}
          disabled={isLoading || (!input.trim() && !attachedImage)}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
