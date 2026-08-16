import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CEPI — Centro Educacional Pequena Isa | Gestão Escolar Inteligente',
  description: 'Sistema de gestão pedagógica, acadêmica e administrativa do CEPI - Grussaí, São João da Barra/RJ.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-cepi-mesh text-slate-900 selection:bg-cepi-gold selection:text-cepi-navy">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
