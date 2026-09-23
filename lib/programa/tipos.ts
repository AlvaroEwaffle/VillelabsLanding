/**
 * Dos capas que nunca comparten un campo.
 *
 *   Snapshot  → lo que existe en GitHub. Solo lectura, lo reescribe `npm run
 *               programa:sync`. Nadie lo edita desde la página.
 *   Overlay   → lo que opinamos nosotros. Vive en Firestore, editable.
 *
 * La separación es a propósito: un sync nunca puede pisar una nota, y una nota
 * nunca puede mentir sobre si una issue está cerrada.
 */

// ── Capa 1 · snapshot de GitHub ────────────────────────────────────────────

export interface Historia {
  numero: number;
  titulo: string;
  url: string;
  /** OPEN | CLOSED, tal cual lo dice GitHub. */
  estado_github: 'OPEN' | 'CLOSED';
  /** Columna del board (Projects v2). `null` si la issue no está en el board. */
  estado_board: string | null;
  sprint: string | null;
  prioridad: string | null;
  estimacion: number | null;
  /** Milestone. En PR Tech los milestones son las fases. */
  fase: string | null;
  fase_vence: string | null;
  etiquetas: string[];
  asignados: string[];
  comentarios: number;
  creada: string;
  cerrada: string | null;
}

export interface PullRequest {
  numero: number;
  titulo: string;
  url: string;
  autor: string | null;
  borrador: boolean;
  aprobado: boolean;
  abierta: string;
  tocada: string;
  etiquetas: string[];
}

export interface Snapshot {
  /** ISO. La página lo muestra: un dashboard que no confiesa su edad miente. */
  generado: string;
  slug: string;
  nombre: string;
  repo: string;
  board: string;
  historias: Historia[];
  prs: PullRequest[];
}

// ── Capa 2 · overlay editable (Firestore) ──────────────────────────────────

export const ESTADOS_PM = [
  'Sin tocar',
  'En análisis',
  'Lista para tomar',
  'En curso',
  'Bloqueada',
  'En revisión',
  'Hecha',
] as const;
export type EstadoPM = (typeof ESTADOS_PM)[number];

export interface OverlayHistoria {
  /** Override del estado del board. Ausente = manda GitHub. */
  estado?: EstadoPM;
  nota?: string;
  /** Por qué está bloqueada, en una línea. Solo aplica si estado = Bloqueada. */
  bloqueo?: string;
  actualizado?: string;
}

export const TIPOS_RAID = ['R', 'A', 'I', 'D'] as const;
export type TipoRaid = (typeof TIPOS_RAID)[number];

export const NOMBRE_RAID: Record<TipoRaid, string> = {
  R: 'Riesgo',
  A: 'Supuesto',
  I: 'Problema',
  D: 'Dependencia',
};

export interface EntradaRaid {
  id: string;
  tipo: TipoRaid;
  titulo: string;
  detalle: string;
  impacto: 'alto' | 'medio' | 'bajo';
  dueno: string;
  accion: string;
  /** abierto | mitigando | en revisión | cerrado */
  estado: string;
  creada: string;
  actualizada?: string;
}

export interface Overlay {
  historias: Record<string, OverlayHistoria>;
  raid: EntradaRaid[];
  /** La lectura del programa, en prosa. Lo que uno diría en la daily. */
  nota_general: string;
  /**
   * La semilla ya se aplicó. Sin esta marca, borrar la última entrada del RAID
   * la haría reaparecer en la siguiente carga.
   */
  sembrado?: boolean;
  actualizado?: string;
}

export const OVERLAY_VACIO: Overlay = { historias: {}, raid: [], nota_general: '' };

// ── Configuración por programa (fases y sprints no viven en GitHub) ────────

export interface Sprint {
  nombre: string;
  desde: string;
  hasta: string;
  meta: string;
}

export interface ConfigPrograma {
  slug: string;
  /** Milestone en foco. El semáforo se calcula sobre esta fase, no sobre todo. */
  fase_foco: string;
  sprints: Sprint[];
  /** login de GitHub → nombre con el que lo llamamos. */
  equipo: Record<string, string>;
}
