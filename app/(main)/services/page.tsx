import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Servicios | Diagnóstico, Agents as a Service y CTO fraccional',
  description:
    'Tres formas de trabajar con Villelab: diagnóstico de dos semanas, Agents as a Service (instalación y operación mensual de agentes de IA para tu equipo) y CTO fraccional.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Servicios | Villelab',
    description: 'Diagnóstico, Agents as a Service y CTO fraccional. Diagnóstico → instalación → operación.',
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
