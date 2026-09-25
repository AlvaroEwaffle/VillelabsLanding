import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import ScrumApp from '../../ScrumApp';

export const metadata: Metadata = {
  title: 'Scrum Board | Programa',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <ScrumApp llave={llave} />;
}
