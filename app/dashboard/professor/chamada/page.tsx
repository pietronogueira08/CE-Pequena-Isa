'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useToast } from '@/components/ui/Toast';
import { MOCK_STUDENTS_6A, MOCK_CLASSES } from '@/lib/mock-data/school';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Sparkles,
  Save,
  UserCheck,
  RotateCcw,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AttendanceStatus = 'presente' | 'ausente' | 'justificado';

export default function AttendancePage() {
  const { success, info } = useToast();
  const [selectedClassId, setSelectedClassId] = useState('turma-6a');
  const [date, setDate] = useState('2026-08-16');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Student Attendance State Dictionary: studentId -> status
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    MOCK_STUDENTS_6A.forEach((student, index) => {
      // Default: Most students present, 1 absent, 1 justified for demo realism
      if (index === 4) initial[student.id] = 'ausente';
      else if (index === 2) initial[student.id] = 'justificado';
      else initial[student.id] = 'presente';
    });
    return initial;
  });

  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId) || MOCK_CLASSES[0];

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    MOCK_STUDENTS_6A.forEach((student) => {
      updated[student.id] = 'presente';
    });
    setAttendance(updated);
    info('Todos Marcados!', 'Todos os alunos da turma foram definidos como Presentes.');
  };

  const handleSaveAttendance = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsSubmitted(true);

      // Subtle celebration confetti for premium touch
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#1B3A6B', '#F4C430', '#4FA8D8', '#4C9A4C'],
        });
      } catch (err) {
        // Fallback gracefully
      }

      success(
        'Chamada Registrada com Sucesso!',
        `Frequência do ${selectedClass.name} atualizada. Sincronizado com a Secretaria e Portal dos Pais.`
      );
    }, 600);
  };

  // Metrics calculation
  const total = MOCK_STUDENTS_6A.length;
  const presentesCount = Object.values(attendance).filter((s) => s === 'presente').length;
  const ausentesCount = Object.values(attendance).filter((s) => s === 'ausente').length;
  const justificadosCount = Object.values(attendance).filter((s) => s === 'justificado').length;
  const percentualPresenca = total > 0 ? ((presentesCount / total) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Chamada & Frequência
            </h1>
            <Badge variant="green" dot>
              Tempo Real
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registro diário de presença com notificação automática aos responsáveis em caso de falta.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={<UserCheck className="w-4 h-4 text-emerald-600" />}
            onClick={handleMarkAllPresent}
          >
            Marcar Todos Presentes
          </Button>

          <Button
            variant="gold"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveAttendance}
          >
            {isSubmitted ? 'Atualizar Chamada' : 'Salvar Chamada'}
          </Button>
        </div>
      </div>

      {/* Class & Date Selector + Live Stats Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Controls (5 cols) */}
        <GlassCard className="p-4 lg:col-span-5 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full space-y-1">
            <label className="text-xs font-bold text-slate-600">Turma</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none"
            >
              {MOCK_CLASSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.shift}) — {c.room}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full space-y-1">
            <label className="text-xs font-bold text-slate-600">Data da Chamada</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none"
            />
          </div>
        </GlassCard>

        {/* Live Attendance Counter Pill Matrix (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Alunos</span>
            <span className="text-xl font-black text-slate-900 mt-1">{total}</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Presentes</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-emerald-700">{presentesCount}</span>
              <span className="text-xs font-bold text-emerald-600">({percentualPresenca}%)</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Ausentes</span>
            <span className="text-xl font-black text-rose-700 mt-1">{ausentesCount}</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Justificados</span>
            <span className="text-xl font-black text-amber-800 mt-1">{justificadosCount}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Banner if Saved */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Chamada do dia {date} confirmada e gravada no sistema.</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Status: Sincronizado</span>
        </motion.div>
      )}

      {/* Student List */}
      <GlassCard className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cepi-navy" />
            <h3 className="text-sm font-bold text-slate-900">
              Lista Nominal dos Alunos ({MOCK_STUDENTS_6A.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Clique nos botões de cada aluno para alternar o status
          </span>
        </div>

        <div className="space-y-2.5">
          {MOCK_STUDENTS_6A.map((student, idx) => {
            const currentStatus = attendance[student.id] || 'presente';

            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={cn(
                  'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all',
                  currentStatus === 'presente' && 'bg-white border-slate-200/90 shadow-2xs',
                  currentStatus === 'ausente' && 'bg-rose-50/40 border-rose-200 ring-1 ring-rose-200',
                  currentStatus === 'justificado' && 'bg-amber-50/40 border-amber-200 ring-1 ring-amber-200'
                )}
              >
                {/* Student Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-xs font-mono text-slate-400 w-5 text-right font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Avatar src={student.avatar} name={student.name} size="sm" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{student.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-mono">Mat: {student.matricula}</span>
                      <span>•</span>
                      <span>Resp: {student.responsibleName}</span>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(student.id, 'presente')}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                      currentStatus === 'presente'
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'bg-slate-100 hover:bg-emerald-100 text-slate-600'
                    )}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Presente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student.id, 'ausente')}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                      currentStatus === 'ausente'
                        ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                        : 'bg-slate-100 hover:bg-rose-100 text-slate-600'
                    )}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Ausente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student.id, 'justificado')}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
                      currentStatus === 'justificado'
                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                        : 'bg-slate-100 hover:bg-amber-100 text-slate-600'
                    )}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Justificado</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cepi-sky" />
            <span>Faltas notificam automaticamente o aplicativo dos responsáveis via WhatsApp & Push.</span>
          </div>
          <span className="font-semibold text-cepi-navy">CEPI Chamada Inteligente</span>
        </div>
      </GlassCard>
    </div>
  );
}
