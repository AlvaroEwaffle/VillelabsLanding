import type { Metadata } from 'next';
import Modulo1Content from '@/components/productos/curso/Modulo1Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 1 · Que te encuentren y te escriban',
  description: 'Módulo 1 del curso «Tu negocio de punta a punta»: tu mensaje en una frase, tus 3 temas, un calendario de contenido de 4 semanas y los números que dicen qué pieza trae clientes.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-1` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 1 · Que te encuentren y te escriban',
    description: 'Módulo 1 del curso «Tu negocio de punta a punta»: tu mensaje en una frase, tus 3 temas, un calendario de contenido de 4 semanas y los números que dicen qué pieza trae clientes.',
    url: `${SITE_URL}/curso/modulo-1`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 1' }],
  },
};

export default function Modulo1Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo1Content />
    </div>
  );
}
