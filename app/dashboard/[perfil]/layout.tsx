'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { RoleSwitcherModal } from '@/components/layout/RoleSwitcherModal';
import { PageTransition } from '@/components/ui/PageTransition';
import { MOCK_USERS } from '@/lib/mock-data/users';
import { UserRole } from '@/lib/types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const rawRole = (params?.perfil as string) || 'professor';
  const role: UserRole = ['professor', 'diretor', 'secretaria', 'responsavel', 'aluno'].includes(rawRole)
    ? (rawRole as UserRole)
    : 'professor';

  const currentUser = MOCK_USERS[role] || MOCK_USERS.professor;

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar Navigation (Desktop Persistent + Mobile Drawer) */}
      <DashboardSidebar
        role={role}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <DashboardHeader
          user={currentUser}
          role={role}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
        />

        {/* Dashboard Dynamic Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>

      {/* Fast Role Switcher Modal (Available on all dashboard pages) */}
      <RoleSwitcherModal
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        currentRole={role}
      />
    </div>
  );
}
