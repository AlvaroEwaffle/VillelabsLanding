'use client';

import { slugDe } from '@/lib/programa/config';
import { artefactoDe, datosDe } from '@/lib/programa/registro';
import { Marco } from './Marco';

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

export default function CharterApp({ llave }: { llave: string }) {
  const slug = slugDe(llave);
  const DOC = datosDe(slug).charter;
  const meta = artefactoDe(slug, 'charter');
  return (
    <Marco llave={llave} activo="charter">
      <article className="max-w-2xl space-y-8">
        <header>
          <h1 className="font-serif text-3xl text-white">Program Charter</h1>
          <p className="mt-2 font-serif text-lg leading-snug text-white/80">{DOC.una_linea}</p>
          <p className="mt-2 text-xs text-white/35">
            Revisado el {DOC._revisado} · {meta?.fuente}. Es el único artefacto escrito a mano de
            punta a punta: cambia cuando alguien decide algo, no cuando corre un sync.
          </p>
        </header>

        {DOC.secciones.map((s) => (
          <section key={s.titulo} className="space-y-2">
            <h2 className="font-serif text-xl text-white">{s.titulo}</h2>
            {s.cuerpo.map((c, i) => (
              <Parrafo key={i} texto={c} />
            ))}
          </section>
        ))}
      </article>
    </Marco>
  );
}
