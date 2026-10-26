import type { Metadata } from 'next';
import SobreMiContent from './SobreMiContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Sobre mí | Álvaro Villena',
  description:
    'Álvaro Villena: ex-LATAM Airlines, ex-PepsiCo vía Toptal, más de 8 años liderando equipos de producto. Instala agentes de IA en equipos que no programan, con un equipo detrás en Ewaffle, Fidelidapp y Villelab.',
  alternates: { canonical: `${siteUrl}/sobre-mi` },
  openGraph: {
    title: 'Sobre mí | Villelab',
    description: 'Quién está detrás de Villelab y cómo trabaja.',
    url: `${siteUrl}/sobre-mi`,
  },
};

export default function SobreMiPage() {
  return <SobreMiContent />;
}
