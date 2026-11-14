'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Calendar,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  Inbox,
  MessageCircle,
  Shield,
  Sunrise,
} from 'lucide-react';
import { DISCOVERY_CALL_URL } from '@/lib/scheduling';
import { NOTA_IVA, PRECIOS_AGENTES, uf, usd } from '@/lib/precios';
import VslAgentes from '@/components/VslAgentes';
import { FAQ_AGENTES } from '@/lib/faq';

/*
 * /agentes — landing de «Agentes como servicio» (3-nov-2026). También es la landing de Google Ads.
 * Oferta en 3 pasos decidida por Álvaro el 3-nov-2026. Precios desde lib/precios.ts (espejo del price book).
 * Medición: todo enlace a capu.villelab.com/schedule emite booking_click (components/ConversionClickTracker.tsx);
 * la reserva confirmada redirige a /reserva-confirmada, que emite generate_lead + ads_conversion.
 */

const WHATSAPP = `https://wa.me/56920115198?text=${encodeURIComponent(
  'Hola, vengo de villelab.com/agentes y quiero saber si un agente tiene sentido para mi equipo.',
)}`;

const PASOS = [
  {
    n: '01',
    titulo: 'Reunión de descubrimiento',
    precio: 'Gratis · 30 minutos',
    texto: 'Te cuento en qué se va el tiempo de tu equipo y con qué agente partiría yo.',
    incluye: [
      'Videollamada de 30 minutos conmigo, Álvaro Villena',
      'Revisamos qué tareas se repiten en tu equipo',
      'Te digo con qué agente partiría, o si un agente no tiene sentido para ustedes',
      'Sin compromiso: si no te hace sentido, ahí queda',
    ],
  },
  {
    n: '02',
    titulo: 'Implementación',
    precio: `desde ${uf(PRECIOS_AGENTES.implementacionUF)} · una vez`,
    texto: 'Dejamos funcionando el primer agente, conectado a las herramientas que tu equipo ya usa.',
    incluye: [
      'Elegimos juntos la tarea con la que parte el agente',
      'Lo conectamos a tu correo, calendario y planillas',
      'Cada persona ve solo lo que necesita para su trabajo',
      'Acompaño a cada persona hasta que lo usa en una tarea real',
      'Dejamos escritos los frenos: qué hace solo y qué te pregunta',
    ],
  },
  {
    n: '03',
    titulo: 'Mantenimiento',
    precio: `desde ${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes`,
    texto: `${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes si ya tienes tu licencia de Claude, o ${uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)} al mes con la licencia incluida: la ponemos nosotros.`,
    incluye: [
      'Lo mantenemos funcionando día a día',
      'Lo ajustamos cuando cambia tu forma de trabajar',
      'Sumamos tareas nuevas a medida que el equipo lo pide',
      'Soporte para las personas que lo usan',
      'Una revisión al mes de qué mejorar',
    ],
  },
];

const CASOS = [
  {
    icon: Inbox,
    titulo: 'Borradores de respuesta a correos',
    antes: 'Revisas la bandeja y escribes cada respuesta desde cero.',
    despues: 'El agente lee lo que llega, separa lo importante y te deja la respuesta escrita para que la revises y la envíes.',
  },
  {
    icon: Sunrise,
    titulo: 'Resumen del día',
    antes: 'Saltas entre el correo, WhatsApp y las planillas para saber qué pasó y qué falta.',
    despues: 'A primera hora tienes un resumen: qué llegó, qué está pendiente y qué vence hoy.',
  },
  {
    icon: FileText,
    titulo: 'Seguimiento de propuestas',
    antes: 'Las propuestas enviadas quedan sin respuesta porque nadie se acordó de insistir.',
    despues: 'El agente lleva la cuenta de cada propuesta y prepara el seguimiento en el momento justo.',
  },
  {
    icon: ClipboardList,
    titulo: 'De la reunión a las tareas',
    antes: 'Después de cada reunión alguien tiene que pasar en limpio los acuerdos, y a veces nadie lo hace.',
    despues: 'Con las notas de la reunión, el agente arma la lista de tareas con responsable y fecha para que la revises.',
  },
  {
    icon: BarChart3,
    titulo: 'Reportes semanales',
    antes: 'Cada viernes alguien junta números de varias planillas a mano.',
    despues: 'El agente arma el borrador del reporte con los datos de la semana. Tú lo revisas y lo mandas.',
  },
  {
    icon: CalendarCheck,
    titulo: 'Agendar y confirmar reuniones',
    antes: 'Varios correos de ida y vuelta para encontrar un horario, y reuniones a las que nadie confirmó.',
    despues: 'El agente propone horarios libres, agenda la reunión y envía la confirmación el día antes.',
  },
];

const NECESITAS = [
  `La licencia de Claude. Si ya la tienen, el mantenimiento es de ${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes; si no, la ponemos nosotros y el mantenimiento es de ${uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)} al mes.`,
  'Acceso a las herramientas que usa el equipo: correo, calendario y planillas.',
  'Una persona que conozca bien la operación, para las conversaciones de la implementación.',
];

const FRENOS = [
  'Lo que compromete plata, alcance o una fecha de entrega, el agente se lo pregunta a una persona antes.',
  'Cada persona del equipo ve solo la información que necesita para su trabajo.',
  'Tú decides qué hace el agente solo y qué deja como borrador para revisar.',
];

// 13-nov-2026: las preguntas viven en lib/faq.ts (la página arma el FAQPage con el mismo texto).
const FAQ = FAQ_AGENTES;

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

function CtaReunion({ ubicacion, texto = 'Agenda tu reunión de descubrimiento' }: { ubicacion: string; texto?: string }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={DISCOVERY_CALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track-location={`agentes_${ubicacion}`}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-rosa px-6 text-center text-sm font-semibold text-white hover:bg-[#ff5c9f]"
      >
        <Calendar className="h-4 w-4 shrink-0" /> {texto}
      </a>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        data-track-location={`agentes_${ubicacion}_whatsapp`}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-green-500/30 px-6 text-sm text-green-300 hover:border-green-500/60"
      >
        <MessageCircle className="h-4 w-4" /> Prefiero escribir por WhatsApp
      </a>
    </div>
  );
}

function Pregunta({ q, a }: { q: string; a: string }) {
  // 13-nov-2026 (AI SEO): <details> nativo. Se ve igual (cerrada, se abre al tocar), pero la respuesta queda en el HTML
  // prerenderizado para buscadores y asistentes de IA, que antes solo veían la pregunta.
  return (
    <details className="group border-b border-white/10">
      <summary className="flex min-h-[56px] w-full cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base text-white sm:text-lg [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <p className="pb-5 pr-8 text-slate-300">{a}</p>
    </details>
  );
}

export default function AgentesContent() {
  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950 text-slate-200" aria-label="Agentes como servicio">
      {/* Promesa */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6 md:pt-44">
        <Kicker>Agentes como servicio · Villelabs</Kicker>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
          Un agente de IA que hace el trabajo repetitivo de tu equipo.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
          Responde correos, hace seguimiento a propuestas, arma reportes y agenda reuniones. Lo instalo, lo conecto a tus herramientas y lo
          mantengo funcionando. Lo que compromete plata, alcance o fechas, te lo pregunta antes.
        </p>
        <ul className="mt-6 flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Reunión gratis de 30 minutos</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Implementación desde {uf(PRECIOS_AGENTES.implementacionUF)}</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Mantenimiento desde {uf(PRECIOS_AGENTES.mantenimientoUF)} al mes</li>
        </ul>
        <p className="mt-3 text-xs text-slate-400">{NOTA_IVA.es}</p>
        <VslAgentes />
        <CtaReunion ubicacion="hero" />
        {/* 12-nov-2026: enlace al cotizador (para la gente y para que Google lo encuentre). */}
        <Link
          href="/cotizador"
          data-track-location="agentes_hero_cotizador"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#5fb2dd] underline-offset-4 hover:underline"
        >
          <Calculator className="h-4 w-4" /> Cotiza tu agente en 1 minuto <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* 3 pasos */}
      <section id="pasos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>Cómo funciona</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Tres pasos, precios claros.</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {PASOS.map((p, i) => (
            <li
              key={p.n}
              className={`flex flex-col rounded-3xl border p-6 ${i === 0 ? 'border-accent/50 bg-accent/[0.07]' : 'border-white/10 bg-white/[0.02]'}`}
            >
              <span className="font-mono text-sm text-accent">{p.n}</span>
              <h3 className="mt-3 text-2xl text-white">{p.titulo}</h3>
              <p className="mt-2 text-lg font-medium text-accent">{p.precio}</p>
              <p className="mt-3 text-slate-300">{p.texto}</p>
              <p className="mt-5 text-xs uppercase tracking-wider text-slate-400">Incluye</p>
              <ul className="mt-3 space-y-2">
                {p.incluye.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-slate-400">
          Precios en UF. {NOTA_IVA.es} Mantenimiento: {uf(PRECIOS_AGENTES.mantenimientoUF)} al mes si ya tienen su licencia de Claude, o {uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)} al mes con la licencia incluida.
        </p>
      </section>

      {/* Casos de uso */}
      <section id="casos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>Casos de uso típicos</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Tareas que tu equipo hace todas las semanas.</h2>
        <p className="mt-4 max-w-2xl text-slate-300">Pensado para equipos de 3 a 15 personas. Así se ve el antes y el después.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASOS.map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.titulo} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-accent" />
                  <h3 className="text-lg text-white">{c.titulo}</h3>
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">Antes</p>
                <p className="mt-1 text-sm text-slate-400">{c.antes}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-accent">Después</p>
                <p className="mt-1 text-sm text-slate-200">{c.despues}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Qué necesitas + frenos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <Kicker>Qué necesitas tú</Kicker>
            <ul className="mt-5 space-y-3">
              {NECESITAS.map((x) => (
                <li key={x} className="flex items-start gap-3 text-slate-300">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">Los frenos</p>
            <ul className="mt-5 space-y-3">
              {FRENOS.map((x) => (
                <li key={x} className="flex items-start gap-3 text-emerald-100">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Prueba */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Kicker>Por qué creerme</Kicker>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Así opero mis propios negocios.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Ewaffle y Fidelidapp funcionan todos los días con estos agentes: correos, propuestas, seguimientos y agenda. No te vendo una demo,
            te instalo lo que ya uso.
          </p>
          <p className="mt-6 text-sm text-slate-400">
            Álvaro Villena · Ex-LATAM Airlines · Ex-PepsiCo vía Toptal · +8 años liderando equipos de producto.{' '}
            <Link href="/sobre-mi" className="text-slate-300 underline-offset-4 hover:underline">Más sobre mí</Link>
          </p>
        </div>
      </section>

      {/* Preguntas */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Kicker>Preguntas</Kicker>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Lo que suelen preguntarme.</h2>
        <div className="mt-8 border-t border-white/10">
          {FAQ.map((f) => (
            <Pregunta key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* Llamado final */}
      <section className="mx-auto max-w-6xl px-4 pb-32 pt-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 p-6 sm:p-10">
          <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">Partamos por 30 minutos, gratis.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Te cuento en qué se va el tiempo de tu equipo y con qué agente partiría yo. Si un agente no tiene sentido para ustedes, te lo digo.
          </p>
          <CtaReunion ubicacion="final" />
        </div>
      </section>
    </main>
  );
}
