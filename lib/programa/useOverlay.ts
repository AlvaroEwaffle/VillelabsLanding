'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { getDb } from '@/lib/proposals/firebase';
import { OVERLAY_VACIO, type EntradaRaid, type Overlay, type OverlayHistoria } from './tipos';

/**
 * Lo editable del programa: un solo documento en Firestore por programa.
 *
 * Un documento y no una subcolección por historia porque son decenas, no
 * miles: cabe de sobra en el límite de 1 MB, se lee con un solo listener y
 * cada guardado es atómico. Subcolecciones aquí serían complejidad sin dueño.
 *
 * Si no hay credenciales de Firebase, cae a `localStorage` y la herramienta
 * sigue funcionando — igual que el progreso de las propuestas.
 */

const LS_PREFIX = 'programa_overlay_';
const RETARDO_MS = 600; // escribir en cada tecla haría una escritura por letra

function leerLocal(slug: string): Overlay {
  try {
    const crudo = localStorage.getItem(LS_PREFIX + slug);
    if (!crudo) return OVERLAY_VACIO;
    return { ...OVERLAY_VACIO, ...JSON.parse(crudo) };
  } catch {
    return OVERLAY_VACIO;
  }
}

function guardarLocal(slug: string, datos: Overlay) {
  try {
    localStorage.setItem(LS_PREFIX + slug, JSON.stringify(datos));
  } catch {
    /* modo privado o cuota llena: no es motivo para romper la página */
  }
}

export interface UsoOverlay {
  overlay: Overlay;
  cargando: boolean;
  /** 'firestore' | 'local' — la página lo dice, para no fingir que se sincroniza. */
  respaldo: 'firestore' | 'local';
  guardando: boolean;
  fijarHistoria: (numero: number, parche: Partial<OverlayHistoria>) => void;
  fijarNotaGeneral: (texto: string) => void;
  guardarRaid: (entrada: EntradaRaid) => void;
  borrarRaid: (id: string) => void;
  /** Carga inicial del RAID. No hace nada si ya se sembró alguna vez. */
  sembrar: (semilla: Pick<Overlay, 'raid' | 'nota_general'>) => void;
}

export function useOverlay(slug: string): UsoOverlay {
  const [overlay, setOverlay] = useState<Overlay>(OVERLAY_VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [respaldo, setRespaldo] = useState<'firestore' | 'local'>('local');

  // Mientras hay una escritura en vuelo, el eco de onSnapshot no debe pisar lo
  // que se está tecleando. Este contador es el que decide quién manda.
  const enVuelo = useRef(0);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimo = useRef<Overlay>(OVERLAY_VACIO);

  useEffect(() => {
    const db = getDb();
    if (!db) {
      const local = leerLocal(slug);
      ultimo.current = local;
      setOverlay(local);
      setCargando(false);
      return;
    }
    setRespaldo('firestore');
    const ref = doc(db, 'programas', slug);
    const cortar = onSnapshot(
      ref,
      (snap) => {
        if (enVuelo.current > 0) return; // lo mío es más nuevo que este eco
        const datos = snap.exists()
          ? ({ ...OVERLAY_VACIO, ...(snap.data() as Partial<Overlay>) } as Overlay)
          : leerLocal(slug);
        ultimo.current = datos;
        setOverlay(datos);
        setCargando(false);
      },
      () => {
        setRespaldo('local');
        const local = leerLocal(slug);
        ultimo.current = local;
        setOverlay(local);
        setCargando(false);
      },
    );
    return () => cortar();
  }, [slug]);

  const persistir = useCallback(
    (datos: Overlay) => {
      guardarLocal(slug, datos);
      const db = getDb();
      if (!db) return;
      if (temporizador.current) clearTimeout(temporizador.current);
      setGuardando(true);
      enVuelo.current += 1;
      temporizador.current = setTimeout(() => {
        setDoc(doc(db, 'programas', slug), {
          ...datos,
          actualizado: Timestamp.now().toDate().toISOString(),
        })
          .catch(() => setRespaldo('local'))
          .finally(() => {
            enVuelo.current = Math.max(0, enVuelo.current - 1);
            setGuardando(false);
          });
      }, RETARDO_MS);
    },
    [slug],
  );

  const aplicar = useCallback(
    (cambio: (previo: Overlay) => Overlay) => {
      const siguiente = cambio(ultimo.current);
      ultimo.current = siguiente;
      setOverlay(siguiente);
      persistir(siguiente);
    },
    [persistir],
  );

  const fijarHistoria = useCallback(
    (numero: number, parche: Partial<OverlayHistoria>) => {
      aplicar((previo) => {
        const clave = String(numero);
        const fusion: OverlayHistoria = {
          ...previo.historias[clave],
          ...parche,
          actualizado: new Date().toISOString(),
        };
        // Un campo vacío se borra en vez de guardarse como "": así la historia
        // vuelve a depender de GitHub en vez de quedar con un override mudo.
        for (const k of Object.keys(fusion) as (keyof OverlayHistoria)[]) {
          if (fusion[k] === '' || fusion[k] === undefined) delete fusion[k];
        }
        const historias = { ...previo.historias };
        if (Object.keys(fusion).filter((k) => k !== 'actualizado').length === 0) {
          delete historias[clave];
        } else {
          historias[clave] = fusion;
        }
        return { ...previo, historias };
      });
    },
    [aplicar],
  );

  const fijarNotaGeneral = useCallback(
    (texto: string) => aplicar((previo) => ({ ...previo, nota_general: texto })),
    [aplicar],
  );

  const guardarRaid = useCallback(
    (entrada: EntradaRaid) =>
      aplicar((previo) => {
        const marcada = { ...entrada, actualizada: new Date().toISOString() };
        const i = previo.raid.findIndex((r) => r.id === entrada.id);
        const raid = [...previo.raid];
        if (i >= 0) raid[i] = marcada;
        else raid.push(marcada);
        return { ...previo, raid };
      }),
    [aplicar],
  );

  const borrarRaid = useCallback(
    (id: string) => aplicar((previo) => ({ ...previo, raid: previo.raid.filter((r) => r.id !== id) })),
    [aplicar],
  );

  const sembrar = useCallback(
    (semilla: Pick<Overlay, 'raid' | 'nota_general'>) =>
      aplicar((previo) => {
        if (previo.sembrado || previo.raid.length > 0) return previo;
        return {
          ...previo,
          sembrado: true,
          raid: semilla.raid,
          nota_general: previo.nota_general || semilla.nota_general,
        };
      }),
    [aplicar],
  );

  return {
    overlay,
    cargando,
    respaldo,
    guardando,
    fijarHistoria,
    fijarNotaGeneral,
    guardarRaid,
    borrarRaid,
    sembrar,
  };
}
