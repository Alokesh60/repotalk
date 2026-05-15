import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={clsx(
            'w-full px-4 py-2.5 border rounded-lg transition-all duration-200',
            'bg-white dark:bg-secondary-800',
            'text-secondary-900 dark:text-secondary-100',
            'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500'
              : 'border-secondary-300 dark:border-secondary-600 focus:ring-primary-500 focus:border-primary-500',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            'disabled:bg-secondary-100 dark:disabled:bg-secondary-900 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={clsx(
            'mt-1.5 text-sm',
            error
              ? 'text-red-600 dark:text-red-400'
              : 'text-secondary-500 dark:text-secondary-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

// Made with Bob
