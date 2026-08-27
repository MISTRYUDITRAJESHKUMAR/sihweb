import React, { useState, useRef, useEffect } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

const InterviewChat = ({ messages = [], onSend, onSendMessage, loading = false, disabled = false }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const isLoading = loading || disabled;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      if (onSendMessage) onSendMessage(input);
      if (onSend) onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[560px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white">
        <h3 className="font-bold text-lg">AI Mock Interviewer</h3>
        <p className="text-indigo-100 text-xs mt-0.5">Answer the questions as if you were in a real technical or behavioral interview.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user' || msg.sender === 'user';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                isUser 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text || msg.content}</p>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-900 text-gray-500 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your response here..."
            className="flex-1 bg-transparent outline-none px-3 text-sm text-gray-800 dark:text-gray-100 disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
          >
            <HiPaperAirplane className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewChat;
