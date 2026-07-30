import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  onClick,
  className,
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow',
    outline:
      'border border-border text-text hover:bg-glass-hover',
    ghost: 'text-muted hover:text-text hover:bg-glass-hover',
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </Comp>
  );
}
