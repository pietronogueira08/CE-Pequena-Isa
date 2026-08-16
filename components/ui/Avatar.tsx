'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  roleColor?: 'navy' | 'gold' | 'sky' | 'green' | 'orange';
  showStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

export function Avatar({
  src,
  name,
  size = 'md',
  roleColor = 'navy',
  showStatus = false,
  isOnline = true,
  className = '',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeDimensions = {
    sm: { container: 'w-8 h-8 text-xs', px: 32, ring: 'ring-2', status: 'w-2 h-2 -bottom-0.5 -right-0.5' },
    md: { container: 'w-10 h-10 text-sm', px: 40, ring: 'ring-2', status: 'w-2.5 h-2.5 bottom-0 right-0' },
    lg: { container: 'w-14 h-14 text-base', px: 56, ring: 'ring-2', status: 'w-3 h-3 bottom-0.5 right-0.5' },
    xl: { container: 'w-20 h-20 text-xl', px: 80, ring: 'ring-4', status: 'w-4 h-4 bottom-1 right-1' },
  }[size];

  const ringColors = {
    navy: 'ring-cepi-navy/40',
    gold: 'ring-amber-400',
    sky: 'ring-cepi-sky/40',
    green: 'ring-emerald-400',
    orange: 'ring-orange-400',
  }[roleColor];

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={cn('relative inline-flex shrink-0 select-none', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-bold font-sans bg-gradient-to-br from-slate-100 to-slate-200 text-cepi-navy border border-white shadow-sm',
          sizeDimensions.container,
          sizeDimensions.ring,
          ringColors
        )}
      >
        {src && !imgError ? (
          <Image
            src={src}
            alt={name}
            width={sizeDimensions.px}
            height={sizeDimensions.px}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span className="tracking-tighter">{initials || 'U'}</span>
        )}
      </div>

      {showStatus && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-white',
            isOnline ? 'bg-emerald-500' : 'bg-slate-400',
            sizeDimensions.status
          )}
        />
      )}
    </div>
  );
}
