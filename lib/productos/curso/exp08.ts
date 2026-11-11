// EXP-08 (10-nov-2026) · tres heros para /curso (A resultado · B dolor · C demostración), 1/3 cada uno.
// Motivo: GA4 del 10-nov, la gente que llega desde el anuncio de Meta «Ordena tu negocio» se queda ~1 s y solo 2 %
// llega al 90 % de scroll. Aprobado por Álvaro por WhatsApp.
//
// La variante se elige en la primera visita y queda en localStorage (vl_exp08). ?v=A|B|C la fuerza para QA sin
// guardarla. Si el almacenamiento falla, A. Se aplica como atributo data-exp08 en <html> con un script en línea antes
// de pintar el hero (export estático: no hay servidor que la elija), y el CSS de globals.css muestra el hero que toca.

export type VarianteExp08 = 'A' | 'B' | 'C';
export const CLAVE_EXP08 = 'vl_exp08';
const VALIDA = /^[ABC]$/;

/** Script en línea (mismo algoritmo que asignarVarianteExp08) para que el hero correcto salga en el primer pintado. */
export const SCRIPT_EXP08 = `(function(){var v='A';try{var q=(new URLSearchParams(location.search).get('v')||'').toUpperCase();if(/^[ABC]$/.test(q)){v=q}else{var s=localStorage.getItem('${CLAVE_EXP08}');if(s&&/^[ABC]$/.test(s)){v=s}else{var r='ABC'.charAt(Math.floor(Math.random()*3));localStorage.setItem('${CLAVE_EXP08}',r);if(localStorage.getItem('${CLAVE_EXP08}')===r)v=r}}}catch(e){v='A'}document.documentElement.setAttribute('data-exp08',v)})();`;

/** Lo mismo desde React, para cuando se llega a /curso navegando dentro del sitio (el script en línea no corre). */
export function asignarVarianteExp08(): VarianteExp08 {
  const actual = document.documentElement.getAttribute('data-exp08');
  if (actual && VALIDA.test(actual)) return actual as VarianteExp08;
  let v: VarianteExp08 = 'A';
  try {
    const q = (new URLSearchParams(location.search).get('v') || '').toUpperCase();
    if (VALIDA.test(q)) v = q as VarianteExp08;
    else {
      const s = localStorage.getItem(CLAVE_EXP08);
      if (s && VALIDA.test(s)) v = s as VarianteExp08;
      else {
        const r = 'ABC'.charAt(Math.floor(Math.random() * 3)) as VarianteExp08;
        localStorage.setItem(CLAVE_EXP08, r);
        if (localStorage.getItem(CLAVE_EXP08) === r) v = r;
      }
    }
  } catch {
    v = 'A';
  }
  document.documentElement.setAttribute('data-exp08', v);
  return v;
}

/** Variante vigente en esta página (solo existe si la visita pasó por /curso). */
export function varianteExp08(): VarianteExp08 | undefined {
  if (typeof document === 'undefined') return undefined;
  const v = document.documentElement.getAttribute('data-exp08');
  return v && VALIDA.test(v) ? (v as VarianteExp08) : undefined;
}

/** dataLayer `exp08_variante`, una vez por visita (sessionStorage). */
export function avisarVarianteExp08(variante: VarianteExp08) {
  try {
    try {
      if (sessionStorage.getItem('vl_exp08_dl') === variante) return;
      sessionStorage.setItem('vl_exp08_dl', variante);
    } catch {
      /* sin almacenamiento: se avisa igual */
    }
    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: 'exp08_variante', variante });
  } catch {
    /* nunca rompe la página */
  }
}
