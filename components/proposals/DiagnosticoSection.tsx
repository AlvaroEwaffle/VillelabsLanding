'use client';

import { motion } from 'framer-motion';
import type { DiagnosticoSection as DiagnosticoData } from '@/lib/proposals/types';
import ScorecardRow from './ScorecardRow';

interface DiagnosticoSectionProps {
  data: DiagnosticoData;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function DiagnosticoSection({ data }: DiagnosticoSectionProps) {
  return (
    <motion.section
      id="diagnostico"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <motion.span variants={itemVariants} className="text-[11px] font-medium tracking-wider uppercase text-white/40 mb-4 block">
          {data.sectionNumber}
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-serif text-[clamp(24px,4vw,34px)] font-light tracking-tight text-accent leading-tight mb-6 whitespace-pre-line">
          {data.title}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 mb-3.5 leading-relaxed">
          {data.intro}
        </motion.p>

        {/* Callout */}
        <motion.div variants={itemVariants} className="border-l-[3px] border-amber-400 bg-white/[0.03] p-[18px_22px] my-6 rounded-r">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">{data.callout.title}</div>
          <p className="text-[13.5px] text-white/60 mb-0 leading-relaxed">{data.callout.text}</p>
        </motion.div>

        {/* Scorecard */}
        <motion.h3 variants={itemVariants} className="font-serif text-xl font-normal text-foreground mt-9 mb-3.5">
          Scorecard de 8 dimensiones
        </motion.h3>
        <motion.div variants={itemVariants} className="my-6">
          {data.scorecard.map((row, i) => (
            <ScorecardRow key={i} row={row} />
          ))}
        </motion.div>

        {/* Assets */}
        <motion.h3 variants={itemVariants} className="font-serif text-xl font-normal text-foreground mt-9 mb-3.5">
          Activos sin explotar
        </motion.h3>
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5 my-3.5">
          {data.assets.map((asset, i) => (
            <div key={i} className="grid grid-cols-[100px_1fr] gap-3.5 p-3 bg-white/[0.03] border border-white/[0.08] rounded items-start">
              <div className={`text-[11px] font-bold tracking-wider uppercase ${asset.typeColor === 'teal' ? 'text-emerald-400' : 'text-emerald-400'}`}>{asset.type}</div>
              <div className="text-[13px] text-white/60 leading-snug" dangerouslySetInnerHTML={{ __html: asset.description }} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
