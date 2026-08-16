'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_USERS } from '@/lib/mock-data/users';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mock-data/academic';
import {
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  Star,
  CheckSquare,
  FileText,
} from 'lucide-react';

export default function AlunoDashboardPage() {
  const student = MOCK_USERS.aluno;

  const todayClasses = [
    { horario: '07:30 - 08:20', disciplina: 'Língua Portuguesa', prof: 'Profª Helena Fontes', sala: 'Sala 102' },
    { horario: '08:20 - 09:10', disciplina: 'Língua Portuguesa', prof: 'Profª Helena Fontes', sala: 'Sala 102' },
    { horario: '09:30 - 10:20', disciplina: 'Matemática', prof: 'Prof. Carlos Alberto', sala: 'Sala 102' },
    { horario: '10:20 - 11:10', disciplina: 'Ciências', prof: 'Profª Mariana Lima', sala: 'Lab de Ciências' },
    { horario: '11:10 - 12:00', disciplina: 'História', prof: 'Prof. Thiago Ramos', sala: 'Sala 102' },
  ];

  const pendingHomework = [
    { title: 'Crônica Narrativa sobre Grussaí', subject: 'Língua Portuguesa', due: 'Amanhã, 17/08', done: false },
    { title: 'Exercícios de Frações pág. 52', subject: 'Matemática', due: 'Quarta, 19/08', done: true },
    { title: 'Relatório do Experimento de Densidade', subject: 'Ciências', due: 'Sexta, 21/08', done: false },
  ];

  const achievements = [
    {
      title: 'Destaque em Redação',
      desc: 'Nota 9.5 na Prova 1',
      icon: <Award className="w-6 h-6 text-amber-700" />,
      color: 'bg-amber-50 text-amber-950 border-amber-200',
    },
    {
      title: 'Presença Ouro',
      desc: '100% de presença em Agosto',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-700" />,
      color: 'bg-emerald-50 text-emerald-950 border-emerald-200',
    },
    {
      title: 'Leitor Voraz',
      desc: '3 livros lidos na biblioteca',
      icon: <BookOpen className="w-6 h-6 text-cepi-sky-700" />,
      color: 'bg-sky-50 text-sky-950 border-sky-200',
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
              <span>Espaço do Estudante • CEPI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Olá, {student.name}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Você tem <strong>5 aulas hoje</strong> e <strong>2 tarefas para entregar</strong> esta semana.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Sequência: 12 dias presentes</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Minha Média"
          value="8.9"
          subtitle="Top 5 da turma"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          accentColor="gold"
          trend={{ value: 'Acima da meta', isPositive: true }}
        />
        <StatCard
          title="Frequência"
          value="98.2%"
          subtitle="Apenas 2 faltas"
          icon={<CheckSquare className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <StatCard
          title="Tarefas Pendentes"
          value="2"
          subtitle="1 para amanhã"
          icon={<FileText className="w-5 h-5 text-orange-600" />}
          accentColor="orange"
        />
        <StatCard
          title="Conquistas"
          value="3"
          subtitle="Nível Ouro"
          icon={<Star className="w-5 h-5 text-cepi-sky" />}
          accentColor="sky"
        />
      </div>

      {/* Main Grid: Class Schedule & Homework (7 cols / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Today's Classes (7 cols) */}
        <div className="lg:col-span-7 space-y-6" id="horarios">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cepi-navy" />
                <h3 className="text-base font-bold text-slate-900">Horário das Aulas de Hoje</h3>
              </div>
              <Badge variant="navy">Segunda-feira</Badge>
            </div>

            <div className="mt-4 space-y-2.5">
              {todayClasses.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1.5 rounded-xl bg-cepi-navy-50 text-cepi-navy font-mono font-bold text-[11px] text-center">
                      {item.horario.split(' - ')[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.disciplina}</h4>
                      <p className="text-slate-500 text-[11px]">{item.prof} • {item.sala}</p>
                    </div>
                  </div>

                  <Badge variant={idx === 0 ? 'green' : 'slate'} size="sm">
                    {idx === 0 ? 'Em curso' : 'A seguir'}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Achievements / Gamification */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900">Destaques e Reconhecimento CEPI</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${ach.color} space-y-2 text-center flex flex-col items-center justify-center`}
                >
                  <div className="p-2.5 rounded-xl bg-white shadow-2xs">
                    {ach.icon}
                  </div>
                  <h4 className="text-xs font-extrabold">{ach.title}</h4>
                  <p className="text-[11px] opacity-80">{ach.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Homework & Mural (5 cols) */}
        <div className="lg:col-span-5 space-y-6" id="notas">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cepi-navy" />
                <h3 className="text-sm font-bold text-slate-900">Tarefas e Trabalhos</h3>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {pendingHomework.map((hw, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    hw.done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{hw.title}</span>
                    {hw.done ? (
                      <Badge variant="green" size="sm">Entregue</Badge>
                    ) : (
                      <Badge variant="orange" size="sm">Pendente</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{hw.subject}</span>
                    <span className="font-bold text-amber-800">{hw.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* School Announcements */}
          <GlassCard className="p-6" id="avisos">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Mural da Escola</h3>
            </div>

            <div className="mt-3 space-y-2.5">
              {MOCK_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="text-xs font-bold text-cepi-navy">{ann.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{ann.summary}</p>
                  <p className="text-[10px] text-slate-400 pt-0.5">{ann.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
