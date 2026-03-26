'use client';

import type { ProposalTask } from '@/lib/proposals/types';

interface TaskRowProps {
  task: ProposalTask;
  isDone: boolean;
  onToggle: () => void;
}

export default function TaskRow({ task, isDone, onToggle }: TaskRowProps) {
  const isConsulting = task.isConsulting;

  return (
    <div
      className={`grid gap-2.5 items-start py-[11px] border-b border-white/[0.08] transition-colors
        ${isConsulting ? 'bg-violet-500/[0.08] -mx-1.5 px-1.5 rounded' : ''}
        ${isDone ? '' : ''}
        grid-cols-[28px_1fr_90px_56px] max-sm:grid-cols-[28px_1fr]`}
    >
      {/* Check circle */}
      <button
        onClick={onToggle}
        className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 mt-[1px] transition-all cursor-pointer
          ${isDone
            ? isConsulting
              ? 'bg-violet-500 border-violet-500'
              : 'bg-emerald-500 border-emerald-500'
            : isConsulting
              ? 'border-violet-400/50 hover:border-violet-400 bg-transparent'
              : 'border-white/[0.15] hover:border-emerald-400 bg-transparent'
          }`}
        aria-label={isDone ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        {isDone && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-white">
            <path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="min-w-0">
        <div className={`text-[13.5px] font-medium leading-snug transition-colors ${isDone ? 'text-white/40 line-through' : isConsulting ? 'text-violet-300' : 'text-foreground'}`}>
          {task.title}
        </div>
        <div className="text-xs text-white/40 mt-0.5 leading-snug">{task.description}</div>
      </div>

      {/* Responsible */}
      <div className={`text-[10.5px] font-medium whitespace-nowrap h-fit mt-0.5 px-[7px] py-[2px] rounded-full border max-sm:hidden
        ${isConsulting
          ? 'bg-violet-500/20 border-violet-400/30 text-violet-300'
          : 'bg-white/[0.03] border-white/[0.08] text-white/40'
        }`}>
        {task.responsible}
      </div>

      {/* Week */}
      <div className={`text-[11px] font-serif text-right mt-0.5 max-sm:hidden ${isConsulting ? 'text-violet-300' : 'text-white/40'}`}>
        {task.week}
      </div>
    </div>
  );
}
