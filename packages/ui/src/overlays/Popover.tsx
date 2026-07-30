'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'bottom' | 'top';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
}

export function Popover({ trigger, children, align = 'center', side = 'bottom', open, onOpenChange, className, contentClassName }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = open ?? internalOpen;

  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setInternalOpen(v);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const alignStyles = align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2';
  const sideStyles = side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <button
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex"
        type="button"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: side === 'bottom' ? -4 : 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: side === 'bottom' ? -4 : 4 }}
            transition={{ duration: 0.12 }}
            className={cn('absolute z-50 min-w-[200px]', alignStyles, sideStyles, contentClassName)}
            role="dialog"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PopoverItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
  className?: string;
}

export function PopoverItem({ children, onClick, disabled, variant = 'default', className }: PopoverItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors',
        variant === 'danger'
          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
      type="button"
    >
      {children}
    </button>
  );
}
