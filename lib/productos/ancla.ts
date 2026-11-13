// Ancla resistente a fbclid (13-nov-2026).
//
// Los anuncios de Meta apuntan a /curso?utm…#parte-gratis-hero. Si Meta pega el fbclid DESPUÉS del hash
// (#parte-gratis-hero?fbclid=X o #parte-gratis-hero&fbclid=X), el navegador busca un id que no existe, la página abre
// arriba y el visitante no ve el formulario del módulo 0.
//
// Arreglo en dos pasos:
//   1) SCRIPT_ANCLA, en línea antes del contenido (corre antes que el píxel y que Rastreo): corta lo que sigue al ancla,
//      pasa esos parámetros (fbclid, utm…) al query string si no estaban ya, y deja la URL limpia con history.replaceState.
//      Así el píxel ve el fbclid en location.search (cookie _fbc) y capturarUtm() lo lee igual que siempre.
//   2) bajarAlAncla(), desde React tras el render: baja al elemento por código (scrollIntoView respeta su scroll-mt) y
//      repite una vez cuando cargan las fuentes y la página, salvo que la persona ya haya movido la pantalla.
// Nunca lanza: si algo falla, la página queda como antes (abre arriba).

const BANDERA = '__vlAncla';

/** Script en línea: limpia el hash y deja en window.__vlAncla el id al que hay que bajar. Mismo algoritmo que limpiar(). */
export const SCRIPT_ANCLA = `(function(){try{var m=/^#([A-Za-z][\\w-]*)[?&](.*)$/.exec(location.hash);if(!m)return;var q=new URLSearchParams(location.search),x=new URLSearchParams(m[2]);x.forEach(function(v,k){if(!q.has(k))q.set(k,v)});var s=q.toString();history.replaceState(history.state,'',location.pathname+(s?'?'+s:'')+'#'+m[1]);window.${BANDERA}=m[1]}catch(e){}})();`;

/** Lo mismo desde React, por si el script en línea no corrió (navegación interna). Devuelve el id o null. */
function limpiar(): string | null {
  const m = /^#([A-Za-z][\w-]*)[?&](.*)$/.exec(location.hash);
  if (!m) return null;
  const q = new URLSearchParams(location.search);
  new URLSearchParams(m[2]).forEach((v, k) => {
    if (!q.has(k)) q.set(k, v);
  });
  const s = q.toString();
  history.replaceState(history.state, '', `${location.pathname}${s ? `?${s}` : ''}#${m[1]}`);
  return m[1];
}

/**
 * Si la URL traía un ancla con basura detrás (fbclid), baja a ese elemento. Llamar en un useEffect de la página.
 * Devuelve una función para limpiar los listeners.
 */
export function bajarAlAncla(): () => void {
  if (typeof window === 'undefined') return () => {};
  let id: string | null = null;
  try {
    const w = window as unknown as Record<string, unknown>;
    id = typeof w[BANDERA] === 'string' ? (w[BANDERA] as string) : limpiar();
    // La bandera se borra recién al terminar (no aquí): en desarrollo React monta los efectos dos veces.
    if (id) w[BANDERA] = id;
  } catch {
    return () => {};
  }
  if (!id) return () => {};
  const objetivo = id;
  let movio = false;
  let cerrado = false;
  const olvidar = () => {
    try {
      delete (window as unknown as Record<string, unknown>)[BANDERA];
    } catch {
      /* nada */
    }
  };
  const marcar = () => {
    movio = true;
    olvidar();
  };
  const inicio = Date.now();
  const bajar = () => {
    // Pasados 2,5 s no se vuelve a bajar: la persona pudo mover la pantalla de una forma que no se detecta (barra de scroll).
    if (movio || cerrado || Date.now() - inicio > 2500) return;
    const el = document.getElementById(objetivo);
    if (!el) return;
    try {
      el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    } catch {
      el.scrollIntoView(true);
    }
  };
  window.addEventListener('touchstart', marcar, { passive: true, once: true });
  window.addEventListener('wheel', marcar, { passive: true, once: true });
  window.addEventListener('keydown', marcar, { once: true });
  // Tras el render (el CSS de la variante de EXP-13 ya está aplicado: lo pone el script en línea antes de pintar).
  const raf = requestAnimationFrame(bajar);
  // Las fuentes y la foto del hero pueden mover el ancla unos píxeles: se corrige una vez.
  document.fonts?.ready.then(bajar).catch(() => {});
  if (document.readyState !== 'complete') window.addEventListener('load', bajar, { once: true });
  const fin = window.setTimeout(() => {
    bajar();
    olvidar();
  }, 900);
  return () => {
    cerrado = true;
    cancelAnimationFrame(raf);
    clearTimeout(fin);
    window.removeEventListener('touchstart', marcar);
    window.removeEventListener('wheel', marcar);
    window.removeEventListener('keydown', marcar);
    window.removeEventListener('load', bajar);
  };
}
