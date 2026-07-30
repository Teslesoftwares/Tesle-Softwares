'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

interface BannerProps {
  children: React.ReactNode;
  variant?: BannerVariant;
  title?: string;
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const variantStyles: Record<BannerVariant, string> = {
  info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  error: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
};

const icons: Record<BannerVariant, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <AlertCircle size={18} />,
};

export function Banner({ children, variant = 'info', title, dismissible = true, action, className }: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={cn('flex items-start gap-3 rounded-xl border p-4 text-sm', variantStyles[variant], className)}
          role="alert"
        >
          <span className="shrink-0 mt-0.5">{icons[variant]}</span>
          <div className="flex-1 min-w-0">
            {title && <p className="font-medium">{title}</p>}
            <div className="text-sm opacity-90">{children}</div>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="shrink-0 text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {action.label}
            </button>
          )}
          {dismissible && (
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 p-0.5 hover:opacity-70 transition-opacity"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
