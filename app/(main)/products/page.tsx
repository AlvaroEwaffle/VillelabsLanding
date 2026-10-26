import type { Metadata } from 'next';
import Redirect from '@/components/Redirect';

// Ruta antigua: redirige a /catalogo (public/_redirects responde 301 en Cloudflare Pages).
export const metadata: Metadata = {
  title: 'Catálogo',
  robots: { index: false, follow: true },
};

export default function RedirectPage() {
  return <Redirect to="/catalogo" label="Ir al catálogo" />;
}
