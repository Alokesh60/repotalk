import React from 'react';

interface TypingIndicatorProps {
  show: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-secondary-100 dark:bg-secondary-800 rounded-2xl rounded-bl-sm w-fit animate-fade-in">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full animate-typing" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full animate-typing" style={{ animationDelay: '200ms' }} />
        <span className="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full animate-typing" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-xs text-secondary-500 dark:text-secondary-400">AI is thinking...</span>
    </div>
  );
};

// Made with Bob
