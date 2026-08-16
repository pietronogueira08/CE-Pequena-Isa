'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { PageHeaderNav } from '@/components/ui/PageHeaderNav';
import { INITIAL_INCIDENTS } from '@/lib/mock-data/academic';
import { MOCK_STUDENTS_6A, MOCK_CLASSES } from '@/lib/mock-data/school';
import { IncidentRecord } from '@/lib/types';
import {
  AlertCircle,
  Plus,
  Heart,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Filter,
  Send,
  MessageSquare,
  Search,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function IncidentsPage() {
  const { success } = useToast();
  const [incidents, setIncidents] = useState<IncidentRecord[]>(INITIAL_INCIDENTS);
  const [filterType, setFilterType] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    studentId: 'aluno-01',
    type: 'comportamental' as IncidentRecord['type'],
    severity: 'media' as IncidentRecord['severity'],
    title: '',
    description: '',
    notifiedParents: true,
  });

  const filteredIncidents = incidents.filter((item) => {
    const matchesType = filterType === 'todos' || item.type === filterType;
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsSaving(true);

    const studentObj = MOCK_STUDENTS_6A.find((s) => s.id === formData.studentId) || MOCK_STUDENTS_6A[0];

    setTimeout(() => {
      const newRecord: IncidentRecord = {
        id: `inc-${Date.now()}`,
        studentId: studentObj.id,
        studentName: studentObj.name,
        classId: 'turma-6a',
        className: '6º Ano A',
        type: formData.type,
        severity: formData.type === 'elogio' ? 'positiva' : formData.severity,
        title: formData.title,
        description: formData.description,
        reportedBy: 'Profª Helena Fontes',
        reportedRole: 'Docente de Língua Portuguesa',
        date: 'Hoje, ' + new Date().toLocaleDateString('pt-BR'),
        resolved: formData.type === 'elogio',
        notifiedParents: formData.notifiedParents,
      };

      setIncidents([newRecord, ...incidents]);
      setIsSaving(false);
      setIsModalOpen(false);
      setFormData({
        studentId: 'aluno-01',
        type: 'comportamental',
        severity: 'media',
        title: '',
        description: '',
        notifiedParents: true,
      });

      success(
        'Ocorrência Registrada!',
        `${newRecord.type === 'elogio' ? 'Elogio pedagógico' : 'Registro disciplinar'} para ${studentObj.name} salvo com sucesso.`
      );
    }, 450);
  };

  const getBadgeForType = (type: IncidentRecord['type']) => {
    switch (type) {
      case 'elogio':
        return <Badge variant="green" dot>Elogio Pedagógico</Badge>;
      case 'atraso':
        return <Badge variant="orange">Atraso / Pontualidade</Badge>;
      case 'comportamental':
        return <Badge variant="rose">Comportamento</Badge>;
      case 'desempenho':
        return <Badge variant="sky">Desempenho</Badge>;
      default:
        return <Badge variant="slate">Geral</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Back Button & Breadcrumbs */}
      <PageHeaderNav
        title="Ocorrências & Elogios Pedagógicos"
        subtitle="Canal transparente de comunicação disciplinar, elogios e observações de convivência escolar."
        backHref="/dashboard/professor"
        backLabel="Voltar ao Painel"
        breadcrumbs={[
          { label: 'Painel do Docente', href: '/dashboard/professor' },
          { label: 'Ocorrências' },
        ]}
        badgeText="Acompanhamento Integral"
        badgeVariant="navy"
        rightActions={
          <Button
            variant="gold"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Registrar Nova Ocorrência
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <GlassCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { key: 'todos', label: 'Todos os Registros' },
            { key: 'elogio', label: 'Elogios' },
            { key: 'comportamental', label: 'Comportamento' },
            { key: 'atraso', label: 'Atrasos' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer',
                filterType === tab.key
                  ? 'bg-cepi-navy text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por aluno ou ocorrência..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy outline-none"
          />
        </div>
      </GlassCard>

      {/* Incidents Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Exibindo {filteredIncidents.length} ocorrências</span>
          <span className="font-semibold text-cepi-navy">6º Ano A • Unidade Grussaí</span>
        </div>

        <AnimatePresence>
          {filteredIncidents.map((item) => {
            const isPraise = item.type === 'elogio';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard
                  className={cn(
                    'p-5 sm:p-6 space-y-3.5 border-l-4 transition-all',
                    isPraise
                      ? 'border-l-emerald-500 bg-emerald-50/20'
                      : item.severity === 'alta'
                      ? 'border-l-rose-500 bg-rose-50/20'
                      : 'border-l-amber-500'
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-xl text-white shrink-0',
                          isPraise ? 'bg-emerald-500' : 'bg-amber-500'
                        )}
                      >
                        {isPraise ? <Heart className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold">
                          Aluno(a): <span className="text-cepi-navy font-bold">{item.studentName}</span> ({item.className})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      {getBadgeForType(item.type)}
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">Relatado por:</span>
                      <span>{item.reportedBy} ({item.reportedRole})</span>
                    </div>

                    {item.notifiedParents && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Send className="w-3.5 h-3.5" />
                        <span>Responsáveis notificados</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal: Nova Ocorrência */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cepi-navy" />
            <span>Registrar Ocorrência / Elogio Pedagógico</span>
          </div>
        }
        description="O registro ficará visível para a coordenação pedagógica e para os responsáveis do estudante."
        size="lg"
      >
        <form onSubmit={handleCreateIncident} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Aluno(a) *</label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:border-cepi-navy outline-none cursor-pointer"
                required
              >
                {MOCK_STUDENTS_6A.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.matricula})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tipo de Registro *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:border-cepi-navy outline-none cursor-pointer"
                required
              >
                <option value="comportamental">Comportamental / Disciplinar</option>
                <option value="elogio">Elogio / Destaque Pedagógico</option>
                <option value="atraso">Atraso / Pontualidade</option>
                <option value="desempenho">Desempenho Acadêmico</option>
                <option value="uniforme">Uniforme / Material Escolar</option>
              </select>
            </div>
          </div>

          <Input
            label="Título da Ocorrência *"
            placeholder="Ex: Destaque na atividade em grupo / Uso de celular sem autorização"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Descrição Detalhada dos Fatos *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva com objetividade e clareza a situação ocorrida na sala de aula..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15 outline-none text-slate-900 resize-none"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifParents"
                checked={formData.notifiedParents}
                onChange={(e) => setFormData({ ...formData, notifiedParents: e.target.checked })}
                className="w-4 h-4 text-cepi-navy rounded focus:ring-cepi-navy cursor-pointer"
              />
              <label htmlFor="notifParents" className="text-xs font-bold text-slate-700 cursor-pointer">
                Enviar notificação imediata aos pais via aplicativo CEPI
              </label>
            </div>
            <Badge variant="sky" size="sm">
              Push + SMS
            </Badge>
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
              Registrar Ocorrência
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
