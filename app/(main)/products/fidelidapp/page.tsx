import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { getProduct } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const product = getProduct('fidelidapp')!;

export const metadata: Metadata = {
  title: 'Fidelidapp — Plataforma de Fidelizacion de Clientes | Villelabs',
  description:
    'Fidelidapp permite crear programas de puntos, premios, cashback digital, base de clientes y campañas de retención para negocios en LATAM.',
  alternates: { canonical: `${siteUrl}/products/fidelidapp` },
  openGraph: {
    title: 'Fidelidapp — Plataforma de fidelizacion de clientes',
    description: 'Crea puntos, premios, cashback, base de clientes y campañas de retencion desde una sola plataforma SaaS.',
    url: `${siteUrl}/products/fidelidapp`,
  },
};

export default function FidelidappPage() {
  return <ProductPage product={product} />;
}
