import type { Metadata } from 'next';
import MvpStartupContent from './MvpStartupContent';

export const metadata: Metadata = {
  title: 'Desarrollo de MVPs y SaaS para Startups | Villelabs',
  description:
    'Lanza tu MVP en 4-6 semanas. Construimos MVPs y plataformas SaaS para startups que ya validaron su idea. Entregas semanales, equipo dedicado, codigo tuyo.',
  robots: { index: false, follow: false },
};

export default function MvpStartupPage() {
  return <MvpStartupContent />;
}
