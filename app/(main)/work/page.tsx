import type { Metadata } from 'next';
import PortfolioContent from '../portfolio/PortfolioContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Work | Villelabs',
  description:
    'Selected case studies and digital systems built by Villelabs for businesses that needed clearer execution and measurable results.',
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    title: 'Work | Villelabs',
    description:
      'Selected case studies and digital systems built by Villelabs for businesses that needed clearer execution and measurable results.',
    url: `${siteUrl}/work`,
  },
};

export default function WorkPage() {
  return <PortfolioContent />;
}
