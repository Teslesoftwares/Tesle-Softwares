'use client';

import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  id?: string;
}

const trackSizes = {
  sm: 'w-8 h-4.5',
  md: 'w-11 h-6',
};

const thumbSizes = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
};

const thumbTranslate = {
  sm: 'translate-x-3.5',
  md: 'translate-x-5',
};

export function Switch({ checked, onChange, label, disabled, size = 'md', id }: SwitchProps) {
  const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <label htmlFor={switchId} className={cn('inline-flex items-center gap-3', disabled && 'opacity-50 cursor-not-allowed', !disabled && 'cursor-pointer')}>
      <button
        id={switchId}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative rounded-full transition-colors duration-200',
          trackSizes[size],
          checked ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-700',
        )}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn(
            'absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm',
            thumbSizes[size],
            checked && thumbTranslate[size],
          )}
        />
      </button>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{label}</span>}
    </label>
  );
}
