'use client';

import { useState } from 'react';
import {
  ERRORES,
  FUENTES,
  MENSAJES_ERROR,
  PROSPECTOS_ORDEN,
  TARJETAS_PROSPECTO,
  TIPOS_PROSPECTO,
  type ErrorId,
  type FuenteId,
} from '@/lib/productos/guia/contenido-v2';
import { Bloque, Feedback, btnPrimario, btnSecundario } from './ui';

function Marcador({ ok, total, onReiniciar }: { ok: number; total: number; onReiniciar: () => void }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-slate-200">
        <span className="font-serif text-2xl text-white">
          {ok}/{total}
        </span>{' '}
        {ok === total ? '¡Perfecto!' : 'Revisa el porqué de las que fallaste.'}
      </p>
      <button type="button" className={btnSecundario} onClick={onReiniciar}>
        Jugar de nuevo
      </button>
    </div>
  );
}

// ---------- Parte 1 · ¿Le escribo o no? ----------
export function JuegoProspecto() {
  const [respuestas, setRespuestas] = useState<boolean[]>([]);
  const i = respuestas.length;
  const terminado = i >= TARJETAS_PROSPECTO.length;
  const ultima = i > 0 ? TARJETAS_PROSPECTO[i - 1] : null;
  const ultimaOk = ultima ? respuestas[i - 1] === ultima.si : false;
  const [viendo, setViendo] = useState(false);
  const aciertos = respuestas.filter((r, k) => r === TARJETAS_PROSPECTO[k].si).length;
  const [inicioX, setInicioX] = useState<number | null>(null);

  const responder = (si: boolean) => {
    if (viendo || terminado) return;
    setRespuestas((r) => [...r, si]);
    setViendo(true);
  };

  const actual = TARJETAS_PROSPECTO[i];

  return (
    <Bloque etiqueta="Juego · ¿Le escribo o no?" titulo="¿Es cliente ideal de Grano Norte?">
      <p className="text-slate-300">
        Toca <strong>Sí</strong> o <strong>No</strong> (o desliza la tarjeta) para cada negocio. Recuerda: cafeterías
        independientes de 1 a 3 locales en Valparaíso y Viña, con una señal de «ahora».
      </p>
      {viendo && ultima ? (
        <div className="mt-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-lg text-white">{ultima.texto}</div>
          <Feedback ok={ultimaOk}>
            <strong>
              {ultimaOk ? 'Bien.' : 'No esta vez.'} Es un {ultima.si ? '«Sí»' : '«No»'}.
            </strong>{' '}
            {ultima.porque}
          </Feedback>
          <button type="button" className={`${btnPrimario} mt-3 w-full sm:w-auto`} onClick={() => setViendo(false)}>
            {terminado ? 'Ver resultado' : 'Siguiente tarjeta'}
          </button>
        </div>
      ) : terminado ? (
        <Marcador ok={aciertos} total={TARJETAS_PROSPECTO.length} onReiniciar={() => setRespuestas([])} />
      ) : (
        <div className="mt-4">
          <p className="mb-2 text-sm text-slate-400">
            Tarjeta {i + 1} de {TARJETAS_PROSPECTO.length}
          </p>
          <div
            className="touch-pan-y select-none rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 text-lg leading-snug text-white shadow-premium"
            onPointerDown={(e) => setInicioX(e.clientX)}
            onPointerUp={(e) => {
              if (inicioX === null) return;
              const dx = e.clientX - inicioX;
              setInicioX(null);
              if (Math.abs(dx) > 70) responder(dx > 0);
            }}
          >
            {actual.texto}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button type="button" className={btnSecundario} onClick={() => responder(false)}>
              ← No
            </button>
            <button type="button" className={btnPrimario} onClick={() => responder(true)}>
              Sí →
            </button>
          </div>
        </div>
      )}
    </Bloque>
  );
}

// ---------- Parte 2 · Cada fuente con su cliente ----------
export function JuegoFuentes() {
  const [asignados, setAsignados] = useState<Record<string, FuenteId>>({});
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [revisado, setRevisado] = useState(false);
  const completos = Object.keys(asignados).length === TIPOS_PROSPECTO.length;
  const aciertos = TIPOS_PROSPECTO.filter((t) => asignados[t.id] === t.fuente).length;

  const asignar = (tipo: string, fuente: FuenteId) => {
    setAsignados((a) => ({ ...a, [tipo]: fuente }));
    setSeleccionado(null);
  };

  const reiniciar = () => {
    setAsignados({});
    setSeleccionado(null);
    setRevisado(false);
  };

  return (
    <Bloque etiqueta="Juego · Cada fuente con su cliente" titulo="¿Dónde lo encuentras más fácil?">
      <p className="text-slate-300">
        Toca un posible cliente y después la fuente donde es más fácil encontrarlo. En computador también puedes arrastrarlo.
      </p>
      {!revisado && (
        <div className="mt-4 space-y-2">
          {TIPOS_PROSPECTO.filter((t) => !asignados[t.id]).map((t) => (
            <button
              key={t.id}
              type="button"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', t.id)}
              onClick={() => setSeleccionado(seleccionado === t.id ? null : t.id)}
              aria-pressed={seleccionado === t.id}
              className={`flex min-h-[48px] w-full items-center rounded-xl border px-4 py-2 text-left transition ${
                seleccionado === t.id
                  ? 'border-[#5fb2dd] bg-[#2175a1]/30 text-white'
                  : 'border-white/15 bg-white/[0.05] text-slate-100 hover:border-white/30'
              }`}
            >
              {t.texto}
            </button>
          ))}
          {completos && <p className="text-sm text-slate-400">Todos ubicados. Revisa cuando quieras.</p>}
        </div>
      )}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {FUENTES.map((f) => {
          const aqui = TIPOS_PROSPECTO.filter((t) => asignados[t.id] === f.id);
          return (
            <div
              key={f.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData('text/plain');
                if (id && !revisado) asignar(id, f.id);
              }}
              className={`rounded-xl border p-3 transition ${
                seleccionado ? 'border-[#5fb2dd]/60 border-dashed' : 'border-white/10'
              } bg-white/[0.02]`}
            >
              <button
                type="button"
                disabled={!seleccionado || revisado}
                onClick={() => seleccionado && asignar(seleccionado, f.id)}
                className="flex min-h-[44px] w-full flex-col items-start justify-center text-left disabled:cursor-default"
              >
                <span className="font-semibold text-white">{f.nombre}</span>
                {f.detalle && <span className="text-xs text-slate-400">{f.detalle}</span>}
                {seleccionado && !revisado && <span className="mt-1 text-xs text-[#5fb2dd]">Toca para dejarlo aquí</span>}
              </button>
              {aqui.map((t) => {
                const ok = t.fuente === f.id;
                return (
                  <div key={t.id} className="mt-2">
                    <button
                      type="button"
                      disabled={revisado}
                      onClick={() =>
                        setAsignados((a) => {
                          const n = { ...a };
                          delete n[t.id];
                          return n;
                        })
                      }
                      className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                        revisado
                          ? ok
                            ? 'bg-[#2175a1]/25 text-white'
                            : 'bg-rose-300/10 text-rose-100'
                          : 'bg-white/[0.06] text-slate-100'
                      }`}
                    >
                      <span>{t.texto}</span>
                      {!revisado && <span className="text-slate-400" aria-label="Quitar">×</span>}
                      {revisado && <span aria-hidden="true">{ok ? '✓' : '✗'}</span>}
                    </button>
                    {revisado && (
                      <p className="mt-1 px-1 text-xs leading-relaxed text-slate-300">
                        {ok ? '' : `Va en ${FUENTES.find((x) => x.id === t.fuente)?.nombre}. `}
                        {t.porque}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {revisado ? (
        <Marcador ok={aciertos} total={TIPOS_PROSPECTO.length} onReiniciar={reiniciar} />
      ) : (
        <button type="button" className={`${btnPrimario} mt-4 w-full sm:w-auto`} disabled={!completos} onClick={() => setRevisado(true)}>
          Revisar
        </button>
      )}
    </Bloque>
  );
}

// ---------- Parte 3 · Ordena la mañana ----------
const total = (p: (typeof PROSPECTOS_ORDEN)[number]) => p.encaje + p.senal + p.acceso;
const ORDEN_CORRECTO = [...PROSPECTOS_ORDEN].sort((a, b) => total(b) - total(a)).map((p) => p.id);

export function JuegoOrden() {
  const [orden, setOrden] = useState<string[]>(PROSPECTOS_ORDEN.map((p) => p.id));
  const [revisado, setRevisado] = useState(false);
  const mover = (idx: number, d: -1 | 1) => {
    const j = idx + d;
    if (j < 0 || j >= orden.length) return;
    const n = [...orden];
    [n[idx], n[j]] = [n[j], n[idx]];
    setOrden(n);
  };
  const aciertos = orden.filter((id, k) => ORDEN_CORRECTO[k] === id).length;

  return (
    <Bloque etiqueta="Juego · ¿A quién sigues primero?" titulo="Camila ya le escribió a los 20. ¿A quién le hace seguimiento primero?">
      <p className="text-slate-300">
        Ordena de primero a quinto con las flechas. Piensa en Encaje, Señal y Acceso (de 1 a 3 cada uno). El puntaje no decide a quién escribirle: decide a quién cuidar primero.
      </p>
      <ol className="mt-4 space-y-2">
        {(revisado ? ORDEN_CORRECTO : orden).map((id, k) => {
          const p = PROSPECTOS_ORDEN.find((x) => x.id === id)!;
          const tuPosicion = orden.indexOf(id) + 1;
          const ok = orden[k] === id;
          return (
            <li
              key={id}
              className={`flex items-stretch gap-3 rounded-xl border p-3 ${
                revisado ? (ok ? 'border-[#5fb2dd]/50 bg-[#2175a1]/15' : 'border-rose-300/40 bg-rose-300/[0.07]') : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <span className="flex w-8 shrink-0 items-start justify-center pt-1 font-serif text-2xl text-[#5fb2dd]">{k + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{p.nombre}</p>
                <p className="text-sm leading-snug text-slate-300">{p.datos}</p>
                {revisado && (
                  <p className="mt-2 text-sm text-slate-200">
                    Encaje {p.encaje} · Señal {p.senal} · Acceso {p.acceso} = <strong className="text-white">{total(p)}</strong>
                    <span className="text-slate-400"> · tú lo pusiste {tuPosicion}.º</span>
                  </p>
                )}
              </div>
              {!revisado && (
                <div className="flex shrink-0 flex-col gap-1">
                  <button type="button" aria-label={`Subir ${p.nombre}`} disabled={k === 0} onClick={() => mover(k, -1)} className={`${btnSecundario} h-11 w-11 px-0`}>
                    ↑
                  </button>
                  <button type="button" aria-label={`Bajar ${p.nombre}`} disabled={k === orden.length - 1} onClick={() => mover(k, 1)} className={`${btnSecundario} h-11 w-11 px-0`}>
                    ↓
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {revisado ? (
        <>
          <Feedback ok={aciertos === orden.length}>
            {aciertos === orden.length
              ? 'Orden perfecto. '
              : `Acertaste ${aciertos} de 5 posiciones. Este es el orden correcto. `}
            Mirador va primero en los seguimientos porque tiene todo: es cliente ideal, la necesita ahora y le llega directo. Hotel Costa tiene
            señal, pero no encaja ni hay acceso: igual recibe su mensaje, solo que su seguimiento va al final.
          </Feedback>
          <button
            type="button"
            className={`${btnSecundario} mt-3`}
            onClick={() => {
              setRevisado(false);
              setOrden(PROSPECTOS_ORDEN.map((p) => p.id));
            }}
          >
            Jugar de nuevo
          </button>
        </>
      ) : (
        <button type="button" className={`${btnPrimario} mt-4 w-full sm:w-auto`} onClick={() => setRevisado(true)}>
          Revisar mi orden
        </button>
      )}
    </Bloque>
  );
}

// ---------- Parte 4 · Encuentra el error ----------
export function JuegoError() {
  const [elegidos, setElegidos] = useState<(ErrorId | null)[]>(MENSAJES_ERROR.map(() => null));
  const respondidos = elegidos.filter(Boolean).length;
  const aciertos = elegidos.filter((e, k) => e === MENSAJES_ERROR[k].error).length;

  return (
    <Bloque etiqueta="Juego · Encuentra el error" titulo="Cada mensaje tiene un error. ¿Cuál?">
      <div className="space-y-6">
        {MENSAJES_ERROR.map((m, k) => {
          const elegido = elegidos[k];
          const ok = elegido === m.error;
          return (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Mensaje {k + 1}</p>
              <p className="mt-2 rounded-xl rounded-tl-sm bg-white/[0.07] p-3 leading-relaxed text-slate-100">{m.mensaje}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {ERRORES.map((er) => {
                  const marcado = elegido === er.id;
                  const esCorrecto = er.id === m.error;
                  let estilo = 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30';
                  if (elegido) {
                    if (esCorrecto) estilo = 'border-[#5fb2dd] bg-[#2175a1]/25 text-white';
                    else if (marcado) estilo = 'border-rose-300/50 bg-rose-300/10 text-rose-100';
                    else estilo = 'border-white/10 text-slate-500';
                  }
                  return (
                    <button
                      key={er.id}
                      type="button"
                      disabled={!!elegido}
                      onClick={() => setElegidos((a) => a.map((x, j) => (j === k ? er.id : x)))}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-left text-sm transition ${estilo}`}
                    >
                      {er.texto}
                    </button>
                  );
                })}
              </div>
              {elegido && (
                <Feedback ok={ok}>
                  <strong>{ok ? 'Exacto.' : `El error es: ${ERRORES.find((e) => e.id === m.error)?.texto.toLowerCase()}.`}</strong>{' '}
                  {m.porque}
                  <span className="mt-2 block text-slate-300">Corregido:</span>
                  <span className="block italic text-white">«{m.corregido}»</span>
                </Feedback>
              )}
            </div>
          );
        })}
      </div>
      {respondidos === MENSAJES_ERROR.length && (
        <Marcador ok={aciertos} total={MENSAJES_ERROR.length} onReiniciar={() => setElegidos(MENSAJES_ERROR.map(() => null))} />
      )}
    </Bloque>
  );
}
