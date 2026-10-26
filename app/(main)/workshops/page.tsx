import type { Metadata } from 'next';
import Redirect from '@/components/Redirect';

// Ruta antigua: redirige a /academia (public/_redirects responde 301 en Cloudflare Pages).
export const metadata: Metadata = {
  title: 'Academia',
  robots: { index: false, follow: true },
};

export default function RedirectPage() {
  return <Redirect to="/academia" label="Ir a la Academia" />;
}
