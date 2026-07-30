import { cn } from '../utils/cn';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  variant?: 'default' | 'card' | 'bordered';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
  as?: 'section' | 'div' | 'article';
}

const spacingMap = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-20',
};

const variantMap = {
  default: '',
  card: 'bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6',
  bordered: 'border border-gray-200 dark:border-gray-800 rounded-2xl p-6',
};

export function Section({ children, title, description, variant = 'default', spacing = 'md', className, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={cn(spacingMap[spacing], variantMap[variant], className)}>
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>}
          {description && <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-2xl">{description}</p>}
        </div>
      )}
      {children}
    </Tag>
  );
}
