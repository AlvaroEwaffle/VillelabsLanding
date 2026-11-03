import type { Metadata } from 'next';
import AgentesContent from './AgentesContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Agentes como servicio para tu equipo',
  description:
    'Agentes de IA que hacen el trabajo repetitivo de tu equipo: correos, seguimientos, reportes y reuniones. Reunión de descubrimiento gratis de 30 minutos, implementación desde 12 UF y mantenimiento de 4 UF al mes.',
  alternates: { canonical: `${siteUrl}/agentes` },
  openGraph: {
    title: 'Agentes como servicio · Villelabs',
    description:
      'Tres pasos: una reunión gratis de 30 minutos, la implementación desde 12 UF y el mantenimiento de 4 UF al mes.',
    url: `${siteUrl}/agentes`,
  },
};

export default function AgentesPage() {
  return <AgentesContent />;
}
