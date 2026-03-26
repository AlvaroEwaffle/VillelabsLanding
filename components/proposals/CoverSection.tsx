'use client';

import { motion } from 'framer-motion';
import type { Proposal } from '@/lib/proposals/types';

interface CoverSectionProps {
  data: Proposal;
  statusLabel: string;
  statusColor: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function CoverSection({ data, statusLabel, statusColor }: CoverSectionProps) {
  return (
    <section id="cover" className="pt-[120px] pb-20 border-b border-white/[0.08]">
      <motion.div
        className="max-w-[760px] mx-auto px-7"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="text-[11px] font-medium tracking-[0.12em] uppercase text-emerald-400 mb-7 flex items-center gap-2.5"
        >
          {data.coverLabel}
          <span className="flex-1 max-w-[40px] h-px bg-emerald-400" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-[clamp(36px,6vw,58px)] font-light leading-[1.1] tracking-tight text-accent mb-3"
        >
          {data.projectTitle}<br /><em className="italic font-light">{data.subtitle}</em>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[17px] text-white/60 font-light mb-12 max-w-[520px] leading-relaxed"
        >
          LinkedIn + Meta Ads + Sesión de Contenido + Consultoría de Implementación. Tres fases, seis meses, un objetivo: construir el canal digital que el Dr. Daniel Reyes merece.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-8 flex-wrap">
          {data.meta.map((m, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-[10px] tracking-wider uppercase text-white/40 font-medium">{m.label}</span>
              {m.label === 'Estado' ? (
                <span className="text-sm font-medium" style={{ color: statusColor }}>{statusLabel}</span>
              ) : (
                <span className="text-sm text-foreground font-medium">{m.value}</span>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
