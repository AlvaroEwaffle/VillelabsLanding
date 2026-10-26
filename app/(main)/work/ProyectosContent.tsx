'use client';

import Link from 'next/link';
import { ArrowUpRight, Calendar, GraduationCap, Heart, Shield } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { PageHero, Seccion, CtaFinal } from '@/components/PageBits';

/*
 * Proyectos (26-oct-2026). Solo lo que existe: los sistemas que operamos con agentes
 * (Ewaffle, Fidelidapp, calendarios) y los sitios y plataformas construidos antes.
 * Sin cifras de resultados: no se publican números que no estén verificados.
 */

// Sin `imagen`: el sitio ya no responde (26-oct-2026), así que la tarjeta lleva al caso publicado acá.
type Sitio = { nombre: string; url: string; imagen?: string; tipo: 'web' | 'plataforma' };
const SITIOS: Sitio[] = [
  { nombre: 'Fidelidapp', url: 'https://www.fidelidapp.cl/', imagen: 'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp', tipo: 'plataforma' },
  { nombre: 'Conexión Industrial', url: '/work/conexion-industrial', tipo: 'plataforma' },
  { nombre: 'Ewaffle', url: 'https://ewaffle.cl', imagen: 'https://ewaffle.cl/assets/CoverEwaffle.png', tipo: 'web' },
  { nombre: 'Cervecería Puchacay', url: 'https://cerveceriapuchacay.cl/', imagen: 'https://cerveceriapuchacay.cl/assets/HeroBg.D9CN-gY4_Tqj8v.webp', tipo: 'web' },
  { nombre: 'Defensa Total', url: 'http://defensatotalabogados.cl/', imagen: 'https://defensatotalabogados.cl/img/Hero.png', tipo: 'web' },
  { nombre: 'Samy Studio', url: '/work/samy-studio', tipo: 'web' },
  { nombre: 'Influencer Factory', url: 'https://influencersfactory.com/', imagen: 'https://influencersfactory.com/assets/jan/BannerPrecio.svg', tipo: 'web' },
  { nombre: 'Dra. Oyarzún', url: 'https://doctoraoyarzun.cl/', imagen: 'https://draoyarzun.pages.dev/assets/HeroProfile.png', tipo: 'web' },
];

const COPY = {
  es: {
    kicker: 'Proyectos',
    titulo: 'Sistemas que hoy operan con agentes, y lo que construimos antes.',
    bajada:
      'No mostramos demos: mostramos los negocios que corren todos los días con estos agentes, y los sitios y plataformas que construimos para clientes.',
    operadosKicker: 'Operados con agentes',
    operadosTitulo: 'Tres sistemas en producción.',
    operadosBajada: 'Dos son negocios propios. El tercero es el agente que ordena la agenda de Álvaro entre cuatro calendarios.',
    sistemas: [
      {
        icon: GraduationCap,
        nombre: 'Ewaffle',
        que: 'Formación digital para empresas y universidades.',
        agentes: [
          'Arma las propuestas con lo conversado y la lista de precios, y las deja para revisión',
          'Hace seguimiento a las propuestas enviadas y confirma reuniones',
          'Ordena la bandeja de entrada y deja las respuestas escritas',
          'Apoya la producción de cursos: guiones, locución y piezas visuales',
        ],
        freno: 'Ninguna propuesta ni precio sale sin que una persona lo apruebe.',
        url: 'https://ewaffle.cl',
      },
      {
        icon: Heart,
        nombre: 'Fidelidapp',
        que: 'Plataforma de fidelización para comercios y servicios.',
        agentes: [
          'Atiende el WhatsApp del negocio y responde a quienes consultan',
          'Lleva a cada contacto por un recorrido: bienvenida, seguimiento y agenda de reunión',
          'Avisa al equipo interno de cada reunión agendada y de cada consulta nueva',
        ],
        freno: 'Todo lo que compromete plata o alcance pasa por el equipo antes de enviarse.',
        url: 'https://www.fidelidapp.cl/',
      },
      {
        icon: Calendar,
        nombre: 'Calendarios sincronizados',
        que: 'Cuatro agendas distintas, una sola disponibilidad.',
        agentes: [
          'Cada calendario bloquea en los otros tres los horarios ocupados, cuatro veces al día',
          'En las agendas de clientes aparece solo «ocupado», nunca el nombre de otra empresa',
          'Chocó cuatro veces antes de funcionar; cada choque dejó un freno nuevo',
        ],
        freno: 'Si no puede leer un calendario, no borra nada. Prefiere detenerse a equivocarse.',
      },
    ],
    verSitio: 'Ver el sitio',
    verCaso: 'Ver el caso',
    construidoKicker: 'Construido para clientes',
    construidoTitulo: 'Plataformas y sitios construidos para clientes.',
    construidoBajada: 'Trabajo anterior a los agentes: plataformas a medida y sitios con embudo de contacto.',
    tipos: { web: 'Sitio', plataforma: 'Plataforma' },
    descripciones: {
      Fidelidapp: 'Plataforma de fidelización con panel de administración, métricas y gestión de clientes.',
      'Conexión Industrial': 'Directorio de empresas industriales con búsqueda, filtros y perfiles.',
      Ewaffle: 'Sitio de la empresa de formación digital, con portafolio y embudo de contacto.',
      'Cervecería Puchacay': 'Tienda en línea de cervecería artesanal con pedidos y relato de marca.',
      'Defensa Total': 'Sitio de servicios legales con captura de consultas.',
      'Samy Studio': 'Academia de creación de contenido con captura de interesados.',
      'Influencer Factory': 'Academia digital con inscripción y vitrina de cursos.',
      'Dra. Oyarzún': 'Clínica de estética facial con reserva de citas.',
    } as Record<string, string>,
    antesKicker: 'Antes de Villelab',
    antesTexto: 'Álvaro lideró equipos de producto en LATAM Airlines, en PepsiCo a través de Toptal y en Jooycar. Esa experiencia en operaciones grandes es la que está detrás de los frenos que llevan estos agentes.',
    finalTitulo: '¿Quieres ver estos agentes funcionando con tu información?',
    finalBajada: 'Partimos por un diagnóstico de dos semanas. Si un agente no tiene sentido para tu equipo, te lo decimos en la primera llamada.',
  },
  en: {
    kicker: 'Projects',
    titulo: 'Systems running on agents today, and what we built before.',
    bajada:
      'We don’t show demos: we show the businesses that run every day on these agents, and the sites and platforms we built for clients.',
    operadosKicker: 'Run with agents',
    operadosTitulo: 'Three systems in production.',
    operadosBajada: 'Two are our own businesses. The third is the agent that keeps Álvaro’s schedule in order across four calendars.',
    sistemas: [
      {
        icon: GraduationCap,
        nombre: 'Ewaffle',
        que: 'Digital learning for companies and universities.',
        agentes: [
          'Builds proposals from the conversation and the price list, and leaves them for review',
          'Follows up on sent proposals and confirms meetings',
          'Sorts the inbox and leaves replies drafted',
          'Supports course production: scripts, voice-over and visual pieces',
        ],
        freno: 'No proposal or price goes out without a person approving it.',
        url: 'https://ewaffle.cl',
      },
      {
        icon: Heart,
        nombre: 'Fidelidapp',
        que: 'Loyalty platform for retail and services.',
        agentes: [
          'Answers the business WhatsApp and replies to enquiries',
          'Takes each contact through a journey: welcome, follow-up and meeting booking',
          'Notifies the internal team of every booked meeting and new enquiry',
        ],
        freno: 'Anything that commits money or scope goes through the team before it is sent.',
        url: 'https://www.fidelidapp.cl/',
      },
      {
        icon: Calendar,
        nombre: 'Synced calendars',
        que: 'Four different calendars, one availability.',
        agentes: [
          'Each calendar blocks its busy slots in the other three, four times a day',
          'Client calendars only show “busy”, never another company’s name',
          'It crashed four times before it worked; each crash left a new brake',
        ],
        freno: 'If it can’t read a calendar, it deletes nothing. It would rather stop than be wrong.',
      },
    ],
    verSitio: 'Visit site',
    verCaso: 'See the case',
    construidoKicker: 'Built for clients',
    construidoTitulo: 'Platforms and sites built for clients.',
    construidoBajada: 'Work from before the agents: custom platforms and sites with a contact funnel.',
    tipos: { web: 'Site', plataforma: 'Platform' },
    descripciones: {
      Fidelidapp: 'Loyalty platform with admin panel, metrics and customer management.',
      'Conexión Industrial': 'Directory of industrial companies with search, filters and profiles.',
      Ewaffle: 'Site of the digital learning company, with portfolio and contact funnel.',
      'Cervecería Puchacay': 'Online store for a craft brewery with ordering and brand storytelling.',
      'Defensa Total': 'Legal services site with enquiry capture.',
      'Samy Studio': 'Content creation academy with lead capture.',
      'Influencer Factory': 'Digital academy with enrolment and course showcase.',
      'Dra. Oyarzún': 'Facial aesthetics clinic with appointment booking.',
    } as Record<string, string>,
    antesKicker: 'Before Villelab',
    antesTexto: 'Álvaro led product teams at LATAM Airlines, at PepsiCo through Toptal and at Jooycar. That experience in large operations is what sits behind the brakes these agents carry.',
    finalTitulo: 'Want to see these agents working with your information?',
    finalBajada: 'We start with a two-week diagnostic. If an agent doesn’t make sense for your team, we’ll tell you on the first call.',
  },
};

export default function ProyectosContent() {
  const { language } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" aria-label="Main content">
      <PageHero kicker={c.kicker} titulo={c.titulo} bajada={c.bajada} />

      {/* Operados con agentes */}
      <Seccion kicker={c.operadosKicker} titulo={c.operadosTitulo} bajada={c.operadosBajada}>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {c.sistemas.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.nombre} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl text-white">{s.nombre}</h3>
                </div>
                <p className="mt-3 text-slate-300">{s.que}</p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-300">
                  {s.agentes.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-3 text-sm text-emerald-200">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0" /> {s.freno}
                </p>
                {'url' in s && s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
                    {c.verSitio} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </Seccion>

      {/* Construido para clientes */}
      <Seccion kicker={c.construidoKicker} titulo={c.construidoTitulo} bajada={c.construidoBajada}>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITIOS.map((s) => {
            const externo = s.url.startsWith('http');
            const Tag = externo ? 'a' : Link;
            const extra = externo ? { target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
            <li key={s.nombre}>
              <Tag
                href={s.url}
                {...extra}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-accent/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  {s.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.imagen}
                      alt={s.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 px-6 text-center font-serif text-2xl text-slate-300">
                      {s.nombre}
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-300">
                    {c.tipos[s.tipo]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex items-center justify-between gap-2 text-lg text-white">
                    {s.nombre} <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-accent" />
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-400">{c.descripciones[s.nombre]}</p>
                  <span className="mt-3 text-xs text-slate-500">{externo ? c.verSitio : c.verCaso}</span>
                </div>
              </Tag>
            </li>
            );
          })}
        </ul>
        <div className="mt-12 max-w-3xl rounded-2xl border border-white/10 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{c.antesKicker}</p>
          <p className="mt-3 text-slate-300">{c.antesTexto}</p>
        </div>
      </Seccion>

      <CtaFinal titulo={c.finalTitulo} bajada={c.finalBajada} />
    </main>
  );
}
