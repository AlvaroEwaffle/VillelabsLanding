'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Calendar, Compass, FileText, Inbox, Megaphone, MessageCircle, Search, Shield, Users, ChevronDown, Quote } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/*
 * Home de Villelab (26-oct-2026). Estructura tipo ewaffle.cl: una promesa, el problema en tres líneas,
 * tres ofertas, cómo trabajamos, prueba real, preguntas y un solo llamado repetido.
 * Precios: solo desde VPM/Villelabs/pricing/price-book.json (los mismos que muestra /catalogo).
 */

const WHATSAPP = 'https://wa.me/56920115198';
const usd = (n: number) => `USD $${n.toLocaleString('es-CL')}`;
const PRECIOS = { diagnostico: 2420, setup: 2420, operacion: 2960, cto: 3500 };

// Solo nombres que ya son públicos en villelab.com, ewaffle.cl o alvarovillena.cl. Sin logo => insignia de texto.
// `color`: logos tipo sello (fondo propio) que se ven mal en blanco plano; van con sus colores.
type Cliente = { nombre: string; logo?: string; nota?: string; color?: boolean };
const CORPORACIONES: Cliente[] = [
  { nombre: 'LATAM Airlines', logo: '/logos/latam.svg' },
  { nombre: 'PepsiCo', nota: 'vía Toptal' },
];
const CORPORACIONES_EWAFFLE: Cliente[] = [
  { nombre: 'ACHS', logo: '/logos/achs.svg', color: true },
  { nombre: 'Duoc UC', logo: '/logos/duoc-uc.svg' },
  { nombre: 'AIEP', logo: '/logos/aiep.svg' },
  { nombre: 'Universidad Santo Tomás', logo: '/logos/ust.svg' },
  { nombre: 'UNIACC', logo: '/logos/uniacc.svg' },
  { nombre: 'Universidad Gabriela Mistral', logo: '/logos/ugm.svg' },
  { nombre: 'Coanil', logo: '/logos/coanil.png' },
];
const MEDIANAS: Cliente[] = [
  { nombre: 'Jooycar', logo: '/logos/jooycar.svg' },
  { nombre: 'We Techs', logo: '/logos/wetechs.svg' },
  { nombre: 'Progreso', logo: '/logos/progreso.png' },
  { nombre: 'Buffalo Waffles', logo: '/logos/buffalo.webp', color: true },
  { nombre: 'Cervecería Puchacay' },
  { nombre: 'Defensa Total' },
  { nombre: 'Conexión Industrial' },
];
const PROPIOS: Cliente[] = [
  { nombre: 'Ewaffle', logo: '/logos/ewaffle.png' },
  { nombre: 'Fidelidapp', logo: '/logos/fidelidapp.png' },
];

const COPY = {
  es: {
    kicker: 'IA aplicada al trabajo · Agentes y workflows',
    titulo: 'Agentes de IA que hacen el trabajo repetitivo de tu equipo.',
    bajada:
      'Los instalamos, los conectamos a tu información y los operamos contigo. Leen, ordenan, redactan y hacen seguimiento. Lo que compromete plata, alcance o fechas, te lo preguntan.',
    ctaPrincipal: 'Agenda un diagnóstico',
    ctaCatalogo: 'Pruébalos en el catálogo',
    whatsappTexto: 'Hola, vengo de villelab.com y quiero saber si un agente tiene sentido para mi equipo.',
    problemaKicker: 'El problema',
    problemaTitulo: 'Tu equipo pierde horas en tareas que se repiten.',
    problemas: [
      'Correos que hay que leer, separar y responder, todos los días.',
      'Propuestas, seguimientos y reportes que se arman a mano, uno por uno.',
      'Ya probaron ChatGPT, pero conversa: no hace el trabajo ni conoce tu negocio.',
    ],
    ofertasKicker: 'Qué hacemos',
    ofertasTitulo: 'Tres formas de trabajar juntos.',
    ofertas: [
      {
        icon: Compass,
        tag: 'Para partir',
        titulo: 'Diagnóstico',
        texto: 'Dos semanas para ver dónde se le va el tiempo a tu equipo y qué agente conviene partir primero.',
        precio: `desde ${usd(PRECIOS.diagnostico)} · 2 semanas · se descuenta si sigues`,
        href: '/catalogo#formato-01',
      },
      {
        icon: Users,
        tag: 'Servicio mensual',
        titulo: 'Agents as a Service',
        texto: 'Cada persona trabaja con un agente que conoce el negocio, sus herramientas y sus límites. Lo instalamos y lo mejoramos cada mes.',
        precio: `instalación desde ${usd(PRECIOS.setup)} + desde ${usd(PRECIOS.operacion)}/mes`,
        nota: 'Las licencias de Claude (~USD 25–30 por persona al mes) las paga tu empresa directo.',
        href: '/catalogo#formato-06',
        destacado: true,
      },
      {
        icon: Search,
        tag: 'Dirección técnica',
        titulo: 'CTO fraccional',
        texto: 'Si lo que necesitas es alguien que dirija la parte técnica de un proyecto propio.',
        precio: `desde ${usd(PRECIOS.cto)}/mes`,
        href: '/catalogo#formato-07',
      },
    ],
    verEnCatalogo: 'Ver en el catálogo',
    pasosKicker: 'Cómo trabajamos',
    pasosTitulo: 'De la primera llamada a agentes trabajando.',
    pasos: [
      { n: '01', titulo: 'Diagnóstico', texto: 'Mapeamos roles, tareas que se repiten e información. Elegimos el primer agente.' },
      { n: '02', titulo: 'Instalación', texto: 'Lo conectamos a tus herramientas, con permisos por persona. Cada uno sale usando al menos un flujo real.' },
      { n: '03', titulo: 'Operación', texto: 'Lo mantenemos, sumamos tareas nuevas y lo mejoramos todos los meses.' },
    ],
    pruebaKicker: 'Por qué creernos',
    pruebaTitulo: 'Es el mismo sistema con el que operamos nuestros propios negocios.',
    pruebaBajada:
      'Ewaffle y Fidelidapp funcionan todos los días con estos agentes. No te vendemos una demo: te instalamos lo que ya usamos.',
    agentes: [
      { icon: Inbox, texto: 'Ordenan el correo y dejan las respuestas escritas' },
      { icon: FileText, texto: 'Arman propuestas con la lista de precios' },
      { icon: Calendar, texto: 'Sincronizan calendarios para que nadie te agende encima' },
      { icon: Megaphone, texto: 'Producen y publican contenido' },
    ],
    freno: 'El freno: nada que comprometa plata, alcance o una fecha de entrega sale sin el sí de una persona.',
    autor: 'Lo dirige Álvaro Villena · Ex-LATAM Airlines · Ex-PepsiCo vía Toptal · +8 años liderando equipos de producto.',
    clientesKicker: 'Con quién he trabajado',
    clientesTitulo: 'Experiencia con grandes corporaciones y empresas medianas.',
    grupoCorporaciones: 'Grandes corporaciones',
    multinacional: 'Una multinacional de consumo masivo',
    multinacionalNota: 'nombre reservado',
    viaEwaffle: 'Con Ewaffle, mi empresa de formación digital',
    grupoMedianas: 'Empresas medianas y startups',
    propios: 'Mis propios negocios, operados con agentes',
    faqKicker: 'Preguntas',
    faqTitulo: 'Lo que suelen preguntarnos.',
    faq: [
      { q: '¿Es un chatbot?', a: 'No. Un chatbot conversa. Un agente hace tareas completas: lee, ordena, redacta y hace seguimiento, dentro de los límites que tú defines.' },
      { q: '¿Mi equipo tiene que saber programar?', a: 'No. Está pensado para equipos no técnicos. En la instalación acompañamos a cada persona hasta que usa su agente en un flujo real.' },
      { q: '¿Qué pasa con la información de mi empresa?', a: 'Cada persona tiene permisos según su rol, y el agente solo ve lo que necesita para su tarea. Lo definimos juntos en el diagnóstico.' },
      { q: '¿Cuánto cuesta?', a: `El diagnóstico parte en ${usd(PRECIOS.diagnostico)}. Agents as a Service parte en ${usd(PRECIOS.setup)} de instalación más ${usd(PRECIOS.operacion)} al mes. El alcance exacto se cierra en el diagnóstico.` },
      { q: '¿Y si un agente no tiene sentido para mi equipo?', a: 'Te lo decimos en la primera llamada. Preferimos eso a venderte algo que no van a usar.' },
    ],
    finalTitulo: 'Partimos por entender tu operación, no por vender un agente.',
    finalBajada: 'En 30 minutos vemos qué tareas se repiten en tu equipo y si un agente tiene sentido.',
  },
  en: {
    kicker: 'Applied AI for work · Agents and workflows',
    titulo: 'AI agents that do your team’s repetitive work.',
    bajada:
      'We install them, connect them to your information and run them with you. They read, sort, draft and follow up. Anything that commits money, scope or dates, they ask you first.',
    ctaPrincipal: 'Book a diagnostic',
    ctaCatalogo: 'Try them in the catalog',
    whatsappTexto: 'Hi, I found villelab.com and want to know if an agent makes sense for my team.',
    problemaKicker: 'The problem',
    problemaTitulo: 'Your team loses hours on repetitive tasks.',
    problemas: [
      'Emails to read, sort and answer, every single day.',
      'Proposals, follow-ups and reports built by hand, one by one.',
      'You tried ChatGPT, but it chats: it doesn’t do the work or know your business.',
    ],
    ofertasKicker: 'What we do',
    ofertasTitulo: 'Three ways to work together.',
    ofertas: [
      { icon: Compass, tag: 'To start', titulo: 'Diagnostic', texto: 'Two weeks to find where your team’s time goes and which agent to start with.', precio: `from ${usd(PRECIOS.diagnostico)} · 2 weeks · credited if you continue`, href: '/catalogo#formato-01' },
      { icon: Users, tag: 'Monthly service', titulo: 'Agents as a Service', texto: 'Each person works with an agent that knows the business, its tools and its limits. We install it and improve it every month.', precio: `setup from ${usd(PRECIOS.setup)} + from ${usd(PRECIOS.operacion)}/month`, nota: 'Claude licenses (~USD 25–30 per person/month) are paid by your company directly.', href: '/catalogo#formato-06', destacado: true },
      { icon: Search, tag: 'Technical leadership', titulo: 'Fractional CTO', texto: 'When you need someone to lead the technical side of your own project.', precio: `from ${usd(PRECIOS.cto)}/month`, href: '/catalogo#formato-07' },
    ],
    verEnCatalogo: 'See in the catalog',
    pasosKicker: 'How we work',
    pasosTitulo: 'From the first call to agents at work.',
    pasos: [
      { n: '01', titulo: 'Diagnostic', texto: 'We map roles, repetitive tasks and information, and pick the first agent.' },
      { n: '02', titulo: 'Setup', texto: 'We connect it to your tools with per-person permissions. Everyone leaves using at least one real flow.' },
      { n: '03', titulo: 'Operation', texto: 'We maintain it, add new tasks and improve it every month.' },
    ],
    pruebaKicker: 'Why trust us',
    pruebaTitulo: 'It’s the same system we use to run our own businesses.',
    pruebaBajada: 'Ewaffle and Fidelidapp run on these agents every day. We don’t sell you a demo: we install what we already use.',
    agentes: [
      { icon: Inbox, texto: 'Sort email and leave replies drafted' },
      { icon: FileText, texto: 'Build proposals from the price list' },
      { icon: Calendar, texto: 'Sync calendars so nobody double-books you' },
      { icon: Megaphone, texto: 'Produce and publish content' },
    ],
    freno: 'The brake: nothing that commits money, scope or a delivery date goes out without a person’s yes.',
    autor: 'Led by Álvaro Villena · Ex-LATAM Airlines · Ex-PepsiCo via Toptal · 8+ years leading product teams.',
    clientesKicker: 'Who I’ve worked with',
    clientesTitulo: 'Experience with large corporations and mid-sized companies.',
    grupoCorporaciones: 'Large corporations',
    multinacional: 'A global consumer goods company',
    multinacionalNota: 'name withheld',
    viaEwaffle: 'With Ewaffle, my digital learning company',
    grupoMedianas: 'Mid-sized companies and startups',
    propios: 'My own businesses, run with agents',
    faqKicker: 'Questions',
    faqTitulo: 'What people usually ask.',
    faq: [
      { q: 'Is it a chatbot?', a: 'No. A chatbot chats. An agent does complete tasks: reads, sorts, drafts and follows up, within limits you define.' },
      { q: 'Does my team need to code?', a: 'No. It’s built for non-technical teams. During setup we walk each person through until they use their agent on a real flow.' },
      { q: 'What about my company’s information?', a: 'Each person has role-based permissions, and the agent only sees what its task needs. We define it together in the diagnostic.' },
      { q: 'How much does it cost?', a: `The diagnostic starts at ${usd(PRECIOS.diagnostico)}. Agents as a Service starts at ${usd(PRECIOS.setup)} setup plus ${usd(PRECIOS.operacion)} per month. Exact scope is set in the diagnostic.` },
      { q: 'What if an agent doesn’t make sense for my team?', a: 'We’ll tell you on the first call. We’d rather do that than sell you something you won’t use.' },
    ],
    finalTitulo: 'We start by understanding your operation, not by selling an agent.',
    finalBajada: 'In 30 minutes we look at which tasks repeat in your team and whether an agent makes sense.',
  },
};

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

function Ctas({ c }: { c: (typeof COPY)['es'] }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link href="/diagnostic" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-[#2a8bbd]">
        {c.ctaPrincipal} <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href="/catalogo" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 hover:border-white/30">
        {c.ctaCatalogo}
      </Link>
      <a
        href={`${WHATSAPP}?text=${encodeURIComponent(c.whatsappTexto)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-green-500/30 px-6 text-sm text-green-300 hover:border-green-500/60"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}

function Logo({ c }: { c: Cliente }) {
  return (
    <li className="flex h-20 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-center" title={c.nombre}>
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.logo} alt={c.nombre} loading="lazy" className={`max-h-10 max-w-full object-contain ${c.color ? '' : 'opacity-80 brightness-0 invert'}`} />
      ) : (
        <span className="text-sm font-medium leading-tight text-slate-200">{c.nombre}</span>
      )}
      {c.nota ? <span className="mt-1 text-[11px] text-slate-500">{c.nota}</span> : null}
    </li>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h3 className="text-sm uppercase tracking-wider text-slate-400">{titulo}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{children}</ul>
    </div>
  );
}

function Pregunta({ q, a }: { q: string; a: string }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setAbierta(!abierta)}
        className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base text-white sm:text-lg"
        aria-expanded={abierta}
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${abierta ? 'rotate-180' : ''}`} />
      </button>
      {abierta ? <p className="pb-5 pr-8 text-slate-300">{a}</p> : null}
    </div>
  );
}

export default function HomeContent() {
  const { language, t } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];
  const jooycar = t.trust.testimonials.find((x) => x.name === 'Jooycar');

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" id="home" aria-label="Main content">
      {/* Promesa */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 md:pt-44">
        <Kicker>{c.kicker}</Kicker>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{c.titulo}</h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">{c.bajada}</p>
        <Ctas c={c} />
      </section>

      {/* Problema */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>{c.problemaKicker}</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{c.problemaTitulo}</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {c.problemas.map((p) => (
            <li key={p} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-slate-300">
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Ofertas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>{c.ofertasKicker}</Kicker>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{c.ofertasTitulo}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.ofertas.map((o) => {
            const Icon = o.icon;
            return (
              <article
                key={o.titulo}
                className={`flex flex-col rounded-3xl border p-6 ${o.destacado ? 'border-accent/50 bg-accent/[0.07]' : 'border-white/10 bg-white/[0.02]'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-accent" />
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400">{o.tag}</span>
                </div>
                <h3 className="mt-5 text-2xl text-white">{o.titulo}</h3>
                <p className="mt-3 flex-1 text-slate-300">{o.texto}</p>
                <p className="mt-5 text-sm font-medium text-accent">{o.precio}</p>
                {'nota' in o && o.nota ? <p className="mt-2 text-xs text-slate-500">{o.nota}</p> : null}
                <Link href={o.href} className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
                  {c.verEnCatalogo} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>{c.pasosKicker}</Kicker>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{c.pasosTitulo}</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {c.pasos.map((p) => (
            <li key={p.n} className="rounded-2xl border border-white/10 p-6">
              <span className="font-mono text-sm text-accent">{p.n}</span>
              <h3 className="mt-3 text-xl text-white">{p.titulo}</h3>
              <p className="mt-2 text-slate-300">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Prueba */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Kicker>{c.pruebaKicker}</Kicker>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{c.pruebaTitulo}</h2>
          <p className="mt-4 max-w-2xl text-slate-300">{c.pruebaBajada}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.agentes.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.texto} className="flex items-start gap-3 text-slate-200">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {a.texto}
                </li>
              );
            })}
          </ul>
          <p className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4 text-emerald-200">
            <Shield className="mt-0.5 h-5 w-5 shrink-0" /> {c.freno}
          </p>
          <p className="mt-6 text-sm text-slate-400">{c.autor}</p>
        </div>
      </section>

      {/* Con quién he trabajado */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Kicker>{c.clientesKicker}</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{c.clientesTitulo}</h2>
        <Grupo titulo={c.grupoCorporaciones}>
          {CORPORACIONES.map((x) => <Logo key={x.nombre} c={x} />)}
          <Logo c={{ nombre: c.multinacional, nota: c.multinacionalNota }} />
        </Grupo>
        <Grupo titulo={c.viaEwaffle}>
          {CORPORACIONES_EWAFFLE.map((x) => <Logo key={x.nombre} c={x} />)}
        </Grupo>
        <Grupo titulo={c.grupoMedianas}>
          {MEDIANAS.map((x) => <Logo key={x.nombre} c={x} />)}
        </Grupo>
        <Grupo titulo={c.propios}>
          {PROPIOS.map((x) => <Logo key={x.nombre} c={x} />)}
        </Grupo>
        {jooycar ? (
          <figure className="mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <Quote className="h-6 w-6 text-accent" />
            <blockquote className="mt-4 text-lg text-slate-200">{jooycar.quote}</blockquote>
            <figcaption className="mt-4 text-sm text-slate-400">
              {jooycar.name} · {jooycar.company}
            </figcaption>
          </figure>
        ) : null}
      </section>

      {/* Preguntas */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Kicker>{c.faqKicker}</Kicker>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{c.faqTitulo}</h2>
        <div className="mt-8 border-t border-white/10">
          {c.faq.map((f) => (
            <Pregunta key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* Llamado final */}
      <section className="mx-auto max-w-6xl px-4 pb-32 pt-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 p-6 sm:p-10">
          <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">{c.finalTitulo}</h2>
          <p className="mt-4 max-w-2xl text-slate-300">{c.finalBajada}</p>
          <Ctas c={c} />
        </div>
      </section>
    </main>
  );
}
