'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, FileText, GitBranch, PlayCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { Kicker, PageHero, Seccion } from '@/components/PageBits';

/*
 * Academia (26-oct-2026): sub-landing de Academia by Ewaffle (academia.e-waffle.com), la academia de Álvaro.
 * Lo que se describe se leyó del sitio el 26-oct-2026: formato de 4 piezas, línea «Delegar tu trabajo a agentes»
 * (2 módulos), líneas por oficio y garantía. Los precios son los publicados ahí ese día.
 */

const ACADEMIA = 'https://academia.e-waffle.com';
const UTM = 'utm_source=villelab.com&utm_medium=referral';
const link = (path = '/') => `${ACADEMIA}${path}?${UTM}`;

const COPY = {
  es: {
    kicker: 'Academia',
    titulo: 'Aprende a trabajar con agentes de IA, a tu ritmo.',
    bajada:
      'Academia by Ewaffle es la academia de Álvaro Villena. Cursos cortos, de una hora, que dejan habilidades que se usan al día siguiente. El mismo criterio con el que instalamos agentes en empresas, para que lo aprendas tú.',
    ctaPrincipal: 'Ir a la Academia',
    ctaCurso: 'Ver el curso',
    formatoKicker: 'Cómo es cada curso',
    formatoTitulo: 'Cuatro piezas, en este orden.',
    formatoBajada: 'No es un video con un PDF adjunto. Cada pieza se abre cuando cierras la anterior.',
    piezas: [
      { icon: PlayCircle, n: 'Pieza 1', titulo: 'Video', texto: 'El criterio del módulo, contado de punta a punta en unos minutos.' },
      { icon: BookOpen, n: 'Pieza 2', titulo: 'Guía', texto: 'Lecciones navegables con juegos y chequeos. Tú marcas el ritmo.' },
      { icon: GitBranch, n: 'Pieza 3', titulo: 'Cápsula', texto: 'Un caso con decisiones encadenadas. Cada decisión tiene consecuencia.' },
      { icon: FileText, n: 'Pieza 4', titulo: 'Prompts', texto: 'Cuatro prompts listos para copiar, uno por momento de tu práctica.' },
    ],
    condiciones: ['~1 hora, a tu ritmo', 'Pago único, acceso que no vence', 'Certificado al cerrar las 4 piezas', 'Tutor con IA incluido', 'Garantía de 7 días'],
    lineaKicker: 'Por dónde partir',
    lineaTitulo: 'Delegar tu trabajo a agentes.',
    lineaBajada: 'Qué se puede delegar completo y cómo hacerlo sin soltar el control. Dos módulos, en orden.',
    cursos: [
      {
        nivel: 'Básico · Módulo 1 de 2',
        titulo: 'Delega tu primera tarea completa a un agente',
        texto: 'Cuándo pasar de preguntarle a la IA a delegarle, y cómo armar tu primer flujo sin perder el control de lo que entregas.',
        aprendes: ['Distinguir una conversación de una delegación', 'Tres preguntas antes de delegar cualquier tarea', 'El brief de cinco líneas para pedirle un resultado a un agente'],
        precio: '$19.990 CLP',
        path: '/curso/conversacion-a-agente',
      },
      {
        nivel: 'Intermedio · Módulo 2 de 2',
        titulo: 'Coordina varios agentes trabajando para ti',
        texto: 'Que dos o tres agentes recuerden lo que hicieron, se repartan el trabajo y te avisen cuando algo termina o se detiene.',
        aprendes: ['Memoria: qué se guarda entre sesiones y qué no', 'Perfiles: quién hace qué y dónde vive esa definición', 'Monitores: enterarte de que algo terminó sin quedarte mirando'],
        precio: '$39.990 CLP',
        path: '/curso/agente-a-sistema',
      },
    ],
    pack: 'Los dos módulos en pack: $49.990 CLP.',
    otrasKicker: 'Otras líneas',
    otrasTitulo: 'Cursos por oficio.',
    otrasBajada: 'Cada línea va del nivel básico al avanzado. Compras el módulo que necesitas o la línea completa.',
    otras: [
      { titulo: 'Relatores y facilitadores', texto: 'Adaptar la clase al grupo que llegó, crear casos del rubro y escribir el informe de cierre sin inventar.' },
      { titulo: 'Diseñadores instruccionales', texto: 'Del material del experto a objetivos evaluables, evaluaciones que miden y un curso completo sin equipo.' },
      { titulo: 'Diseño multimedia', texto: 'Video con voz y animación, cápsulas interactivas y presentaciones navegables, sin programar.' },
      { titulo: 'Desarrolladores junior', texto: 'Revisar y probar el código generado por un asistente, y entregar una funcionalidad completa sin perder el control.' },
    ],
    verTodos: 'Ver todos los cursos',
    villelabKicker: 'Si prefieres que lo hagamos por ti',
    villelabTitulo: 'La Academia enseña el criterio. Villelab lo instala en tu equipo.',
    villelabTexto: 'Si no quieres aprender a armar los agentes sino tenerlos funcionando, eso es Agents as a Service: los instalamos, los conectamos a tu información y los operamos contigo.',
    villelabCta: 'Ver Agents as a Service',
    finalTitulo: 'Parte por el primer módulo.',
    finalBajada: 'Una hora, a tu ritmo, con garantía de 7 días. Si no era lo que esperabas, te devuelven el dinero.',
  },
  en: {
    kicker: 'Academy',
    titulo: 'Learn to work with AI agents, at your own pace.',
    bajada:
      'Academia by Ewaffle is Álvaro Villena’s academy. Short, one-hour courses that leave you with skills you use the next day. The same judgement we apply when installing agents in companies, for you to learn yourself. Courses are in Spanish.',
    ctaPrincipal: 'Go to the Academy',
    ctaCurso: 'See the course',
    formatoKicker: 'How each course works',
    formatoTitulo: 'Four pieces, in this order.',
    formatoBajada: 'It’s not a video with a PDF attached. Each piece unlocks when you close the previous one.',
    piezas: [
      { icon: PlayCircle, n: 'Piece 1', titulo: 'Video', texto: 'The module’s judgement, told end to end in a few minutes.' },
      { icon: BookOpen, n: 'Piece 2', titulo: 'Guide', texto: 'Navigable lessons with games and checks. You set the pace.' },
      { icon: GitBranch, n: 'Piece 3', titulo: 'Case', texto: 'A branching case with chained decisions. Every decision has a consequence.' },
      { icon: FileText, n: 'Piece 4', titulo: 'Prompts', texto: 'Four ready-to-copy prompts, one for each moment of your practice.' },
    ],
    condiciones: ['~1 hour, at your pace', 'One-time payment, access never expires', 'Certificate on completing the 4 pieces', 'AI tutor included', '7-day guarantee'],
    lineaKicker: 'Where to start',
    lineaTitulo: 'Delegating your work to agents.',
    lineaBajada: 'What can be delegated in full and how to do it without losing control. Two modules, in order.',
    cursos: [
      {
        nivel: 'Basic · Module 1 of 2',
        titulo: 'Delegate your first complete task to an agent',
        texto: 'When to move from asking the AI to delegating to it, and how to build your first flow without losing control of what you deliver.',
        aprendes: ['Telling a conversation from a delegation', 'Three questions before delegating any task', 'The five-line brief to ask an agent for a result'],
        precio: 'CLP $19,990',
        path: '/curso/conversacion-a-agente',
      },
      {
        nivel: 'Intermediate · Module 2 of 2',
        titulo: 'Coordinate several agents working for you',
        texto: 'So that two or three agents remember what they did, share the work and let you know when something finishes or stops.',
        aprendes: ['Memory: what is kept between sessions and what isn’t', 'Profiles: who does what and where that definition lives', 'Monitors: knowing something finished without watching'],
        precio: 'CLP $39,990',
        path: '/curso/agente-a-sistema',
      },
    ],
    pack: 'Both modules as a pack: CLP $49,990.',
    otrasKicker: 'Other tracks',
    otrasTitulo: 'Courses by role.',
    otrasBajada: 'Each track goes from basic to advanced. Buy the module you need or the whole track.',
    otras: [
      { titulo: 'Trainers and facilitators', texto: 'Adapt the class to the group that showed up, create industry cases and write the closing report without making things up.' },
      { titulo: 'Instructional designers', texto: 'From the expert’s material to measurable objectives, assessments that measure, and a full course without a team.' },
      { titulo: 'Multimedia design', texto: 'Video with voice and animation, interactive cases and navigable presentations, without coding.' },
      { titulo: 'Junior developers', texto: 'Review and test code generated by an assistant, and ship a complete feature without losing control.' },
    ],
    verTodos: 'See all courses',
    villelabKicker: 'If you’d rather we did it for you',
    villelabTitulo: 'The Academy teaches the judgement. Villelab installs it in your team.',
    villelabTexto: 'If you don’t want to learn to build the agents but to have them running, that’s Agents as a Service: we install them, connect them to your information and run them with you.',
    villelabCta: 'See Agents as a Service',
    finalTitulo: 'Start with the first module.',
    finalBajada: 'One hour, at your pace, with a 7-day guarantee. If it wasn’t what you expected, you get your money back.',
  },
};

function BotonAcademia({ href, children, primario = false }: { href: string; children: React.ReactNode; primario?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 text-sm ${
        primario ? 'bg-accent font-medium text-white hover:bg-[#2a8bbd]' : 'border border-white/15 text-slate-200 hover:border-white/30'
      }`}
    >
      {children} <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export default function AcademiaContent() {
  const { language } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" aria-label="Main content">
      <PageHero kicker={c.kicker} titulo={c.titulo} bajada={c.bajada}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BotonAcademia href={link()} primario>{c.ctaPrincipal}</BotonAcademia>
        </div>
      </PageHero>

      {/* Formato */}
      <Seccion kicker={c.formatoKicker} titulo={c.formatoTitulo} bajada={c.formatoBajada}>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.piezas.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.titulo} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-accent" />
                  <span className="font-mono text-xs text-slate-500">{p.n}</span>
                </div>
                <h3 className="mt-4 text-xl text-white">{p.titulo}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.texto}</p>
              </li>
            );
          })}
        </ol>
        <ul className="mt-6 flex flex-wrap gap-2">
          {c.condiciones.map((x) => (
            <li key={x} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300">{x}</li>
          ))}
        </ul>
      </Seccion>

      {/* Línea de agentes */}
      <Seccion kicker={c.lineaKicker} titulo={c.lineaTitulo} bajada={c.lineaBajada}>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {c.cursos.map((k) => (
            <article key={k.path} className="flex flex-col rounded-3xl border border-accent/40 bg-accent/[0.06] p-6">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400 self-start">{k.nivel}</span>
              <h3 className="mt-4 text-2xl text-white">{k.titulo}</h3>
              <p className="mt-3 text-slate-300">{k.texto}</p>
              <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-300">
                {k.aprendes.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-medium text-accent">{k.precio}</p>
              <div className="mt-5">
                <BotonAcademia href={link(k.path)}>{c.ctaCurso}</BotonAcademia>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-400">{c.pack}</p>
      </Seccion>

      {/* Otras líneas */}
      <Seccion kicker={c.otrasKicker} titulo={c.otrasTitulo} bajada={c.otrasBajada}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {c.otras.map((o) => (
            <li key={o.titulo} className="rounded-2xl border border-white/10 p-5">
              <h3 className="text-lg text-white">{o.titulo}</h3>
              <p className="mt-2 text-sm text-slate-300">{o.texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <BotonAcademia href={link()}>{c.verTodos}</BotonAcademia>
        </div>
      </Seccion>

      {/* Puente a Villelab */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Kicker>{c.villelabKicker}</Kicker>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{c.villelabTitulo}</h2>
          <p className="mt-4 max-w-2xl text-slate-300">{c.villelabTexto}</p>
          <Link href="/catalogo#formato-06" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 hover:text-white">
            {c.villelabCta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Llamado final */}
      <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 p-6 sm:p-10">
          <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">{c.finalTitulo}</h2>
          <p className="mt-4 max-w-2xl text-slate-300">{c.finalBajada}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BotonAcademia href={link('/curso/conversacion-a-agente')} primario>{c.cursos[0].titulo}</BotonAcademia>
            <BotonAcademia href={link()}>{c.verTodos}</BotonAcademia>
          </div>
        </div>
      </section>
    </main>
  );
}
