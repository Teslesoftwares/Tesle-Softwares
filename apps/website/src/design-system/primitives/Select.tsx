'use client';

import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full appearance-none bg-white dark:bg-gray-800/50 border rounded-lg pl-3 pr-10 py-2 text-sm text-gray-900 dark:text-gray-100',
              'transition-all duration-150 cursor-pointer',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              focusRing,
              error
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/30'
                : 'border-gray-300 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500/30',
              !props.value && 'text-gray-400',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
