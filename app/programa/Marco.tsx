'use client';

import prtechSnapshot from '@/lib/programa/data/prtech.json';
import fidelidappSnapshot from '@/lib/programa/data/fidelidapp.json';
import { ARTEFACTOS } from '@/lib/programa/artefactos';
import { antiguedad } from '@/lib/programa/derivar';
import type { Snapshot } from '@/lib/programa/tipos';

/**
 * Un snapshot por programa. Estático a propósito — el sitio es un export sin
 * servidor, así que no hay dónde resolver un import dinámico por slug en
 * tiempo de build.
 *
 * `ARTEFACTOS` (roadmap, charter, pipeline, scrum) sigue siendo solo de
 * PR Tech: son documentos de planning escritos a mano, y Fidelidapp todavía
 * no tiene sus equivalentes. Por eso el nav de abajo se oculta en vez de
 * apuntar a páginas que no existen.
 */
const SNAPSHOTS: Record<string, Snapshot> = {
  prtech: prtechSnapshot as unknown as Snapshot,
  fidelidapp: fidelidappSnapshot as unknown as Snapshot,
};

/**
 * El marco común de todos los artefactos: quién es, dónde estoy, y qué tan
 * viejo es lo que estoy leyendo.
 *
 * La antigüedad va en el marco y no en cada página a propósito. Un tablero que
 * no confiesa su edad miente sin saberlo, y es justo el dato que uno olvida
 * repetir cuando agrega la quinta pantalla.
 */
export function Marco({
  llave,
  slug = 'prtech',
  activo,
  children,
}: {
  llave: string;
  /** Qué programa mostrar. Default 'prtech' para no tocar las rutas que ya existen. */
  slug?: string;
  /** slug del artefacto, o null en el home */
  activo: string | null;
  children: React.ReactNode;
}) {
  const SNAP = SNAPSHOTS[slug];
  const base = slug === 'prtech' ? `/programa/${llave}` : `/programa/${llave}/${slug}`;
  return (
    <main className="min-h-dvh bg-main text-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a
              href={base}
              className="font-serif text-xl text-white underline-offset-4 hover:underline"
            >
              {SNAP.nombre}
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-white/30">
              Villelabs · Programa
            </span>
            <span className="ml-auto text-xs text-white/30">
              GitHub: {antiguedad(SNAP.generado)}
            </span>
          </div>

          {/* Los sub-artefactos (roadmap, charter, pipeline, scrum) son documentos
              de PR Tech escritos a mano. Fidelidapp hoy solo tiene el board vivo
              de GitHub — mostrar este nav ahí llevaría a rutas inexistentes. */}
          {slug === 'prtech' && (
            <nav className="mt-3 flex flex-wrap gap-1.5">
              {ARTEFACTOS.map((a) => {
                const on = a.slug === activo;
                return (
                  <a
                    key={a.slug}
                    href={`${base}/${a.slug}`}
                    aria-current={on ? 'page' : undefined}
                    className={`rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      on
                        ? 'bg-[#2175a1] text-white'
                        : 'border border-white/10 text-white/55 hover:border-white/25 hover:text-white/85'
                    }`}
                  >
                    {a.titulo}
                  </a>
                );
              })}
            </nav>
          )}
        </header>

        {children}

        <footer className="mt-10 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/30">
          Repositorio vivo del programa. Lo que viene de GitHub es de solo lectura y se refresca
          con <code className="text-white/45">npm run programa:sync</code>; los estados, las notas
          y el RAID se escriben acá y viven aparte, así un sync nunca pisa una nota.
        </footer>
      </div>
    </main>
  );
}
