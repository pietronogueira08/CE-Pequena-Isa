'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { PageHeaderNav } from '@/components/ui/PageHeaderNav';
import { INITIAL_DIARY_ENTRIES } from '@/lib/mock-data/academic';
import { MOCK_CLASSES } from '@/lib/mock-data/school';
import { DiaryEntry } from '@/lib/types';
import {
  BookOpenCheck,
  Plus,
  Calendar,
  Layers,
  BookOpen,
  Bookmark,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
} from 'lucide-react';

export default function ClassDiaryPage() {
  const { success } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>(INITIAL_DIARY_ENTRIES);
  const [selectedClassId, setSelectedClassId] = useState('turma-6a');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '2026-08-16',
    content: '',
    bnccCodes: 'EF69LP44, EF69LP47',
    homework: '',
    resourcesUsed: 'Projetor multimídia e apostila oficial do CEPI.',
  });

  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId) || MOCK_CLASSES[0];

  const filteredEntries = entries.filter((item) => {
    const matchesClass = item.classId === selectedClassId;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bnccCodes.some((code) => code.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesClass && matchesSearch;
  });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    setIsSaving(true);

    // Simulated realistic save delay
    setTimeout(() => {
      const newEntry: DiaryEntry = {
        id: `diary-${Date.now()}`,
        classId: selectedClassId,
        className: selectedClass.name,
        subject: 'Língua Portuguesa',
        date: formData.date,
        title: formData.title,
        content: formData.content,
        bnccCodes: formData.bnccCodes.split(',').map((s) => s.trim()).filter(Boolean),
        homework: formData.homework || undefined,
        resourcesUsed: formData.resourcesUsed,
        createdAt: 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setEntries([newEntry, ...entries]);
      setIsSaving(false);
      setIsModalOpen(false);
      setFormData({
        title: '',
        date: '2026-08-16',
        content: '',
        bnccCodes: 'EF69LP44, EF69LP47',
        homework: '',
        resourcesUsed: 'Projetor multimídia e apostila oficial do CEPI.',
      });

      success('Registro Salvo!', `Aula "${newEntry.title}" registrada com sucesso no diário do ${selectedClass.name}.`);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Back Button & Breadcrumbs */}
      <PageHeaderNav
        title="Diário de Classe"
        subtitle="Registro pedagógico oficial de conteúdos lecionados, habilidades BNCC e atividades propostas."
        backHref="/dashboard/professor"
        backLabel="Voltar ao Painel"
        breadcrumbs={[
          { label: 'Painel do Docente', href: '/dashboard/professor' },
          { label: 'Diário de Classe' },
        ]}
        badgeText="Ano Letivo 2026"
        badgeVariant="navy"
        rightActions={
          <Button
            variant="gold"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Novo Registro de Aula
          </Button>
        }
      />

      {/* Class Selector Tabs & Search Filter */}
      <GlassCard className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Class Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {MOCK_CLASSES.slice(0, 3).map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cepi-navy text-white shadow-md shadow-cepi-navy/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cls.name} • {cls.shift}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por tema ou BNCC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15 outline-none transition-all"
          />
        </div>
      </GlassCard>

      {/* Timeline Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cepi-navy" />
            <span>Aulas Registradas ({filteredEntries.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">{selectedClass.room}</span>
        </div>

        {filteredEntries.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Nenhuma aula foi registrada para os filtros selecionados. Clique no botão acima para adicionar a primeira aula.
            </p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Registrar Aula Agora
            </Button>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredEntries.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-6 space-y-4 hover:border-cepi-navy/30 transition-colors">
                    {/* Entry Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-cepi-navy-50 text-cepi-navy">
                          <BookOpenCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-semibold text-cepi-navy">{item.subject}</span>
                            <span>•</span>
                            <span>Data: {item.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="green" size="sm">
                          Registrado
                        </Badge>
                        <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-700 leading-relaxed">{item.content}</p>
                    </div>

                    {/* BNCC Tags & Extra Details */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">
                          Habilidades BNCC:
                        </span>
                        {item.bnccCodes.map((code) => (
                          <Badge key={code} variant="navy" size="sm" className="font-mono text-[10px]">
                            {code}
                          </Badge>
                        ))}
                      </div>

                      {item.homework && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                          <Bookmark className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>
                            <strong>Tarefa:</strong> {item.homework}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Resources line */}
                    {item.resourcesUsed && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <strong>Recursos utilizados:</strong> {item.resourcesUsed}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal: Novo Registro de Aula */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-cepi-navy" />
            <span>Novo Registro de Aula — {selectedClass.name}</span>
          </div>
        }
        description="Preencha os dados da aula ministrada para compor o diário de classe oficial."
        size="lg"
      >
        <form onSubmit={handleCreateEntry} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Título / Tema da Aula *"
                placeholder="Ex: Sintaxe: Termos Essenciais da Oração"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                label="Data da Aula *"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-tight">
              Conteúdo Programático & Metodologia Aplicada *
            </label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Descreva detalhadamente o desenvolvimento da aula, atividades realizadas em grupo ou individuais..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:border-cepi-navy focus:ring-2 focus:ring-cepi-navy/15 outline-none text-slate-900 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Códigos BNCC (separados por vírgula)"
              placeholder="Ex: EF69LP44, EF06LP07"
              value={formData.bnccCodes}
              onChange={(e) => setFormData({ ...formData, bnccCodes: e.target.value })}
            />
            <Input
              label="Tarefa de Casa / Orientação de Estudo"
              placeholder="Ex: Exercícios da apostila pág. 45 a 48"
              value={formData.homework}
              onChange={(e) => setFormData({ ...formData, homework: e.target.value })}
            />
          </div>

          <Input
            label="Recursos Didáticos / Tecnológicos Utilizados"
            placeholder="Ex: Projetor, laboratório de informática, material impresso"
            value={formData.resourcesUsed}
            onChange={(e) => setFormData({ ...formData, resourcesUsed: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Salvar no Diário Oficial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
