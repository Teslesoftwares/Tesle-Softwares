import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6 sm:p-8 transition-all duration-300',
        hover && 'hover:glass-hover hover:-translate-y-0.5',
        glow && 'shadow-[0_0_40px_rgba(255,107,0,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
