'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PreguntaCuaderno } from '@/lib/productos/guia/contenido-v2';
import { useProgreso } from '@/lib/productos/guia/progreso-v2';
import VideoProducto, { type VideoId } from '@/components/productos/VideoProducto';

export const btnPrimario =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#FF3D8B] px-5 py-2.5 font-semibold text-white transition hover:bg-[#ff5c9f] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8B]/60';
export const btnSecundario =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 font-medium text-slate-100 transition hover:border-[#5fb2dd] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fb2dd]';

export function Bloque({ etiqueta, titulo, children }: { etiqueta: string; titulo?: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">{etiqueta}</p>
      {titulo && <h3 className="mt-2 font-serif text-2xl leading-tight text-white">{titulo}</h3>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Tarjeta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 ${className}`}>{children}</div>;
}

export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="relative mt-12 overflow-hidden rounded-3xl border border-[#5fb2dd]/50 bg-gradient-to-br from-[#2175a1]/40 via-[#13314a] to-[#0f172a] p-6 sm:p-8">
      <svg viewBox="0 0 120 120" className="absolute -right-6 -top-6 h-32 w-32 opacity-20" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="#5fb2dd" strokeWidth="4" />
        <path d="M60 22v16M60 82v16M22 60h16M82 60h16" stroke="#5fb2dd" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5fb2dd]">Insight</p>
      <p className="relative mt-3 font-serif text-2xl leading-snug text-white sm:text-3xl">{children}</p>
    </aside>
  );
}

export function Prompt({ texto, titulo = 'Si quieres ayuda para redactar' }: { texto: string; titulo?: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };
  return (
    <Bloque etiqueta={titulo}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1222] shadow-premium">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2175a1]/30" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[#5fb2dd]" strokeWidth="2">
              <rect x="5" y="7" width="14" height="11" rx="3" />
              <path d="M12 3v4M9 12h.01M15 12h.01" strokeLinecap="round" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Para Claude o ChatGPT</p>
            <p className="text-xs text-slate-400">Completa los [corchetes] · te devuelve un borrador · tú lo revisas</p>
          </div>
        </div>
        <div className="p-4">
          <div className="ml-auto max-w-[95%] rounded-2xl rounded-tr-sm bg-[#2175a1]/25 p-4">
            <pre className="whitespace-pre-wrap break-words font-sans text-[0.92rem] leading-relaxed text-slate-100">{texto}</pre>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3">
          <span className="text-xs text-slate-400">Guarda la respuesta en tu carpeta «Mi sistema de ventas».</span>
          <button type="button" onClick={copiar} className={`${btnPrimario} px-4 text-sm`} aria-live="polite">
            {copiado ? 'Copiado ✓' : 'Copiar instrucción'}
          </button>
        </div>
      </div>
    </Bloque>
  );
}

export function VideoPlaceholder({
  titulo,
  duracion,
  guion,
  etiquetaGuion = 'Ver el guion',
  poster,
  posterPos = '50% 30%',
  video,
}: {
  titulo: string;
  duracion: string;
  guion: string;
  etiquetaGuion?: string;
  poster?: FotoDef;
  posterPos?: string;
  /** Si viene, se muestra el video real (con su póster y subtítulos) en vez del marcador. */
  video?: VideoId;
}) {
  return (
    <div>
      {video ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]">
          <VideoProducto id={video} titulo={titulo} />
        </div>
      ) : (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#13213b] via-[#0f172a] to-[#0c3550] px-4 text-center">
        {poster && (
          <>
            <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" style={{ objectPosition: posterPos }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/55 to-[#0f172a]/20" />
          </>
        )}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#5fb2dd]/60 bg-[#2175a1]/30">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[#5fb2dd]" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="relative mt-3 font-serif text-lg text-white">{titulo}</p>
        <p className="relative mt-1 text-sm text-slate-300">Video próximamente · {duracion}</p>
      </div>
      )}
      <details className="group mt-3 rounded-xl border border-white/10 bg-white/[0.03]">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-4 py-2 text-sm font-medium text-slate-200">
          {etiquetaGuion}
          <span className="text-[#5fb2dd] transition group-open:rotate-180" aria-hidden="true">
            ▾
          </span>
        </summary>
        <p className="px-4 pb-4 leading-relaxed text-slate-300">«{guion}»</p>
      </details>
    </div>
  );
}

export function Checklist({
  items,
  valores,
  onCambio,
}: {
  items: string[];
  valores: boolean[];
  onCambio: (i: number, v: boolean) => void;
}) {
  return (
    <Bloque etiqueta="Checklist para pasar a la siguiente parte">
      <ul className="space-y-2">
        {items.map((item, i) => {
          const on = !!valores[i];
          return (
            <li key={item}>
              <label
                className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  on ? 'border-[#5fb2dd]/60 bg-[#2175a1]/15' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={(e) => onCambio(i, e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-[#2175a1]"
                />
                <span className={on ? 'text-white' : 'text-slate-300'}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </Bloque>
  );
}

export function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className={`mt-3 rounded-xl border p-3 text-sm leading-relaxed ${
        ok ? 'border-[#5fb2dd]/50 bg-[#2175a1]/15 text-slate-100' : 'border-rose-300/40 bg-rose-300/10 text-rose-100'
      }`}
    >
      {children}
    </div>
  );
}

export function Cuaderno({ preguntas, titulo = 'Tu cuaderno' }: { preguntas: PreguntaCuaderno[]; titulo?: string }) {
  const [p, actualizar] = useProgreso();
  return (
    <Bloque etiqueta={titulo} titulo="Escríbelo aquí: se guarda solo">
      <div className="space-y-4 rounded-2xl border border-dashed border-[#5fb2dd]/40 bg-[#5fb2dd]/[0.04] p-4 sm:p-6">
        {preguntas.map((q) => {
          const valor = p.notas[q.id] ?? '';
          return (
            <label key={q.id} className="block">
              <span className="font-medium text-white">{q.pregunta}</span>
              <span className="mt-0.5 block text-sm text-slate-400">{q.ayuda}</span>
              <textarea
                rows={q.filas ?? 2}
                value={valor}
                onChange={(e) => {
                  const v = e.target.value;
                  actualizar((x) => ({ ...x, notas: { ...x.notas, [q.id]: v } }));
                }}
                className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#0b1222] p-3 text-base leading-relaxed text-white placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
                placeholder="Escribe aquí…"
              />
              {valor.trim() && <span className="mt-1 block text-xs text-[#5fb2dd]">Guardado ✓</span>}
            </label>
          );
        })}
      </div>
    </Bloque>
  );
}

type FotoDef = { src: string; alt: string };

export function Foto({ foto, className = '', pos = '50% 30%', sizes = '(min-width: 768px) 360px, 100vw', prioridad = false }: { foto: FotoDef; className?: string; pos?: string; sizes?: string; prioridad?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#131c31] ${className}`}>
      <Image src={foto.src} alt={foto.alt} fill sizes={sizes} priority={prioridad} className="object-cover" style={{ objectPosition: pos }} />
    </div>
  );
}

export function ConsejoAlvaro({ foto, children, pos }: { foto: FotoDef; children: React.ReactNode; pos?: string }) {
  return (
    <figure className="mt-12 grid grid-cols-[96px_1fr] items-center gap-4 rounded-3xl border border-[#24314d] bg-[#131c31] p-3 sm:grid-cols-[180px_1fr] sm:p-4">
      <Foto foto={foto} pos={pos} className="aspect-[4/5] w-full" sizes="(min-width: 640px) 180px, 96px" />
      <figcaption>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">Consejo de Álvaro</p>
        <p className="mt-2 font-serif text-lg leading-snug text-white sm:text-xl">«{children}»</p>
      </figcaption>
    </figure>
  );
}
