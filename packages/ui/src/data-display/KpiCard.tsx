'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: { value: string; trend: 'up' | 'down' | 'neutral' };
  icon?: React.ReactNode;
  subtitle?: string;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded bg-gray-200 dark:bg-gray-700', className)} />;
}

export function KpiCard({ title, value, change, icon, subtitle, loading, onClick, className }: KpiCardProps) {
  return (
    <motion.div
      whileHover={onClick ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-shadow duration-200',
        onClick && 'cursor-pointer hover:shadow-lg',
        className,
      )}
    >
      {loading ? (
        <div className="space-y-3">
          <SkeletonBar className="h-4 w-24" />
          <SkeletonBar className="h-8 w-32" />
          <SkeletonBar className="h-3 w-20" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</span>
            {icon && <span className="text-gray-400 dark:text-gray-500 shrink-0">{icon}</span>}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{value}</div>
          {(change || subtitle) && (
            <div className="flex items-center gap-2 mt-1.5">
              {change && (
                <span className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-medium',
                  change.trend === 'up' && 'text-green-600 dark:text-green-400',
                  change.trend === 'down' && 'text-red-600 dark:text-red-400',
                  change.trend === 'neutral' && 'text-gray-500 dark:text-gray-400',
                )}>
                  {change.trend === 'up' ? <TrendingUp size={12} /> : change.trend === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}
                  {change.value}
                </span>
              )}
              {subtitle && <span className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</span>}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export function KpiCardGrid({ children, columns = 4, className }: { children: React.ReactNode; columns?: 2 | 3 | 4; className?: string }) {
  const gridCols = { 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' };
  return <div className={cn('grid gap-4', gridCols[columns], className)}>{children}</div>;
}
