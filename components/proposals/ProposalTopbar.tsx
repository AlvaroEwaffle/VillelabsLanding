'use client';

import { useEffect, useState } from 'react';
import type { Phase } from '@/lib/proposals/types';

interface ProposalTopbarProps {
  label: string;
  phases: Phase[];
}

export default function ProposalTopbar({ label, phases }: ProposalTopbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] bg-main/92 backdrop-blur-xl border-b border-white/[0.08] px-7 flex items-center justify-between h-[52px] transition-shadow duration-200
        ${scrolled ? 'shadow-[0_1px_16px_rgba(0,0,0,0.3)]' : ''}`}
    >
      <span className="text-xs font-medium text-white/40 tracking-wider uppercase">{label}</span>
      <div className="flex gap-1.5 max-sm:hidden">
        {phases.map((phase) => (
          <a
            key={phase.id}
            href={`#${phase.anchorId}`}
            className="inline-flex items-center gap-[5px] text-[11px] font-medium text-white/40 py-[3px] px-2.5 rounded-full border border-white/[0.08] hover:border-white/20 hover:text-white/60 transition-all no-underline"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: phase.color }} />
            {phase.title.split(' · ')[0]}
          </a>
        ))}
      </div>
    </nav>
  );
}
