import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { getProduct } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const product = getProduct('moca')!;

export const metadata: Metadata = {
  title: 'MOCA — Agente de IA para Instagram DMs | Villelabs',
  description:
    'MOCA se conecta a tu Instagram Business y responde DMs automáticamente con IA. Califica leads, da seguimiento 24/7 y te avisa cuando intervenir. Prueba gratis 14 días.',
  alternates: { canonical: `${siteUrl}/products/moca` },
  openGraph: {
    title: 'MOCA — Agente de IA para Instagram DMs',
    description: 'Automatiza tus DMs de Instagram con IA. Califica leads, da seguimiento 24/7 y cierra más ventas.',
    url: `${siteUrl}/products/moca`,
  },
};

export default function MocaPage() {
  return <ProductPage product={product} />;
}
