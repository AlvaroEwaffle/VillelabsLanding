'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

// Estado guardado en localStorage, sin desajustes de hidratación (el servidor siempre ve el valor inicial).
// Si localStorage falla (ventana privada, bloqueado), sigue funcionando en memoria durante la visita.

const oyentes = new Set<() => void>();
const memoria = new Map<string, string>();

function suscribir(cb: () => void) {
  oyentes.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    oyentes.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function leer(clave: string): string | null {
  try {
    const v = window.localStorage.getItem(clave);
    if (v !== null) return v;
  } catch {
    /* sin acceso a localStorage */
  }
  return memoria.get(clave) ?? null;
}

function escribir(clave: string, valor: string | null) {
  if (valor === null) memoria.delete(clave);
  else memoria.set(clave, valor);
  try {
    if (valor === null) window.localStorage.removeItem(clave);
    else window.localStorage.setItem(clave, valor);
  } catch {
    /* queda en memoria */
  }
  oyentes.forEach((l) => l());
}

function parsear<T>(raw: string | null, inicial: T): T {
  if (raw === null) return inicial;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return inicial;
  }
}

/** `inicial` debe ser estable (constante de módulo). */
export function usePersistido<T>(clave: string, inicial: T) {
  const raw = useSyncExternalStore(suscribir, () => leer(clave), () => null);
  const valor = useMemo(() => parsear(raw, inicial), [raw, inicial]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const prev = parsear(leer(clave), inicial);
      const siguiente = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      escribir(clave, JSON.stringify(siguiente));
    },
    [clave, inicial],
  );

  const borrar = useCallback(() => escribir(clave, null), [clave]);

  return [valor, set, borrar] as const;
}

const sinCambios = () => () => {};

/** true solo en el cliente, después de hidratar. */
export function useMontado() {
  return useSyncExternalStore(sinCambios, () => true, () => false);
}
