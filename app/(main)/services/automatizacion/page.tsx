import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('automatizacion')!;

export const metadata: Metadata = {
  title: 'Automatización de Procesos | Villelabs',
  description: 'Flujos e integraciones a medida que eliminan trabajo manual. Auditoria de procesos, automatizacion y panel de monitoreo. Desde $2.000 USD.',
  alternates: { canonical: `${siteUrl}/services/automatizacion` },
};

export default function AutomatizacionPage() {
  return <ServicePage service={service} />;
}
