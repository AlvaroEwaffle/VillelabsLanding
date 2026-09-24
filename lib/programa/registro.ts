import snapshotPrtech from './data/prtech.json';
import semillaPrtech from './data/prtech.semilla.json';
import charterPrtech from './data/prtech.charter.json';
import fase1Prtech from './data/prtech.fase1.json';
import snapshotFide from './data/fidelidapp.json';
import semillaFide from './data/fidelidapp.semilla.json';
import charterFide from './data/fidelidapp.charter.json';
import fase1Fide from './data/fidelidapp.fase1.json';
import { ARTEFACTOS, type Artefacto } from './artefactos';
import type { Overlay, Snapshot } from './tipos';

/**
 * Qué datos tiene cada programa y qué artefactos le corresponden.
 *
 * Existe para que las páginas no importen un JSON con nombre propio. Antes
 * `Marco`, `ScrumApp` y compañía hacían `import … from './data/prtech.json'`,
 * y agregar un segundo programa habría significado editar cada componente.
 * Acá la llave de la URL se resuelve a un slug (`config.ts`) y el slug a sus
 * datos, una sola vez.
 */

export interface Charter {
  _revisado: string;
  una_linea: string;
  secciones: { titulo: string; cuerpo: string[] }[];
}

export interface Fase1 {
  _fuente: string;
  _fecha: string;
  historias: { numero: number; epica: string; titulo: string; criterio: string }[];
  storyboard: { paso: string; titulo: string; nota: string; marco: string; svg: string }[];
}

export type Semilla = Pick<Overlay, 'raid' | 'nota_general'>;

/**
 * Un artefacto del índice, con lo que cambia de programa a programa.
 *
 * La bajada y la fuente son afirmaciones sobre el contenido —"las 23 historias",
 * "kick-off del 22-sep"— y eso es de PR Tech, no del artefacto. Sin este
 * override, el Fase 1 de Fidelidapp diría que tiene 23 historias sacadas de un
 * kick-off que nunca ocurrió. Un dashboard que miente en la bajada no se lee.
 */
export interface Ajuste {
  slug: string;
  bajada?: string;
  fuente?: string;
}

export interface DatosPrograma {
  snapshot: Snapshot;
  semilla: Semilla;
  charter: Charter;
  fase1: Fase1;
  /** Los artefactos que este programa tiene, en el orden de `ARTEFACTOS`. */
  artefactos: Ajuste[];
}

const DATOS: Record<string, DatosPrograma> = {
  prtech: {
    snapshot: snapshotPrtech as unknown as Snapshot,
    semilla: semillaPrtech as unknown as Semilla,
    charter: charterPrtech as unknown as Charter,
    fase1: fase1Prtech as unknown as Fase1,
    artefactos: [
      { slug: 'scrum' },
      { slug: 'fase-1' },
      { slug: 'roadmap' },
      { slug: 'charter' },
      { slug: 'pipeline' },
    ],
  },
  fidelidapp: {
    snapshot: snapshotFide as unknown as Snapshot,
    semilla: semillaFide as unknown as Semilla,
    charter: charterFide as unknown as Charter,
    fase1: fase1Fide as unknown as Fase1,
    artefactos: [
      {
        slug: 'scrum',
        bajada: 'El programa en números, burndown, burnup, historias y RAID.',
      },
      {
        slug: 'fase-1',
        bajada: 'Las historias de la fase con su criterio de aceptación.',
        fuente: 'Borrador del programa del 23-sep · estado desde GitHub',
      },
      {
        slug: 'charter',
        fuente: 'Borrador del 23-sep, por revisar con Álvaro',
      },
    ],
  },
};

export function datosDe(slug: string): DatosPrograma {
  return DATOS[slug] ?? DATOS.prtech;
}

/** El índice del programa: los artefactos que tiene, ya con sus ajustes puestos. */
export function artefactosDe(slug: string): Artefacto[] {
  const ajustes = new Map(datosDe(slug).artefactos.map((a) => [a.slug, a]));
  return ARTEFACTOS.filter((a) => ajustes.has(a.slug)).map((a) => {
    const ajuste = ajustes.get(a.slug)!;
    return { ...a, bajada: ajuste.bajada ?? a.bajada, fuente: ajuste.fuente ?? a.fuente };
  });
}

/** El artefacto tal como lo ve este programa. Para cuando la página necesita su ficha. */
export function artefactoDe(slug: string, artefacto: string): Artefacto | undefined {
  return artefactosDe(slug).find((a) => a.slug === artefacto);
}
