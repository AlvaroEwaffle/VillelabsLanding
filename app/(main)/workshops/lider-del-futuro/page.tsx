import type { Metadata } from 'next';
import LiderDelFuturoContent from './LiderDelFuturoContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Lider del Futuro | Coaching para Tech Leads y PMs',
  description:
    'Programa intensivo de 8 semanas para devs promovidos, tech leads, PMs junior y founders tecnicos que necesitan liderar con claridad, IA aplicada y criterio real.',
  alternates: { canonical: `${siteUrl}/workshops/lider-del-futuro` },
  openGraph: {
    title: 'Lider del Futuro | Villelabs',
    description:
      'Agile real, IA aplicada y coaching ontologico para lideres tecnicos en transicion. 8 semanas, 1:1 con Alvaro Villena.',
    url: `${siteUrl}/workshops/lider-del-futuro`,
  },
};

export default function LiderDelFuturoPage() {
  return <LiderDelFuturoContent />;
}
