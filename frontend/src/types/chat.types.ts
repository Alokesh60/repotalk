export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasCode?: boolean;
  codeBlocks?: CodeBlock[];
}

export interface CodeBlock {
  language: string;
  code: string;
  fileName?: string;
  startLine?: number;
}

export interface ChatSession {
  id: string;
  repoUrl: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Made with Bob
