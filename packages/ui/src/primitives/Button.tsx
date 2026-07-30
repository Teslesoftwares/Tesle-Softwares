'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';
import { Loader } from './Loader';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size' | 'type' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-sm shadow-amber-500/20',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600',
  outline: 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800',
  ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20',
  link: 'text-amber-600 dark:text-amber-400 hover:underline underline-offset-4 decoration-2',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1.5 rounded-md',
  sm: 'px-3.5 py-1.5 text-sm gap-1.5 rounded-lg',
  md: 'px-4 py-2 text-sm gap-2 rounded-lg',
  lg: 'px-5 py-2.5 text-base gap-2 rounded-xl',
  xl: 'px-6 py-3 text-lg gap-2.5 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconRight, fullWidth, disabled, className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-colors duration-150 select-none',
          variantStyles[variant],
          sizeStyles[size],
          focusRing,
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
          className,
        )}
        {...props}
      >
        {loading && (
          <Loader size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} className="absolute" />
        )}
        <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
