import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageSquare } from 'lucide-react';
import type { Message } from '../../types/chat.types';

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Start a Conversation
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Ask any question about this repository. I'll analyze the code and provide clear answers in plain English.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isUser={message.isUser} />
        ))}
        {isTyping && <TypingIndicator show={isTyping} />}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

// Made with Bob
