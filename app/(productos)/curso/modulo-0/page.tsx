import type { Metadata } from 'next';
import Modulo0Content from '@/components/productos/curso/Modulo0Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno: no se indexa, pero lleva su canonical y su OG propios para que al compartir el link
// no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 0 · El sistema de tu negocio en una planilla',
  description: 'Módulo 0 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: el mapa de tu sistema, el diagnóstico con semáforo, tu planilla base con la ficha del negocio y las reglas de freno.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-0` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 0 · El sistema de tu negocio en una planilla',
    description: 'Qué es un CRM y un ERP, el diagnóstico con semáforo, tu planilla base en Google Sheets y las reglas de freno. Módulo de muestra del curso.',
    url: `${SITE_URL}/curso/modulo-0`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Construye con IA tu CRM y ERP · módulo 0' }],
  },
};

export default function Modulo0Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo0Content />
    </div>
  );
}
