'use client';

import { motion } from 'framer-motion';
import type { Phase } from '@/lib/proposals/types';

interface MilestoneTrackerProps {
  phases: Phase[];
  completedTasks: Record<string, boolean>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const milestoneVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function MilestoneTracker({ phases, completedTasks }: MilestoneTrackerProps) {
  const phasesWithMilestones = phases.filter((p) => p.milestones && p.milestones.length > 0);
  if (phasesWithMilestones.length === 0) return null;

  return (
    <motion.section
      id="milestone-tracker"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <motion.span variants={itemVariants} className="text-[11px] font-medium tracking-wider uppercase text-white/40 mb-4 block">
          Hitos Clave
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-serif text-[clamp(24px,4vw,34px)] font-light tracking-tight text-accent leading-tight mb-10 whitespace-pre-line">
          {'Los entregables que\nmarcan cada fase.'}
        </motion.h2>

        <div className="flex flex-col gap-8">
          {phasesWithMilestones.map((phase) => {
            const milestones = phase.milestones!;
            const doneCount = milestones.filter((m) =>
              m.relatedTasks.every((tid) => !!completedTasks[tid])
            ).length;

            return (
              <motion.div
                key={phase.id}
                variants={itemVariants}
                className="rounded border border-white/[0.08] bg-white/[0.02] overflow-hidden"
              >
                {/* Phase header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08]" style={{ borderLeftWidth: 3, borderLeftColor: phase.color }}>
                  <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: phase.color }}>
                    {phase.title}
                  </span>
                  <span className="text-[11px] text-white/40">
                    {doneCount}/{milestones.length} hitos
                  </span>
                </div>

                {/* Milestones list */}
                <motion.div
                  className="px-5 py-4 flex flex-col gap-0"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {milestones.map((milestone, idx) => {
                    const isDone = milestone.relatedTasks.every((tid) => !!completedTasks[tid]);
                    const isLast = idx === milestones.length - 1;

                    return (
                      <motion.div key={idx} variants={milestoneVariants} className="flex gap-4">
                        {/* Timeline column */}
                        <div className="flex flex-col items-center pt-[2px]">
                          <div
                            className="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                            style={{
                              borderColor: isDone ? phase.color : 'rgba(255,255,255,0.15)',
                              backgroundColor: isDone ? phase.color : 'transparent',
                            }}
                          >
                            {isDone && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2.5 5L4.5 7L7.5 3.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {!isLast && (
                            <div
                              className="w-[1px] flex-1 min-h-[24px] transition-colors duration-300"
                              style={{ backgroundColor: isDone ? phase.color : 'rgba(255,255,255,0.08)' }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`pb-5 ${isLast ? 'pb-1' : ''}`}>
                          <p className={`text-sm font-medium leading-tight transition-colors duration-300 ${isDone ? 'text-white/90' : 'text-white/60'}`}>
                            {milestone.title}
                          </p>
                          <p className="text-xs text-white/35 mt-1 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
