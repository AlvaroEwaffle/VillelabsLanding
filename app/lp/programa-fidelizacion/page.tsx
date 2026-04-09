import type { Metadata } from 'next';
import ProgramaFidelizacionContent from './ProgramaFidelizacionContent';

export const metadata: Metadata = {
  title: 'Programa de Fidelizacion Digital para Tu Negocio | Villelabs',
  description:
    'Puntos, descuentos y cashback. Tu programa de lealtad propio, activo en 24 horas. Desde $49.990 CLP/mes.',
  robots: { index: false, follow: false },
};

export default function ProgramaFidelizacionPage() {
  return <ProgramaFidelizacionContent />;
}
