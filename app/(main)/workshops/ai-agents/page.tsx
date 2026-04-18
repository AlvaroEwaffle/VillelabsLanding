import type { Metadata } from 'next';
import AIAgentsContent from './AIAgentsContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Agentes de IA | Como Crear Agentes — Workshop Villelabs',
  description:
    'Aprende a crear Agentes de IA desde cero: automatiza tareas con logica encadenada, herramientas y memoria. Para disenadores y Product Managers. 2-4 horas, grabado.',
  alternates: { canonical: `${siteUrl}/workshops/ai-agents` },
  openGraph: {
    title: 'Agentes de IA | Como Crear Agentes — Workshop Villelabs',
    description:
      'Curso practico de Agentes de IA para profesionales creativos y de producto. Un agente percibe, decide y ejecuta. Tu supervisas.',
    url: `${siteUrl}/workshops/ai-agents`,
  },
};

export default function AIAgentsPage() {
  return <AIAgentsContent />;
}
