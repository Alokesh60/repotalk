export const APP_NAME = 'RepoTalk';
export const MAX_MESSAGE_LENGTH = 1000;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const EXAMPLE_QUESTIONS = [
  "Why is the login slow?",
  "How does authentication work?",
  "What database is being used?",
  "Explain the API architecture",
  "Where are the tests located?",
  "How is error handling implemented?",
  "What's the folder structure?",
  "How do I set up the development environment?",
];

export const STORAGE_KEYS = {
  CHAT_HISTORY: 'repotalk_chat_history',
  THEME: 'repotalk_theme',
  RECENT_REPOS: 'repotalk_recent_repos',
  CURRENT_SESSION: 'repotalk_current_session',
};

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
};

// Made with Bob
