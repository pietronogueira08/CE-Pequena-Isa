# CEPI Gestão Escolar — Demonstração Premium

Sistema de Gestão Escolar demonstrativo e navegável desenvolvido para o **CEPI — Centro Educacional Pequena Isa** (Grussaí, São João da Barra - RJ).

---

## Tecnologias Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com tokens de Glassmorphism
- **Animações & Microinterações**: [Framer Motion](https://www.framer.com/motion/)
- **Gráficos & Analytics**: [Recharts](https://recharts.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Efeitos Visuais**: Canvas Confetti
- **Dados**: 100% Mockados localmente em TypeScript (`/lib/mock-data/`)

---

## Identidade Visual (Cores Oficiais)

- **Azul Marinho (`#1B3A6B`)**: Títulos institucionais, sidebar, autoridade.
- **Amarelo Dourado (`#F4C430`)**: Destaques, badges de excelência, CTAs.
- **Azul Céu (`#4FA8D8`)**: Acentos, cards secundários.
- **Verde Folha (`#4C9A4C`)**: Indicadores de sucesso, presenças, notas altas.
- **Laranja Terracota (`#D9772E`)**: Alertas moderados e ocorrências.

---

## Perfis Disponíveis na Demonstração

1. **Professor(a) (Perfil Carro-Chefe)**:
   - Visão Geral com horários e gráficos de desempenho das turmas.
   - Diário de Classe com registro de aulas e habilidades BNCC.
   - Chamada Inteligente com toggles de presença e confetes ao salvar.
   - Lançamento de Notas com cálculo de média automático e em tempo real.
   - Mural de Ocorrências e Elogios Pedagógicos com notificação aos responsáveis.

2. **Diretor(a) / Coordenador(a)**:
   - Indicadores globais da escola, gráficos executivos de evolução bimestral e feed de ocorrências.

3. **Secretaria Escolar**:
   - Gestão de matrículas com modal interativo, visão financeira ilustrativa e calendário letivo.

4. **Pai / Responsável**:
   - Boletim escolar completo do filho (Lucas Mendes - 6º Ano A), frequência e comunicados da escola.

5. **Aluno(a)**:
   - Grade de horários do dia, tarefas pendentes, conquistas e quadro de avisos.

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/pietronogueira08/CE-Pequena-Isa.git

# Acesse a pasta do projeto
cd CE-Pequena-Isa

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a Splash Screen animada e navegar entre os perfis.

---

## Build para Produção / Deploy na Vercel

```bash
npm run build
npm run start
```

---

Desenvolvido para **CEPI — Centro Educacional Pequena Isa** • Grussaí, São João da Barra / RJ.
