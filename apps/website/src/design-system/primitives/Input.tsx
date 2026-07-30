'use client';

import { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
}

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs rounded-lg',
  md: 'px-3 py-2 text-sm rounded-lg',
  lg: 'px-4 py-3 text-base rounded-xl',
};

const iconSize = { sm: 14, md: 16, lg: 18 };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, iconRight, size = 'md', containerClassName, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={cn('space-y-1.5', containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ width: iconSize[size] }}>
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={actualType}
            className={cn(
              'w-full bg-white dark:bg-gray-800/50 border text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
              'transition-all duration-150',
              'read-only:opacity-60 read-only:cursor-not-allowed',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'autofill:bg-white dark:autofill:bg-gray-800',
              focusRing,
              error
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/30'
                : 'border-gray-300 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500/30',
              sizeStyles[size],
              icon ? 'pl-10' : '',
              (iconRight || isPassword) ? 'pr-10' : '',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={iconSize[size]} /> : <Eye size={iconSize[size]} />}
            </button>
          )}
          {iconRight && !isPassword && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>
        {error && <p id={`${props.id}-error`} className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${props.id}-hint`} className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
