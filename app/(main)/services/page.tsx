import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Servicios | Diseño web, desarrollo y estrategia digital',
  description:
    'Paginas de conversion, sitios web estrategicos, embudos de venta, plataformas a medida, automatizacion de procesos y chatbots con IA. Dos areas, un objetivo: ingresos.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Servicios | Villelabs',
    description: 'Dos areas de servicio diseñadas para hacer crecer tu negocio: marketing y desarrollo.',
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
