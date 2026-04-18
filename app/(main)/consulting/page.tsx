import type { Metadata } from 'next';
import ConsultingContent from './ConsultingContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Consultoría | Liderazgo ágil y de producto con IA',
  description:
    'Liderazgo de producto fraccional, Scrum como servicio y ciclos de innovación. Talento Toptal Top 3% ayudando a empresas tech a entregar más rápido.',
  alternates: { canonical: `${siteUrl}/consulting` },
  openGraph: {
    title: 'Consultoría | Villelabs',
    description: 'Liderazgo ágil y gestión de programas de IA para equipos empresariales.',
    url: `${siteUrl}/consulting`,
  },
};

export default function ConsultingPage() {
  return <ConsultingContent />;
}
