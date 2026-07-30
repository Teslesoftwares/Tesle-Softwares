'use client';

import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-white dark:bg-gray-800/50 border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
            'transition-all duration-150 resize-y min-h-[80px]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            focusRing,
            error
              ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/30'
              : 'border-gray-300 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500/30',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
