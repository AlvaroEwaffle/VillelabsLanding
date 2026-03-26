'use client';

import { motion } from 'framer-motion';
import type { ResumenSection as ResumenData } from '@/lib/proposals/types';
import KpiCard from './KpiCard';

interface ResumenSectionProps {
  data: ResumenData;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const colorMap: Record<string, string> = {
  violet: 'text-violet-400',
  teal: 'text-emerald-400',
};

export default function ResumenSection({ data }: ResumenSectionProps) {
  return (
    <motion.section
      id="resumen"
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

        {/* Totals bar */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 max-sm:grid-cols-1 gap-[2px] bg-white/[0.08] border border-white/[0.08] rounded overflow-hidden my-7">
          {data.totals.map((total, i) => (
            <div key={i} className="bg-main p-5">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-white/40 mb-2">{total.label}</div>
              <div className={`font-serif text-[26px] leading-none mb-1 ${total.color ? colorMap[total.color] || 'text-accent' : 'text-accent'}`}>
                {total.value}
              </div>
              <div className="text-xs text-white/40">{total.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Summary grid */}
        <motion.div variants={itemVariants} className="flex flex-col gap-[2px] border border-white/[0.08] rounded overflow-hidden bg-white/[0.08] my-6">
          {/* Header */}
          <div className="grid grid-cols-[72px_80px_1fr_110px_96px_100px] max-sm:grid-cols-[1fr_1fr] gap-[1px] bg-white/[0.08]">
            {['Fase', 'Período', 'Foco principal', 'Total CLP', 'Consultoría', 'Leads/mes'].map((h, i) => (
              <div key={i} className={`bg-accent/80 px-3.5 py-3 text-[10px] font-semibold tracking-wider uppercase text-white/80 ${i >= 2 ? 'max-sm:hidden' : ''}`}>
                {h}
              </div>
            ))}
          </div>
          {/* Rows */}
          {data.summaryRows.map((row, i) => (
            <div key={i} className="grid grid-cols-[72px_80px_1fr_110px_96px_100px] max-sm:grid-cols-[1fr_1fr] gap-[1px] bg-white/[0.08]">
              <div className="bg-main px-3.5 py-3">
                <span className="inline-block py-[3px] px-2 rounded text-[11px] font-bold tracking-wider uppercase text-white" style={{ background: row.phaseColor }}>
                  {row.phase}
                </span>
              </div>
              <div className="bg-main px-3.5 py-3 text-[12.5px] text-foreground">{row.period}</div>
              <div className="bg-main px-3.5 py-3 text-[12.5px] text-foreground max-sm:hidden">{row.focus}</div>
              <div className="bg-main px-3.5 py-3 text-[12.5px] text-foreground font-semibold max-sm:hidden">{row.totalCLP}</div>
              <div className="bg-main px-3.5 py-3 max-sm:hidden">
                <span className="bg-violet-600 text-white text-[11px] font-bold py-[3px] px-2 rounded">{row.consulting}</span>
              </div>
              <div className="bg-main px-3.5 py-3 max-sm:hidden">
                {row.leads.includes('–') ? (
                  <span className="font-serif text-[15px] text-emerald-400">{row.leads}</span>
                ) : (
                  <span className="text-[12px] text-white/40">{row.leads}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* KPIs */}
        <motion.h3 variants={itemVariants} className="font-serif text-xl font-normal text-foreground mt-9 mb-3.5">
          KPIs de seguimiento mensual
        </motion.h3>
        <motion.div variants={itemVariants} className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5 my-4">
          {data.kpis.map((kpi, i) => (
            <KpiCard key={i} kpi={kpi} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
