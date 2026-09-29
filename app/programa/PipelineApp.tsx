'use client';

import pipeline from '@/lib/programa/data/prtech.pipeline.json';
import { ARTEFACTOS } from '@/lib/programa/artefactos';
import { Marco } from './Marco';

interface Tabla {
  titulo: string;
  nota: string;
  columnas: string[];
  filas: string[][];
}
interface Item {
  titulo: string;
  detalle: string;
}
interface NoVerificable {
  que: string;
  donde_mirar: string;
}

const DOC = pipeline as unknown as {
  _revisado: string;
  una_linea: string;
  tablas: Tabla[];
  trampas: Item[];
  no_verificable: NoVerificable[];
  hallazgos: string[];
};

/** Negritas con **…** y `código`. Lo mínimo para que el texto respire. */
function Parrafo({ texto, className }: { texto: string; className?: string }) {
  const trozos = texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <p className={className ?? 'text-sm leading-relaxed text-white/70'}>
      {trozos.map((t, i) => {
        if (t.startsWith('**') && t.endsWith('**')) {
          return (
            <strong key={i} className="font-medium text-white">
              {t.slice(2, -2)}
            </strong>
          );
        }
        if (t.startsWith('`') && t.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-white/10 px-1 py-0.5 text-[0.85em] text-white/85">
              {t.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{t}</span>;
      })}
    </p>
  );
}

// ── Arquitectura: dos servicios, una base, un deploy ───────────────────────

function DiagramaArquitectura() {
  return (
    <figure className="m-0 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <svg
        viewBox="0 0 680 220"
        role="img"
        aria-label="prtech-ai y radar-engine son dos servicios separados que comparten MongoDB. prtech-ai consulta el radar de medios y despliega automáticamente a Railway desde main."
        className="h-auto w-full min-w-[520px]"
      >
        <defs>
          <marker id="flechaArq" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" fillOpacity="0.55" />
          </marker>
        </defs>

        <rect x="280" y="78" width="140" height="56" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <text x="350" y="111" textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity="0.75">
          MongoDB
        </text>

        <rect x="20" y="24" width="190" height="64" rx="12" fill="#2175a11f" stroke="#2175a1" />
        <text x="115" y="50" textAnchor="middle" fontSize="12" fontWeight="600" fill="#7ec1e8">
          prtech-ai
        </text>
        <text x="115" y="66" textAnchor="middle" fontSize="10" fill="#7ec1e8" fillOpacity="0.75">
          Next.js · la app
        </text>

        <rect x="20" y="132" width="190" height="64" rx="12" fill="#8e6fc41f" stroke="#8e6fc4" />
        <text x="115" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b9a3e3">
          radar-engine
        </text>
        <text x="115" y="174" textAnchor="middle" fontSize="10" fill="#b9a3e3" fillOpacity="0.75">
          Express · servicio aparte
        </text>

        <rect x="480" y="24" width="180" height="64" rx="12" fill="#1f8b4c1f" stroke="#1f8b4c" />
        <text x="570" y="50" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5fc48a">
          Railway
        </text>
        <text x="570" y="66" textAnchor="middle" fontSize="10" fill="#5fc48a" fillOpacity="0.8">
          producción · auto desde main
        </text>

        <line x1="210" y1="58" x2="276" y2="96" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#flechaArq)" />
        <line x1="210" y1="160" x2="276" y2="118" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#flechaArq)" />
        <text x="256" y="82" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.45">
          datos
        </text>
        <text x="256" y="148" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.45">
          datos
        </text>

        <line
          x1="115"
          y1="88"
          x2="115"
          y2="129"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeDasharray="4 3"
          markerEnd="url(#flechaArq)"
        />
        <text x="185" y="112" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.45">
          radar de medios
        </text>

        <line x1="210" y1="48" x2="476" y2="48" stroke="#2175a1" strokeOpacity="0.55" markerEnd="url(#flechaArq)" />
        <text x="345" y="42" textAnchor="middle" fontSize="9" fill="#7ec1e8" fillOpacity="0.85">
          deploy: main → prod
        </text>
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-white/40">
        Dos servicios separados que comparten base de datos, no un monolito. Ojo con el nombre: existe
        una copia vieja y distinta en <code className="text-white/55">platform/apps/prtech</code> — no
        es esto, no se despliega desde acá.
      </figcaption>
    </figure>
  );
}

// ── Pipeline: de una rama a producción ──────────────────────────────────────

const PASOS_PIPELINE = [
  { n: '01', t1: 'rama', t2: 'feature/*', color: 'rgba(255,255,255,.4)', fill: 'rgba(255,255,255,.04)' },
  { n: '02', t1: 'build + typecheck', t2: 'sin warnings', color: '#1f8b4c', fill: '#1f8b4c1f' },
  { n: '03', t1: 'PR a', t2: 'main', color: '#2175a1', fill: '#2175a11f' },
  { n: '04', t1: 'Álvaro valida', t2: 'y mergea', color: '#c9860a', fill: '#c9860a1f' },
  { n: '05', t1: 'Railway', t2: 'despliega solo', color: '#1f8b4c', fill: '#1f8b4c1f' },
  { n: '06', t1: 'producción', t2: '/api/health', color: '#2175a1', fill: '#2175a11f' },
] as const;

function DiagramaPipeline() {
  const W = 150;
  const GAP = 20;
  const H = 70;
  const Y = 46;
  const ancho = 20 + PASOS_PIPELINE.length * (W + GAP);

  return (
    <figure className="m-0 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <svg
        viewBox={`0 0 ${ancho} 150`}
        role="img"
        aria-label={`El pipeline de un cambio: ${PASOS_PIPELINE.map((p) => `${p.t1} ${p.t2}`).join(' → ')}.`}
        className="h-auto w-full min-w-[760px]"
      >
        <defs>
          <marker id="flechaPipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" fillOpacity="0.5" />
          </marker>
        </defs>
        {PASOS_PIPELINE.map((p, i) => {
          const x = 20 + i * (W + GAP);
          return (
            <g key={p.n}>
              <text x={x + W / 2} y={Y - 12} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.3">
                {p.n}
              </text>
              <rect x={x} y={Y} width={W} height={H} rx="12" fill={p.fill} stroke={p.color} />
              <text x={x + W / 2} y={Y + H / 2 - 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={p.color}>
                {p.t1}
              </text>
              <text x={x + W / 2} y={Y + H / 2 + 12} textAnchor="middle" fontSize="11" fontWeight="600" fill={p.color}>
                {p.t2}
              </text>
              {i < PASOS_PIPELINE.length - 1 && (
                <line
                  x1={x + W}
                  y1={Y + H / 2}
                  x2={x + W + GAP - 2}
                  y2={Y + H / 2}
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  markerEnd="url(#flechaPipe)"
                />
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-white/40">{DOC.una_linea}</figcaption>
    </figure>
  );
}

// ── Notas cortas: lo que no cabe en el diagrama pero importa ───────────────

function ListaNotas({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-1.5 text-xs leading-relaxed text-white/45 sm:grid-cols-2">
      {items.map((texto, i) => (
        <li key={i} className="flex gap-1.5">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/25" />
          <Parrafo texto={texto} className="text-xs leading-relaxed text-white/45" />
        </li>
      ))}
    </ul>
  );
}

/** Cada paso, con el concepto general arriba y la realidad de PR Tech abajo. */
function PasoExplicado({ paso, color }: { paso: (typeof PASOS_EXPLICADOS)[number]; color: string }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs text-white/30">{paso.n}</span>
        <h3 className="text-sm font-medium" style={{ color }}>
          {paso.concepto}
        </h3>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-white/50">{paso.que}</p>
      <Parrafo texto={paso.aca} className="mt-1.5 text-xs leading-relaxed text-white/75" />
    </li>
  );
}

const NOTAS_ARQUITECTURA = [
  'Patrón: servicios separados que comparten una base de datos, no un monolito — así `radar-engine` puede fallar o reiniciarse sin tumbar la app.',
  'Local: Node 20+, Mongo en `127.0.0.1:27017`, `npm run seed` siembra 15 periodistas LATAM + la demo Ewaffle.',
  'El tablero es el proyecto #1 "PR Tech" de GitHub Projects — 43 items al momento de escribir esto.',
];

/**
 * Cada paso del diagrama, explicado en dos capas: `que` es el concepto de
 * DevOps en general — lo que significaría en cualquier pipeline — y `aca` es
 * lo que ese paso hace específicamente en PR Tech. Pensado para alguien que
 * ve un pipeline por primera vez: el concepto no sirve sin el ejemplo real,
 * y el ejemplo real no enseña nada sin el concepto detrás.
 */
const PASOS_EXPLICADOS = [
  {
    n: '01',
    concepto: 'Rama (branch)',
    que: 'Una copia de trabajo aislada del código. Cada quien construye su cambio en la suya para no pisar lo que están construyendo los demás.',
    aca: 'Acá no hay ambiente intermedio: de `feature/*` se salta directo a `main`, y de `main` directo a producción.',
  },
  {
    n: '02',
    concepto: 'Build + typecheck',
    que: 'La "definición de terminado": el código tiene que compilar y pasar el chequeo de tipos antes de siquiera pedir que alguien lo revise.',
    aca: 'Verificado hoy: `tsc --noEmit` sale limpio y el build compila 16 rutas estáticas + 24 rutas de API sin error.',
  },
  {
    n: '03',
    concepto: 'Pull Request (PR)',
    que: 'Pedís que tu rama se sume al tronco compartido. En un pipeline con CI, acá es justo donde correrían los tests y el build en automático.',
    aca: '**No hay CI acá**: sin `.github/`, nada se corre solo — la definición de terminado depende de que cada quien la corra a mano antes de abrir el PR.',
  },
  {
    n: '04',
    concepto: 'Code review + merge',
    que: 'Alguien más lee el cambio antes de que entre a `main`. En muchos equipos ese filtro lo complementa una máquina (checks obligatorios); acá es 100% humano.',
    aca: '`closes #N` en el mensaje del PR cierra el issue solo, en el momento del merge — no hace falta cerrarlo a mano.',
  },
  {
    n: '05',
    concepto: 'Continuous Deployment (CD)',
    que: 'Lo que entra a `main` sale a producción sin que nadie lo empuje a mano. Es la mitad "CD" de "CI/CD" — acá existe, aunque la mitad "CI" no.',
    aca: 'Automático desde `main` a Railway, confirmado en minutos tras cada merge — sin staging entre medio.',
  },
  {
    n: '06',
    concepto: 'Healthcheck',
    que: 'Un endpoint que el sistema expone para decir "sigo vivo" después de un deploy. Sin uno, un deploy roto se entera por el cliente, no por el sistema.',
    aca: '`/api/health` devuelve `ok`, `db`, `engine` y `uptimeSec` — nunca el connection string. No hay smoke test de producción documentado más allá de eso.',
  },
] as const;

const GLOSARIO: Array<{ termino: string; definicion: string }> = [
  { termino: 'Pipeline', definicion: 'La cadena de pasos, automáticos o manuales, que lleva un cambio de código a producción.' },
  { termino: 'CI · Integración Continua', definicion: 'Cada cambio se compila y prueba solo, apenas se sube. Acá no existe.' },
  { termino: 'CD · Despliegue Continuo', definicion: 'Lo que pasa el gate llega a producción sin empujarlo a mano. Acá sí existe.' },
  { termino: 'Branch (rama)', definicion: 'Una copia de trabajo aislada, para no pisar lo que construyen los demás.' },
  { termino: 'Pull Request (PR)', definicion: 'Pedís revisión antes de sumar tu rama al tronco compartido (main).' },
  { termino: 'Code review', definicion: 'Alguien más lee tu cambio antes de que entre. Acá el revisor es siempre una persona.' },
  { termino: 'Merge', definicion: 'El momento en que tu rama se une a main — y acá, lo que dispara el deploy.' },
  { termino: 'Staging', definicion: 'Un ambiente intermedio, igual a producción, para probar antes de que lo vea un cliente. Acá no existe.' },
  { termino: 'Healthcheck', definicion: 'Un endpoint que confirma que el sistema sigue vivo después de un deploy.' },
  { termino: 'Rollback', definicion: 'Volver a la versión anterior si un deploy sale mal. Acá es manual, no automático.' },
];

// ── Scripts de prueba, como grilla de chips en vez de tabla larga ──────────

const RESUMENES: Record<string, string> = {
  'guard:test': 'Guard factual, fail-closed en ambos sentidos',
  'ingest:test': 'Parser y normalizador de CSV',
  'roles:test': 'Matriz de permisos + tokens de sesión',
  'claim:test': 'Portero de cuentas reclamadas (I-02)',
  'claim:e2e': 'Lo mismo, de punta a punta, contra el route real',
  'report:smoke': 'PDF + PPTX generados con headers válidos',
  'isolation:test': 'Aislamiento entre cuentas (#18)',
  'mirror:test': 'Si el radar calla, la pantalla calla — nunca inventa (PR #66)',
  'mentions:test': 'Regex del espejo de medios, con casos congelados',
  'mentions:fixtures': 'Regenera los fixtures de mentions:test (no es un test)',
};

function limpiar(texto: string) {
  return texto.replace(/[`*]/g, '');
}

function puntoMongo(texto: string): { color: string; borde: boolean; titulo: string } {
  const limpio = limpiar(texto);
  if (/^no$/i.test(texto.trim())) return { color: 'transparent', borde: true, titulo: 'no toca Mongo ni red' };
  if (/salta/i.test(texto)) return { color: '#c9860a', borde: false, titulo: limpio };
  return { color: '#1f8b4c', borde: false, titulo: limpio };
}

function ScriptsGrid({ tabla, subtitulo }: { tabla: Tabla; subtitulo: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">{subtitulo}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {tabla.filas.map((fila) => {
          const nombre = limpiar(fila[0]);
          const mongo = puntoMongo(fila[2]);
          return (
            <div
              key={nombre}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              title={`${limpiar(fila[1])} · Mongo: ${mongo.titulo} · ${limpiar(fila[3])}`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background: mongo.color,
                    border: mongo.borde ? '1px solid rgba(255,255,255,.3)' : 'none',
                  }}
                />
                <code className="truncate text-xs text-white/85">{nombre}</code>
              </div>
              <p className="mt-1 text-xs leading-snug text-white/50">{RESUMENES[nombre] ?? limpiar(fila[1])}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PipelineApp({ llave }: { llave: string }) {
  const meta = ARTEFACTOS.find((a) => a.slug === 'pipeline');
  return (
    <Marco llave={llave} activo="pipeline">
      <article className="max-w-3xl space-y-10">
        <header>
          <h1 className="font-serif text-3xl text-white">Pipeline</h1>
          <p className="mt-2 font-serif text-lg leading-snug text-white/80">{DOC.una_linea}</p>
          <p className="mt-2 text-xs text-white/35">
            Revisado el {DOC._revisado} · {meta?.fuente}.
          </p>
        </header>

        {/* ── Para quien ve esto por primera vez ──────────────────────── */}
        <section className="rounded-2xl border border-[#2175a1]/30 bg-[#2175a1]/[0.06] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[#7ec1e8]">
            Para quien ve un pipeline por primera vez
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/75">
            Un <strong className="text-white">pipeline</strong> es la cadena de pasos —automáticos o
            manuales— que lleva un cambio de código desde la laptop de alguien hasta producción. La
            sigla <strong className="text-white">CI/CD</strong> junta dos mitades:{' '}
            <strong className="text-white">CI</strong> (Integración Continua) compila y prueba cada
            cambio solo, apenas se sube; <strong className="text-white">CD</strong> (Despliegue
            Continuo) lo publica solo, sin que nadie lo empuje a mano. Acá la mitad CD existe —
            Railway despliega solo desde{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-white/85">main</code>— pero la
            mitad CI no: nada corre los tests en automático, así que ese trabajo lo hace una persona,
            a mano, antes de abrir el PR. Abajo, cada paso real de PR Tech con el concepto que
            representa.
          </p>
        </section>

        {/* ── Arquitectura ─────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Arquitectura</h2>
          <DiagramaArquitectura />
          <ListaNotas items={NOTAS_ARQUITECTURA} />
        </section>

        {/* ── Pipeline ─────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">De una rama a producción</h2>
          <DiagramaPipeline />
          <ol className="list-none space-y-2">
            {PASOS_EXPLICADOS.map((paso, i) => (
              <PasoExplicado key={paso.n} paso={paso} color={PASOS_PIPELINE[i].color} />
            ))}
          </ol>
          <p className="text-xs leading-relaxed text-white/35">
            Nota aparte: existe una rama <code className="text-white/50">prod</code> en el remoto,
            pero es vestigial — nadie la promueve; el deploy real sale de{' '}
            <code className="text-white/50">main</code>.
          </p>
        </section>

        {/* ── Glosario ─────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Glosario</h2>
          <p className="text-xs text-white/40">Los términos de arriba, en una línea cada uno.</p>
          <dl className="grid gap-2 sm:grid-cols-2">
            {GLOSARIO.map((g) => (
              <div key={g.termino} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="text-xs font-medium text-white/85">{g.termino}</dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-white/50">{g.definicion}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Scripts de prueba ────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h2 className="font-serif text-xl text-white">Definición de &quot;terminado&quot;: los tests</h2>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Código que prueba que el código no se rompió. Acá no corren solos —no hay CI que los
              dispare— así que alguien los corre a mano antes de abrir el PR. Pasa el mouse sobre un
              script para el detalle completo y su fuente.
            </p>
          </div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#1f8b4c' }} /> usa Mongo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#c9860a' }} /> se salta solo si
              falta config
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full border border-white/30" /> no toca Mongo ni red
            </span>
          </p>
          {DOC.tablas[0] && <ScriptsGrid tabla={DOC.tablas[0]} subtitulo="prtech-ai" />}
          {DOC.tablas[1] && <ScriptsGrid tabla={DOC.tablas[1]} subtitulo="radar-engine" />}
        </section>

        {/* ── Trampas ──────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Trampas reales</h2>
          <p className="text-sm leading-relaxed text-white/70">Costaron tiempo de verdad. No son teóricas.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {DOC.trampas.map((tr) => (
              <li
                key={tr.titulo}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                style={{ borderLeft: '3px solid #d97757' }}
              >
                <p className="text-sm font-medium text-white">{tr.titulo}</p>
                <div className="mt-1">
                  <Parrafo texto={tr.detalle} className="text-xs leading-relaxed text-white/60" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Zona gris ────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Zona gris</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Lo que no se pudo verificar desde el repo, y lo que este documento encontró indocumentado o
            inconsistente en el camino.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {DOC.no_verificable.map((nv, i) => (
              <div key={`nv-${i}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <Parrafo texto={nv.que} className="text-xs leading-relaxed text-white/65" />
                <p className="mt-1 text-[11px] text-white/35">
                  Dónde mirarlo: <span className="text-white/50">{nv.donde_mirar}</span>
                </p>
              </div>
            ))}
            {DOC.hallazgos.map((h, i) => (
              <div
                key={`h-${i}`}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
                style={{ borderLeft: '3px solid #dc7a19' }}
              >
                <Parrafo texto={h} className="text-xs leading-relaxed text-white/65" />
              </div>
            ))}
          </div>
        </section>
      </article>
    </Marco>
  );
}
