import { STORAGE_KEYS } from '@/utils/constants';
import type { ChatSession } from '@/types/chat.types';

class StorageService {
  saveChatHistory(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  getChatHistory(): ChatSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!data) return [];
      
      const sessions = JSON.parse(data);
      // Convert date strings back to Date objects
      return sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch (error) {
      console.error('Failed to load chat history:', error);
      return [];
    }
  }

  saveRecentRepo(repoUrl: string): void {
    try {
      const recent = this.getRecentRepos();
      const updated = [repoUrl, ...recent.filter(url => url !== repoUrl)].slice(0, 5);
      localStorage.setItem(STORAGE_KEYS.RECENT_REPOS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent repo:', error);
    }
  }

  getRecentRepos(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_REPOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load recent repos:', error);
      return [];
    }
  }

  saveTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  getTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | null;
    if (saved) return saved;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  saveCurrentSession(sessionId: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, sessionId);
  }

  getCurrentSession(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
  }

  clearCurrentSession(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  }
}

export const storageService = new StorageService();

// Made with Bob
