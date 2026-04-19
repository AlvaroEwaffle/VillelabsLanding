import type { Metadata } from 'next';
import ReservaConfirmadaContent from './ReservaConfirmadaContent';

export const metadata: Metadata = {
  title: 'Reserva confirmada | Villelabs',
  description:
    'Gracias por agendar tu llamada de diagnostico con Villelabs. Te enviamos la confirmacion por email.',
  robots: { index: false, follow: false },
};

export default function ReservaConfirmadaPage() {
  return <ReservaConfirmadaContent />;
}
