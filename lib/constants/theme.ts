import { UserRole } from '../types';

export const CEPI_BRAND = {
  name: 'CEPI — Centro Educacional Pequena Isa',
  shortName: 'CEPI',
  tagline: 'Educação com Amor, Excelência e Futuro',
  location: 'Grussaí, São João da Barra - RJ',
  established: '2014',
  phone: '(22) 2741-9870',
  email: 'contato@pequenaisa.com.br',
  cnpj: '19.823.456/0001-92',
};

export const CEPI_COLORS = {
  navy: {
    primary: '#1B3A6B',
    dark: '#0F2240',
    light: '#2A528F',
    gradient: 'from-[#1B3A6B] to-[#0F2240]',
  },
  gold: {
    primary: '#F4C430',
    dark: '#D4A017',
    light: '#FBE68A',
    gradient: 'from-[#F4C430] to-[#E5B31E]',
  },
  sky: {
    primary: '#4FA8D8',
    dark: '#2D86B5',
    light: '#BEE0F5',
    gradient: 'from-[#4FA8D8] to-[#2B8FC6]',
  },
  green: {
    primary: '#4C9A4C',
    dark: '#357235',
    light: '#C1E1C1',
    gradient: 'from-[#4C9A4C] to-[#3E833E]',
  },
  orange: {
    primary: '#D9772E',
    dark: '#B85817',
    light: '#F0CDBA',
    gradient: 'from-[#D9772E] to-[#BD5E19]',
  },
};

export const ROLES_METADATA: Record<UserRole, {
  label: string;
  badgeLabel: string;
  description: string;
  color: string;
  accentBg: string;
  borderColor: string;
  iconName: string;
  defaultRoute: string;
}> = {
  professor: {
    label: 'Professor(a)',
    badgeLabel: 'Docente',
    description: 'Diário de classe, chamada inteligente, notas e ocorrências.',
    color: '#1B3A6B',
    accentBg: 'bg-cepi-navy-50 text-cepi-navy',
    borderColor: 'border-cepi-navy/20',
    iconName: 'GraduationCap',
    defaultRoute: '/dashboard/professor',
  },
  diretor: {
    label: 'Diretor(a) / Coordenador(a)',
    badgeLabel: 'Gestão Geral',
    description: 'KPIs institucionais, métricas de turmas e acompanhamento geral.',
    color: '#F4C430',
    accentBg: 'bg-cepi-gold-50 text-cepi-gold-700',
    borderColor: 'border-cepi-gold/30',
    iconName: 'ShieldCheck',
    defaultRoute: '/dashboard/diretor',
  },
  secretaria: {
    label: 'Secretaria Escolar',
    badgeLabel: 'Administrativo',
    description: 'Gestão de matrículas, visão financeira e calendário escolar.',
    color: '#4FA8D8',
    accentBg: 'bg-cepi-sky-50 text-cepi-sky-700',
    borderColor: 'border-cepi-sky/30',
    iconName: 'Building2',
    defaultRoute: '/dashboard/secretaria',
  },
  responsavel: {
    label: 'Pai / Responsável',
    badgeLabel: 'Família',
    description: 'Boletim do filho, frequência diária, recados e comunicados.',
    color: '#4C9A4C',
    accentBg: 'bg-cepi-green-50 text-cepi-green-700',
    borderColor: 'border-cepi-green/30',
    iconName: 'Users',
    defaultRoute: '/dashboard/responsavel',
  },
  aluno: {
    label: 'Aluno(a)',
    badgeLabel: 'Estudante',
    description: 'Horários de aula, notas, tarefas e quadro de avisos.',
    color: '#D9772E',
    accentBg: 'bg-cepi-orange-50 text-cepi-orange-700',
    borderColor: 'border-cepi-orange/30',
    iconName: 'BookOpen',
    defaultRoute: '/dashboard/aluno',
  },
};
