'use client';

import { motion } from 'framer-motion';
import type { Phase } from '@/lib/proposals/types';
import SessionCard from './SessionCard';
import TaskRow from './TaskRow';
import BudgetTable from './BudgetTable';
import ProgressBar from './ProgressBar';

interface PlanTrabajoSectionProps {
  phases: Phase[];
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  phaseProgress: (phaseId: number, totalTasks: number) => { done: number; pct: number };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function PlanTrabajoSection({ phases, completedTasks, onToggleTask, phaseProgress }: PlanTrabajoSectionProps) {
  return (
    <motion.section
      id="fases"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <motion.span variants={itemVariants} className="text-[11px] font-medium tracking-wider uppercase text-white/40 mb-4 block">
          04 — Plan de Trabajo
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-serif text-[clamp(24px,4vw,34px)] font-light tracking-tight text-accent leading-tight mb-6 whitespace-pre-line">
          {'Tres fases.\nCada tarea tiene un dueño.'}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 mb-3.5 leading-relaxed">
          Haz clic en el círculo de cada tarea para marcarla como completada. El progreso se guarda automáticamente.
        </motion.p>

        {/* Consulting callout */}
        <motion.div variants={itemVariants} className="border-l-[3px] border-violet-400 bg-violet-500/[0.08] p-[18px_22px] my-6 rounded-r">
          <div className="text-xs font-semibold tracking-wider uppercase text-violet-400 mb-2">
            Sesiones de consultoría · $48.000 CLP/hora · Taller $120.000 CLP
          </div>
          <p className="text-[13.5px] text-violet-300/70 mb-0 leading-relaxed">
            Las filas en morado son sesiones de trabajo con el consultor. Su función es diseñar, alinear, retroalimentar y ajustar el plan en tiempo real. Sin estas instancias, el programa pierde ritmo y coherencia estratégica.
          </p>
        </motion.div>

        {phases.map((phase) => {
          const { pct } = phaseProgress(phase.id, phase.tasks.length);
          return (
            <motion.div key={phase.id} variants={itemVariants} id={phase.anchorId} className="mb-[60px]">
              {/* Phase banner */}
              <div className="p-[22px_24px] rounded mb-7 flex items-start gap-4" style={{ background: phase.color }}>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-normal text-white leading-tight mb-1">{phase.title}</h3>
                  <p className="text-[13px] text-white/75 leading-snug">{phase.subtitle}</p>
                </div>
                <div className="text-right min-w-[64px]">
                  <div className="font-serif text-[28px] text-white leading-none">{pct}%</div>
                  <div className="text-[10px] text-white/60 tracking-wider uppercase">completado</div>
                </div>
              </div>

              {/* Sessions */}
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2.5">
                Sesiones de consultoría incluidas
              </h4>
              <div className="flex flex-col gap-2 my-4">
                {phase.sessions.map((session, i) => (
                  <SessionCard key={i} session={session} />
                ))}
              </div>

              {/* Tasks */}
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mt-7 mb-2.5">
                Tareas operacionales
              </h4>
              <div className="my-4">
                {phase.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isDone={!!completedTasks[task.id]}
                    onToggle={() => onToggleTask(task.id)}
                  />
                ))}
              </div>

              {/* Budget */}
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mt-7 mb-2.5">
                Presupuesto {phase.title.split(' · ')[0]} · en CLP
              </h4>
              <BudgetTable budget={phase.budget} />

              {/* Phase progress bar */}
              <div className="mt-6">
                <ProgressBar pct={pct} color={phase.color} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
