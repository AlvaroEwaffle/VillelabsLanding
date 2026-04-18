import type { Metadata } from 'next';
import WorkshopsContent from './WorkshopsContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Talleres | Aprende IA aplicada a tu trabajo',
  description: 'Cursos practicos de Vibe Coding y Agentes de IA para disenadores y Product Managers. Aprende a construir con IA sin saber programar.',
  alternates: { canonical: `${siteUrl}/workshops` },
  openGraph: {
    title: 'Talleres | Villelabs',
    description: 'Cursos practicos de IA para profesionales creativos y de producto.',
    url: `${siteUrl}/workshops`,
  },
};

export default function WorkshopsPage() {
  return <WorkshopsContent />;
}
