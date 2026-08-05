// Canvas de facilitación — modelo de datos y reducer.
//
// ARQUITECTURA (importante para el modo multijugador futuro):
// Todo el estado vive en un documento plano y serializable (Board), y TODA mutación
// pasa por `applyAction(board, action)`, que es una función pura. Hoy las acciones se
// aplican localmente; mañana se difunden por WebSocket (Cloudflare Durable Object) y
// cada cliente aplica exactamente el mismo reducer. Por eso ninguna acción depende de
// estado del componente ni del reloj local salvo por campos ya resueltos al crearla.
//
// Regla: si agregas una mutación nueva, va como Action + caso del reducer. Nunca mutes
// el board desde un componente.

export type ColorKey = 'amber' | 'sky' | 'emerald' | 'rose' | 'violet' | 'slate';

export const COLORS: Record<ColorKey, { fill: string; edge: string; ink: string }> = {
  amber:   { fill: '#f6c453', edge: '#d9a52f', ink: '#2b1d00' },
  sky:     { fill: '#7cc4e8', edge: '#4f9fc7', ink: '#052033' },
  emerald: { fill: '#7ed0a7', edge: '#4faa80', ink: '#052616' },
  rose:    { fill: '#f2a0a8', edge: '#cf7681', ink: '#33060c' },
  violet:  { fill: '#b7a4ea', edge: '#8e79c9', ink: '#170a33' },
  slate:   { fill: '#c8d3de', edge: '#9aa8b6', ink: '#0f172a' },
};

export const COLOR_ORDER: ColorKey[] = ['amber', 'sky', 'emerald', 'rose', 'violet', 'slate'];

export const NOTE_W = 210;
export const NOTE_H = 165;
export const CANVAS_W = 2400;
export const CANVAS_H = 1400;

export interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
  color: ColorKey;
  votes: number;
  /** Reservado para multijugador: quién la creó. */
  author?: string;
  createdAt: number;
}

export interface Zone {
  id: string;
  title: string;
  hint?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Board {
  id: string;
  title: string;
  template: TemplateKey;
  notes: Note[];
  zones: Zone[];
  updatedAt: number;
}

// ---------------------------------------------------------------- plantillas

export type TemplateKey = 'valor' | 'apuesta' | 'probar' | 'reunion' | 'libre';

interface Template {
  key: TemplateKey;
  name: string;
  stage?: string;
  blurb: string;
  zones: Omit<Zone, 'id'>[];
}

const row = (n: number, i: number): { x: number; w: number } => {
  const margin = 40;
  const gap = 24;
  const w = Math.floor((CANVAS_W - margin * 2 - gap * (n - 1)) / n);
  return { x: margin + i * (w + gap), w };
};

const band = (n: number, cols: { title: string; hint?: string }[]): Omit<Zone, 'id'>[] =>
  cols.map((c, i) => ({ ...c, ...row(n, i), y: 150, h: 1130 }));

export const TEMPLATES: Template[] = [
  {
    key: 'valor',
    name: 'Mapa de valor',
    stage: 'Etapa 1 · Descubrir',
    blurb: 'Recorre el trabajo de punta a punta y expone dónde se va el tiempo y dónde está el criterio propio.',
    zones: band(5, [
      { title: '1 · ¿Qué entra?', hint: 'Fuentes, datos, pedidos que llegan' },
      { title: '2 · ¿Quién lo toca?', hint: 'Personas y pasos, en orden' },
      { title: '3 · ¿Dónde se va el tiempo?', hint: 'Trabajo repetitivo, reprocesos' },
      { title: '4 · ¿Dónde agregan criterio?', hint: 'Lo que sólo ustedes saben hacer' },
      { title: '5 · ¿Qué recibe el cliente?', hint: 'Entregable y decisión que toma' },
    ]),
  },
  {
    key: 'apuesta',
    name: 'La apuesta',
    stage: 'Etapa 2 · Definir',
    blurb: 'Convierte las oportunidades en una apuesta concreta: para quién, qué resuelve y cómo se cobra.',
    zones: band(4, [
      { title: '¿Para quién es?', hint: 'Usuario y comprador — pueden no ser el mismo' },
      { title: '¿Qué problema resuelve?', hint: 'El dolor, en palabras de ellos' },
      { title: '¿Cómo se cobra?', hint: 'Modelo, precio, quién paga' },
      { title: '¿Qué NO hacemos?', hint: 'Lo que queda fuera, a propósito' },
    ]),
  },
  {
    key: 'probar',
    name: 'Lo mínimo para probar',
    stage: 'Etapa 3 · Probar',
    blurb: 'Define la hipótesis y la evidencia más barata que la confirma o la mata.',
    zones: band(4, [
      { title: 'Hipótesis', hint: 'Creemos que… si es falso, no hay negocio' },
      { title: 'Lo mínimo para probarla', hint: 'Lo más barato que da evidencia real' },
      { title: '¿Cómo sabemos que funcionó?', hint: 'Señal concreta y medible' },
      { title: 'Riesgos', hint: 'Qué nos puede hundir el ciclo' },
    ]),
  },
  {
    key: 'reunion',
    name: 'Reunión de trabajo',
    blurb: 'Formato genérico para cualquier sesión: separar el ruido de lo accionable.',
    zones: band(3, [
      { title: 'Problemas', hint: 'Lo que duele hoy' },
      { title: 'Ideas', hint: 'Sin filtro — filtramos después' },
      { title: 'Decisiones y siguientes pasos', hint: 'Con dueño y fecha' },
    ]),
  },
  {
    key: 'libre',
    name: 'Lienzo libre',
    blurb: 'Sin estructura. Para cuando la conversación define su propia forma.',
    zones: [],
  },
];

export const templateByKey = (k: TemplateKey): Template =>
  TEMPLATES.find((t) => t.key === k) ?? TEMPLATES[0];

// ---------------------------------------------------------------- acciones

export type Action =
  | { type: 'note/add'; note: Note }
  | { type: 'note/move'; id: string; x: number; y: number }
  | { type: 'note/text'; id: string; text: string }
  | { type: 'note/color'; id: string; color: ColorKey }
  | { type: 'note/vote'; id: string; delta: number }
  | { type: 'note/delete'; id: string }
  | { type: 'note/front'; id: string }
  | { type: 'zone/title'; id: string; title: string }
  | { type: 'board/title'; title: string }
  | { type: 'board/load'; board: Board }
  | { type: 'board/template'; template: TemplateKey; id: string };

/** Reducer puro. Único punto de mutación — el mismo que correrá cada peer en multijugador. */
export function applyAction(board: Board, action: Action): Board {
  const touch = (b: Board): Board => ({ ...b, updatedAt: action.type === 'board/load' ? b.updatedAt : Date.now() });

  switch (action.type) {
    case 'board/load':
      return action.board;

    case 'board/template': {
      const t = templateByKey(action.template);
      return {
        id: action.id,
        title: t.stage ? `${t.name} — ${t.stage}` : t.name,
        template: action.template,
        zones: t.zones.map((z, i) => ({ ...z, id: `z${i}` })),
        notes: [],
        updatedAt: Date.now(),
      };
    }

    case 'note/add':
      return touch({ ...board, notes: [...board.notes, action.note] });

    case 'note/move':
      return touch({
        ...board,
        notes: board.notes.map((n) => (n.id === action.id ? { ...n, x: action.x, y: action.y } : n)),
      });

    case 'note/text':
      return touch({
        ...board,
        notes: board.notes.map((n) => (n.id === action.id ? { ...n, text: action.text } : n)),
      });

    case 'note/color':
      return touch({
        ...board,
        notes: board.notes.map((n) => (n.id === action.id ? { ...n, color: action.color } : n)),
      });

    case 'note/vote':
      return touch({
        ...board,
        notes: board.notes.map((n) =>
          n.id === action.id ? { ...n, votes: Math.max(0, n.votes + action.delta) } : n,
        ),
      });

    case 'note/delete':
      return touch({ ...board, notes: board.notes.filter((n) => n.id !== action.id) });

    case 'note/front': {
      const hit = board.notes.find((n) => n.id === action.id);
      if (!hit) return board;
      return touch({ ...board, notes: [...board.notes.filter((n) => n.id !== action.id), hit] });
    }

    case 'zone/title':
      return touch({
        ...board,
        zones: board.zones.map((z) => (z.id === action.id ? { ...z, title: action.title } : z)),
      });

    case 'board/title':
      return touch({ ...board, title: action.title });

    default:
      return board;
  }
}

// ---------------------------------------------------------------- helpers

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export function createBoard(template: TemplateKey = 'valor'): Board {
  return applyAction({} as Board, { type: 'board/template', template, id: uid() });
}

/** Coloca la nota en un hueco libre dentro de la zona, para no apilarlas al crear. */
export function slotInZone(board: Board, zone: Zone): { x: number; y: number } {
  const perRow = Math.max(1, Math.floor((zone.w - 20) / (NOTE_W + 14)));
  const inZone = board.notes.filter(
    (n) => n.x >= zone.x - 10 && n.x < zone.x + zone.w && n.y >= zone.y && n.y < zone.y + zone.h,
  ).length;
  const col = inZone % perRow;
  const rowN = Math.floor(inZone / perRow);
  return {
    // +96 deja libre el encabezado de la zona (título 21px + pista 15px) para que la
    // primera fila de notas no lo tape.
    x: zone.x + 14 + col * (NOTE_W + 14),
    y: zone.y + 96 + rowN * (NOTE_H + 14),
  };
}

const KEY = 'villelabs_canvas_v1';

export function saveBoard(b: Board): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b));
  } catch {
    /* cuota llena o modo privado — la sesión sigue viva en memoria */
  }
}

export function loadBoard(): Board | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const b = JSON.parse(raw) as Board;
    if (!b || !Array.isArray(b.notes) || !Array.isArray(b.zones)) return null;
    return b;
  } catch {
    return null;
  }
}
