'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderNavProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  breadcrumbs?: BreadcrumbItem[];
  badgeText?: string;
  badgeVariant?: 'navy' | 'gold' | 'sky' | 'green' | 'orange' | 'rose' | 'slate';
  rightActions?: React.ReactNode;
  className?: string;
}

export function PageHeaderNav({
  title,
  subtitle,
  backHref,
  backLabel = 'Voltar ao Painel',
  breadcrumbs = [],
  badgeText,
  badgeVariant = 'navy',
  rightActions,
  className = '',
}: PageHeaderNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('space-y-3 pb-2', className)}>
      {/* Top Row: Back Button + Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-cepi-navy hover:border-cepi-navy/40 hover:bg-slate-50 font-bold transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cepi-navy shrink-0" />
            <span>{backLabel}</span>
          </motion.button>

          {/* Breadcrumbs Trail */}
          {breadcrumbs.length > 0 && (
            <nav className="hidden sm:flex items-center gap-1.5 text-slate-400 font-medium">
              <span className="text-slate-300">/</span>
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;

                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-cepi-navy hover:underline transition-colors text-slate-500"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={cn(isLast ? 'text-slate-800 font-bold' : 'text-slate-500')}>
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>

        {/* Optional Right Action Slot in Top Row */}
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
      </div>

      {/* Main Title & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {rightActions && <div className="flex items-center gap-2.5 shrink-0">{rightActions}</div>}
      </div>
    </div>
  );
}
