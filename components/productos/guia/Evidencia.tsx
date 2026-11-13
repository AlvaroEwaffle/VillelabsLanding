/*
 * «En qué se basa esta guía» (/guia#en-que-se-basa, 8-nov-2026). Tarjetas por tema, sin tablas.
 * Datos: lib/productos/guia/evidencia.ts, generado desde la base de evidencia ya corregida.
 * Visible: lo de respaldo fuerte. Desplegables: respaldo moderado por tema y criterio práctico (en 360 px la lista
 * completa mide ~8.000 px, así que se abre a pedido).
 */

import { ChevronDown } from 'lucide-react';
import {
  CONTEO_EVIDENCIA,
  CRITERIO_PRACTICO,
  FUERTES,
  MODERADAS_POR_TEMA,
  REVISION_EVIDENCIA,
  type Afirmacion,
  type FuenteEvidencia,
  type Veredicto,
} from '@/lib/productos/guia/evidencia';
import { fechaLarga } from '@/lib/productos/guia/versiones';

const ETIQUETA: Record<Veredicto, string> = {
  fuerte: 'Respaldo fuerte',
  moderada: 'Respaldo moderado',
  débil: 'Criterio práctico',
  'sin respaldo': 'Criterio práctico',
};

const ESTILO: Record<Veredicto, string> = {
  fuerte: 'border-[#5fb2dd] bg-[#5fb2dd] text-[#0f172a]',
  moderada: 'border-[#5fb2dd]/70 text-[#5fb2dd]',
  débil: 'border-white/20 text-slate-300',
  'sin respaldo': 'border-white/20 text-slate-300',
};

function Sello({ v }: { v: Veredicto }) {
  return <span className={`inline-block shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${ESTILO[v]}`}>{ETIQUETA[v]}</span>;
}

function Fuentes({ fuentes }: { fuentes: FuenteEvidencia[] }) {
  if (fuentes.length === 0) return <p className="mt-2 text-xs text-slate-500">Sin un estudio específico: es experiencia de oficio.</p>;
  return (
    <ul className="mt-2 space-y-1.5">
      {fuentes.map((f) => (
        <li key={f.url + f.autor} className="text-xs leading-relaxed text-slate-400">
          <a href={f.url} target="_blank" rel="noopener noreferrer" className="break-words text-[#5fb2dd] underline-offset-2 hover:text-white hover:underline">
            {f.autor} ({f.anio ?? 's. f.'})
          </a>{' '}
          · {f.titulo}
        </li>
      ))}
    </ul>
  );
}

function Item({ a, className = 'border-t border-white/10 pt-3 first:border-t-0 first:pt-0' }: { a: Afirmacion; className?: string }) {
  return (
    <li className={className}>
      <Sello v={a.veredicto} />
      <p className="mt-2 text-sm leading-relaxed text-slate-100">{a.afirmacion}</p>
      <details className="group mt-1">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-1 text-xs font-medium text-slate-400 hover:text-white [&::-webkit-details-marker]:hidden">
          Qué dice la evidencia{a.fuentes.length ? ` · ${a.fuentes.length} fuente${a.fuentes.length === 1 ? '' : 's'}` : ''}
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden />
        </summary>
        <p className="text-xs leading-relaxed text-slate-300">{a.resumen}</p>
        <Fuentes fuentes={a.fuentes} />
      </details>
    </li>
  );
}

function Desplegable({ titulo, n, children }: { titulo: string; n: number; children: React.ReactNode }) {
  return (
    <details className="group mt-6 rounded-2xl border border-white/10 bg-white/[0.02] open:bg-transparent">
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1 font-serif text-xl text-white">
          {titulo} <span className="font-sans text-sm text-slate-400">· {n}</span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="px-4 pb-5 sm:px-5">{children}</div>
    </details>
  );
}

export default function Evidencia() {
  return (
    <section id="en-que-se-basa" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">En qué se basa esta guía</p>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Qué tiene respaldo y qué es criterio práctico.</h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        Revisé las {CONTEO_EVIDENCIA.total} recomendaciones de la guía contra estudios, reportes de la industria y las reglas de WhatsApp. Donde la
        evidencia es sólida, la guía la sigue; donde no la hay, te lo digo y te lo doy como punto de partida.
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Última revisión: {fechaLarga(REVISION_EVIDENCIA.fecha)} · la próxima, en {REVISION_EVIDENCIA.proxima}.
      </p>

      {/* Plegado entero (análisis UX «Rodrigo», 8-nov-2026): para el dueño sin tiempo la evidencia sonaba a tesis antes de pagar. */}
      <details className="group mt-8 rounded-2xl border border-white/10 bg-white/[0.02] open:border-transparent open:bg-transparent">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 p-4 text-base font-medium text-[#5fb2dd] hover:text-white sm:p-5 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1">Ver en qué se basa ({CONTEO_EVIDENCIA.total} recomendaciones revisadas)</span>
          <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" aria-hidden />
        </summary>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          <li className="rounded-2xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-4">
            <p className="font-serif text-3xl text-white">{CONTEO_EVIDENCIA.fuerte}</p>
            <p className="mt-1 text-sm font-semibold text-white">Respaldo fuerte</p>
            <p className="mt-1 text-xs text-slate-300">Varios experimentos o meta-análisis que coinciden, o la regla oficial de la plataforma.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-serif text-3xl text-white">{CONTEO_EVIDENCIA.moderada}</p>
            <p className="mt-1 text-sm font-semibold text-white">Respaldo moderado</p>
            <p className="mt-1 text-xs text-slate-300">Al menos un experimento sólido o datos grandes de la industria, aunque vengan de otro contexto.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-serif text-3xl text-white">{CONTEO_EVIDENCIA.criterio}</p>
            <p className="mt-1 text-sm font-semibold text-white">Criterio práctico</p>
            <p className="mt-1 text-xs text-slate-300">Experiencia de oficio o evidencia indirecta: un punto de partida para ajustar con tus números.</p>
          </li>
        </ul>

        <h3 className="mt-12 font-serif text-2xl text-white">Lo que tiene respaldo fuerte</h3>
        <ul className="mt-5 grid items-start gap-3 md:grid-cols-2">
          {FUERTES.map((a) => (
            <Item key={a.id} a={a} className="rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" />
          ))}
        </ul>

        <Desplegable titulo="Respaldo moderado, por tema" n={CONTEO_EVIDENCIA.moderada}>
          <div className="grid items-start gap-4 md:grid-cols-2">
            {MODERADAS_POR_TEMA.map((t) => (
              <article key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h4 className="font-serif text-lg text-white">{t.titulo}</h4>
                <ul className="mt-4 space-y-3">
                  {t.items.map((a) => (
                    <Item key={a.id} a={a} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Desplegable>

        <Desplegable titulo="Criterio práctico, para ajustar con tus números" n={CONTEO_EVIDENCIA.criterio}>
          <p className="mb-4 max-w-2xl text-sm text-slate-300">
            Aquí van los números exactos (20 nombres, días 2, 7 y 14) y los consejos de oficio. Funcionan como punto de partida: si tus números dicen
            otra cosa, ajústalos.
          </p>
          <ul className="grid items-start gap-3 md:grid-cols-2">
            {CRITERIO_PRACTICO.map((a) => (
              <Item key={a.id} a={a} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4" />
            ))}
          </ul>
        </Desplegable>
      </details>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-500">
        Casi toda la investigación sobre ventas viene de EE. UU. y Europa, y del correo electrónico. Hay poca evidencia publicada sobre WhatsApp o
        Instagram en pymes chilenas: donde la guía usa esos canales, la evidencia es por analogía. Lo que se dice sobre la Ley 21.719 no es asesoría
        legal.
      </p>
    </section>
  );
}
