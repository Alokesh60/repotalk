import { Message } from './chat.types';

export interface Conversation {
  id: string;
  title: string;
  repoUrl: string;
  repoName: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  repoName: string;
  lastMessage: string;
  updatedAt: Date;
}

// Made with Bob
