import type { Metadata } from 'next';
import DesarrolloSoftwareContent from './DesarrolloSoftwareContent';

export const metadata: Metadata = {
  title: 'Desarrollo de Software a Medida en Chile | Villelabs',
  description:
    'Aplicaciones web, plataformas y sistemas internos. Equipo chileno, metodologia agil, entregas en semanas.',
  robots: { index: false, follow: false },
};

export default function DesarrolloSoftwarePage() {
  return <DesarrolloSoftwareContent />;
}
