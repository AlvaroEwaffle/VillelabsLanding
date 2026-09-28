'use client';

import semana from '@/lib/programa/data/prtech.semana.json';
import snap from '@/lib/programa/data/prtech.json';
import { Marco } from './Marco';

/**
 * El plan de la semana: qué se hace, en qué orden y quién.
 *
 * Por qué existe al lado del Scrum Board y no dentro: el board dice qué hay,
 * esto dice en qué orden entra. Son preguntas distintas y se miran en momentos
 * distintos — el board en la daily, esto el lunes y cada vez que alguien no
 * sabe qué tomar. Mezclarlos obliga a leer el inventario entero para sacar la
 * siguiente tarea.
 *
 * El orden acá no es una preferencia: sale del mapa de colisiones entre ramas.
 * Dos PRs que tocan el mismo archivo no se mergean en cualquier orden sin que
 * alguien rehaga trabajo, y eso no se ve mirando los títulos.
 */

type Tono = 'ok' | 'riesgo' | 'roto';

interface Item {
  id: string;
  quien: string;
  tono?: Tono;
  etiqueta?: string;
  que: string;
  detalle?: string;
}

interface Paso {
  que: string;
  detalle?: string;
}

interface Bloque {
  n: string;
  titulo: string;
  cuando: string;
  bajada: string;
  items?: Item[];
  pasos?: Paso[];
}

const DOC = semana as unknown as {
  _revisado: string;
  sprint: string;
  semana: string;
  meta: string;
  estado: { etiqueta: string; valor: string; tono: Tono; pie: string }[];
  lectura: string;
  bloques: Bloque[];
  decisiones: { que: string; detalle: string }[];
  personas: Persona[];
  pie: string;
};

interface Persona {
  quien: string;
  login: string;
  agentes?: number[];
  meta: string;
  aporte: string;
}

interface Historia {
  numero: number;
  titulo: string;
  url: string;
  estado_github: string;
  estado_board: string | null;
  sprint: string | null;
  prioridad: string | null;
  asignados: string[];
}

interface Pr {
  numero: number;
  titulo: string;
  url: string;
  autor: string;
  borrador: boolean;
}

const SNAP = snap as unknown as { generado: string; historias: Historia[]; prs: Pr[] };

/** Lo que el board dice que esta persona tiene en el sprint. Sale de GitHub, no se escribe acá. */
function deLaPersona(p: Persona) {
  const historias = SNAP.historias
    .filter((h) => h.sprint === DOC.sprint && h.estado_github === 'OPEN' && h.asignados.includes(p.login))
    .sort((a, b) => (a.prioridad ?? 'P9').localeCompare(b.prioridad ?? 'P9') || a.numero - b.numero);
  const prs = SNAP.prs.filter((pr) => pr.autor === p.login).sort((a, b) => a.numero - b.numero);
  return { historias, prs };
}

const ESTADO_BOARD: Record<string, string> = {
  'Sprint Backlog': 'por tomar',
  'In progress': 'en curso',
  Ready: 'listo, falta probar',
  'In review': 'en revisión',
};

const TONO: Record<Tono, string> = {
  ok: 'text-white/70 border-white/15 bg-white/[0.03]',
  riesgo: 'text-amber-200/85 border-amber-400/30 bg-amber-400/[0.08]',
  roto: 'text-rose-200/85 border-rose-400/30 bg-rose-400/[0.08]',
};

const TONO_CIFRA: Record<Tono, string> = {
  ok: 'text-white',
  riesgo: 'text-amber-200',
  roto: 'text-rose-200',
};

function Etiqueta({ tono, children }: { tono: Tono; children: React.ReactNode }) {
  return (
    <span
      className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] ${TONO[tono]}`}
    >
      {children}
    </span>
  );
}

function Fila({ it }: { it: Item }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-white/[0.055] py-3.5 last:border-0 sm:flex-row sm:gap-4">
      <div className="flex items-baseline gap-3 sm:contents">
        <div className="text-[13px] font-semibold text-[#4da3cc] sm:w-14 sm:shrink-0 sm:pt-0.5">{it.id}</div>
        <div className="text-[13px] text-white/70 sm:w-24 sm:shrink-0 sm:pt-0.5">{it.quien}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[14px] text-white/90">{it.que}</span>
          {it.etiqueta && <Etiqueta tono={it.tono ?? 'ok'}>{it.etiqueta}</Etiqueta>}
        </div>
        {it.detalle && (
          <p className="mt-1 text-[13.5px] leading-relaxed text-white/45">{it.detalle}</p>
        )}
      </div>
    </div>
  );
}

export default function SemanaApp({ llave }: { llave: string }) {
  return (
    <Marco llave={llave} activo="semana">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          {DOC.sprint} · {DOC.semana}
        </p>
        <h1 className="mt-2 font-serif text-[34px] leading-tight text-white">
          Plan de la <i className="text-[#4da3cc]">semana</i>
        </h1>
      </header>

      <div className="mb-10 rounded-r-lg border-l-[3px] border-[#2175a1] bg-white/[0.028] px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Meta del sprint</p>
        <p className="mt-2 font-serif text-[19px] leading-snug text-white">{DOC.meta}</p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DOC.estado.map((e) => (
          <div key={e.etiqueta} className="rounded-lg border border-white/10 bg-white/[0.028] p-4">
            <p className={`font-serif text-[26px] leading-none ${TONO_CIFRA[e.tono]}`}>{e.valor}</p>
            <p className="mt-2 text-[12px] font-medium text-white/60">{e.etiqueta}</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/40">{e.pie}</p>
          </div>
        ))}
      </div>

      <p className="mb-12 border-l-2 border-[#2175a1] pl-4 text-[14px] leading-relaxed text-white/55">
        {DOC.lectura}
      </p>

      <section className="mb-12">
        <h2 className="font-serif text-[21px] text-white">
          <span className="mr-2.5 font-sans text-[14px] font-semibold tracking-wide text-[#4da3cc]">
            00
          </span>
          Esta semana, por persona
          <span className="ml-2 font-sans text-[13px] font-normal text-white/30">· lo que el board tiene en {DOC.sprint}</span>
        </h2>
        <p className="mb-4 mt-1.5 max-w-[74ch] text-[13.5px] leading-relaxed text-white/45">
          Cada persona tiene una meta para el viernes y una razón de por qué su trabajo llega a la meta del
          sprint. Las historias y PRs salen del board de GitHub, no de este documento: si algo no está acá, no
          está en el sprint.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          {DOC.personas.map((p) => {
            const { historias, prs } = deLaPersona(p);
            return (
              <div key={p.login} className="rounded-lg border border-white/10 bg-white/[0.028] p-5">
                <p className="font-serif text-[19px] text-white">{p.quien}</p>
                <p className="mt-1.5 text-[14px] leading-snug text-white/85">{p.meta}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">{p.aporte}</p>
                <ul className="mt-4 border-t border-white/[0.07] pt-3">
                  {historias.map((h) => (
                    <li key={h.numero} className="flex gap-2.5 py-1.5 text-[13px]">
                      <a href={h.url} className="shrink-0 font-semibold text-[#4da3cc]">
                        #{h.numero}
                      </a>
                      <span className="min-w-0 flex-1 text-white/80">
                        {h.titulo}
                        <span className="ml-1.5 text-[11.5px] text-white/35">
                          {ESTADO_BOARD[h.estado_board ?? ''] ?? h.estado_board}
                          {p.agentes?.includes(h.numero) && ' · Vilo'}
                          {h.prioridad && ` · ${h.prioridad}`}
                        </span>
                      </span>
                    </li>
                  ))}
                  {prs.map((pr) => (
                    <li key={pr.numero} className="flex gap-2.5 py-1.5 text-[13px]">
                      <a href={pr.url} className="shrink-0 font-semibold text-white/50">
                        PR #{pr.numero}
                      </a>
                      <span className="min-w-0 flex-1 text-white/65">
                        {pr.titulo}
                        {pr.borrador && <span className="ml-1.5 text-[11.5px] text-white/35">borrador</span>}
                      </span>
                    </li>
                  ))}
                  {historias.length + prs.length === 0 && (
                    <li className="py-1.5 text-[13px] text-white/35">Nada asignado en el board para este sprint.</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {DOC.bloques.map((b) => (
        <section key={b.n} className="mb-12">
          <h2 className="font-serif text-[21px] text-white">
            <span className="mr-2.5 font-sans text-[14px] font-semibold tracking-wide text-[#4da3cc]">
              {b.n}
            </span>
            {b.titulo}
            <span className="ml-2 font-sans text-[13px] font-normal text-white/30">· {b.cuando}</span>
          </h2>
          <p className="mb-4 mt-1.5 max-w-[74ch] text-[13.5px] leading-relaxed text-white/45">
            {b.bajada}
          </p>

          {b.pasos && (
            <div className="rounded-lg border border-white/10 bg-white/[0.028] px-5 py-3">
              {b.pasos.map((p, i) => (
                <div
                  key={p.que}
                  className="flex gap-3.5 border-b border-white/[0.05] py-2.5 last:border-0"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 text-[11.5px] font-semibold text-[#4da3cc]">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] text-white/90">{p.que}</p>
                    {p.detalle && (
                      <p className="mt-0.5 text-[13.5px] leading-relaxed text-white/45">{p.detalle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {b.items && (
            <div className="rounded-lg border border-white/10 bg-white/[0.028] px-5 py-1">
              {b.items.map((it) => (
                <Fila key={it.id + it.que} it={it} />
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="mb-12">
        <h2 className="font-serif text-[21px] text-white">
          <span className="mr-2.5 font-sans text-[14px] font-semibold tracking-wide text-[#4da3cc]">
            {String(DOC.bloques.length + 1).padStart(2, '0')}
          </span>
          Lo que necesita decisión
        </h2>
        <p className="mb-4 mt-1.5 max-w-[74ch] text-[13.5px] leading-relaxed text-white/45">
          Cinco preguntas que bloquean trabajo de otras personas. Ninguna necesita más análisis:
          necesitan un sí o un no.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/[0.028] px-5 py-1">
          {DOC.decisiones.map((d, i) => (
            <div key={d.que} className="flex gap-4 border-b border-white/[0.055] py-3.5 last:border-0">
              <div className="w-6 shrink-0 pt-0.5 text-[13px] font-semibold text-[#4da3cc]">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-white/90">{d.que}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/45">{d.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-5 text-[12px] leading-relaxed text-white/30">
        <p>{DOC.pie}</p>
        <p className="mt-2">{DOC._revisado}</p>
      </footer>
    </Marco>
  );
}
