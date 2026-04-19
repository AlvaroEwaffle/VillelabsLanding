import type { Metadata } from 'next';
import SistemaPymeContent from './SistemaPymeContent';

export const metadata: Metadata = {
  title: 'Sistema a Medida para PyMEs | Villelabs',
  description:
    'Reemplaza tus Excels por un sistema a medida que tu equipo realmente use. Diseñamos y construimos plataformas internas para PyMEs. Primera version en 3-5 semanas.',
  robots: { index: false, follow: false },
};

export default function SistemaPymePage() {
  return <SistemaPymeContent />;
}
