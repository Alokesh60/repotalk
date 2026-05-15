import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../common/Button';
import { clsx } from 'clsx';
import { validateMessage } from '../../utils/validators';
import { MAX_MESSAGE_LENGTH, EXAMPLE_QUESTIONS } from '../../utils/constants';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Ask anything about this repository...',
}) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showExamples, setShowExamples] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    const validation = validateMessage(message, MAX_MESSAGE_LENGTH);
    
    if (!validation.valid) {
      setError(validation.error || '');
      return;
    }

    onSend(message.trim());
    setMessage('');
    setError('');
    setShowExamples(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
    setShowExamples(false);
    textareaRef.current?.focus();
  };

  const charCount = message.length;
  const showCharCount = charCount > MAX_MESSAGE_LENGTH * 0.8;
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH;

  return (
    <div className="p-4">
      {/* Example Questions */}
      {showExamples && message.length === 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.slice(0, 4).map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="group text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 flex items-center gap-2 border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-purple-500 hover:shadow-md transform hover:scale-105"
            >
              <Sparkles size={14} className="text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">{example}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Input Area */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={clsx(
                'w-full px-5 py-4 pr-12 rounded-2xl resize-none',
                'bg-white dark:bg-slate-800',
                'border-2 transition-all duration-200',
                error || isOverLimit
                  ? 'border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-purple-500',
                'text-slate-900 dark:text-slate-100 text-base',
                'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                'focus:outline-none focus:ring-4',
                error || isOverLimit
                  ? 'focus:ring-red-100 dark:focus:ring-red-900/30'
                  : 'focus:ring-blue-100 dark:focus:ring-purple-900/30',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'shadow-sm hover:shadow-md focus:shadow-lg'
              )}
            />
            
            {/* Character Count Badge */}
            {showCharCount && (
              <div className={clsx(
                'absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-medium',
                isOverLimit
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              )}>
                {charCount}/{MAX_MESSAGE_LENGTH}
              </div>
            )}
          </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2 px-1 flex items-center gap-1">
              <span className="font-medium">⚠️</span>
              {error}
            </p>
          )}
        </div>
        
        {/* Send Button */}
        <Button
          onClick={handleSubmit}
          disabled={disabled || !message.trim() || isOverLimit}
          variant="primary"
          size="lg"
          className={clsx(
            'h-14 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200',
            'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
            'disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600',
            'transform hover:scale-105 active:scale-95'
          )}
        >
          {disabled ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </Button>
      </div>
      
      {/* Helper Text */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 px-1 flex items-center gap-2">
        <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono text-xs">
          Enter
        </kbd>
        <span>to send</span>
        <span className="text-slate-400 dark:text-slate-500">•</span>
        <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono text-xs">
          Shift + Enter
        </kbd>
        <span>for new line</span>
      </p>
    </div>
  );
};

// Made with Bob
