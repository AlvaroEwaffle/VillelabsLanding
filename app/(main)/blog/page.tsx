import type { Metadata } from 'next';
import BlogContent from './BlogContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Blog | Agentes de IA explicados en simple',
  description:
    'Notas de Álvaro Villena sobre agentes de IA en lenguaje simple: qué hacen, en qué nivel está tu negocio, qué deciden solos y qué te preguntan. Más cómo construimos plataformas.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'Blog | Villelab',
    description: 'Agentes de IA explicados en simple, y cómo construimos plataformas.',
    url: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
