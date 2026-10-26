import type { Metadata } from 'next';
import Redirect from '@/components/Redirect';

// Ruta antigua: redirige a /sobre-mi (public/_redirects responde 301 en Cloudflare Pages).
export const metadata: Metadata = {
  title: 'Sobre mí',
  robots: { index: false, follow: true },
};

export default function RedirectPage() {
  return <Redirect to="/sobre-mi" label="Ir a Sobre mí" />;
}
