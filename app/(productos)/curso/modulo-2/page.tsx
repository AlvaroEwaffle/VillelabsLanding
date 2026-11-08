import type { Metadata } from 'next';
import Modulo2Content from '@/components/productos/curso/Modulo2Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 2 · Ningún seguimiento se cae',
  description: 'Módulo 2 del curso «Tu negocio de punta a punta»: cliente ideal y lista del día, mensajes de seguimiento, la propuesta de una página y tu embudo de ventas en una planilla.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-2` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 2 · Ningún seguimiento se cae',
    description: 'Módulo 2 del curso «Tu negocio de punta a punta»: cliente ideal y lista del día, mensajes de seguimiento, la propuesta de una página y tu embudo de ventas en una planilla.',
    url: `${SITE_URL}/curso/modulo-2`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 2' }],
  },
};

export default function Modulo2Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo2Content />
    </div>
  );
}
