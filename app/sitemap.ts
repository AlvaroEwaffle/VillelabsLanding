import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const dynamic = 'force-static';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];
const entry = (path: string, priority: number, changeFrequency: Freq = 'monthly') => ({
  url: `${baseUrl}${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry('', 1, 'weekly'),
    // Navbar (26-oct-2026): Catálogo · Servicios · Proyectos · Academia · Blog · Sobre mí · Contacto
    entry('/catalogo', 0.9),
    entry('/services', 0.9),
    entry('/work', 0.8),
    entry('/academia', 0.8),
    entry('/blog', 0.8, 'weekly'),
    entry('/sobre-mi', 0.7),
    entry('/contact', 0.9),
    entry('/diagnostic', 0.8),
    entry('/asesoria', 0.7),
    // Productos propios (el índice /products redirige al catálogo)
    entry('/products/moca', 0.5),
    entry('/products/capu', 0.5),
    entry('/products/late', 0.5),
    entry('/products/fidelidapp', 0.5),
    // Casos
    entry('/work/puchacay', 0.6),
    entry('/work/ewaffle', 0.6),
    entry('/work/fidelidapp', 0.6),
    entry('/work/defensa-total', 0.6),
    entry('/work/revenue-ai-system', 0.6),
    entry('/work/dra-oyarzun', 0.6),
    entry('/work/samy-studio', 0.6),
    entry('/work/conexion-industrial', 0.6),
    // Talleres antiguos (el índice /workshops redirige a /academia)
    entry('/workshops/ai-agents', 0.4),
    entry('/workshops/vibe-coding', 0.4),
    entry('/workshops/lider-del-futuro', 0.5),
    // Blog
    ...blogPosts.map((p) => entry(`/blog/${p.slug}`, 0.6)),
    // Legales
    entry('/privacidad', 0.2, 'yearly'),
    entry('/privacy', 0.2, 'yearly'),
    entry('/terminos', 0.2, 'yearly'),
    entry('/terms', 0.2, 'yearly'),
  ];
}
