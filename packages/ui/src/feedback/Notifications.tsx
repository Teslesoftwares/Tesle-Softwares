'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {}, dismiss: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <AlertCircle size={18} />,
};

const iconColors: Record<ToastType, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const borderColors: Record<ToastType, string> = {
  info: 'border-l-blue-500',
  success: 'border-l-green-500',
  warning: 'border-l-yellow-500',
  error: 'border-l-red-500',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, toasts[0].duration || 4000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast: addToast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none" aria-live="polite" aria-label="Notifications">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={cn(
                'pointer-events-auto relative w-80 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden',
                'border-l-4', borderColors[t.type],
              )}
              role="alert"
            >
              <div className="flex gap-3 p-4">
                <span className={cn('shrink-0 mt-0.5', iconColors[t.type])}>{icons[t.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.title}</p>
                  {t.message && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: (t.duration || 4000) / 1000, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/30 origin-left"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
