import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import Fase1App from '../../Fase1App';

export const metadata: Metadata = {
  title: 'Fase 1 · Alcance | Programa',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <Fase1App llave={llave} />;
}
