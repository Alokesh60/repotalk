export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface ChatMessageRequest {
  repoUrl: string;
  message: string;
  sessionId?: string;
}

export interface ChatMessageResponse {
  answer: string;
  timestamp: string;
  sessionId: string;
  hasCode?: boolean;
  codeBlocks?: Array<{
    language: string;
    code: string;
    fileName?: string;
    lineNumbers?: {
      start: number;
      end: number;
    };
  }>;
  relatedFiles?: string[];
  confidence?: number;
}

// Made with Bob
