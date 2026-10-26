import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-posts';
import BlogPostPage from '@/components/BlogPostPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';
const post = getBlogPost('mvp-startup-chile-costo')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  keywords: post.keywords,
  alternates: { canonical: `${siteUrl}/blog/mvp-startup-chile-costo` },
  openGraph: {
    title: `${post.title} | Villelabs Blog`,
    description: post.excerpt,
    url: `${siteUrl}/blog/mvp-startup-chile-costo`,
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

export default function MvpStartupChilePage() {
  return <BlogPostPage post={post} />;
}
