'use client';

import { cn } from '../utils/cn';
import { Loader } from '../primitives/Loader';

interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

export function DataGrid<T>({ data, renderItem, keyExtractor, columns = 3, loading, emptyState, className }: DataGridProps<T>) {
  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader size={24} /></div>;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
        {emptyState || <><span className="text-4xl mb-3">📭</span><p className="text-sm">No data</p></>}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {data.map((item, i) => (
        <div key={keyExtractor(item)}>{renderItem(item, i)}</div>
      ))}
    </div>
  );
}
