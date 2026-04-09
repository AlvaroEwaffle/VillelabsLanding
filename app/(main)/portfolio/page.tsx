import type { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Portfolio | Projects That Deliver Results',
  description:
    'Explore our work: strategic websites, e-commerce platforms, SaaS products, and landing pages for 50+ businesses across LATAM.',
  alternates: { canonical: `${siteUrl}/portfolio` },
  openGraph: {
    title: 'Portfolio | Villelabs',
    description: 'Real projects with real results for real businesses.',
    url: `${siteUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
