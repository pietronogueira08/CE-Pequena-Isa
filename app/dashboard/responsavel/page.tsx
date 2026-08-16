'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_USERS } from '@/lib/mock-data/users';
import { MOCK_ANNOUNCEMENTS, INITIAL_INCIDENTS } from '@/lib/mock-data/academic';
import {
  Users,
  Award,
  CheckSquare,
  Bell,
  Heart,
  Calendar,
  Sparkles,
  Download,
  BookOpen,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function ResponsavelDashboardPage() {
  const parent = MOCK_USERS.responsavel;

  // Student Report Card (Boletim do Lucas)
  const reportCard = [
    { subject: 'Língua Portuguesa', p1: 8.5, trab: 9.0, p2: 8.0, media: 8.5, faltas: 0, status: 'Aprovado' },
    { subject: 'Matemática', p1: 9.0, trab: 9.5, p2: 8.5, media: 9.0, faltas: 1, status: 'Aprovado' },
    { subject: 'Ciências Naturais', p1: 9.0, trab: 9.5, p2: 9.0, media: 9.2, faltas: 0, status: 'Aprovado' },
    { subject: 'História & Cultura', p1: 8.5, trab: 9.0, p2: 9.0, media: 8.8, faltas: 0, status: 'Aprovado' },
    { subject: 'Geografia do Brasil', p1: 8.0, trab: 8.5, p2: 8.0, media: 8.2, faltas: 1, status: 'Aprovado' },
    { subject: 'Língua Inglesa', p1: 9.5, trab: 10.0, p2: 9.5, media: 9.7, faltas: 0, status: 'Aprovado' },
  ];

  // Lucas' specific incidents & praises
  const studentIncidents = INITIAL_INCIDENTS.filter((i) => i.studentId === 'aluno-01');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <GlassCard variant="navy" className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cepi-green/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cepi-green-200 backdrop-blur-sm">
              <Users className="w-3.5 h-3.5" />
              <span>Portal da Família • CEPI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Acompanhamento de {parent.studentName}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Matrícula 2024.6A.014 • <strong>6º Ano A (Ensino Fundamental II)</strong> • Sala 102
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="green" size="md" className="py-1.5 px-3">
              Frequência: 98.2%
            </Badge>
          </div>
        </div>
      </GlassCard>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Média Geral"
          value="8.9"
          subtitle="2º Bimestre / 2026"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          accentColor="gold"
          trend={{ value: 'Excelente', isPositive: true }}
        />
        <StatCard
          title="Presença Escolar"
          value="98.2%"
          subtitle="Apenas 2 faltas no ano"
          icon={<CheckSquare className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <StatCard
          title="Elogios & Destaques"
          value="2"
          subtitle="Olimpíada de Português"
          icon={<Heart className="w-5 h-5 text-rose-500" />}
          accentColor="orange"
        />
        <StatCard
          title="Comunicados"
          value="3"
          subtitle="1 com confirmação pendente"
          icon={<Bell className="w-5 h-5 text-cepi-sky" />}
          accentColor="sky"
        />
      </div>

      {/* Boletim Digital & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Boletim Escolar Completo (8 cols) */}
        <div className="lg:col-span-8 space-y-6" id="boletim">
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cepi-navy" />
                <h3 className="text-base font-bold text-slate-900">
                  Boletim Escolar — 2º Bimestre 2026
                </h3>
              </div>
              <Badge variant="green">Em Aberto</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
                    <th className="py-3 px-4">Componente Curricular</th>
                    <th className="py-3 px-4 text-center">P1</th>
                    <th className="py-3 px-4 text-center">Trabalho</th>
                    <th className="py-3 px-4 text-center">P2</th>
                    <th className="py-3 px-4 text-center bg-slate-100/70">Média</th>
                    <th className="py-3 px-4 text-center">Faltas</th>
                    <th className="py-3 px-4 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {reportCard.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{row.subject}</td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-semibold">{row.p1}</td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-semibold">{row.trab}</td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-semibold">{row.p2}</td>
                      <td className="py-3.5 px-4 text-center bg-slate-50/50">
                        <span className="font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md text-xs">
                          {row.media.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{row.faltas}</td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge variant="green" size="sm">
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Critério de aprovação: Média mínima 7.0 e frequência mínima 75%.</span>
              <span className="font-semibold text-cepi-navy">Secretaria CEPI</span>
            </div>
          </GlassCard>

          {/* Student Specific Praises/Incidents */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900">Elogios & Registros do Aluno</h3>
            </div>

            <div className="mt-3 space-y-3">
              {studentIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-emerald-900">{inc.title}</h4>
                    <Badge variant="green" size="sm">
                      Destaque
                    </Badge>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{inc.description}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>{inc.reportedBy} ({inc.reportedRole})</span>
                    <span>{inc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Announcements & School Notices (4 cols) */}
        <div className="lg:col-span-4 space-y-6" id="comunicados">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cepi-navy" />
                <h3 className="text-sm font-bold text-slate-900">Mural de Avisos CEPI</h3>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {MOCK_ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cepi-navy">{ann.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.summary}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-amber-700 font-bold">{ann.date}</span>
                    <span className="text-slate-400">{ann.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
