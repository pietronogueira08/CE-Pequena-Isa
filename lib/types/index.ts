export type UserRole = 'professor' | 'diretor' | 'secretaria' | 'responsavel' | 'aluno';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  department?: string;
  schoolUnit: string;
  activeClass?: string;
  classes?: string[];
  subjects?: string[];
  studentName?: string; // Para responsável
  studentGrade?: string;
}

export interface Student {
  id: string;
  name: string;
  matricula: string;
  classId: string;
  className: string;
  avatar: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  status: 'ativo' | 'transferido' | 'pendente';
  birthDate: string;
  photoUrl?: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  code: string;
  shift: 'Matutino' | 'Vespertino' | 'Integral';
  room: string;
  totalStudents: number;
  gradeLevel: string;
  mainTeacherId: string;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: 'presente' | 'ausente' | 'justificado';
  notes?: string;
}

export interface GradeItem {
  studentId: string;
  studentName: string;
  matricula: string;
  p1: number | null;
  trabalho: number | null;
  p2: number | null;
  recuperacao?: number | null;
  media: number | null;
  situacao: 'aprovado' | 'em_recuperacao' | 'reprovado' | 'em_curso';
}

export interface DiaryEntry {
  id: string;
  classId: string;
  className: string;
  subject: string;
  date: string;
  title: string;
  content: string;
  bnccCodes: string[];
  homework?: string;
  resourcesUsed?: string;
  createdAt: string;
}

export interface IncidentRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  type: 'comportamental' | 'elogio' | 'atraso' | 'desempenho' | 'uniforme' | 'saude';
  severity: 'baixa' | 'media' | 'alta' | 'positiva';
  title: string;
  description: string;
  reportedBy: string;
  reportedRole: string;
  date: string;
  resolved: boolean;
  notifiedParents: boolean;
}

export interface EnrollmentRecord {
  id: string;
  studentName: string;
  responsibleName: string;
  phone: string;
  email: string;
  gradeApplying: string;
  status: 'matriculado' | 'documentacao_pendente' | 'aguardando_vaga' | 'cancelado';
  dateApplied: string;
  monthlyFee: number;
  hasScholarship: boolean;
  scholarshipPercentage?: number;
}

export interface FinancialSummary {
  totalRevenueMonth: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  defaulterRate: number;
  recentPayments: {
    id: string;
    studentName: string;
    className: string;
    amount: number;
    dueDate: string;
    payDate?: string;
    status: 'pago' | 'pendente' | 'atrasado';
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'institucional' | 'pedagogico' | 'evento' | 'urgente';
  summary: string;
  date: string;
  author: string;
  targetAudience: ('todos' | 'pais' | 'professores' | 'alunos')[];
  priority: 'normal' | 'alta' | 'destaque';
}
