'use client';

import { useState, useCallback } from 'react';
import type { Proposal } from '@/lib/proposals/types';
import { useProposalProgress } from '@/lib/proposals/useProposalProgress';
import ProposalTopbar from './ProposalTopbar';
import CoverSection from './CoverSection';
import ProgressOverview from './ProgressOverview';
import MilestoneTracker from './MilestoneTracker';
import DiagnosticoSection from './DiagnosticoSection';
import CanalesSection from './CanalesSection';
import ContenidoSection from './ContenidoSection';
import PlanTrabajoSection from './PlanTrabajoSection';
import ResumenSection from './ResumenSection';
import ErroresSection from './ErroresSection';
import ProposalFooter from './ProposalFooter';
import ProposalToast from './ProposalToast';

interface ProposalPageProps {
  data: Proposal;
}

export default function ProposalPage({ data }: ProposalPageProps) {
  const { completedTasks, toggleTask, phaseProgress, totalProgress } = useProposalProgress(data.slug);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  const phaseTotals: Record<number, number> = {};
  for (const phase of data.phases) {
    phaseTotals[phase.id] = phase.tasks.length;
  }

  const { pct: totalPct } = totalProgress(phaseTotals);

  const handleToggle = useCallback(
    (taskId: string) => {
      const wasDone = !!completedTasks[taskId];
      toggleTask(taskId);
      setToastMsg(wasDone ? '○ Tarea pendiente' : '✓ Tarea completada');
      setToastKey((k) => k + 1);
    },
    [completedTasks, toggleTask]
  );

  // Status label
  let statusLabel = '— Sin iniciar';
  let statusColor = 'rgba(255,255,255,0.4)';
  if (totalPct > 0 && totalPct < 30) {
    statusLabel = `● En progreso · ${totalPct}%`;
    statusColor = '#34d399';
  } else if (totalPct >= 30 && totalPct < 70) {
    statusLabel = `● Avanzando · ${totalPct}%`;
    statusColor = '#34d399';
  } else if (totalPct >= 70 && totalPct < 100) {
    statusLabel = `● Casi listo · ${totalPct}%`;
    statusColor = '#34d399';
  } else if (totalPct === 100) {
    statusLabel = '✓ Completado · 100%';
    statusColor = '#34d399';
  }

  return (
    <>
      <ProposalTopbar label="PCC · Plan Marketing 2026" phases={data.phases} />
      <CoverSection data={data} statusLabel={statusLabel} statusColor={statusColor} />
      <ProgressOverview phases={data.phases} phaseProgress={phaseProgress} />
      <MilestoneTracker phases={data.phases} completedTasks={completedTasks} />
      <DiagnosticoSection data={data.diagnostico} />
      <CanalesSection data={data.canales} />
      <ContenidoSection data={data.contenido} />
      <PlanTrabajoSection
        phases={data.phases}
        completedTasks={completedTasks}
        onToggleTask={handleToggle}
        phaseProgress={phaseProgress}
      />
      <ResumenSection data={data.resumen} />
      <ErroresSection errores={data.errores} />
      <ProposalFooter quote={data.footerQuote} meta={data.footerMeta} />
      <ProposalToast key={toastKey} message={toastMsg} />
    </>
  );
}
