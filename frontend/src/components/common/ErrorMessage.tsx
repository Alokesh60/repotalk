import React from 'react';
import { AlertCircle, X, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onDismiss,
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
        'rounded-lg p-4 animate-slide-up',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-red-800 dark:text-red-200">{message}</p>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              leftIcon={<RefreshCw size={14} />}
              className="mt-2 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
            >
              Try Again
            </Button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// Made with Bob
