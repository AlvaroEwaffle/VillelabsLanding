'use client';

/*
 * /curso/modulo-3 — Módulo 3 «Operación: entregar lo vendido sin perder tareas».
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: 3 procesos escritos + tablero).
 */

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaChecklistEntrega, DiagramaProcesoPasos, DiagramaResumenDia, DiagramaReunionTareas, DiagramaTableroEstado } from '@/components/productos/diagramas/modulos';
import {
  BloqueCopiar,
  BotonDescarga,
  Campos,
  CierreModulo,
  Elegibles,
  Explica,
  FilaResumen,
  FotoBanda,
  Freno,
  Instruccion,
  ModuloCurso,
  Subtitulo,
  armarCsv,
  armarTxt,
  claveModulo,
  descargarArchivo,
  nuevoId,
  useFilas,
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  procesos: claveModulo(3, 'procesos'),
  transcripcion: claveModulo(3, 'transcripcion'),
  notas: claveModulo(3, 'notas'),
  checkGN: claveModulo(3, 'check_gn'),
  checklist: claveModulo(3, 'checklist_propio'),
  tablero: claveModulo(3, 'tablero'),
  tableroReglas: claveModulo(3, 'tablero_reglas'),
  fuentes: claveModulo(3, 'fuentes'),
  resumen: claveModulo(3, 'resumen'),
};

// ─── Lección 1 · Procesos ──────────────────────────────────────────────────

const CAMPOS_PROCESOS: Campo[] = [1, 2, 3].flatMap((n) => [
  { id: `n${n}`, etiqueta: `Proceso ${n} · nombre`, placeholder: n === 1 ? 'Ej.: llega un cliente nuevo' : n === 2 ? 'Ej.: entra un pedido' : 'Ej.: sale un despacho' },
  { id: `p${n}`, etiqueta: `Proceso ${n} · pasos (uno por línea: verbo + quién)`, filas: 5, placeholder: 'Recibir el pedido por WhatsApp — Rocío\nConfirmar stock — Rocío' },
]);

const EJEMPLO_PROCESOS = {
  n1: 'Llega un cliente nuevo (oficina)',
  p1: 'Registrar datos y molienda en la planilla — Rocío\nEnviar mensaje de bienvenida con días de entrega — Rocío\nCrear la tarjeta en el tablero — Rocío\nAgendar la primera entrega — Juan\nLlamar a la semana para preguntar cómo les fue — Camila',
  n2: 'Entra un pedido',
  p2: 'Recibir el pedido y anotarlo en el tablero — Rocío\nConfirmar stock de grano verde — Rocío\nTostar según el plan del día — Pedro\nEnvasar y etiquetar con fecha de tostado — Pedro\nDespachar — Juan\nAvisar al cliente que va en camino — Juan',
  n3: 'Sale un despacho',
  p3: 'Revisar el checklist del pedido — Juan\nArmar la ruta del día — Juan\nEntregar y pedir firma o foto — Juan\nMarcar «listo» en el tablero — Juan',
};

const pasosDe = (t?: string) => (t ?? '').split('\n').map((x) => x.trim()).filter(Boolean);

function LeccionProcesos() {
  const [v] = useTextos(K.procesos);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          Si un pedido sale bien solo cuando estás tú, no tienes un proceso: tienes una memoria. Y la memoria se cansa, se enferma y se va de vacaciones.
        </p>
        <p>
          Elige los <strong>3 procesos que más se repiten</strong> (para la mayoría: llega un cliente nuevo, entra un pedido, sale un despacho) y escribe cada uno en <strong>7 pasos o menos</strong>. Cada paso empieza con un verbo y tiene un responsable. La prueba: que alguien nuevo pueda seguirlo sin preguntarte.
        </p>
      </Explica>
      <DiagramaProcesoPasos className="mt-6" />
      <FotoBanda foto={APOYO.tostadoraPanel} posicion="center 45%" />
      <Subtitulo>Tus 3 procesos</Subtitulo>
      <Instruccion>Evita pasos vagos como «coordinar el pedido». Mejor: «Juan confirma por WhatsApp la hora de entrega con el cliente».</Instruccion>
      <Campos clave={K.procesos} campos={CAMPOS_PROCESOS} ejemplo={EJEMPLO_PROCESOS} />
      {montado ? (
        <ul className="mt-4 space-y-1 text-sm" aria-live="polite">
          {[1, 2, 3].map((n) => {
            const c = pasosDe(v[`p${n}`]).length;
            const sinQuien = pasosDe(v[`p${n}`]).filter((x) => !/[—–-]\s*\S/.test(x)).length;
            if (!c) return null;
            return (
              <li key={n} className={c > 7 || sinQuien ? 'text-orange-300' : 'text-emerald-300'}>
                Proceso {n}: {c} pasos{c > 7 ? ' · son más de 7: divídelo en dos procesos' : ''}
                {sinQuien ? ` · ${sinQuien} sin responsable (agrega «— nombre»)` : ''}
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis procesos (.txt)"
          disabled={!montado || ![1, 2, 3].some((n) => v[`p${n}`]?.trim())}
          onClick={() =>
            descargarArchivo(
              'mis-3-procesos.txt',
              armarTxt(
                'Procesos que se repiten',
                [1, 2, 3].flatMap((n) => [`PROCESO ${n}: ${(v[`n${n}`] ?? '').trim() || '(sin nombre)'}`, ...pasosDe(v[`p${n}`]).map((x, i) => `${i + 1}. ${x}`), '']),
              ),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 2 · De la reunión a las tareas ───────────────────────────────

const TRANSCRIPCION = [
  { id: 't1', texto: 'Camila: Esta semana se nos juntan tres oficinas nuevas.', tarea: false },
  { id: 't2', texto: 'Juan: Yo confirmo el despacho del viernes con Estudio Sur antes del jueves.', tarea: true },
  { id: 't3', texto: 'Pedro: El tueste de Brasil quedó más oscuro que la vez pasada.', tarea: false },
  { id: 't4', texto: 'Camila: Pedro, ¿puedes ajustar la curva y mandarme una muestra el miércoles?', tarea: true },
  { id: 't5', texto: 'Rocío: Las bolsas de 250 gramos se acaban la próxima semana.', tarea: false },
  { id: 't6', texto: 'Camila: Rocío, pide 500 bolsas al proveedor hoy mismo.', tarea: true },
  { id: 't7', texto: 'Juan: La camioneta tiene revisión técnica este mes.', tarea: false },
  { id: 't8', texto: 'Juan: Agendo la revisión técnica para el lunes 23.', tarea: true },
];

const TAREAS_GN = [
  { q: 'Confirmar despacho del viernes con Estudio Sur', quien: 'Juan', cuando: 'jueves' },
  { q: 'Ajustar curva del tueste Brasil y enviar muestra', quien: 'Pedro', cuando: 'miércoles' },
  { q: 'Pedir 500 bolsas de 250 g', quien: 'Rocío', cuando: 'hoy' },
  { q: 'Agendar revisión técnica de la camioneta', quien: 'Juan', cuando: 'lunes 23' },
];

function LeccionReunion() {
  const [marcas, , borrar] = useMarcas(K.transcripcion);
  const [notas, setNotas] = useTextos(K.notas);
  const [revisar, setRevisar] = useState(false);
  const montado = useMontado();
  const negocio = useNegocio();
  const bien = TRANSCRIPCION.filter((t) => !!marcas[t.id] === t.tarea).length;
  const prompt = [
    `Eres el asistente de operación de ${negocio.trim() || '[mi negocio]'}.`,
    'Te paso las notas (o la transcripción) de una reunión. Saca SOLO las tareas concretas que alguien se comprometió a hacer.',
    'Devuélvelas en una tabla con tres columnas: Qué (empieza con verbo) · Quién · Para cuándo.',
    'Si una tarea no tiene responsable o fecha, escribe «FALTA» en esa celda; no lo inventes.',
    'No incluyas comentarios, opiniones ni temas que solo se mencionaron.',
    '',
    'NOTAS:',
    (notas.texto ?? '').trim() || '[pega aquí tus notas o la transcripción]',
  ].join('\n');
  return (
    <>
      <Explica>
        <p>
          Las reuniones no fallan por lo que se habla: fallan por lo que nadie anota. Al terminar, tus notas o la grabación pasan a una lista de tareas, cada una con tres datos: <strong>qué, quién y para cuándo</strong>. Y la lista se comparte el mismo día.
        </p>
        <p>
          Un asistente como ChatGPT o Claude puede sacar esa lista de una transcripción en segundos (Google Meet, Teams o la grabadora del celular la generan). Tú la revisas antes de compartirla.
        </p>
      </Explica>
      <DiagramaReunionTareas className="mt-6" />
      <Subtitulo>Práctica: ¿cuáles son tareas?</Subtitulo>
      <Instruccion>Un trozo de la reunión semanal de Grano Norte. Marca las frases que son una tarea (alguien se compromete a hacer algo) y después revisa.</Instruccion>
      <Elegibles clave={K.transcripcion} opciones={TRANSCRIPCION.map((t) => ({ id: t.id, texto: t.texto }))} />
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" onClick={() => setRevisar(true)} className="inline-flex min-h-[44px] items-center rounded-full border border-[#2175a1] bg-[#2175a1]/20 px-5 text-sm text-white hover:bg-[#2175a1]/35">
          Revisar
        </button>
        {revisar ? (
          <button
            type="button"
            onClick={() => {
              borrar();
              setRevisar(false);
            }}
            className="inline-flex min-h-[44px] items-center px-2 text-sm text-slate-400 hover:text-white"
          >
            Repetir
          </button>
        ) : null}
      </div>
      {revisar && montado ? (
        <div className="mt-4" aria-live="polite">
          <p className="text-sm text-slate-300">
            {bien} de {TRANSCRIPCION.length} bien. Las tareas eran las frases donde alguien dice qué va a hacer y cuándo; lo demás es información.
          </p>
          <Pantallita titulo="Grano Norte · tareas de la reunión" className="mt-3">
            <ul className="space-y-1.5 text-sm">
              {TAREAS_GN.map((t) => (
                <li key={t.q}>
                  <strong>{t.q}</strong> · {t.quien} · {t.cuando}
                </li>
              ))}
            </ul>
          </Pantallita>
        </div>
      ) : null}
      <Subtitulo>Con tu próxima reunión</Subtitulo>
      <label className="mt-3 block text-sm text-slate-300">
        <span className="font-medium text-slate-200">Pega tus notas o la transcripción (opcional)</span>
        <textarea
          rows={4}
          value={notas.texto ?? ''}
          onChange={(e) => setNotas((p) => ({ ...p, texto: e.target.value }))}
          className="mt-1.5 w-full resize-y rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
          placeholder="Lo que se habló, tal cual"
        />
      </label>
      <BloqueCopiar titulo="Prompt · de la reunión a las tareas" texto={montado ? prompt : ''} nota="Revisa la tabla antes de compartirla: el asistente puede confundir una idea con un compromiso." />
      <Freno>Ninguna fecha comprometida con un cliente sale de esa lista sin que una persona la confirme.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar plantilla de tareas y prompt (.txt)"
          onClick={() =>
            descargarArchivo(
              'de-la-reunion-a-las-tareas.txt',
              armarTxt('De la reunión a las tareas', [
                'PLANTILLA (una fila por tarea)',
                'Qué (empieza con verbo) | Quién | Para cuándo',
                '',
                'EJEMPLO · Grano Norte',
                ...TAREAS_GN.map((x) => `${x.q} | ${x.quien} | ${x.cuando}`),
                '',
                'REGLAS',
                '- Se comparte con el equipo el mismo día.',
                '- Una fecha comprometida con un cliente la confirma una persona.',
                '',
                'PROMPT',
                prompt,
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · Checklist de entrega ─────────────────────────────────────

const CHECK_GN = [
  { id: 'g1', texto: 'Molienda confirmada por escrito (grano, espresso o filtro).' },
  { id: 'g2', texto: 'Dirección, horario de recepción y nombre de quien recibe.' },
  { id: 'g3', texto: 'Datos de facturación revisados (razón social y RUT).' },
  { id: 'g4', texto: 'Bolsas etiquetadas con fecha de tostado.' },
  { id: 'g5', texto: 'Mensaje de bienvenida enviado con los días de entrega.' },
  { id: 'g6', texto: 'Tarjeta creada en el tablero con la próxima entrega.' },
  { id: 'g7', texto: 'Llamado de Camila agendado para la semana siguiente.' },
];

const CAMPOS_CHECK: Campo[] = [
  { id: 'tipo', etiqueta: 'Tipo de trabajo', placeholder: 'Ej.: cliente nuevo, pedido especial, instalación' },
  { id: 'items', etiqueta: 'Lo que tiene que estar listo antes de decir «entregado» (uno por línea)', filas: 6 },
  { id: 'quien', etiqueta: 'Quién lo marca', placeholder: 'Quien entrega, no tú' },
];

function LeccionChecklist() {
  const [c] = useTextos(K.checklist);
  const [gn] = useMarcas(K.checkGN);
  const montado = useMontado();
  const hechos = montado ? CHECK_GN.filter((x) => gn[x.id]).length : 0;
  return (
    <>
      <Explica>
        <p>
          Los errores de entrega casi nunca son por falta de ganas: son por un paso que se olvidó. Un <strong>checklist de entrega</strong> es la lista de lo que tiene que estar listo antes de decir «entregado». Uno por cada tipo de trabajo.
        </p>
        <p>
          Lo marca <strong>quien entrega</strong>, no tú. Así sabes que está hecho sin preguntar. Empieza por el tipo de trabajo que más errores te da hoy.
        </p>
      </Explica>
      <DiagramaChecklistEntrega className="mt-6" />
      <FotoBanda foto={APOYO.cajasEtiquetas} posicion="center 50%" />
      <Subtitulo>El de Grano Norte: «nuevo cliente oficina»</Subtitulo>
      <Instruccion>Márcalo como si fueras Juan preparando la primera entrega.</Instruccion>
      <Elegibles clave={K.checkGN} opciones={CHECK_GN} />
      <p className="mt-2 text-sm text-slate-400" aria-live="polite">
        {hechos === CHECK_GN.length ? 'Completo: ahora sí se puede decir «entregado».' : `${hechos} de ${CHECK_GN.length}. Mientras falte uno, no está entregado.`}
      </p>
      <Subtitulo>Tu checklist</Subtitulo>
      <Campos clave={K.checklist} campos={CAMPOS_CHECK} ejemplo={{ tipo: 'Nuevo cliente oficina', items: CHECK_GN.map((x) => x.texto).join('\n'), quien: 'Juan, de despacho' }} />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mi checklist (.txt)"
          disabled={!montado || !c.items?.trim()}
          onClick={() =>
            descargarArchivo(
              'checklist-de-entrega.txt',
              armarTxt(`Checklist de entrega · ${(c.tipo ?? '').trim() || 'mi trabajo'}`, [
                ...pasosDe(c.items).map((x) => `[ ] ${x}`),
                '',
                `Lo marca: ${(c.quien ?? '').trim() || 'quien entrega'}`,
                'Mientras falte un punto, no está entregado.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · Tablero de estado ─────────────────────────────────────────

const COLUMNAS_TABLERO = [
  { id: 'hacer', t: 'Por hacer' },
  { id: 'curso', t: 'En curso' },
  { id: 'listo', t: 'Listo' },
];

const EJEMPLO_TABLERO = [
  { t: 'Oficina Plaza · 5 kg grano', quien: 'Pedro', col: 'hacer' },
  { t: 'Café Puerto · muestra', quien: 'Rocío', col: 'hacer' },
  { t: 'Cowork Cerro · tostando', quien: 'Pedro', col: 'curso' },
  { t: 'Estudio Sur · entregado', quien: 'Juan', col: 'listo' },
];

function Tablero() {
  const [tarjetas, setTarjetas] = useFilas(K.tablero);
  const [nueva, setNueva] = useState({ t: '', quien: '' });
  const montado = useMontado();
  const lista = montado ? tarjetas : [];
  const agregar = () => {
    if (!nueva.t.trim()) return;
    setTarjetas((p) => [...p, { _id: nuevoId(), t: nueva.t.trim(), quien: nueva.quien.trim(), col: 'hacer' } as Fila]);
    setNueva({ t: '', quien: '' });
  };
  const mover = (id: string, d: number) =>
    setTarjetas((p) =>
      p.map((f) => {
        if (f._id !== id) return f;
        const i = COLUMNAS_TABLERO.findIndex((c) => c.id === f.col);
        const j = Math.min(COLUMNAS_TABLERO.length - 1, Math.max(0, i + d));
        return { ...f, col: COLUMNAS_TABLERO[j].id };
      }),
    );
  return (
    <div className="mt-5">
      {lista.length === 0 ? (
        <button
          type="button"
          onClick={() => setTarjetas(EJEMPLO_TABLERO.map((e) => ({ ...e, _id: nuevoId() }) as Fila))}
          className="mb-3 inline-flex min-h-[44px] items-center gap-2 text-sm text-[#5fb2dd] hover:text-white"
        >
          <Plus className="h-4 w-4" aria-hidden /> Partir desde el ejemplo de Grano Norte
        </button>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        {COLUMNAS_TABLERO.map((c, ci) => {
          const deCol = lista.filter((f) => f.col === c.id);
          return (
            <section key={c.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5" aria-label={c.t}>
              <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">
                {c.t} <span className="text-slate-500">{deCol.length}</span>
              </p>
              <ul className="mt-2 space-y-2">
                {deCol.map((f) => (
                  <li key={f._id} className="rounded-lg bg-[#24314d] p-2.5">
                    <p className="break-words text-sm text-white">{f.t}</p>
                    {f.quien ? <p className="text-xs text-slate-400">{f.quien}</p> : null}
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex gap-1">
                        <button type="button" disabled={ci === 0} onClick={() => mover(f._id, -1)} aria-label={`Mover «${f.t}» a la izquierda`} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 disabled:opacity-30">
                          <ArrowLeft className="h-4 w-4" aria-hidden />
                        </button>
                        <button type="button" disabled={ci === COLUMNAS_TABLERO.length - 1} onClick={() => mover(f._id, 1)} aria-label={`Mover «${f.t}» a la derecha`} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 disabled:opacity-30">
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <button type="button" onClick={() => setTarjetas((p) => p.filter((x) => x._id !== f._id))} aria-label={`Quitar «${f.t}»`} className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-slate-200">
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_160px_auto]">
        <input
          value={nueva.t}
          onChange={(e) => setNueva((p) => ({ ...p, t: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') agregar();
          }}
          placeholder="Nueva tarjeta: cliente · trabajo"
          className="min-h-[48px] rounded-full border border-white/15 bg-white/[0.03] px-5 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
        />
        <input
          value={nueva.quien}
          onChange={(e) => setNueva((p) => ({ ...p, quien: e.target.value }))}
          placeholder="Responsable"
          className="min-h-[48px] rounded-full border border-white/15 bg-white/[0.03] px-5 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
        />
        <button type="button" onClick={agregar} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30">
          <Plus className="h-4 w-4" aria-hidden /> Agregar
        </button>
      </div>
    </div>
  );
}

const CAMPOS_TABLERO_REGLAS: Campo[] = [
  { id: 'donde', etiqueta: 'Dónde vive el tablero', placeholder: 'Ej.: Google Sheets compartido, Trello, una pizarra en la bodega' },
  { id: 'quien', etiqueta: 'Quién lo actualiza', placeholder: 'Quien mueve el trabajo, mueve la tarjeta' },
  { id: 'cuando', etiqueta: 'Cuándo se revisa', placeholder: 'Ej.: 9:00 y 17:00' },
];

function LeccionTablero() {
  const [tarjetas] = useFilas(K.tablero);
  const [reglas] = useTextos(K.tableroReglas);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          ¿Cuántas veces al día te preguntan «¿cómo va lo de…?»? Cada pregunta es una señal de que el estado no está a la vista. Un tablero simple tiene tres columnas: <strong>por hacer, en curso y listo</strong>. Cada pedido o proyecto es una tarjeta que avanza.
        </p>
        <p>
          La regla que lo hace funcionar: <strong>quien mueve el trabajo, mueve la tarjeta</strong>. Y una alerta: si «en curso» se llena, el equipo está empezando mucho y terminando poco.
        </p>
      </Explica>
      <DiagramaTableroEstado className="mt-6" />
      <Subtitulo>Arma tu tablero</Subtitulo>
      <Instruccion>Agrega los pedidos o proyectos de esta semana y muévelos con las flechas. Queda guardado en este navegador; descárgalo para pasarlo a una planilla compartida.</Instruccion>
      <Tablero />
      <Subtitulo>Las reglas de tu tablero</Subtitulo>
      <Campos clave={K.tableroReglas} campos={CAMPOS_TABLERO_REGLAS} />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar tablero (.csv)"
          disabled={!montado || tarjetas.length === 0}
          onClick={() =>
            descargarArchivo(
              'tablero-de-estado.csv',
              armarCsv(
                ['Tarjeta', 'Responsable', 'Estado'],
                [
                  ...tarjetas.map((f) => [f.t ?? '', f.quien ?? '', COLUMNAS_TABLERO.find((c) => c.id === f.col)?.t ?? '']),
                  [],
                  ['Dónde vive', reglas.donde ?? ''],
                  ['Quién lo actualiza', reglas.quien ?? ''],
                  ['Cuándo se revisa', reglas.cuando ?? ''],
                ],
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · Resumen del día ──────────────────────────────────────────

const FUENTES = [
  { id: 'correo', texto: 'Correo (pedidos y consultas de clientes)' },
  { id: 'whatsapp', texto: 'WhatsApp (exportando el chat o con el resumen de tu herramienta)' },
  { id: 'pedidos', texto: 'Planilla de pedidos' },
  { id: 'tablero', texto: 'Tablero de estado' },
  { id: 'calendario', texto: 'Calendario (reuniones y entregas de hoy)' },
  { id: 'cobros', texto: 'Planilla de cobros (pagos por confirmar)' },
];

const CAMPOS_RESUMEN: Campo[] = [
  { id: 'hora', etiqueta: 'A qué hora llega', placeholder: 'Ej.: 8:30, de lunes a viernes' },
  { id: 'donde', etiqueta: 'Dónde queda el borrador', placeholder: 'Ej.: en mi correo, en el grupo del equipo' },
  { id: 'quien', etiqueta: 'Quién lo lee y decide', placeholder: 'Ej.: Camila; si no está, Rocío' },
];

function LeccionResumen() {
  const [fuentes] = useMarcas(K.fuentes);
  const [r] = useTextos(K.resumen);
  const montado = useMontado();
  const negocio = useNegocio();
  const elegidas = montado ? FUENTES.filter((f) => fuentes[f.id]).map((f) => f.texto.replace(/ \(.*\)/, '')) : [];
  const prompt = [
    `Eres el asistente de operación de ${negocio.trim() || '[mi negocio]'}. Prepara el resumen del día en borrador.`,
    `Revisa: ${elegidas.join(', ') || '[tus fuentes]'}.`,
    'Entrégalo en tres secciones cortas:',
    '1. QUÉ LLEGÓ desde ayer (pedidos, consultas, pagos).',
    '2. QUÉ FALTA (tareas abiertas, con responsable).',
    '3. QUÉ VENCE HOY (entregas, cobros, respuestas comprometidas).',
    'Al final, máximo 3 decisiones que necesito tomar hoy.',
    'No respondas a nadie ni cambies nada: solo resume. Máximo 15 líneas.',
  ].join('\n');
  return (
    <>
      <Explica>
        <p>
          Partir el día leyendo cuarenta mensajes es partir el día atrasado. Mejor partir con un <strong>resumen de cinco minutos</strong> que responde tres preguntas: qué llegó, qué falta y qué vence hoy.
        </p>
        <p>
          Se prepara solo, en borrador, cada mañana: un asistente lee tus fuentes y deja el resumen listo. Tú lo lees y decides. En esta lección lo diseñas; en el módulo 6 lo dejas corriendo a una hora fija.
        </p>
      </Explica>
      <DiagramaResumenDia className="mt-6" />
      <Pantallita titulo="Grano Norte · resumen del martes" className="mt-6">
        <p className="text-sm font-semibold">Qué llegó</p>
        <p className="text-sm">2 pedidos nuevos (Café Mirador, Oficina Plaza) · 1 transferencia por confirmar.</p>
        <p className="mt-2 text-sm font-semibold">Qué falta</p>
        <p className="text-sm">Muestra de Brasil (Pedro) · pedir bolsas de 250 g (Rocío).</p>
        <p className="mt-2 text-sm font-semibold">Qué vence hoy</p>
        <p className="text-sm">Despacho Estudio Sur antes de las 12:00 (Juan).</p>
        <p className="mt-2 text-sm text-slate-400">Decide Camila: ¿se adelanta el tueste para Café Mirador?</p>
      </Pantallita>
      <Subtitulo>Diseña tu resumen</Subtitulo>
      <Instruccion>¿Qué fuentes tiene que revisar?</Instruccion>
      <Elegibles clave={K.fuentes} opciones={FUENTES} />
      <Campos clave={K.resumen} campos={CAMPOS_RESUMEN} />
      <BloqueCopiar titulo="Prompt · resumen del día" texto={montado ? prompt : ''} nota="Pruébalo hoy a mano pegando tus datos. En el módulo 6 lo dejas programado." />
      <Freno>El resumen ordena; no responde ni cambia nada. Las decisiones del día las toma una persona.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar plantilla del resumen (.txt)"
          disabled={!montado}
          onClick={() =>
            descargarArchivo(
              'resumen-del-dia.txt',
              armarTxt('Resumen del día', [
                `Llega: ${(r.hora ?? '').trim() || '(definir)'}`,
                `Queda en: ${(r.donde ?? '').trim() || '(definir)'}`,
                `Lo lee: ${(r.quien ?? '').trim() || '(definir)'}`,
                `Fuentes: ${elegidas.join(', ') || '(definir)'}`,
                '',
                'PLANTILLA',
                'QUÉ LLEGÓ:',
                'QUÉ FALTA:',
                'QUÉ VENCE HOY:',
                'DECISIONES PARA HOY:',
                '',
                'PROMPT',
                prompt,
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Cierre ────────────────────────────────────────────────────────────────

function Cierre() {
  const [v] = useTextos(K.procesos);
  const [tarjetas] = useFilas(K.tablero);
  const [reglas] = useTextos(K.tableroReglas);
  const [c] = useTextos(K.checklist);
  const [r] = useTextos(K.resumen);
  const montado = useMontado();
  const negocio = useNegocio();
  const procesos = montado ? [1, 2, 3].filter((n) => v[`n${n}`]?.trim()).map((n) => `${v[`n${n}`]!.trim()} (${pasosDe(v[`p${n}`]).length} pasos)`) : [];
  return (
    <CierreModulo
      numero={3}
      area="operacion"
      pruebaReal={[
        { id: 'p1', texto: 'Usé el checklist en cada entrega de la semana.' },
        { id: 'p2', texto: 'Leí el resumen del día al menos 4 mañanas.' },
        { id: 'p3', texto: 'El tablero se actualizó sin que yo lo pidiera.' },
        { id: 'p4', texto: 'Alguien del equipo siguió un proceso escrito sin preguntarme.' },
        { id: 'p5', texto: 'Anoté qué paso faltaba en algún proceso y lo agregué.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Tus 3 procesos" valor={procesos.join('\n')} leccion={1} />
          <FilaResumen etiqueta="Checklist de entrega" valor={montado && c.tipo?.trim() ? `${c.tipo.trim()} · ${pasosDe(c.items).length} puntos` : ''} leccion={3} />
          <FilaResumen
            etiqueta="Tablero"
            valor={montado && tarjetas.length ? `${tarjetas.length} tarjetas${reglas.donde?.trim() ? ` · vive en ${reglas.donde.trim()}` : ''}${reglas.cuando?.trim() ? ` · se revisa ${reglas.cuando.trim()}` : ''}` : ''}
            leccion={4}
          />
          <FilaResumen etiqueta="Resumen del día" valor={montado && r.hora?.trim() ? `${r.hora.trim()}${r.quien?.trim() ? ` · lo lee ${r.quien.trim()}` : ''}` : ''} leccion={5} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-3-operacion.txt',
          armarTxt(
            'Módulo 3 · Operación',
            [
              ...[1, 2, 3].flatMap((n) => [`PROCESO ${n}: ${(v[`n${n}`] ?? '').trim() || '(pendiente)'}`, ...pasosDe(v[`p${n}`]).map((x, i) => `${i + 1}. ${x}`), '']),
              `CHECKLIST DE ENTREGA: ${(c.tipo ?? '').trim() || '(pendiente)'}`,
              ...pasosDe(c.items).map((x) => `[ ] ${x}`),
              '',
              'TABLERO',
              ...COLUMNAS_TABLERO.map((col) => `${col.t}: ${tarjetas.filter((t) => t.col === col.id).map((t) => t.t).join(' · ') || '—'}`),
              `Dónde vive: ${(reglas.donde ?? '').trim() || '(definir)'} · Lo actualiza: ${(reglas.quien ?? '').trim() || 'quien mueve el trabajo'} · Se revisa: ${(reglas.cuando ?? '').trim() || '(definir)'}`,
              '',
              `RESUMEN DEL DÍA: ${(r.hora ?? '').trim() || '(definir hora)'} · lo lee ${(r.quien ?? '').trim() || '(definir)'}`,
              '',
              'RUTINA DEL ÁREA: resumen del día cada mañana (5 min) y tablero revisado 2 veces al día.',
              'NÚMERO SEMANAL: entregas a tiempo vs. entregas totales.',
            ],
            negocio,
          ),
        )
      }
    />
  );
}

// ─── Página ───────────────────────────────────────────────────────────────

const LECCIONES: LeccionDef[] = [
  {
    id: 'procesos',
    bajada: 'Elige 3 procesos (cliente nuevo, pedido, despacho) y escríbelos en 7 pasos o menos, cada uno con su responsable.',
    portada: FOTOS.oficina,
    posicion: 'center 35%',
    contenido: <LeccionProcesos />,
    checklist: [
      { id: 'l1a', texto: 'Elegí mis 3 procesos que más se repiten.' },
      { id: 'l1b', texto: 'Escribí cada uno en 7 pasos o menos, con responsable.' },
      { id: 'l1c', texto: 'Alguien de mi equipo leyó uno y lo entendió sin preguntar.' },
    ],
  },
  {
    id: 'reunion',
    bajada: 'Notas o grabación → tareas con responsable y fecha. Práctica con la reunión semanal de Grano Norte.',
    portada: APOYO.salaReunion,
    posicion: 'center 50%',
    contenido: <LeccionReunion />,
    checklist: [
      { id: 'l2a', texto: 'Hice la práctica de la transcripción.' },
      { id: 'l2b', texto: 'Probé el prompt con notas de una reunión real.' },
      { id: 'l2c', texto: 'Compartí la lista de tareas con mi equipo el mismo día.' },
    ],
  },
  {
    id: 'checklist',
    bajada: 'Lo que tiene que estar listo antes de decir «entregado». La plantilla de «nuevo cliente oficina» de Grano Norte y la tuya.',
    portada: APOYO.cajasDespacho,
    contenido: <LeccionChecklist />,
    checklist: [
      { id: 'l3a', texto: 'Recorrí el checklist de Grano Norte.' },
      { id: 'l3b', texto: 'Armé el checklist del trabajo que más errores me da.' },
      { id: 'l3c', texto: 'Definí quién lo marca.' },
    ],
  },
  {
    id: 'tablero',
    bajada: 'Por hacer, en curso y listo. Un tablero simple y la regla de quién lo actualiza.',
    portada: APOYO.tableroKanban,
    contenido: <LeccionTablero />,
    checklist: [
      { id: 'l4a', texto: 'Armé mi tablero con los trabajos de esta semana.' },
      { id: 'l4b', texto: 'Definí dónde vive, quién lo actualiza y cuándo se revisa.' },
      { id: 'l4c', texto: 'Se lo mostré a mi equipo.' },
    ],
  },
  {
    id: 'resumen',
    bajada: 'Qué llegó, qué falta y qué vence: preparado cada mañana en borrador para revisar en 5 minutos.',
    portada: FOTOS.cafeCerca,
    posicion: 'center 30%',
    contenido: <LeccionResumen />,
    checklist: [
      { id: 'l5a', texto: 'Elegí las fuentes de mi resumen.' },
      { id: 'l5b', texto: 'Definí hora, lugar y quién lo lee.' },
      { id: 'l5c', texto: 'Probé el prompt una mañana con mis datos.' },
    ],
  },
];

export default function Modulo3Content() {
  return (
    <ModuloCurso
      numero={3}
      intro="Entregar lo vendido sin perder tareas. Al terminar tienes tus 3 procesos escritos, el checklist de entrega, un tablero de estado y el resumen del día listo para revisar en 5 minutos."
      portada={APOYO.escenaDespacho}
      portadaPosicion="center 40%"
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
