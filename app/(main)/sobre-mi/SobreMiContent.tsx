'use client';

import { ArrowUpRight, Compass, Shield, Repeat, Users } from 'lucide-react';
import ToptalBadge from '@/components/ToptalBadge';
import { useTranslation } from '@/lib/i18n';
import { PageHero, Seccion, CtaFinal } from '@/components/PageBits';

/*
 * Sobre mí (26-oct-2026): es Álvaro. El equipo se menciona sin inventar nombres ni cantidades;
 * los únicos nombres son los que ya estaban publicados en la página anterior.
 */

const COPY = {
  es: {
    kicker: 'Sobre mí',
    titulo: 'Soy Álvaro Villena. Instalo agentes de IA en equipos que no programan.',
    bajada:
      'Ingeniero industrial de la Universidad de Chile. Más de 8 años liderando equipos de producto: en LATAM Airlines, en PepsiCo a través de Toptal y en startups. Hoy dirijo Villelab y dos negocios propios, Ewaffle y Fidelidapp, que operan todos los días con los mismos agentes que instalo en otras empresas.',
    credenciales: ['Ex-LATAM Airlines', 'Ex-PepsiCo vía Toptal', 'Toptal Top 3%', 'SAFe', 'PSM I'],
    principiosKicker: 'Cómo trabajo',
    principiosTitulo: 'Tres reglas que no cambian.',
    principios: [
      { icon: Compass, titulo: 'Partir por entender', texto: 'Todo empieza con un diagnóstico de dos semanas. Si un agente no tiene sentido para tu equipo, te lo digo en la primera llamada.' },
      { icon: Repeat, titulo: 'Ciclos cortos', texto: 'Tiempo fijo, alcance variable. Si algo se atrasa, se recorta alcance; nunca se estira el calendario. Cada ciclo termina con algo que se usa.' },
      { icon: Shield, titulo: 'Frenos', texto: 'Lo que compromete plata, alcance o una fecha de entrega pasa por una persona. Lo que se deshace, el agente lo hace solo.' },
    ],
    equipoKicker: 'El equipo',
    equipoTitulo: 'No trabajo solo.',
    equipoTexto:
      'Detrás hay un equipo de trabajo repartido entre Ewaffle, Fidelidapp y Villelab: desarrolladores, diseñadores instruccionales y personas de ventas y servicio al cliente. Cada proyecto lo dirijo yo, y lo ejecutamos entre todos.',
    personas: [
      { nombre: 'Bruno', rol: 'Desarrollo técnico', texto: 'Desarrollador full-stack. Construye las plataformas y las conexiones que usan los agentes.' },
      { nombre: 'Fuad', rol: 'Operaciones y clientes', texto: 'Lleva la relación con los clientes, los plazos y el día a día de los proyectos.' },
    ],
    negociosKicker: 'Mis negocios',
    negociosTitulo: 'Dos empresas que corren con agentes.',
    negocios: [
      { nombre: 'Ewaffle', texto: 'Formación digital para empresas y universidades. Los agentes arman propuestas, hacen seguimiento y apoyan la producción de cursos.', url: 'https://ewaffle.cl' },
      { nombre: 'Fidelidapp', texto: 'Plataforma de fidelización. Los agentes atienden WhatsApp, llevan recorridos de contacto y agendan reuniones.', url: 'https://www.fidelidapp.cl/' },
    ],
    verMas: 'Ver proyectos',
    enlaces: 'Más sobre mí',
    finalTitulo: 'Si quieres saber si un agente tiene sentido para tu equipo, conversemos.',
    finalBajada: 'En 30 minutos vemos qué tareas se repiten y por dónde conviene partir.',
  },
  en: {
    kicker: 'About me',
    titulo: 'I’m Álvaro Villena. I install AI agents in teams that don’t code.',
    bajada:
      'Industrial engineer from Universidad de Chile. 8+ years leading product teams: at LATAM Airlines, at PepsiCo through Toptal and at startups. Today I run Villelab and two businesses of my own, Ewaffle and Fidelidapp, which operate every day on the same agents I install in other companies.',
    credenciales: ['Ex-LATAM Airlines', 'Ex-PepsiCo via Toptal', 'Toptal Top 3%', 'SAFe', 'PSM I'],
    principiosKicker: 'How I work',
    principiosTitulo: 'Three rules that don’t change.',
    principios: [
      { icon: Compass, titulo: 'Understand first', texto: 'Everything starts with a two-week diagnostic. If an agent doesn’t make sense for your team, I’ll tell you on the first call.' },
      { icon: Repeat, titulo: 'Short cycles', texto: 'Fixed time, variable scope. If something runs late, scope is cut; the calendar never stretches. Every cycle ends with something in use.' },
      { icon: Shield, titulo: 'Brakes', texto: 'Anything that commits money, scope or a delivery date goes through a person. Anything reversible, the agent does on its own.' },
    ],
    equipoKicker: 'The team',
    equipoTitulo: 'I don’t work alone.',
    equipoTexto:
      'Behind me there is a working team spread across Ewaffle, Fidelidapp and Villelab: developers, instructional designers and sales and customer service people. I lead every project, and we deliver it together.',
    personas: [
      { nombre: 'Bruno', rol: 'Technical development', texto: 'Full-stack developer. Builds the platforms and the connections the agents use.' },
      { nombre: 'Fuad', rol: 'Operations and clients', texto: 'Runs client relationships, deadlines and the day-to-day of projects.' },
    ],
    negociosKicker: 'My businesses',
    negociosTitulo: 'Two companies that run on agents.',
    negocios: [
      { nombre: 'Ewaffle', texto: 'Digital learning for companies and universities. Agents build proposals, follow up and support course production.', url: 'https://ewaffle.cl' },
      { nombre: 'Fidelidapp', texto: 'Loyalty platform. Agents answer WhatsApp, run contact journeys and book meetings.', url: 'https://www.fidelidapp.cl/' },
    ],
    verMas: 'See projects',
    enlaces: 'More about me',
    finalTitulo: 'If you want to know whether an agent makes sense for your team, let’s talk.',
    finalBajada: 'In 30 minutes we look at which tasks repeat and where it makes sense to start.',
  },
};

export default function SobreMiContent() {
  const { language } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" aria-label="Main content">
      <PageHero kicker={c.kicker} titulo={c.titulo} bajada={c.bajada}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {c.credenciales.map((x) => (
            <li key={x} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-wider text-slate-300">
              {x}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
          <span className="text-slate-500">{c.enlaces}:</span>
          <a href="https://www.linkedin.com/in/alvarovillena" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 text-slate-200 hover:text-white">
            LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="https://alvarovillena.cl" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 text-slate-200 hover:text-white">
            alvarovillena.cl <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      {/* Cómo trabajo */}
      <Seccion kicker={c.principiosKicker} titulo={c.principiosTitulo}>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {c.principios.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.titulo} className="rounded-2xl border border-white/10 p-6">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-xl text-white">{p.titulo}</h3>
                <p className="mt-2 text-slate-300">{p.texto}</p>
              </li>
            );
          })}
        </ul>
      </Seccion>

      {/* Equipo */}
      <Seccion kicker={c.equipoKicker} titulo={c.equipoTitulo} bajada={c.equipoTexto}>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
          {c.personas.map((p) => (
            <li key={p.nombre} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg text-white">{p.nombre}</h3>
                <p className="text-sm text-accent">{p.rol}</p>
                <p className="mt-2 text-sm text-slate-300">{p.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* Negocios propios */}
      <Seccion kicker={c.negociosKicker} titulo={c.negociosTitulo}>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {c.negocios.map((n) => (
            <li key={n.nombre} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-2xl text-white">{n.nombre}</h3>
              <p className="mt-3 flex-1 text-slate-300">{n.texto}</p>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
                {n.url.replace('https://', '').replace('www.', '').replace(/\/$/, '')} <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center md:justify-start">
          <ToptalBadge />
        </div>
      </Seccion>

      <CtaFinal titulo={c.finalTitulo} bajada={c.finalBajada} />
    </main>
  );
}
