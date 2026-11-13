'use client';

// Chat del chibi (12-nov-2026): reemplaza al botón de WhatsApp en /curso, /esqueleto y /guia.
//  - A los 6 s (una vez por sesión) el chibi saluda: «Hola, ¿tienes dudas?».
//  - Preguntas listas con respuesta inmediata (lib/productos/chat.ts).
//  - Lo que la persona escribe va a Slack (/api/chat) y se responde en vivo desde ahí; el widget consulta cada 5 s.
//  - Si en 2 minutos nadie responde, ofrece seguir por WhatsApp.

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send } from 'lucide-react';
import { PREGUNTAS_CHAT, rutaConChat } from '@/lib/productos/chat';
import { eventosActivos, experimento, registrarEvento, sid } from '@/lib/productos/eventos';
import { leerUtm } from '@/lib/productos/utm';

type Msg = { de: 'bot' | 'yo'; texto: string; ts?: string };
type Estado = { t?: string; k: string; msgs: Msg[]; desde?: string; ultimoEnvio?: number; pidioWa?: boolean; dejoWa?: boolean };

const CLAVE = 'vl_chat';
const CLAVE_SALUDO = 'vl_chat_saludo';
const SALUDO = 'Hola, ¿tienes dudas? Elige una pregunta o escríbeme lo que quieras.';
const ESPERA_WA = 120_000; // sin respuesta en 2 min → ofrecer WhatsApp
const ESPERA_MAX = 15 * 60_000; // deja de consultar a los 15 min del último mensaje

function claveNueva(): string {
  const a = new Uint8Array(12);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
}

function leerEstado(): Estado {
  try {
    const raw = sessionStorage.getItem(CLAVE);
    if (raw) return JSON.parse(raw) as Estado;
  } catch {
    /* sin almacenamiento */
  }
  return { k: claveNueva(), msgs: [{ de: 'bot', texto: SALUDO }] };
}

function guardar(e: Estado) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(e));
  } catch {
    /* sin almacenamiento */
  }
}

export default function ChatChibi() {
  const pathname = usePathname();
  const ruta = rutaConChat(pathname);
  const [abierto, setAbierto] = useState(false);
  const [saludo, setSaludo] = useState(false);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [texto, setTexto] = useState('');
  const [wa, setWa] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const lista = useRef<HTMLDivElement>(null);
  // En celular no tapa el hero (igual que el botón de WhatsApp de antes): aparece recién al bajar.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.innerWidth >= 640 || window.scrollY > 480);
    f();
    window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => {
      window.removeEventListener('scroll', f);
      window.removeEventListener('resize', f);
    };
  }, []);
  // En /cotizador también sube: ahí hay una barra fija abajo («Seguir»).
  const enCurso = ruta === '/curso' || ruta === '/cotizador';

  useEffect(() => {
    setEstado(leerEstado());
  }, []);

  const actualizar = useCallback((f: (e: Estado) => Estado) => {
    setEstado((prev) => {
      const n = f(prev ?? leerEstado());
      guardar(n);
      return n;
    });
  }, []);

  // Saludo a los 6 s de estar visible, una vez por sesión.
  useEffect(() => {
    if (!ruta || !visible) return;
    let visto = false;
    try {
      visto = sessionStorage.getItem(CLAVE_SALUDO) === '1';
    } catch {
      /* sin almacenamiento */
    }
    if (visto) return;
    const id = window.setTimeout(() => {
      setSaludo(true);
      try {
        sessionStorage.setItem(CLAVE_SALUDO, '1');
      } catch {
        /* sin almacenamiento */
      }
    }, 6000);
    return () => window.clearTimeout(id);
  }, [ruta, visible]);

  // Bajar al último mensaje.
  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: 'smooth' });
  }, [estado?.msgs.length, abierto, estado?.pidioWa]);

  // Consultar respuestas mientras haya un chat abierto en Slack y un mensaje reciente.
  useEffect(() => {
    if (!estado?.t || !estado.ultimoEnvio) return;
    let vivo = true;
    const consultar = async () => {
      const e = leerEstado();
      if (!e.t || !e.ultimoEnvio || Date.now() - e.ultimoEnvio > ESPERA_MAX) return;
      try {
        const q = new URLSearchParams({ t: e.t, k: e.k });
        if (e.desde) q.set('desde', e.desde);
        const r = await fetch(`/api/chat?${q}`, { cache: 'no-store' });
        if (r.ok) {
          const d = (await r.json()) as { respuestas?: { ts: string; texto: string }[] };
          const nuevas = (d.respuestas ?? []).filter((x) => !e.msgs.some((m) => m.ts === x.ts));
          if (vivo && nuevas.length) {
            actualizar((s) => ({
              ...s,
              msgs: [...s.msgs, ...nuevas.map((x) => ({ de: 'bot' as const, texto: x.texto, ts: x.ts }))],
              desde: nuevas[nuevas.length - 1].ts,
              pidioWa: s.pidioWa,
            }));
            setSaludo(false);
          }
        }
      } catch {
        /* reintenta en el próximo ciclo */
      }
      // 2 min sin respuesta desde el último mensaje → ofrecer WhatsApp (una vez).
      const s = leerEstado();
      const huboRespuesta = s.msgs.some((m) => m.de === 'bot' && m.ts);
      if (vivo && !huboRespuesta && !s.pidioWa && s.ultimoEnvio && Date.now() - s.ultimoEnvio > ESPERA_WA) {
        actualizar((x) => ({ ...x, pidioWa: true }));
      }
    };
    consultar();
    const id = window.setInterval(consultar, 5000);
    return () => {
      vivo = false;
      window.clearInterval(id);
    };
  }, [estado?.t, estado?.ultimoEnvio, actualizar]);

  if (!ruta || !estado) return null;
  const preguntas = PREGUNTAS_CHAT[ruta] ?? [];
  const yaPreguntadas = new Set(estado.msgs.filter((m) => m.de === 'yo').map((m) => m.texto));

  const abrir = () => {
    setAbierto(true);
    setSaludo(false);
    registrarEvento('chat', { detalle: `abrió el chat en ${ruta}` });
  };

  const preguntar = (p: { p: string; r: string }) => {
    actualizar((s) => ({ ...s, msgs: [...s.msgs, { de: 'yo', texto: p.p }, { de: 'bot', texto: p.r }] }));
    registrarEvento('chat', { detalle: `pregunta lista: ${p.p}` });
  };

  const postear = async (tipo: 'mensaje' | 'whatsapp', valor: string) => {
    const u = leerUtm();
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tipo,
        sid: sid(),
        k: estado.k,
        t: estado.t,
        texto: valor,
        ruta: location.pathname,
        utm: [u.utm_source, u.utm_campaign].filter(Boolean).join(' / '),
        ...experimento(),
      }),
    });
    const d = (await r.json().catch(() => ({}))) as { ok?: boolean; t?: string; error?: string };
    if (!r.ok || !d.ok) throw new Error(d.error || 'error');
    return d.t;
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = texto.trim();
    if (!v || enviando) return;
    setError('');
    if (!eventosActivos()) {
      // localhost / pruebas automatizadas: no se manda a Slack.
      actualizar((s) => ({ ...s, msgs: [...s.msgs, { de: 'yo', texto: v }, { de: 'bot', texto: '(modo prueba: este mensaje no se envía)' }] }));
      setTexto('');
      return;
    }
    setEnviando(true);
    actualizar((s) => ({ ...s, msgs: [...s.msgs, { de: 'yo', texto: v }] }));
    setTexto('');
    try {
      const t = await postear('mensaje', v);
      const primera = !estado.t;
      actualizar((s) => ({
        ...s,
        t: t ?? s.t,
        ultimoEnvio: Date.now(),
        msgs: primera ? [...s.msgs, { de: 'bot', texto: 'Recibido. Te respondo aquí en un ratito, no cierres esta página.' }] : s.msgs,
      }));
      registrarEvento('chat', { detalle: 'escribió un mensaje en el chat' });
    } catch {
      setError('No se pudo enviar. Prueba de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const enviarWa = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = wa.trim();
    if (!/^\+?[\d\s-]{8,20}$/.test(v) || enviando) {
      setError('Escribe un número válido, por ejemplo +56 9 1234 5678.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await postear('whatsapp', v);
      actualizar((s) => ({ ...s, dejoWa: true, msgs: [...s.msgs, { de: 'bot', texto: 'Listo, te escribo por WhatsApp a ese número.' }] }));
      registrarEvento('chat', { detalle: 'dejó su WhatsApp en el chat' });
    } catch {
      setError('No se pudo enviar. Prueba de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const abajo = enCurso
    ? 'bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] md:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]'
    : 'bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]';

  return (
    <div
      data-sin-rastreo
      className={`fixed z-[9999] right-4 sm:right-6 ${abajo} flex flex-col items-end gap-3 transition-opacity duration-300 ${
        visible || abierto ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {abierto && (
        <section
          role="dialog"
          aria-label="Chat con el asistente de Álvaro"
          className="flex w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b2a] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          style={{ maxHeight: 'min(32rem, calc(100dvh - 9rem))' }}
        >
          <header className="flex items-center gap-3 border-b border-white/10 bg-[#13263b] px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chat/chibi-loop.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-[#162a44]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Asistente de Álvaro</p>
              <p className="text-xs text-slate-400">Preguntas al tiro · lo demás, en vivo</p>
            </div>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar chat" className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={lista} data-lenis-prevent className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
            {estado.msgs.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-snug ${
                  m.de === 'yo' ? 'ml-auto bg-[#2175a1] text-white' : 'bg-white/[0.06] text-slate-200'
                }`}
              >
                {m.texto}
              </p>
            ))}
            {preguntas.some((p) => !yaPreguntadas.has(p.p)) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {preguntas
                  .filter((p) => !yaPreguntadas.has(p.p))
                  .map((p) => (
                    <button
                      key={p.p}
                      type="button"
                      onClick={() => preguntar(p)}
                      className="rounded-full border border-[#5fb2dd]/40 px-3 py-1.5 text-left text-xs text-[#9fd3ef] hover:bg-[#5fb2dd]/10"
                    >
                      {p.p}
                    </button>
                  ))}
              </div>
            )}
            {estado.pidioWa && !estado.dejoWa && (
              <form onSubmit={enviarWa} className="space-y-2 rounded-2xl bg-white/[0.06] p-3">
                <p className="text-sm text-slate-200">Déjame tu WhatsApp y te respondo por ahí.</p>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    inputMode="tel"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    aria-label="Tu WhatsApp"
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a1522] px-3 py-2 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
                  />
                  <button type="submit" disabled={enviando} className="rounded-xl bg-[#2175a1] px-3 text-sm font-medium text-white disabled:opacity-50">
                    Enviar
                  </button>
                </div>
              </form>
            )}
          </div>

          <form onSubmit={enviar} className="flex items-center gap-2 border-t border-white/10 px-3 py-3">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={600}
              placeholder="Escribe tu pregunta…"
              aria-label="Tu mensaje"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a1522] px-3 py-2 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
            />
            <button type="submit" disabled={enviando || !texto.trim()} aria-label="Enviar" className="rounded-xl bg-[#2175a1] p-2.5 text-white disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </form>
          {error && <p className="px-4 pb-3 text-xs text-red-300">{error}</p>}
        </section>
      )}

      {!abierto && saludo && (
        <div className="relative max-w-[15rem] rounded-2xl rounded-br-sm border border-white/10 bg-[#13263b] px-4 py-3 text-sm text-white shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
          <button type="button" onClick={abrir} className="text-left">
            Hola, ¿tienes dudas? 👋
          </button>
          <button
            type="button"
            onClick={() => setSaludo(false)}
            aria-label="Cerrar saludo"
            className="absolute -left-2 -top-2 rounded-full border border-white/10 bg-[#0d1b2a] p-0.5 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {!abierto && (
        <button
          type="button"
          onClick={abrir}
          aria-label="Abrir chat: ¿tienes dudas?"
          className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#5fb2dd]/60 bg-[#162a44] shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 touch-manipulation"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chat/chibi.webp" alt="" width={56} height={56} className="h-full w-full object-cover" />
        </button>
      )}
    </div>
  );
}
