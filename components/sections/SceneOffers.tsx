'use client';

/**
 * Sección — Las 3 ofertas productizadas (debajo del Hero)
 * Cards: Entrada, Core, Premium. Mismo diseño que referencia.
 */

import { motion } from 'framer-motion';
import { Zap, Globe, Cpu } from 'lucide-react';
import SoftCTA from '@/components/SoftCTA';

const OFFERS = [
  {
    id: 'A',
    label: 'Entrada',
    title: 'Landing Page de Conversión',
    price: 'Investment varies by scope',
    problem: 'Tengo tráfico, pero no convierto.',
    deliverable: '8–10 secciones, copy estratégico, CTA medible. Precio cerrado.',
    icon: Zap,
  },
  {
    id: 'B',
    label: 'Core',
    title: 'Web Estratégica para Crecimiento',
    price: 'Custom proposal after diagnostic',
    problem: 'Necesito una web que venda y escale.',
    deliverable: 'Web + estructura de conversión + analítica básica. Marketing y ventas.',
    icon: Globe,
  },
  {
    id: 'C',
    label: 'Premium',
    title: 'Plataforma o App a medida',
    price: 'Scope defined after assessment',
    problem: 'Necesito algo que no es una web estándar.',
    deliverable: 'Se define tras diagnóstico. Vendemos proceso, no alcance cerrado.',
    icon: Cpu,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const },
  },
};

export default function SceneOffers() {
  return (
    <motion.section
      className="min-h-screen snap-start flex items-center justify-center relative px-4 md:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container max-w-6xl mx-auto relative z-10 w-full py-16 md:py-20">
        <motion.p
          className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-medium text-center mb-4 md:mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          No es solo una web. Es el sistema que la hace trabajar.
        </motion.p>
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Tres formas de crecer con tu web
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto">
          {OFFERS.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                variants={cardVariants}
                className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-5 md:p-6 text-left transition-all duration-300 hover:border-accent/35 hover:shadow-[0_0_30px_rgba(33,117,161,0.08)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/15 border border-accent/25">
                    <Icon className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                    {offer.label}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                  {offer.title}
                </h3>
                <p className="text-sm text-accent/90 font-medium mb-2">
                  {offer.price}
                </p>
                <p className="text-sm text-white/50 mb-2">
                  {offer.problem}
                </p>
                <p className="text-xs text-white/40 leading-snug">
                  {offer.deliverable}
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="flex justify-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SoftCTA scrollTo="portafolio">Ver el portafolio</SoftCTA>
        </motion.div>
      </div>
    </motion.section>
  );
}
