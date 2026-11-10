import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/productos/seo';
import { fraunces } from '@/lib/productos/fuente';
import RegaloFidelidapp from '@/components/productos/regalo/RegaloFidelidapp';

// Página del regalo del video largo / live. Sin indexar: solo se llega por el link del video.
export const metadata: Metadata = {
  title: { absolute: 'Tu mes gratis de WhatsApp para tu agente · Villelab' },
  description: 'Regalo para quienes vieron el video: un mes de Fidelidapp con la conexión a WhatsApp, válido hasta el 31 de diciembre de 2026.',
  alternates: { canonical: `${SITE_URL}/regalo` },
  robots: { index: false, follow: false },
};

export default function RegaloPage() {
  return (
    <div className={fraunces.variable}>
      <RegaloFidelidapp />
    </div>
  );
}
