import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { ChatIcon } from './components/icons/ChatIcon';
import { CloseIcon } from './components/icons/CloseIcon';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="font-sans">
      {/* This is a placeholder for the host website content */}
      <div className="bg-gray-100 dark:bg-gray-900 w-full h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Abe Media Website</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This is a placeholder for your actual website content. The chat widget will float over this page.
          </p>
        </div>
      </div>


      {/* Chat Widget Container */}
      <div className="fixed bottom-5 right-5 z-50">
        {/* Chat Window */}
        {isChatOpen && (
           <div className="transition-all duration-300 ease-in-out transform-gpu" style={{ transform: isChatOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isChatOpen ? 1 : 0 }}>
             <ChatWindow onClose={toggleChat} />
           </div>
        )}

        {/* Chat Bubble */}
        <button
          onClick={toggleChat}
          className="mt-4 ml-auto flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
        >
          {isChatOpen ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </div>
  );
};

export default App;
