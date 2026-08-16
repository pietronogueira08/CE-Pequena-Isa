'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_USERS } from '@/lib/mock-data/users';
import { MOCK_CLASSES } from '@/lib/mock-data/school';
import { INITIAL_INCIDENTS } from '@/lib/mock-data/academic';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  AlertCircle,
  FileBarChart,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function DiretorDashboardPage() {
  const director = MOCK_USERS.diretor;

  // School-wide analytics data
  const schoolPerformance = [
    { turma: '6º Ano', mediaGeral: 8.1, meta: 7.5, evasao: '0%' },
    { turma: '7º Ano', mediaGeral: 7.9, meta: 7.5, evasao: '0%' },
    { turma: '8º Ano', mediaGeral: 7.6, meta: 7.5, evasao: '0.5%' },
    { turma: '9º Ano', mediaGeral: 8.4, meta: 7.5, evasao: '0%' },
    { turma: '1º Ano EM', mediaGeral: 8.0, meta: 7.5, evasao: '0%' },
  ];

  const bimesterEvolution = [
    { periodo: 'Fev', frequencia: 97.5, media: 7.6 },
    { periodo: 'Mar', frequencia: 96.8, media: 7.8 },
    { periodo: 'Abr', frequencia: 95.4, media: 8.0 },
    { periodo: 'Mai', frequencia: 96.2, media: 8.1 },
    { periodo: 'Jun', frequencia: 97.1, media: 8.3 },
    { periodo: 'Ago', frequencia: 96.4, media: 8.2 },
  ];

  return (
    <div className="space-y-8">
      {/* Executive Welcome Banner */}
      <GlassCard variant="navy" className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cepi-gold/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cepi-gold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Diretoria Executiva & Gestão Pedagógica</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Painel de Gestão Estratégica
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Bem-vinda, <strong className="text-white">{director.name}</strong>. Panorama consolidado
              do <strong>CEPI Unidade Grussaí</strong> no 2º Bimestre de 2026.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="gold" size="md" className="py-1.5 px-3">
              Taxa de Retenção: 99.4%
            </Badge>
          </div>
        </div>
      </GlassCard>

      {/* Institutional KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total de Alunos"
          value="480"
          subtitle="Capacidade instalada: 520"
          icon={<Users className="w-5 h-5 text-cepi-navy" />}
          accentColor="navy"
          trend={{ value: '+14% este ano', isPositive: true }}
        />
        <StatCard
          title="Corpo Docente"
          value="34"
          subtitle="100% pós-graduados"
          icon={<GraduationCap className="w-5 h-5 text-cepi-sky" />}
          accentColor="sky"
        />
        <StatCard
          title="Frequência Global"
          value="96.4%"
          subtitle="Meta institucional superada"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
          trend={{ value: '+1.2%', isPositive: true }}
        />
        <StatCard
          title="Índice de Excelência"
          value="9.2 / 10"
          subtitle="Avaliação NPS das famílias"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          accentColor="gold"
          trend={{ value: 'Nível Diamante', isPositive: true }}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Desempenho por Série (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Média Geral por Ano Escolar</h3>
                <p className="text-xs text-slate-500">Comparativo com a meta pedagógica de 7.5 pts</p>
              </div>
              <Badge variant="navy">2º Bimestre 2026</Badge>
            </div>

            <div className="h-72 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={schoolPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="turma" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="mediaGeral" name="Média Atingida" fill="#1B3A6B" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="meta" name="Meta Institucional" fill="#F4C430" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Roster of Classes */}
          <GlassCard className="p-6" id="turmas">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Quadro Resumo das Turmas</h3>
              <span className="text-xs text-slate-500 font-medium">5 turmas ativas</span>
            </div>

            <div className="mt-4 space-y-2.5">
              {MOCK_CLASSES.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cepi-navy-50 text-cepi-navy flex items-center justify-center font-bold font-mono">
                      {cls.name.split(' ')[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{cls.name}</h4>
                      <p className="text-slate-500 text-[11px]">{cls.room} • {cls.shift}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <span className="font-bold text-slate-800">{cls.totalStudents} alunos</span>
                      <p className="text-[10px] text-emerald-600 font-semibold">96.8% pres.</p>
                    </div>
                    <Badge variant="green" size="sm">
                      Média 8.1
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Evolution Line Chart & Feed of Incidents (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Evolução de Frequência (%)</h3>
                <p className="text-xs text-slate-500">Histórico de presença escolar no semestre</p>
              </div>
            </div>

            <div className="h-60 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bimesterEvolution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="frequencia"
                    name="Taxa de Frequência"
                    stroke="#4C9A4C"
                    strokeWidth={3}
                    dot={{ fill: '#4C9A4C', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* School-wide Incidents Summary */}
          <GlassCard className="p-6" id="ocorrencias">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-900">Últimas Ocorrências Registradas</h3>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {INITIAL_INCIDENTS.map((inc) => (
                <div key={inc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{inc.studentName}</span>
                    <span className="text-[11px] text-slate-400">{inc.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{inc.title}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500 font-medium">{inc.reportedBy}</span>
                    {inc.type === 'elogio' ? (
                      <Badge variant="green" size="sm">Elogio</Badge>
                    ) : (
                      <Badge variant="orange" size="sm">Atenção</Badge>
                    )}
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
