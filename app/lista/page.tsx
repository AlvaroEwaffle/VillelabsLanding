import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { SITE_URL } from '@/lib/productos/seo';
import { Check } from 'lucide-react';
import IrAlGrupo from './IrAlGrupo';
import MedirLista from './MedirLista';
import PorCorreo from './PorCorreo';
import Preguntas, { type Pregunta } from './Preguntas';
import { SCRIPT_EXP24 } from './sorteo';

// /lista?src=<origen> — puerta medida al grupo de WhatsApp del taller del mié 2-dic-2026 (18-nov-2026, propuesta del
// embudo-analista). Mide la carga («🧭 lista · src=…» en #revenue-villelab y GA4 lista_click con src) y el toque del botón
// («🧭 lista · botón · src=…» y GA4 lista_boton). Sin `src` cuenta como «directo».
// 19-nov-2026 (audit «nadie llegó al grupo»): sin redirección automática. Antes saltaba sola a los 7 s (React), 8,5 s
// (script) y 10 s (meta refresh); dentro del navegador de Instagram eso sacaba a la persona sin que lo pidiera y nadie
// llegó al grupo. Ahora el botón es el único camino y queda en el primer pantallazo a 360×640.
// 19-nov-2026 · EXP-24 (insumo ~/.claude/marca-alvaro/embudo-2dic/3-lista-whatsapp/lista-v2-santi-2026-11-19.md): pantalla 1
// nueva, igual en A y B (qué es, para quién, por qué entrar ahora, botón en el primer pantallazo); B suma la cola (qué sales
// teniendo, lo que ya probé, quién lo enseña, preguntas, cierre) con dos botones más. Sorteo 50/50 propio (sorteo.ts),
// medición con versión y posición (medicion.ts). Segundo camino en A y B: «avísame por correo» (PorCorreo.tsx).

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

// La cola nace oculta y solo se muestra con data-exp24="B" en <html> (lo pone SCRIPT_EXP24 antes de pintarla): sin parpadeo.
const CSS_EXP24 = '.cola-b{display:none}html[data-exp24="B"] .cola-b{display:block}';

const SALES_TENIENDO = [
  'Tu asistente escrito con tus precios, horarios y respuestas, y probado en Claude con 3 mensajes.',
  'Conectado a tu WhatsApp Web desde Chrome, con un número de prueba, contestando un mensaje en vivo.',
  'Sus reglas: qué puede contestar y qué te tiene que pasar a ti (descuentos, reclamos, lo que no está en tu hoja).',
  'La planilla para hacer seguimiento a cada cliente, lista para usar.',
  'Lo que cuesta de verdad: la cuenta de IA, el computador encendido y cómo cuidar tu número.',
];

// 19-nov-2026 18:30 (Álvaro): el dato de los minutos con cronómetro no va; el bullet del 18-nov queda sin tiempos.
// La cifra de Fidelidapp lleva su corte (30 días al 17-nov, OFERTA-CENTRAL.md) y «de noche» (ESTRATEGIA-2DIC §3 no fija la hora).
const YA_PROBE = [
  'El 18 de noviembre lo probé yo mismo: armé un asistente con mis respuestas, lo conecté a WhatsApp Web con un número de prueba y contestó tres mensajes.',
  'En mi agencia pasé de 13 a 36 proyectos y de 11 a 14 clientes (2025 a 2026) mientras los agentes corrían a diario.',
  'Con la versión gestionada, Fidelidapp: 5 negocios, 581 conversaciones y 41 reservas en los 30 días al 17 de noviembre. En uno, casi la mitad de los mensajes llega de noche.',
];

const PREGUNTAS: Pregunta[] = [
  { p: '¿Cuánto cuesta?', r: 'Es un taller pagado. El precio lo publico el jueves 26, primero en el grupo.' },
  {
    p: '¿Necesito saber programar?',
    r: 'No. Necesitas un computador con Chrome, una cuenta de Claude de pago (plan Pro o superior) y WhatsApp Web con un número de prueba. Antes del taller te pido llenar una hoja con tus respuestas: son 15 minutos.',
  },
  {
    p: '¿Queda funcionando todo el día?',
    r: 'Funciona mientras tu computador y Chrome estén abiertos. Si prefieres que no dependa de eso, al final te muestro la versión gestionada.',
  },
  {
    p: '¿Contesta cualquier cosa por mí?',
    r: 'No. Le escribes qué puede contestar. Lo que no está en tu hoja, como un descuento o un reclamo, lo deriva con la frase que tú elijas para que lo tomes tú.',
  },
  // 19-nov-2026 18:31 (Álvaro): el grupo es solo de avisos. No se dice nada sobre si los demás ven tu número.
  { p: '¿Me van a llenar de mensajes?', r: 'Uno o dos mensajes al día hasta el taller. Es un grupo de avisos: solo escribo yo. Sales cuando quieras.' },
];

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base text-slate-200">
          <Check className="mt-1 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ListaPage() {
  return (
    <main className={`${fraunces.variable} flex min-h-[100svh] items-start justify-center bg-[#0f172a] px-4 pb-12 pt-5 text-slate-200`}>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_EXP24 }} />
      <style dangerouslySetInnerHTML={{ __html: CSS_EXP24 }} />
      <MedirLista />
      <div className="w-full max-w-sm">
        {/* Pantalla 1 · igual en A y B · el botón tiene que quedar dentro de 360×640. */}
        <section className="text-center">
          {/* 18-nov-2026 (pedido de Álvaro): el chibi de la marca. 19-nov-2026: 80 px y con EXP-24 64 px, para que el botón entre en el pantallazo. */}
          <img
            src="/chat/chibi-feliz.webp"
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-3 h-16 w-16 rounded-full bg-[#162a44] ring-2 ring-[#2175a1]/60"
          />
          <p className="text-xs font-semibold tracking-[0.12em] text-[#5fb2dd]">
            {/* En el celular va en dos líneas cortadas a mano (si no, «CHILE» queda sola); se lee igual como una frase. */}
            <span className="block sm:inline">TALLER PAGADO EN VIVO</span>
            <span className="hidden sm:inline"> · </span>
            <span className="sr-only sm:hidden"> · </span>
            <span className="block sm:inline">MIÉ 2 DIC · 17:00 CHILE</span>
          </p>
          <h1 className="mt-2 font-serif text-[1.6rem] leading-[1.15] text-white">
            Arma un asistente de IA con las respuestas de tu negocio y conéctalo a WhatsApp Web, en 90&nbsp;minutos
          </h1>
          <p className="mt-3 text-base text-slate-200">
            Para clínicas, estudios y agencias que responden a mano las mismas preguntas por WhatsApp.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Entra al grupo de WhatsApp: el jueves 26 aviso ahí primero cuando abran las inscripciones.
          </p>
          <IrAlGrupo boton={1} nota />
          <PorCorreo lugar={1} className="mt-3" />
        </section>

        {/* Cola · solo B (EXP-24). */}
        <div className="cola-b">
          <section className="mt-10 border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl leading-tight text-white">Lo que sales teniendo el 2 de diciembre</h2>
            <Lista items={SALES_TENIENDO} />
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl leading-tight text-white">Lo que ya probé</h2>
            <Lista items={YA_PROBE} />
            <p className="mt-4 text-sm text-slate-400">Cifras de mis negocios y de clientes, sin nombres. No son una promesa de lo que vas a obtener.</p>
          </section>

          <IrAlGrupo boton={2} className="mt-8" />

          <section className="mt-10">
            <h2 className="font-serif text-2xl leading-tight text-white">Quién lo enseña</h2>
            <p className="mt-4 text-base text-slate-200">
              Soy Álvaro Villena. Fui PM en grandes compañías y llevé eso a mis dos negocios: Ewaffle, una agencia donde los agentes de IA
              trabajan a diario, y Fidelidapp, una herramienta lista para usar.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl leading-tight text-white">Preguntas frecuentes</h2>
            <div className="mt-4">
              <Preguntas preguntas={PREGUNTAS} />
            </div>
          </section>

          <PorCorreo lugar={2} className="mt-8" />

          <section className="mt-8 text-center">
            <p className="font-serif text-xl leading-snug text-white">
              El jueves 26 abro las inscripciones. Quien está en el grupo se entera primero.
            </p>
            <IrAlGrupo boton={3} nota />
          </section>
        </div>
      </div>
    </main>
  );
}
