'use client';

import pipeline from '@/lib/programa/data/prtech.pipeline.json';
import { ARTEFACTOS } from '@/lib/programa/artefactos';
import { Marco } from './Marco';

interface Tabla {
  titulo: string;
  nota: string;
  columnas: string[];
  filas: string[][];
}
interface Seccion {
  titulo: string;
  cuerpo: string[];
}
interface Item {
  titulo: string;
  detalle: string;
}
interface NoVerificable {
  que: string;
  donde_mirar: string;
}

const DOC = pipeline as unknown as {
  _revisado: string;
  una_linea: string;
  secciones: Seccion[];
  tablas: Tabla[];
  secciones2: Seccion[];
  trampas: Item[];
  no_verificable: NoVerificable[];
  hallazgos: string[];
};

/** Negritas con **…** y `código`. Lo mínimo para que el texto respire. */
function Parrafo({ texto }: { texto: string }) {
  const trozos = texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <p className="text-sm leading-relaxed text-white/70">
      {trozos.map((t, i) => {
        if (t.startsWith('**') && t.endsWith('**')) {
          return (
            <strong key={i} className="font-medium text-white">
              {t.slice(2, -2)}
            </strong>
          );
        }
        if (t.startsWith('`') && t.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-white/10 px-1 py-0.5 text-[0.85em] text-white/85">
              {t.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{t}</span>;
      })}
    </p>
  );
}

function Seccion({ s }: { s: Seccion }) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-xl text-white">{s.titulo}</h2>
      {s.cuerpo.map((c, i) => (
        <Parrafo key={i} texto={c} />
      ))}
    </section>
  );
}

function TablaBlock({ t }: { t: Tabla }) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-xl text-white">{t.titulo}</h2>
      <Parrafo texto={t.nota} />
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04]">
              {t.columnas.map((c) => (
                <th key={c} className="px-3 py-2 font-medium text-white/55">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.filas.map((fila, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                {fila.map((celda, j) => (
                  <td key={j} className="px-3 py-2 align-top text-white/70">
                    <Parrafo texto={celda} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function PipelineApp({ llave }: { llave: string }) {
  const meta = ARTEFACTOS.find((a) => a.slug === 'pipeline');
  return (
    <Marco llave={llave} activo="pipeline">
      <article className="max-w-3xl space-y-8">
        <header>
          <h1 className="font-serif text-3xl text-white">Pipeline</h1>
          <p className="mt-2 font-serif text-lg leading-snug text-white/80">{DOC.una_linea}</p>
          <p className="mt-2 text-xs text-white/35">
            Revisado el {DOC._revisado} · {meta?.fuente}. Escrito contra el repo real: cada comando
            citado existe en un archivo, y lo que no se pudo verificar desde acá está marcado como
            tal.
          </p>
        </header>

        {DOC.secciones.map((s) => (
          <Seccion key={s.titulo} s={s} />
        ))}

        {DOC.tablas.map((t) => (
          <TablaBlock key={t.titulo} t={t} />
        ))}

        {DOC.secciones2.map((s) => (
          <Seccion key={s.titulo} s={s} />
        ))}

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Trampas reales</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Costaron tiempo de verdad. No son teóricas.
          </p>
          <ul className="space-y-3">
            {DOC.trampas.map((tr) => (
              <li
                key={tr.titulo}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                style={{ borderLeft: '3px solid #d97757' }}
              >
                <p className="text-sm font-medium text-white">{tr.titulo}</p>
                <div className="mt-1">
                  <Parrafo texto={tr.detalle} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">No verificable desde el repo</h2>
          <ul className="space-y-3">
            {DOC.no_verificable.map((nv, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <Parrafo texto={nv.que} />
                </div>
                <p className="mt-1 text-xs text-white/40">
                  Dónde mirarlo: <span className="text-white/55">{nv.donde_mirar}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Hallazgos</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Lo que este documento encontró indocumentado o inconsistente en el camino.
          </p>
          <ul className="space-y-3">
            {DOC.hallazgos.map((h, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                style={{ borderLeft: '3px solid #dc7a19' }}
              >
                <Parrafo texto={h} />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Marco>
  );
}
