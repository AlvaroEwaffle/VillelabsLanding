import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alvarovillena.cl';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de Villelabs. Cómo tratamos tus datos (nombre, email, teléfono) en el diagnóstico digital y servicios.',
  alternates: { canonical: `${siteUrl}/privacidad` },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-16 md:py-24" id="main">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-light mb-8">Política de Privacidad</h1>
        <p className="text-white/70 font-light leading-relaxed mb-6">
          En Villelabs respetamos tu privacidad. Los datos que nos proporcionas (nombre, email, teléfono, negocio) se usan únicamente para contactarte en relación con el diagnóstico digital y los servicios solicitados. No compartimos tu información con terceros para fines de marketing.
        </p>
        <p className="text-white/70 font-light leading-relaxed mb-8">
          Si tienes preguntas sobre el tratamiento de tus datos, puedes escribirnos.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
