'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  Check,
  ClipboardList,
  Landmark,
  Mail,
  Megaphone,
  MessageCircle,
  PencilLine,
  Send,
  UserSearch,
  Workflow,
  X,
} from 'lucide-react';
import { DISCOVERY_CALL_URL } from '@/lib/scheduling';
import { NOTA_IVA, PRECIOS_AGENTES, uf } from '@/lib/precios';
import {
  LICENCIAS,
  PERSONAS,
  TRABAJOS,
  USOS,
  etiqueta,
  trabajo,
  type LicenciaId,
  type PersonasId,
  type TrabajoId,
  type UsoId,
} from '@/lib/productos/cotizador/datos';
import { enviarCotizacion, paso } from '@/lib/productos/cotizador/enviar';
import { reintentarPendientes } from '@/lib/productos/leads';
import { Pantallita } from '@/components/productos/Pantallita';
import { botonPrimario, botonSecundario, claseInput } from '@/components/productos/esqueleto/ui';

/*
 * /cotizador — «Cotiza tu agente» (borrador 12-nov-2026, solo preview). Vende el servicio de agentes con una
 * herramienta que te arma algo (como /esqueleto) en vez de una página para leer.
 * Pasos: 1) elegir trabajos (tarjetas, más de una) → 2) tres preguntas de un toque → 3) la cotización en pantalla,
 * sin pedir correo. Acciones: agendar 30 min (DISCOVERY_CALL_URL, la misma de /agentes) o «Mándame esta cotización».
 * Slack: cada avance va al hilo de la visita como «🧭 cotizador · …» (lib/productos/cotizador/enviar.ts). Los botones
 * de la herramienta llevan data-sin-rastreo para no duplicar el clic genérico de Rastreo.
 */

const ICONO: Record<TrabajoId, typeof Landmark> = {
  licitaciones: Landmark,
  prospeccion: UserSearch,
  marketing: Megaphone,
  whatsapp: MessageCircle,
  correo: Mail,
  administracion: ClipboardList,
  operacion: Workflow,
  otro: PencilLine,
};

type Etapa = 'trabajos' | 'preguntas' | 'resultado';
type Estado = {
  elegidos: TrabajoId[];
  otro: string;
  personas: PersonasId | null;
  usos: UsoId[];
  licencia: LicenciaId | null;
};
const CLAVE = 'vl_cotizador';
const vacio: Estado = { elegidos: [], otro: '', personas: null, usos: [], licencia: null };

function leer(): Estado {
  try {
    const raw = sessionStorage.getItem(CLAVE);
    if (raw) return { ...vacio, ...(JSON.parse(raw) as Estado) };
  } catch {
    /* sin almacenamiento */
  }
  return vacio;
}

const nombres = (ids: TrabajoId[]) => ids.map((id) => trabajo(id).nombre).join(', ');
const lista = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}`);

function Chip({ activa, onClick, children, rol = 'radio' }: { activa: boolean; onClick: () => void; children: React.ReactNode; rol?: 'radio' | 'checkbox' }) {
  return (
    <button
      type="button"
      role={rol}
      aria-checked={activa}
      onClick={onClick}
      className={`flex min-h-[52px] items-center justify-center gap-1.5 rounded-2xl border px-2 text-base font-medium transition ${
        activa ? 'border-[#5fb2dd] bg-[#2175a1]/30 text-white' : 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30'
      }`}
    >
      {activa && rol === 'checkbox' ? <Check className="h-4 w-4 shrink-0 text-[#5fb2dd]" /> : null}
      {children}
    </button>
  );
}

function Ejemplo({ id, cerrar, otro, setOtro }: { id: TrabajoId; cerrar: () => void; otro: string; setOtro: (v: string) => void }) {
  const t = trabajo(id);
  if (id === 'otro') {
    return (
      <div className="col-span-2 rounded-2xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.06] p-4">
        <label htmlFor="cot-otro" className="text-base font-medium text-white">
          Cuéntame qué tarea se repite en tu negocio
        </label>
        <textarea
          id="cot-otro"
          rows={3}
          value={otro}
          onChange={(e) => setOtro(e.target.value.slice(0, 300))}
          placeholder="Ej.: cada lunes paso a mano los pedidos de la semana a una planilla"
          className={`${claseInput} mt-2`}
        />
      </div>
    );
  }
  return (
    <div className="col-span-2" aria-live="polite">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-white">Cada día:</span> {t.diario}
        </p>
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar ejemplo"
          className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <Pantallita titulo={`Ejemplo · ${t.nombre}`}>
        <div className="space-y-2 text-sm leading-snug">
          {t.ejemplo.map((l, i) => (
            <p
              key={i}
              className={`whitespace-pre-line rounded-xl px-3 py-2 ${
                l.de === 'cliente'
                  ? 'mr-8 bg-[#e2e8f0]'
                  : l.de === 'nota'
                    ? 'border border-dashed border-[#94a3b8] bg-[#fff7ed]'
                    : 'ml-4 bg-[#dbeafe]'
              }`}
            >
              {l.de === 'cliente' ? <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#475569]">Cliente</span> : null}
              {l.de === 'agente' && i === 0 ? <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#1d5f85]">Tu agente</span> : null}
              {l.texto}
            </p>
          ))}
        </div>
      </Pantallita>
      <p className="mt-2 text-xs text-slate-500">Mensaje de ejemplo, no es un caso real.</p>
    </div>
  );
}

export default function CotizadorApp() {
  const [e, setE] = useState<Estado>(vacio);
  const [etapa, setEtapa] = useState<Etapa>('trabajos');
  const [abierto, setAbierto] = useState<TrabajoId | null>(null);
  const [form, setForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const arriba = useRef<HTMLDivElement>(null);
  const iniciado = useRef(false);

  useEffect(() => {
    // Lo guardado en la sesión se lee después de hidratar (en el servidor no hay sessionStorage).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setE(leer());
    void reintentarPendientes();
  }, []);

  const cambiar = (f: (x: Estado) => Estado) =>
    setE((prev) => {
      const n = f(prev);
      try {
        sessionStorage.setItem(CLAVE, JSON.stringify(n));
      } catch {
        /* sin almacenamiento */
      }
      return n;
    });

  const ir = (x: Etapa) => {
    setEtapa(x);
    requestAnimationFrame(() => arriba.current?.scrollIntoView({ behavior: 'auto', block: 'start' }));
  };

  const tocarTrabajo = (id: TrabajoId) => {
    const ya = e.elegidos.includes(id);
    if (!iniciado.current) {
      iniciado.current = true;
      paso('empezó', 'cotizador_inicio');
    }
    cambiar((x) => ({ ...x, elegidos: ya ? x.elegidos.filter((y) => y !== id) : [...x.elegidos, id] }));
    if (ya) {
      if (abierto === id) setAbierto(null);
    } else {
      setAbierto(id);
      paso(`eligió «${trabajo(id).nombre}»`, 'cotizador_trabajo', { cotizador_trabajo: id });
    }
  };

  const seguir = () => {
    paso(`pasó a las preguntas con ${nombres(e.elegidos)}`, 'cotizador_paso', { cotizador_paso_numero: 2 });
    ir('preguntas');
  };

  const verCotizacion = () => {
    const resumen = `${nombres(e.elegidos)} · ${etiqueta(PERSONAS, e.personas)} personas · usa ${e.usos.map((u) => etiqueta(USOS, u)).join('/')} · licencia: ${etiqueta(LICENCIAS, e.licencia)}`;
    paso(`llegó a su cotización · ${resumen}`, 'cotizador_resultado');
    ir('resultado');
  };

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    const tel = whatsapp.replace(/[^\d+]/g, '');
    const correoOk = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(correo.trim());
    if (!nombre.trim()) return setError('Escribe tu nombre.');
    if (!correo.trim() && !tel) return setError('Déjame tu WhatsApp o tu correo (uno de los dos basta).');
    if (correo.trim() && !correoOk) return setError('Revisa el correo, parece que le falta algo.');
    if (!correo.trim() && tel.replace(/\D/g, '').length < 8) return setError('Revisa el WhatsApp, parece que le faltan números.');
    setEnviando(true);
    const detalles: Record<string, string> = {
      trabajos: nombres(e.elegidos),
      equipo: `${etiqueta(PERSONAS, e.personas)} personas · usa ${e.usos.map((u) => etiqueta(USOS, u)).join('/')} · licencia ${etiqueta(LICENCIAS, e.licencia)}`,
    };
    if (e.otro.trim()) detalles.otro = e.otro.trim().slice(0, 120);
    detalles.personas = e.personas ?? '';
    detalles.usa = e.usos.join('-');
    detalles.licencia = e.licencia ?? '';
    for (const id of e.elegidos) detalles[`agente-${id}`] = 'si';
    await enviarCotizacion({ nombre: nombre.trim(), correo: correo.trim(), whatsapp: tel, detalles });
    setEnviando(false);
    setEnviado(true);
  };

  const listoPreguntas = Boolean(e.personas && e.licencia && e.usos.length);
  const varios = e.elegidos.filter((id) => id !== 'otro').length > 1;
  const soloOtro = e.elegidos.length === 1 && e.elegidos[0] === 'otro';

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-200" aria-label="Cotiza tu agente" data-sin-rastreo>
      <div ref={arriba} className="relative mx-auto max-w-3xl scroll-mt-20 px-4 pb-32 pt-[5.25rem] sm:px-6 md:pt-32">
        {etapa === 'trabajos' && (
          <section aria-labelledby="cot-h1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5fb2dd]">Cotiza tu agente · gratis</p>
            <h1 id="cot-h1" className="mt-2 font-serif text-[1.7rem] leading-[1.15] text-white sm:text-4xl">
              ¿Qué trabajo le pasarías a un agente?
            </h1>
            <p className="mt-2 text-[0.95rem] leading-snug text-slate-300 sm:text-lg">
              Toca uno o más. Te muestro qué haría cada día y cuánto cuesta, sin pedirte el correo.
            </p>

            <div className="mt-4 grid grid-flow-row-dense grid-cols-2 gap-2 sm:gap-3" role="group" aria-label="Trabajos para tu agente">
              {TRABAJOS.map((t) => {
                const Icono = ICONO[t.id];
                const activo = e.elegidos.includes(t.id);
                return [
                  <button
                    key={t.id}
                    type="button"
                    role="checkbox"
                    aria-checked={activo}
                    onClick={() => tocarTrabajo(t.id)}
                    className={`relative flex min-h-[108px] flex-col items-start rounded-2xl border p-3 text-left transition ${
                      activo ? 'border-[#5fb2dd] bg-[#2175a1]/25' : 'border-white/12 bg-white/[0.03] hover:border-white/30'
                    }`}
                  >
                    <span className="flex w-full items-center justify-between">
                      <Icono className={`h-5 w-5 ${activo ? 'text-white' : 'text-[#5fb2dd]'}`} aria-hidden="true" />
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${activo ? 'border-[#5fb2dd] bg-[#2175a1]' : 'border-white/30'}`}
                        aria-hidden="true"
                      >
                        {activo ? <Check className="h-3.5 w-3.5 text-white" /> : null}
                      </span>
                    </span>
                    <span className="mt-2 text-[0.95rem] font-semibold leading-tight text-white">{t.nombre}</span>
                    <span className="mt-1 text-[0.8rem] leading-snug text-slate-400">{t.corto}</span>
                  </button>,
                  abierto === t.id && activo ? (
                    <Ejemplo
                      key={`${t.id}-ej`}
                      id={t.id}
                      cerrar={() => setAbierto(null)}
                      otro={e.otro}
                      setOtro={(v) => cambiar((x) => ({ ...x, otro: v }))}
                    />
                  ) : null,
                ];
              })}
            </div>
            <p className="mt-5 text-sm text-slate-400">Uso agentes como estos en mis propios negocios, todos los días. — Álvaro Villena</p>
          </section>
        )}

        {etapa === 'preguntas' && (
          <section aria-labelledby="cot-h1-p">
            <button type="button" onClick={() => ir('trabajos')} className="-ml-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-2 text-sm text-[#5fb2dd]">
              <ArrowLeft className="h-4 w-4" /> Cambiar trabajos
            </button>
            <p className="mt-2 text-sm text-[#5fb2dd]">Paso 2 de 3 · {nombres(e.elegidos)}</p>
            <h1 id="cot-h1-p" className="mt-2 font-serif text-[1.7rem] leading-tight text-white sm:text-4xl">
              Tres preguntas y listo.
            </h1>

            <div className="mt-6 space-y-7">
              <div role="radiogroup" aria-labelledby="q-personas">
                <p id="q-personas" className="text-base font-medium text-white">¿Cuántas personas son en tu negocio?</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {PERSONAS.map((o) => (
                    <Chip key={o.id} activa={e.personas === o.id} onClick={() => cambiar((x) => ({ ...x, personas: o.id }))}>
                      {o.etiqueta}
                    </Chip>
                  ))}
                </div>
              </div>

              <div role="group" aria-labelledby="q-usos">
                <p id="q-usos" className="text-base font-medium text-white">¿Qué usan hoy para trabajar?</p>
                <p className="text-sm text-slate-400">Puedes marcar varios.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {USOS.map((o) => {
                    const activa = e.usos.includes(o.id);
                    return (
                      <Chip
                        key={o.id}
                        rol="checkbox"
                        activa={activa}
                        onClick={() => cambiar((x) => ({ ...x, usos: activa ? x.usos.filter((u) => u !== o.id) : [...x.usos, o.id] }))}
                      >
                        {o.etiqueta}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              <div role="radiogroup" aria-labelledby="q-licencia">
                <p id="q-licencia" className="text-base font-medium text-white">¿Ya tienen licencia de Claude?</p>
                <p className="text-sm text-slate-400">Claude es el asistente de inteligencia artificial con el que funcionan los agentes.</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {LICENCIAS.map((o) => (
                    <Chip key={o.id} activa={e.licencia === o.id} onClick={() => cambiar((x) => ({ ...x, licencia: o.id }))}>
                      {o.etiqueta}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {etapa === 'resultado' && (
          <section aria-labelledby="cot-h1-r">
            <button type="button" onClick={() => ir('preguntas')} className="-ml-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-2 text-sm text-[#5fb2dd]">
              <ArrowLeft className="h-4 w-4" /> Cambiar respuestas
            </button>
            <h1 id="cot-h1-r" className="mt-2 font-serif text-[1.9rem] leading-tight text-white sm:text-4xl">
              Tu cotización
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {etiqueta(PERSONAS, e.personas)} personas · usan {lista(e.usos.map((u) => etiqueta(USOS, u).toLowerCase()))}
            </p>

            <ul className="mt-5 space-y-2">
              {e.elegidos.map((id) => {
                const t = trabajo(id);
                const Icono = ICONO[id];
                return (
                  <li key={id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <Icono className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-white">Agente de {t.nombre.toLowerCase()}</p>
                      <p className="text-sm text-slate-300">{id === 'otro' && e.otro.trim() ? `«${e.otro.trim()}». En la reunión vemos si un agente tiene sentido para eso.` : id === 'otro' ? t.diario : `Cada día: ${t.diario.charAt(0).toLowerCase()}${t.diario.slice(1)}`}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 rounded-3xl border border-[#5fb2dd]/40 bg-[#2175a1]/[0.12] p-4 sm:p-6">
              <dl className="divide-y divide-white/10">
                <div className="flex items-baseline justify-between gap-3 pb-3">
                  <dt className="text-slate-200">Reunión de 30 min</dt>
                  <dd className="text-right text-lg font-semibold text-white">Gratis</dd>
                </div>
                <div className="py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-slate-200">Implementación <span className="text-sm text-slate-400">(una vez)</span></dt>
                    <dd className="text-right text-lg font-semibold text-white">desde {uf(PRECIOS_AGENTES.implementacionUF)}</dd>
                  </div>
                  {varios ? (
                    <p className="mt-1 text-sm text-slate-300">El valor final por varios agentes lo vemos en la reunión.</p>
                  ) : soloOtro ? (
                    <p className="mt-1 text-sm text-slate-300">Para tu caso, el valor lo vemos en la reunión.</p>
                  ) : null}
                </div>
                <div className="pt-3">
                  <dt className="text-slate-200">Mantenimiento mensual</dt>
                  <dd className="mt-2 space-y-2">
                    <p className={`flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 ${e.licencia === 'si' ? 'bg-white/10 ring-1 ring-[#5fb2dd]' : ''}`}>
                      <span className="text-sm text-slate-300">Con tu licencia de Claude</span>
                      <span className="font-semibold text-white">{uf(PRECIOS_AGENTES.mantenimientoUF)}/mes</span>
                    </p>
                    <p className={`flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 ${e.licencia === 'no' ? 'bg-white/10 ring-1 ring-[#5fb2dd]' : ''}`}>
                      <span className="text-sm text-slate-300">Licencia incluida (la ponemos nosotros)</span>
                      <span className="shrink-0 font-semibold text-white">{uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)}/mes</span>
                    </p>
                    {e.licencia === 'nose' ? <p className="px-3 text-sm text-slate-400">Si no sabes si tienen licencia, lo vemos en la reunión.</p> : null}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-slate-400">{NOTA_IVA.es}</p>
            </div>

            {e.usos.some((u) => u !== 'otro') ? (
              <p className="mt-4 text-sm text-slate-300">
                El agente trabaja con lo que ya usas ({lista(e.usos.filter((u) => u !== 'otro').map((u) => etiqueta(USOS, u).toLowerCase()))}). En la reunión vemos cómo
                conectarlo.
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="cotizador_resultado"
                onClick={() => paso('tocó «Agendar 30 min gratis»', 'cotizador_click_agendar')}
                className={botonPrimario}
              >
                <Calendar className="h-5 w-5" /> Agendar 30 min gratis
              </a>
              <p className="text-center text-sm text-slate-400">Videollamada con Álvaro. Sin compromiso.</p>
              {!form && !enviado ? (
                <button
                  type="button"
                  onClick={() => {
                    setForm(true);
                    paso('abrió «Mándame esta cotización»');
                  }}
                  className={botonSecundario}
                >
                  <Send className="h-4 w-4" /> Mándame esta cotización
                </button>
              ) : null}
            </div>

            {form && !enviado ? (
              <form onSubmit={enviar} className="mt-5 space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4" noValidate>
                <p className="text-base font-medium text-white">¿A dónde te la mando?</p>
                <div>
                  <label htmlFor="cot-nombre" className="text-sm text-slate-300">Tu nombre</label>
                  <input id="cot-nombre" autoComplete="name" value={nombre} onChange={(x) => setNombre(x.target.value)} className={`${claseInput} mt-1`} />
                </div>
                <div>
                  <label htmlFor="cot-wa" className="text-sm text-slate-300">WhatsApp</label>
                  <input
                    id="cot-wa"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+56 9 1234 5678"
                    value={whatsapp}
                    onChange={(x) => setWhatsapp(x.target.value)}
                    className={`${claseInput} mt-1`}
                  />
                </div>
                <div>
                  <label htmlFor="cot-correo" className="text-sm text-slate-300">o tu correo</label>
                  <input
                    id="cot-correo"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={correo}
                    onChange={(x) => setCorreo(x.target.value)}
                    className={`${claseInput} mt-1`}
                  />
                </div>
                <p className="text-xs text-slate-500">Uno de los dos basta. Solo lo uso para mandarte tu cotización.</p>
                {error ? (
                  <p role="alert" className="text-sm text-[#ff8fb9]">
                    {error}
                  </p>
                ) : null}
                <button type="submit" disabled={enviando} className={`${botonPrimario} w-full`}>
                  {enviando ? 'Enviando…' : 'Mándamela'}
                </button>
              </form>
            ) : null}

            {enviado ? (
              <div role="status" className="mt-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.07] p-4">
                <p className="flex items-center gap-2 font-medium text-emerald-200">
                  <Check className="h-5 w-5" /> Listo, {nombre.trim().split(' ')[0]}.
                </p>
                <p className="mt-1 text-sm text-emerald-100/90">Quedó guardada. Álvaro te la manda por {whatsapp && !correo ? 'WhatsApp' : correo && !whatsapp ? 'correo' : 'WhatsApp o correo'}.</p>
              </div>
            ) : null}

            <p className="mt-8 flex items-start gap-2 text-sm text-slate-400">
              <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0" /> Uso agentes como estos en mis propios negocios, todos los días. Lo que compromete plata, alcance o
              fechas, el agente te lo pregunta antes. — Álvaro Villena
            </p>
          </section>
        )}
      </div>

      {/* Barra fija abajo: aparece al elegir el primer trabajo (paso 1) y cuando las 3 preguntas están listas (paso 2). */}
      {(etapa === 'trabajos' && e.elegidos.length > 0) || etapa === 'preguntas' ? (
        <div className="fixed inset-x-0 bottom-0 z-[9990] border-t border-white/10 bg-[#0f172a]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            {etapa === 'trabajos' ? (
              <button type="button" onClick={seguir} className={`${botonPrimario} w-full`}>
                Seguir · {e.elegidos.length === 1 ? '1 elegido' : `${e.elegidos.length} elegidos`} <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button type="button" onClick={verCotizacion} disabled={!listoPreguntas} className={`${botonPrimario} w-full`}>
                Ver mi cotización <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
