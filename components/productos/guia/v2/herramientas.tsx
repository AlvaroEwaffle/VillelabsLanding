'use client';

import { useEffect, useState } from 'react';
import { DIAGNOSTICO, ETIQUETAS, PARTES, QUIZ, type Etiqueta } from '@/lib/productos/guia/contenido-v2';
import { calcularRuta } from '@/lib/productos/guia/ruta';
import { LINKS } from '@/lib/productos/links';
import type { DiaPrueba, Progreso } from '@/lib/productos/guia/progreso-v2';
import { Bloque, Feedback, Tarjeta, btnPrimario, btnSecundario } from './ui';

type Actualizar = (fn: (p: Progreso) => Progreso) => void;

export const estiloEtiqueta: Record<Etiqueta, string> = {
  haz: 'border-[#5fb2dd] bg-[#2175a1] text-white',
  revisa: 'border-[#5fb2dd]/60 text-[#5fb2dd]',
  salta: 'border-white/20 text-slate-400',
};

export function ChipEtiqueta({ e }: { e: Etiqueta }) {
  return <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estiloEtiqueta[e]}`}>{ETIQUETAS[e]}</span>;
}

// ---------- Parte 0 · Diagnóstico y ruta ----------
export function Diagnostico({
  respuestas,
  onGuardar,
  onIrAParte,
}: {
  respuestas: Record<string, string> | null;
  onGuardar: (r: Record<string, string> | null) => void;
  onIrAParte: (n: number) => void;
}) {
  const [r, setR] = useState<Record<string, string>>({});
  const listas = DIAGNOSTICO.filter((q) => r[q.id]).length;

  if (respuestas) {
    const ruta = calcularRuta(respuestas);
    return (
      <Bloque etiqueta="Tu ruta recomendada" titulo="Este es tu camino por la guía">
        <ol className="space-y-2">
          {ruta.orden.map((n, i) => {
            const paso = ruta.pasos.find((x) => x.parte === n)!;
            const parte = PARTES[n];
            return (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => onIrAParte(n)}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:border-[#5fb2dd] ${
                    paso.etiqueta === 'salta' ? 'border-white/10 bg-white/[0.02] opacity-80' : 'border-white/15 bg-white/[0.04]'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-2xl text-[#5fb2dd]">{i + 1}.</span>
                    <span className="font-semibold text-white">
                      Parte {n} · {parte.nombre}
                    </span>
                    <ChipEtiqueta e={paso.etiqueta} />
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{paso.porque}</p>
                  <p className="mt-1 text-sm text-[#cfe8f5]">→ {paso.mira}</p>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Tarjeta>
            <p className="text-sm font-semibold text-white">Tu meta</p>
            <p className="mt-1 text-sm text-slate-300">{ruta.tandas}</p>
          </Tarjeta>
          <Tarjeta>
            <p className="text-sm font-semibold text-white">Claude o ChatGPT</p>
            <p className="mt-1 text-sm text-slate-300">{ruta.consejoIA}</p>
          </Tarjeta>
        </div>
        {!ruta.esqueleto && (
          <Tarjeta className="mt-2 border-[#5fb2dd]/40">
            <p className="text-sm text-slate-200">
              Te recomendamos armar <strong className="text-white">El esqueleto de tu agente de atención</strong> (gratis): tu agente va a conocer
              tu negocio y los mensajes de esta guía te van a salir mejor.
            </p>
            <a href={LINKS.esqueleto} target="_blank" rel="noopener" className={`${btnSecundario} mt-3`}>
              Armar el esqueleto ↗
            </a>
          </Tarjeta>
        )}
        <button
          type="button"
          className={`${btnSecundario} mt-4`}
          onClick={() => {
            setR(respuestas);
            onGuardar(null);
          }}
        >
          Cambiar mis respuestas
        </button>
      </Bloque>
    );
  }

  return (
    <Bloque etiqueta={`Diagnóstico · ${DIAGNOSTICO.length} preguntas`} titulo="¿Dónde estás hoy?">
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#5fb2dd] transition-[width]" style={{ width: `${(listas / DIAGNOSTICO.length) * 100}%` }} />
      </div>
      <div className="space-y-6">
        {DIAGNOSTICO.map((q, k) => (
          <fieldset key={q.id}>
            <legend className="mb-2 font-medium text-white">
              {k + 1}. {q.pregunta}
            </legend>
            {q.id === 'esqueleto' && (
              <p className="mb-2 text-sm text-slate-400">
                Es el material gratis donde describes tu negocio para tu agente.{' '}
                <a href={LINKS.esqueleto} target="_blank" rel="noopener" className="text-[#5fb2dd] underline underline-offset-2">
                  Míralo aquí
                </a>
                .
              </p>
            )}
            <div className={`grid gap-2 ${q.opciones.length === 4 ? 'sm:grid-cols-2' : q.opciones.length === 2 ? 'grid-cols-2' : 'sm:grid-cols-3'}`}>
              {q.opciones.map((o) => {
                const on = r[q.id] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setR((x) => ({ ...x, [q.id]: o.id }))}
                    className={`min-h-[48px] rounded-xl border px-3 py-2 text-left text-sm transition ${
                      on ? 'border-[#5fb2dd] bg-[#2175a1]/25 text-white' : 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30'
                    }`}
                  >
                    {o.texto}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <button type="button" disabled={listas < DIAGNOSTICO.length} className={`${btnPrimario} mt-6 w-full sm:w-auto`} onClick={() => onGuardar(r)}>
        {listas < DIAGNOSTICO.length ? `Responde las ${DIAGNOSTICO.length - listas} que faltan` : 'Ver mi ruta'}
      </button>
    </Bloque>
  );
}

// ---------- Parte 2 · Temporizador ----------
const VEINTE = 20 * 60;
export function Temporizador() {
  const [restante, setRestante] = useState(VEINTE);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    if (!corriendo) return;
    const fin = Date.now() + restante * 1000;
    const t = setInterval(() => {
      const s = Math.max(0, Math.round((fin - Date.now()) / 1000));
      setRestante(s);
      if (s === 0) setCorriendo(false);
    }, 250);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- el fin se fija al arrancar
  }, [corriendo]);

  const mm = String(Math.floor(restante / 60)).padStart(2, '0');
  const ss = String(restante % 60).padStart(2, '0');

  return (
    <Tarjeta className="text-center">
      <p className="text-sm font-semibold text-white">Llena 20 filas. No escribas a nadie todavía.</p>
      <p className="mt-2 font-serif text-6xl tabular-nums text-white">
        {mm}:{ss}
      </p>
      <div className="mx-auto mt-3 h-2 max-w-md overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#5fb2dd] transition-[width] duration-300" style={{ width: `${(1 - restante / VEINTE) * 100}%` }} />
      </div>
      {restante === 0 && <p className="mt-3 text-[#5fb2dd]">¡Tiempo! ¿Llegaste a 20 filas?</p>}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" className={btnPrimario} disabled={restante === 0} onClick={() => setCorriendo((c) => !c)}>
          {corriendo ? 'Pausar' : restante === VEINTE ? 'Empezar los 20 minutos' : 'Seguir'}
        </button>
        <button
          type="button"
          className={btnSecundario}
          onClick={() => {
            setCorriendo(false);
            setRestante(VEINTE);
          }}
        >
          Reiniciar
        </button>
      </div>
    </Tarjeta>
  );
}

// ---------- Parte 6 · Prueba real de 5 días ----------
const num = (s: string) => {
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function PruebaReal({ prueba, actualizar }: { prueba: DiaPrueba[]; actualizar: Actualizar }) {
  const cambiar = (dia: number, campo: keyof DiaPrueba, v: string) =>
    actualizar((p) => ({
      ...p,
      prueba: p.prueba.map((d, i) => (i === dia ? { ...d, [campo]: v.replace(/\D/g, '').slice(0, 4) } : d)),
    }));

  const enviados = prueba.reduce((a, d) => a + num(d.enviados), 0);
  const respuestas = prueba.reduce((a, d) => a + num(d.respuestas), 0);
  const conversaciones = prueba.reduce((a, d) => a + num(d.conversaciones), 0);
  const tasa = enviados > 0 ? (respuestas / enviados) * 100 : null;
  const diasListos = prueba.filter((d) => d.enviados !== '').length;

  // C10 (8-nov-2026): con 25 mensajes el margen es enorme (2 de 25 calza con 2 % a 25 %), así que no se concluye
  // antes de 40 mensajes. Mismo criterio que la celda A9 del Excel (planilla.ts) y la pregunta 5 del quiz.
  const MINIMO = 40;
  const resp = `${respuestas} respuesta${respuestas === 1 ? '' : 's'}`;
  let sugerencia: { ok: boolean; texto: string } | null = null;
  if (diasListos === 5 && tasa !== null) {
    if (enviados < MINIMO)
      sugerencia = {
        ok: true,
        texto: `Llevas ${enviados} mensajes y ${resp}. Con menos de 40 mensajes los números todavía bailan mucho: sigue con la rutina y los seguimientos, y compara cuando juntes 40 a 50.${
          tasa > 20 ? ' Por ahora te responde más de 1 de cada 5: buena señal. Si se mantiene, súmale posibles clientes nuevos cada día.' : ''
        }`,
      };
    else if (respuestas <= 1)
      sugerencia = {
        ok: false,
        texto: `Con ${enviados} mensajes y ${resp}, revisa tu primer mensaje con la parte 4: el problema suele estar ahí, no en la cantidad.`,
      };
    else if (tasa > 20) sugerencia = { ok: true, texto: 'Te responde más de 1 de cada 5: súmale posibles clientes nuevos cada día.' };
    else sugerencia = { ok: true, texto: 'Vas dentro de lo normal (lo común es 1 o 2 de cada 20). Mantén el ritmo y no te saltes ningún seguimiento.' };
  }

  const campos: { k: keyof DiaPrueba; label: string }[] = [
    { k: 'enviados', label: 'Enviados' },
    { k: 'respuestas', label: 'Respuestas' },
    { k: 'conversaciones', label: 'Conversac.' },
  ];

  return (
    <div>
      <div className="space-y-2">
        {prueba.map((d, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="mb-2 text-sm font-semibold text-white">Día {i + 1}</p>
            <div className="grid grid-cols-3 gap-2">
              {campos.map((c) => (
                <label key={c.k} className="block">
                  <span className="block text-xs text-slate-400">{c.label}</span>
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={d[c.k]}
                    onChange={(e) => cambiar(i, c.k, e.target.value)}
                    placeholder="0"
                    aria-label={`${c.label} día ${i + 1}`}
                    className="mt-1 h-11 w-full rounded-lg border border-white/15 bg-[#0b1222] px-3 text-base text-white placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ['Enviados', String(enviados)],
          ['Respuestas', String(respuestas)],
          ['Conversaciones', String(conversaciones)],
          ['Tasa de respuesta', tasa === null ? '—' : `${tasa.toFixed(0)} %`],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-400">{l}</p>
            <p className="font-serif text-2xl text-white">{v}</p>
          </div>
        ))}
      </div>
      {sugerencia ? (
        <Feedback ok={sugerencia.ok}>{sugerencia.texto}</Feedback>
      ) : (
        <p className="mt-3 text-sm text-slate-400">Llevas {diasListos} de 5 días. Al completar el quinto ves cómo leer tus números.</p>
      )}
    </div>
  );
}

// ---------- Cierre · Quiz ----------
export function Quiz({ respuestas, actualizar }: { respuestas: (number | null)[]; actualizar: Actualizar }) {
  const aciertos = respuestas.filter((r, k) => r === QUIZ[k].correcta).length;
  const listas = respuestas.filter((r) => r !== null).length;
  return (
    <Bloque etiqueta="Quiz final · 5 preguntas" titulo="Aplícalo a casos reales">
      <div className="space-y-6">
        {QUIZ.map((q, k) => {
          const r = respuestas[k];
          return (
            <fieldset key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <legend className="sr-only">Pregunta {k + 1}</legend>
              <p className="font-medium text-white">
                {k + 1}. {q.pregunta}
              </p>
              <div className="mt-3 space-y-2">
                {q.opciones.map((o, j) => {
                  let estilo = 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30';
                  if (r !== null) {
                    if (j === q.correcta) estilo = 'border-[#5fb2dd] bg-[#2175a1]/25 text-white';
                    else if (j === r) estilo = 'border-rose-300/50 bg-rose-300/10 text-rose-100';
                    else estilo = 'border-white/10 text-slate-500';
                  }
                  return (
                    <button
                      key={j}
                      type="button"
                      disabled={r !== null}
                      onClick={() => actualizar((p) => ({ ...p, quiz: p.quiz.map((x, i) => (i === k ? j : x)) }))}
                      className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${estilo}`}
                    >
                      <span className="font-semibold">{String.fromCharCode(97 + j)})</span>
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
              {r !== null && <Feedback ok={r === q.correcta}>{q.porque}</Feedback>}
            </fieldset>
          );
        })}
      </div>
      {listas === QUIZ.length && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-slate-200">
            <span className="font-serif text-2xl text-white">{aciertos}/5</span>{' '}
            {aciertos >= 4 ? 'Lo tienes claro.' : 'Repasa las partes de las que fallaste y vuelve a intentarlo.'}
          </p>
          <button type="button" className={btnSecundario} onClick={() => actualizar((p) => ({ ...p, quiz: QUIZ.map(() => null) }))}>
            Repetir quiz
          </button>
        </div>
      )}
    </Bloque>
  );
}
