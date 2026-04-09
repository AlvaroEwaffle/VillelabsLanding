import type { Metadata } from 'next';
import IAParaEmpresasContent from './IAParaEmpresasContent';

export const metadata: Metadata = {
  title: 'Agentes de IA para Empresas Chilenas | Villelabs',
  description:
    'Automatiza ventas, atencion al cliente y operaciones con inteligencia artificial. Implementacion en 2 semanas, resultados desde el dia 1.',
  robots: { index: false, follow: false },
};

export default function IAParaEmpresasPage() {
  return <IAParaEmpresasContent />;
}
