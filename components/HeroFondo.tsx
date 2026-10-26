'use client';

import { useEffect, useRef } from 'react';

/*
 * Fondo animado del hero del home. Misma técnica que el hero de ewaffle.cl:
 * solo CSS (@keyframes) + un puñado de nodos DOM + un brillo que sigue al puntero
 * vía variables CSS. Sin canvas ni librerías. Estilos en app/globals.css (.hero-fondo).
 *
 * Tema Villelab: "tareas" (píldoras) y "nodos" (puntos) que suben como trabajo
 * que los agentes van procesando, sobre una grilla de puntos que se desplaza lento.
 * Todo decorativo (aria-hidden) y detrás del texto; prefers-reduced-motion lo congela.
 */

// Pseudoaleatorio con semilla fija: mismo resultado en servidor y cliente (sin hydration mismatch).
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Particula = { left: number; size: number; dur: number; delay: number; pill: boolean; tono: number };

const rnd = seeded(20261026);
const PARTICULAS: Particula[] = Array.from({ length: 16 }, (_, i) => ({
  left: Math.round(rnd() * 100),
  size: Math.round(6 + rnd() * 10),
  dur: Math.round((10 + rnd() * 12) * 10) / 10,
  delay: Math.round(rnd() * 14 * 10) / 10,
  pill: i % 3 === 0,
  tono: i % 4,
}));

const TONOS = ['rgba(33,117,161,0.9)', 'rgba(125,211,252,0.85)', 'rgba(255,255,255,0.7)', 'rgba(52,211,153,0.75)'];

export default function HeroFondo() {
  const ref = useRef<HTMLDivElement>(null);

  // Brillo que sigue al puntero (solo con puntero fino y sin reduced-motion).
  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!el || !hero) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      hero.removeEventListener('pointermove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-fondo" aria-hidden="true">
      <div className="hero-fondo__grilla" />
      <div className="hero-fondo__brillo" />
      <div className="hero-fondo__blob hero-fondo__blob--a" />
      <div className="hero-fondo__blob hero-fondo__blob--b" />
      <div className="hero-fondo__particulas">
        {PARTICULAS.map((p, i) => (
          <i
            key={i}
            className={p.pill ? 'is-pill' : undefined}
            style={{
              left: `${p.left}%`,
              width: p.pill ? p.size * 3 : p.size,
              height: p.pill ? Math.max(5, Math.round(p.size * 0.55)) : p.size,
              background: TONOS[p.tono],
              animationDuration: `${p.dur}s`,
              animationDelay: `-${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="hero-fondo__velo" />
    </div>
  );
}
