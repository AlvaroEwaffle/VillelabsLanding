// Experimentos A/B/C de heros (generaliza EXP-08 /curso, 10-nov-2026; EXP-09 /esqueleto, 10-nov-2026).
//
// La variante se elige en la primera visita y queda en localStorage (`clave`). ?v=A|B|C la fuerza para QA sin
// guardarla. Si el almacenamiento falla, A. Se aplica como atributo data-expNN en <html> con un script en línea antes
// de pintar el hero (export estático: no hay servidor que la elija), y el CSS de globals.css muestra el hero que toca.

export type Variante = 'A' | 'B' | 'C';
const VALIDA = /^[ABC]$/;

export interface Experimento {
  /** «08», «09»… → atributo data-exp08 y etiqueta «[EXP-08 X]» en Slack. */
  id: string;
  /** Script en línea (mismo algoritmo que asignar) para que el hero correcto salga en el primer pintado. */
  script: string;
  /** Lo mismo desde React, para cuando se llega navegando dentro del sitio (el script en línea no corre). */
  asignar: () => Variante;
  /** Variante vigente en esta página (solo existe si la visita pasó por la página del experimento). */
  variante: () => Variante | undefined;
  /** dataLayer `expNN_variante`, una vez por visita (sessionStorage). */
  avisar: (v: Variante) => void;
  /** Etiqueta que viaja a Slack/GA4: la variante, o su nombre de ronda (C2 desde el 11-nov-2026). */
  etiqueta: (v: Variante) => string;
}

export function crearExperimento(id: string, clave: string, etiquetas: Partial<Record<Variante, string>> = {}): Experimento {
  const atributo = `data-exp${id}`;

  const script = `(function(){var v='A';try{var q=(new URLSearchParams(location.search).get('v')||'').toUpperCase();if(/^[ABC]$/.test(q)){v=q}else{var s=localStorage.getItem('${clave}');if(s&&/^[ABC]$/.test(s)){v=s}else{var r='ABC'.charAt(Math.floor(Math.random()*3));localStorage.setItem('${clave}',r);if(localStorage.getItem('${clave}')===r)v=r}}}catch(e){v='A'}document.documentElement.setAttribute('${atributo}',v)})();`;

  function asignar(): Variante {
    const actual = document.documentElement.getAttribute(atributo);
    if (actual && VALIDA.test(actual)) return actual as Variante;
    let v: Variante = 'A';
    try {
      const q = (new URLSearchParams(location.search).get('v') || '').toUpperCase();
      if (VALIDA.test(q)) v = q as Variante;
      else {
        const s = localStorage.getItem(clave);
        if (s && VALIDA.test(s)) v = s as Variante;
        else {
          const r = 'ABC'.charAt(Math.floor(Math.random() * 3)) as Variante;
          localStorage.setItem(clave, r);
          if (localStorage.getItem(clave) === r) v = r;
        }
      }
    } catch {
      v = 'A';
    }
    document.documentElement.setAttribute(atributo, v);
    return v;
  }

  function variante(): Variante | undefined {
    if (typeof document === 'undefined') return undefined;
    const v = document.documentElement.getAttribute(atributo);
    return v && VALIDA.test(v) ? (v as Variante) : undefined;
  }

  function avisar(v: Variante) {
    try {
      try {
        if (sessionStorage.getItem(`${clave}_dl`) === v) return;
        sessionStorage.setItem(`${clave}_dl`, v);
      } catch {
        /* sin almacenamiento: se avisa igual */
      }
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer ?? [];
      w.dataLayer.push({ event: `exp${id}_variante`, variante: etiqueta(v) });
    } catch {
      /* nunca rompe la página */
    }
  }

  function etiqueta(v: Variante): string {
    return etiquetas[v] ?? v;
  }

  return { id, script, asignar, variante, avisar, etiqueta };
}
