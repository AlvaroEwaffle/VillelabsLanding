'use client';
// Número que cuenta hasta su valor al entrar en pantalla (13-nov-2026). Patrón del landing de Fidelidapp (useCountUp:
// easeOutCubic), pero visible sin JS: el HTML trae el valor final. El ancho se reserva con min-width en ch,
// así el conteo no mueve el layout (sin CLS). Con reduced-motion o ya a la vista al cargar, no cuenta: muestra el final.
import { useEffect, useRef, useState } from 'react';

export default function Contador({ valor, prefijo = '', sufijo = '', ms = 900, formato = (n: number) => n.toLocaleString('es-CL'), className = '' }: {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  ms?: number;
  formato?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null); // null = mostrar el valor final (SSR y sin animación)
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;
    let raf = 0;
    // arranca en 0 solo si el número está bajo el pantallazo
    setN(0);
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const paso = (t: number) => {
          const k = Math.min(1, (t - t0) / ms);
          setN(Math.round(valor * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(paso);
          else setN(null);
        };
        raf = requestAnimationFrame(paso);
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor, ms]);
  const final = `${prefijo}${formato(valor)}${sufijo}`;
  return (
    // Ancho reservado en «ch» (cifras tabulares) para que el conteo no mueva el layout, sin duplicar el texto en el HTML.
    <span ref={ref} className={`inline-block tabular-nums ${className}`} style={{ minWidth: `${final.length + 0.5}ch` }}>
      {n === null ? final : `${prefijo}${formato(n)}${sufijo}`}
    </span>
  );
}
