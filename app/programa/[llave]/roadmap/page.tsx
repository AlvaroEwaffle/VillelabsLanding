import type { Metadata } from 'next';
import { LLAVES_PRTECH } from '@/lib/programa/config';
import RoadmapApp from '../../RoadmapApp';

export const metadata: Metadata = {
  title: 'Roadmap y épicas | Programa',
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Solo PR Tech. Estas dos páginas describen su recorrido de producto y su
 * pipeline de despliegue: no son plantillas, son afirmaciones sobre un repo.
 * Generarlas para otro programa mostraría el roadmap de PR Tech bajo su llave.
 */
export function generateStaticParams() {
  return LLAVES_PRTECH.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <RoadmapApp llave={llave} />;
}
