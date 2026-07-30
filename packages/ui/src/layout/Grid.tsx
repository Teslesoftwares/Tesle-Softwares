import { cn } from '../utils/cn';

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

interface GridProps {
  children: React.ReactNode;
  cols?: GridCols;
  colsSm?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  gap?: GridGap;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'ul';
}

const colsMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const gapMap: Record<GridGap, string> = {
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
};

export function Grid({ children, cols = 1, colsSm, colsMd, colsLg, gap = 4, className, as: Tag = 'div' }: GridProps) {
  return (
    <Tag className={cn(
      'grid',
      colsMap[cols],
      colsSm && `sm:${colsMap[colsSm]}`,
      colsMd && `md:${colsMap[colsMd]}`,
      colsLg && `lg:${colsMap[colsLg]}`,
      gapMap[gap],
      className,
    )}>
      {children}
    </Tag>
  );
}

interface GridItemProps {
  children: React.ReactNode;
  span?: GridCols;
  spanSm?: GridCols;
  spanMd?: GridCols;
  spanLg?: GridCols;
  className?: string;
}

export function GridItem({ children, span, spanSm, spanMd, spanLg, className }: GridItemProps) {
  return (
    <div className={cn(
      span && `col-span-${span}`,
      spanSm && `sm:col-span-${spanSm}`,
      spanMd && `md:col-span-${spanMd}`,
      spanLg && `lg:col-span-${spanLg}`,
      className,
    )}>
      {children}
    </div>
  );
}
