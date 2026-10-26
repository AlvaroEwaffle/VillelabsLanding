import type { Metadata } from 'next';
import AcademiaContent from './AcademiaContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Academia | Aprende a trabajar con agentes de IA',
  description:
    'Academia by Ewaffle es la academia de Álvaro Villena: cursos cortos de una hora para aprender a delegar tareas a agentes de IA y coordinar varios agentes, con video, guía, cápsula y prompts.',
  alternates: { canonical: `${siteUrl}/academia` },
  openGraph: {
    title: 'Academia | Villelab',
    description: 'Cursos cortos para aprender a trabajar con agentes de IA, a tu ritmo.',
    url: `${siteUrl}/academia`,
  },
};

export default function AcademiaPage() {
  return <AcademiaContent />;
}
