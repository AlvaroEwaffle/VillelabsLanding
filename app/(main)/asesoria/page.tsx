import type { Metadata } from 'next';
import AsesoriaContent from './AsesoriaContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Asesoría | Diagnóstico de Organización — Villelabs',
  description:
    'Diagnóstico de Organización: identificamos los cuellos de botella en tus procesos y los resolvemos con sistemas de IA y agentes inteligentes. Álvaro Villena — Toptal Top 3%, más de 10 años en operaciones y producto.',
  alternates: { canonical: `${siteUrl}/asesoria` },
  openGraph: {
    title: 'Asesoría · Diagnóstico de Organización — Villelabs',
    description:
      'Consultora de diagnóstico organizacional. Identificamos cuellos de botella y los resolvemos desplegando agentes de IA que corren procesos reales.',
    url: `${siteUrl}/asesoria`,
  },
};

export default function AsesoriaPage() {
  return <AsesoriaContent />;
}
