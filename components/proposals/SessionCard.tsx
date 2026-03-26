import type { ConsultingSession } from '@/lib/proposals/types';

interface SessionCardProps {
  session: ConsultingSession;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] max-sm:grid-cols-1 border border-violet-400/30 rounded overflow-hidden bg-violet-500/[0.06]">
      <div className="bg-violet-600 p-3.5 flex flex-col items-start justify-center gap-0.5">
        <span className="text-[10px] tracking-wider uppercase text-white/70 font-semibold">{session.type}</span>
        <span className="font-serif text-[22px] text-white">{session.hours}</span>
        <span className="text-[13px] font-semibold text-white/90">{session.price}</span>
      </div>
      <div className="p-3.5">
        <strong className="text-[13px] font-semibold text-violet-300 block mb-[3px]">{session.title}</strong>
        <p className="text-[12.5px] text-violet-300/70 leading-snug">{session.description}</p>
      </div>
    </div>
  );
}
