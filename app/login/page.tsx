'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CepiLogo } from '@/components/brand/CepiLogo';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ROLES_METADATA, CEPI_BRAND } from '@/lib/constants/theme';
import { UserRole } from '@/lib/types';
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  Users,
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('helena.fontes@pequenaisa.com.br');
  const [password, setPassword] = useState('••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('professor');
  const [isLoading, setIsLoading] = useState(false);

  const roleIcons = {
    professor: <GraduationCap className="w-5 h-5" />,
    diretor: <ShieldCheck className="w-5 h-5" />,
    secretaria: <Building2 className="w-5 h-5" />,
    responsavel: <Users className="w-5 h-5" />,
    aluno: <BookOpen className="w-5 h-5" />,
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    // Simulated premium loading state for 800ms
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROLES_METADATA[selectedRole].defaultRoute);
    }, 800);
  };

  const handleRoleQuickSelect = (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROLES_METADATA[role].defaultRoute);
    }, 450);
  };

  const rolesList: UserRole[] = ['professor', 'diretor', 'secretaria', 'responsavel', 'aluno'];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 overflow-x-hidden">
      {/* LEFT SIDE: Brand Showcase & Institutional Banner */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full lg:w-5/12 bg-gradient-to-br from-[#0F2240] via-[#1B3A6B] to-[#14294C] p-8 lg:p-14 flex flex-col justify-between text-white relative overflow-hidden shrink-0"
      >
        {/* Background Light Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cepi-gold/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cepi-sky/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Top Header */}
        <div className="relative z-10 space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CepiLogo size="lg" lightMode />
          </div>
        </div>

        {/* Hero Pitch */}
        <div className="relative z-10 py-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cepi-gold/20 border border-cepi-gold/40 text-cepi-gold text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-cepi-gold" />
            <span>Plataforma Integrada de Gestão 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Educação com <span className="text-cepi-gold">propósito</span>, excelência e futuro.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Ambiente unificado para professores, equipe diretiva, secretaria, pais e alunos do{' '}
            <strong className="text-white">Centro Educacional Pequena Isa</strong>.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Diário de classe e frequência em tempo real',
              'Acompanhamento do boletim escolar e ocorrências',
              'Gestão de matrículas e visão executiva institucional',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cepi-green shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Details */}
        <div className="relative z-10 pt-6 border-t border-white/15 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>{CEPI_BRAND.location}</span>
          <span className="font-semibold text-slate-300">Ambiente de Demonstração</span>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Authentication & Fast Profile Switcher */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-lg space-y-8"
        >
          {/* Header */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cepi-navy-50 text-cepi-navy text-xs font-bold">
              <span>Acesso ao Sistema CEPI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Seja bem-vindo(a)
            </h2>
            <p className="text-sm text-slate-500">
              Faça login com sua conta ou clique em um dos perfis para entrar na demonstração.
            </p>
          </div>

          {/* Login Form */}
          <GlassCard className="p-6 sm:p-8 space-y-5 bg-white/95 border-slate-200/90 shadow-xl">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-tight flex items-center justify-between">
                  <span>E-mail institucional / Usuário</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15 outline-none transition-all text-slate-800"
                    placeholder="seu.email@pequenaisa.com.br"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-tight flex items-center justify-between">
                  <span>Senha de Acesso</span>
                  <span className="text-[11px] font-medium text-cepi-sky hover:underline cursor-pointer">
                    Esqueceu a senha?
                  </span>
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15 outline-none transition-all text-slate-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Entrar no CEPI Gestão
              </Button>
            </form>
          </GlassCard>

          {/* Quick Profile Selection Cards (Commercial Demo Highlight) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Entrada Direta por Perfil (Modo Demonstração)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">1 clique para navegar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {rolesList.map((roleKey) => {
                const meta = ROLES_METADATA[roleKey];
                const isSelected = selectedRole === roleKey;

                return (
                  <motion.button
                    key={roleKey}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleQuickSelect(roleKey)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cepi-navy-50/90 border-cepi-navy text-cepi-navy shadow-sm ring-1 ring-cepi-navy'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border shadow-2xs shrink-0 ${meta.accentBg}`}>
                      {roleIcons[roleKey]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold truncate">{meta.label}</p>
                        {roleKey === 'professor' && (
                          <Badge variant="gold" size="sm" className="py-0 px-1 text-[9px]">
                            Destaque
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{meta.badgeLabel}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
