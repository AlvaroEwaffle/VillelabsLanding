'use client';

import { motion } from 'framer-motion';
import type { Phase } from '@/lib/proposals/types';
import ProgressBar from './ProgressBar';

interface ProgressOverviewProps {
  phases: Phase[];
  phaseProgress: (phaseId: number, totalTasks: number) => { done: number; pct: number };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ProgressOverview({ phases, phaseProgress }: ProgressOverviewProps) {
  return (
    <section id="progress-overview" className="py-10 border-b border-white/[0.08]">
      <div className="max-w-[760px] mx-auto px-7">
        <motion.div
          className="grid grid-cols-3 max-sm:grid-cols-1 gap-[2px] bg-white/[0.08] border border-white/[0.08] rounded overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {phases.map((phase) => {
            const { done, pct } = phaseProgress(phase.id, phase.tasks.length);
            return (
              <motion.div key={phase.id} variants={itemVariants} className="bg-main p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: phase.color }}>
                    {phase.title}
                  </span>
                  <span className="font-serif text-[22px]" style={{ color: phase.color }}>{pct}%</span>
                </div>
                <ProgressBar pct={pct} color={phase.color} />
                <div className="text-xs text-white/40">{done} de {phase.tasks.length} tareas completadas</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
