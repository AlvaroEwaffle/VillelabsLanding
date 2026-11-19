import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { SITE_URL } from '@/lib/productos/seo';
import { Bell, Bot, CheckCheck, Link2, PencilLine, Receipt, ShieldCheck, Sheet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import BarraFija from './BarraFija';
import IrAlGrupo from './IrAlGrupo';
import MedirLista from './MedirLista';
import PorCorreo from './PorCorreo';
import Preguntas, { type Pregunta } from './Preguntas';
import { SCRIPT_EXP24 } from './sorteo';
import { NOTA_GRUPO } from './textos';

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
// 19-nov-2026 ~20:00 (Álvaro, tras ver las capturas: «demasiado texto, más apoyos visuales, más jerarquías»): rediseño. Pantalla 1
// con etiqueta + datos en chips, título más corto (90 minutos pasa a un chip), razón para entrar en cajita. Cola en bandas con
// antetítulo: 3 pasos de los 90 minutos, tarjetas con ícono, prueba del 18-nov en 3 pasos, cifras grandes, foto, preguntas,
// cierre, y barra fija inferior con el botón (solo B, «botón fijo»). Los textos corregidos por el revisor mandan: solo se acortan.

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

type Item = { icono: LucideIcon; titulo: string; texto: string };

// «Con qué sales» (revisor 19-nov, acortado por el rediseño sin cambiar el sentido).
const SALES_CON: Item[] = [
  { icono: Bot, titulo: 'Tu asistente escrito', texto: 'Con tus precios, horarios y respuestas, probado en Claude con 3 mensajes.' },
  { icono: Link2, titulo: 'Conectado con un número de prueba', texto: 'A WhatsApp Web desde Chrome, contestando cuando tú se lo pides.' },
  { icono: ShieldCheck, titulo: 'Sus reglas', texto: 'Qué contesta y qué deja para que lo contestes tú: descuentos, reclamos, lo que no está en tu hoja.' },
  { icono: Sheet, titulo: 'Planilla de seguimiento', texto: 'Lista para usar con cada cliente.' },
  { icono: Receipt, titulo: 'Lo que cuesta de verdad', texto: 'Cuenta de IA, computador encendido y cómo cuidar tu número.' },
];

// Los 90 minutos en 3 pasos: solo lo que ya promete «Con qué sales».
const PASOS_TALLER = [
  { n: 1, titulo: 'Arma', texto: 'tu asistente con tus respuestas' },
  { n: 2, titulo: 'Conecta', texto: 'a WhatsApp Web con un número de prueba' },
  { n: 3, titulo: 'Reglas', texto: 'qué contesta y qué deja para ti' },
];

// 19-nov-2026 18:30 (Álvaro): sin tiempos. Revisor: segundo número y tres mensajes de prueba (2 con la hoja, 1 derivado).
const PRUEBA_18: Item[] = [
  { icono: PencilLine, titulo: 'Lo armé', texto: 'con mis respuestas' },
  { icono: Link2, titulo: 'Lo conecté', texto: 'a WhatsApp Web con un segundo número' },
  { icono: CheckCheck, titulo: 'Contestó 3 mensajes de prueba', texto: 'dos con mi hoja y un pedido de descuento derivado con mi frase' },
];

// Cifras: ESTRATEGIA-2DIC §3 (Ewaffle 13→36 proyectos y 11→14 clientes, 2025 a 2026) y OFERTA-CENTRAL (Fidelidapp, versión
// gestionada, 30 días al 17-nov; 46 % de noche en un negocio). Sin nombres de clientes.
const CIFRAS = [
  { valor: '13 → 36', texto: 'proyectos en mi agencia, con agentes a diario (2025 a 2026)' },
  { valor: '11 → 14', texto: 'clientes de mi agencia en el mismo período' },
  { valor: '581', texto: 'conversaciones en 5 negocios' },
  { valor: '41', texto: 'reservas en esos 5 negocios' },
  { valor: '46 %', texto: 'de los mensajes llega de noche, en uno de ellos' },
];

const PREGUNTAS: Pregunta[] = [
  { p: '¿Cuánto cuesta?', r: 'Es un taller pagado. El precio lo publico el jueves 26, primero en el grupo.' },
  {
    p: '¿Necesito saber programar?',
    r: 'No. Necesitas un computador con Chrome, una cuenta de Claude de pago (plan Pro o superior) y WhatsApp Web con un número de prueba. Antes del taller te pido llenar una hoja con tus respuestas: son 15 minutos.',
  },
  {
    p: '¿Queda funcionando todo el día?',
    r: 'No. Contesta mientras tienes Chrome abierto y se lo pides: en mi prueba del 18 revisó unos minutos seguidos, no el día entero. Si prefieres que no dependa de tu computador, al final te muestro la versión gestionada.',
  },
  {
    p: '¿Contesta cualquier cosa por mí?',
    r: 'No. Le escribes qué puede contestar. Lo que no está en tu hoja, como un descuento o un reclamo, lo deriva con la frase que tú elijas y queda para que lo contestes tú.',
  },
  // 19-nov-2026 18:31 (Álvaro): el grupo es solo de avisos. No se dice nada sobre si los demás ven tu número.
  // Revisor 19-nov: «solo escribo yo» fuera hasta que Álvaro confirme el ajuste del grupo (ver app/lista/textos.ts).
  { p: '¿Me van a llenar de mensajes?', r: `Uno o dos mensajes al día hasta el taller. ${NOTA_GRUPO}` },
];

function Antetitulo({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5fb2dd]">{children}</p>;
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-2 font-serif text-[1.65rem] leading-tight text-white">{children}</h2>;
}

/** Banda de ancho completo con su contenido en la columna del celular; `alterna` le da el fondo suave. */
function Banda({ children, alterna = false, id }: { children: React.ReactNode; alterna?: boolean; id?: string }) {
  return (
    <section id={id} className={alterna ? 'border-y border-white/[0.06] bg-[#13233b]' : ''}>
      <div className="mx-auto max-w-sm px-4 py-12">{children}</div>
    </section>
  );
}

export default function ListaPage() {
  return (
    <main className={`${fraunces.variable} min-h-[100svh] bg-[#0f172a] text-slate-200`}>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_EXP24 }} />
      <style dangerouslySetInnerHTML={{ __html: CSS_EXP24 }} />
      <MedirLista />

      {/* Pantalla 1 · igual en A y B · el botón tiene que quedar dentro de 360×640. */}
      <section className="mx-auto max-w-sm px-4 pb-10 pt-5 text-center">
        {/* 18-nov-2026 (pedido de Álvaro): el chibi de la marca; con el rediseño, 56 px. */}
        <img
          src="/chat/chibi-feliz.webp"
          alt=""
          width={56}
          height={56}
          className="mx-auto h-14 w-14 rounded-full bg-[#162a44] ring-2 ring-[#2175a1]/60"
        />
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#5fb2dd]">Taller pagado en vivo</p>
        <ul className="mt-2 flex flex-wrap justify-center gap-1.5 text-[13px] font-medium text-white" aria-label="Cuándo y cuánto dura">
          <li className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1">Mié 2 dic</li>
          <li className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1">17:00 Chile</li>
          <li className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1">90 minutos</li>
        </ul>
        <h1 className="mt-4 font-serif text-[1.9rem] leading-[1.12] text-white">
          Arma tu asistente de IA y conéctalo a WhatsApp&nbsp;Web
        </h1>
        <p className="mt-3 text-base leading-snug text-slate-300">
          Con las respuestas de tu negocio. Para clínicas, estudios y agencias que responden a mano las mismas preguntas por WhatsApp.
        </p>
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#2175a1]/50 bg-[#2175a1]/15 px-4 py-3 text-left">
          <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
          <p className="text-[15px] leading-snug text-white">
            Entra al grupo de WhatsApp: el jueves 26 aviso ahí primero cuando abra las inscripciones.
          </p>
        </div>
        <IrAlGrupo boton={1} nota />
        <PorCorreo lugar={1} className="mt-3" />
      </section>

      {/* Cola · solo B (EXP-24). pb para que la barra fija no tape el final. */}
      <div className="cola-b pb-24">
        <Banda alterna>
          <Antetitulo>Cómo son los 90 minutos</Antetitulo>
          <Titulo>Con qué sales el 2 de diciembre</Titulo>
          <ol className="mt-6 grid grid-cols-3 gap-2">
            {PASOS_TALLER.map((p) => (
              <li key={p.n} className="flex flex-col items-center text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2175a1] text-base font-bold text-white" aria-hidden>
                  {p.n}
                </span>
                <span className="mt-2 text-[15px] font-semibold text-white">
                  <span className="sr-only">Paso {p.n}: </span>
                  {p.titulo}
                </span>
                <span className="mt-0.5 text-[13px] leading-snug text-slate-300">{p.texto}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-8 space-y-3">
            {SALES_CON.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className="flex gap-3 rounded-2xl border border-white/10 bg-[#0f172a]/70 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2175a1]/25 text-[#5fb2dd]">
                  <Icono className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-base font-semibold leading-snug text-white">{titulo}</span>
                  <span className="mt-0.5 block text-[15px] leading-snug text-slate-300">{texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </Banda>

        <Banda>
          <Antetitulo>Lo que ya probé</Antetitulo>
          <Titulo>El 18 de noviembre lo probé yo mismo</Titulo>
          <ol className="mt-6">
            {PRUEBA_18.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} className="relative flex gap-3 pb-5 last:pb-0">
                {i < PRUEBA_18.length - 1 && <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-[#2175a1]/60" aria-hidden />}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2175a1]/70 bg-[#162a44] text-[#5fb2dd]">
                  <Icono className="h-5 w-5" aria-hidden />
                </span>
                <span className="pt-1.5">
                  <span className="block text-base font-semibold leading-snug text-white">{titulo}</span>
                  <span className="block text-[15px] leading-snug text-slate-300">{texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            {CIFRAS.map((c) => (
              <div key={c.valor} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 last:col-span-2">
                <dt className="order-2 mt-1 text-[13px] leading-snug text-slate-300">{c.texto}</dt>
                <dd className="order-1 font-serif text-[1.9rem] font-semibold leading-none text-white">{c.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] leading-snug text-slate-400">
            Los 5 negocios usan Fidelidapp, la versión gestionada; datos de los 30 días al 17 de noviembre. Cifras de mis negocios y de
            clientes, sin nombres. No son una promesa de lo que vas a obtener.
          </p>
          <IrAlGrupo boton={2} className="mt-8" />
        </Banda>

        <Banda alterna>
          <Antetitulo>Quién lo enseña</Antetitulo>
          <div className="mt-4 flex items-center gap-4">
            <img
              src="/fotos/alvaro-portrait.webp"
              alt="Álvaro Villena"
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 shrink-0 rounded-full object-cover object-[center_30%] ring-2 ring-[#2175a1]/60"
            />
            <div>
              <p className="text-lg font-semibold text-white">Álvaro Villena</p>
              <p className="text-[15px] leading-snug text-slate-300">Fui PM en grandes compañías.</p>
            </div>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            Llevé eso a mis dos negocios: Ewaffle, una agencia donde los agentes de IA corren a diario, y Fidelidapp, una herramienta lista
            para usar.
          </p>
        </Banda>

        <Banda>
          <Antetitulo>Antes de entrar</Antetitulo>
          <Titulo>Preguntas frecuentes</Titulo>
          <div className="mt-6">
            <Preguntas preguntas={PREGUNTAS} />
          </div>
          <PorCorreo lugar={2} className="mt-8" />
        </Banda>

        <section className="mx-auto max-w-sm px-4 pb-6">
          <div className="rounded-3xl border border-[#FF3D8B]/30 bg-gradient-to-b from-[#FF3D8B]/10 to-transparent px-5 py-6 text-center">
            <p className="font-serif text-[1.4rem] leading-snug text-white">El jueves 26 abro las inscripciones.</p>
            <p className="mt-1 text-base text-slate-300">Quien está en el grupo se entera primero.</p>
          </div>
          {/* Fuera de la tarjeta: con el padding de la tarjeta el botón no cabía en una línea a 360 px. */}
          <IrAlGrupo boton={3} nota className="mt-4" />
        </section>

        <BarraFija />
      </div>
    </main>
  );
}
