'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
      {/* Sunflower & Globe Vector Logo */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={animated ? 'initial' : false}
        animate={animated ? 'animate' : false}
        variants={iconVariants}
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Background Glow Circle */}
          <circle cx="50" cy="50" r="46" fill="#4FA8D8" fillOpacity="0.16" />
          <circle cx="50" cy="50" r="45" stroke="#4FA8D8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

          {/* Stem & Leaves */}
          <path
            d="M50 82C50 68 50 55 50 48"
            stroke="#4C9A4C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <motion.path
            custom={1}
            variants={animated ? petalVariants : {}}
            d="M50 68C42 66 36 60 38 54C46 54 50 62 50 68Z"
            fill="#4C9A4C"
          />
          <motion.path
            custom={2}
            variants={animated ? petalVariants : {}}
            d="M50 62C58 60 64 54 62 48C54 48 50 56 50 62Z"
            fill="#4C9A4C"
          />

          {/* Sunflower Petals in Circular Array */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
            <motion.path
              key={angle}
              custom={idx + 3}
              variants={animated ? petalVariants : {}}
              d="M50 18 C52 26, 56 32, 50 36 C44 32, 48 26, 50 18 Z"
              fill={idx % 2 === 0 ? '#F4C430' : '#E5B31E'}
              transform={`rotate(${angle} 50 42)`}
            />
          ))}

          {/* Center Globe / Sunflower Core */}
          <circle cx="50" cy="42" r="14" fill="#D9772E" />
          <circle cx="50" cy="42" r="12" fill="#1B3A6B" />
          {/* Globe meridians */}
          <ellipse cx="50" cy="42" rx="7" ry="12" stroke="#4FA8D8" strokeWidth="1" opacity="0.8" />
          <line x1="38" y1="42" x2="62" y2="42" stroke="#4FA8D8" strokeWidth="1" opacity="0.8" />
          {/* Center Star / Pupil */}
          <circle cx="50" cy="42" r="3.5" fill="#F4C430" />
        </svg>

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
