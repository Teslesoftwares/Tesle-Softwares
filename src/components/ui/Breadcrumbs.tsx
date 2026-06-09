import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-4">
      <motion.ol
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 text-sm text-muted flex-wrap"
      >
        <li>
          <a href="/" className="hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5" />
          </a>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3" />
              {isLast ? (
                <span className="text-white">{item.label}</span>
              ) : (
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
