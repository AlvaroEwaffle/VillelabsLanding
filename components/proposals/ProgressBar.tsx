'use client';

interface ProgressBarProps {
  pct: number;
  color: string;
}

export default function ProgressBar({ pct, color }: ProgressBarProps) {
  return (
    <div className="h-[3px] bg-white/[0.08] rounded-sm overflow-hidden">
      <div
        className="h-full rounded-sm transition-all duration-500 ease-out"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
