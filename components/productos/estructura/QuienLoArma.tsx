/*
 * «Quién lo arma» (EXP-08/09 · C2, 11-nov-2026). Álvaro pidió no usar sus fotos actuales («demasiado IA») y mandará
 * fotos reales. Mientras tanto va un círculo con iniciales.
 *
 * ▶ SLOT FOTO REAL: cuando lleguen las fotos, dejarlas en public/fotos/reales/ y poner la ruta en FOTO_REAL_ALVARO.
 */

export const FOTO_REAL_ALVARO: string | null = null; // p. ej. '/fotos/reales/alvaro-01.jpg'

export default function QuienLoArma({ texto, className = '' }: { texto: string; className?: string }) {
  return (
    <div className={`flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      {FOTO_REAL_ALVARO ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={FOTO_REAL_ALVARO} alt="Álvaro Villena" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#2175a1] font-serif text-xl text-white">
          AV
        </span>
      )}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Quién lo arma</p>
        <p className="mt-1 font-serif text-xl text-white">Álvaro Villena</p>
        <p className="mt-2 text-sm text-slate-300">{texto}</p>
      </div>
    </div>
  );
}
