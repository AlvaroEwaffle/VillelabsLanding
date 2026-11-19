'use client';

import { useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { medirPregunta } from './medicion';

// Preguntas frecuentes de /lista (cola de B, EXP-24, 19-nov-2026). Acordeón con el patrón de WAI-ARIA: cada pregunta es
// un <button> dentro de un <h3>, con aria-expanded y aria-controls; todas parten cerradas. La primera apertura de cada
// pregunta se mide («lista · v=B · faq N «…» · src=…»).

export interface Pregunta {
  p: string;
  r: string;
}

export default function Preguntas({ preguntas }: { preguntas: Pregunta[] }) {
  const id = useId();
  const [abiertas, setAbiertas] = useState<Set<number>>(() => new Set());
  const medidas = useRef<Set<number>>(new Set());

  const alternar = (i: number) => {
    const abrir = !abiertas.has(i);
    if (abrir && !medidas.current.has(i)) {
      medidas.current.add(i);
      medirPregunta(i + 1, preguntas[i].p);
    }
    setAbiertas((a) => {
      const n = new Set(a);
      if (abrir) n.add(i);
      else n.delete(i);
      return n;
    });
  };

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
      {preguntas.map((q, i) => {
        const abierta = abiertas.has(i);
        return (
          <div key={q.p}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={abierta}
                aria-controls={`${id}-r${i}`}
                onClick={() => alternar(i)}
                className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5fb2dd]"
              >
                {q.p}
                <ChevronDown className={`h-5 w-5 shrink-0 text-[#5fb2dd] transition-transform motion-reduce:transition-none ${abierta ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h3>
            <div id={`${id}-r${i}`} role="region" aria-labelledby={`${id}-b${i}`} hidden={!abierta} className="px-4 pb-4 text-base text-slate-300">
              {q.r}
            </div>
          </div>
        );
      })}
    </div>
  );
}
