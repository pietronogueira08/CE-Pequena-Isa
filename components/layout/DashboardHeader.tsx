'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { UserProfile, UserRole } from '@/lib/types';
import { ROLES_METADATA } from '@/lib/constants/theme';
import {
  Bell,
  Calendar,
  Sparkles,
  ChevronDown,
  LogOut,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  user: UserProfile;
  role: UserRole;
  onOpenRoleSwitcher: () => void;
}

export function DashboardHeader({ user, role, onOpenRoleSwitcher }: DashboardHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleMeta = ROLES_METADATA[role] || ROLES_METADATA.professor;

  const mockNotifications = [
    {
      id: 'notif-1',
      title: 'Conselho de Classe agendado',
      time: 'Há 25 minutos',
      unread: true,
      icon: <Calendar className="w-4 h-4 text-cepi-sky" />,
    },
    {
      id: 'notif-2',
      title: '3 novas ocorrências registradas',
      time: 'Há 2 horas',
      unread: true,
      icon: <AlertCircle className="w-4 h-4 text-cepi-orange" />,
    },
    {
      id: 'notif-3',
      title: 'Fechamento do 2º Bimestre em 5 dias',
      time: 'Ontem',
      unread: false,
      icon: <CheckCircle2 className="w-4 h-4 text-cepi-green" />,
    },
  ];

  return (
    <header className="sticky top-0 z-20 h-18 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Unit & Period Context */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-cepi-navy tracking-tight">
              {user.schoolUnit}
            </h2>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">Ano Letivo 2026</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            2º Bimestre • Ensino Fundamental & Médio
          </span>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden">
          <Badge variant="navy" size="sm">
            {roleMeta.label}
          </Badge>
        </div>
      </div>

      {/* Right: Quick Role Switcher Pill + Notifications + Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Fast Switch Pill (Demo Highlight) */}
        <button
          onClick={onOpenRoleSwitcher}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cepi-gold/20 via-amber-100/50 to-cepi-sky/20 border border-cepi-gold/40 text-cepi-navy hover:border-cepi-gold transition-all shadow-xs cursor-pointer text-xs font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Demo: Alternar Perfil</span>
          <Badge variant="gold" size="sm" className="py-0 px-1.5 text-[10px]">
            {roleMeta.badgeLabel}
          </Badge>
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-cepi-navy hover:bg-slate-100 transition-colors"
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-30 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-cepi-navy">Notificações Recentes</span>
                    <span className="text-[11px] font-semibold text-cepi-sky cursor-pointer hover:underline">
                      Marcar lidas
                    </span>
                  </div>

                  <div className="space-y-2">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                          n.unread ? 'bg-cepi-sky-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-white border border-slate-200/60 shadow-2xs shrink-0">
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-snug">{n.title}</p>
                          <span className="text-[10px] text-slate-500 font-medium">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-100 transition-colors"
          >
            <Avatar src={user.avatar} name={user.name} size="md" showStatus />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">{user.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">{user.roleTitle}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-30 p-2 space-y-1"
                >
                  <div className="px-3 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <Badge variant="navy" size="sm" className="mt-1.5">
                      {roleMeta.label}
                    </Badge>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenRoleSwitcher();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <Layers className="w-4 h-4 text-cepi-sky" />
                    Trocar Perfil de Demonstração
                  </button>

                  <button
                    onClick={() => router.push('/login')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Encerrar Sessão
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
