import type { Metadata } from 'next';
import BlogContent from './BlogContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Blog | Insights on Web Design, Strategy & Growth',
  description:
    'Practical insights on web design, conversion optimization, digital strategy, and business growth. Updated weekly.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'Blog | Villelabs',
    description: 'Practical insights on web design, strategy, and business growth.',
    url: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
