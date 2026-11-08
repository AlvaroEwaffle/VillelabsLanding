import type { Metadata } from 'next';
import Modulo0Content from '@/components/productos/curso/Modulo0Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno: no se indexa, pero lleva su canonical y su OG propios para que al compartir el link
// no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 0 · Tu negocio en 5 áreas',
  description: 'Módulo 0 del curso «Tu negocio de punta a punta»: el mapa de 5 áreas, el diagnóstico con semáforo, el esqueleto de tu agente y las reglas de freno.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-0` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 0 · Tu negocio en 5 áreas',
    description: 'El mapa de 5 áreas, el diagnóstico con semáforo, el esqueleto de tu agente y las reglas de freno. Módulo de muestra del curso.',
    url: `${SITE_URL}/curso/modulo-0`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 0' }],
  },
};

export default function Modulo0Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo0Content />
    </div>
  );
}
