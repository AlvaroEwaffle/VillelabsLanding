import type { Metadata } from 'next';
import Modulo2Content from '@/components/productos/curso/Modulo2Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 2 · De dónde llegan tus clientes',
  description: 'Módulo 2 del curso «Construye con IA tu sistema de gestión CRM y ERP»: tu mensaje en una frase, tus 3 temas, un calendario de contenido de 4 semanas y la hoja Origen, que cuenta cuántos clientes te trae cada canal.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-2` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 2 · De dónde llegan tus clientes',
    description: 'Módulo 2 del curso «Construye con IA tu sistema de gestión CRM y ERP»: tu mensaje en una frase, tus 3 temas, un calendario de contenido de 4 semanas y la hoja Origen, que cuenta cuántos clientes te trae cada canal.',
    url: `${SITE_URL}/curso/modulo-2`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'El sistema de tu negocio · módulo 2' }],
  },
};

export default function Modulo2Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo2Content />
    </div>
  );
}
