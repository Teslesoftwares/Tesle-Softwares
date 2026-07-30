import { cn } from '../utils/cn';

type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

interface StackProps {
  children: React.ReactNode;
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackSpacing;
  wrap?: boolean;
  className?: string;
  as?: 'div' | 'nav' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'form' | 'fieldset';
}

const alignMap: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap: Record<StackSpacing, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
};

export function Stack({ children, direction = 'column', align = 'stretch', justify = 'start', gap = 4, wrap = false, className, as: Tag = 'div' }: StackProps) {
  return (
    <Tag className={cn(
      'flex',
      direction === 'row' && 'flex-row',
      direction === 'column' && 'flex-col',
      direction === 'row-reverse' && 'flex-row-reverse',
      direction === 'column-reverse' && 'flex-col-reverse',
      alignMap[align],
      justifyMap[justify],
      gapMap[gap],
      wrap && 'flex-wrap',
      className,
    )}>
      {children}
    </Tag>
  );
}
