import type { Metadata } from 'next';
import ProductsContent from './ProductsContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Productos SaaS | MOCA, CAPU, LATE y Fidelidapp — Villelabs',
  description:
    'Productos propios para PyMEs en LATAM: MOCA automatiza Instagram DMs, CAPU organiza Gmail, LATE monitorea publicidad y Fidelidapp fideliza clientes.',
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    title: 'Productos SaaS | Villelabs',
    description: 'Herramientas para automatizar ventas, email, publicidad y retención de clientes.',
    url: `${siteUrl}/products`,
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
