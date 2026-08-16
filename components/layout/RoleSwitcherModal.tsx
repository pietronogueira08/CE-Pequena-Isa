'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '../ui/Modal';
import { ROLES_METADATA } from '@/lib/constants/theme';
import { UserRole } from '@/lib/types';
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
}

export function RoleSwitcherModal({ isOpen, onClose, currentRole }: RoleSwitcherModalProps) {
  const router = useRouter();

  const roleIcons = {
    professor: <GraduationCap className="w-6 h-6 text-cepi-navy" />,
    diretor: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    secretaria: <Building2 className="w-6 h-6 text-cepi-sky" />,
    responsavel: <Users className="w-6 h-6 text-emerald-600" />,
    aluno: <BookOpen className="w-6 h-6 text-orange-600" />,
  };

  const handleSelectRole = (role: UserRole) => {
    onClose();
    router.push(ROLES_METADATA[role].defaultRoute);
  };

  const rolesList: UserRole[] = ['professor', 'diretor', 'secretaria', 'responsavel', 'aluno'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Navegação Rápida entre Perfis (Demo)</span>
        </div>
      }
      description="Selecione um dos 5 perfis para demonstrar a visão específica ao cliente sem necessidade de relogar."
      size="lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {rolesList.map((roleKey) => {
          const meta = ROLES_METADATA[roleKey];
          const isCurrent = roleKey === currentRole;

          return (
            <motion.button
              key={roleKey}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectRole(roleKey)}
              className={cn(
                'flex items-start gap-4 p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer',
                isCurrent
                  ? 'bg-gradient-to-br from-cepi-navy-50/80 to-sky-50/50 border-cepi-navy shadow-md ring-2 ring-cepi-navy/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-xs'
              )}
            >
              <div
                className={cn(
                  'p-3 rounded-xl shrink-0 border shadow-2xs transition-transform group-hover:scale-110',
                  meta.accentBg
                )}
              >
                {roleIcons[roleKey]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-cepi-navy transition-colors">
                    {meta.label}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cepi-navy text-white">
                      Atual
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {meta.description}
                </p>
              </div>

              <div className="self-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-cepi-navy" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </Modal>
  );
}
