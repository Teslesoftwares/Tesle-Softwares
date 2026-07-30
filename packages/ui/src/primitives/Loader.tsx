import { cn } from '../utils/cn';

interface LoaderProps {
  size?: number;
  className?: string;
}

export function Loader({ size = 20, className }: LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('animate-spin text-amber-500', className)}
      role="status"
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PageLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
      <Loader size={32} />
    </div>
  );
}
