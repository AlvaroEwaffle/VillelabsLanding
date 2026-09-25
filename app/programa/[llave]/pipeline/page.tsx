import type { Metadata } from 'next';
import { LLAVES } from '@/lib/programa/config';
import PipelineApp from '../../PipelineApp';

export const metadata: Metadata = {
  title: 'Pipeline | Programa',
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return LLAVES.map((llave) => ({ llave }));
}

export default async function Page({ params }: { params: Promise<{ llave: string }> }) {
  const { llave } = await params;
  return <PipelineApp llave={llave} />;
}
