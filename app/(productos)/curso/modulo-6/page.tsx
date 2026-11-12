import type { Metadata } from 'next';
import Modulo6Content from '@/components/productos/curso/Modulo6Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 6 · El tablero que lo junta todo',
  description: 'Módulo 6 del curso «Construye con IA tu sistema de gestión CRM y ERP»: tus números del lunes, cómo se conectan las hojas, compartir la planilla con tu equipo, tus rutinas y cuándo pasar a un software. Proyecto final: tu ERP en Google Sheets con su tablero.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-6` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 6 · El tablero que lo junta todo',
    description: 'Módulo 6 del curso «Construye con IA tu sistema de gestión CRM y ERP»: tus números del lunes, cómo se conectan las hojas, compartir la planilla con tu equipo, tus rutinas y cuándo pasar a un software. Proyecto final: tu ERP en Google Sheets con su tablero.',
    url: `${SITE_URL}/curso/modulo-6`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'El sistema de tu negocio · módulo 6' }],
  },
};

export default function Modulo6Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo6Content />
    </div>
  );
}
