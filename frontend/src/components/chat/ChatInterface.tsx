import React, { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { Bot, Sparkles, X, Trash2 } from 'lucide-react';
import { useConversations } from '../../context/ConversationContext';
import type { Conversation } from '../../types/conversation.types';
import type { Message } from '../../types/chat.types';

interface ChatInterfaceProps {
  conversation: Conversation;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversation }) => {
  const { addMessage, clearCurrentConversation } = useConversations();
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hide toast after 3 seconds
  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [conversation.id]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        text: `This is a demo response about ${conversation.repoName}. In production, this would be an actual AI analysis of the repository.\n\n**Code Structure:**\n\`\`\`typescript\nsrc/\n  ├── components/\n  ├── context/\n  ├── types/\n  └── utils/\n\`\`\`\n\nThe codebase follows modern React best practices with TypeScript.`,
        isUser: false,
        timestamp: new Date(),
      };
      addMessage(aiMessage);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 px-6 py-3 flex items-center gap-3 min-w-[300px]">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-slate-400">
                Analyzing {conversation.repoName}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header with repo info */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{conversation.title}</h2>
            <p className="text-sm text-slate-400">{conversation.repoName}</p>
          </div>
          <button
            onClick={clearCurrentConversation}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-700 hover:bg-red-900/30 hover:text-red-400 transition-all duration-200 text-slate-300 font-medium text-sm"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 pt-4 max-w-5xl mx-auto w-full">
          <ErrorMessage message={error} />
        </div>
      )}
      
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {conversation.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-5 rounded-2xl shadow-xl">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Start Your Conversation
              </h3>
              <p className="text-slate-400 mb-6">
                Ask me anything about {conversation.repoName} in plain English
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-left">
                {[
                  { q: "What does this project do?", icon: "🎯" },
                  { q: "How is the code structured?", icon: "🏗️" },
                  { q: "Where is the authentication logic?", icon: "🔐" },
                  { q: "What are the main dependencies?", icon: "📦" },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(item.q)}
                    className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium text-slate-200">
                        {item.q}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <MessageList messages={conversation.messages} isTyping={isTyping} />
        )}
      </div>
      
      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-t border-slate-700">
        <div className="max-w-5xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

// Made with Bob
