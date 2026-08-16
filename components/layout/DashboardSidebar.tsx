'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CepiLogo } from '../brand/CepiLogo';
import { Badge } from '../ui/Badge';
import { ROLES_METADATA } from '@/lib/constants/theme';
import { UserRole } from '@/lib/types';
import {
  LayoutDashboard,
  BookOpenCheck,
  CheckSquare,
  Award,
  AlertCircle,
  BarChart3,
  Users2,
  CalendarDays,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ArrowLeftRight,
  X,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface DashboardSidebarProps {
  role: UserRole;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenRoleSwitcher?: () => void;
}

export function DashboardSidebar({
  role,
  isMobileOpen = false,
  onCloseMobile,
  onOpenRoleSwitcher,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const roleMeta = ROLES_METADATA[role] || ROLES_METADATA.professor;

  const navItemsByRole: Record<UserRole, NavItem[]> = {
    professor: [
      { label: 'Visão Geral', href: '/dashboard/professor', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Diário de Classe', href: '/dashboard/professor/diario', icon: <BookOpenCheck className="w-5 h-5" /> },
      { label: 'Fazer Chamada', href: '/dashboard/professor/chamada', icon: <CheckSquare className="w-5 h-5" />, badge: 'Hoje' },
      { label: 'Lançamento de Notas', href: '/dashboard/professor/notas', icon: <Award className="w-5 h-5" /> },
      { label: 'Ocorrências', href: '/dashboard/professor/ocorrencias', icon: <AlertCircle className="w-5 h-5" />, badge: '4' },
    ],
    diretor: [
      { label: 'Painel Executivo', href: '/dashboard/diretor', icon: <BarChart3 className="w-5 h-5" /> },
      { label: 'Desempenho Geral', href: '/dashboard/diretor#turmas', icon: <Award className="w-5 h-5" /> },
      { label: 'Ocorrências Gerais', href: '/dashboard/diretor#ocorrencias', icon: <AlertCircle className="w-5 h-5" /> },
    ],
    secretaria: [
      { label: 'Painel Secretaria', href: '/dashboard/secretaria', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Matrículas', href: '/dashboard/secretaria#matriculas', icon: <Users2 className="w-5 h-5" />, badge: 'Novas' },
      { label: 'Financeiro', href: '/dashboard/secretaria#financeiro', icon: <DollarSign className="w-5 h-5" /> },
      { label: 'Calendário Letivo', href: '/dashboard/secretaria#agenda', icon: <CalendarDays className="w-5 h-5" /> },
    ],
    responsavel: [
      { label: 'Portal da Família', href: '/dashboard/responsavel', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Boletim Escolar', href: '/dashboard/responsavel#boletim', icon: <Award className="w-5 h-5" /> },
      { label: 'Frequência', href: '/dashboard/responsavel#frequencia', icon: <CheckSquare className="w-5 h-5" /> },
      { label: 'Comunicados', href: '/dashboard/responsavel#comunicados', icon: <Bell className="w-5 h-5" />, badge: '3' },
    ],
    aluno: [
      { label: 'Meu Espaço', href: '/dashboard/aluno', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Minhas Aulas', href: '/dashboard/aluno#horarios', icon: <CalendarDays className="w-5 h-5" /> },
      { label: 'Notas e Tarefas', href: '/dashboard/aluno#notas', icon: <Award className="w-5 h-5" /> },
      { label: 'Mural CEPI', href: '/dashboard/aluno#avisos', icon: <Sparkles className="w-5 h-5" /> },
    ],
  };

  const currentNavItems = navItemsByRole[role] || navItemsByRole.professor;

  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (isDrawer = false) => (
    <div className="flex flex-col justify-between h-full select-none">
      {/* Top Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link
          href={roleMeta.defaultRoute}
          onClick={handleNavClick}
          className="flex items-center gap-2 overflow-hidden"
        >
          <CepiLogo size="sm" showText={isDrawer || !collapsed} />
        </Link>

        {isDrawer ? (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Role Badge Indicator */}
      <div
        className={cn(
          'px-4 py-3 border-b border-slate-100/60 bg-slate-50/50',
          !isDrawer && collapsed && 'text-center px-2'
        )}
      >
        {!isDrawer && collapsed ? (
          <div className="w-8 h-8 rounded-full bg-cepi-navy-50 text-cepi-navy flex items-center justify-center font-bold text-xs mx-auto">
            {role[0].toUpperCase()}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Perfil Ativo
            </span>
            <Badge variant="navy" size="sm" dot>
              {roleMeta.label}
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {currentNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                'group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 relative',
                isActive
                  ? 'bg-cepi-navy text-white shadow-md shadow-cepi-navy/20 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
                !isDrawer && collapsed && 'justify-center px-0'
              )}
            >
              <div
                className={cn(
                  'shrink-0 transition-transform group-hover:scale-110',
                  isActive ? 'text-cepi-gold' : 'text-slate-500'
                )}
              >
                {item.icon}
              </div>

              {(isDrawer || !collapsed) && <span className="flex-1 truncate">{item.label}</span>}

              {(isDrawer || !collapsed) && item.badge && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] font-bold rounded-full',
                    isActive ? 'bg-cepi-gold text-slate-950' : 'bg-cepi-sky-100 text-cepi-sky-700'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Demo Controls & Role Quick Switcher */}
      <div className="p-3 border-t border-slate-100 space-y-2 bg-gradient-to-b from-transparent to-slate-50/80">
        {onOpenRoleSwitcher && (
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onOpenRoleSwitcher();
            }}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-cepi-navy bg-cepi-gold-50/90 border border-cepi-gold/50 hover:bg-cepi-gold-100 transition-all shadow-xs cursor-pointer',
              !isDrawer && collapsed ? 'justify-center p-2' : ''
            )}
            title="Alternar Perfil Demo"
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-700 shrink-0" />
            {(isDrawer || !collapsed) && <span>Alternar Perfil (Demo)</span>}
          </button>
        )}

        <button
          onClick={() => router.push('/login')}
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer',
            !isDrawer && collapsed ? 'justify-center p-2' : ''
          )}
          title="Encerrar Sessão"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(isDrawer || !collapsed) && <span>Sair para o Login</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (>= lg) */}
      <aside
        className={cn(
          'hidden lg:flex flex-col justify-between h-screen sticky top-0 bg-white/95 backdrop-blur-xl border-r border-slate-200/80 z-30 transition-all duration-300 shadow-sm shrink-0',
          collapsed ? 'w-20' : 'w-64 xl:w-72'
        )}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile / Tablet Drawer (< lg) with AnimatePresence */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Sliding Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-72 max-w-[80vw] h-full bg-white shadow-2xl z-10 border-r border-slate-200"
            >
              {sidebarContent(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
