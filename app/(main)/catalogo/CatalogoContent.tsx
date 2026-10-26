'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check,
  FileText,
  Inbox,
  MessageCircle,
  RotateCcw,
  Search,
  Shield,
  Users,
  Compass,
} from 'lucide-react';
import { getLenis } from '@/lib/lenis';

/*
 * Catálogo Villelabs: espejo de ewaffle.cl/catalogo para la oferta de agentes.
 * Precios: SOLO los de VPM/Villelabs/pricing/price-book.json (USD, "desde").
 * Las demos son simulaciones en el navegador: no llaman a ningún sistema ni envían nada.
 */

const WHATSAPP = 'https://wa.me/56920115198';

const PRECIOS = {
  diagnostico: 2420,
  setup: 2420,
  operacion: 2960,
  cto: 3500,
  licenciaMin: 25,
  licenciaMax: 30,
};

const usd = (n: number) => `USD $${n.toLocaleString('es-CL')}`;

type DemoId = 'mapa' | 'bandeja' | 'propuesta' | 'calendario' | 'regla' | 'equipo';
const DEMOS: DemoId[] = ['mapa', 'bandeja', 'propuesta', 'calendario', 'regla', 'equipo'];

const SECCIONES = [
  { id: 'inicio', n: '00', label: 'Inicio' },
  { id: 'formatos', n: '01', label: 'Formatos' },
  { id: 'cotiza', n: '02', label: 'Cotiza acá' },
  { id: 'conversemos', n: '03', label: 'Conversemos' },
];

function irA(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  const offset = -(window.innerWidth >= 768 ? 140 : 124);
  if (lenis) lenis.scrollTo(el, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

/* ------------------------------------------------------------------ */

function DemoBox({ children, label = 'Demo · simulación en tu navegador, no envía nada' }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{label}</p>
      {children}
    </div>
  );
}

function Btn({ onClick, children, kind = 'primary', disabled }: { onClick: () => void; children: React.ReactNode; kind?: 'primary' | 'ghost'; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors touch-manipulation disabled:opacity-40 ${
        kind === 'primary' ? 'bg-accent text-white hover:bg-[#2a8bbd]' : 'border border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

/* 01 · Mapa rápido (asesoría) */
const TAREAS = [
  { t: 'Responder correos y consultas que se repiten', w: 'Bandeja de entrada' },
  { t: 'Armar propuestas o cotizaciones', w: 'Propuestas' },
  { t: 'Coordinar horarios entre varias agendas', w: 'Calendarios' },
  { t: 'Perseguir respuestas de clientes', w: 'Seguimientos' },
  { t: 'Juntar números para un reporte semanal', w: 'Reportes' },
  { t: 'Pasar datos de una planilla a otra', w: 'Reportes' },
];
function DemoMapa({ onTry }: { onTry: () => void }) {
  const [sel, setSel] = useState<number[]>([]);
  const toggle = (i: number) => {
    onTry();
    setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };
  const flujos = Array.from(new Set(sel.map((i) => TAREAS[i].w)));
  return (
    <DemoBox label="Pruébalo · marca lo que se come tu semana">
      <div className="grid gap-2 sm:grid-cols-2">
        {TAREAS.map((x, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`flex min-h-[48px] items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors touch-manipulation ${
              sel.includes(i) ? 'border-accent bg-accent/15 text-white' : 'border-white/10 text-slate-300 hover:border-white/25'
            }`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${sel.includes(i) ? 'border-accent bg-accent' : 'border-white/30'}`}>
              {sel.includes(i) ? <Check className="h-3.5 w-3.5 text-white" /> : null}
            </span>
            {x.t}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-950/60 p-4 text-sm text-slate-300">
        {flujos.length === 0 ? (
          'Marca una o más tareas y te muestro qué agente le corresponde a cada una.'
        ) : (
          <>
            <p className="text-white">
              {flujos.length === 1 ? 'Un agente podría tomar esto:' : `${flujos.length} agentes podrían tomar esto:`}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {flujos.map((f) => (
                <li key={f} className="rounded-full border border-accent/40 px-3 py-1 text-accent">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-slate-400">En el diagnóstico medimos cuánto tiempo se va en cada una y cuál conviene partir primero.</p>
          </>
        )}
      </div>
    </DemoBox>
  );
}

/* 02 · Bandeja de entrada */
const CORREOS = [
  { de: 'Camila · empresa de logística', asunto: '¿Hacen capacitaciones para 40 personas?', tipo: 'Posible cliente', color: 'text-emerald-300 border-emerald-400/40', borrador: 'Hola Camila, gracias por escribir. Sí trabajamos con equipos de ese tamaño. ¿Te acomoda una llamada de 30 minutos esta semana? Te dejo mi agenda.' },
  { de: 'Rodrigo · cliente actual', asunto: 'Cambio de fecha en la reunión del jueves', tipo: 'Cliente', color: 'text-sky-300 border-sky-400/40', borrador: 'Hola Rodrigo, sin problema. Te propongo el viernes a las 10:00 o a las 15:00. ¿Cuál te sirve?' },
  { de: 'Contabilidad', asunto: 'Factura pendiente de septiembre', tipo: 'Facturación', color: 'text-amber-300 border-amber-400/40', borrador: 'Lo dejo marcado para ti: involucra plata, así que no respondo solo.' },
  { de: 'Newsletter', asunto: '10 tendencias que no te puedes perder', tipo: 'Ruido', color: 'text-slate-400 border-white/15', borrador: 'Archivado. No necesita respuesta.' },
];
function DemoBandeja({ onTry }: { onTry: () => void }) {
  const [paso, setPaso] = useState(0);
  const [abierto, setAbierto] = useState<number | null>(null);
  useEffect(() => {
    if (paso === 0 || paso > CORREOS.length) return;
    const t = setTimeout(() => setPaso((p) => p + 1), 550);
    return () => clearTimeout(t);
  }, [paso]);
  const correr = () => {
    onTry();
    setAbierto(null);
    setPaso(1);
  };
  return (
    <DemoBox>
      <ul className="space-y-2">
        {CORREOS.map((c, i) => {
          const listo = paso > i + 1 || paso > CORREOS.length;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={!listo}
                onClick={() => setAbierto(abierto === i ? null : i)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-left touch-manipulation disabled:cursor-default"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">{c.de}</span>
                  {listo ? <span className={`rounded-full border px-2 py-0.5 text-[11px] ${c.color}`}>{c.tipo}</span> : paso === i + 1 ? <span className="text-[11px] text-slate-500">leyendo…</span> : null}
                </div>
                <p className="mt-1 text-sm text-white">{c.asunto}</p>
                {listo && abierto === i ? (
                  <p className="mt-2 rounded-lg border border-dashed border-white/15 p-2 text-sm text-slate-300">
                    <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-accent">borrador</span>
                    {c.borrador}
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Btn onClick={correr}>{paso === 0 ? 'Pasar la bandeja por el agente' : <><RotateCcw className="h-4 w-4" /> Otra vez</>}</Btn>
        {paso > CORREOS.length ? <span className="text-xs text-slate-400">Toca un correo para ver el borrador. Ninguno se envía solo.</span> : null}
      </div>
    </DemoBox>
  );
}

/* 03 · Propuestas */
const NECESIDADES = ['Capacitar a un equipo nuevo', 'Ordenar la atención de clientes', 'Automatizar un reporte'];
function DemoPropuesta({ onTry }: { onTry: () => void }) {
  const [n, setN] = useState<number | null>(null);
  const [lineas, setLineas] = useState(0);
  useEffect(() => {
    if (n === null || lineas >= 5) return;
    const t = setTimeout(() => setLineas((l) => l + 1), 420);
    return () => clearTimeout(t);
  }, [n, lineas]);
  const partes = n === null ? [] : [
    `Contexto: ${NECESIDADES[n].toLowerCase()}, según lo que contaron en la reunión.`,
    'Alcance: qué entra y qué no, escrito en simple.',
    'Precio: sale de tu lista de precios, no lo inventa el agente.',
    'Próximo paso y fecha propuesta para conversar.',
    'Estado: borrador para que lo revises tú antes de enviarlo.',
  ];
  return (
    <DemoBox>
      <p className="text-sm text-slate-300">¿Qué necesita el cliente?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {NECESIDADES.map((x, i) => (
          <button
            key={x}
            type="button"
            onClick={() => {
              onTry();
              setN(i);
              setLineas(0);
            }}
            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm touch-manipulation ${n === i ? 'border-accent bg-accent/15 text-white' : 'border-white/15 text-slate-300'}`}
          >
            {x}
          </button>
        ))}
      </div>
      {n !== null ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white p-4 text-slate-800">
          <div className="flex items-center justify-between">
            <p className="font-serif text-lg">Propuesta · borrador</p>
            <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">por revisar</span>
          </div>
          <ol className="mt-3 space-y-2 text-sm">
            {partes.slice(0, lineas).map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </DemoBox>
  );
}

/* 04 · Calendarios */
const AGENDAS = [
  { nombre: 'Agenda de la empresa', eventos: [{ h: '10:00', t: 'Reunión con proveedor' }] },
  { nombre: 'Agenda del segundo negocio', eventos: [{ h: '15:00', t: 'Revisión de proyecto' }] },
];
function DemoCalendario({ onTry }: { onTry: () => void }) {
  const [sync, setSync] = useState(false);
  return (
    <DemoBox>
      <div className="grid gap-3 sm:grid-cols-2">
        {AGENDAS.map((a, i) => {
          const otra = AGENDAS[1 - i];
          return (
            <div key={a.nombre} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="text-xs text-slate-400">{a.nombre}</p>
              <ul className="mt-2 space-y-2 text-sm">
                {[...a.eventos.map((e) => ({ ...e, copia: false })), ...(sync ? otra.eventos.map((e) => ({ h: e.h, t: 'Ocupado', copia: true })) : [])]
                  .sort((x, y) => x.h.localeCompare(y.h))
                  .map((e, k) => (
                    <li key={k} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${e.copia ? 'border border-dashed border-accent/50 text-accent' : 'bg-white/5 text-white'}`}>
                      <span className="font-mono text-xs text-slate-400">{e.h}</span>
                      {e.t}
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Btn
          onClick={() => {
            onTry();
            setSync((s) => !s);
          }}
        >
          {sync ? <><RotateCcw className="h-4 w-4" /> Deshacer</> : 'Cruzar las agendas'}
        </Btn>
        {sync ? <span className="text-xs text-slate-400">Cada agenda bloquea la hora de la otra con un «Ocupado», sin mostrar de qué se trata.</span> : null}
      </div>
    </DemoBox>
  );
}

/* 05 · ¿Decide solo o te pregunta? */
const ACCIONES = [
  { t: 'Avisar que recibió un correo', solo: true },
  { t: 'Ofrecer un descuento', solo: false },
  { t: 'Agendar una reunión', solo: true },
  { t: 'Prometer una fecha de entrega', solo: false },
  { t: 'Hacer seguimiento de una propuesta enviada', solo: true },
  { t: 'Sumar algo que no estaba en la propuesta', solo: false },
];
function DemoRegla({ onTry }: { onTry: () => void }) {
  const [resp, setResp] = useState<Record<number, boolean>>({});
  const [ver, setVer] = useState(false);
  const elegir = (i: number, solo: boolean) => {
    onTry();
    setResp((r) => ({ ...r, [i]: solo }));
  };
  const listas = Object.keys(resp).length;
  const aciertos = ACCIONES.filter((a, i) => resp[i] === a.solo).length;
  return (
    <DemoBox label="Pruébalo · tú decides, después te muestro la regla">
      <ul className="space-y-2">
        {ACCIONES.map((a, i) => (
          <li key={i} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <p className="text-sm text-white">{a.t}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[true, false].map((op) => {
                const marcado = resp[i] === op;
                const bien = ver && op === a.solo;
                return (
                  <button
                    key={String(op)}
                    type="button"
                    onClick={() => elegir(i, op)}
                    className={`min-h-[40px] rounded-full border px-3 py-1.5 text-xs touch-manipulation ${
                      bien ? 'border-emerald-400 text-emerald-300' : marcado ? 'border-accent bg-accent/15 text-white' : 'border-white/15 text-slate-400'
                    }`}
                  >
                    {op ? 'Va solo' : 'Te pregunta'}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Btn onClick={() => setVer(true)} disabled={listas === 0}>Ver la regla</Btn>
        {ver ? <span className="text-xs text-slate-400">Coincidiste en {aciertos} de las {listas} que marcaste.</span> : null}
      </div>
      {ver ? (
        <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-slate-200">
          <Shield className="mr-1 inline h-4 w-4 text-accent" />
          La regla que usamos: el agente va solo en lo que se puede deshacer (acusar recibo, agendar, hacer seguimiento, coordinar con el equipo). Todo lo que compromete plata, alcance o una fecha de entrega, te lo pregunta. Preparar un borrador nunca necesita permiso.
        </p>
      ) : null}
    </DemoBox>
  );
}

/* 06 · Agents as a Service: un agente por persona */
const ROLES = [
  { r: 'Ventas', hace: ['Ordena los contactos nuevos y propone respuesta', 'Arma el borrador de cada propuesta', 'Te recuerda a quién hacerle seguimiento'], no: 'No ofrece descuentos ni cambia precios.' },
  { r: 'Operaciones', hace: ['Junta el avance de cada proyecto', 'Avisa lo que se está atrasando', 'Prepara el reporte semanal'], no: 'No promete fechas al cliente.' },
  { r: 'Dueño o gerencia', hace: ['Resumen de la mañana con lo que importa', 'Lo que necesita tu decisión, en una lista', 'Cruza tus agendas'], no: 'Solo ve lo que tú le das permiso de ver.' },
];
function DemoEquipo({ onTry }: { onTry: () => void }) {
  const [r, setR] = useState(0);
  const rol = ROLES[r];
  return (
    <DemoBox label="Pruébalo · elige un rol del equipo">
      <div className="flex flex-wrap gap-2">
        {ROLES.map((x, i) => (
          <button
            key={x.r}
            type="button"
            onClick={() => {
              onTry();
              setR(i);
            }}
            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm touch-manipulation ${r === i ? 'border-accent bg-accent/15 text-white' : 'border-white/15 text-slate-300'}`}
          >
            {x.r}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-950/60 p-4">
        <p className="text-sm text-white">El agente de {rol.r.toLowerCase()}:</p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
          {rol.hace.map((h) => (
            <li key={h} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex gap-2 text-sm text-amber-200">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          {rol.no}
        </p>
      </div>
    </DemoBox>
  );
}

/* ------------------------------------------------------------------ */

type Formato = {
  n: string;
  id: DemoId | null;
  icon: typeof Search;
  tag: string;
  titulo: string;
  bajada: string;
  precio: string;
  Demo?: React.FC<{ onTry: () => void }>;
};

const FORMATOS: Formato[] = [
  { n: '01', id: 'mapa', icon: Compass, tag: 'Asesoría', titulo: 'Diagnóstico', bajada: 'Dos semanas para mapear dónde se le va el tiempo a tu equipo, qué datos tienen y qué agente conviene partir primero. Si después sigues con nosotros, se descuenta.', precio: `desde ${usd(PRECIOS.diagnostico)} · 2 semanas · se descuenta del proyecto`, Demo: DemoMapa },
  { n: '02', id: 'bandeja', icon: Inbox, tag: 'Agente por tarea', titulo: 'Bandeja de entrada', bajada: 'Lee lo que llega, separa posibles clientes de lo demás y te deja la respuesta escrita. Tú apruebas.', precio: 'incluido en Agents as a Service · alcance en el diagnóstico', Demo: DemoBandeja },
  { n: '03', id: 'propuesta', icon: FileText, tag: 'Agente por tarea', titulo: 'Propuestas', bajada: 'Arma la propuesta con lo conversado y con tu lista de precios. Nunca sale sin que la revises.', precio: 'incluido en Agents as a Service · alcance en el diagnóstico', Demo: DemoPropuesta },
  { n: '04', id: 'calendario', icon: Calendar, tag: 'Agente por tarea', titulo: 'Calendarios', bajada: 'Si tienes varias agendas, cada una bloquea los horarios ocupados de las otras. Nadie te agenda encima.', precio: 'incluido en Agents as a Service · alcance en el diagnóstico', Demo: DemoCalendario },
  { n: '05', id: 'regla', icon: Shield, tag: 'Agente por tarea', titulo: 'Seguimientos con frenos', bajada: 'Persigue respuestas, confirma reuniones y avisa al equipo. Lo que compromete plata o fechas, te lo pregunta.', precio: 'incluido en Agents as a Service · alcance en el diagnóstico', Demo: DemoRegla },
  { n: '06', id: 'equipo', icon: Users, tag: 'Servicio mensual', titulo: 'Agents as a Service', bajada: 'Cada persona del equipo trabaja con un agente que conoce el negocio, sus herramientas y sus límites. Lo instalamos, lo conectamos a tu información y lo mejoramos cada mes.', precio: `instalación desde ${usd(PRECIOS.setup)} + operación desde ${usd(PRECIOS.operacion)}/mes`, Demo: DemoEquipo },
  { n: '07', id: null, icon: Search, tag: 'Dirección técnica', titulo: 'CTO fraccional', bajada: 'Para cuando no necesitas agentes operando, sino a alguien que dirija la parte técnica de un proyecto tuyo, unas horas a la semana.', precio: `desde ${usd(PRECIOS.cto)}/mes` },
];

/* ------------------------------------------------------------------ */

const FLUJOS = ['Bandeja de entrada', 'Propuestas', 'Calendarios', 'Seguimientos', 'Reportes'];
type Modalidad = 'diagnostico' | 'aaas' | 'cto';

function Cotizador() {
  const [mod, setMod] = useState<Modalidad>('aaas');
  const [personas, setPersonas] = useState(5);
  const [flujos, setFlujos] = useState<string[]>(['Bandeja de entrada', 'Seguimientos']);
  const toggle = (f: string) => setFlujos((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  const resumen = useMemo(() => {
    const lineas: { label: string; valor: string; nota?: string }[] = [];
    if (mod === 'diagnostico') {
      lineas.push({ label: 'Diagnóstico (2 semanas)', valor: `desde ${usd(PRECIOS.diagnostico)}`, nota: 'Se descuenta si después sigues con la instalación.' });
    }
    if (mod === 'aaas') {
      lineas.push({ label: 'Instalación (una vez)', valor: `desde ${usd(PRECIOS.setup)}`, nota: 'Incluye el diagnóstico y la puesta en marcha con cada persona.' });
      lineas.push({ label: 'Operación y mejoras', valor: `desde ${usd(PRECIOS.operacion)}/mes` });
    }
    if (mod === 'cto') {
      lineas.push({ label: 'CTO fraccional', valor: `desde ${usd(PRECIOS.cto)}/mes` });
    }
    return lineas;
  }, [mod]);

  const licMin = personas * PRECIOS.licenciaMin;
  const licMax = personas * PRECIOS.licenciaMax;
  const mensaje = encodeURIComponent(
    `Hola, vengo del catálogo de Villelabs. Me interesa: ${mod === 'aaas' ? 'Agents as a Service' : mod === 'cto' ? 'CTO fraccional' : 'Diagnóstico'}` +
      (mod !== 'cto' ? `, equipo de ${personas} personas, agentes para: ${flujos.join(', ') || 'por definir'}.` : '.'),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">01 · Cómo quieres partir</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {([
              ['diagnostico', 'Solo el diagnóstico', 'Para saber por dónde partir'],
              ['aaas', 'Agents as a Service', 'Agentes operando en tu equipo'],
              ['cto', 'CTO fraccional', 'Dirección técnica de un proyecto'],
            ] as [Modalidad, string, string][]).map(([k, t, d]) => (
              <button
                key={k}
                type="button"
                onClick={() => setMod(k)}
                className={`min-h-[64px] rounded-xl border p-3 text-left touch-manipulation ${mod === k ? 'border-accent bg-accent/15' : 'border-white/10 hover:border-white/25'}`}
              >
                <p className="text-sm text-white">{t}</p>
                <p className="mt-0.5 text-xs text-slate-400">{d}</p>
              </button>
            ))}
          </div>
        </div>

        {mod !== 'cto' ? (
          <>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">02 · Personas en el equipo</p>
                <span className="text-2xl font-light text-white">{personas}</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={personas}
                onChange={(e) => setPersonas(Number(e.target.value))}
                aria-label="Personas en el equipo"
                className="mt-3 h-8 w-full cursor-pointer accent-[#2175a1]"
              />
              <p className="text-xs text-slate-500">Funciona mejor en equipos de 3 a 15 personas.</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">03 · Qué tareas quieres pasarle a un agente</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FLUJOS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggle(f)}
                    className={`min-h-[44px] rounded-full border px-4 py-2 text-sm touch-manipulation ${flujos.includes(f) ? 'border-accent bg-accent/15 text-white' : 'border-white/15 text-slate-300'}`}
                  >
                    {flujos.includes(f) ? '✓ ' : ''}
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-slate-900/60 p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Tu cotización · precios de lista</p>
        <ul className="mt-4 space-y-4">
          {resumen.map((l) => (
            <li key={l.label} className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-slate-300">{l.label}</span>
                <span className="text-lg text-white">{l.valor}</span>
              </div>
              {l.nota ? <p className="mt-1 text-xs text-slate-400">{l.nota}</p> : null}
            </li>
          ))}
          {mod === 'aaas' ? (
            <li className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-slate-300">Agentes por tarea</span>
                <span className="text-sm text-white">{flujos.length ? `${flujos.length} incluidos` : 'por definir'}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">No tienen precio aparte: el alcance exacto de cada uno se define en el diagnóstico.</p>
            </li>
          ) : null}
          {mod === 'aaas' ? (
            <li>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-slate-300">Licencias de Claude ({personas} {personas === 1 ? 'persona' : 'personas'})</span>
                <span className="text-sm text-white">
                  aprox. {usd(licMin)}–{licMax.toLocaleString('es-CL')}/mes
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Estimado. No está incluido: lo contratas y pagas tú directamente (unos USD 25–30 por persona al mes).</p>
            </li>
          ) : null}
        </ul>
        <p className="mt-4 text-xs text-slate-400">Precios en dólares, «desde». El valor final se cierra en el diagnóstico, con el alcance escrito.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/diagnostic" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white hover:bg-[#2a8bbd]">
            Agenda un diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`${WHATSAPP}?text=${mensaje}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-green-500/30 px-5 text-sm text-green-300 hover:border-green-500/60">
            <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function CatalogoContent() {
  const [probadas, setProbadas] = useState<DemoId[]>([]);
  const [activa, setActiva] = useState('inicio');
  const marcar = (id: DemoId) => setProbadas((p) => (p.includes(id) ? p : [...p, id]));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActiva(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    SECCIONES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200" aria-label="Catálogo">
      {/* subnav fija bajo el menú principal (fixed: el body tiene overflow-x oculto y rompe sticky) */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-slate-950/90 backdrop-blur-xl md:top-20">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => irA(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs touch-manipulation sm:text-sm ${activa === s.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="mr-1 font-mono text-[10px] text-accent">{s.n}</span>
              {s.label}
            </button>
          ))}
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-slate-300" aria-live="polite">
            {probadas.length} de {DEMOS.length}
            <span className="hidden sm:inline"> demos probadas</span>
          </span>
        </div>
      </div>

      {/* 00 · Inicio */}
      <section id="inicio" className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6 md:pt-44">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Catálogo Villelabs</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
          Agentes de IA para tu equipo. Pruébalos acá mismo.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
          Asesoría, agentes que hacen una tarea completa y el servicio mensual donde cada persona trabaja con su agente. Seis demos que puedes usar sin registrarte, y una calculadora con los precios de lista.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Btn onClick={() => irA('formatos')}>
            Ver el catálogo <ArrowRight className="h-4 w-4" />
          </Btn>
          <Btn kind="ghost" onClick={() => irA('cotiza')}>Cotiza acá</Btn>
        </div>
      </section>

      {/* 01 · Formatos */}
      <section id="formatos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">01 · Formatos</p>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Siete formas de trabajar juntos.</h2>
        <p className="mt-3 max-w-2xl text-slate-400">De la asesoría para saber por dónde partir, a agentes operando todos los días en tu equipo.</p>
        <div className="mt-10 space-y-6">
          {FORMATOS.map((f) => {
            const Icon = f.icon;
            const visto = f.id ? probadas.includes(f.id) : false;
            return (
              <article key={f.n} id={`formato-${f.n}`} className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent">{f.n}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400">{f.tag}</span>
                  </div>
                  {visto ? <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-300">Probado</span> : null}
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-2xl text-white">{f.titulo}</h3>
                    <p className="mt-2 max-w-2xl text-slate-300">{f.bajada}</p>
                    <p className="mt-3 text-sm text-accent">{f.precio}</p>
                  </div>
                </div>
                {f.Demo && f.id ? <f.Demo onTry={() => marcar(f.id as DemoId)} /> : (
                  <div className="mt-6">
                    <Link href="/contact" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30">
                      Conversemos <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* 02 · Cotiza acá */}
      <section id="cotiza" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">02 · Cotiza acá</p>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Arma tu equipo de agentes y mira cuánto cuesta.</h2>
        <div className="mt-10">
          <Cotizador />
        </div>
      </section>

      {/* 03 · Conversemos */}
      <section id="conversemos" className="mx-auto max-w-6xl px-4 pb-32 pt-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 p-6 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">03 · Conversemos</p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl text-white sm:text-4xl">Partimos por entender tu operación, no por vender un agente.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            En 30 minutos revisamos qué tareas se repiten en tu equipo y si un agente tiene sentido. Si no lo tiene, te lo decimos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-[#2a8bbd]">
              Agenda una llamada <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/diagnostic" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 hover:border-white/30">
              Agenda un diagnóstico
            </Link>
            <a href={`${WHATSAPP}?text=${encodeURIComponent('Hola, vengo del catálogo de Villelabs.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-green-500/30 px-6 text-sm text-green-300 hover:border-green-500/60">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
