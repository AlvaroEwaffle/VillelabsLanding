'use client';

import { motion } from 'framer-motion';
import type { ContenidoSection as ContenidoData } from '@/lib/proposals/types';
import ScriptBox from './ScriptBox';

interface ContenidoSectionProps {
  data: ContenidoData;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ContenidoSection({ data }: ContenidoSectionProps) {
  return (
    <motion.section
      id="sesion"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
        <motion.div variants={itemVariants} className="border-l-[3px] border-emerald-400 bg-white/[0.03] p-[18px_22px] my-6 rounded-r">
          <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">{data.callout.title}</div>
          <p className="text-[13.5px] text-white/60 mb-0 leading-relaxed">{data.callout.text}</p>
        </motion.div>

        {/* Scripts */}
        <motion.h3 variants={itemVariants} className="font-serif text-xl font-normal text-foreground mt-9 mb-3.5">
          5 guiones de video
        </motion.h3>
        {data.scripts.map((script, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ScriptBox script={script} />
          </motion.div>
        ))}

        {/* Assets */}
        <motion.h3 variants={itemVariants} className="font-serif text-xl font-normal text-foreground mt-9 mb-3.5">
          Banco de contenido a producir
        </motion.h3>
        <motion.div variants={itemVariants} className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 my-3.5">
          {data.assets.map((asset, i) => (
            <div
              key={i}
              className={`border rounded p-3.5 ${asset.highlight ? 'border-emerald-400/30 bg-emerald-400/[0.05]' : 'bg-white/[0.03] border-white/[0.08]'}`}
            >
              <div className={`text-[11px] font-semibold tracking-wider uppercase mb-1.5 ${asset.highlight ? 'text-emerald-400' : 'text-white/40'}`}>
                {asset.type}
              </div>
              <div className={`font-serif text-[22px] mb-0.5 ${asset.highlight ? 'text-emerald-400' : 'text-accent'}`}>
                {asset.quantity}
              </div>
              <div className="text-xs text-white/40 leading-snug">{asset.destination}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
