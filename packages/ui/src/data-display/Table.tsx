'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Loader } from '../primitives/Loader';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hideOnMobile?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  selectedIds?: Set<string | number>;
  onSelectChange?: (ids: Set<string | number>) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  sortable?: boolean;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyState,
  onRowClick,
  selectedIds,
  onSelectChange,
  searchable,
  searchPlaceholder = 'Search...',
  pageSize = 20,
  sortable = true,
  className,
}: TableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      columns.some((col) => String(item[col.key] ?? '').toLowerCase().includes(q))
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleSelect = (id: string | number) => {
    if (!selectedIds || !onSelectChange) return;
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectChange(next);
  };

  const allSelected = selectedIds && selectedIds.size === paginated.length && paginated.length > 0;
  const someSelected = selectedIds && selectedIds.size > 0 && !allSelected;

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center py-16', className)}>
        <Loader size={24} />
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className={cn('', className)}>
        {searchable && (
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
          {emptyState || <><span className="text-4xl mb-3">📭</span><p className="text-sm">No data</p></>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {(searchable || (selectedIds && selectedIds.size > 0)) && (
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          )}
          {selectedIds && selectedIds.size > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{selectedIds.size} selected</span>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {selectedIds && (
                <th className="w-10 px-3 py-3">
                  <button
                    role="checkbox"
                    aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
                    onClick={() => {
                      if (!onSelectChange) return;
                      onSelectChange(allSelected ? new Set() : new Set(paginated.map(keyExtractor)));
                    }}
                    className={cn(
                      'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                      allSelected || someSelected ? 'bg-amber-500 border-amber-500' : 'border-gray-300 dark:border-gray-600',
                    )}
                  >
                    {someSelected ? <svg width="8" height="2" viewBox="0 0 8 2" fill="none"><rect width="8" height="2" rx="1" fill="white"/></svg> : allSelected ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : null}
                  </button>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    col.sortable && sortable && 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.hideOnMobile && 'hidden lg:table-cell',
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortable && (
                      sortKey === col.key ? (
                        sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-30" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginated.map((item, i) => {
                const id = keyExtractor(item);
                const selected = selectedIds?.has(id);
                return (
                  <motion.tr
                    key={id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      'border-b border-gray-100 dark:border-gray-800/50 transition-colors',
                      onRowClick && 'cursor-pointer',
                      selected && 'bg-amber-50/50 dark:bg-amber-950/20',
                      !selected && hoveredRow === id && 'bg-gray-50 dark:bg-gray-800/30',
                    )}
                    onMouseEnter={() => setHoveredRow(id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selectedIds && (
                      <td className="w-10 px-3 py-3">
                        <button
                          role="checkbox"
                          aria-checked={selected}
                          onClick={(e) => { e.stopPropagation(); toggleSelect(id); }}
                          className={cn(
                            'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                            selected ? 'bg-amber-500 border-amber-500' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400',
                          )}
                        >
                          {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-3 py-3 text-sm text-gray-700 dark:text-gray-300',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.hideOnMobile && 'hidden lg:table-cell',
                        )}
                      >
                        {col.render ? col.render(item) : String(item[col.key] ?? '')}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {sorted.length} results
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'w-8 h-8 text-xs rounded-lg transition-colors',
                    p === page ? 'bg-amber-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
