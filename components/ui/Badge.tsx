'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'gold' | 'sky' | 'green' | 'orange' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'navy',
  size = 'sm',
  dot = false,
  className = '',
}: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-medium rounded-full gap-1.5',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-full gap-1.5',
  }[size];

  const variantStyles = {
    navy: 'bg-cepi-navy-50 text-cepi-navy border border-cepi-navy/20',
    gold: 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold',
    sky: 'bg-cepi-sky-50 text-cepi-sky-700 border border-cepi-sky/30',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-300',
    orange: 'bg-orange-50 text-orange-700 border border-orange-300',
    rose: 'bg-rose-50 text-rose-700 border border-rose-300',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    outline: 'bg-transparent text-slate-700 border border-slate-300',
  }[variant];

  const dotColor = {
    navy: 'bg-cepi-navy',
    gold: 'bg-amber-500',
    sky: 'bg-cepi-sky',
    green: 'bg-emerald-500',
    orange: 'bg-orange-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-400',
    outline: 'bg-slate-500',
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center tracking-tight select-none shadow-xs',
        sizeStyles,
        variantStyles,
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColor)} />}
      {children}
    </span>
  );
}
