'use client';

/**
 * ESCENA 1 — Hero (above the fold)
 *
 * H1 claro, subtítulo, CTA + prueba social. Las 3 ofertas están en la sección de abajo.
 * Fondo: puntos/figuras que se mueven suavemente.
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Layout, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { getLenis } from '@/lib/lenis';

export default function Scene1Hero() {
  const [animationPhase, setAnimationPhase] = useState<'title' | 'subtitle' | 'cta'>('title');
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 320], [1, 0]);
  const scale = useTransform(scrollY, [0, 320], [1, 0.96]);

  const scrollToNext = () => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById('cta-section');
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  };

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationPhase('subtitle'), 700);
    const t2 = setTimeout(() => setAnimationPhase('cta'), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.section
      className="min-h-screen snap-start flex items-center justify-center relative px-4 md:px-6 overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <BrandLogo size="sm" className="opacity-60 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10 w-full py-12 md:py-16 flex flex-col items-center">
        {/* 1. Qué haces */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white text-center mb-8 md:mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: animationPhase !== 'title' ? 1 : 0,
            y: animationPhase !== 'title' ? 0 : 16,
          }}
          transition={{ duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99] as const }}
        >
          Landings, webs estratégicas y plataformas que <span className="text-accent font-medium">convierten</span>.
        </motion.h1>

        {/* 2. Qué problema resuelves */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-light text-white/90 text-center max-w-2xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: animationPhase === 'subtitle' || animationPhase === 'cta' ? 1 : 0,
            y: animationPhase === 'subtitle' || animationPhase === 'cta' ? 0 : 12,
          }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }}
        >
          He trabajado con +50 empresas, founders, marcas premium y negocios que quieren dejar de parecer uno más del montón.

        </motion.p>


        {/* CTA + prueba social */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: animationPhase === 'cta' ? 1 : 0,
            y: animationPhase === 'cta' ? 0 : 12,
          }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }}
        >
          <button
            type="button"
            onClick={scrollToNext}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-rosa hover:bg-[#ff5c9f] text-white font-semibold text-sm md:text-base border border-rosa/30 hover:shadow-rosa transition-all duration-300"
          >
            Sigue para ver las tres formas de crecer
          </button>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white font-medium text-sm md:text-base hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
          >
            Quiero agendar una llamada
          </button>
            
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm md:text-base text-white/50 font-light mt-8">
            <span className="flex items-center gap-1.5">
              <Layout className="w-4 h-4 md:w-5 md:h-5 text-accent/70 flex-shrink-0" />
              <span>Landing Pages</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-accent/70 flex-shrink-0" />
              <span>Webs Estratégicas</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 md:w-5 md:h-5 text-accent/70 flex-shrink-0" />
              <span>Plataformas</span>
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 md:w-9 md:h-9 text-white/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
