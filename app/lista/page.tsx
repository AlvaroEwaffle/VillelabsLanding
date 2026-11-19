import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { SITE_URL } from '@/lib/productos/seo';
import { Bell, Bot, Building2, Link2, MessageSquareText, Receipt, ShieldCheck, Sheet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimarLista from './AnimarLista';
import { CSS_ANIMAR } from './animar';
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
// antetítulo: 3 pasos de los 90 minutos, tarjetas con ícono, «Lo uso a diario» (foto + 2 negocios + cifras), preguntas,
// cierre, y barra fija inferior con el botón (solo B, «botón fijo»). Los textos corregidos por el revisor mandan: solo se acortan.

const OG_TITULO = 'Taller en vivo: arma el asistente de IA de tu WhatsApp · miércoles 2 de diciembre';
const OG_DESCRIPCION = '90 minutos en vivo, 17:00 de Chile. Entra al grupo donde aviso primero cuando abra las inscripciones.';
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
const CSS_EXP24 = `.cola-b{display:none}html[data-exp24="B"] .cola-b{display:block}${CSS_ANIMAR}`;

type Item = { icono: LucideIcon; titulo: string; texto: string };

// «Con qué sales» (revisor 19-nov, acortado por el rediseño sin cambiar el sentido).
const SALES_CON: Item[] = [
  { icono: Bot, titulo: 'Tu asistente escrito', texto: 'Con tus precios, horarios y respuestas, probado en Claude con 3 mensajes.' },
  { icono: Link2, titulo: 'Conectado con un número de prueba', texto: 'A WhatsApp Web desde Chrome: lo pruebas con un mensaje y te enseño a dejarlo funcionando durante el día.' },
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

// 19-nov-2026 20:06 (audio de Álvaro): fuera todo lo del 18 de noviembre («suena como que lo probé recién»). La sección habla de
// lo que usa a diario en sus dos negocios. Ojo con la verdad: no decir ni insinuar que el asistente de WhatsApp Web del taller
// es el que él usa, ni que estos resultados salen del taller.
const A_DIARIO: Item[] = [
  { icono: Building2, titulo: 'Ewaffle, mi agencia', texto: 'Los agentes corren a diario en la operación.' },
  { icono: MessageSquareText, titulo: 'Fidelidapp, mi herramienta', texto: 'La versión gestionada, atendiendo el WhatsApp de 5 negocios.' },
];

// Cifras: ESTRATEGIA-2DIC §3 (Ewaffle 13→36 proyectos y 11→14 clientes, 2025 a 2026) y OFERTA-CENTRAL (Fidelidapp, versión
// gestionada, 30 días al 17-nov; 46 % de noche en un negocio). Sin nombres de clientes.
const CIFRAS = [
  { valor: '13 → 36', texto: 'proyectos en mi agencia (2025 a 2026), mientras los agentes corrían a diario' },
  { valor: '11 → 14', texto: 'clientes de mi agencia en el mismo período' },
  { valor: '581', texto: 'conversaciones en 5 negocios con Fidelidapp, la versión gestionada' },
  { valor: '41', texto: 'reservas en esos 5 negocios: 35 por WhatsApp y 6 por Instagram' },
];

const PREGUNTAS: Pregunta[] = [
  { p: '¿Cuánto cuesta?', r: 'Es un taller pagado. El precio lo publico el jueves 26, primero en el grupo.' },
  {
    p: '¿Necesito saber programar?',
    r: 'No. Necesitas un computador con Chrome, una cuenta de Claude de pago (plan Pro o superior) y WhatsApp Web con un número de prueba. Antes del taller te pido llenar una hoja con tus respuestas: son 15 minutos.',
  },
  {
    p: '¿Queda funcionando todo el día?',
    // 19-nov 20:07 (audio de Álvaro, decisión sobre lo que enseña el taller): sí. Sin «24/7», «solo», «automático» ni «mientras duermes».
    r: 'Sí. En el taller te enseño cómo dejarlo funcionando durante el día. Necesitas un computador encendido con Chrome abierto y una conexión a internet constante.',
  },
  {
    p: '¿Contesta cualquier cosa por mí?',
    r: 'No. Le escribes qué puede contestar. Lo que no está en tu hoja, como un descuento o un reclamo, lo deriva con la frase que tú elijas y queda para que lo contestes tú.',
  },
  // 19-nov-2026 18:31 (Álvaro): el grupo es solo de avisos. No se dice nada sobre si los demás ven tu número.
  // Revisor 19-nov: «solo escribo yo» fuera hasta que Álvaro confirme el ajuste del grupo (ver app/lista/textos.ts).
  { p: '¿Me van a llenar de mensajes?', r: `Uno o dos mensajes al día hasta el taller. ${NOTA_GRUPO}` },
];

/** «13 → 36»: el último número lleva data-cuenta (cuenta desde el primero); «581»: cuenta desde 0. Sin JS se ve el valor final. */
function Cifra({ valor }: { valor: string }) {
  const m = valor.match(/^(?:(\d+) → )?(\d+)(.*)$/);
  if (!m) return <>{valor}</>;
  const [, desde, hasta, resto] = m;
  return (
    <>
      {desde ? `${desde} → ` : ''}
      <span data-cuenta={hasta} data-desde={desde ?? '0'}>
        {hasta}
      </span>
      {resto}
    </>
  );
}

function Antetitulo({ children }: { children: React.ReactNode }) {
  return (
    <p data-aparece="" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5fb2dd]">
      {children}
    </p>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 data-aparece="" className="mt-2 font-serif text-[1.65rem] leading-tight text-white">
      {children}
    </h2>
  );
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
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#5fb2dd]">Taller en vivo</p>
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
            {PASOS_TALLER.map((p, i) => (
              <li key={p.n} data-aparece={i} className="flex flex-col items-center text-center">
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
            {SALES_CON.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} data-aparece={i} className="flex gap-3 rounded-2xl border border-white/10 bg-[#0f172a]/70 p-4">
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

        {/* 19-nov 20:06 (Álvaro): «Lo que ya probé» y «Quién lo enseña» se funden en «Lo uso a diario» (sin el 18-nov). */}
        <Banda>
          <Antetitulo>Lo uso a diario</Antetitulo>
          <Titulo>Agentes de IA trabajando todos los días en mis dos negocios</Titulo>
          <div data-aparece="" className="mt-6 flex items-center gap-4">
            <img
              src="/fotos/alvaro-portrait.webp"
              alt="Álvaro Villena"
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover object-[center_30%] ring-2 ring-[#2175a1]/60"
            />
            <div>
              <p className="text-lg font-semibold text-white">Álvaro Villena</p>
              <p className="text-[15px] leading-snug text-slate-300">Fui PM en grandes compañías.</p>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {A_DIARIO.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} data-aparece={i} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
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
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {CIFRAS.map((c, i) => (
              <div key={c.valor} data-aparece={i} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="order-2 mt-1 text-[13px] leading-snug text-slate-300">{c.texto}</dt>
                <dd className="order-1 font-serif text-[1.9rem] font-semibold leading-none tabular-nums text-white">
                  <Cifra valor={c.valor} />
                </dd>
              </div>
            ))}
          </dl>
          <p data-aparece="" className="mt-4 text-[13px] leading-snug text-slate-400">
            Los 5 negocios usan Fidelidapp, la versión gestionada, que no es el asistente de WhatsApp Web que armas en el taller; datos de los 30 días al 17 de noviembre. Cifras de mis negocios y de
            clientes, sin nombres. No son una promesa de lo que vas a obtener.
          </p>
          <IrAlGrupo boton={2} className="mt-8" />
        </Banda>

        <Banda alterna>
          <Antetitulo>Antes de entrar</Antetitulo>
          <Titulo>Preguntas frecuentes</Titulo>
          <div data-aparece="" className="mt-6">
            <Preguntas preguntas={PREGUNTAS} />
          </div>
          <PorCorreo lugar={2} className="mt-8" />
        </Banda>

        <section className="mx-auto max-w-sm px-4 pb-6">
          <div data-aparece="" className="rounded-3xl border border-[#FF3D8B]/30 bg-gradient-to-b from-[#FF3D8B]/10 to-transparent px-5 py-6 text-center">
            <p className="font-serif text-[1.4rem] leading-snug text-white">El jueves 26 abro las inscripciones.</p>
            <p className="mt-1 text-base text-slate-300">Quien está en el grupo se entera primero.</p>
          </div>
          {/* Fuera de la tarjeta: con el padding de la tarjeta el botón no cabía en una línea a 360 px. */}
          <IrAlGrupo boton={3} nota className="mt-4" />
        </section>

        <BarraFija />
        <AnimarLista />
      </div>
    </main>
  );
}
