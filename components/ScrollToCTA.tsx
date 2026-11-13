'use client';

/**
 * ScrollToCTA - Botón que hace scroll suave a la sección "Hablemos"
 * 
 * Usa Lenis para hacer scroll suave si está disponible,
 * o scroll nativo si no lo está.
 */

import { getLenis } from '@/lib/lenis';

interface ScrollToCTAProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ScrollToCTA({ className = '', children }: ScrollToCTAProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ctaSection = document.getElementById('cta-section');
    
    if (ctaSection) {
      const lenis = getLenis();
      
      if (lenis) {
        // Usar Lenis para scroll suave
        lenis.scrollTo(ctaSection, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback a scroll nativo
        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block bg-rosa hover:bg-[#ff5c9f] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-rosa text-base sm:text-lg md:text-xl px-6 py-3 md:px-8 md:py-4 ${className}`}
    >
      {children || 'Hablemos'}
    </button>
  );
}
