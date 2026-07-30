import { useState, useRef, useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ExpandableCardProps {
  children: ReactNode;
  className?: string;
  maxHeight?: number;
}

export function ExpandableCard({ children, className, maxHeight = 280 }: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setOverflows(el.scrollHeight > el.clientHeight + 2);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  return (
    <>
      <div
        className={cn(
          'glass rounded-2xl p-6 sm:p-8 transition-all duration-500 relative group h-full hover:glass-hover',
          className,
        )}
      >
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ maxHeight: open ? '' : maxHeight }}
        >
          {children}
        </div>
        {overflows && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
            <button
              onClick={() => setOpen(true)}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-xs text-accent hover:text-accent-dark transition-colors px-3 py-1.5 rounded-full border border-accent/30 bg-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
            >
              Read more
            </button>
          </>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-surface border border-glass rounded-2xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-muted hover:text-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
