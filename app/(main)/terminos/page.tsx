import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alvarovillena.cl';

export const metadata: Metadata = {
  title: 'Términos de Uso',
  description:
    'Términos de uso del sitio Villelabs y condiciones del diagnóstico digital y servicios de diseño web boutique.',
  alternates: { canonical: `${siteUrl}/terminos` },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-16 md:py-24" id="main">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-light mb-8">Términos de Uso</h1>
        <p className="text-white/70 font-light leading-relaxed mb-6">
          El uso de este sitio y la solicitud de diagnóstico digital implican aceptar que la información proporcionada será utilizada para fines de contacto y propuesta de servicios. Los entregables y plazos se definen en acuerdos específicos tras el diagnóstico.
        </p>
        <p className="text-white/70 font-light leading-relaxed mb-8">
          Para consultas sobre términos específicos de un proyecto, contáctanos directamente.
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
