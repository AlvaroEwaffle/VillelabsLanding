import type { Metadata } from 'next';
import BonosContent from '@/components/productos/curso/BonosContent';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// «Tus bonos» (pack del curso, 13-nov-2026): solo compradores, detrás del mismo candado que los módulos 1–7
// (functions/_lib/curso.ts → PROTEGIDO_CURSO). No se indexa.
export const metadata: Metadata = {
  title: 'Tus bonos del curso · la planilla lista y la Guía',
  description: 'Bonos del curso «Construye con IA tu CRM y ERP»: la planilla lista para descargar y la Guía «Tus próximos 20 clientes».',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/bonos` },
};

export default function BonosPage() {
  return (
    <div className={fraunces.variable}>
      <BonosContent />
    </div>
  );
}
