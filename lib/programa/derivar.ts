import type { ConfigPrograma, EstadoPM, Historia, Overlay, Snapshot, Sprint } from './tipos';

/**
 * Todo lo que la página muestra se calcula acá, a partir del snapshot de
 * GitHub y del overlay. Ninguna cifra se escribe a mano.
 *
 * La regla que gobierna el archivo: si un número no se puede rastrear hasta un
 * dato de GitHub o hasta algo que alguien tecleó, no se muestra.
 */

export type Rag = 'v' | 'a' | 'r';

export const COLOR_RAG: Record<Rag, string> = {
  v: '#1f8b4c',
  a: '#c9860a',
  r: '#c0392b',
};

export const NOMBRE_RAG: Record<Rag, string> = {
  v: 'Verde',
  a: 'Ámbar',
  r: 'Rojo',
};

/** Ámbar cuando no hay dato: la ausencia de medición no es una buena noticia. */
export function rag(valor: number | null, verde: number, ambar: number, invertido = false): Rag {
  if (valor === null || Number.isNaN(valor)) return 'a';
  if (invertido) return valor <= verde ? 'v' : valor <= ambar ? 'a' : 'r';
  return valor >= verde ? 'v' : valor >= ambar ? 'a' : 'r';
}

/** El semáforo de un conjunto es el peor de sus miembros, nunca el promedio. */
export function peor(...estados: Rag[]): Rag {
  if (estados.includes('r')) return 'r';
  if (estados.includes('a')) return 'a';
  return 'v';
}

// ── Estado efectivo ────────────────────────────────────────────────────────

const DEL_BOARD: Record<string, EstadoPM> = {
  Backlog: 'Sin tocar',
  'Sprint Backlog': 'En análisis',
  Ready: 'Lista para tomar',
  'In progress': 'En curso',
  'In review': 'En revisión',
  Done: 'Hecha',
};

/**
 * Qué estado mostramos. GitHub manda salvo que alguien haya dicho otra cosa
 * a mano — y una issue cerrada está hecha, diga lo que diga el overlay.
 */
export function estadoEfectivo(h: Historia, o: Overlay): EstadoPM {
  if (h.estado_github === 'CLOSED') return 'Hecha';
  const manual = o.historias[String(h.numero)]?.estado;
  if (manual) return manual;
  return (h.estado_board && DEL_BOARD[h.estado_board]) || 'Sin tocar';
}

/** ¿El estado escrito a mano contradice al board? Vale la pena verlo. */
export function divergente(h: Historia, o: Overlay): boolean {
  const manual = o.historias[String(h.numero)]?.estado;
  if (!manual || h.estado_github === 'CLOSED') return false;
  const delBoard = (h.estado_board && DEL_BOARD[h.estado_board]) || 'Sin tocar';
  return manual !== delBoard;
}

export function hecha(h: Historia, o: Overlay): boolean {
  return estadoEfectivo(h, o) === 'Hecha';
}

export function bloqueada(h: Historia, o: Overlay): boolean {
  return estadoEfectivo(h, o) === 'Bloqueada';
}

// ── Series ─────────────────────────────────────────────────────────────────

const DIA = 86_400_000;

function dias(desde: string, hasta: string): string[] {
  const salida: string[] = [];
  const fin = Date.parse(hasta + 'T23:59:59Z');
  for (let t = Date.parse(desde + 'T00:00:00Z'); t <= fin; t += DIA) {
    salida.push(new Date(t).toISOString().slice(0, 10));
  }
  return salida;
}

export interface Punto {
  fecha: string;
  pendientes: number;
  alcance: number;
  hechas: number;
  ideal: number;
}

/**
 * Burndown y burnup reconstruidos desde `creada` y `cerrada`.
 *
 * GitHub no guarda historia de sprint: no hay forma de preguntarle "cuántas
 * había abiertas el martes". Pero sí guarda cuándo nació y murió cada issue,
 * y con eso la serie se reconstruye exacta hacia atrás. La contra es que una
 * historia movida de fase aparece como si siempre hubiera estado ahí — por eso
 * el burnup dibuja el alcance además del avance: si la línea de arriba sube,
 * es que el trabajo creció, no que el equipo se atrasó.
 */
export function serie(historias: Historia[], overlay: Overlay, sprint: Sprint): Punto[] {
  const fechas = dias(sprint.desde, sprint.hasta);
  const total = historias.length;
  return fechas.map((f, i) => {
    const corte = Date.parse(f + 'T23:59:59Z');
    const alcance = historias.filter((h) => Date.parse(h.creada) <= corte).length;
    const hechas = historias.filter((h) => {
      if (h.cerrada) return Date.parse(h.cerrada) <= corte;
      // Una historia marcada "Hecha" a mano pero con la issue abierta cuenta
      // solo desde hoy: no se le puede inventar una fecha de cierre.
      return hecha(h, overlay) && corte >= Date.now();
    }).length;
    return {
      fecha: f,
      alcance,
      hechas,
      pendientes: alcance - hechas,
      ideal: total - (total * i) / Math.max(1, fechas.length - 1),
    };
  });
}

// ── Semáforo del programa ──────────────────────────────────────────────────

export interface Criterio {
  clave: string;
  titulo: string;
  valor: string;
  estado: Rag;
  /** El umbral, en texto. Un RAG que no se puede auditar es decoración. */
  regla: string;
}

export interface Lectura {
  estado: Rag;
  titulo: string;
  criterios: Criterio[];
  total: number;
  hechas: number;
  pct: number;
  bloqueadas: number;
  sinDueno: number;
  enCurso: number;
  transcurrido: number;
}

export function sprintVigente(cfg: ConfigPrograma, hoy = new Date()): Sprint {
  const t = hoy.getTime();
  return (
    cfg.sprints.find((s) => t >= Date.parse(s.desde) && t <= Date.parse(s.hasta + 'T23:59:59Z')) ??
    cfg.sprints[cfg.sprints.length - 1]
  );
}

export function leer(snap: Snapshot, overlay: Overlay, cfg: ConfigPrograma, hoy = new Date()): Lectura {
  // El semáforo se calcula SOLO sobre la fase en foco. Ponerlo en rojo por
  // fases que todavía no arrancan enseña a ignorarlo.
  const foco = snap.historias.filter((h) => h.fase === cfg.fase_foco);
  const total = foco.length;
  const hechas = foco.filter((h) => hecha(h, overlay)).length;
  const pct = total ? Math.round((hechas / total) * 100) : 0;
  const bloqueadas = foco.filter((h) => bloqueada(h, overlay)).length;
  const sinDueno = foco.filter((h) => h.asignados.length === 0 && !hecha(h, overlay)).length;
  const enCurso = foco.filter((h) => estadoEfectivo(h, overlay) === 'En curso').length;

  const sp = sprintVigente(cfg, hoy);
  const largo = Date.parse(sp.hasta + 'T23:59:59Z') - Date.parse(sp.desde);
  const transcurrido = Math.max(
    0,
    Math.min(100, Math.round(((hoy.getTime() - Date.parse(sp.desde)) / largo) * 100)),
  );

  const raidAltos = overlay.raid.filter(
    (r) => r.impacto === 'alto' && r.estado !== 'cerrado' && (r.tipo === 'R' || r.tipo === 'I'),
  ).length;
  const dependenciasBloqueando = overlay.raid.filter(
    (r) => r.tipo === 'D' && r.estado !== 'cerrado' && r.estado !== 'en revisión',
  ).length;

  // Avance contra calendario: 10 puntos de holgura antes del ámbar, 25 antes
  // del rojo. Atrasarse un poco es normal; atrasarse un cuarto del sprint no.
  const brecha = transcurrido - pct;
  const prsViejos = snap.prs.filter(
    (p) => !p.borrador && Date.now() - Date.parse(p.tocada) > 3 * DIA,
  ).length;

  const criterios: Criterio[] = [
    {
      clave: 'avance',
      titulo: 'Avance contra calendario',
      valor: `${pct}% hecho con ${transcurrido}% del sprint corrido`,
      estado: rag(brecha, 10, 25, true),
      regla: 'Verde si el atraso es ≤10 puntos · ámbar hasta 25 · rojo sobre 25',
    },
    {
      clave: 'bloqueadas',
      titulo: 'Historias bloqueadas',
      valor: `${bloqueadas} de ${total}`,
      estado: rag(bloqueadas, 0, 2, true),
      regla: 'Verde en cero · ámbar hasta 2 · rojo sobre 2',
    },
    {
      clave: 'dependencias',
      titulo: 'Dependencias sin resolver',
      valor: `${dependenciasBloqueando} bloqueando`,
      estado: rag(dependenciasBloqueando, 0, 2, true),
      regla: 'Verde en cero · ámbar hasta 2 · rojo sobre 2',
    },
    {
      clave: 'dueno',
      titulo: 'Historias sin dueño en la fase',
      valor: `${sinDueno} de ${total - hechas} abiertas`,
      estado: rag(sinDueno, 0, 3, true),
      regla: 'Solo cuenta la fase en foco · verde en cero · ámbar hasta 3 · rojo sobre 3',
    },
    {
      clave: 'raid',
      titulo: 'Riesgos y problemas de impacto alto',
      valor: `${raidAltos} abiertos`,
      estado: rag(raidAltos, 1, 3, true),
      regla: 'Verde ≤1 · ámbar hasta 3 · rojo sobre 3',
    },
    {
      clave: 'wip',
      titulo: 'Trabajo en curso',
      valor: `${enCurso} en curso para ${Object.keys(cfg.equipo).length} personas`,
      estado: rag(enCurso, Object.keys(cfg.equipo).length, Object.keys(cfg.equipo).length * 2, true),
      regla: 'Verde hasta 1 por persona · ámbar hasta 2 · rojo sobre eso',
    },
    {
      clave: 'revision',
      titulo: 'PRs esperando revisión',
      valor: `${prsViejos} sin tocar hace más de 3 días`,
      estado: rag(prsViejos, 0, 1, true),
      regla: 'Verde en cero · ámbar con 1 · rojo con 2 o más',
    },
  ];

  const estado = peor(...criterios.map((c) => c.estado));
  const titulo =
    estado === 'v'
      ? 'Programa en verde'
      : estado === 'a'
        ? 'Programa en ámbar'
        : 'Programa en rojo';

  return { estado, titulo, criterios, total, hechas, pct, bloqueadas, sinDueno, enCurso, transcurrido };
}

// ── Utilidades de presentación ─────────────────────────────────────────────

export function epicaDe(h: Historia): string | null {
  const l = h.etiquetas.find((e) => e.startsWith('epic: '));
  return l ? l.slice(6) : null;
}

export function nombreDe(login: string, cfg: ConfigPrograma): string {
  return cfg.equipo[login] ?? login;
}

export function antiguedad(iso: string, ahora = Date.now()): string {
  const min = Math.floor((ahora - Date.parse(iso)) / 60000);
  if (min < 1) return 'recién';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} ${d === 1 ? 'día' : 'días'}`;
}
