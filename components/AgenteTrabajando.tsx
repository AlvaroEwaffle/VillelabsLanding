'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Check, Clock, FileText, Inbox, PauseCircle } from 'lucide-react';

/*
 * Panel "agente trabajando" del hero del home. Muestra literalmente la promesa:
 * llegan tareas, el agente las procesa una por una (Leyendo → Ordenando → Redactando → Listo)
 * y en la que compromete plata se frena y pregunta antes de enviar.
 *
 * Es una secuencia de cuadros con duración fija (~14 s en loop). Las alturas están reservadas
 * para que nada se mueva de lugar cuando aparece el freno. Con prefers-reduced-motion se
 * muestra el estado final, quieto.
 */

type Lang = 'es' | 'en';

const COPY = {
  es: {
    cabecera: 'Agente · tu bandeja',
    estado: { trabajando: 'Trabajando', esperando: 'Esperando tu OK', alDia: 'Al día' },
    tareas: [
      { titulo: 'Correo de un cliente', nota: 'Pregunta por plazos' },
      { titulo: 'Propuesta por armar', nota: 'De la reunión de ayer' },
      { titulo: 'Seguimiento pendiente', nota: 'Lleva días sin respuesta' },
      { titulo: 'Reporte semanal', nota: 'Para el lunes' },
    ],
    pasos: ['Leyendo', 'Ordenando', 'Redactando', 'Listo'],
    enEspera: 'En espera',
    enviada: 'Enviada',
    freno: { kicker: 'Freno', pregunta: '¿Envío la propuesta?', razon: 'Compromete plata → te pregunto.', aprobar: 'Aprobar', revisar: 'Revisar', ok: 'Aprobaste → la envío.' },
    sinFreno: 'Sin preguntas pendientes. Lo que compromete plata, alcance o fechas, te lo pregunta antes.',
    pie: (n: number) => `${n} de 4 tareas listas · 1 pregunta para ti`,
  },
  en: {
    cabecera: 'Agent · your inbox',
    estado: { trabajando: 'Working', esperando: 'Waiting for your OK', alDia: 'All done' },
    tareas: [
      { titulo: 'Email from a client', nota: 'Asking about timelines' },
      { titulo: 'Proposal to draft', nota: 'From yesterday’s meeting' },
      { titulo: 'Pending follow-up', nota: 'No reply for days' },
      { titulo: 'Weekly report', nota: 'Due Monday' },
    ],
    pasos: ['Reading', 'Sorting', 'Drafting', 'Done'],
    enEspera: 'Queued',
    enviada: 'Sent',
    freno: { kicker: 'Brake', pregunta: 'Send the proposal?', razon: 'It commits money → I ask you first.', aprobar: 'Approve', revisar: 'Review', ok: 'You approved → sending it.' },
    sinFreno: 'No questions pending. Anything that commits money, scope or dates gets asked first.',
    pie: (n: number) => `${n} of 4 tasks done · 1 question for you`,
  },
};

const ICONOS = [Inbox, FileText, Clock, BarChart3];
const FRENO_EN = 1; // la propuesta es la que compromete plata

type Cuadro = { activa: number; paso: number; freno: 'no' | 'pregunta' | 'ok'; dur: number };

// Secuencia completa (~14 s). `activa` = índice de la tarea en curso; 4 = todas listas.
const CUADROS: Cuadro[] = (() => {
  const c: Cuadro[] = [];
  for (let i = 0; i < 4; i++) {
    for (let paso = 0; paso < 3; paso++) c.push({ activa: i, paso, freno: 'no', dur: 600 });
    if (i === FRENO_EN) {
      c.push({ activa: i, paso: 2, freno: 'pregunta', dur: 2300 });
      c.push({ activa: i, paso: 2, freno: 'ok', dur: 900 });
    }
    c.push({ activa: i, paso: 3, freno: 'no', dur: 500 });
  }
  c.push({ activa: 4, paso: 3, freno: 'no', dur: 1800 });
  return c;
})();
const FINAL = CUADROS.length - 1;

const RM = '(prefers-reduced-motion: reduce)';
const subRM = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const leerRM = () => window.matchMedia(RM).matches;

export default function AgenteTrabajando({ lang = 'es', compacto = false }: { lang?: Lang; compacto?: boolean }) {
  const c = COPY[lang];
  const [idx, setIdx] = useState(0);
  // Con reduced-motion se muestra el cuadro final, quieto (snapshot de servidor: false).
  const quieto = useSyncExternalStore(subRM, leerRM, () => false);

  useEffect(() => {
    if (quieto) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % CUADROS.length), CUADROS[idx].dur);
    return () => window.clearTimeout(t);
  }, [idx, quieto]);

  const q = CUADROS[quieto ? FINAL : idx];
  const listas = q.activa === 4 ? 4 : q.activa + (q.paso === 3 ? 1 : 0);
  const estado = q.freno === 'pregunta' ? c.estado.esperando : q.activa === 4 ? c.estado.alDia : c.estado.trabajando;
  const esperando = q.freno === 'pregunta';

  return (
    <div
      className={`relative w-full min-w-0 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left shadow-[0_0_60px_-20px_rgba(33,117,161,0.6)] backdrop-blur-sm sm:p-5 ${compacto ? 'max-w-md' : 'max-w-lg'}`}
      role="img"
      aria-label={lang === 'en' ? 'Demo: an agent processes four tasks and asks before sending a proposal.' : 'Demostración: un agente procesa cuatro tareas y pregunta antes de enviar una propuesta.'}
    >
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{c.cabecera}</p>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${esperando ? 'border-amber-400/40 text-amber-200' : 'border-white/10 text-slate-300'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${esperando ? 'bg-amber-400' : q.activa === 4 ? 'bg-emerald-400' : 'bg-accent'} ${quieto || q.activa === 4 ? '' : 'animate-pulse'}`} />
          {estado}
        </span>
      </div>

      {/* Tareas */}
      <ul className="mt-4 space-y-2">
        {c.tareas.map((t, i) => {
          const Icono = ICONOS[i];
          const lista = i < q.activa || (i === q.activa && q.paso === 3);
          const enCurso = i === q.activa && q.paso < 3;
          const etiqueta = lista ? (i === FRENO_EN ? c.enviada : c.pasos[3]) : enCurso ? c.pasos[q.paso] : c.enEspera;
          return (
            <li
              key={t.titulo}
              className={`flex h-14 items-center gap-3 rounded-xl border px-3 transition-colors duration-300 ${
                enCurso ? 'border-accent/50 bg-accent/10' : lista ? 'border-white/5 bg-white/[0.02]' : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${lista ? 'bg-emerald-500/15 text-emerald-300' : enCurso ? 'bg-accent/20 text-sky-200' : 'bg-white/5 text-slate-400'}`}>
                {lista ? <Check className="h-4 w-4" /> : <Icono className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-[13px] sm:text-sm ${lista ? 'text-slate-400 line-through decoration-white/20' : 'text-white'}`}>{t.titulo}</span>
                <span className="block truncate text-[11px] text-slate-500">{t.nota}</span>
              </span>
              <span className="w-[68px] shrink-0 text-right sm:w-[88px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={etiqueta}
                    initial={quieto ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={quieto ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider ${lista ? 'text-emerald-300' : enCurso ? 'text-sky-200' : 'text-slate-500'}`}
                  >
                    {enCurso ? <span className="h-1 w-1 animate-pulse rounded-full bg-sky-300" /> : null}
                    {etiqueta}
                    {lista ? <Check className="h-3 w-3" /> : null}
                  </motion.span>
                </AnimatePresence>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Freno: espacio reservado para que no salte el layout */}
      <div className="relative mt-3 min-h-[96px]">
        <AnimatePresence initial={false} mode="wait">
          {q.freno !== 'no' ? (
            <motion.div
              key="freno"
              initial={quieto ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={quieto ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-3"
            >
              <div className="flex items-start gap-3">
                <PauseCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">{c.freno.kicker}</p>
                  <p className="mt-0.5 text-sm text-white">{c.freno.pregunta}</p>
                  <p className="text-xs text-slate-300">{c.freno.razon}</p>
                </div>
              </div>
              <div className="mt-2.5 flex h-8 items-center gap-2 pl-8">
                {q.freno === 'pregunta' ? (
                  <>
                    <span className="inline-flex h-8 items-center rounded-full bg-accent px-3.5 text-xs font-medium text-white">{c.freno.aprobar}</span>
                    <span className="inline-flex h-8 items-center rounded-full border border-white/15 px-3.5 text-xs text-slate-200">{c.freno.revisar}</span>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                    <Check className="h-3.5 w-3.5" /> {c.freno.ok}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="sin-freno"
              initial={quieto ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={quieto ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-[96px] items-center rounded-xl border border-dashed border-white/10 px-4 text-xs leading-relaxed text-slate-500"
            >
              {c.sinFreno}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Pie */}
      <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/5 pt-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{c.pie(listas)}</p>
        <div className="flex gap-1" aria-hidden="true">
          {c.tareas.map((_, i) => (
            <span key={i} className={`h-1 w-5 rounded-full transition-colors duration-300 ${i < listas ? 'bg-emerald-400' : i === q.activa ? 'bg-accent' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
