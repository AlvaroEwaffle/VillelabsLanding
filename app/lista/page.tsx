import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { SITE_URL } from '@/lib/productos/seo';
import IrAlGrupo from './IrAlGrupo';

// /lista?src=<origen> — puerta medida al grupo de WhatsApp del taller del mié 2-dic-2026 (18-nov-2026, propuesta del
// embudo-analista). Mide la carga («🧭 lista · src=…» en #revenue-villelab y GA4 lista_click con src) y el toque del botón
// («🧭 lista · botón · src=…» y GA4 lista_boton). Sin `src` cuenta como «directo».
// 19-nov-2026 (audit «nadie llegó al grupo»): sin redirección automática. Antes saltaba sola a los 7 s (React), 8,5 s
// (script) y 10 s (meta refresh); dentro del navegador de Instagram eso sacaba a la persona sin que lo pidiera y nadie
// llegó al grupo. Ahora el botón es el único camino y queda en el primer pantallazo a 360×640.

const OG_TITULO = 'Taller en vivo: arma el asistente de IA de tu WhatsApp · miércoles 2 de diciembre';
const OG_DESCRIPCION = '90 minutos en vivo, 17:00 de Chile. Entra al grupo donde aviso primero cuando abran las inscripciones.';
const OG_ALT = 'Taller en vivo: arma el asistente de IA de tu WhatsApp. Miércoles 2 de diciembre, 17:00 de Chile, 90 minutos';

export const metadata: Metadata = {
  title: { absolute: 'Grupo del taller · Villelab' },
  description: 'Entra al grupo de WhatsApp del taller en vivo.',
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

export default function ListaPage() {
  return (
    <main className={`${fraunces.variable} flex min-h-[100svh] items-start justify-center bg-[#0f172a] px-4 pb-10 pt-6 text-slate-200 sm:items-center sm:py-12`}>
      <div className="w-full max-w-sm text-center">
        {/* 18-nov-2026 (pedido de Álvaro): el chibi de la marca, para que la pantalla de paso no se vea vacía.
            19-nov-2026: más chico (144 → 80 px) para que el botón entre en el primer pantallazo a 360×640. */}
        <img
          src="/chat/chibi-feliz.webp"
          alt=""
          width={80}
          height={80}
          className="mx-auto mb-3 h-20 w-20 rounded-full bg-[#162a44] ring-2 ring-[#2175a1]/60"
        />
        <h1 className="font-serif text-3xl leading-tight text-white">Grupo del taller en vivo</h1>
        <p className="mt-2 text-base text-white">
          Estás un paso más cerca de crear tu primer asistente para tu negocio.
        </p>
        {/* 18-nov-2026 (Álvaro, tras el audit del Santi): qué es el taller, antes de saltar al grupo. Sin precio.
            19-nov-2026: la fecha queda arriba del botón; el detalle (qué armas y para quién) baja bajo el botón. */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">Taller pagado en vivo</p>
          <p className="mt-1 text-base font-medium text-white">Miércoles 2 de diciembre · 17:00&nbsp;de&nbsp;Chile · 90&nbsp;minutos</p>
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Entra al grupo de WhatsApp del taller. Ahí aviso primero cuando abran las inscripciones.
        </p>
        <IrAlGrupo />
        <div className="mt-6 border-t border-white/10 pt-4 text-left">
          <p className="text-sm text-slate-300">
            Armas tu asistente de IA con tus respuestas y lo conectas a WhatsApp Web, en vivo, con un número de prueba.
          </p>
          <p className="mt-2 text-sm text-slate-400">Para clínicas, estudios y agencias que atienden por WhatsApp.</p>
        </div>
      </div>
    </main>
  );
}
