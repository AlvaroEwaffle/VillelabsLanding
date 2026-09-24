'use client';

import { useCallback, useEffect, useState } from 'react';
import sesion from '@/lib/programa/data/prtech.sesion.json';
import { Marco } from './Marco';

/**
 * La sesión de cierre de sprint, como slides.
 *
 * Por qué una página y no un PPT: el resto del repositorio ya tiene los
 * números y sale de GitHub. Un deck exportado los congela el día que se
 * exporta, y a la semana siguiente nadie sabe cuál de las dos versiones
 * mirar. Acá el deck vive al lado de la fuente.
 *
 * Se navega con las flechas del teclado, que es lo que uno tiene a mano
 * cuando está proyectando y hablando al mismo tiempo.
 */

type Estado = 'ok' | 'riesgo' | 'roto';

interface Metrica {
  etiqueta: string;
  valor: string;
  pie?: string;
}

interface Slide {
  tipo: string;
  titulo: string;
  bajada?: string;
  [k: string]: unknown;
}

const DOC = sesion as unknown as {
  sesion: string;
  fecha: string;
  sprint_cierra: string;
  sprint_abre: string;
  slides: Slide[];
};

const COLOR_ESTADO: Record<Estado, string> = {
  ok: 'text-emerald-300/90',
  riesgo: 'text-amber-300/90',
  roto: 'text-rose-300/90',
};

const PUNTO_ESTADO: Record<Estado, string> = {
  ok: 'bg-emerald-400/70',
  riesgo: 'bg-amber-400/70',
  roto: 'bg-rose-400/70',
};

function Metricas({ items }: { items: Metrica[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m) => (
        <div key={m.etiqueta} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-serif text-3xl text-white tabular-nums">{m.valor}</p>
          <p className="mt-1 text-[11px] leading-tight text-white/45">{m.etiqueta}</p>
          {m.pie && <p className="mt-0.5 text-[10px] text-white/25">{m.pie}</p>}
        </div>
      ))}
    </div>
  );
}

function Bloque({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-white/35">{titulo}</h3>
      {children}
    </section>
  );
}

function SlideAgenda({ s }: { s: Slide }) {
  const puntos = s.puntos as { que: string; minutos: number; detalle: string; sale: string }[];
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {puntos.map((p, i) => (
          <div
            key={p.que}
            className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="font-serif text-2xl text-white/25 tabular-nums">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-serif text-xl text-white">{p.que}</span>
                <span className="text-xs text-white/35 tabular-nums">{p.minutos} min</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{p.detalle}</p>
              <p className="mt-2 text-xs text-white/40">
                <span className="text-white/25">Sale de acá: </span>
                {p.sale}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-white/50">
        {s.nota as string}
      </p>
    </div>
  );
}

function SlideReview({ s }: { s: Slide }) {
  const veredicto = s.veredicto as { estado: string; texto: string };
  const producto = s.producto as { que: string; detalle: string; ref: string }[];
  const historias = s.historias as {
    cerradas: string[];
    prs_mergeadas: number;
    prs_abiertas_sin_revisar: number;
    nota: string;
  };
  const val = s.validacion as {
    titulo: string;
    texto: string;
    metricas: Metrica[];
    hallazgo: string;
  };
  const spike = s.spike as {
    titulo: string;
    pregunta: string;
    respuesta: string;
    metricas: Metrica[];
    estado: string;
    nota: string;
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">
          La meta del sprint · {veredicto.estado}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{veredicto.texto}</p>
      </div>

      <Bloque titulo="A nivel de producto">
        <div className="space-y-2">
          {producto.map((p) => (
            <div key={p.que} className="border-l-2 border-white/10 pl-4">
              <p className="text-sm font-medium text-white">{p.que}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-white/55">{p.detalle}</p>
              <p className="mt-1 text-[11px] text-white/25">{p.ref}</p>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="A nivel de historias">
        <div className="flex flex-wrap gap-2">
          {historias.cerradas.map((h) => (
            <span
              key={h}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70 tabular-nums"
            >
              {h}
            </span>
          ))}
        </div>
        <p className="text-sm text-white/55 tabular-nums">
          {historias.cerradas.length} historias cerradas · {historias.prs_mergeadas} PR mergeadas ·{' '}
          {historias.prs_abiertas_sin_revisar} abiertas sin revisar
        </p>
        <p className="text-xs leading-relaxed text-white/35">{historias.nota}</p>
      </Bloque>

      <Bloque titulo={val.titulo}>
        <p className="text-sm leading-relaxed text-white/65">{val.texto}</p>
        <Metricas items={val.metricas} />
        <p className="border-l-2 border-amber-400/30 pl-4 text-sm leading-relaxed text-white/60">
          {val.hallazgo}
        </p>
      </Bloque>

      <Bloque titulo={spike.titulo}>
        <p className="font-serif text-lg leading-snug text-white/85">{spike.pregunta}</p>
        <p className="font-serif text-lg text-white">{spike.respuesta}</p>
        <Metricas items={spike.metricas} />
        <p className="text-sm text-white/55">{spike.estado}</p>
        <p className="border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-white/50">
          {spike.nota}
        </p>
      </Bloque>
    </div>
  );
}

function SlideRetro({ s }: { s: Slide }) {
  const preguntas = s.preguntas as { n: number; pregunta: string; para_pensar: string }[];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {preguntas.map((p) => (
          <div key={p.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="flex gap-4">
              <span className="font-serif text-2xl text-white/25 tabular-nums">{p.n}</span>
              <span className="font-serif text-2xl leading-snug text-white">{p.pregunta}</span>
            </p>
            <p className="mt-3 pl-10 text-sm leading-relaxed text-white/50">{p.para_pensar}</p>
          </div>
        ))}
      </div>
      <p className="border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-white/50">
        {s.nota as string}
      </p>
    </div>
  );
}

function SlidePreplanning({ s }: { s: Slide }) {
  const recorrido = s.recorrido as {
    titulo: string;
    pasos: { n: number; que: string; estado: Estado; nota?: string }[];
  };
  const historias = s.historias as {
    ref: string;
    que: string;
    porque: string;
    tamano: string;
    prioridad: number;
  }[];
  const decisiones = s.decisiones as string[];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">El goal</p>
        <p className="font-serif text-2xl leading-snug text-white">{s.goal_propuesto as string}</p>
        <p className="text-sm leading-relaxed text-white/55">{s.porque as string}</p>
        <p className="text-xs text-white/25">
          Venía de: «{s.goal_anterior as string}»
        </p>
      </div>

      <Bloque titulo={recorrido.titulo}>
        <div className="space-y-1.5">
          {recorrido.pasos.map((p) => (
            <div key={p.n} className="flex items-baseline gap-3 text-sm">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PUNTO_ESTADO[p.estado]}`} />
              <span className="w-5 shrink-0 text-white/25 tabular-nums">{p.n}</span>
              <span className={p.estado === 'ok' ? 'text-white/65' : COLOR_ESTADO[p.estado]}>
                {p.que}
              </span>
              {p.nota && <span className="text-xs text-white/35">— {p.nota}</span>}
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Las historias que lo sostienen">
        <div className="space-y-2">
          {historias.map((h) => (
            <div
              key={h.ref + h.que}
              className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <span className="font-serif text-xl text-white/25 tabular-nums">{h.prioridad}</span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-sm font-medium text-white">{h.que}</span>
                  <span className="text-[11px] text-white/30">{h.ref}</span>
                  <span className="rounded border border-white/15 px-1.5 text-[10px] text-white/45">
                    {h.tamano}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{h.porque}</p>
              </div>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Decisiones que necesitamos de la PO">
        <ul className="space-y-1.5">
          {decisiones.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-white/60">
              <span className="text-white/25">·</span>
              {d}
            </li>
          ))}
        </ul>
      </Bloque>

      <p className="border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-white/50">
        {s.fuera as string}
      </p>
    </div>
  );
}

const CUERPOS: Record<string, (p: { s: Slide }) => React.ReactElement> = {
  agenda: SlideAgenda,
  review: SlideReview,
  retro: SlideRetro,
  preplanning: SlidePreplanning,
};

export default function SesionApp({ llave }: { llave: string }) {
  const [i, setI] = useState(0);
  const total = DOC.slides.length;

  const ir = useCallback(
    (delta: number) => setI((n) => Math.min(total - 1, Math.max(0, n + delta))),
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') ir(1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') ir(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ir]);

  const slide = DOC.slides[i];
  const Cuerpo = CUERPOS[slide.tipo];

  return (
    <Marco llave={llave} activo="sesion">
      <article className="max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">
            {DOC.sesion} · {DOC.fecha}
          </p>
          <h1 className="font-serif text-3xl text-white">{slide.titulo}</h1>
          {slide.bajada && (
            <p className="font-serif text-lg leading-snug text-white/70">{slide.bajada}</p>
          )}
        </header>

        {Cuerpo ? <Cuerpo s={slide} /> : null}

        <nav className="flex items-center justify-between border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => ir(-1)}
            disabled={i === 0}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
          >
            ← Anterior
          </button>

          <div className="flex gap-2">
            {DOC.slides.map((s, n) => (
              <button
                key={s.titulo}
                type="button"
                onClick={() => setI(n)}
                aria-label={s.titulo}
                aria-current={n === i}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  n === i ? 'bg-white/70' : 'bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => ir(1)}
            disabled={i === total - 1}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
          >
            Siguiente →
          </button>
        </nav>

        <p className="text-center text-[11px] text-white/25">
          Flechas del teclado para navegar · {DOC.sprint_cierra} cierra, {DOC.sprint_abre} abre
        </p>
      </article>
    </Marco>
  );
}
