'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'sky' | 'green' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-6 py-3 text-base font-bold rounded-xl gap-2.5',
    icon: 'p-2 rounded-xl text-sm justify-center items-center',
  }[size];

  const variantStyles = {
    primary:
      'bg-cepi-navy hover:bg-cepi-navy-600 active:bg-cepi-navy-700 text-white shadow-md shadow-cepi-navy/20 border border-cepi-navy-400/30',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/60 shadow-sm',
    gold:
      'bg-gradient-to-r from-cepi-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/25 border border-amber-300',
    sky:
      'bg-cepi-sky hover:bg-cepi-sky-600 active:bg-cepi-sky-700 text-white shadow-md shadow-cepi-sky/20',
    green:
      'bg-cepi-green hover:bg-cepi-green-600 active:bg-cepi-green-700 text-white shadow-md shadow-cepi-green/20',
    outline:
      'bg-transparent hover:bg-slate-100/70 border border-slate-300 text-slate-700 active:bg-slate-200',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 active:bg-slate-200',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 border border-rose-400/30',
  }[variant];

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      whileHover={{ y: disabled || isLoading ? 0 : -1 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-sans transition-colors relative select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer',
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          {children && <span>{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
