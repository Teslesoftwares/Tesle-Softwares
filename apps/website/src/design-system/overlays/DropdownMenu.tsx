'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  variant?: 'default' | 'danger';
  onClick?: () => void;
  children?: DropdownItem[];
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end';
  className?: string;
}

export function DropdownMenu({ trigger, items, align = 'start', className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSubMenu(null); }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setSubMenu(null); }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    if (item.children) {
      setSubMenu(subMenu === item.label ? null : item.label);
      return;
    }
    item.onClick?.();
    setOpen(false);
    setSubMenu(null);
  };

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true" className="inline-flex" type="button">
        {trigger}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.1 }}
            className={cn(
              'absolute top-full mt-1 z-50 min-w-[200px] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-1.5',
              align === 'end' ? 'right-0' : 'left-0',
            )}
            role="menu"
          >
            {items.map((item, i) => {
              if (item.divider) {
                return <div key={i} className="my-1 border-t border-gray-200 dark:border-gray-800" />;
              }
              const hasSub = item.children && item.children.length > 0;
              const isSubOpen = subMenu === item.label;
              return (
                <div key={i} className="relative">
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors',
                      item.variant === 'danger'
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50',
                      item.disabled && 'opacity-40 cursor-not-allowed',
                    )}
                    role="menuitem"
                    onMouseEnter={() => hasSub && setSubMenu(item.label)}
                  >
                    {item.icon && <span className="shrink-0 w-4">{item.icon}</span>}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && <kbd className="text-[10px] px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-400">{item.shortcut}</kbd>}
                    {hasSub && <ChevronRight size={14} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {hasSub && isSubOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.1 }}
                        className="absolute left-full top-0 ml-1 min-w-[180px] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-1.5"
                        role="menu"
                      >
                        {item.children!.map((child, ci) => (
                          <button
                            key={ci}
                            onClick={() => { child.onClick?.(); setOpen(false); setSubMenu(null); }}
                            disabled={child.disabled}
                            className={cn(
                              'w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors',
                              child.variant === 'danger'
                                ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50',
                              child.disabled && 'opacity-40 cursor-not-allowed',
                            )}
                            role="menuitem"
                          >
                            {child.icon && <span className="shrink-0 w-4">{child.icon}</span>}
                            <span className="flex-1 text-left">{child.label}</span>
                            {child.shortcut && <kbd className="text-[10px] px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-400">{child.shortcut}</kbd>}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
