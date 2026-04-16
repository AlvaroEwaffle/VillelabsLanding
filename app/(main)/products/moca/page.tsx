import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { getProduct } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const product = getProduct('moca')!;

export const metadata: Metadata = {
  title: 'MOCA — Agente de IA para Instagram DMs | Villelabs',
  description:
    'MOCA se conecta a tu Instagram Business y responde DMs automáticamente con IA. Califica leads, da seguimiento 24/7 y te avisa cuando intervenir. Trial gratis 14 días.',
  alternates: { canonical: `${siteUrl}/products/moca` },
  openGraph: {
    title: 'MOCA — AI Agent for Instagram DMs',
    description: 'Automate your Instagram DMs with AI. Qualify leads, follow up 24/7, and close more sales.',
    url: `${siteUrl}/products/moca`,
  },
};

export default function MocaPage() {
  return <ProductPage product={product} />;
}
