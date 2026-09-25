import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import Repositorio from '../../Repositorio';

/**
 * Mismo modelo de acceso que `/programa/[llave]`: la llave en la URL es
 * oscuridad, no autenticación. Ver la nota en `../page.tsx`.
 *
 * Vive bajo la misma llave que PR Tech porque los dos tableros son de Álvaro
 * — no hace falta un segundo secreto para un segundo programa propio.
 */
export const metadata: Metadata = {
  title: 'Programa Fidelidapp | Villelabs',
  description: 'Repositorio vivo del programa de Fidelidapp, conectado a GitHub.',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <Repositorio llave={llave} slug="fidelidapp" />;
}
