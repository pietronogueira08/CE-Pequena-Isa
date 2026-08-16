'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CepiLogo } from '@/components/brand/CepiLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Auto-navigate to login after 3.2 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [router]);

  const handleSkip = () => {
    router.push('/login');
  };

  return (
    <main
      onClick={handleSkip}
      className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0F2240] via-[#1B3A6B] to-[#0B172B] overflow-hidden cursor-pointer select-none text-white"
    >
      {/* Background Animated Blobs & Lights */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-cepi-gold/15 blur-[120px] pointer-events-none -top-20 -right-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-cepi-sky/15 blur-[100px] pointer-events-none -bottom-20 -left-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Logo & Animated Presentation */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Animated Brand Vector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 20,
            duration: 0.9,
          }}
          className="mb-8 p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative"
        >
          <CepiLogo size="hero" showText={false} animated={true} />
        </motion.div>

        {/* Institution Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              CEPI
            </span>
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-full bg-cepi-gold text-slate-950 tracking-wider">
              Gestão Escolar
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 font-medium tracking-wide">
            Centro Educacional Pequena Isa
          </p>

          <p className="text-xs text-cepi-sky-200 font-medium">
            Grussaí • São João da Barra / RJ
          </p>
        </motion.div>

        {/* Progress Bar & Loader Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="w-48 sm:w-64 mt-10 space-y-2"
        >
          <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-cepi-sky via-cepi-gold to-cepi-green rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
            <span>Carregando ambiente...</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Skip Button (Click anywhere or button) */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-xs font-bold text-white transition-all shadow-lg hover:scale-105"
      >
        <span>Pular Abertura</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.button>
    </main>
  );
}
