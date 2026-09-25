'use client';

import { useEffect, useRef, useState } from 'react';
import { useCopiloto, type Mensaje } from '@/lib/programa/useCopiloto';

/**
 * El panel del copiloto: un hilo a la derecha, en todas las páginas.
 *
 * Solo es la superficie de entrada. Acá no vive ninguna lógica de agente:
 * los comentarios se guardan en Firestore y del otro lado hay un monitor que
 * los lee y responde escribiendo en el mismo documento. Esta pantalla no
 * sabe —ni tiene por qué saber— quién los atiende.
 *
 * Cada mensaje guarda desde qué artefacto se escribió. Un «este número está
 * mal» sin contexto obliga a adivinar de qué pantalla habla.
 */

function hora(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function Burbuja({ m }: { m: Mensaje }) {
  const mio = m.de === 'alvaro';
  return (
    <div className={`flex ${mio ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 ${
          mio ? 'bg-white/[0.07] text-white/85' : 'border border-white/10 bg-white/[0.02] text-white/75'
        }`}
      >
        {!mio && (
          <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-white/30">copiloto</p>
        )}
        <p className="whitespace-pre-wrap text-[13px] leading-relaxed">{m.texto}</p>
        <p className="mt-1 flex items-center gap-2 text-[10px] text-white/25">
          <span>{hora(m.ts)}</span>
          {mio && m.donde && <span>· {m.donde}</span>}
          {mio && (
            <span className={m.leido ? 'text-emerald-300/70' : 'text-white/25'}>
              · {m.leido ? 'leído' : 'sin leer'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export function Copiloto({ slug, donde }: { slug: string; donde: string }) {
  const [abierto, setAbierto] = useState(false);
  const [texto, setTexto] = useState('');
  const { mensajes, cargando, respaldo, enviando, enviar } = useCopiloto(slug);
  const finRef = useRef<HTMLDivElement>(null);

  const sinLeer = mensajes.filter((m) => m.de === 'alvaro' && !m.leido).length;

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes.length, abierto]);

  function mandar() {
    if (!texto.trim()) return;
    enviar(texto, donde);
    setTexto('');
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-[#0f172a]/90 px-4 py-2.5 text-xs text-white/70 shadow-lg backdrop-blur transition-colors hover:border-white/30 hover:text-white"
        aria-label="Abrir el copiloto"
      >
        Copiloto
        {sinLeer > 0 && (
          <span className="rounded-full bg-white/15 px-1.5 text-[10px] tabular-nums text-white/80">
            {sinLeer}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col border-l border-white/10 bg-[#0f172a]/95 backdrop-blur">
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm text-white">Copiloto</p>
          <p className="mt-0.5 text-[11px] leading-tight text-white/35">
            {respaldo === 'firestore' ? (
              <>Dejá comentarios acá. Los leo en vivo.</>
            ) : (
              <span className="text-amber-300/80">
                Sin conexión a Firestore: esto queda solo en este navegador y nadie lo va a leer.
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="shrink-0 rounded-lg border border-white/15 px-2 py-1 text-xs text-white/50 transition-colors hover:border-white/30 hover:text-white"
          aria-label="Cerrar el copiloto"
        >
          ✕
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {cargando && <p className="text-xs text-white/30">Cargando el hilo…</p>}
        {!cargando && mensajes.length === 0 && (
          <div className="space-y-2 text-xs leading-relaxed text-white/35">
            <p>Todavía no hay nada.</p>
            <p>
              Sirve para dejar comentarios sobre lo que estás viendo: un número que no cuadra, una
              historia mal ubicada, algo que falta. Queda anotado desde qué pantalla lo escribiste.
            </p>
          </div>
        )}
        {mensajes.map((m) => (
          <Burbuja key={m.id} m={m} />
        ))}
        <div ref={finRef} />
      </div>

      <div className="border-t border-white/10 p-3">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              mandar();
            }
          }}
          rows={3}
          placeholder={`Comentario sobre ${donde}…`}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white/85 placeholder:text-white/25 focus:border-white/25 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-white/25">⌘↵ para enviar · quedás en {donde}</span>
          <button
            type="button"
            onClick={mandar}
            disabled={!texto.trim() || enviando}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>
        </div>
      </div>
    </aside>
  );
}
