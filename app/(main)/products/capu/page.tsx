import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { getProduct } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const product = getProduct('capu')!;

export const metadata: Metadata = {
  title: 'CAPU — Agente de IA para Google Workspace | Villelabs',
  description:
    'CAPU se conecta a Gmail, Calendar y Slack. Genera borradores con IA, organiza tu agenda y envía resúmenes categorizados. Setup en 5 minutos.',
  alternates: { canonical: `${siteUrl}/products/capu` },
  openGraph: {
    title: 'CAPU — AI Agent for Google Workspace',
    description: 'AI-powered email drafts, calendar management, and Slack summaries. Designed for professionals.',
    url: `${siteUrl}/products/capu`,
  },
};

export default function CapuPage() {
  return <ProductPage product={product} />;
}
