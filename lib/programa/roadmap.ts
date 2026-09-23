import doc from './data/prtech.roadmap.json';
import { EPICA_A_ETIQUETAS, ETIQUETAS_SIN_DOC } from './config';

/**
 * Lo que el documento del 14-sep aporta y GitHub no: el relato. Qué hace el
 * sistema en cada paso, qué hace una persona, y por qué las fases se agrupan
 * como se agrupan.
 *
 * El **estado** que trae el documento se descarta a propósito. Tenía razón el
 * 14-sep y hoy no, y un estado viejo con pinta de fresco es peor que ninguno.
 * Lo que se muestra al lado de cada paso sale del snapshot, por etiqueta.
 */

export interface PasoRecorrido {
  paso: string;
  titulo: string;
  sistema: string | null;
  persona: string | null;
  nota: string | null;
  nota_es_pedido_nuevo: boolean;
  /** Etiquetas de GitHub con las que se mide este paso. Vacío = no se mide. */
  etiquetas: string[];
}

export interface FaseDoc {
  fase: string;
  que_comprende: string;
  epicas: string[];
}

export interface PiezaInfra {
  pieza: string;
  estado: string;
  estado_etiqueta: string;
}

interface Crudo {
  _fuente: { archivo: string; fecha: string };
  recorrido: { subtitulo: string; pasos: Array<Record<string, unknown>> };
  alcance_por_fase: { subtitulo: string; fases: FaseDoc[]; paquetes: Array<Record<string, unknown>> };
  epicas_y_backlog: { epicas: Array<{ codigo: string; titulo: string; descripcion?: string }> };
  infra: { items: PiezaInfra[] };
}

const D = doc as unknown as Crudo;

export const FUENTE = D._fuente;
export const SUBTITULO_RECORRIDO = D.recorrido.subtitulo;
export const SUBTITULO_ALCANCE = D.alcance_por_fase.subtitulo;
export const FASES_DOC = D.alcance_por_fase.fases;
export const INFRA = D.infra.items;

export const RECORRIDO: PasoRecorrido[] = D.recorrido.pasos.map((p) => ({
  paso: String(p.paso ?? ''),
  titulo: String(p.titulo ?? ''),
  sistema: (p.sistema as string) ?? null,
  persona: (p.persona as string) ?? null,
  nota: (p.nota as string) ?? null,
  nota_es_pedido_nuevo: Boolean(p.nota_es_pedido_nuevo),
  etiquetas: EPICA_A_ETIQUETAS[String(p.paso ?? '')] ?? [],
}));

/** Descripción del documento para una etiqueta de GitHub, si la hay. */
const PORETIQUETA = new Map<string, { codigo: string; titulo: string; descripcion: string }>();
for (const e of D.epicas_y_backlog.epicas) {
  const desc = e.descripcion?.trim();
  if (!desc) continue;
  for (const etiqueta of EPICA_A_ETIQUETAS[e.codigo] ?? []) {
    PORETIQUETA.set(etiqueta, { codigo: e.codigo, titulo: e.titulo, descripcion: desc });
  }
}
export function descripcionDe(etiqueta: string) {
  return PORETIQUETA.get(etiqueta) ?? null;
}

/** Las que nacieron después del documento: no tienen relato, y se dice. */
export const SIN_DOC = new Set(ETIQUETAS_SIN_DOC);
