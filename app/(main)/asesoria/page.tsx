import type { Metadata } from 'next';
import AsesoriaContent from './AsesoriaContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'AI Product Advisory, Tech Programs y Shape Up',
  description:
    'Asesoria para convertir iniciativas de IA, plataformas y productos internos en ciclos Shape Up con SDLC, delivery y operacion responsable.',
  alternates: { canonical: `${siteUrl}/asesoria` },
  openGraph: {
    title: 'AI Product Advisory | Villelabs',
    description:
      'Shape Up aplicado a tech products, AI programs, plataformas internas y agentes: apuestas acotadas, evidencia y operacion.',
    url: `${siteUrl}/asesoria`,
  },
};

export default function AsesoriaPage() {
  return <AsesoriaContent />;
}
