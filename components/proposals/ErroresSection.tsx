'use client';

import { motion } from 'framer-motion';
import type { CriticalError } from '@/lib/proposals/types';
import ErrorItem from './ErrorItem';

interface ErroresSectionProps {
  errores: CriticalError[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ErroresSection({ errores }: ErroresSectionProps) {
  return (
    <motion.section
      id="errores"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <motion.span variants={itemVariants} className="text-[11px] font-medium tracking-wider uppercase text-white/40 mb-4 block">
          06 — Errores a evitar
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-serif text-[clamp(24px,4vw,34px)] font-light tracking-tight text-accent leading-tight mb-6 whitespace-pre-line">
          {'Lo que puede arruinar\ncualquier presupuesto.'}
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col gap-2 my-4">
          {errores.map((error, i) => (
            <ErrorItem key={i} error={error} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
