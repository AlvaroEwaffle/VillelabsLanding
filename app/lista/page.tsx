import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { TALLER } from '@/lib/productos/taller';
import IrAlGrupo from './IrAlGrupo';

// /lista?src=<origen> — puerta medida al grupo de WhatsApp del taller del mié 2-dic-2026 (18-nov-2026, propuesta del
// embudo-analista). Registra el clic («🧭 lista · src=…» en #revenue-villelab y GA4 lista_click con src) y redirige al
// grupo (TALLER.grupo). Sin `src` cuenta como «directo». Tres redes de seguridad para que SIEMPRE redirija:
//   1) IrAlGrupo (React): mide y redirige apenas GA4 confirma, o a los 2 s.
//   2) Script en línea: redirige a los 3 s aunque React no cargue.
//   3) <meta refresh> a los 4 s: sin JavaScript.
// Además, el botón visible lleva directo al grupo.

export const metadata: Metadata = {
  title: { absolute: 'Grupo del taller · Villelab' },
  description: 'Te llevo al grupo de WhatsApp del taller en vivo.',
  robots: { index: false, follow: false },
};

const RESPALDO = `setTimeout(function(){try{location.replace(${JSON.stringify(TALLER.grupo)})}catch(e){location.href=${JSON.stringify(TALLER.grupo)}}},3000);`;

export default function ListaPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[#0f172a] px-4 py-12 text-slate-200">
      <meta httpEquiv="refresh" content={`4;url=${TALLER.grupo}`} />
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
        <p className="mt-3 text-sm text-slate-300">
          Te llevo al grupo de WhatsApp del taller pagado del 2 de diciembre. Ahí aviso primero cuando abran las inscripciones.
        </p>
        <a
          href={TALLER.grupo}
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white transition hover:bg-[#ff5c9f]"
        >
          Abrir el grupo <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-3 text-sm text-slate-400">Si no se abre solo, toca el botón.</p>
      </div>
    </main>
  );
}
