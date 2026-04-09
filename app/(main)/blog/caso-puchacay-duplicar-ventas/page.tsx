import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-posts';
import BlogPostPage from '@/components/BlogPostPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const post = getBlogPost('caso-puchacay-duplicar-ventas')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  keywords: post.keywords,
  alternates: { canonical: `${siteUrl}/blog/caso-puchacay-duplicar-ventas` },
  openGraph: {
    title: `${post.title} | Villelabs Blog`,
    description: post.excerpt,
    url: `${siteUrl}/blog/caso-puchacay-duplicar-ventas`,
    type: 'article',
    publishedTime: '2026-03-01T00:00:00Z',
    authors: ['Alvaro Villena'],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
  },
};

export default function CasoPuchacayPage() {
  return <BlogPostPage post={post} />;
}
