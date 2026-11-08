'use client';

// Progreso de la guía en localStorage. Store externo + useSyncExternalStore para que el
// render del servidor (export estático) use el estado vacío y el cliente lea lo guardado.
import { useCallback, useSyncExternalStore } from 'react';

export type Vista = 'portada' | 'cierre' | number;
export type DiaPrueba = { enviados: string; respuestas: string; conversaciones: string };

export type Fila = {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  fuente: string;
  senal: string;
  encaje: string;
  senalPts: string;
  acceso: string;
  estado: string;
  proximo: string;
  fecha: string; // AAAA-MM-DD
};

export type Progreso = {
  vista: Vista;
  checks: Record<string, boolean[]>;
  diagnostico: Record<string, string> | null;
  notas: Record<string, string>;
  prospectos: Fila[];
  prueba: DiaPrueba[];
  quiz: (number | null)[];
};

const KEY = 'vl-guia-prospeccion-v2';
const DIA_VACIO: DiaPrueba = { enviados: '', respuestas: '', conversaciones: '' };

export function filaVacia(): Fila {
  return {
    id: Math.random().toString(36).slice(2, 10),
    nombre: '',
    empresa: '',
    email: '',
    whatsapp: '',
    fuente: '',
    senal: '',
    encaje: '',
    senalPts: '',
    acceso: '',
    estado: 'Sin mensaje',
    proximo: '',
    fecha: '',
  };
}

export const PROGRESO_INICIAL: Progreso = {
  vista: 'portada',
  checks: {},
  diagnostico: null,
  notas: {},
  prospectos: [],
  prueba: Array.from({ length: 5 }, () => ({ ...DIA_VACIO })),
  quiz: [null, null, null, null, null],
};

let cache: Progreso | null = null;
const listeners = new Set<() => void>();

function leer(): Progreso {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Progreso>) : {};
    cache = { ...PROGRESO_INICIAL, ...parsed };
  } catch {
    cache = PROGRESO_INICIAL;
  }
  return cache;
}

function escribir(next: Progreso) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Sin almacenamiento (modo privado): el progreso vive solo en esta visita.
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useProgreso() {
  const estado = useSyncExternalStore(subscribe, leer, () => PROGRESO_INICIAL);
  const actualizar = useCallback((fn: (p: Progreso) => Progreso) => escribir(fn(leer())), []);
  return [estado, actualizar] as const;
}

export function parteCompleta(p: Progreso, n: number, total: number) {
  const c = p.checks[String(n)] ?? [];
  return total > 0 && Array.from({ length: total }, (_, i) => !!c[i]).every(Boolean);
}

export const puntaje = (f: Fila) => {
  const n = [f.encaje, f.senalPts, f.acceso].map((x) => parseInt(x, 10) || 0);
  return n.reduce((a, b) => a + b, 0);
};

export const filaConDatos = (f: Fila) => !!(f.nombre.trim() || f.empresa.trim());
