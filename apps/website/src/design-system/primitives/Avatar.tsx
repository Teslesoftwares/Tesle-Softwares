import { cn } from '../utils/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: 'online' | 'away' | 'busy' | 'offline';
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
  xxl: 'w-20 h-20 text-2xl',
};

const statusSize: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 right-0 bottom-0',
  sm: 'w-2 h-2 right-0 bottom-0',
  md: 'w-2.5 h-2.5 right-0 bottom-0',
  lg: 'w-3 h-3 right-0.5 bottom-0.5',
  xl: 'w-3.5 h-3.5 right-0.5 bottom-0.5',
  xxl: 'w-4 h-4 right-1 bottom-1',
};

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-400',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  'bg-amber-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
  'bg-pink-500', 'bg-cyan-500', 'bg-orange-500', 'bg-teal-500',
];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function Avatar({ src, alt = '', name, size = 'md', status, className }: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          className={cn('rounded-full object-cover', sizeStyles[size])}
        />
      ) : name ? (
        <span
          className={cn(
            'rounded-full flex items-center justify-center text-white font-medium',
            getColor(name),
            sizeStyles[size],
          )}
          aria-label={alt || name}
        >
          {getInitials(name)}
        </span>
      ) : (
        <span className={cn('rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400', sizeStyles[size])}>
          <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-white dark:border-gray-900',
            statusColors[status],
            statusSize[size],
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
