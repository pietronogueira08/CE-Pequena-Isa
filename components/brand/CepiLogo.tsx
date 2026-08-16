'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CepiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  animated?: boolean;
  lightMode?: boolean;
  className?: string;
}

export function CepiLogo({
  size = 'md',
  showText = true,
  animated = false,
  lightMode = false,
  className = '',
}: CepiLogoProps) {
  const dimensions = {
    sm: { icon: 32, textTitle: 'text-base', textSub: 'text-[9px]' },
    md: { icon: 44, textTitle: 'text-xl', textSub: 'text-[11px]' },
    lg: { icon: 60, textTitle: 'text-2xl', textSub: 'text-xs' },
    xl: { icon: 84, textTitle: 'text-3xl', textSub: 'text-sm' },
    hero: { icon: 120, textTitle: 'text-4xl sm:text-5xl', textSub: 'text-sm sm:text-base' },
  }[size];

  const iconVariants: any = {
    initial: { scale: 0.8, opacity: 0, rotate: -15 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const petalVariants: any = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.04,
        type: 'spring',
        stiffness: 300,
        damping: 18,
      },
    }),
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Original Image Logo */}
      <motion.div
        className="relative flex items-center justify-center rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-white/20 bg-white"
        initial={animated ? 'initial' : false}
        animate={animated ? 'animate' : false}
        variants={iconVariants}
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <Image 
          src="/images/logo-cepi.jpeg" 
          alt="CEPI Logo" 
          fill 
          className="object-cover"
          sizes={`${dimensions.icon}px`}
        />
        
        {/* Pulsing Aura if animated */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-cepi-gold/20 -z-10 blur-md pointer-events-none"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${dimensions.textTitle} ${
                lightMode ? 'text-white' : 'text-cepi-navy'
              }`}
            >
              CEPI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cepi-gold animate-pulse" />
          </div>
          <span
            className={`font-medium tracking-wide uppercase ${dimensions.textSub} ${
              lightMode ? 'text-white/80' : 'text-slate-500'
            }`}
          >
            Pequena Isa • Grussaí/RJ
          </span>
        </div>
      )}
    </div>
  );
}
