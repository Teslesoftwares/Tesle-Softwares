'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { focusRing } from '../utils/colors';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onNavigate?: (item: SidebarItem) => void;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ items, activeItem, onNavigate, collapsible = true, defaultCollapsed = false, header, footer, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(items.filter(i => i.children?.some(c => c.id === activeItem)).map(i => i.id)));

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className={cn(
      'relative h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
      className,
    )}>
      {collapsible && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      {header && <div className={cn('p-4 border-b border-gray-200 dark:border-gray-800', collapsed && 'p-3')}>{header}</div>}

      <nav className="flex-1 overflow-y-auto p-2 space-y-1" aria-label="Sidebar navigation">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedSections.has(item.id);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasChildren) toggleSection(item.id);
                  else onNavigate?.(item);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                  isActive && !hasChildren
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50',
                  focusRing,
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0 w-5 flex items-center justify-center">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium">{item.badge}</span>
                    )}
                    {hasChildren && (
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} />
                      </motion.span>
                    )}
                  </>
                )}
              </button>
              <AnimatePresence>
                {hasChildren && isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-3 pl-3 border-l border-gray-200 dark:border-gray-800 mt-1 space-y-0.5">
                      {item.children!.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => onNavigate?.(child)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-1.5 text-sm rounded-lg transition-colors',
                            child.id === activeItem
                              ? 'text-amber-600 dark:text-amber-400 font-medium'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                          )}
                        >
                          {child.icon && <span className="shrink-0">{child.icon}</span>}
                          <span className="truncate">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {footer && <div className={cn('p-4 border-t border-gray-200 dark:border-gray-800', collapsed && 'p-3')}>{footer}</div>}
    </aside>
  );
}
