// Primitives
export * from './primitives';

// Data Display
export * from './data-display';

// Feedback
export * from './feedback';

// Navigation
export * from './navigation';

// Overlays
export * from './overlays';

// Charts
export * from './charts';

// Layout
export * from './layout';

// Utils
export { cn } from './utils/cn';
export { theme as colors, focusRing } from './utils/colors';
export { fadeIn, fadeInCenter, slideUp, slideDown, slideLeft, slideRight, scaleIn, visible, visibleDelayed, stagger, spring, springSoft, springSnap, exitScale, exitFade } from './utils/variants';
export const variants = {
  fadeIn: { opacity: 0, y: 8 },
  slideUp: { opacity: 0, y: 16 },
  scaleIn: { opacity: 0, scale: 0.92 },
} as const;
export const transitions = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
};
export const animations = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideUp: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  scaleIn: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
};
