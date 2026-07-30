'use client';

import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface MetricWidgetProps {
  label: string;
  value: string | number;
  secondary?: string;
  progress?: number;
  icon?: React.ReactNode;
  color?: 'amber' | 'green' | 'blue' | 'red' | 'purple' | 'cyan';
  trend?: { value: string; direction: 'up' | 'down' };
  className?: string;
}

const colorStyles = {
  amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  green: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
  blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
  red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
  purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
  cyan: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400',
};

const barColors = {
  amber: 'bg-amber-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  cyan: 'bg-cyan-500',
};

export function MetricWidget({ label, value, secondary, progress, icon, color = 'amber', trend, className }: MetricWidgetProps) {
  return (
    <div className={cn('rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4', className)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
        {icon && <span className={cn('p-1.5 rounded-lg', colorStyles[color])}>{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            'text-xs font-medium',
            trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
          )}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      {secondary && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{secondary}</p>}
      {progress !== undefined && (
        <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn('h-full rounded-full', barColors[color])}
          />
        </div>
      )}
    </div>
  );
}
