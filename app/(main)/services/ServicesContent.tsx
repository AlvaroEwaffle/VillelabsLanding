'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Compass, FileText, Inbox, Search, Shield, Users } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { PageHero, Seccion, CtaFinal } from '@/components/PageBits';
import { PRECIOS_AGENTES, PRECIO_CTO_USD, TEXTO_PRECIO_AGENTES, uf, usd } from '@/lib/precios';

/*
 * Servicios (26-oct-2026): la oferta vigente son las tres formas de trabajar del home.
 * Precios solo desde lib/precios.ts, espejo de VPM/Villelabs/pricing/price-book.json (los mismos del home, /catalogo y /agentes).
 */


const COPY = {
  es: {
    kicker: 'Servicios',
    titulo: 'Tres formas de trabajar juntos.',
    bajada:
      'Instalamos y operamos agentes de IA que hacen el trabajo repetitivo de tu equipo. Partimos por una reunión gratis de 30 minutos; si tiene sentido, seguimos con la implementación y el mantenimiento mensual. Si lo que necesitas es dirección técnica para un proyecto propio, también la damos.',
    ofertas: [
      {
        icon: Compass,
        tag: 'Para partir',
        titulo: 'Reunión de descubrimiento',
        texto: 'Te cuento en qué se va el tiempo de tu equipo y con qué agente partiría yo.',
        incluye: [
          'Videollamada de 30 minutos con Álvaro Villena',
          'Revisamos qué tareas se repiten en tu equipo',
          'Con qué agente partir, o si un agente no tiene sentido para ustedes',
        ],
        precio: 'gratis · 30 minutos',
        nota: 'Sin compromiso.',
        href: '/agentes',
      },
      {
        icon: Users,
        tag: 'Servicio mensual',
        titulo: 'Agentes como servicio',
        texto: 'Cada persona del equipo trabaja con un agente que conoce el negocio, sus herramientas y sus límites. Lo implementamos y lo mantenemos funcionando cada mes.',
        incluye: [
          'Implementación: instrucciones del negocio y de cada rol, conexión a tu información, acceso por persona con permisos según su cargo',
          'Acompañamiento uno a uno hasta que cada persona usa su agente en una tarea real',
          'Mantenimiento: ajustes, tareas nuevas, soporte al equipo y mejora todos los meses',
        ],
        precio: TEXTO_PRECIO_AGENTES.es,
        nota: 'Las licencias de Claude (~USD 25–30 por persona al mes) las contrata tu empresa directo.',
        href: '/agentes',
        destacado: true,
      },
      {
        icon: Search,
        tag: 'Dirección técnica',
        titulo: 'CTO fraccional',
        texto: 'Para cuando no necesitas agentes operando, sino a alguien que dirija la parte técnica de un proyecto tuyo, unas horas a la semana.',
        incluye: [
          'Decisiones de arquitectura, proveedores y equipo',
          'Prioridades y alcance de cada ciclo de desarrollo',
          'Revisión de lo que se entrega antes de que salga',
        ],
        precio: `desde ${usd(PRECIO_CTO_USD)}/mes`,
        href: '/catalogo#formato-07',
      },
    ],
    verEnCatalogo: 'Ver detalle',
    pasosKicker: 'Cómo trabajamos',
    pasosTitulo: 'Reunión, implementación, mantenimiento.',
    pasosBajada: 'Siempre en ese orden. Cada paso cierra antes de abrir el siguiente, y en cada uno decides si seguir.',
    pasos: [
      { n: '01', titulo: 'Reunión de descubrimiento', texto: 'Gratis, 30 minutos. Vemos qué tareas se repiten en tu equipo y con qué agente partir.', href: '/agentes#pasos', link: 'Qué incluye la reunión' },
      { n: '02', titulo: 'Implementación', texto: `Desde ${uf(PRECIOS_AGENTES.implementacionUF)}. Lo conectamos a tus herramientas con permisos por persona. Cada una sale usándolo en una tarea real.`, href: '/agentes#pasos', link: 'Cómo es la implementación' },
      { n: '03', titulo: 'Mantenimiento', texto: `${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes. Lo mantenemos, sumamos tareas nuevas y lo mejoramos todos los meses.`, href: '/agentes#pasos', link: 'Qué incluye el mantenimiento' },
    ],
    agentesKicker: 'Qué hace un agente',
    agentesTitulo: 'Tareas completas, no respuestas.',
    agentesBajada: 'Estos son los agentes que ya operan en nuestros propios negocios. En el catálogo puedes probar cada uno con una demo.',
    agentes: [
      { icon: Inbox, titulo: 'Bandeja de entrada', texto: 'Lee lo que llega, separa posibles clientes de lo demás y deja la respuesta escrita.', href: '/catalogo#formato-02' },
      { icon: FileText, titulo: 'Propuestas', texto: 'Arma la propuesta con lo conversado y con tu lista de precios. Nunca sale sin que la revises.', href: '/catalogo#formato-03' },
      { icon: Calendar, titulo: 'Calendarios', texto: 'Si tienes varias agendas, cada una bloquea los horarios ocupados de las otras.', href: '/catalogo#formato-04' },
      { icon: Shield, titulo: 'Seguimientos con frenos', texto: 'Persigue respuestas, confirma reuniones y avisa al equipo. Lo que compromete plata o fechas, te lo pregunta.', href: '/catalogo#formato-05' },
    ],
    probar: 'Probar la demo',
    freno: 'El freno en todos los servicios: nada que comprometa plata, alcance o una fecha de entrega sale sin el sí de una persona.',
    finalTitulo: '¿No sabes por cuál partir? Partimos por una reunión de 30 minutos.',
    finalBajada: 'En 30 minutos vemos qué tareas se repiten en tu equipo y si un agente tiene sentido. Si no lo tiene, te lo decimos.',
  },
  en: {
    kicker: 'Services',
    titulo: 'Three ways to work together.',
    bajada:
      'We install and run AI agents that do your team’s repetitive work. We start with a free 30-minute call; if it makes sense, we continue with setup and monthly upkeep. If what you need is technical leadership for your own project, we do that too.',
    ofertas: [
      {
        icon: Compass,
        tag: 'To start',
        titulo: 'Discovery call',
        texto: 'I’ll show you where your team’s time goes and which agent I’d start with.',
        incluye: [
          '30-minute video call with Álvaro Villena',
          'We review which tasks repeat in your team',
          'Which agent to start with, or whether an agent makes no sense for you',
        ],
        precio: 'free · 30 minutes',
        nota: 'No commitment.',
        href: '/agentes',
      },
      {
        icon: Users,
        tag: 'Monthly service',
        titulo: 'Agents as a Service',
        texto: 'Each person on the team works with an agent that knows the business, its tools and its limits. We set it up and keep it running every month.',
        incluye: [
          'Setup: business and per-role instructions, connection to your information, per-person access with role-based permissions',
          'One-on-one onboarding until each person uses their agent on a real task',
          'Upkeep: adjustments, new tasks, team support and monthly improvements',
        ],
        precio: TEXTO_PRECIO_AGENTES.en,
        nota: 'Claude licenses (~USD 25–30 per person/month) are contracted by your company directly.',
        href: '/agentes',
        destacado: true,
      },
      {
        icon: Search,
        tag: 'Technical leadership',
        titulo: 'Fractional CTO',
        texto: 'For when you don’t need agents running, but someone to lead the technical side of your own project, a few hours a week.',
        incluye: [
          'Architecture, vendor and team decisions',
          'Priorities and scope for each development cycle',
          'Review of what ships before it ships',
        ],
        precio: `from ${usd(PRECIO_CTO_USD)}/month`,
        href: '/catalogo#formato-07',
      },
    ],
    verEnCatalogo: 'See details',
    pasosKicker: 'How we work',
    pasosTitulo: 'Call, setup, upkeep.',
    pasosBajada: 'Always in that order. Each step closes before the next one opens, and at each one you decide whether to continue.',
    pasos: [
      { n: '01', titulo: 'Discovery call', texto: 'Free, 30 minutes. We look at which tasks repeat in your team and which agent to start with.', href: '/agentes#pasos', link: 'What the call includes' },
      { n: '02', titulo: 'Setup', texto: `From ${uf(PRECIOS_AGENTES.implementacionUF)}. We connect it to your tools with per-person permissions. Everyone leaves using it on a real task.`, href: '/agentes#pasos', link: 'How setup works' },
      { n: '03', titulo: 'Upkeep', texto: `${uf(PRECIOS_AGENTES.mantenimientoUF)} per month. We maintain it, add new tasks and improve it every month.`, href: '/agentes#pasos', link: 'What upkeep includes' },
    ],
    agentesKicker: 'What an agent does',
    agentesTitulo: 'Complete tasks, not answers.',
    agentesBajada: 'These are the agents already running our own businesses. In the catalog you can try each one with a demo.',
    agentes: [
      { icon: Inbox, titulo: 'Inbox', texto: 'Reads what comes in, separates prospects from the rest and leaves the reply drafted.', href: '/catalogo#formato-02' },
      { icon: FileText, titulo: 'Proposals', texto: 'Builds the proposal from the conversation and your price list. It never goes out without your review.', href: '/catalogo#formato-03' },
      { icon: Calendar, titulo: 'Calendars', texto: 'If you have several calendars, each one blocks the busy slots of the others.', href: '/catalogo#formato-04' },
      { icon: Shield, titulo: 'Follow-ups with brakes', texto: 'Chases replies, confirms meetings and keeps the team posted. Anything that commits money or dates, it asks you.', href: '/catalogo#formato-05' },
    ],
    probar: 'Try the demo',
    freno: 'The brake in every service: nothing that commits money, scope or a delivery date goes out without a person’s yes.',
    finalTitulo: 'Not sure where to start? We start with a 30-minute call.',
    finalBajada: 'In 30 minutes we look at which tasks repeat in your team and whether an agent makes sense. If it doesn’t, we’ll tell you.',
  },
};

export default function ServicesContent() {
  const { language } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" aria-label="Main content">
      <PageHero kicker={c.kicker} titulo={c.titulo} bajada={c.bajada} />

      {/* Ofertas */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
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
                <h2 className="mt-5 text-2xl text-white">{o.titulo}</h2>
                <p className="mt-3 text-slate-300">{o.texto}</p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-300">
                  {o.incluye.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
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
      <Seccion kicker={c.pasosKicker} titulo={c.pasosTitulo} bajada={c.pasosBajada}>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {c.pasos.map((p) => (
            <li key={p.n} className="flex flex-col rounded-2xl border border-white/10 p-6">
              <span className="font-mono text-sm text-accent">{p.n}</span>
              <h3 className="mt-3 text-xl text-white">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-slate-300">{p.texto}</p>
              <Link href={p.href} className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
                {p.link} <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ol>
      </Seccion>

      {/* Qué hace un agente */}
      <Seccion kicker={c.agentesKicker} titulo={c.agentesTitulo} bajada={c.agentesBajada}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {c.agentes.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.titulo} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-accent" />
                  <h3 className="text-lg text-white">{a.titulo}</h3>
                </div>
                <p className="mt-3 flex-1 text-slate-300">{a.texto}</p>
                <Link href={a.href} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
                  {c.probar} <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4 text-emerald-200">
          <Shield className="mt-0.5 h-5 w-5 shrink-0" /> {c.freno}
        </p>
      </Seccion>

      <CtaFinal titulo={c.finalTitulo} bajada={c.finalBajada} />
    </main>
  );
}
