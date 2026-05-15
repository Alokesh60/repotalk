import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiService } from '@/services/api';
import { storageService } from '@/services/storage';
import type { Message } from '@/types/chat.types';

interface ChatContextType {
  currentRepo: string | null;
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  setRepo: (url: string) => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRepo, setCurrentRepo] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const setRepo = useCallback((url: string) => {
    setCurrentRepo(url);
    setMessages([]);
    setError(null);
    storageService.saveRecentRepo(url);
    storageService.saveCurrentSession(sessionId);
  }, [sessionId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!currentRepo) {
      setError('No repository selected');
      return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    // DEMO MODE - Simulate AI response
    setTimeout(() => {
      const demoResponses = [
        {
          text: `Great question! Based on my analysis of the repository, here's what I found:\n\nThe codebase uses **React 18** with **TypeScript** for type safety. The main architecture follows a component-based structure with:\n\n- **Components**: Reusable UI elements\n- **Hooks**: Custom React hooks for state management\n- **Services**: API integration layer\n- **Utils**: Helper functions and validators\n\nHere's an example of the main component structure:\n\n\`\`\`typescript\nfunction App() {\n  const [state, setState] = useState();\n  \n  return (\n    <div className="app">\n      <Header />\n      <MainContent />\n      <Footer />\n    </div>\n  );\n}\n\`\`\`\n\nThe project uses **Vite** as the build tool for fast development and **Tailwind CSS** for styling.`,
          hasCode: true,
        },
        {
          text: `I've analyzed the repository structure. Here are the key findings:\n\n**Technology Stack:**\n- Frontend: React + TypeScript\n- Styling: Tailwind CSS\n- Build Tool: Vite\n- State Management: React Context API\n\n**Project Structure:**\n\`\`\`\nsrc/\n├── components/     # UI components\n├── context/        # State management\n├── services/       # API calls\n├── types/          # TypeScript types\n└── utils/          # Helper functions\n\`\`\`\n\nThe codebase follows modern React best practices with functional components and hooks.`,
          hasCode: true,
        },
        {
          text: `Based on the repository analysis:\n\nThe application implements a **clean architecture** with clear separation of concerns. Key features include:\n\n✅ **Type Safety**: Full TypeScript coverage\n✅ **Component Reusability**: Modular component design\n✅ **State Management**: Context API for global state\n✅ **API Integration**: Axios-based service layer\n✅ **Responsive Design**: Mobile-first approach\n✅ **Dark Mode**: Theme switching support\n\nThe code quality is excellent with proper error handling and loading states throughout the application.`,
          hasCode: false,
        },
      ];

      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];

      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        text: randomResponse.text,
        isUser: false,
        timestamp: new Date(),
        hasCode: randomResponse.hasCode,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }, 2000); // 2 second delay to simulate AI thinking

    /* Uncomment when backend is ready:
    try {
      const response = await apiService.sendMessage({
        repoUrl: currentRepo,
        message: text,
        sessionId,
      });

      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        text: response.answer,
        isUser: false,
        timestamp: new Date(response.timestamp),
        hasCode: response.hasCode,
        codeBlocks: response.codeBlocks?.map(block => ({
          language: block.language,
          code: block.code,
          fileName: block.fileName,
        })),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      const errorMsg: Message = {
        id: `msg_${Date.now()}_error`,
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
    */
  }, [currentRepo, sessionId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentRepo,
        messages,
        isLoading,
        isTyping,
        error,
        setRepo,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Made with Bob
