'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'solid' | 'gold' | 'navy' | 'ghost' | 'interactive';
  hoverEffect?: boolean;
  blurLevel?: 'sm' | 'md' | 'lg' | 'none';
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  blurLevel = 'md',
  onClick,
  ...props
}: GlassCardProps) {
  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-xl',
  }[blurLevel];

  const variantStyles = {
    default: 'bg-white/80 border border-slate-200/80 shadow-glass text-slate-800',
    solid: 'bg-white border border-slate-100 shadow-md text-slate-800',
    gold: 'bg-gradient-to-br from-cepi-gold-50/90 to-amber-100/60 border border-cepi-gold/40 shadow-glass text-slate-900',
    navy: 'bg-gradient-to-br from-cepi-navy to-cepi-navy-700 border border-cepi-sky/20 shadow-glass-lg text-white',
    ghost: 'bg-slate-50/50 border border-slate-200/40 text-slate-700',
    interactive: 'bg-white/85 border border-slate-200/90 shadow-glass hover:shadow-glass-hover hover:border-cepi-navy/30 cursor-pointer text-slate-800',
  }[variant];

  const hoverMotion: any = hoverEffect || variant === 'interactive'
    ? {
        whileHover: { y: -3, transition: { duration: 0.2, ease: 'easeOut' } },
        whileTap: { scale: 0.99 },
      }
    : {};

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'rounded-2xl transition-all duration-200 relative overflow-hidden',
        blurClasses,
        variantStyles,
        className
      )}
      {...hoverMotion}
      {...props}
    >
      {children}
    </motion.div>
  );
}
