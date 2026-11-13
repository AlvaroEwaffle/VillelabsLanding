'use client';
// Aparición al hacer scroll (13-nov-2026, /curso). Sin librerías: IntersectionObserver + clases de Tailwind.
//
// Reglas que cumple:
//   - El contenido está en el HTML prerenderizado y se ve SIN JS: nada nace oculto en el servidor.
//   - Al montar, solo se ocultan los elementos que todavía están BAJO el pantallazo (los que ya se ven no parpadean).
//   - Solo opacity + transform: no mueve el layout (no suma CLS) y no toca el LCP.
//   - prefers-reduced-motion o navegador sin IntersectionObserver → no se anima nada.
//   - Una vez: al entrar en pantalla se muestra y se deja de observar. Los que entran juntos salen escalonados (90 ms).
// Uso: ref en el contenedor y data-aparece en cada pieza.
import { useEffect, type RefObject } from 'react';

const OCULTO = ['opacity-0', 'translate-y-4'];
const TRANSICION = ['transition-[opacity,transform]', 'duration-500', 'ease-out'];

export function useAparecer(ref: RefObject<HTMLElement | null>, alVer?: () => void) {
  useEffect(() => {
    const raiz = ref.current;
    if (!raiz || typeof window === 'undefined') return;
    let visto = false;
    const avisar = () => {
      if (visto || !alVer) return;
      visto = true;
      alVer();
    };
    const quieto = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window);
    // Aviso de «vio la sección» (una vez) aunque no haya animación.
    const ioVista = 'IntersectionObserver' in window && alVer
      ? new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { avisar(); ioVista?.disconnect(); } }, { threshold: 0.25 })
      : null;
    // El primer bloque, no la sección entera: en celular la sección mide ~2.700 px y nunca se ve al 25 %.
    ioVista?.observe(raiz.querySelector('[data-aparece]') ?? raiz);
    if (quieto) return () => ioVista?.disconnect();

    const piezas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-aparece]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    piezas.forEach((el) => el.classList.add(...TRANSICION, ...OCULTO));
    const io = new IntersectionObserver(
      (entradas) => {
        let k = 0;
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${k++ * 90}ms`;
          el.classList.remove(...OCULTO);
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    piezas.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      ioVista?.disconnect();
    };
  }, [ref, alVer]);
}

/**
 * «Armado» de un diagrama o bloque (13-nov-2026, segundo paquete): el contenedor pasa por data-anim="listo" (estado inicial,
 * solo si está bajo el pantallazo y se permite movimiento) → data-anim="ver" al entrar en pantalla, una vez. Las piezas
 * se animan con CSS (globals.css: .a-pieza, .a-trazo, .a-encender, .a-pulso), con --i para el orden. Sin JS o con
 * reduced-motion el atributo no se pone y todo se ve quieto en su estado final. Devuelve `ver` para contadores.
 */
export function useArmado(ref: RefObject<HTMLElement | SVGElement | null>, alVer?: () => void, margen = '0px 0px -12% 0px') {
  useEffect(() => {
    const raiz = ref.current;
    if (!raiz || typeof window === 'undefined') return;
    const quieto = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window);
    if (quieto) {
      alVer?.();
      return;
    }
    if (raiz.getBoundingClientRect().top > window.innerHeight * 0.88) raiz.setAttribute('data-anim', 'listo');
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        // Doble rAF: el navegador pinta el estado «listo» antes de pasar a «ver», así la transición corre.
        requestAnimationFrame(() => requestAnimationFrame(() => raiz.setAttribute('data-anim', 'ver')));
        alVer?.();
        io.disconnect();
      },
      { rootMargin: margen },
    );
    io.observe(raiz);
    return () => io.disconnect();
  }, [ref, alVer, margen]);
}
