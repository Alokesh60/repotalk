import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color,
  text,
  className,
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 48,
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2
        size={sizes[size]}
        className={clsx('animate-spin', color || 'text-primary-600 dark:text-primary-400')}
      />
      {text && (
        <p className="text-sm text-secondary-600 dark:text-secondary-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Made with Bob
