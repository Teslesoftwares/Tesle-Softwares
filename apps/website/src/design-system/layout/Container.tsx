import { cn } from '../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

const maxWidths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1440px]',
  full: 'max-w-full',
};

export function Container({ children, size = 'lg', padding = true, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn(
      'mx-auto w-full',
      maxWidths[size],
      padding && 'px-4 sm:px-6 lg:px-8',
      className,
    )}>
      {children}
    </Tag>
  );
}
