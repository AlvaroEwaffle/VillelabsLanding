// Infografías que resumen cada parte. HTML + Tailwind para que el texto se adapte a 360 px.
import { PLATAFORMAS, RUTINA } from '@/lib/productos/guia/contenido-v2';

function Marco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <figure className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4 sm:p-6">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Infografía · {titulo}</figcaption>
      {children}
    </figure>
  );
}

export function TresPreguntas() {
  const items = [
    { t: '¿Quién compra?', d: 'Tipo de empresa, tamaño, zona', e: 'Cafeterías de 1 a 3 locales, Valparaíso y Viña' },
    { t: '¿Quién decide?', d: 'Cargo o rol', e: 'El dueño o el jefe de barra' },
    { t: '¿Qué señal dice «ahora»?', d: 'Algo cambió', e: 'Local nuevo, reseñas, busca proveedor' },
  ];
  return (
    <Marco titulo="Tu cliente ideal en 3 preguntas">
      <div className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
        <svg viewBox="0 0 180 180" className="mx-auto h-40 w-40" aria-hidden="true">
          {[80, 58, 36].map((r, i) => (
            <circle key={r} cx="90" cy="90" r={r} fill={['#16213a', '#1d3a5c', '#2175a1'][i]} stroke="#5fb2dd" strokeOpacity="0.5" />
          ))}
          <circle cx="90" cy="90" r="12" fill="#5fb2dd" />
          {['1', '2', '3'].map((n, i) => (
            <text key={n} x="90" y={[22, 44, 66][i]} textAnchor="middle" fontSize="12" fontWeight="700" fill="#cfe8f5">
              {n}
            </text>
          ))}
        </svg>
        <ol className="space-y-2">
          {items.map((it, i) => (
            <li key={it.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="font-semibold text-white">
                <span className="mr-2 font-serif text-[#5fb2dd]">{i + 1}</span>
                {it.t} <span className="font-normal text-slate-400">· {it.d}</span>
              </p>
              <p className="mt-1 text-sm text-[#cfe8f5]">Grano Norte: {it.e}</p>
            </li>
          ))}
        </ol>
      </div>
    </Marco>
  );
}

export function EmbudoFuentes() {
  const colores = { tibia: '#5fb2dd', templada: '#2175a1', fria: '#334a6b' } as const;
  return (
    <Marco titulo="De la fuente más tibia a la más fría">
      <div className="space-y-1.5">
        {PLATAFORMAS.map((p, i) => {
          const ancho = 100 - i * 6;
          return (
            <div key={p.nombre} className="mx-auto rounded-lg px-3 py-2 text-center text-sm font-medium text-white" style={{ width: `${ancho}%`, background: colores[p.temperatura] }}>
              {p.nombre}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-300">
        {(['tibia', 'templada', 'fria'] as const).map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm" style={{ background: colores[t] }} />
            {t === 'tibia' ? 'Tibia: ya te conocen' : t === 'templada' ? 'Templada: hay un vínculo' : 'Fría: no te conocen'}
          </span>
        ))}
      </div>
    </Marco>
  );
}

export function FormulaPuntaje() {
  const partes = [
    { t: 'Encaje', d: '¿Es mi cliente ideal?' },
    { t: 'Señal', d: '¿Me necesita ahora?' },
    { t: 'Acceso', d: '¿Tengo cómo llegarle directo?' },
  ];
  return (
    <Marco titulo="La fórmula del puntaje">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {partes.map((p, i) => (
          <div key={p.t} className="contents">
            <div className="flex-1 rounded-xl border border-[#5fb2dd]/40 bg-[#2175a1]/20 p-3 text-center">
              <p className="font-serif text-xl text-white">{p.t}</p>
              <p className="text-xs text-slate-300">{p.d}</p>
              <p className="mt-1 text-sm font-semibold text-[#5fb2dd]">1 a 3</p>
            </div>
            <span className="text-center font-serif text-2xl text-[#5fb2dd]">{i < 2 ? '+' : '='}</span>
          </div>
        ))}
        <div className="rounded-xl bg-[#5fb2dd] p-3 text-center text-[#0f172a] sm:w-24">
          <p className="font-serif text-3xl">9</p>
          <p className="text-xs font-semibold">máximo</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">
        Ejemplo: Cafetería Mirador = 3 + 3 + 3 = <strong className="text-white">9</strong>. Es la primera a la que Camila le hace seguimiento.
      </p>
    </Marco>
  );
}

export function TandaSemanal() {
  return (
    <Marco titulo="Tu unidad de trabajo">
      <div className="grid grid-cols-3 items-center gap-2 text-center">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="font-serif text-3xl text-white">20</p>
          <p className="text-xs text-slate-300">mensajes el mismo día</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="font-serif text-3xl text-white">1–2</p>
          <p className="text-xs text-slate-300">responden</p>
        </div>
        <div className="rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/25 p-3">
          <p className="font-serif text-3xl text-[#5fb2dd]">×4</p>
          <p className="text-xs text-slate-200">tandas al mes</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1" aria-hidden="true">
        {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'].map((s) => (
          <div key={s} className="flex-1">
            <div className="flex h-10 flex-wrap content-end gap-[2px] rounded-md bg-white/[0.03] p-1">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < 2 ? 'bg-[#5fb2dd]' : 'bg-slate-600'}`} />
              ))}
            </div>
            <p className="mt-1 text-center text-[0.7rem] text-slate-400">{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-300">Cada semana, una tanda nueva. Las conversaciones se van sumando.</p>
    </Marco>
  );
}

export function EstructuraMensaje() {
  const frases = [
    { n: 1, t: 'Algo de ellos', ej: 'Vi que abrieron en Cerro Alegre hace dos semanas, ¡felicitaciones!' },
    { n: 2, t: 'Lo que ganan', ej: 'Tostamos a 10 minutos y despachamos al día siguiente.' },
    { n: 3, t: 'Una pregunta fácil', ej: '¿Te dejo una muestra de 250 g esta semana?' },
  ];
  return (
    <Marco titulo="La estructura de 3 frases">
      <div className="space-y-2">
        {frases.map((f) => (
          <div key={f.n} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5fb2dd] font-serif text-[#0f172a]">{f.n}</span>
            <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-[#2175a1]/25 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5fb2dd]">{f.t}</p>
              <p className="text-sm text-white">{f.ej}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {['Máximo 3 frases', 'Sin adjuntos', 'Sin links', 'Sin «quedo atenta»'].map((r) => (
          <span key={r} className="rounded-full border border-white/15 px-3 py-1 text-slate-300">
            {r}
          </span>
        ))}
      </div>
    </Marco>
  );
}

export function CalendarioSeguimientos() {
  const hitos = [
    { d: 0, t: 'Primer mensaje' },
    { d: 2, t: 'Recordatorio útil' },
    { d: 7, t: 'Caso o dato' },
    { d: 14, t: 'Cierre amable' },
  ];
  const semana = [
    { dia: 'Lun', items: ['Tanda nueva: 20 primeros mensajes'] },
    { dia: 'Mar', items: [] },
    { dia: 'Mié', items: ['Día 2 de la tanda del lunes'] },
    { dia: 'Jue', items: [] },
    { dia: 'Vie', items: [] },
  ];
  return (
    <Marco titulo="El calendario de seguimientos">
      <p className="mb-3 text-sm font-semibold text-white">Por prospecto</p>
      <div className="relative px-2 pb-2 pt-6">
        <div className="absolute left-2 right-2 top-[2.1rem] h-1 rounded-full bg-gradient-to-r from-[#5fb2dd] to-[#2175a1]" />
        <div className="relative flex justify-between">
          {hitos.map((h) => (
            <div key={h.d} className="flex w-16 flex-col items-center text-center sm:w-24">
              <span className="text-xs text-slate-400">Día {h.d}</span>
              <span className="mt-1 h-4 w-4 rounded-full border-2 border-[#0f172a] bg-[#5fb2dd]" />
              <span className="mt-2 text-[0.72rem] leading-tight text-slate-200 sm:text-xs">{h.t}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mb-2 mt-5 text-sm font-semibold text-white">Tu semana (tanda del lunes)</p>
      <div className="grid grid-cols-5 gap-1">
        {semana.map((s) => (
          <div key={s.dia} className="min-h-[88px] rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
            <p className="text-center text-xs font-semibold text-[#5fb2dd]">{s.dia}</p>
            {s.items.map((it) => (
              <p key={it} className="mt-1 rounded bg-[#2175a1]/40 p-1 text-[0.65rem] leading-tight text-white">
                {it}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-400">El lunes siguiente toca el día 7 y, dos semanas después, el día 14. Cada mañana tu planilla te dice a quién.</p>
    </Marco>
  );
}

export function RutinaVeinte() {
  const colores = ['#5fb2dd', '#3d93c2', '#2175a1', '#1d4e72'];
  return (
    <Marco titulo="Tu rutina de 20 minutos">
      <div className="flex h-12 overflow-hidden rounded-xl" aria-hidden="true">
        {RUTINA.map((r, i) => (
          <div key={r.tramo} className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: `${(r.min / 20) * 100}%`, background: colores[i] }}>
            {r.min}′
          </div>
        ))}
      </div>
      <ol className="mt-4 space-y-2">
        {RUTINA.map((r, i) => (
          <li key={r.tramo} className="flex items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: colores[i] }} />
            <span className="w-14 shrink-0 font-serif text-[#5fb2dd]">{r.tramo}</span>
            <span className="text-sm text-slate-200">{r.texto}</span>
          </li>
        ))}
      </ol>
    </Marco>
  );
}

export function CicloSemanal() {
  const pasos = ['Buscar 20 nombres', 'Puntuar', 'Primer mensaje', 'Seguimientos 2 · 7 · 14', 'Registrar y medir'];
  return (
    <Marco titulo="Tu sistema, cada semana">
      <ol className="grid gap-2 sm:grid-cols-5">
        {pasos.map((p, i) => (
          <li key={p} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
            <span className="font-serif text-xl text-[#5fb2dd]">{i + 1}</span>
            <p className="text-sm text-white">{p}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-sm text-slate-300">↻ Y vuelta a empezar con una tanda nueva.</p>
    </Marco>
  );
}
