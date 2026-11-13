'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, Copy, Download, ExternalLink, LayoutDashboard, Pencil, PlayCircle } from 'lucide-react';
import { PASOS, PREGUNTAS_TRAMPA, TEXTOS, type Esqueleto } from '@/lib/productos/esqueleto/datos';
import { completitud, generarEsqueleto, textoDescarga, type Semaforo } from '@/lib/productos/esqueleto/estructura';
import { LINKS } from '@/lib/productos/links';
import { CURSO, textoPrecio } from '@/lib/productos/curso/curso';
import SiguientePaso from '../SiguientePaso';
import { botonPrimario, botonSecundario } from './ui';

function empujar(event: string) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event });
  } catch {
    /* sin analítica no se rompe nada */
  }
}

const VENTANA_LANZAMIENTO_MS = 48 * 60 * 60 * 1000;

const COLOR: Record<Semaforo, { punto: string; texto: string; etiqueta: string }> = {
  verde: { punto: 'bg-emerald-400', texto: 'text-emerald-300', etiqueta: 'Completo' },
  amarillo: { punto: 'bg-orange-400', texto: 'text-orange-300', etiqueta: 'A medias' },
  rojo: { punto: 'bg-red-500', texto: 'text-red-300', etiqueta: 'Falta' },
};

async function copiarTexto(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function BotonCopiar({ texto, etiqueta, clase }: { texto: string; etiqueta: string; clase: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      className={clase}
      onClick={async () => {
        if (await copiarTexto(texto)) {
          setCopiado(true);
          window.setTimeout(() => setCopiado(false), 2000);
        }
      }}
    >
      {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copiado ? 'Copiado' : etiqueta}
    </button>
  );
}

function tiempoRestante(terminadaEn: number | null, ahora: number) {
  if (!terminadaEn) return null;
  const resta = terminadaEn + VENTANA_LANZAMIENTO_MS - ahora;
  if (resta <= 0) return null;
  const h = Math.floor(resta / 3_600_000);
  const m = Math.floor((resta % 3_600_000) / 60_000);
  return `${h} h ${m} min`;
}

export default function Resultado({
  esqueleto,
  terminadoEn,
  irAPaso,
}: {
  esqueleto: Esqueleto;
  terminadoEn: number | null;
  irAPaso: (n: number) => void;
}) {
  const texto = generarEsqueleto(esqueleto);
  const sem = completitud(esqueleto);
  const [probando, setProbando] = useState(false);
  const [ahora, setAhora] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setAhora(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const descargar = () => {
    const blob = new Blob([textoDescarga(esqueleto)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const base = (esqueleto.negocio.trim() || 'mi-negocio')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    a.href = url;
    a.download = `esqueleto-asistente-${base || 'mi-negocio'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-10">
      {/* Semáforo */}
      <section aria-labelledby="sem-titulo">
        <h3 id="sem-titulo" className="font-serif text-2xl text-white">
          ¿Qué tan completo está tu esqueleto?
        </h3>
        <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
          {PASOS.map((b) => {
            const c = COLOR[sem[b.n]];
            return (
              <li key={b.n} className="flex min-h-[56px] items-center gap-3 px-4 py-2">
                <span className={`h-3 w-3 shrink-0 rounded-full ${c.punto}`} aria-hidden />
                <span className="min-w-0 flex-1 text-sm text-slate-200">
                  <span className="text-slate-500">Paso {b.n} ·</span> {b.etiqueta}
                  <span className={`ml-2 text-xs ${c.texto}`}>{c.etiqueta}</span>
                </span>
                {sem[b.n] !== 'verde' ? (
                  <button
                    type="button"
                    onClick={() => irAPaso(b.n)}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm text-white hover:border-[#5fb2dd]"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Completar
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Prompt */}
      <section aria-labelledby="esqueleto-titulo">
        <h3 id="esqueleto-titulo" className="font-serif text-2xl text-white">
          El esqueleto de tu asistente
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Es lo que tu asistente tiene que saber, escrito con tus datos: qué responde, qué nunca promete y cuándo te avisa. Antes de
          conectarlo a tu WhatsApp, pruébalo gratis en Claude o ChatGPT: son chats parecidos a WhatsApp donde pegas este texto y le
          escribes como si fueras un cliente.
        </p>
        <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-slate-200 sm:p-5">
          {texto}
        </pre>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BotonCopiar texto={texto} etiqueta="Copiar el esqueleto" clase={botonPrimario} />
          <button type="button" onClick={descargar} className={botonSecundario}>
            <Download className="h-4 w-4" /> Descargar
          </button>
          <a
            href="https://claude.ai/new"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void copiarTexto(texto);
              setProbando(true);
            }}
            className={botonSecundario}
          >
            <ExternalLink className="h-4 w-4" /> Probarlo gratis en Claude
          </a>
        </div>
      </section>

      {/* Preguntas trampa */}
      {probando ? (
        <section aria-labelledby="trampa-titulo" className="rounded-2xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.05] p-4 sm:p-6">
          <h3 id="trampa-titulo" className="font-serif text-2xl text-white">
            Las 5 preguntas trampa
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Tu esqueleto ya quedó copiado. En la pestaña de Claude, pégalo como primer mensaje y envíalo (si te pide crear una cuenta, es
            gratis; también sirve ChatGPT). Desde ahí te responde como lo haría tu asistente: copia estas preguntas una a una y revisa qué
            contesta.
          </p>
          <ol className="mt-4 space-y-3">
            {PREGUNTAS_TRAMPA.map((p, i) => (
              <li key={p.pregunta} className="rounded-xl border border-white/10 bg-[#0f172a]/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-base text-white">
                    <span className="mr-1 text-[#5fb2dd]">{i + 1}.</span> «{p.pregunta}»
                  </p>
                  <BotonCopiar
                    texto={p.pregunta}
                    etiqueta="Copiar"
                    clase="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 text-sm text-white hover:border-[#5fb2dd]"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-slate-500">Lo esperado:</span> {p.esperado}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Si falla, refuerza el{' '}
                  <button type="button" onClick={() => irAPaso(p.paso)} className="min-h-[44px] text-[#5fb2dd] underline underline-offset-2">
                    paso {p.paso} · {PASOS[p.paso - 1].etiqueta.toLowerCase()}
                  </button>
                  .
                </p>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <p className="text-sm text-slate-400">
          Al tocar «Probarlo gratis en Claude» se abre Claude en otra pestaña con tu esqueleto ya copiado, y aquí te aparecen 5 preguntas
          trampa para probarlo antes de usarlo con clientes.
        </p>
      )}

      {/* Puente al WhatsApp (análisis UX «Rodrigo», 8-nov-2026): el dueño quería que le contestaran el WhatsApp y el
          resultado terminaba en «pégalo en Claude». Aquí se explica el paso que falta y se ofrecen dos caminos. */}
      <section aria-labelledby="puente-titulo" className="rounded-2xl border border-[#2175a1] bg-[#2175a1]/15 p-5 sm:p-6">
        <h3 id="puente-titulo" className="font-serif text-2xl leading-tight text-white">
          ¿Lo quieres funcionando en tu WhatsApp?
        </h3>
        <p className="mt-2 text-base text-slate-200">
          Este texto es lo que tu asistente necesita saber. Para que conteste solo en tu WhatsApp hay que conectarlo, y eso lo hace
          Fidelidapp: le cargas este mismo texto y responde por ti en tu número, desde $40.000 + IVA al mes. En 30 minutos lo
          dejamos conectado contigo y vemos si te conviene.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={LINKS.agendar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => empujar('esqueleto_click_agendar')}
            className={botonPrimario}
          >
            <CalendarDays className="h-4 w-4" /> Conectarlo a mi WhatsApp (30 min)
          </a>
          <a
            href={LINKS.fidelidappWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => empujar('esqueleto_click_fidelidapp')}
            className={botonSecundario}
          >
            <ExternalLink className="h-4 w-4" /> Ver Fidelidapp
          </a>
          <a href={LINKS.workshopGrabacion} onClick={() => empujar('esqueleto_click_grabacion')} className={botonSecundario}>
            <PlayCircle className="h-4 w-4" /> Ver la grabación gratis
          </a>
        </div>
      </section>

      {/* Segundo paso: la Guía, con su puente (de responder bien a que te escriban más clientes). */}
      <SiguientePaso
        logro="Ya armaste el esqueleto de tu asistente"
        pago={{
          titulo: TEXTOS.cierreTitulo,
          descripcion: `${TEXTOS.cierreGuia} $14.990, pago único, con garantía de 7 días.`,
          href: LINKS.guiaVenta,
          cta: 'Ver la guía',
          evento: 'esqueleto_click_guia',
        }}
        gratis={[
          {
            titulo: 'Trabájalo en vivo en el próximo workshop',
            descripcion: 'Trae tu esqueleto y lo revisamos juntos. 45 minutos, gratis.',
            href: LINKS.workshop,
            cta: 'Inscribirme',
            evento: 'esqueleto_click_workshop',
          },
        ]}
      />

      {/* Tercer peldaño (9-nov-2026): el curso, para quien quiere ordenar el negocio entero y no solo el WhatsApp. */}
      <section aria-labelledby="curso-titulo" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">
          <LayoutDashboard className="h-4 w-4" aria-hidden /> Cuando quieras ordenar todo el negocio
        </p>
        <h3 id="curso-titulo" className="mt-2 font-serif text-2xl leading-tight text-white">
          {CURSO.nombre}: {CURSO.apellido.charAt(0).toLowerCase() + CURSO.apellido.slice(1)}
        </h3>
        <p className="mt-2 text-base text-slate-300">
          Clientes, ventas, pedidos, cobranza y caja en una sola planilla, un módulo por semana. Tu asistente responde mejor cuando lo
          que sabe sale de ahí. {textoPrecio()}.
        </p>
        <Link href={LINKS.curso} onClick={() => empujar('esqueleto_click_curso')} className={`${botonSecundario} mt-5`}>
          Ver el curso <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
