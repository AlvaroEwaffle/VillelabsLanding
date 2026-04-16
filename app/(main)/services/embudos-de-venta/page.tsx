import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('embudos-de-venta')!;

export const metadata: Metadata = {
  title: 'Embudos de Venta | Villelabs',
  description: 'Funnels completos con email sequences, lead magnets y nurture automation. Cada punto de contacto diseñado para convertir. Desde $1.500 USD.',
  alternates: { canonical: `${siteUrl}/services/embudos-de-venta` },
};

export default function EmbudosPage() {
  return <ServicePage service={service} />;
}
