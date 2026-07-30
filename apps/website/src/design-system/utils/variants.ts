import type { Variant } from 'framer-motion';

export const fadeIn: Variant = { opacity: 0, y: 8 };
export const fadeInCenter: Variant = { opacity: 0, scale: 0.96 };
export const slideUp: Variant = { opacity: 0, y: 16 };
export const slideDown: Variant = { opacity: 0, y: -16 };
export const slideLeft: Variant = { opacity: 0, x: 16 };
export const slideRight: Variant = { opacity: 0, x: -16 };
export const scaleIn: Variant = { opacity: 0, scale: 0.92 };

export const visible: Variant = { opacity: 1, y: 0, x: 0, scale: 1 };
export const visibleDelayed: Variant = { opacity: 1, y: 0, x: 0, scale: 1 };

export const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export const spring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

export const springSoft = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
};

export const springSnap = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 35,
};

export const exitScale = { opacity: 0, scale: 0.95, transition: { duration: 0.15 } };
export const exitFade = { opacity: 0, transition: { duration: 0.15 } };
