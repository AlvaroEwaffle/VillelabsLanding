import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import ProgramaApp from '../ProgramaApp';

/**
 * La herramienta vive detrás de una llave en la URL, no en /programa a secas.
 *
 * Esto es oscuridad, no autenticación: el sitio es un export estático servido
 * por Cloudflare Pages y no hay dónde validar una sesión. Lo que la llave
 * compra es que la ruta no se adivine ni se indexe — suficiente para operar
 * mientras no haya un gate real delante (Cloudflare Access es el paso que
 * sigue). Mientras tanto: el link es la credencial, y se trata como tal.
 */
export const metadata: Metadata = {
  title: 'Programa | Villelabs',
  description: 'Herramienta interna de gestión de programa conectada a GitHub.',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default function ProgramaPage() {
  return <ProgramaApp />;
}
