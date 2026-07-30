'use client';

import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
}

export function Checkbox({ checked, onChange, label, disabled, indeterminate, id }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <label htmlFor={checkboxId} className={cn('inline-flex items-center gap-2.5', disabled && 'opacity-50 cursor-not-allowed', !disabled && 'cursor-pointer')}>
      <button
        id={checkboxId}
        role="checkbox"
        type="button"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-colors duration-150',
          focusRing,
          checked || indeterminate
            ? 'bg-amber-500 border-amber-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
        )}
      >
        {indeterminate ? (
          <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
            <rect width="8" height="2" rx="1" fill="white" />
          </svg>
        ) : checked ? (
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2 }}
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
          >
            <motion.path
              d="M1 4l2.5 3L9 1"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.svg>
        ) : null}
      </button>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{label}</span>}
    </label>
  );
}
