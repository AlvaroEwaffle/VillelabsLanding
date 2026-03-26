import type { CriticalError } from '@/lib/proposals/types';

interface ErrorItemProps {
  error: CriticalError;
}

export default function ErrorItem({ error }: ErrorItemProps) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-3 p-3.5 border border-red-400/20 bg-red-400/[0.05] rounded">
      <div className="text-base leading-snug">🚫</div>
      <div>
        <div className="text-[13.5px] font-semibold text-red-400 mb-[3px]">{error.title}</div>
        <div className="text-[13px] text-red-300/60 leading-snug">{error.description}</div>
      </div>
    </div>
  );
}
