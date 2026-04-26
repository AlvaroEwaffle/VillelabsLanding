import type { Metadata } from 'next';
import SistemasAMedidaContent from './SistemasAMedidaContent';

export const metadata: Metadata = {
  title: 'Sistemas a Medida para Operaciones Internas | Villelabs',
  description:
    'Brochure digital de sistemas a medida para operaciones internas, reporteria, automatizacion y control de procesos.',
  robots: { index: false, follow: false },
};

export default function SistemasAMedidaPage() {
  return <SistemasAMedidaContent />;
}
