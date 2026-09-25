import doc from './data/prtech.roadmap.json';
import snapshot from './data/prtech.json';
import { CONFIGS, EPICA_A_ETIQUETAS } from './config';
import { hecha, rag, type Rag } from './derivar';
import type { Historia, Overlay, Snapshot } from './tipos';

/**
 * El feature map, con dos barras por fila.
 *
 * La de arriba es **el plan del 14-sep**, tal como se dibujó a mano en el
 * documento. La de abajo es **lo que hoy dicen los sprints de GitHub**: se
 * arma con las ventanas de los sprints a los que están asignadas las historias
 * de esa épica, y se rellena con lo que ya está hecho.
 *
 * Ver las dos juntas es el punto. Una sola barra «actualizada» escondería la
 * pregunta que importa, que no es dónde estamos sino cuánto nos corrimos.
 *
 * Una épica sin ninguna historia con sprint no tiene barra viva, y lo dice.
 * Eso no es una falla del gráfico: es que nadie la programó todavía.
 */

const SNAP = snapshot as unknown as Snapshot;
const CFG = CONFIGS.prtech;

// La grilla del documento: 16 columnas, cuatro por mes, arrancando en septiembre.
const COL_INICIO = 2;
const COLS_POR_MES = 4;
const MES_BASE = 8; // septiembre, base 0

export const DESDE = Date.UTC(2026, MES_BASE, 1);
export const HASTA = Date.UTC(2026, MES_BASE + 4, 0); // fin de diciembre

function deColumna(col: number): number {
  const meses = (col - COL_INICIO) / COLS_POR_MES;
  const mes = Math.floor(meses);
  const frac = meses - mes;
  const ini = Date.UTC(2026, MES_BASE + mes, 1);
  const fin = Date.UTC(2026, MES_BASE + mes + 1, 1);
  return ini + frac * (fin - ini);
}

/** 0–100 sobre el ancho del gráfico. */
export function pos(t: number): number {
  return ((t - DESDE) / (HASTA - DESDE)) * 100;
}

export interface Barra {
  desde: number;
  hasta: number;
  /** Porción ya hecha, 0–100, para rellenar la barra viva. */
  pct: number;
}

export interface Fila {
  grupo: string;
  codigo: string;
  nombre: string;
  nuevo: boolean;
  tag: string | null;
  /** Lo que se dibujó a mano el 14-sep. */
  plan: Barra;
  /** Lo que dicen hoy los sprints. `null` = ninguna historia tiene sprint. */
  vivo: Barra | null;
  estado: Rag;
  historias: number;
  conSprint: number;
  sprints: string[];
}

interface LineaDoc {
  grupo: string; codigo: string; nombre: string; nuevo: boolean; tag: string | null;
  barra: { columna_inicio: number; columna_fin: number };
}

export function filas(overlay: Overlay): Fila[] {
  const lineas = (doc as unknown as { roadmap_feature_map: { lineas: LineaDoc[] } })
    .roadmap_feature_map.lineas;

  return lineas.map((l) => {
    const etiquetas = EPICA_A_ETIQUETAS[l.codigo] ?? [];
    const hs: Historia[] = etiquetas.length
      ? SNAP.historias.filter((h) => h.etiquetas.some((e) => etiquetas.includes(e)))
      : [];
    const listas = hs.filter((h) => hecha(h, overlay)).length;
    const pct = hs.length ? Math.round((listas / hs.length) * 100) : 0;

    // La ventana viva sale de los sprints asignados, no de fechas inventadas.
    const conSprint = hs.filter((h) => h.sprint);
    const nombres = [...new Set(conSprint.map((h) => h.sprint as string))];
    const ventanas = nombres
      .map((n) => CFG.sprints.find((s) => s.nombre === n))
      .filter(Boolean) as (typeof CFG.sprints)[number][];

    let vivo: Barra | null = null;
    if (ventanas.length) {
      vivo = {
        desde: Math.min(...ventanas.map((s) => Date.parse(s.desde))),
        hasta: Math.max(...ventanas.map((s) => Date.parse(s.hasta))),
        pct,
      };
    }

    return {
      grupo: l.grupo,
      codigo: l.codigo,
      nombre: l.nombre,
      nuevo: l.nuevo,
      tag: l.tag,
      plan: { desde: deColumna(l.barra.columna_inicio), hasta: deColumna(l.barra.columna_fin), pct: 0 },
      vivo,
      estado: hs.length ? rag(pct, 90, 40) : 'a',
      historias: hs.length,
      conSprint: conSprint.length,
      sprints: nombres.sort(),
    };
  });
}

export const MESES = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((nombre, i) => ({
  nombre,
  desde: pos(Date.UTC(2026, MES_BASE + i, 1)),
  hasta: pos(Date.UTC(2026, MES_BASE + i + 1, 1)),
}));

export const SPRINTS = CFG.sprints.map((s) => ({
  nombre: s.nombre,
  desde: pos(Date.parse(s.desde)),
  hasta: pos(Date.parse(s.hasta)),
}));
