import type { KpiMetric } from '@/lib/proposals/types';

interface KpiCardProps {
  kpi: KpiMetric;
}

export default function KpiCard({ kpi }: KpiCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded p-4">
      <div className="text-[11px] font-semibold tracking-wider uppercase text-white/40 mb-2.5">{kpi.name}</div>
      <div className="flex gap-5">
        {kpi.values.map((v, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="text-[10px] text-white/40">{v.period}</span>
            <span className={`font-serif text-xl ${v.isTarget ? 'text-emerald-400' : 'text-foreground'}`}>{v.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-white/40 mt-2 pt-2 border-t border-white/[0.08]">{kpi.tool}</div>
    </div>
  );
}
