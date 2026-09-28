import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import SemanaApp from '../../SemanaApp';

export const metadata: Metadata = {
  title: 'Plan de la semana | Programa',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <SemanaApp llave={llave} />;
}
