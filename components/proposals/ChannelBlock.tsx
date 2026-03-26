import type { ChannelStrategy } from '@/lib/proposals/types';

interface ChannelBlockProps {
  channel: ChannelStrategy;
}

const priorityMap = {
  high: 'border-red-400/50 bg-red-400/10 text-red-400',
  medium: 'border-amber-400/50 bg-amber-400/10 text-amber-400',
  long: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-400',
};

const typeColorMap: Record<string, string> = {
  red: 'text-red-400',
  amber: 'text-amber-400',
  teal: 'text-emerald-400',
};

export default function ChannelBlock({ channel }: ChannelBlockProps) {
  return (
    <div className="border border-white/[0.08] rounded overflow-hidden my-7">
      <div className="px-[22px] py-4 flex items-center justify-between" style={{ background: channel.headerColor }}>
        <div>
          <h3 className="font-serif text-lg font-normal text-white">{channel.name}</h3>
          <div className="text-[11px] text-white/70 mt-0.5">{channel.subtitle}</div>
        </div>
      </div>
      <div className="p-[22px]">
        {channel.profiles && (
          <>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2.5 mt-0">Perfiles a optimizar</h4>
            <div className="flex flex-col gap-1.5 mb-3.5">
              {channel.profiles.map((p, i) => (
                <div key={i} className="grid grid-cols-[100px_1fr] gap-3.5 p-3 bg-white/[0.03] border border-white/[0.08] rounded items-start">
                  <div className={`text-[11px] font-bold tracking-wider uppercase ${typeColorMap[p.typeColor || ''] || 'text-emerald-400'}`}>{p.type}</div>
                  <div className="text-[13px] text-white/60 leading-snug" dangerouslySetInnerHTML={{ __html: p.description }} />
                </div>
              ))}
            </div>
          </>
        )}

        {channel.pillars && (
          <>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2.5">6 pilares de contenido · 3 posts semanales</h4>
            <div className="flex flex-col gap-0.5 mb-3.5">
              {channel.pillars.map((p) => (
                <div key={p.num} className="grid grid-cols-[22px_1fr_1fr] max-sm:grid-cols-[22px_1fr] gap-3 items-start bg-white/[0.03] p-3 border border-white/[0.08] rounded text-[13px]">
                  <span className="font-serif text-[15px] text-white/40">{p.num}</span>
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-white/40 max-sm:hidden">{p.objective}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {channel.audiences && (
          <>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2.5">5 audiencias</h4>
            <div className="flex flex-col gap-1.5 mb-3.5">
              {channel.audiences.map((a, i) => (
                <div key={i} className="grid grid-cols-[100px_1fr] gap-3.5 p-3 bg-white/[0.03] border border-white/[0.08] rounded items-start">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">{a.type}</div>
                  <div className="text-[13px] text-white/60 leading-snug">{a.description}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {channel.keywords && (
          <>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2.5">Keywords prioritarias</h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {channel.keywords.map((kw, i) => (
                <span key={i} className={`text-xs py-1 px-2.5 rounded-full border ${priorityMap[kw.priority]}`}>
                  {kw.text}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-2 flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />Alta prioridad</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />Media</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />Long-tail</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
