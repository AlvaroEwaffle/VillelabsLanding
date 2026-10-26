import type { Metadata } from 'next';
import Redirect from '@/components/Redirect';

// Ruta antigua: redirige a /work (public/_redirects responde 301 en Cloudflare Pages).
export const metadata: Metadata = {
  title: 'Proyectos',
  robots: { index: false, follow: true },
};

export default function RedirectPage() {
  return <Redirect to="/work" label="Ir a Proyectos" />;
}
