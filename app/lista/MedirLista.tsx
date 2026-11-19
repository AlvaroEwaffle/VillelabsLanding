'use client';

import { useEffect } from 'react';
import { medirCarga, medirScroll, visitaLista } from './medicion';

// Carga de /lista (una vez) y, solo en B, scroll 25/50/75 % (una vez cada uno). Ver app/lista/medicion.ts.

const HITOS = [25, 50, 75] as const;

export default function MedirLista() {
  useEffect(() => {
    const { v, prueba } = visitaLista();
    medirCarga();
    if (v !== 'B' || prueba) return;

    const vistos = new Set<number>();
    let pendiente: ReturnType<typeof setTimeout> | null = null;
    const medir = () => {
      pendiente = null;
      const doc = document.documentElement;
      const alto = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0);
      if (alto <= 0) return;
      const pct = ((window.scrollY + window.innerHeight) / alto) * 100;
      for (const h of HITOS) {
        if (pct + 1 >= h && !vistos.has(h)) {
          vistos.add(h);
          medirScroll(h);
        }
      }
      if (vistos.size === HITOS.length) window.removeEventListener('scroll', alScroll);
    };
    // El primer pantallazo ya muestra parte de la página: no se cuenta como scroll hasta que la persona se mueve.
    const alScroll = () => {
      if (!pendiente) pendiente = setTimeout(medir, 300);
    };
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', alScroll);
      if (pendiente) clearTimeout(pendiente);
    };
  }, []);

  return null;
}
