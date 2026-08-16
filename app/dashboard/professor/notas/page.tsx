'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { INITIAL_GRADES_6A } from '@/lib/mock-data/academic';
import { MOCK_CLASSES } from '@/lib/mock-data/school';
import { GradeItem } from '@/lib/types';
import {
  Award,
  Save,
  Calculator,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GradeEntryPage() {
  const { success } = useToast();
  const [selectedClassId, setSelectedClassId] = useState('turma-6a');
  const [bimester, setBimester] = useState('2');
  const [grades, setGrades] = useState<GradeItem[]>(INITIAL_GRADES_6A);
  const [isSaving, setIsSaving] = useState(false);

  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId) || MOCK_CLASSES[0];

  // Helper to recalculate average dynamically in real-time
  const calculateMedia = (p1: number | null, trab: number | null, p2: number | null, rec: number | null): number => {
    const validScores: number[] = [];
    if (p1 !== null && !isNaN(p1)) validScores.push(p1);
    if (trab !== null && !isNaN(trab)) validScores.push(trab);
    if (p2 !== null && !isNaN(p2)) validScores.push(p2);

    if (validScores.length === 0) return 0;
    const baseAverage = validScores.reduce((acc, curr) => acc + curr, 0) / validScores.length;

    // If recovery is provided and higher than base average
    if (rec !== null && !isNaN(rec) && rec > baseAverage) {
      return Number(((baseAverage + rec) / 2).toFixed(1));
    }

    return Number(baseAverage.toFixed(1));
  };

  const getSituacao = (media: number): GradeItem['situacao'] => {
    if (media >= 7.0) return 'aprovado';
    if (media >= 5.0) return 'em_recuperacao';
    return 'reprovado';
  };

  const handleScoreChange = (
    studentId: string,
    field: 'p1' | 'trabalho' | 'p2' | 'recuperacao',
    rawVal: string
  ) => {
    const val = rawVal === '' ? null : Math.min(10, Math.max(0, parseFloat(rawVal) || 0));

    setGrades((prev) =>
      prev.map((item) => {
        if (item.studentId !== studentId) return item;

        const updated = {
          ...item,
          [field]: val,
        };

        const newMedia = calculateMedia(updated.p1, updated.trabalho, updated.p2, updated.recuperacao ?? null);
        updated.media = newMedia;
        updated.situacao = getSituacao(newMedia);

        return updated;
      })
    );
  };

  const handleSaveGrades = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success(
        'Notas Salvas com Sucesso!',
        `Boletim do ${selectedClass.name} atualizado. As médias e relatórios foram recalculados instantaneamente.`
      );
    }, 500);
  };

  // Class Summary Metrics
  const classAverage = (
    grades.reduce((acc, curr) => acc + (curr.media || 0), 0) / grades.length
  ).toFixed(1);

  const approvedCount = grades.filter((g) => (g.media || 0) >= 7.0).length;
  const recoveryCount = grades.filter((g) => (g.media || 0) >= 5.0 && (g.media || 0) < 7.0).length;
  const criticalCount = grades.filter((g) => (g.media || 0) < 5.0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lançamento de Notas
            </h1>
            <Badge variant="gold">
              Cálculo em Tempo Real
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Grade oficial de notas bimestrais com recálculo automático de médias e destaque de recuperação.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gold"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveGrades}
          >
            Salvar Fechamento de Notas
          </Button>
        </div>
      </div>

      {/* Class Selector & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard className="p-4 lg:col-span-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full space-y-1">
            <label className="text-xs font-bold text-slate-600">Turma / Disciplina</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none cursor-pointer"
            >
              {MOCK_CLASSES.slice(0, 3).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — Língua Portuguesa
                </option>
              ))}
            </select>
          </div>

          <div className="w-full space-y-1">
            <label className="text-xs font-bold text-slate-600">Bimestre</label>
            <select
              value={bimester}
              onChange={(e) => setBimester(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none cursor-pointer"
            >
              <option value="1">1º Bimestre (Encerrado)</option>
              <option value="2">2º Bimestre (Em Aberto)</option>
              <option value="3">3º Bimestre (Previsto)</option>
              <option value="4">4º Bimestre (Previsto)</option>
            </select>
          </div>
        </GlassCard>

        {/* Live Metrics Matrix */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Média Geral</span>
            <span className="text-xl font-black text-cepi-navy mt-1">{classAverage}</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-emerald-700">Acima de 7.0</span>
            <span className="text-xl font-black text-emerald-700 mt-1">{approvedCount} alunos</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-amber-800">Recuperação</span>
            <span className="text-xl font-black text-amber-800 mt-1">{recoveryCount} alunos</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-rose-700">Abaixo de 5.0</span>
            <span className="text-xl font-black text-rose-700 mt-1">{criticalCount} alunos</span>
          </div>
        </div>
      </div>

      {/* Interactive Grades Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cepi-navy" />
            <h3 className="text-sm font-bold text-slate-900">
              Grade Avaliativa — {selectedClass.name} ({bimester}º Bimestre)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Fórmula: Média = (P1 + Trab + P2) / 3
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
                <th className="py-3 px-4 w-12 text-center">Nº</th>
                <th className="py-3 px-4 min-w-[200px]">Nome do Aluno</th>
                <th className="py-3 px-4 w-28 text-center">Prova 1 (P1)</th>
                <th className="py-3 px-4 w-28 text-center">Trabalho</th>
                <th className="py-3 px-4 w-28 text-center">Prova 2 (P2)</th>
                <th className="py-3 px-4 w-28 text-center">Recuperação</th>
                <th className="py-3 px-4 w-24 text-center bg-slate-100/70">Média</th>
                <th className="py-3 px-4 w-36 text-center">Situação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {grades.map((item, idx) => {
                const mediaVal = item.media ?? 0;
                const isPassing = mediaVal >= 7.0;
                const isRecovery = mediaVal >= 5.0 && mediaVal < 7.0;
                const isFailing = mediaVal < 5.0;

                return (
                  <tr
                    key={item.studentId}
                    className={cn(
                      'hover:bg-slate-50/70 transition-colors',
                      isFailing && 'bg-rose-50/20'
                    )}
                  >
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                      {String(idx + 1).padStart(2, '0')}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Mat: {item.matricula}</div>
                    </td>

                    {/* P1 Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={item.p1 ?? ''}
                        onChange={(e) => handleScoreChange(item.studentId, 'p1', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-cepi-navy focus:ring-1 focus:ring-cepi-navy outline-none"
                      />
                    </td>

                    {/* Trabalho Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={item.trabalho ?? ''}
                        onChange={(e) => handleScoreChange(item.studentId, 'trabalho', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-cepi-navy focus:ring-1 focus:ring-cepi-navy outline-none"
                      />
                    </td>

                    {/* P2 Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={item.p2 ?? ''}
                        onChange={(e) => handleScoreChange(item.studentId, 'p2', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-cepi-navy focus:ring-1 focus:ring-cepi-navy outline-none"
                      />
                    </td>

                    {/* Recuperação Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="-"
                        value={item.recuperacao ?? ''}
                        onChange={(e) => handleScoreChange(item.studentId, 'recuperacao', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-cepi-navy focus:ring-1 focus:ring-cepi-navy outline-none placeholder:text-slate-300"
                      />
                    </td>

                    {/* Calculated Average with color cues */}
                    <td className="py-3 px-4 text-center bg-slate-50/50">
                      <span
                        className={cn(
                          'text-sm font-black px-2.5 py-1 rounded-lg inline-block min-w-[40px]',
                          isPassing && 'text-emerald-700 bg-emerald-100/70',
                          isRecovery && 'text-amber-800 bg-amber-100/70',
                          isFailing && 'text-rose-700 bg-rose-100/80'
                        )}
                      >
                        {item.media?.toFixed(1) ?? '-'}
                      </span>
                    </td>

                    {/* Situation Badge */}
                    <td className="py-3 px-4 text-center">
                      {isPassing ? (
                        <Badge variant="green" size="sm">
                          Aprovado
                        </Badge>
                      ) : isRecovery ? (
                        <Badge variant="gold" size="sm">
                          Recuperação
                        </Badge>
                      ) : (
                        <Badge variant="rose" size="sm">
                          Abaixo da Média
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Guide */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>≥ 7.0 (Aprovado)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>5.0 a 6.9 (Recuperação)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>&lt; 5.0 (Crítico)</span>
            </span>
          </div>

          <span className="font-semibold text-cepi-navy">
            Digitação instantânea com validação automática
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
