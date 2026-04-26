'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileBarChart2,
  FolderKanban,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react';
import LandingContactForm from '@/components/LandingContactForm';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

const painPoints = [
  {
    icon: Workflow,
    title: 'Procesos manuales que viven en WhatsApp, Excel y correo',
    detail:
      'Tomamos operaciones dispersas y las convertimos en un flujo con estados, responsables y trazabilidad.',
  },
  {
    icon: FileBarChart2,
    title: 'Reporteria que llega tarde o nadie confia',
    detail:
      'Creamos dashboards y command centers con datos accionables para que el equipo decida mas rapido.',
  },
  {
    icon: Users,
    title: 'Demasiada dependencia de una persona clave',
    detail:
      'Diseñamos software que documenta el proceso, reparte tareas y reduce cuellos de botella.',
  },
];

const solutionTracks = [
  {
    icon: Mail,
    title: 'Command centers operativos',
    body:
      'Correo, tareas, aprobaciones, delegacion, borradores y seguimiento desde una sola vista.',
  },
  {
    icon: BarChart3,
    title: 'Reporteria ejecutiva y performance',
    body:
      'Paneles con KPIs, alertas, comparativos y reportes accionables para ventas, marketing u operaciones.',
  },
  {
    icon: Wallet,
    title: 'Control financiero interno',
    body:
      'Cobros, ingresos, gastos, actividad, estados y visibilidad mensual sin depender de planillas sueltas.',
  },
  {
    icon: Network,
    title: 'Integraciones y automatizacion',
    body:
      'Gmail, calendarios, pagos, analytics, pipelines y otras herramientas conectadas a tu operacion real.',
  },
];

const systems = [
  {
    name: 'Capu',
    label: 'Correo operativo + agenda',
    summary:
      'Un command center para leer hilos, clasificar trabajo, priorizar respuesta y generar borradores con IA.',
    bullets: ['Command center por dimension', 'Delegacion, snooze y archivo', 'Borradores y reglas', 'Scheduling links'],
  },
  {
    name: 'Late',
    label: 'Reporteria + aprobacion de cambios',
    summary:
      'Panel para performance de Ads, GA4 y Search Console con reportes, recomendaciones y log de ejecucion.',
    bullets: ['Today vs Yesterday', 'Reportes accionables', 'Campanas por rendimiento', 'Execution log'],
  },
  {
    name: 'FinAdmin',
    label: 'Gestion financiera operativa',
    summary:
      'Workspace para cobros, ingresos, gastos, actividad reciente y panorama mensual del negocio.',
    bullets: ['Dashboard financiero', 'Facturacion y estados', 'Gastos y actividad', 'Resumen IVA mensual'],
  },
  {
    name: 'Platform',
    label: 'Revenue ops + pipeline',
    summary:
      'Pipeline comercial, briefing diario, hot leads, revenue dashboard y seguimiento de acciones del equipo.',
    bullets: ['Pipeline ponderado', 'Briefing diario', 'Hot leads y licitaciones', 'MRR y conversion funnel'],
  },
];

const realProjects = [
  {
    name: 'Conexión Industrial',
    domain: 'conexionindustrial.cl',
    href: 'https://conexionindustrial.cl/',
    category: 'Directorio industrial B2B',
    primaryMetric: '+300% empresas registradas',
    secondaryMetric: 'Busqueda, filtros y perfiles de empresa',
    description:
      'Plataforma orientada a discovery industrial para conectar oferta y demanda del sector con una experiencia de busqueda mas clara y accionable.',
    surfaces: ['Directorio', 'Busqueda', 'Perfiles', 'Lead discovery'],
  },
  {
    name: 'Fidelidapp',
    domain: 'fidelidapp.cl',
    href: 'https://www.fidelidapp.cl/',
    category: 'SaaS de fidelizacion',
    primaryMetric: '1.5M CLP MRR',
    secondaryMetric: '30+ negocios activos',
    description:
      'Sistema de fidelizacion con panel de administracion, activaciones, reservas, campañas y customizaciones operativas para clientes especificos como salud y retail.',
    surfaces: ['Admin panel', 'Clientes', 'Automations', 'Retention'],
  },
  {
    name: 'Ewaffle Ecosystem',
    domain: 'ewaffle.cl',
    href: 'https://ewaffle.cl/',
    category: 'Landing + IO + Platform',
    primaryMetric: '~150M CLP/año',
    secondaryMetric: '50+ organizaciones atendidas',
    description:
      'Ecosistema con front comercial, operaciones internas, sync automatizado de leads y billing, y una plataforma para escalar delivery y visibilidad del negocio.',
    surfaces: ['Landing', 'Ewaffle IO', 'Platform', 'Studio Ops'],
  },
];

const processSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Diagnostico operativo',
    body:
      'Mapeamos flujo actual, puntos de dolor, roles, planillas, integraciones y KPIs. Partimos por lo que mas tranca al equipo.',
  },
  {
    step: '02',
    icon: LayoutDashboard,
    title: 'Diseño del sistema',
    body:
      'Aterrizamos el proceso en pantallas, estados, permisos y decisiones de UX. Se valida antes de escribir mucho codigo.',
  },
  {
    step: '03',
    icon: FolderKanban,
    title: 'Backlog y sprint inicial',
    body:
      'Priorizamos el modulo mas rentable o mas urgente. La primera entrega tiene que ser usable, no solo bonita.',
  },
  {
    step: '04',
    icon: CalendarRange,
    title: 'Demos y ajustes continuos',
    body:
      'Trabajamos con demos frecuentes, feedback de usuarios reales y cambios controlados dentro del sprint.',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Lanzamiento y adopcion',
    body:
      'Salimos a produccion, medimos uso, corregimos fricciones y dejamos documentacion para que el sistema no dependa de una sola persona.',
  },
];

const deliverables = [
  'Mapa de proceso y propuesta funcional priorizada.',
  'Pantallas y experiencia pensadas para el equipo que las usa todos los dias.',
  'Desarrollo iterativo con avances concretos, no meses de silencio.',
  'Codigo, integraciones, despliegue y documentacion para continuidad.',
];

const faqs = [
  {
    question: 'Parten desde cero o tambien mejoran sistemas existentes?',
    answer:
      'Ambas. Podemos construir un modulo nuevo o reordenar un sistema existente si ya hay operacion funcionando y lo importante es destrabarla.',
  },
  {
    question: 'Se puede partir por un solo modulo?',
    answer:
      'Si. De hecho suele ser lo mejor. Priorizamos el modulo que ahorra mas tiempo, mejora visibilidad o reduce riesgo operativo.',
  },
  {
    question: 'Como trabajan el proceso agil en la practica?',
    answer:
      'Con alcance acotado por sprint, demos frecuentes, backlog visible y decisiones tomadas con el negocio, no encerrados solo en desarrollo.',
  },
  {
    question: 'El codigo y la infraestructura quedan del cliente?',
    answer:
      'Si. La idea es que el sistema sea un activo del negocio y no una dependencia eterna de un proveedor.',
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-200/80">
      {children}
    </span>
  );
}

function BrowserFrame({
  title,
  subtitle,
  accent,
  shellClassName = 'bg-slate-900/90 border-white/[0.08]',
  headerClassName = 'border-white/[0.06] bg-slate-950/80',
  bodyClassName = 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950',
  titleClassName = 'text-white',
  subtitleClassName = 'text-white/40',
  children,
}: {
  title: string;
  subtitle: string;
  accent: string;
  shellClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`overflow-hidden rounded-[28px] border shadow-[0_30px_90px_rgba(2,6,23,0.55)] ${shellClassName}`}>
      <div className={`flex items-center justify-between border-b px-5 py-3 ${headerClassName}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div>
            <p className={`text-sm font-medium ${titleClassName}`}>{title}</p>
            <p className={`text-[11px] ${subtitleClassName}`}>{subtitle}</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${accent}`}>
          Vista real del producto
        </span>
      </div>
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'good' | 'warn';
}) {
  const toneClasses =
    tone === 'good'
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
      : tone === 'warn'
      ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
      : 'border-white/[0.08] bg-white/[0.04] text-white';

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses}`}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function CapuMockup() {
  const threads = [
    {
      subject: 'Reunion con cliente industrial',
      tag: 'PROJECT',
      state: 'Responder',
      preview: 'Cliente espera propuesta y fecha de kickoff.',
    },
    {
      subject: 'Consulta comercial Toptal LATAM',
      tag: 'LEADS',
      state: 'Delegado',
      preview: 'Draft listo con respuesta y proximo paso sugerido.',
    },
    {
      subject: 'Bases de licitacion pendientes',
      tag: 'TENDER',
      state: 'Snooze',
      preview: 'Volver a revisar el lunes 09:00 con checklist adjunto.',
    },
  ];
  const sidebarGroups = [
    { group: 'GMAIL', items: ['Inbox IA', 'Borradores', 'Reglas', 'Etiquetas'] },
    { group: 'CALENDARIO', items: ['Eventos', 'Scheduling links', 'Follow-ups'] },
  ];

  return (
    <BrowserFrame
      title="Capu / Command Center"
      subtitle="Correo operativo, estados y borradores"
      accent="border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
      shellClassName="border-cyan-400/10 bg-[#081722]"
      headerClassName="border-white/[0.06] bg-[#07131d]"
      bodyClassName="bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_32%),linear-gradient(135deg,_#07131d,_#0b2231_55%,_#07131d)]"
    >
      <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-[26px] border border-white/[0.06] bg-white/[0.04] p-4 backdrop-blur">
          <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/10 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10">
                <Mail className="h-4 w-4 text-cyan-100" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Inbox IA</p>
                <p className="text-[11px] text-cyan-100/55">Todo automatico, todo en español</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {sidebarGroups.map(({ group, items }) => (
              <div key={group}>
                <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">{group}</p>
                <div className="mt-2 space-y-1">
                  {items.map((item) => (
                    <div
                      key={item}
                      className={`rounded-xl px-3 py-2 text-sm ${
                        item === 'Inbox IA'
                          ? 'bg-white text-slate-950'
                          : 'text-white/58 transition-colors hover:bg-white/[0.06]'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">Needs Response</p>
              <p className="mt-2 text-3xl font-semibold text-white">12</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-100/70">Drafts Ready</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-100">7</p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">Delegated</p>
              <p className="mt-2 text-3xl font-semibold text-white">4</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.06] bg-[#08131d]/80 p-3">
            {threads.map((thread) => (
              <div
                key={thread.subject}
                className="flex items-start justify-between gap-3 border-b border-white/[0.05] px-2 py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <p className="truncate text-sm font-medium text-white">{thread.subject}</p>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">
                      {thread.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{thread.preview}</p>
                </div>
                <span className="rounded-full border border-cyan-300/10 bg-cyan-300/10 px-2 py-1 text-[10px] text-cyan-100">
                  {thread.state}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Alert Banner</p>
                <span className="rounded-full bg-rose-400/15 px-2 py-1 text-[10px] text-rose-100">
                  Requires response
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {[
                  ['LEADS', '3'],
                  ['PROJECT', '4'],
                  ['TENDER', '2'],
                  ['ADMIN', '1'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-950/40 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">{label}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-fuchsia-400/20 bg-fuchsia-400/10 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">AI Draft Preview</p>
                <Bot className="h-4 w-4 text-fuchsia-200" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Hola, gracias por tu correo. Revise el contexto y te propongo avanzar con un primer sprint
                enfocado en reporteria y automatizacion del flujo interno...
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-slate-950/35 px-2.5 py-1 text-[10px] text-white/70">Delegar</span>
                <span className="rounded-full bg-slate-950/35 px-2.5 py-1 text-[10px] text-white/70">Snooze</span>
                <span className="rounded-full bg-slate-950/35 px-2.5 py-1 text-[10px] text-white/70">Draft listo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function LateMockup() {
  return (
    <BrowserFrame
      title="Late / Reports + Execution"
      subtitle="Ads, analytics y aprobacion operativa"
      accent="border border-amber-400/20 bg-amber-400/10 text-amber-100"
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#161d2d] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">Spend</p>
            <p className="mt-2 text-2xl font-bold text-white">$482.30</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-200/65">ROAS</p>
            <p className="mt-2 text-2xl font-bold text-emerald-100">3.2x</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-[#112228] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-200/65">Conversions</p>
            <p className="mt-2 text-2xl font-bold text-emerald-100">47</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-[#161d2d] p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">CTR</p>
            <p className="mt-2 text-2xl font-bold text-white">2.8%</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#141b29] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Latest Reports</p>
                <p className="text-xs text-white/45">Ads + GA4 + GSC en una misma lectura</p>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-100">
                Generated 08:00
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                'Budget reallocated from Google Search to Meta Lookalike.',
                'Stable day. CPC slight increase, no urgent change required.',
                'New campaign launched. Waiting 24h for meaningful signal.',
              ].map((summary, index) => (
                <div key={summary} className="rounded-xl border border-white/[0.06] bg-[#0f1522] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Daily report 0{index + 1}</p>
                    <span className="text-[10px] text-white/40">Ads / GA4 / GSC</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#141b29] p-4">
              <p className="text-sm font-medium text-white">Execution Log</p>
              <div className="mt-3 space-y-2">
                {[
                  ['Daily budget increased', '$80/day -> $96/day'],
                  ['Campaign paused', 'Display Brand Awareness'],
                  ['A/B test requested', 'New ad copy pending'],
                ].map(([action, result]) => (
                  <div key={action} className="rounded-xl bg-[#0f1522] px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-white">{action}</p>
                      <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] text-white/45">
                        executed
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/45">{result}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
              <p className="text-sm font-medium text-white">Today vs Yesterday</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-950/45 p-3">
                  <p className="text-white/40">Visitors</p>
                  <p className="mt-1 text-white">1,842</p>
                </div>
                <div className="rounded-xl bg-slate-950/45 p-3">
                  <p className="text-white/40">Qualified leads</p>
                  <p className="mt-1 text-white">23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function FinAdminMockup() {
  return (
    <BrowserFrame
      title="FinAdmin / Workspace"
      subtitle="Cobros, ingresos, gastos y actividad"
      accent="border border-indigo-300/30 bg-indigo-200 text-indigo-950"
      shellClassName="border-slate-200 bg-[#f8fafc]"
      headerClassName="border-slate-200 bg-white"
      bodyClassName="bg-[#f1f5f9]"
      titleClassName="text-slate-900"
      subtitleClassName="text-slate-500"
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ['Expected Revenue', '$6.400.000', 'primary'],
            ['Collected', '$4.920.000', 'success'],
            ['Pending Revenue', '$1.480.000', 'warning'],
            ['Projected Balance', '$2.310.000', 'success'],
          ].map(([label, value, tone]) => (
            <div key={label} className="rounded-xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">{label}</p>
                <div
                  className={`h-10 w-10 rounded-xl ${
                    tone === 'success'
                      ? 'bg-emerald-100'
                      : tone === 'warning'
                      ? 'bg-amber-100'
                      : 'bg-indigo-100'
                  }`}
                />
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Panorama Mensual</p>
                <p className="text-xs text-slate-500">Cobros y gastos que necesitan accion</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] text-indigo-700">
                Abril 2026
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Progreso de cobranza</span>
                <span>$4.920.000 / $6.400.000</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[77%] rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                ['Cobro recurrente / Cliente A', 'Facturado'],
                ['Ingreso puntual / Workshop interno', 'Pagado'],
                ['Pago software / Herramienta mensual', 'Pendiente'],
              ].map(([label, state]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3">
                  <p className="text-sm text-slate-900">{label}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] text-slate-500">
                    {state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-medium text-slate-900">Resumen del mes</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span>Cobros activos</span>
                  <span>9</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span>Ingresos puntuales</span>
                  <span>4</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span>Gastos del mes</span>
                  <span>13</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-medium text-slate-900">Actividad reciente</p>
              <div className="mt-3 space-y-2 text-xs text-slate-500">
                <div className="rounded-xl bg-slate-50 px-3 py-2">09:12 / Cobro generado para cliente industrial</div>
                <div className="rounded-xl bg-slate-50 px-3 py-2">11:28 / Gasto de software marcado como pagado</div>
                <div className="rounded-xl bg-slate-50 px-3 py-2">15:03 / Ingreso puntual agregado al workspace</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function PlatformMockup() {
  const stages = [
    { name: 'Nueva', count: 8 },
    { name: 'Contactada', count: 5 },
    { name: 'Propuesta', count: 3 },
    { name: 'Cerrada', count: 2 },
  ];

  return (
    <BrowserFrame
      title="Platform / Revenue Ops"
      subtitle="Pipeline, briefing y seguimiento comercial"
      accent="border border-sky-300/20 bg-sky-300/10 text-sky-100"
      shellClassName="border-sky-300/10 bg-[#08111f]"
      headerClassName="border-white/[0.06] bg-[#060d18]"
      bodyClassName="bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),_transparent_24%),linear-gradient(145deg,_#07101b,_#0e1d35_58%,_#0a1220)]"
    >
      <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-[26px] border border-white/[0.06] bg-white/[0.04] p-4 backdrop-blur">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Navigation</p>
          <div className="mt-3 space-y-1">
            {['Dashboard', 'Hot Leads', 'Pipeline', 'Briefing', 'Licitaciones'].map((item) => (
              <div
                key={item}
                className={`rounded-xl px-3 py-2 text-sm ${
                  item === 'Pipeline' ? 'bg-white text-slate-950' : 'text-white/55 hover:bg-white/[0.05]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/[0.06] bg-slate-950/35 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Quick actions</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-white/65">
              <div className="rounded-xl bg-white/[0.04] px-2 py-2">Ver Pipeline</div>
              <div className="rounded-xl bg-white/[0.04] px-2 py-2">Ver Briefing</div>
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ['Pipeline Ponderado', '$14.200.000'],
              ['Nuevos Leads', '11'],
              ['Acciones Pendientes', '6'],
              ['MRR Trend', '+18%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-5">
                <p className="text-sm text-white/35">{label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Pipeline</p>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Kanban comercial</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
                {stages.map((stage) => (
                  <div key={stage.name} className="rounded-2xl bg-slate-950/35 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-white">{stage.name}</p>
                      <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/55">
                        {stage.count}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.05] p-2 text-[11px] text-white/75">
                        Lead industrial / Q2 system
                      </div>
                      <div className="rounded-xl border border-white/[0.04] bg-white/[0.03] p-2 text-[11px] text-white/45">
                        Next action: diagnostic call
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-4">
                <p className="text-sm font-medium text-white">Briefing diario</p>
                <div className="mt-3 space-y-2 text-xs text-white/60">
                  <div className="rounded-xl bg-slate-950/35 px-3 py-2">2 reuniones hoy</div>
                  <div className="rounded-xl bg-slate-950/35 px-3 py-2">5 emails que pueden mover revenue</div>
                  <div className="rounded-xl bg-slate-950/35 px-3 py-2">1 alerta de ads con CPA alto</div>
                </div>
              </div>
              <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.04] p-4">
                <p className="text-sm font-medium text-white">Revenue view</p>
                <div className="mt-3 h-36 rounded-2xl bg-slate-950/35 p-4">
                  <div className="flex h-full items-end gap-3">
                    {[36, 56, 74, 98, 122, 146].map((height, index) => (
                      <div key={height} className="flex w-full flex-col items-center gap-2">
                        <div
                          className={`w-full rounded-t-xl ${index === 5 ? 'bg-sky-400' : 'bg-sky-400/55'}`}
                          style={{ height }}
                        />
                        <span className="text-[10px] text-white/35">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function RealProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="border-t border-white/[0.05] px-4 py-16 sm:px-6 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={itemVariants} className="max-w-3xl">
          <SectionEyebrow>
            <Briefcase className="h-3.5 w-3.5" />
            Proyectos reales
          </SectionEyebrow>
          <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
            Algunos proyectos activos que ayudan a aterrizar el tipo de software que construimos.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50">
            Dejamos una seleccion corta con dominios reales, clientes o revenue visible y un scope que conversa bien
            con leads que buscan automatizar operacion interna.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {realProjects.map((project) => (
            <motion.a
              key={project.name}
              variants={itemVariants}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[30px] border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-cyan-300/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/75">{project.category}</p>
                  <h3 className="mt-2 text-2xl font-light text-white">{project.name}</h3>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-slate-950/70 px-3 py-1.5 text-[11px] text-white/50">
                  Live
                </span>
              </div>

              <p className="mt-3 text-sm text-white/40">{project.domain}</p>
              <p className="mt-5 text-3xl font-light tracking-tight text-white">{project.primaryMetric}</p>
              <p className="mt-2 text-sm font-medium text-cyan-200/90">{project.secondaryMetric}</p>
              <p className="mt-5 text-sm leading-relaxed text-white/55">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.surfaces.map((surface) => (
                  <span
                    key={surface}
                    className="rounded-full border border-white/[0.08] bg-slate-950/60 px-3 py-1.5 text-[11px] text-white/60"
                  >
                    {surface}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-200 transition-transform group-hover:translate-x-1">
                <span>Ver proyecto</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function SistemasAMedidaContent() {
  return (
    <main className="relative w-full overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[580px] w-[980px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute left-0 top-[40%] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icono.png" alt="Villelabs" width={28} height={28} className="object-contain" />
            <span className="text-sm font-light text-white/70">Villelabs</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => scrollToSection('systems')}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Sistemas
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Proceso
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Hablemos
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <motion.div
          className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="mb-6">
              <SectionEyebrow>
                <Briefcase className="h-3.5 w-3.5" />
                Brochure digital de software a medida
              </SectionEyebrow>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-3xl text-4xl font-light leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.3rem]"
            >
              Sistemas a medida para{' '}
              <span className="font-normal text-cyan-200">automatizar operacion, reporteria y procesos internos.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/55 md:text-xl"
            >
              No te mostramos paginas corporativas. Te mostramos el tipo de software que tu equipo usa todos
              los dias: command centers, paneles financieros, flujos de aprobacion, dashboards y automatizaciones.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection('contact-form')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-accent/90"
              >
                Quiero una propuesta para mi operacion
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-7 py-4 text-base font-medium text-white/80 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white"
              >
                Ver proyectos reales
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Enfoque</p>
                <p className="mt-2 text-sm text-white/75">Operacion interna primero, no solo interfaz.</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Trabajo</p>
                <p className="mt-2 text-sm text-white/75">Demos frecuentes, backlog visible y prioridades reales.</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Base</p>
                <p className="mt-2 text-sm text-white/75">Sistemas y proyectos reales del workspace.</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 rounded-[36px] border border-cyan-300/10 bg-cyan-300/[0.03] blur-2xl" />
            <div className="relative rounded-[34px] border border-white/[0.08] bg-slate-900/60 p-5 shadow-[0_30px_100px_rgba(2,6,23,0.6)]">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Vista consolidada</p>
                      <p className="text-xs text-white/40">Correo, reporteria, finanzas y pipeline</p>
                    </div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-100">
                      Catalogo operativo
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <MetricTile label="Correo" value="Capu" />
                    <MetricTile label="Reportes" value="Late" />
                    <MetricTile label="Finanzas" value="FinAdmin" />
                    <MetricTile label="Pipeline" value="Platform" />
                  </div>
                </div>

                <div className="rounded-3xl border border-cyan-300/15 bg-[linear-gradient(145deg,rgba(14,116,144,0.22),rgba(8,47,73,0.18))] p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-cyan-200" />
                    <p className="text-sm font-medium text-white">Capu</p>
                  </div>
                  <div className="mt-4 rounded-[22px] border border-white/[0.06] bg-slate-950/30 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/55">Inbox IA</span>
                      <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100">7 drafts</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="rounded-2xl bg-white/[0.05] px-3 py-3 text-xs text-white/70">Inbox IA por dimension</div>
                      <div className="rounded-2xl bg-white/[0.05] px-3 py-3 text-xs text-white/70">Borradores + delegacion</div>
                      <div className="rounded-2xl bg-white/[0.05] px-3 py-3 text-xs text-white/70">Agenda y scheduling links</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-300/20 bg-amber-50/10 p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-amber-200" />
                    <p className="text-sm font-medium text-white">Late</p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-[#101827] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Today vs Yesterday</span>
                      <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-100">ROAS 3.2x</span>
                    </div>
                    <div className="flex h-20 items-end gap-2">
                      <div className="h-8 w-full rounded-t-xl bg-cyan-300/35" />
                      <div className="h-11 w-full rounded-t-xl bg-cyan-300/45" />
                      <div className="h-16 w-full rounded-t-xl bg-cyan-300/55" />
                      <div className="h-20 w-full rounded-t-xl bg-cyan-300/70" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-indigo-300/20 bg-white p-4 text-slate-900">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-indigo-500" />
                    <p className="text-sm font-medium">FinAdmin</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      ['Expected Revenue', '$6.4M'],
                      ['Collected', '$4.9M'],
                      ['Pending', '$1.4M'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3">
                        <span className="text-xs text-slate-500">{label}</span>
                        <span className="text-sm font-medium text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-sky-300/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.88),rgba(15,64,118,0.7))] p-4">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-sky-200" />
                    <p className="text-sm font-medium text-white">Platform</p>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {['Nueva', 'Contacto', 'Propuesta', 'Cierre'].map((stage, index) => (
                      <div key={stage} className="rounded-2xl bg-white/[0.05] p-2">
                        <p className="text-[10px] text-white/40">{stage}</p>
                        <p className="mt-2 text-lg text-white">{index + 2}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="border-t border-white/[0.05] px-4 py-16 sm:px-6 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>
              <Workflow className="h-3.5 w-3.5" />
              Donde agregamos valor
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
              El problema rara vez es “falta una web”.
              <span className="block text-cyan-200">El problema suele ser una operacion sin sistema.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={itemVariants}
                className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <point.icon className="h-5 w-5 text-cyan-100" />
                </div>
                <h3 className="text-lg font-medium text-white">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{point.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutionTracks.map((track) => (
              <motion.div
                key={track.title}
                variants={itemVariants}
                className="rounded-[28px] border border-white/[0.08] bg-slate-900/65 p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05]">
                  <track.icon className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-base font-medium text-white">{track.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{track.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="systems"
        className="border-t border-white/[0.05] px-4 py-16 sm:px-6 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={itemVariants} className="max-w-3xl">
            <SectionEyebrow>
              <LayoutDashboard className="h-3.5 w-3.5" />
              Sistemas revisados
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
              Cuatro ejemplos de software funcional construido para ordenar trabajo real.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50">
              La propuesta se construyo revisando repos del workspace de Villelabs. Elegi los sistemas que mejor
              muestran automatizacion interna, reporteria, finanzas y revenue ops.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {systems.map((system) => (
              <motion.div
                key={system.name}
                variants={itemVariants}
                className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200/75">{system.name}</p>
                    <h3 className="mt-2 text-2xl font-light text-white">{system.label}</h3>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-slate-950/70 px-3 py-1.5 text-[11px] text-white/50">
                    Sistema funcional
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">{system.summary}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {system.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 rounded-2xl bg-slate-950/55 px-3 py-3 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            <motion.div variants={itemVariants}>
              <CapuMockup />
            </motion.div>
            <motion.div variants={itemVariants}>
              <LateMockup />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FinAdminMockup />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PlatformMockup />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <RealProjectsSection />

      <motion.section
        id="process"
        className="border-t border-white/[0.05] px-4 py-16 sm:px-6 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <motion.div variants={itemVariants}>
              <SectionEyebrow>
                <CalendarRange className="h-3.5 w-3.5" />
                Proceso agil
              </SectionEyebrow>
              <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
                Diseño y desarrollo con foco en adopcion, no solo en entrega.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                El sistema no se define encerrados programando. Se define junto al negocio, con entregas cortas,
                feedback real y prioridades comerciales claras.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Lo que recibe el cliente</p>
                <div className="mt-5 space-y-3">
                  {deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-200" />
                      <p className="text-sm leading-relaxed text-white/65">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {processSteps.map((step) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <div className="flex items-center gap-4 md:min-w-[220px]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                        <step.icon className="h-5 w-5 text-cyan-100" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">Paso {step.step}</p>
                        <h3 className="mt-1 text-lg font-medium text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-white/55">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="border-t border-white/[0.05] px-4 py-16 sm:px-6 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>
              <Clock3 className="h-3.5 w-3.5" />
              Preguntas frecuentes
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
              Lo que normalmente preguntan antes de partir.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact-form"
        className="border-t border-white/[0.05] px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div variants={itemVariants}>
            <SectionEyebrow>
              <Sparkles className="h-3.5 w-3.5" />
              Siguiente paso
            </SectionEyebrow>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">
              Si quieres ordenar tu operacion, centralizar informacion y ganar visibilidad, conversemos.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Podemos ayudarte a transformar procesos manuales en un sistema claro, usable y conectado con la
              operacion real de tu equipo. Partimos por lo mas critico, validamos rapido y construimos contigo.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/65">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-200" />
                <span>Podemos partir por un modulo concreto y escalar desde ahi.</span>
              </div>
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-4 w-4 text-cyan-200" />
                <span>Diseñamos alrededor de tu operacion: ventas, reporteria, aprobaciones, finanzas o control interno.</span>
              </div>
              <div className="flex items-start gap-3">
                <Bot className="mt-0.5 h-4 w-4 text-cyan-200" />
                <span>El siguiente paso puede ser una conversacion corta para aterrizar alcance, prioridad y primera entrega.</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <LandingContactForm
              source="lp-sistemas-a-medida"
              heading="Conversemos sobre tu sistema"
              subtitle="Cuéntame el proceso que hoy te quita tiempo o visibilidad y te devolvemos una propuesta aterrizada."
              submitText="Enviar y seguir por WhatsApp"
            />
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
