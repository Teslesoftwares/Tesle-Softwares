'use client';

import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  as?: 'div' | 'section' | 'article';
  className?: string;
}

const variantStyles = {
  elevated: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm',
  outlined: 'border border-gray-200 dark:border-gray-800 bg-transparent',
  ghost: 'bg-gray-50 dark:bg-gray-900/50',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  hover = false,
  as: Component = 'div',
  className,
}: CardProps) {
  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      whileHover={hover ? { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' } : undefined}
      transition={{ duration: 0.2 }}
      className={cn('rounded-xl transition-shadow duration-200', variantStyles[variant], paddingStyles[padding], className)}
    >
      {children}
    </MotionComponent>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between gap-4 mb-4', className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800', className)}>{children}</div>;
}
