import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Conversation, ConversationSummary } from '../types/conversation.types';
import type { Message } from '../types/chat.types';
import { useAuth } from './AuthContext';

interface ConversationContextType {
  conversations: ConversationSummary[];
  currentConversation: Conversation | null;
  createConversation: (repoUrl: string, repoName: string) => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  addMessage: (message: Message) => void;
  clearCurrentConversation: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Load conversations from localStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`repotalk_conversations_${user.id}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setConversations(parsed);
        } catch (error) {
          console.error('Failed to parse conversations:', error);
        }
      }
    } else {
      setConversations([]);
      setCurrentConversationId(null);
    }
  }, [user]);

  // Save conversations to localStorage
  useEffect(() => {
    if (user && conversations.length > 0) {
      localStorage.setItem(`repotalk_conversations_${user.id}`, JSON.stringify(conversations));
    }
  }, [conversations, user]);

  const createConversation = (repoUrl: string, repoName: string) => {
    if (!user) return;

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: `Chat about ${repoName}`,
      repoUrl,
      repoName,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  const addMessage = (message: Message) => {
    if (!currentConversationId) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            updatedAt: new Date(),
          };
        }
        return conv;
      })
    );
  };

  const clearCurrentConversation = () => {
    if (!currentConversationId) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [],
            updatedAt: new Date(),
          };
        }
        return conv;
      })
    );
  };

  const currentConversation = conversations.find((c) => c.id === currentConversationId) || null;

  const conversationSummaries: ConversationSummary[] = conversations.map((conv) => ({
    id: conv.id,
    title: conv.title,
    repoName: conv.repoName,
    lastMessage: conv.messages.length > 0
      ? conv.messages[conv.messages.length - 1].text.substring(0, 50) + '...'
      : 'No messages yet',
    updatedAt: conv.updatedAt,
  }));

  return (
    <ConversationContext.Provider
      value={{
        conversations: conversationSummaries,
        currentConversation,
        createConversation,
        selectConversation,
        deleteConversation,
        addMessage,
        clearCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversations must be used within a ConversationProvider');
  }
  return context;
};

// Made with Bob
