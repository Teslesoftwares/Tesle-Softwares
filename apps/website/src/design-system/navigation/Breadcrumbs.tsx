import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeIcon?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, homeIcon = true, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
      {homeIcon && (
        <>
          <a href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="Home">
            <Home size={16} />
          </a>
          <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
        </>
      )}
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            {item.icon && <span className="text-gray-400">{item.icon}</span>}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className={cn(
                'font-medium',
                isLast ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400',
              )}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />}
          </span>
        );
      })}
    </nav>
  );
}
