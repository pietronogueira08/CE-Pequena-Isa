'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { MOCK_ENROLLMENTS, MOCK_FINANCIAL_SUMMARY, MOCK_ANNOUNCEMENTS } from '@/lib/mock-data/academic';
import { EnrollmentRecord } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Building2,
  Users2,
  DollarSign,
  CalendarDays,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  CreditCard,
  Calendar,
} from 'lucide-react';

export default function SecretariaDashboardPage() {
  const { success } = useToast();
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(MOCK_ENROLLMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchEnrollment, setSearchEnrollment] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    responsibleName: '',
    phone: '',
    email: '',
    gradeApplying: '6º Ano Fundamental II',
    monthlyFee: 850,
  });

  const handleCreateEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.responsibleName) return;

    setIsSaving(true);

    setTimeout(() => {
      const newEnrollment: EnrollmentRecord = {
        id: `enr-${Date.now()}`,
        studentName: formData.studentName,
        responsibleName: formData.responsibleName,
        phone: formData.phone || '(22) 99888-7766',
        email: formData.email || 'contato@familia.com',
        gradeApplying: formData.gradeApplying,
        status: 'matriculado',
        dateApplied: 'Hoje, ' + new Date().toLocaleDateString('pt-BR'),
        monthlyFee: Number(formData.monthlyFee),
        hasScholarship: false,
      };

      setEnrollments([newEnrollment, ...enrollments]);
      setIsSaving(false);
      setIsModalOpen(false);
      setFormData({
        studentName: '',
        responsibleName: '',
        phone: '',
        email: '',
        gradeApplying: '6º Ano Fundamental II',
        monthlyFee: 850,
      });

      success(
        'Matrícula Registrada!',
        `Aluno(a) ${newEnrollment.studentName} cadastrado(a) com sucesso na Secretaria.`
      );
    }, 450);
  };

  const filteredEnrollments = enrollments.filter(
    (item) =>
      item.studentName.toLowerCase().includes(searchEnrollment.toLowerCase()) ||
      item.responsibleName.toLowerCase().includes(searchEnrollment.toLowerCase()) ||
      item.gradeApplying.toLowerCase().includes(searchEnrollment.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <GlassCard variant="navy" className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cepi-sky/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cepi-sky-200 backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Secretaria Acadêmica & Administrativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Central de Atendimento & Matrículas
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Gestão de admissões escolares, controle financeiro ilustrativo e calendário de eventos.
            </p>
          </div>

          <Button
            variant="gold"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Nova Matrícula
          </Button>
        </div>
      </GlassCard>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Novas Matrículas"
          value="48"
          subtitle="Para o 2º Semestre"
          icon={<Users2 className="w-5 h-5 text-cepi-navy" />}
          accentColor="navy"
          trend={{ value: '+8% vs 2025', isPositive: true }}
        />
        <StatCard
          title="Arrecadação Mensal"
          value={formatCurrency(MOCK_FINANCIAL_SUMMARY.totalRevenueMonth)}
          subtitle="Referência: Agosto/2026"
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <StatCard
          title="Taxa de Adimplência"
          value="97.6%"
          subtitle="Apenas 8 mensalidades pendentes"
          icon={<CheckCircle2 className="w-5 h-5 text-cepi-sky" />}
          accentColor="sky"
          trend={{ value: 'Excelente', isPositive: true }}
        />
        <StatCard
          title="Eventos no Mês"
          value="6"
          subtitle="Próximo: Feira de Ciências"
          icon={<CalendarDays className="w-5 h-5 text-amber-600" />}
          accentColor="gold"
        />
      </div>

      {/* Enrollments & Finance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Enrollments Module (7 cols) */}
        <div className="lg:col-span-7 space-y-6" id="matriculas">
          <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Matrículas & Admissões Recentes</h3>
                <p className="text-xs text-slate-500">Solicitações de ingresso e documentações</p>
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar aluno..."
                  value={searchEnrollment}
                  onChange={(e) => setSearchEnrollment(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <AnimatePresence>
                {filteredEnrollments.map((enr) => (
                  <motion.div
                    key={enr.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900">{enr.studentName}</h4>
                        <p className="text-xs text-slate-500">
                          {enr.gradeApplying} • Resp: <strong className="text-slate-700">{enr.responsibleName}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {enr.status === 'matriculado' ? (
                          <Badge variant="green">Matriculado</Badge>
                        ) : enr.status === 'documentacao_pendente' ? (
                          <Badge variant="orange">Doc. Pendente</Badge>
                        ) : (
                          <Badge variant="sky">Fila de Espera</Badge>
                        )}
                        <span className="text-xs font-bold text-cepi-navy">
                          {formatCurrency(enr.monthlyFee)}/mês
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Tel: {enr.phone}</span>
                      <span>Solicitado em: {enr.dateApplied}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        {/* Right: Financial & Calendar Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Financial Overview Card */}
          <GlassCard className="p-6" id="financeiro">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Mensalidades Recentes</h3>
              </div>
              <Badge variant="green" size="sm">
                Ilustrativo
              </Badge>
            </div>

            <div className="mt-3 space-y-2.5">
              {MOCK_FINANCIAL_SUMMARY.recentPayments.map((pay) => (
                <div
                  key={pay.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-800">{pay.studentName}</h4>
                    <p className="text-[11px] text-slate-500">{pay.className} • Venc: {pay.dueDate}</p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">{formatCurrency(pay.amount)}</span>
                    {pay.status === 'pago' ? (
                      <span className="text-[10px] text-emerald-600 font-bold">Pago ({pay.payDate})</span>
                    ) : pay.status === 'pendente' ? (
                      <span className="text-[10px] text-amber-600 font-bold">A vencer</span>
                    ) : (
                      <span className="text-[10px] text-rose-600 font-bold">Em atraso</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Academic Calendar / Events */}
          <GlassCard className="p-6" id="agenda">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cepi-navy" />
                <h3 className="text-sm font-bold text-slate-900">Agenda de Eventos CEPI</h3>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {MOCK_ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cepi-navy">{ann.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{ann.summary}</p>
                  <p className="text-[11px] font-semibold text-amber-700 pt-1">{ann.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Modal: Nova Matrícula */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-cepi-navy" />
            <span>Cadastrar Nova Matrícula Escolar</span>
          </div>
        }
        description="Preencha os dados do estudante e do responsável financeiro para gerar o cadastro no sistema."
        size="md"
      >
        <form onSubmit={handleCreateEnrollment} className="space-y-4">
          <Input
            label="Nome Completo do Aluno *"
            placeholder="Ex: Mariana Peçanha Barcelos"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Nome do Responsável *"
              placeholder="Ex: Renata Peçanha"
              value={formData.responsibleName}
              onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
              required
            />
            <Input
              label="Telefone / WhatsApp *"
              placeholder="(22) 99888-1234"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Série Pretendida *</label>
              <select
                value={formData.gradeApplying}
                onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:border-cepi-navy outline-none cursor-pointer"
              >
                <option value="6º Ano Fundamental II">6º Ano Fundamental II</option>
                <option value="7º Ano Fundamental II">7º Ano Fundamental II</option>
                <option value="8º Ano Fundamental II">8º Ano Fundamental II</option>
                <option value="9º Ano Fundamental II">9º Ano Fundamental II</option>
                <option value="1º Ano Médio">1º Ano Ensino Médio</option>
              </select>
            </div>

            <Input
              label="Mensalidade Estimada (R$)"
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirmar Matrícula
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
