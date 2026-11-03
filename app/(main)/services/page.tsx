import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Servicios | Agentes como servicio y CTO fraccional',
  description:
    'Tres formas de trabajar con Villelab: reunión de descubrimiento gratis, Agentes como servicio (implementación desde 12 UF y mantenimiento de 4 UF al mes) y CTO fraccional.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Servicios | Villelab',
    description: 'Reunión gratis → implementación desde 12 UF → mantenimiento de 4 UF al mes. También CTO fraccional.',
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
