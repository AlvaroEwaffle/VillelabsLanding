import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('plataformas-a-medida')!;

export const metadata: Metadata = {
  title: 'Plataformas a Medida / SaaS | Villelabs',
  description: 'Productos SaaS, dashboards y herramientas internas. Desarrollo full-stack con React, Next.js y Node.js. Desde $5.000 USD.',
  alternates: { canonical: `${siteUrl}/services/plataformas-a-medida` },
};

export default function PlataformasPage() {
  return <ServicePage service={service} />;
}
