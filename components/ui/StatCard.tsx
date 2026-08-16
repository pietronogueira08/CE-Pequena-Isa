'use client';

import React from 'react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'navy' | 'gold' | 'sky' | 'green' | 'orange';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'navy',
  className = '',
}: StatCardProps) {
  const accentBgs = {
    navy: 'bg-cepi-navy-50 text-cepi-navy border-cepi-navy/20',
    gold: 'bg-amber-50 text-amber-600 border-amber-200',
    sky: 'bg-cepi-sky-50 text-cepi-sky-600 border-cepi-sky/20',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  }[accentColor];

  return (
    <GlassCard hoverEffect className={cn('p-5 flex flex-col justify-between', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className={cn('p-3 rounded-2xl border shadow-xs shrink-0', accentBgs)}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-1 font-bold',
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              )}
            >
              {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {trend.value}
            </span>
          )}
        </div>
      )}
    </GlassCard>
  );
}
