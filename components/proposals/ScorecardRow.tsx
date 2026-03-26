import type { ScorecardDimension } from '@/lib/proposals/types';

interface ScorecardRowProps {
  row: ScorecardDimension;
}

const colorMap = {
  red: 'bg-red-400/20 text-red-400',
  amber: 'bg-amber-400/20 text-amber-400',
  green: 'bg-emerald-400/20 text-emerald-400',
};

export default function ScorecardRow({ row }: ScorecardRowProps) {
  return (
    <div className="grid grid-cols-[1fr_56px_1fr] gap-3 items-start py-3.5 border-b border-white/[0.08] last:border-b-0">
      <div className="text-[13.5px] font-medium text-foreground">{row.dimension}</div>
      <div className={`font-serif text-base text-center py-0.5 rounded ${colorMap[row.color]}`}>
        {row.score}
      </div>
      <div className="text-[13px] text-white/40 leading-snug">{row.note}</div>
    </div>
  );
}
