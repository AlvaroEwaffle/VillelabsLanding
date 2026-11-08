/*
 * /guia — página de venta de la Guía 1 «Tu lista de prospectos y el primer mensaje, cada mañana» (8-nov-2026).
 * El producto vive en /guia/prospeccion (noindex); aquí solo se vende. Compra en Hotmart (LINKS.guiaProspeccionCompra).
 * Los clics a la compra los registra el Rastreo global (a/button), así que los botones son <a> normales.
 * Lo que incluye sale de lib/productos/guia/contenido-v2.ts y de los componentes v2: no prometer nada que no esté ahí.
 */

import { VERSION_ACTUAL, fechaLarga } from '@/lib/productos/guia/versiones';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Check,
  ChevronDown,
  ClipboardCopy,
  Compass,
  FileSpreadsheet,
  Gamepad2,
  MessageSquareText,
  PlayCircle,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO } from '@/lib/productos/apoyo';
import { CAMILA } from '@/lib/productos/guia/caso';
import { ASI_NO, ASI_SI, GUIA, PARTES, SEGUIMIENTOS } from '@/lib/productos/guia/contenido-v2';
import { FAQ_GUIA, PARA_QUIEN_GUIA, PRECIO_GUIA, PROBLEMAS } from '@/lib/productos/guia/venta';
import { Foto, Kicker } from '@/components/productos/curso/piezas';
import { EstructuraMensaje, RutinaVeinte } from '@/components/productos/guia/v2/infografias';
import { VideoMarco } from '@/components/productos/VideoProducto';

function BotonCompra({ texto = 'Quiero la guía', className = '' }: { texto?: string; className?: string }) {
  return (
    <a
      href={LINKS.guiaProspeccionCompra}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f] ${className}`}
    >
      {texto} <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

function Seccion({ id, kicker, titulo, bajada, children }: { id?: string; kicker: string; titulo: string; bajada?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{titulo}</h2>
      {bajada ? <p className="mt-4 max-w-2xl text-slate-300">{bajada}</p> : null}
      {children}
    </section>
  );
}

const INCLUYE: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Compass,
    titulo: 'Diagnóstico y ruta personalizada',
    texto: 'Nueve preguntas sobre cómo vendes hoy. Te devuelven tu ruta: qué partes hacer completas, cuáles revisar rápido y cuáles saltarte.',
  },
  {
    icono: BookOpenCheck,
    titulo: '6 partes paso a paso',
    texto: 'Cliente ideal, dónde encontrarlos, tu primera tanda, el primer mensaje, los seguimientos y tu rutina. Cada parte cierra con su checklist.',
  },
  {
    icono: FileSpreadsheet,
    titulo: 'Tu planilla de prospectos',
    texto: 'La armas dentro de la guía, con puntaje, estado, próximo paso y fecha. La bajas en Excel (con prueba de 5 días, calendario y dashboard), en CSV o la pasas a Google Sheets.',
  },
  {
    icono: MessageSquareText,
    titulo: 'Mensajes para copiar y adaptar',
    texto: 'Tu primer mensaje de 3 frases y los seguimientos de los días 2, 7 y 14, con ejemplos de «así no» y «así sí».',
  },
  {
    icono: ClipboardCopy,
    titulo: 'Instrucciones listas para tu chat',
    texto: 'En cada parte, un texto para pegar en ChatGPT o Claude con tus datos: te ayuda a redactar y ordenar. Tú revisas y envías.',
  },
  {
    icono: Gamepad2,
    titulo: 'Juegos cortos para practicar',
    texto: '¿Prospecto o no?, cada fuente con su cliente, a quién le haces seguimiento primero y encuentra el error en el mensaje.',
  },
  {
    icono: PlayCircle,
    titulo: 'Videos cortos conmigo',
    texto: 'Te explico cómo usar la guía y escribo contigo un primer mensaje a mano, de principio a fin.',
  },
  {
    icono: Award,
    titulo: 'Quiz final y certificado',
    texto: 'Cinco situaciones reales para comprobar que lo tienes claro y tu certificado con tu nombre, firmado por mí.',
  },
];

const PASOS: { titulo: string; texto: string }[] = [
  { titulo: 'Diagnóstico', texto: '10 minutos y nueve preguntas. Sales con tu ruta y con la carpeta «Mi sistema de ventas» creada.' },
  { titulo: 'Las 6 partes', texto: 'Acompañas a Camila, dueña de una tostaduría de Valparaíso: ella lo hace primero y tú después, con tu negocio.' },
  { titulo: 'Tu planilla', texto: 'Anotas tus 20 prospectos con puntaje y cada uno queda con su próximo paso y una fecha exacta.' },
  { titulo: 'Tus mensajes', texto: 'Escribes el primer mensaje para tus 20, lo revisas y lo envías. Los seguimientos quedan en plantilla.' },
  { titulo: 'Prueba real y certificado', texto: '20 minutos al día durante 5 días hábiles, registrando enviados y respuestas. Después, el quiz y tu certificado.' },
];

export default function GuiaVenta() {
  const partes = PARTES.filter((p) => p.n > 0);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-100">
      {/* Hero: problema → resultado → precio → CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 md:pt-40">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Kicker>{GUIA.etiqueta}</Kicker>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Deja de vender solo cuando te llega un referido.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
              En una tarde armas tu lista de 20 prospectos, el primer mensaje y los seguimientos con fecha. Te queda una rutina de 20 minutos cada
              mañana para que ningún prospecto se te enfríe.
            </p>
            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-serif text-4xl text-white">{PRECIO_GUIA.texto}</p>
              <p className="text-sm text-slate-400">CLP · pago único o {PRECIO_GUIA.cuotas}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BotonCompra />
              <a
                href="#incluye"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 transition hover:border-[#5fb2dd]/60 hover:text-white"
              >
                Ver qué incluye <ChevronDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-slate-400">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden />
              Garantía de {PRECIO_GUIA.garantiaDias} días. El acceso te llega al correo apenas se confirma el pago.
            </p>
          </div>
          <aside className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[16/10]">
              <Foto foto={FOTOS.pizarra} posicion="35% 30%" prioridad />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#131c31] via-transparent to-transparent" />
            </div>
            <div className="p-6 pt-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">La guía en corto</p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Formato</dt>
                  <dd className="mt-1 text-slate-100">Guía interactiva: diagnóstico + 6 partes</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Tiempo</dt>
                  <dd className="mt-1 text-slate-100">{GUIA.duracion}, más 5 días de prueba real</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Te llevas</dt>
                  <dd className="mt-1 text-slate-100">Planilla en Excel o Google Sheets, mensajes y certificado</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Guía viva</dt>
                  <dd className="mt-1 text-slate-100">
                    La revisamos y actualizamos; tú recibes cada mejora. Última actualización: {fechaLarga(VERSION_ACTUAL.fecha)}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* El problema */}
      <Seccion
        kicker="¿Te suena?"
        titulo="El problema no es tu producto. Es que vendes cuando te acuerdas."
        bajada="Casi todas las pymes venden igual: cuando hay tiempo, cuando alguien recomienda, cuando se acuerdan. Y así las semanas buenas se alternan con semanas en blanco."
      >
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <ul className="space-y-3">
            {PROBLEMAS.map((x) => (
              <li key={x} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-slate-300">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden /> {x}
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Así no</p>
              <p className="mt-2 text-sm text-slate-400">{ASI_NO}</p>
            </div>
            <div className="rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">Así sí</p>
              <p className="mt-2 text-sm text-slate-100">{ASI_SI}</p>
            </div>
            <p className="text-sm text-slate-400">
              Tres frases: algo de ellos, lo que ganan y una pregunta fácil. Con ese cambio a Camila le contestaron en una hora.
            </p>
          </div>
        </div>
      </Seccion>

      {/* Qué incluye */}
      <Seccion
        id="incluye"
        kicker="Qué incluye"
        titulo="Todo lo que necesitas para vender esta semana."
        bajada="No es un libro para leer y guardar: cada parte termina con algo hecho en tu negocio."
      >
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <Icono className="h-6 w-6 text-[#5fb2dd]" aria-hidden />
              <h3 className="mt-4 font-serif text-lg leading-snug text-white">{titulo}</h3>
              <p className="mt-2 text-sm text-slate-300">{texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-[#2175a1]/40 bg-gradient-to-br from-[#2175a1]/15 to-transparent p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">Lo que tienes al terminar</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {GUIA.resultado.map((r) => (
              <li key={r.texto} className="flex gap-3 text-slate-100">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {r.texto}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonCompra />
            <p className="text-sm text-slate-400">
              {PRECIO_GUIA.texto} CLP · o {PRECIO_GUIA.cuotas}
            </p>
          </div>
        </div>
      </Seccion>

      {/* Cómo funciona */}
      <Seccion kicker="Cómo funciona" titulo="Del diagnóstico a tu primera semana de mensajes.">
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          <ol className="relative space-y-6 border-l border-white/10 pl-6">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#5fb2dd]/60 bg-[#0f172a] font-mono text-[11px] text-[#5fb2dd]"
                >
                  {i + 1}
                </span>
                <p className="font-serif text-xl text-white">{p.titulo}</p>
                <p className="mt-1 text-slate-300">{p.texto}</p>
              </li>
            ))}
          </ol>
          <div className="self-start rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Las 6 partes</p>
            <ol className="mt-4 space-y-3">
              {partes.map((p) => (
                <li key={p.n} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-xs text-slate-300">
                    {p.n}
                  </span>
                  <div className="min-w-0">
                    <p className="text-slate-100">{p.nombre}</p>
                    <p className="text-sm text-slate-400">
                      {p.titulo} · {p.minutos}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">Una muestra de adentro</p>
            <VideoMarco id="v04-guia-primer-mensaje" titulo="El primer mensaje, a mano" duracion="50 s" className="mt-3" />
          </div>
          <div className="[&>figure]:mt-0">
            <EstructuraMensaje />
          </div>
        </div>
      </Seccion>

      {/* El caso + seguimientos + rutina */}
      <Seccion
        kicker="El caso que recorre la guía"
        titulo="Camila lo hace primero. Tú lo haces después."
        bajada="Camila tiene Grano Norte, una tostaduría de café en Valparaíso que le vende a cafeterías y oficinas. Prospectaba un lunes con ganas y el jueves ya no se acordaba a quién le había escrito. En cada parte ves cómo lo resuelve ella."
      >
        <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:aspect-[4/5]">
            <Foto foto={APOYO.escenaBodega} posicion="center 35%" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- personaje WebP de tamaño fijo */}
              <img src={CAMILA.retrato.src} alt={CAMILA.retrato.alt} width={48} height={48} className="h-12 w-12 rounded-full border border-white/20" />
              <span className="text-sm text-slate-200">Camila, dueña de Grano Norte</span>
            </figcaption>
          </figure>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Los seguimientos</p>
            <ol className="mt-4 space-y-4">
              {SEGUIMIENTOS.map((s) => (
                <li key={s.dia}>
                  <p className="text-xs uppercase tracking-wider text-[#5fb2dd]">
                    {s.dia} · {s.nombre}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{s.texto}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="[&>figure]:mt-0">
            <RutinaVeinte />
          </div>
        </div>
      </Seccion>

      {/* Para quién */}
      <Seccion
        kicker="Para quién es"
        titulo="Para dueños de pymes y equipos de 3 a 15 personas que venden por WhatsApp, correo o LinkedIn."
      >
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-[260px_1fr_1fr]">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 md:col-span-2 lg:col-span-1 lg:aspect-auto lg:min-h-[300px]">
            <Foto foto={APOYO.celularMensajes} posicion="center" />
          </figure>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-serif text-xl text-white">Es para ti si…</h3>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN_GUIA.si.map((x) => (
                <li key={x} className="flex gap-3 text-slate-300">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-serif text-xl text-white">No es para ti si…</h3>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN_GUIA.no.map((x) => (
                <li key={x} className="flex gap-3 text-slate-400">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Seccion>

      {/* Sobre Álvaro */}
      <Seccion kicker="Quién te enseña" titulo="Álvaro Villena">
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[320px_1fr]">
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10">
            <Foto foto={FOTOS.cafe} posicion="center 20%" />
          </figure>
          <div className="space-y-4 text-slate-300">
            <p>
              Ingeniero industrial de la Universidad de Chile, con más de 8 años liderando equipos de producto en LATAM Airlines, en PepsiCo a través de
              Toptal y en startups.
            </p>
            <p>
              Hoy dirijo Villelab y dos negocios propios, Ewaffle y Fidelidapp. Esta guía es lo que hago cada semana para conseguir clientes nuevos:
              una lista corta, un primer mensaje que habla del otro y seguimientos con fecha.
            </p>
            <Link href="/sobre-mi" className="inline-flex min-h-[44px] items-center gap-1 text-sm text-[#5fb2dd] hover:text-white">
              Más sobre mí <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Seccion>

      {/* Garantía */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-5 rounded-3xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-6 sm:flex-row sm:items-center sm:p-8">
          <ShieldCheck className="h-12 w-12 shrink-0 text-[#5fb2dd]" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl text-white sm:text-3xl">Garantía de {PRECIO_GUIA.garantiaDias} días</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Compras por Hotmart. Si en los primeros {PRECIO_GUIA.garantiaDias} días sientes que la guía no es para ti, pides la devolución desde
              Hotmart y te devuelven el total.
            </p>
            <BotonCompra texto="Probar la guía con garantía" className="mt-5 w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <Seccion kicker="Preguntas frecuentes" titulo="Lo que más nos preguntan.">
        <div className="mt-10 space-y-3">
          {FAQ_GUIA.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.02] open:border-[#2175a1]/60 open:bg-[#2175a1]/[0.06]">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 text-left sm:p-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 text-base text-white">{f.q}</span>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-4 pb-5 text-slate-300 sm:px-5">{f.a}</p>
            </details>
          ))}
        </div>
      </Seccion>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2175a1]/25 via-slate-900 to-slate-950 md:grid-cols-[1fr_320px]">
          <figure className="relative aspect-[16/9] md:order-last md:aspect-auto">
            <Foto foto={APOYO.planilla} posicion="center" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent md:bg-gradient-to-r" />
          </figure>
          <div className="p-6 sm:p-10">
            <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">Esta semana, tus primeros 20.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Una tarde para dejar lista la planilla, el primer mensaje y los seguimientos. El lunes les escribes a tus 20, y cada mañana la planilla
              te dice a quién le toca.
            </p>
            <p className="mt-6 text-sm text-slate-400">
              <span className="font-serif text-2xl text-white">{PRECIO_GUIA.texto}</span> CLP · o {PRECIO_GUIA.cuotas} · garantía de{' '}
              {PRECIO_GUIA.garantiaDias} días
            </p>
            <div className="mt-6">
              <BotonCompra texto="Quiero la guía ahora" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
