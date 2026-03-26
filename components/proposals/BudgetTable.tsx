import type { BudgetSection } from '@/lib/proposals/types';

interface BudgetTableProps {
  budget: BudgetSection;
}

export default function BudgetTable({ budget }: BudgetTableProps) {
  return (
    <div className="my-4">
      {budget.items.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_130px] gap-3 items-center py-2.5 border-b border-white/[0.08]">
          <div className={`text-[13px] ${item.isHighlight ? 'text-red-400 font-semibold' : 'text-foreground'}`}>
            {item.label}
            {item.sublabel && <small className="block text-[11px] text-white/40 mt-0.5">{item.sublabel}</small>}
          </div>
          <div className={`font-serif text-base text-right ${item.isHighlight ? 'font-semibold' : 'text-foreground'}`}>
            {item.amount}
          </div>
        </div>
      ))}

      <hr className="border-0 border-t border-dashed border-white/[0.12] my-1.5" />

      {budget.consultingItems.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_130px] gap-3 items-center py-2.5 bg-violet-500/[0.08] -mx-2 px-2 rounded">
          <div className="text-[13px] text-violet-300 font-medium">
            {item.label}
            {item.sublabel && <small className="block text-[11px] text-violet-300/60 mt-0.5">{item.sublabel}</small>}
          </div>
          <div className="font-serif text-base text-right text-violet-300 font-semibold">{item.amount}</div>
        </div>
      ))}

      <hr className="border-0 border-t border-dashed border-white/[0.12] my-1.5" />

      <div className="grid grid-cols-[1fr_130px] gap-3 items-center pt-3.5">
        <div className="text-sm font-semibold text-accent">{budget.totalLabel}</div>
        <div className="font-serif text-xl text-right font-semibold text-accent">{budget.total}</div>
      </div>
    </div>
  );
}
