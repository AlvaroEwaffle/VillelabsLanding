import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Services | Web Design, Development & Digital Strategy',
  description:
    'Conversion landing pages, strategic websites, sales funnels, custom platforms, process automation, and AI chatbots. Two tracks, one goal: revenue.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Services | Villelabs',
    description: 'Two service tracks designed to grow your business: Marketing and Development.',
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
