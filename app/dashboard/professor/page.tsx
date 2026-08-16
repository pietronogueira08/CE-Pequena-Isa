'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_USERS } from '@/lib/mock-data/users';
import { MOCK_CLASSES } from '@/lib/mock-data/school';
import { INITIAL_DIARY_ENTRIES, INITIAL_INCIDENTS } from '@/lib/mock-data/academic';
import {
  Users,
  Calendar,
  Clock,
  BookOpenCheck,
  CheckSquare,
  Award,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function ProfessorDashboardPage() {
  const teacher = MOCK_USERS.professor;
  const [selectedClassId, setSelectedClassId] = useState('turma-6a');

  // Chart data: Média de notas por turma
  const performanceData = [
    { turma: '6º Ano A', media: 7.8, alunos: 24, presenca: '95%' },
    { turma: '7º Ano B', media: 8.2, alunos: 22, presenca: '98%' },
    { turma: '8º Ano A', media: 7.4, alunos: 26, presenca: '92%' },
  ];

  // Schedule for today
  const todaySchedule = [
    {
      horario: '07:30 - 09:10',
      turma: '6º Ano A',
      turmaId: 'turma-6a',
      disciplina: 'Língua Portuguesa',
      sala: 'Sala 102',
      status: 'concluida',
      chamadaFeita: true,
    },
    {
      horario: '09:30 - 11:10',
      turma: '7º Ano B',
      turmaId: 'turma-7b',
      disciplina: 'Língua Portuguesa',
      sala: 'Sala 105',
      status: 'em_andamento',
      chamadaFeita: false,
    },
    {
      horario: '11:10 - 12:00',
      turma: '8º Ano A',
      turmaId: 'turma-8a',
      disciplina: 'Redação & Literatura',
      sala: 'Sala 201',
      status: 'proxima',
      chamadaFeita: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <GlassCard variant="navy" className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cepi-gold/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cepi-gold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel do Docente • CEPI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Olá, {teacher.name}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Você tem <strong className="text-white">3 aulas hoje</strong>. Sua próxima turma é o{' '}
              <strong className="text-cepi-gold">7º Ano B</strong> às 09:30.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/professor/chamada">
              <Button variant="gold" size="md" leftIcon={<CheckSquare className="w-4 h-4" />}>
                Realizar Chamada
              </Button>
            </Link>
            <Link href="/dashboard/professor/diario">
              <Button
                variant="outline"
                size="md"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                leftIcon={<BookOpenCheck className="w-4 h-4" />}
              >
                Novo Registro
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total de Alunos"
          value="72"
          subtitle="Em 3 turmas ativas"
          icon={<Users className="w-5 h-5 text-cepi-navy" />}
          accentColor="navy"
        />
        <StatCard
          title="Frequência Média"
          value="95.2%"
          subtitle="Meta institucional: 90%"
          icon={<CheckSquare className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
          trend={{ value: '+1.8% este mês', isPositive: true }}
        />
        <StatCard
          title="Média Geral"
          value="7.8"
          subtitle="2º Bimestre em curso"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          accentColor="gold"
          trend={{ value: '+0.3 pts', isPositive: true }}
        />
        <StatCard
          title="Ocorrências"
          value="4"
          subtitle="1 pendente de retorno"
          icon={<AlertCircle className="w-5 h-5 text-orange-600" />}
          accentColor="orange"
        />
      </div>

      {/* Main Grid: Today's Schedule + Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Today's Schedule & Quick Action Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cepi-navy-50 text-cepi-navy">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Aulas de Hoje</h3>
                  <p className="text-xs text-slate-500">Cronograma diário e status de chamada</p>
                </div>
              </div>
              <Badge variant="navy" size="sm">
                Segunda-feira
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              {todaySchedule.map((item, idx) => {
                const statusStyles = {
                  concluida: {
                    badge: <Badge variant="green">Concluída</Badge>,
                    bg: 'bg-slate-50/60 border-slate-200/60 opacity-80',
                  },
                  em_andamento: {
                    badge: <Badge variant="gold" dot>Em Andamento</Badge>,
                    bg: 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-300/30',
                  },
                  proxima: {
                    badge: <Badge variant="sky">Próxima</Badge>,
                    bg: 'bg-white border-slate-200 hover:border-slate-300',
                  },
                }[item.status];

                return (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${statusStyles?.bg}`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/80 text-center shrink-0 shadow-2xs">
                        <span className="text-[11px] font-extrabold text-cepi-navy block leading-none">
                          {item.horario.split(' - ')[0]}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">
                          {item.horario.split(' - ')[1]}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{item.turma}</h4>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-600 font-medium">{item.disciplina}</span>
                        </div>
                        <p className="text-xs text-slate-500">{item.sala}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {statusStyles?.badge}
                      <Link href={`/dashboard/professor/chamada?turma=${item.turmaId}`}>
                        <Button
                          variant={item.chamadaFeita ? 'secondary' : 'primary'}
                          size="sm"
                        >
                          {item.chamadaFeita ? 'Ver Chamada' : 'Fazer Chamada'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Quick Shortcuts Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/professor/notas" className="block group">
              <GlassCard hoverEffect className="p-5 border-l-4 border-l-cepi-navy">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cepi-navy-50 text-cepi-navy group-hover:bg-cepi-navy group-hover:text-white transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-3">Lançamento de Notas</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Grade editável com cálculo automático de média bimestral.
                </p>
              </GlassCard>
            </Link>

            <Link href="/dashboard/professor/ocorrencias" className="block group">
              <GlassCard hoverEffect className="p-5 border-l-4 border-l-cepi-orange">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-3">Mural de Ocorrências</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Registros disciplinares, atrasos e elogios pedagógicos.
                </p>
              </GlassCard>
            </Link>
          </div>
        </div>

        {/* Right: Class Performance Chart & Recent Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Desempenho por Turma</h3>
                <p className="text-xs text-slate-500">Média geral das avaliações do 2º Bimestre</p>
              </div>
              <Badge variant="gold">Meta: 7.0</Badge>
            </div>

            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="turma" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [`${value} pts`, 'Média da Turma']}
                  />
                  <Bar dataKey="media" radius={[8, 8, 0, 0]}>
                    {performanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#1B3A6B' : index === 1 ? '#F4C430' : '#4FA8D8'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
              {performanceData.map((p, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[11px] text-slate-500 font-medium">{p.turma}</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">{p.media}</p>
                  <span className="text-[10px] text-emerald-600 font-bold">{p.presenca} freq.</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Classroom Logs */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Últimos Diários Registrados</h3>
              <Link
                href="/dashboard/professor/diario"
                className="text-xs font-bold text-cepi-sky hover:underline"
              >
                Ver todos
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {INITIAL_DIARY_ENTRIES.slice(0, 2).map((diary) => (
                <div key={diary.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cepi-navy">{diary.className}</span>
                    <span className="text-slate-400">{diary.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">{diary.title}</p>
                  <div className="flex items-center gap-1.5 pt-1">
                    {diary.bnccCodes.slice(0, 2).map((code) => (
                      <span key={code} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                        {code}
                      </span>
                    ))}
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
