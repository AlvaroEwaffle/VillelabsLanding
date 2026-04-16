import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { getProduct } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const product = getProduct('late')!;

export const metadata: Metadata = {
  title: 'LATE — Monitoreo Inteligente de Ads con IA | Villelabs',
  description:
    'LATE conecta Meta Ads, Google Ads, GA4 y Search Console. Analiza rendimiento con IA, genera reportes y permite aprobar cambios vía email.',
  alternates: { canonical: `${siteUrl}/products/late` },
  openGraph: {
    title: 'LATE — Intelligent Ad Campaign Monitoring',
    description: 'AI-powered ad monitoring across Meta and Google. Consolidated dashboard, smart reports, and email-based approval.',
    url: `${siteUrl}/products/late`,
  },
};

export default function LatePage() {
  return <ProductPage product={product} />;
}
