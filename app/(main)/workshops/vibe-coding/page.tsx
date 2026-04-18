import type { Metadata } from 'next';
import VibeCodingContent from './VibeCodingContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Vibe Coding | Primeros Pasos — Workshop Villelabs',
  description:
    'Aprende Vibe Coding desde cero: describe lo que quieres construir en lenguaje natural y deja que la IA genere el codigo. Para disenadores y Product Managers. 2-4 horas, grabado.',
  alternates: { canonical: `${siteUrl}/workshops/vibe-coding` },
  openGraph: {
    title: 'Vibe Coding | Primeros Pasos — Workshop Villelabs',
    description:
      'Curso practico de Vibe Coding para profesionales creativos. Tu diriges, la IA ejecuta. Sin experiencia en programacion necesaria.',
    url: `${siteUrl}/workshops/vibe-coding`,
  },
};

export default function VibeCodingPage() {
  return <VibeCodingContent />;
}
