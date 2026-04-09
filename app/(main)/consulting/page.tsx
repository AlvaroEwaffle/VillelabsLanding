import type { Metadata } from 'next';
import ConsultingContent from './ConsultingContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Consulting | Agile & Product Leadership Powered by AI',
  description:
    'Fractional Product Leadership, Scrum as a Service, and Innovation Cycles. Toptal Top 3% talent helping tech companies ship 50% faster.',
  alternates: { canonical: `${siteUrl}/consulting` },
  openGraph: {
    title: 'Consulting | Villelabs',
    description: 'Agile leadership and AI program management for enterprise teams.',
    url: `${siteUrl}/consulting`,
  },
};

export default function ConsultingPage() {
  return <ConsultingContent />;
}
