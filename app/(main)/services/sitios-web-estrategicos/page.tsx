import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('sitios-web-estrategicos')!;

export const metadata: Metadata = {
  title: 'Sitios Web Estratégicos | Villelabs',
  description: 'Sitios web completos diseñados alrededor de objetivos de revenue. Arquitectura estratégica, SEO, blog integrado y optimización de 30 días. Desde $3.500 USD.',
  alternates: { canonical: `${siteUrl}/services/sitios-web-estrategicos` },
};

export default function SitiosWebPage() {
  return <ServicePage service={service} />;
}
