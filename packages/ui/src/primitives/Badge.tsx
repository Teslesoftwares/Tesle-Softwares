import { cn } from '../utils/cn';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  primary: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-gray-400',
  primary: 'bg-amber-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
};

export function Badge({ children, variant = 'default', size = 'md', dot, removable, onRemove, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="ml-0.5 hover:opacity-70 transition-opacity"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1l8 8M9 1l-8 8" />
          </svg>
        </button>
      )}
    </span>
  );
}
