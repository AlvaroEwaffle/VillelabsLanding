import type { Metadata } from 'next';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';
import GuiaProspeccionV2 from '@/components/productos/guia/v2/GuiaProspeccionV2';

// Página de alumno: no se indexa, pero lleva su canonical y su OG propios para que al compartir el link
// no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Guía 1 · Tu lista de prospectos y el primer mensaje',
  description: 'Guía interactiva de Villelab: diagnóstico y ruta, cliente ideal, tu planilla de 20 prospectos, primer mensaje, seguimientos y rutina de 20 minutos.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/guia/prospeccion` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Guía 1 · Tu lista de prospectos y el primer mensaje, cada mañana',
    description: 'En una tarde armas la lista de a quién venderle, el primer mensaje y los seguimientos, y te queda una rutina de 20 minutos al día.',
    url: `${SITE_URL}/guia/prospeccion`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Villelab' }],
  },
};

export default function Page() {
  return (
    <div className={fraunces.variable}>
      <GuiaProspeccionV2 />
    </div>
  );
}
