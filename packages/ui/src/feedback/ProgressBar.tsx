'use client';

import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'amber' | 'green' | 'blue' | 'red' | 'gradient';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const variants = {
  amber: 'bg-amber-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  gradient: 'bg-gradient-to-r from-amber-400 to-amber-600',
};

export function ProgressBar({ value, max = 100, size = 'md', variant = 'amber', showLabel, animated = true, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('space-y-1', className)}>
      <div className={cn('w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', variants[variant])}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{value}/{max}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}
