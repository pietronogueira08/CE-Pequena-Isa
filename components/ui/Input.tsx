'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold tracking-tight text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3.5 text-slate-400 pointer-events-none">{leftIcon}</div>}

        <input
          id={inputId}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm bg-white/90 border rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-900',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error
              ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-400/20'
              : 'border-slate-200/90 focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15',
            className
          )}
          {...props}
        />

        {rightIcon && <div className="absolute right-3.5 text-slate-400 pointer-events-none">{rightIcon}</div>}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  helperText,
  error,
  options,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold tracking-tight text-slate-700">
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          'w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200 text-slate-900 cursor-pointer',
          error
            ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-400/20'
            : 'border-slate-200 focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
