import type { Metadata } from 'next';
import DiagnosticContent from './DiagnosticContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Descubre como te podemos ayudar | Diagnostico',
  description:
    'Responde 10 preguntas y recibe un diagnostico personalizado con recomendaciones concretas para tu negocio.',
  alternates: { canonical: `${siteUrl}/diagnostic` },
  robots: { index: true, follow: true },
};

export default function DiagnosticPage() {
  return <DiagnosticContent />;
}
