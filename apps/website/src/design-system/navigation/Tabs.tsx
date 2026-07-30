'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tab: string) => void;
  variant?: 'underline' | 'pills' | 'segmented';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  underline: {
    container: 'border-b border-gray-200 dark:border-gray-800 gap-0',
    tab: 'px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative',
    active: 'text-amber-600 dark:text-amber-400',
    indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full',
  },
  pills: {
    container: 'gap-1',
    tab: 'px-3.5 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg',
    active: 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800',
    indicator: '',
  },
  segmented: {
    container: 'gap-0 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl',
    tab: 'px-4 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors rounded-lg relative z-10',
    active: 'text-gray-900 dark:text-gray-100',
    indicator: 'absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm',
  },
};

export function Tabs({ tabs, activeTab, onChange, variant = 'underline', size = 'md', className }: TabsProps) {
  const [internalTab, setInternalTab] = useState(activeTab || tabs[0]?.id || '');
  const currentTab = activeTab ?? internalTab;
  const v = variants[variant];

  const handleChange = (id: string) => {
    if (!activeTab) setInternalTab(id);
    onChange?.(id);
  };

  return (
    <div className={cn('flex items-center', v.container, className)}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 whitespace-nowrap',
              v.tab,
              isActive && v.active,
              tab.disabled && 'opacity-40 cursor-not-allowed',
            )}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
          >
            {variant === 'segmented' && isActive && (
              <motion.div layoutId="tab-indicator" className={v.indicator} transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
            )}
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                isActive ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
              )}>
                {tab.badge}
              </span>
            )}
            {variant === 'underline' && isActive && (
              <motion.div layoutId="tab-underline" className={v.indicator} transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (id !== activeTab) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      role="tabpanel"
      aria-labelledby={id}
      className={cn('pt-4', className)}
    >
      {children}
    </motion.div>
  );
}
