'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function CommandPalette({ items, open, onOpenChange, placeholder = 'Search...', emptyMessage = 'No results', className }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = open ?? internalOpen;

  const setOpen = useCallback((v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setInternalOpen(v);
    if (!v) setSearch('');
  }, [onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return item.label.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q);
  });

  const categories = Array.from(new Set(filtered.filter(i => i.category).map(i => i.category!)));

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].onSelect();
      setOpen(false);
    }
  };

  return (
    <>
      {/* Keyboard shortcut hint (shown when closed) */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className={cn('inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors', className)}
          aria-label="Open command palette"
        >
          <Search size={14} />
          <span className="hidden sm:inline">{placeholder}</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded ml-4">
            <Command size={10} />K
          </kbd>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 py-3.5 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-400">ESC</kbd>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-gray-400 dark:text-gray-500">
                    <Search size={24} className="mb-2 opacity-50" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                ) : (
                  <>
                    {categories.map((cat) => (
                      <div key={cat}>
                        <p className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{cat}</p>
                        {filtered.filter(i => i.category === cat).map((item, i) => {
                          const globalIndex = filtered.indexOf(item);
                          return (
                            <button
                              key={item.id}
                              onClick={() => { item.onSelect(); setOpen(false); }}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                                selectedIndex === globalIndex
                                  ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
                              )}
                            >
                              {item.icon && <span className="shrink-0 text-gray-400">{item.icon}</span>}
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.shortcut && (
                                <kbd className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-400">{item.shortcut}</kbd>
                              )}
                              <ArrowRight size={14} className="shrink-0 text-gray-300 dark:text-gray-600" />
                            </button>
                          );
                        })}
                      </div>
                    ))}
                    {!categories.length && (
                      <div>
                        {filtered.map((item, i) => (
                          <button
                            key={item.id}
                            onClick={() => { item.onSelect(); setOpen(false); }}
                            onMouseEnter={() => setSelectedIndex(i)}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                              selectedIndex === i
                                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
                            )}
                          >
                            {item.icon && <span className="shrink-0 text-gray-400">{item.icon}</span>}
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.shortcut && (
                              <kbd className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-400">{item.shortcut}</kbd>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
