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
  const base = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer';

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const variants = {
    primary:
      'bg-accent text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105',
    outline:
      'border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </Comp>
  );
}
