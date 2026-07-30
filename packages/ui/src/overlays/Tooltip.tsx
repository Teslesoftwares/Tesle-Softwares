'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const sideStyles = {
  top: {
    placement: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    animation: { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 } },
  },
  bottom: {
    placement: 'top-full left-1/2 -translate-x-1/2 mt-2',
    animation: { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
  },
  left: {
    placement: 'right-full top-1/2 -translate-y-1/2 mr-2',
    animation: { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 } },
  },
  right: {
    placement: 'left-full top-1/2 -translate-y-1/2 ml-2',
    animation: { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 } },
  },
};

export function Tooltip({ content, children, side = 'top', delay = 300, className }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const s = sideStyles[side];

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setShow(true), delay);
  };
  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <div className="relative inline-flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={s.animation.initial}
            animate={s.animation.animate}
            exit={s.animation.initial}
            transition={{ duration: 0.12 }}
            className={`absolute z-50 pointer-events-none ${s.placement} ${className}`}
          >
            <div className="px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg whitespace-nowrap">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
