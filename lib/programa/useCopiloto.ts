'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getDb } from '@/lib/proposals/firebase';

/**
 * El hilo con el copiloto: un documento en Firestore por programa.
 *
 * Mismo criterio que el overlay — un documento y no una subcolección, porque
 * son decenas de mensajes, no miles. Entran de sobra en el límite de 1 MB, se
 * leen con un solo listener y cada guardado es atómico.
 *
 * Separado de `programas/{slug}` a propósito: el overlay lo escribe la página
 * y lo lee la página. Esto lo escriben los dos lados, y un hilo creciendo no
 * tiene por qué competir por el mismo documento que el RAID.
 *
 * Sin credenciales de Firebase cae a `localStorage`, igual que el overlay — y
 * la UI lo dice, porque un comentario que nadie va a leer no puede parecer
 * enviado.
 */

const LS_PREFIX = 'programa_copiloto_';

export type Quien = 'alvaro' | 'copiloto';

export interface Mensaje {
  id: string;
  de: Quien;
  texto: string;
  /** Dónde estaba parado cuando lo escribió. Un comentario sin contexto obliga
   *  a adivinar de qué pantalla habla. */
  donde: string;
  /** ISO. */
  ts: string;
  /** Lo marca el copiloto cuando lo procesa. */
  leido?: boolean;
}

export interface UsoCopiloto {
  mensajes: Mensaje[];
  cargando: boolean;
  /** 'firestore' | 'local' — la UI lo muestra, para no fingir que llega. */
  respaldo: 'firestore' | 'local';
  enviando: boolean;
  enviar: (texto: string, donde: string) => void;
}

function leerLocal(slug: string): Mensaje[] {
  try {
    const crudo = localStorage.getItem(LS_PREFIX + slug);
    return crudo ? (JSON.parse(crudo) as Mensaje[]) : [];
  } catch {
    return [];
  }
}

function guardarLocal(slug: string, mensajes: Mensaje[]) {
  try {
    localStorage.setItem(LS_PREFIX + slug, JSON.stringify(mensajes));
  } catch {
    /* modo privado o cuota llena: no es motivo para romper la página */
  }
}

function nuevoId(): string {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function useCopiloto(slug: string): UsoCopiloto {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [respaldo, setRespaldo] = useState<'firestore' | 'local'>('local');

  // Mientras hay una escritura en vuelo, el eco de onSnapshot no debe pisar lo
  // que acabamos de agregar localmente.
  const enVuelo = useRef(0);
  const ultimo = useRef<Mensaje[]>([]);

  useEffect(() => {
    const db = getDb();
    if (!db) {
      const local = leerLocal(slug);
      ultimo.current = local;
      setMensajes(local);
      setRespaldo('local');
      setCargando(false);
      return;
    }

    setRespaldo('firestore');
    const parar = onSnapshot(
      doc(db, 'programa_copiloto', slug),
      (snap) => {
        if (enVuelo.current > 0) return;
        const datos = (snap.data()?.mensajes ?? []) as Mensaje[];
        ultimo.current = datos;
        setMensajes(datos);
        setCargando(false);
      },
      () => {
        // Reglas cerradas, red caída, proyecto mal configurado: cualquiera de
        // los tres deja el hilo sin llegar a destino. Decirlo, no disimularlo.
        const local = leerLocal(slug);
        ultimo.current = local;
        setMensajes(local);
        setRespaldo('local');
        setCargando(false);
      },
    );
    return parar;
  }, [slug]);

  const enviar = useCallback(
    (texto: string, donde: string) => {
      const limpio = texto.trim();
      if (!limpio) return;

      const mensaje: Mensaje = {
        id: nuevoId(),
        de: 'alvaro',
        texto: limpio.slice(0, 4000),
        donde,
        ts: new Date().toISOString(),
      };

      const siguiente = [...ultimo.current, mensaje];
      ultimo.current = siguiente;
      setMensajes(siguiente);

      const db = getDb();
      if (!db) {
        guardarLocal(slug, siguiente);
        return;
      }

      setEnviando(true);
      enVuelo.current += 1;
      setDoc(
        doc(db, 'programa_copiloto', slug),
        { mensajes: siguiente, actualizado: new Date().toISOString() },
        { merge: true },
      )
        .catch(() => {
          // Si no se pudo escribir, al menos que no se pierda lo tecleado.
          guardarLocal(slug, siguiente);
          setRespaldo('local');
        })
        .finally(() => {
          enVuelo.current -= 1;
          setEnviando(false);
        });
    },
    [slug],
  );

  return { mensajes, cargando, respaldo, enviando, enviar };
}
