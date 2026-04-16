import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('landing-pages')!;

export const metadata: Metadata = {
  title: 'Landing Pages de Conversión | Villelabs',
  description: 'Páginas de alta conversión optimizadas para generar leads. Diseño responsive, copy estratégico, formularios optimizados y analytics. Desde $800 USD.',
  alternates: { canonical: `${siteUrl}/services/landing-pages` },
};

export default function LandingPagesPage() {
  return <ServicePage service={service} />;
}
