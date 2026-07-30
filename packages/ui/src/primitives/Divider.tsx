import { cn } from '../utils/cn';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('w-px bg-gray-200 dark:bg-gray-800 self-stretch', className)} />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  return <div className={cn('h-px bg-gray-200 dark:bg-gray-800', className)} />;
}
