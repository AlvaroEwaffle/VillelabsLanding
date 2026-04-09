import type { Metadata } from 'next';
import AboutContent from './AboutContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'About | Meet the Team Behind Villelabs',
  description:
    'A small, focused team of product leaders, developers, and strategists based in Santiago, Chile. We build revenue systems for 50+ businesses globally.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About | Villelabs',
    description: 'Meet the team that builds revenue systems, not just websites.',
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
