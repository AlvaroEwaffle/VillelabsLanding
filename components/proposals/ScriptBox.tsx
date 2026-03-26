import type { VideoScript } from '@/lib/proposals/types';

interface ScriptBoxProps {
  script: VideoScript;
}

export default function ScriptBox({ script }: ScriptBoxProps) {
  return (
    <div
      className="bg-white/[0.03] border border-white/[0.08] rounded p-5 my-3.5"
      style={{ borderTopWidth: '3px', borderTopColor: script.borderColor }}
    >
      <div className="text-[10px] font-semibold tracking-wider uppercase mb-2.5" style={{ color: script.labelColor }}>
        {script.label}
      </div>
      <blockquote className="font-serif text-[15px] text-foreground italic leading-relaxed whitespace-pre-line">
        {script.quote}
      </blockquote>
    </div>
  );
}
