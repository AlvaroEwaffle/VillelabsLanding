import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import ScrumHome from '../../ScrumHome';

/**
 * El Scrum Board se fusionó con el home el 28-sep-2026 — ya no es un
 * artefacto aparte, ver ScrumHome.tsx. Esta ruta se mantiene viva a
 * propósito: el link ya se compartió en Slack, y un edge cache no perdona
 * un 404 nuevo en una URL vieja (mismo aprendizaje que /semana el mismo
 * día). Sirve el mismo componente que el home, no un redirect.
 */
export const metadata: Metadata = {
  title: 'Scrum Board | Programa',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <ScrumHome llave={llave} />;
}
