import React from 'react';
import { MessageSquare, Moon, Sun, ArrowLeft, Trash2, Github } from 'lucide-react';
import { Button } from '../common/Button';
import { formatRepoName } from '../../utils/formatters';
import { APP_NAME } from '../../utils/constants';

interface HeaderProps {
  currentRepo?: string;
  onBack?: () => void;
  onClearChat?: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRepo,
  onBack,
  onClearChat,
  theme,
  onThemeToggle,
}) => {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 font-medium text-sm"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <MessageSquare className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {APP_NAME}
                </h1>
                {currentRepo && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <Github size={12} />
                    <span>{formatRepoName(currentRepo)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {onClearChat && (
              <button
                onClick={onClearChat}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 text-slate-700 dark:text-slate-200 font-medium text-sm"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            
            <button
              onClick={onThemeToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 font-medium text-sm"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Made with Bob
