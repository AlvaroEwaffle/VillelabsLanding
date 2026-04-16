import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('automatizacion')!;

export const metadata: Metadata = {
  title: 'Automatización de Procesos | Villelabs',
  description: 'Workflows e integraciones custom que eliminan trabajo manual. Auditoría de procesos, automatización y dashboard de monitoreo. Desde $2.000 USD.',
  alternates: { canonical: `${siteUrl}/services/automatizacion` },
};

export default function AutomatizacionPage() {
  return <ServicePage service={service} />;
}
