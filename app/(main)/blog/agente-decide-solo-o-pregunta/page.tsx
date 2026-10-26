import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-posts';
import BlogPostPage from '@/components/BlogPostPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';
const post = getBlogPost('agente-decide-solo-o-pregunta')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  keywords: post.keywords,
  alternates: { canonical: `${siteUrl}/blog/agente-decide-solo-o-pregunta` },
  openGraph: {
    title: `${post.title} | Villelab Blog`,
    description: post.excerpt,
    url: `${siteUrl}/blog/agente-decide-solo-o-pregunta`,
    type: 'article',
    publishedTime: '2026-10-26T00:00:00Z',
    authors: ['Alvaro Villena'],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
  },
};

export default function Page() {
  return <BlogPostPage post={post} />;
}
