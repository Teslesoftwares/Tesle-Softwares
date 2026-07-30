export const theme = {
  primary: {
    light: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700',
    outline: 'border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30',
    ghost: 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30',
    subtle: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  },
  surface: {
    elevated: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm',
    card: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md',
    overlay: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl',
  },
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    inverse: 'text-white',
  },
  border: 'border-gray-200 dark:border-gray-800',
  divider: 'bg-gray-200 dark:bg-gray-800',
  danger: {
    solid: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    outline: 'border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
    ghost: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
    subtle: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300',
  },
} as const;

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950';
