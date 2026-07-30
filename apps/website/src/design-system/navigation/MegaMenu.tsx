'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';

interface MegaMenuItem {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface MegaMenuSection {
  title?: string;
  items: MegaMenuItem[];
  columns?: 1 | 2 | 3 | 4;
}

interface MegaMenuProps {
  trigger: React.ReactNode;
  sections: MegaMenuSection[];
  footer?: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

const sectionCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export function MegaMenu({ trigger, sections, footer, align = 'left', className }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
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

  return (
    <div ref={ref} className={cn('relative', className)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn('inline-flex items-center gap-1.5', focusRing)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full pt-2 z-50',
              align === 'right' && 'right-0',
              align === 'center' && 'left-1/2 -translate-x-1/2',
              align === 'left' && 'left-0',
            )}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden min-w-[600px]">
              <div className="p-6">
                <div className={cn('grid gap-x-8 gap-y-6', sectionCols[sections.reduce((max, s) => Math.max(max, s.columns || 1), 1 as number) as 1 | 2 | 3 | 4])}>
                  {sections.map((section, si) => (
                    <div key={si} className={cn(section.columns && sectionCols[section.columns], section.columns ? `grid gap-x-6 gap-y-4 col-span-${section.columns}` : 'space-y-3')}>
                      {section.title && <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{section.title}</p>}
                      {section.items.map((item, ii) => (
                        <a
                          key={ii}
                          href={item.href || '#'}
                          className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon && <span className="shrink-0 mt-0.5 text-gray-400 group-hover:text-amber-500 transition-colors">{item.icon}</span>}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{item.label}</span>
                              {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">{item.badge}</span>}
                            </div>
                            {item.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{item.description}</p>}
                          </div>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {footer && <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">{footer}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
