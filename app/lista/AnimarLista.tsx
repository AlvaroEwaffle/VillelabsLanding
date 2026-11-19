'use client';

import { useEffect } from 'react';
import { visitaLista } from './medicion';

// Animaciones de entrada de la cola de B (19-nov-2026, audio de Álvaro 20:06): cada elemento con data-aparece entra con un
// fundido y 14 px de desplazamiento al llegar al pantallazo (data-aparece="2" = tercero de su grupo → 140 ms de retardo).
// Las cifras con data-cuenta cuentan hasta su valor una sola vez.
//   - El contenido se ve por defecto (HTML sin clases): si el JS no corre, no hay nada oculto.
//   - Solo se esconde lo que está bajo el pantallazo al montar; lo que ya se ve no se toca. La pantalla 1 no se anima.
//   - Sin animación con prefers-reduced-motion o sin IntersectionObserver.
//   - Red de seguridad: un control en el scroll muestra cualquier elemento oculto que ya esté a la vista, por si el
//     observador no avisa. Solo se anima opacidad y transform: sin saltos de layout.

const DURACION_CUENTA = 900;

function contar(el: HTMLElement) {
  for (const n of el.querySelectorAll<HTMLElement>('[data-cuenta]')) {
    if (n.dataset.contado) continue;
    n.dataset.contado = '1';
    const hasta = Number(n.dataset.cuenta);
    const desde = Number(n.dataset.desde ?? 0);
    if (!Number.isFinite(hasta) || !Number.isFinite(desde)) continue;
    const retardo = parseFloat(el.style.getPropertyValue('--lista-retardo')) || 0;
    let inicio = 0;
    const paso = (t: number) => {
      if (!inicio) inicio = t;
      const x = Math.min(1, (t - inicio) / DURACION_CUENTA);
      const suave = 1 - Math.pow(1 - x, 3);
      n.textContent = String(Math.round(desde + (hasta - desde) * suave));
      if (x < 1) requestAnimationFrame(paso);
      else n.textContent = String(hasta);
    };
    setTimeout(() => requestAnimationFrame(paso), retardo);
  }
}

export default function AnimarLista() {
  useEffect(() => {
    if (visitaLista().v !== 'B') return;
    let reducido = false;
    try {
      reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      /* sin matchMedia: se anima */
    }
    if (reducido || typeof IntersectionObserver === 'undefined') return;

    const ocultos = new Set<HTMLElement>();
    const mostrar = (el: HTMLElement) => {
      if (!ocultos.delete(el)) return;
      el.classList.remove('lista-oculto');
      contar(el);
    };
    let obs: IntersectionObserver | null = null;
    let cuadro = 0;
    const revisar = () => {
      cuadro = 0;
      const alto = window.innerHeight;
      for (const el of [...ocultos]) if (el.getBoundingClientRect().top < alto) mostrar(el);
    };
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(revisar);
    };

    try {
      obs = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            if (!e.isIntersecting) continue;
            obs?.unobserve(e.target);
            mostrar(e.target as HTMLElement);
          }
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.01 },
      );
      const alto = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>('.cola-b [data-aparece]')) {
        const r = el.getBoundingClientRect();
        if (r.height === 0 || r.top < alto) continue; // ya a la vista (o sin caja): no se esconde
        const i = Math.min(5, Number(el.dataset.aparece) || 0);
        el.style.setProperty('--lista-retardo', `${i * 70}ms`);
        for (const n of el.querySelectorAll<HTMLElement>('[data-cuenta]')) n.textContent = n.dataset.desde ?? '0';
        el.classList.add('lista-anim', 'lista-oculto');
        ocultos.add(el);
        obs.observe(el);
      }
      window.addEventListener('scroll', alScroll, { passive: true });
    } catch {
      for (const el of [...ocultos]) mostrar(el);
    }
    return () => {
      obs?.disconnect();
      window.removeEventListener('scroll', alScroll);
      if (cuadro) cancelAnimationFrame(cuadro);
      for (const el of [...ocultos]) mostrar(el);
    };
  }, []);

  return null;
}
