'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, type = 'info', duration = 3500 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type, duration }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => addToast({ title, message, type: 'success' }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ title, message, type: 'error' }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ title, message, type: 'warning' }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ title, message, type: 'info' }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
      {children}

      {/* Floating Toasts Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
              error: <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
              info: <Info className="w-5 h-5 text-cepi-sky-600 shrink-0 mt-0.5" />,
            }[t.type || 'info'];

            const borderColors = {
              success: 'border-emerald-200 bg-emerald-50/95',
              error: 'border-rose-200 bg-rose-50/95',
              warning: 'border-amber-200 bg-amber-50/95',
              info: 'border-cepi-sky-200 bg-cepi-sky-50/95',
            }[t.type || 'info'];

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className={cn(
                  'pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md text-slate-800',
                  borderColors
                )}
              >
                <div className="flex items-start gap-3">
                  {icons}
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{t.title}</h4>
                    {t.message && <p className="text-xs text-slate-600 leading-relaxed">{t.message}</p>}
                  </div>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-slate-400 hover:text-slate-700 p-1 transition-colors rounded-lg shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
