import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import { TALLER } from '@/lib/productos/taller';
import { SITE_URL } from '@/lib/productos/seo';
import IrAlGrupo from './IrAlGrupo';

// /lista?src=<origen> — puerta medida al grupo de WhatsApp del taller del mié 2-dic-2026 (18-nov-2026, propuesta del
// embudo-analista). Registra el clic («🧭 lista · src=…» en #revenue-villelab y GA4 lista_click con src) y redirige al
// grupo (TALLER.grupo). Sin `src` cuenta como «directo». Tres redes de seguridad para que SIEMPRE redirija:
//   1) IrAlGrupo (React): mide y redirige a los 7 s (para que se lea qué es el taller).
//   2) Script en línea: redirige a los 8,5 s aunque React no cargue.
//   3) <meta refresh> a los 10 s: sin JavaScript.
// Además, el botón visible lleva directo al grupo.

const OG_TITULO = 'Taller en vivo: arma el asistente de IA de tu WhatsApp · miércoles 2 de diciembre';
const OG_DESCRIPCION = '90 minutos en vivo, 17:00 de Chile. Entra al grupo donde aviso primero cuando abren las inscripciones.';
const OG_ALT = 'Taller en vivo: arma el asistente de IA de tu WhatsApp. Miércoles 2 de diciembre, 17:00 de Chile, 90 minutos';

export const metadata: Metadata = {
  title: { absolute: 'Grupo del taller · Villelab' },
  description: 'Te llevo al grupo de WhatsApp del taller en vivo.',
  robots: { index: false, follow: false },
  // 19-nov-2026: tarjeta propia para el DM de Instagram (antes heredaba la del sitio y no se entendía que era el taller).
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: OG_TITULO,
    description: OG_DESCRIPCION,
    url: `${SITE_URL}/lista`,
    images: [{ url: `${SITE_URL}/og/lista-taller.jpg`, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: { card: 'summary_large_image', title: OG_TITULO, description: OG_DESCRIPCION, images: [`${SITE_URL}/og/lista-taller.jpg`] },
};

const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'], weight: ['400', '600'] });

const RESPALDO = `setTimeout(function(){try{location.replace(${JSON.stringify(TALLER.grupo)})}catch(e){location.href=${JSON.stringify(TALLER.grupo)}}},8500);`;

export default function ListaPage() {
  return (
    <main className={`${fraunces.variable} flex min-h-[100svh] items-center justify-center bg-[#0f172a] px-4 py-12 text-slate-200`}>
      <meta httpEquiv="refresh" content={`10;url=${TALLER.grupo}`} />
      <script dangerouslySetInnerHTML={{ __html: RESPALDO }} />
      <IrAlGrupo />
      <div className="w-full max-w-sm text-center">
        {/* 18-nov-2026 (pedido de Álvaro): el chibi de la marca, para que la pantalla de paso no se vea vacía. */}
        <img
          src="/chat/chibi-feliz.webp"
          alt=""
          width={144}
          height={144}
          className="mx-auto mb-6 h-36 w-36 rounded-full bg-[#162a44] ring-2 ring-[#2175a1]/60"
        />
        <h1 className="font-serif text-3xl leading-tight text-white">¡Felicidades!</h1>
        <p className="mt-3 text-lg text-white">
          Estás un paso más cerca de crear tu primer asistente para tu negocio.
        </p>
        {/* 18-nov-2026 (Álvaro, tras el audit del Santi): qué es el taller, antes de saltar al grupo. Sin precio. */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">Taller pagado en vivo</p>
          <p className="mt-2 text-base font-medium text-white">Miércoles 2 de diciembre · 17:00 de Chile · 90&nbsp;minutos</p>
          <p className="mt-2 text-sm text-slate-300">
            Armas tu asistente de IA con tus respuestas y lo conectas a WhatsApp Web, en vivo, con un número de prueba.
          </p>
          <p className="mt-2 text-sm text-slate-400">Para clínicas, estudios y agencias que atienden por WhatsApp.</p>
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Te llevo al grupo de WhatsApp del taller. Ahí aviso primero cuando abran las inscripciones.
        </p>
        <a
          href={TALLER.grupo}
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white transition hover:bg-[#ff5c9f]"
        >
          Abrir el grupo <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-3 text-sm text-slate-400">En unos segundos se abre solo; si no, toca el botón.</p>
      </div>
    </main>
  );
}
