import type { Metadata } from 'next';
import CataJuegaContent from './CataJuegaContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  // El layout raíz aplica la plantilla '%s | Villelabs', así que acá no se repite la marca.
  title: 'Cata Juega — Juegos Montessori para tablet, para jugar acompañada',
  description:
    'Seis juegos de espíritu Montessori para niñas y niños de 4 a 7 años. Modo «juntos» que le da al adulto una pregunta o un turno. Sin cuentas, sin publicidad, sin red.',
  alternates: { canonical: `${siteUrl}/products/cata-juega` },
  openGraph: {
    title: 'Cata Juega — Juegos para tablet, hechos para jugar acompañada',
    description:
      'Seis juegos de espíritu Montessori para 4 a 7 años, con un modo «juntos» para el adulto. Sesiones de 15 a 20 minutos, sin cuentas y sin red.',
    url: `${siteUrl}/products/cata-juega`,
    type: 'website',
  },
};

export default function CataJuegaPage() {
  return <CataJuegaContent />;
}
