import type { Metadata } from 'next';
import ProductsContent from './ProductsContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Productos SaaS | MOCA, CAPU & LATE — Villelabs',
  description:
    'Tres productos de IA propios: MOCA automatiza Instagram DMs, CAPU organiza Gmail con IA, y LATE monitorea campañas de ads. Diseñados para PyMEs en LATAM.',
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    title: 'Productos SaaS | Villelabs',
    description: 'Herramientas de IA para automatizar ventas, email y publicidad.',
    url: `${siteUrl}/products`,
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
