// EXP-24 /lista (19-nov-2026): sorteo 50/50 propio de /lista, A = solo la pantalla 1, B = pantalla 1 + la cola.
//
// No usa lib/productos/experimento.ts (compartido con /curso y /esqueleto): ese, si el almacenamiento falla, deja a todos
// en A (EXP-22 salió 4–0). Aquí:
//   - ?v=A|B fuerza la versión para QA y no se guarda.
//   - Si no, se lee la cookie `vl_exp24`; si no está, localStorage; si tampoco, se sortea 50/50 y se guarda en ambos.
//   - Si guardar falla, la versión sorteada se usa igual en esta carga (sorteo por carga, nunca «A por defecto»).
// El script en línea corre antes de que se pinte la cola: pone data-exp24 en <html> y el CSS de app/lista/page.tsx
// muestra la cola solo con data-exp24="B". Sin parpadeo: la cola nace oculta y en A nunca se muestra.

export type VersionLista = 'A' | 'B';

export const CLAVE_EXP24 = 'vl_exp24';
export const ATRIBUTO_EXP24 = 'data-exp24';

// Mismo algoritmo que asignarVersion(), en ES5 para el <script> en línea.
export const SCRIPT_EXP24 = `(function(){var K='${CLAVE_EXP24}',v='',ok=/^[AB]$/;try{var q=(new URLSearchParams(location.search).get('v')||'').toUpperCase();if(ok.test(q))v=q}catch(e){}if(!v){var c='',l='';try{var m=document.cookie.match(/(?:^|; )${CLAVE_EXP24}=([AB])(?:;|$)/);if(m)c=m[1]}catch(e){}try{var s=localStorage.getItem(K);if(s&&ok.test(s))l=s}catch(e){}v=c||l||(Math.random()<0.5?'A':'B');if(!c){try{document.cookie=K+'='+v+'; path=/; max-age=2592000; samesite=lax'+(location.protocol==='https:'?'; secure':'')}catch(e){}}if(!l){try{localStorage.setItem(K,v)}catch(e){}}}document.documentElement.setAttribute('${ATRIBUTO_EXP24}',v)})();`;

const OK = /^[AB]$/;

/**
 * Versión vigente. Normalmente ya la puso el script en línea; si se llegó navegando dentro del sitio (el script en línea
 * no corre en una navegación de React), se asigna aquí con el mismo algoritmo y se marca <html>.
 */
export function asignarVersion(): VersionLista {
  const html = document.documentElement;
  const actual = html.getAttribute(ATRIBUTO_EXP24);
  if (actual && OK.test(actual)) return actual as VersionLista;
  let v = '';
  try {
    const q = (new URLSearchParams(location.search).get('v') || '').toUpperCase();
    if (OK.test(q)) v = q;
  } catch {
    /* sin URL legible: se sortea */
  }
  if (!v) {
    let c = '';
    let l = '';
    try {
      c = document.cookie.match(new RegExp(`(?:^|; )${CLAVE_EXP24}=([AB])(?:;|$)`))?.[1] ?? '';
    } catch {
      /* sin cookies */
    }
    try {
      const s = localStorage.getItem(CLAVE_EXP24);
      if (s && OK.test(s)) l = s;
    } catch {
      /* sin localStorage */
    }
    v = c || l || (Math.random() < 0.5 ? 'A' : 'B');
    if (!c) {
      try {
        document.cookie = `${CLAVE_EXP24}=${v}; path=/; max-age=2592000; samesite=lax${location.protocol === 'https:' ? '; secure' : ''}`;
      } catch {
        /* se usa igual en esta carga */
      }
    }
    if (!l) {
      try {
        localStorage.setItem(CLAVE_EXP24, v);
      } catch {
        /* se usa igual en esta carga */
      }
    }
  }
  html.setAttribute(ATRIBUTO_EXP24, v);
  return v as VersionLista;
}
