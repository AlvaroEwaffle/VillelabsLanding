'use client';

// Regalo del video largo de YouTube y del live (Álvaro, audio WA 9-nov-2026):
// 1 mes gratis de Fidelidapp, solo el módulo de conexión a WhatsApp, válido hasta el 31-dic-2026.
// El lead queda en Fidelidapp (cuenta «Alvaro Villena», etiqueta producto:regalo-fidelidapp) y avisa a Slack.

import { useState } from 'react';
import { CheckCircle2, Gift, MessageCircle } from 'lucide-react';
import { registrarLead } from '@/lib/productos/leads';
import { LINKS } from '@/lib/productos/links';

type Datos = { nombre: string; negocio: string; correo: string; whatsapp: string; origen: string };
const VACIO: Datos = { nombre: '', negocio: '', correo: '', whatsapp: '', origen: 'video' };

const campo =
  'mt-1.5 block min-h-[48px] w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none focus:ring-2 focus:ring-[#5fb2dd]/30';

export const REGALO_VENCE = new Date('2026-12-31T23:59:59-03:00');

export default function RegaloFidelidapp() {
  const [datos, setDatos] = useState<Datos>(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  // Inicializador perezoso: se evalúa una vez al montar (en el build estático sale «vigente»).
  const [vencido] = useState(() => Date.now() > REGALO_VENCE.getTime());

  const set = (k: keyof Datos) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDatos((d) => ({ ...d, [k]: e.target.value }));

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    await registrarLead({
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
      whatsapp: datos.whatsapp.trim(),
      producto: 'regalo-fidelidapp',
      detalles: { negocio: datos.negocio.trim(), origen: datos.origen, regalo: 'mes-gratis-whatsapp' },
    });
    if (typeof window !== 'undefined') {
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      (w.dataLayer = w.dataLayer ?? []).push({ event: 'regalo_fidelidapp', origen: datos.origen });
    }
    setEnviando(false);
    setListo(true);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#FF3D8B]/40 bg-[#FF3D8B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ff8fbd]">
          <Gift className="h-3.5 w-3.5" aria-hidden /> Solo para quienes vieron el video
        </p>
        <h1 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
          Un mes gratis para que tu agente responda solo en tu WhatsApp
        </h1>
        <p className="mt-4 text-slate-300">
          Te regalo un mes de Fidelidapp con el módulo de conexión a WhatsApp, para que el agente que armaste en el video
          responda precios, stock y horarios por ti. Vale hasta el 31 de diciembre de 2026.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-300">
          <li>• Incluye solo el módulo de conexión a WhatsApp, por un mes.</li>
          <li>• Un regalo por negocio. Te escribimos para dejarlo funcionando contigo.</li>
          <li>• ¿Aún no armas tu agente? Parte por el{' '}
            <a href={LINKS.esqueleto} className="text-[#5fb2dd] underline underline-offset-2">esqueleto gratis</a>.
          </li>
        </ul>

        {vencido ? (
          <p className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-slate-300">
            Este regalo ya terminó. Si quieres conectar tu agente a WhatsApp, escríbenos y lo vemos.
          </p>
        ) : listo ? (
          <div className="mt-8 rounded-3xl border border-[#5fb2dd]/40 bg-[#2175a1]/[0.12] p-6" role="status" aria-live="polite">
            <CheckCircle2 className="h-8 w-8 text-[#5fb2dd]" aria-hidden />
            <h2 className="mt-3 font-serif text-2xl">¡Listo{datos.nombre ? `, ${datos.nombre.split(' ')[0]}` : ''}!</h2>
            <p className="mt-2 text-slate-300">
              Recibimos tu pedido. Te escribimos por WhatsApp para activar tu mes gratis y conectar tu número.
            </p>
          </div>
        ) : (
          <form onSubmit={enviar} className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <label className="block text-sm font-medium">
              Tu nombre
              <input required value={datos.nombre} onChange={set('nombre')} className={campo} autoComplete="name" />
            </label>
            <label className="block text-sm font-medium">
              Tu negocio
              <input required value={datos.negocio} onChange={set('negocio')} className={campo} placeholder="Ej: tostadora de café" />
            </label>
            <label className="block text-sm font-medium">
              Correo
              <input required type="email" value={datos.correo} onChange={set('correo')} className={campo} autoComplete="email" />
            </label>
            <label className="block text-sm font-medium">
              WhatsApp del negocio
              <input required type="tel" value={datos.whatsapp} onChange={set('whatsapp')} className={campo} placeholder="+56 9 1234 5678" autoComplete="tel" />
            </label>
            <label className="block text-sm font-medium">
              ¿Dónde lo viste?
              <select value={datos.origen} onChange={set('origen')} className={campo}>
                <option value="video">En el video de YouTube</option>
                <option value="live">En el live</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f] disabled:opacity-60"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> {enviando ? 'Enviando…' : 'Pedir mi mes gratis'}
            </button>
            <p className="text-xs text-slate-500">Usamos tus datos solo para activar el regalo y escribirte sobre él.</p>
          </form>
        )}
      </div>
    </main>
  );
}
