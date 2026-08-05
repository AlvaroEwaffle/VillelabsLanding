import type { Metadata } from 'next';
import CanvasApp from './CanvasApp';

// Herramienta interna de facilitación: fuera del índice y fuera del sitemap.
export const metadata: Metadata = {
  title: 'Lienzo de trabajo | Villelabs',
  description: 'Lienzo colaborativo para sesiones de descubrimiento e innovación con clientes.',
  robots: { index: false, follow: false },
};

export default function CanvasPage() {
  return <CanvasApp />;
}
