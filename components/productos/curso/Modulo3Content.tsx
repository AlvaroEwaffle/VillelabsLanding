'use client';

/*
 * /curso/modulo-3 — Módulo 3 «Pedidos y operación: cada pedido, en una fila» (curso v1.1 «El sistema de tu negocio»).
 * Agrega la hoja Pedidos a la planilla del sistema (lib/productos/curso/plantilla.ts), con las mismas columnas.
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: 3 procesos escritos + hoja Pedidos con una semana real).
 * Las lecciones 2, 4 y 5 trabajan sobre las mismas filas (K.pedidos): se anotan, se ven por estado y se resumen.
 */

import { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaChecklistEntrega, DiagramaProcesoPasos } from '@/components/productos/diagramas/modulos';
import { DiagramaEstadosPedido, DiagramaMensajeAFila, DiagramaResumenPlanilla } from '@/components/productos/diagramas/sistema-m34';
import {
  BloqueCopiar,
  BotonDescarga,
  Campos,
  CierreModulo,
  Clasificador,
  Elegibles,
  Explica,
  FilaResumen,
  FotoBanda,
  Freno,
  Instruccion,
  ModuloCurso,
  Subtitulo,
  TablaEditable,
  armarCsv,
  armarTxt,
  claveModulo,
  descargarArchivo,
  numero,
  pesos,
  useFilas,
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type Columna,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  procesos: claveModulo(3, 'procesos'),
  practica: claveModulo(3, 'practica_pedidos'),
  pedidos: claveModulo(3, 'pedidos'),
  confirmacion: claveModulo(3, 'confirmacion'),
  checkGN: claveModulo(3, 'check_gn'),
  checklist: claveModulo(3, 'checklist_propio'),
  reglasEstado: claveModulo(3, 'reglas_estado'),
  resumen: claveModulo(3, 'resumen'),
};

const pasosDe = (t?: string) => (t ?? '').split('\n').map((x) => x.trim()).filter(Boolean);

// ─── Filas de pedidos (mismas columnas que la hoja Pedidos) ────────────────

/** Los mismos 4 estados de la hoja Pedidos (ESTADOS_PEDIDO en plantilla.ts). */
type Estado = 'Por hacer' | 'En curso' | 'Entregado' | 'Cancelado';

/** El estado se escribe a mano: se normaliza a uno de los 4 de la hoja. */
function estadoDe(s?: string): Estado {
  const t = (s ?? '').toLowerCase();
  if (t.includes('entreg') || t.includes('listo')) return 'Entregado';
  if (t.includes('curso') || t.includes('prepar')) return 'En curso';
  if (t.includes('cancel')) return 'Cancelado';
  return 'Por hacer';
}

const isoLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const masDias = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return isoLocal(d);
};
const fechaLegible = (iso?: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};

function atrasado(f: Fila, hoy: string) {
  const e = estadoDe(f.estado);
  return !!f.entrega && f.entrega < hoy && e !== 'Entregado' && e !== 'Cancelado';
}

const totalDe = (f: Fila) => (numero(f.cantidad) && numero(f.precio) ? numero(f.cantidad) * numero(f.precio) : 0);
const conDatos = (f: Fila) => !!(f.cliente?.trim() || f.producto?.trim());

const COLUMNAS_PEDIDOS: Columna[] = [
  { id: 'fecha', etiqueta: 'Fecha', tipo: 'fecha' },
  { id: 'entrega', etiqueta: 'Fecha de entrega', tipo: 'fecha' },
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Quién pidió' },
  { id: 'producto', etiqueta: 'Producto', placeholder: 'Como está en tu lista de precios' },
  { id: 'cantidad', etiqueta: 'Cantidad', tipo: 'numero', placeholder: '0' },
  { id: 'precio', etiqueta: 'Precio unitario', tipo: 'numero', placeholder: '$' },
  { id: 'responsable', etiqueta: 'Responsable', placeholder: 'Quién lo entrega' },
  { id: 'estado', etiqueta: 'Estado', placeholder: 'Por hacer, En curso, Entregado' },
];

/** Ejemplo de Grano Norte con fechas en torno a hoy (se arma al hacer clic, no se dibuja en el servidor). */
function ejemploPedidos(): Record<string, string>[] {
  return [
    { fecha: masDias(-4), entrega: masDias(-3), cliente: 'Cafetería Puerto Dulce', producto: 'Café en grano 1 kg', cantidad: '6', precio: '16000', responsable: 'Matías', estado: 'Entregado' },
    { fecha: masDias(-3), entrega: masDias(-1), cliente: 'Cowork Cerro Alegre', producto: 'Café molido 1 kg', cantidad: '4', precio: '16500', responsable: 'Sofía', estado: 'En curso' },
    { fecha: masDias(-1), entrega: masDias(0), cliente: 'Estudio Contable Ríos', producto: 'Plan oficina 4 kg al mes', cantidad: '1', precio: '58000', responsable: 'Matías', estado: 'En curso' },
    { fecha: masDias(0), entrega: masDias(2), cliente: 'Café La Subida', producto: 'Café en grano 250 g', cantidad: '2', precio: '5500', responsable: 'Sofía', estado: 'Por hacer' },
  ];
}

const CABECERA_HOJA = ['N°', 'Fecha', 'Cliente', 'Producto', 'Cantidad', 'Precio unitario', 'Total', 'Fecha de entrega', 'Responsable', 'Estado', 'Atrasado'];

function descargarPedidos(filas: Fila[]) {
  const hoy = isoLocal(new Date());
  descargarArchivo(
    'hoja-pedidos.csv',
    armarCsv(
      CABECERA_HOJA,
      filas.filter(conDatos).map((f, i) => [
        i + 1,
        fechaLegible(f.fecha),
        f.cliente ?? '',
        f.producto ?? '',
        f.cantidad ?? '',
        f.precio ?? '',
        totalDe(f) || '',
        fechaLegible(f.entrega),
        f.responsable ?? '',
        estadoDe(f.estado),
        atrasado(f, hoy) ? 'Sí' : '',
      ]),
    ),
    'text/csv',
  );
}

// ─── Lección 1 · Procesos ──────────────────────────────────────────────────

const CAMPOS_PROCESOS: Campo[] = [1, 2, 3].flatMap((n) => [
  { id: `n${n}`, etiqueta: `Proceso ${n} · nombre`, placeholder: n === 1 ? 'Ej.: llega un cliente nuevo' : n === 2 ? 'Ej.: entra un pedido' : 'Ej.: sale un despacho' },
  { id: `p${n}`, etiqueta: `Proceso ${n} · pasos (uno por línea: verbo + quién)`, filas: 5, placeholder: 'Recibir el pedido por WhatsApp — Sofía\nAnotarlo en la hoja Pedidos — Sofía' },
]);

const EJEMPLO_PROCESOS = {
  n1: 'Llega un cliente nuevo (oficina)',
  p1: 'Anotarlo en la hoja Clientes con su molienda y dirección — Sofía\nEnviar mensaje de bienvenida con días de entrega — Sofía\nAnotar el primer pedido en la hoja Pedidos — Sofía\nAgendar la primera entrega — Matías\nLlamar a la semana para preguntar cómo les fue — Camila',
  n2: 'Entra un pedido',
  p2: 'Anotar el pedido en la hoja Pedidos, en el momento — quien lo recibe\nConfirmar stock de grano verde — Sofía\nTostar según el plan del día — Pedro\nEnvasar y etiquetar con fecha de tostado — Pedro\nCambiar el estado a «En curso» — Pedro\nDespachar y avisar al cliente que va en camino — Matías',
  n3: 'Sale un despacho',
  p3: 'Revisar el checklist del pedido — Matías\nArmar la ruta del día con los pedidos que vencen hoy — Matías\nEntregar y pedir firma o foto — Matías\nCambiar el estado a «Entregado» en la hoja Pedidos — Matías',
};

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
        <p>Fíjate en que varios pasos son «anotar en la hoja» o «cambiar el estado»: así el proceso escrito y la planilla se mantienen al día solos.</p>
      </Explica>
      <DiagramaProcesoPasos className="mt-6" />
      <FotoBanda foto={APOYO.tostadoraPanel} posicion="center 45%" />
      <Subtitulo>Tus 3 procesos</Subtitulo>
      <Instruccion>Evita pasos vagos como «coordinar el pedido». Mejor: «Matías confirma por WhatsApp la hora de entrega con el cliente».</Instruccion>
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

// ─── Lección 2 · Del WhatsApp a la hoja Pedidos ───────────────────────────

const FALTA = [
  { id: 'ok', etiqueta: 'Está completo' },
  { id: 'cuando', etiqueta: 'Falta para cuándo' },
  { id: 'cuanto', etiqueta: 'Falta cuánto' },
];

const MENSAJES_PRACTICA = [
  { id: 'w1', texto: 'Cowork Cerro Alegre: «¿Nos mandan 4 kilos de molido para el jueves? Como siempre.»', correcta: 'ok', porque: 'Tiene cliente, producto, cantidad y fecha. Se anota tal cual y se confirma.' },
  { id: 'w2', texto: 'Café La Subida: «Necesito grano otra vez, ¿me mandan?»', correcta: 'cuanto', porque: 'Falta cuánto (¿250 g o 1 kg? ¿cuántos?). Se pregunta antes de anotar el total.' },
  { id: 'w3', texto: 'Estudio Contable Ríos (por correo): «Por favor, el plan oficina de este mes.»', correcta: 'cuando', porque: 'El producto y la cantidad están claros; falta la fecha de entrega. Se pregunta y se anota.' },
  { id: 'w4', texto: 'Cafetería Puerto Dulce (llamada): «5 kilos de grano para el martes temprano.»', correcta: 'ok', porque: 'Completo. Como llegó por teléfono, se anota igual en la hoja apenas se corta.' },
];

const CAMPOS_CONFIRMACION: Campo[] = [{ id: 'texto', etiqueta: 'Tu mensaje de confirmación', filas: 2 }];

function LeccionPedidos() {
  const [filas] = useFilas(K.pedidos);
  const montado = useMontado();
  const negocio = useNegocio();
  const ejemplo = useMemo(() => ejemploPedidos(), []);
  const lista = montado ? filas.filter(conDatos) : [];
  const total = lista.reduce((s, f) => s + totalDe(f), 0);
  const prompt = [
    `Te paso los mensajes de pedidos que le llegaron esta semana a ${negocio.trim() || '[mi negocio]'} por WhatsApp y correo.`,
    'Devuélveme una fila por pedido, con estas columnas y en este orden, separadas por punto y coma:',
    'Fecha; Cliente; Producto; Cantidad; Fecha de entrega; Responsable',
    'Si un dato no está en el mensaje, escribe «FALTA». No inventes cantidades ni fechas.',
    '',
    'MENSAJES:',
    '[pega aquí los mensajes]',
  ].join('\n');
  return (
    <>
      <Explica>
        <p>
          Hoy los pedidos de Grano Norte viven en el WhatsApp de Camila, en un correo y en la memoria de quien contestó el teléfono. Cuando alguien pregunta «¿qué hay que entregar mañana?», la respuesta es revisar todo de nuevo.
        </p>
        <p>
          La regla es una sola: <strong>cada pedido que llega, por donde llegue, se anota en una fila de la hoja Pedidos</strong>, en el momento y por quien lo recibe. La fila tiene lo mismo que tu planilla: fecha, cliente, producto, cantidad, fecha de entrega, responsable y estado. El precio y el total los completa la hoja desde tu lista de productos.
        </p>
        <p>Y si no está en la hoja, el pedido no existe. Suena duro, pero es lo que permite que tu equipo entregue sin preguntarte.</p>
      </Explica>
      <DiagramaMensajeAFila className="mt-6" />
      <Subtitulo>Práctica: ¿qué le falta a cada pedido?</Subtitulo>
      <Instruccion>Antes de anotar, revisa que el pedido tenga cuánto y para cuándo. Si falta algo, se pregunta antes de confirmar.</Instruccion>
      <Clasificador clave={K.practica} categorias={FALTA} items={MENSAJES_PRACTICA} />
      <Subtitulo>Confirma cada pedido con el cliente</Subtitulo>
      <Instruccion>Al anotarlo, respóndele al cliente con lo que quedó en la fila. Si algo está mal, se corrige ahí y no el día de la entrega.</Instruccion>
      <Campos clave={K.confirmacion} campos={CAMPOS_CONFIRMACION} ejemplo={{ texto: 'Anotado, [nombre]: [cantidad] de [producto] para el [día]. Te lo lleva [responsable]. ¿Va a la misma dirección?' }} />
      <Subtitulo>Tus pedidos de esta semana</Subtitulo>
      <Instruccion>Anota aquí 3 o 4 pedidos reales (o parte con el ejemplo). En las lecciones 4 y 5 vas a usar estas mismas filas. Descárgalas y pégalas en la hoja Pedidos de tu planilla.</Instruccion>
      <TablaEditable clave={K.pedidos} columnas={COLUMNAS_PEDIDOS} ejemplo={ejemplo} etiquetaFila="Pedido" textoAgregar="Agregar pedido" />
      {lista.length ? (
        <p className="mt-3 text-sm text-slate-300" aria-live="polite">
          {lista.length} {lista.length === 1 ? 'pedido' : 'pedidos'}{total ? ` · ${pesos(total)} en total` : ''}. En tu planilla, el total de cada fila se calcula solo.
        </p>
      ) : null}
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar para la hoja Pedidos (.csv)" disabled={!montado || lista.length === 0} onClick={() => descargarPedidos(filas)} />
      </div>
      <Freno>Ninguna fecha de entrega se confirma sin revisar stock o capacidad. Si no estás seguro, se anota «por confirmar» y lo decide una persona.</Freno>
      <details className="group mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-slate-300 hover:text-white">
          <span>Prompt para ChatGPT o Claude</span>
          <span className="font-mono text-xs text-slate-500 group-open:hidden">ver</span>
        </summary>
        <div className="border-t border-white/10 px-4 pb-4">
          <p className="mt-3 text-sm text-slate-300">
            Con tu IA: si se te juntaron mensajes sin anotar, pégalos en un chat y pídele las filas. Revisa cada fila antes de pegarla en la hoja: la IA puede inventar una cantidad o una fecha. Sin IA, el método funciona igual.
          </p>
          <BloqueCopiar titulo="Instrucción · mensajes a filas" texto={montado ? prompt : ''} className="mt-3" nota="Donde diga «FALTA», le preguntas al cliente." />
        </div>
      </details>
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
  { id: 'g6', texto: 'Pedido anotado en la hoja Pedidos con su fecha de entrega.' },
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
          Lo marca <strong>quien entrega</strong>, no tú. Y solo con el checklist completo se cambia el estado a «Entregado» en la hoja Pedidos. Así sabes que está hecho sin preguntar. Empieza por el tipo de trabajo que más errores te da hoy.
        </p>
      </Explica>
      <DiagramaChecklistEntrega className="mt-6" />
      <FotoBanda foto={APOYO.cajasEtiquetas} posicion="center 50%" />
      <Subtitulo>El de Grano Norte: «nuevo cliente oficina»</Subtitulo>
      <Instruccion>Márcalo como si fueras Matías preparando la primera entrega.</Instruccion>
      <Elegibles clave={K.checkGN} opciones={CHECK_GN} />
      <p className="mt-2 text-sm text-slate-400" aria-live="polite">
        {hechos === CHECK_GN.length ? 'Completo: ahora sí se puede marcar «Entregado».' : `${hechos} de ${CHECK_GN.length}. Mientras falte uno, no está entregado.`}
      </p>
      <Subtitulo>Tu checklist</Subtitulo>
      <Campos clave={K.checklist} campos={CAMPOS_CHECK} ejemplo={{ tipo: 'Nuevo cliente oficina', items: CHECK_GN.map((x) => x.texto).join('\n'), quien: 'Matías, de despacho' }} />
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
                'Mientras falte un punto, no está entregado: el estado en la hoja Pedidos sigue «En curso».',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · El estado de cada pedido en una vista ───────────────────

const COLUMNAS_VISTA: Estado[] = ['Por hacer', 'En curso', 'Entregado'];

function VistaEstados() {
  const [filas, setFilas] = useFilas(K.pedidos);
  const montado = useMontado();
  const hoy = montado ? isoLocal(new Date()) : '';
  const lista = montado ? filas.filter(conDatos) : [];
  const atrasados = lista.filter((f) => atrasado(f, hoy));
  const mover = (id: string, d: number) =>
    setFilas((p) =>
      p.map((f) => {
        if (f._id !== id) return f;
        const i = Math.max(0, COLUMNAS_VISTA.indexOf(estadoDe(f.estado)));
        const j = Math.min(COLUMNAS_VISTA.length - 1, Math.max(0, i + d));
        return { ...f, estado: COLUMNAS_VISTA[j] };
      }),
    );
  if (!lista.length) {
    return (
      <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-300">
        Todavía no hay pedidos. Anótalos en la <a href="#leccion-2" className="text-[#5fb2dd] underline-offset-2 hover:underline">lección 2</a> (o parte con el ejemplo) y vuelve: aquí aparecen ordenados por estado.
      </p>
    );
  }
  return (
    <div className="mt-5">
      <p className={`rounded-xl border p-3 text-sm ${atrasados.length ? 'border-rose-400/40 bg-rose-500/[0.08] text-rose-100' : 'border-emerald-400/40 bg-emerald-500/[0.08] text-emerald-100'}`} aria-live="polite">
        {atrasados.length
          ? `${atrasados.length} ${atrasados.length === 1 ? 'pedido atrasado' : 'pedidos atrasados'}: ${atrasados.map((f) => f.cliente || f.producto).join(' · ')}. En tu planilla, la columna Atrasado dice «Sí».`
          : 'Ningún pedido atrasado. En tu planilla, la columna Atrasado está vacía.'}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {COLUMNAS_VISTA.map((c, ci) => {
          const deCol = lista.filter((f) => estadoDe(f.estado) === c).sort((a, b) => (a.entrega ?? '').localeCompare(b.entrega ?? ''));
          return (
            <section key={c} className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5" aria-label={c}>
              <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">
                {c} <span className="text-slate-500">{deCol.length}</span>
              </p>
              <ul className="mt-2 space-y-2">
                {deCol.map((f) => {
                  const tarde = atrasado(f, hoy);
                  return (
                    <li key={f._id} className={`rounded-lg p-2.5 ${tarde ? 'border border-rose-400/50 bg-rose-500/10' : 'bg-[#24314d]'}`}>
                      <p className="break-words text-sm text-white">{f.cliente || '(sin cliente)'}</p>
                      <p className="break-words text-xs text-slate-300">
                        {[f.cantidad, f.producto].filter(Boolean).join(' × ')}
                      </p>
                      <p className="text-xs text-slate-400">
                        {f.entrega ? `Entrega ${fechaLegible(f.entrega)}` : 'Sin fecha de entrega'}
                        {f.responsable ? ` · ${f.responsable}` : ''}
                        {tarde ? <span className="ml-1 font-semibold text-rose-200">· Atrasado</span> : null}
                      </p>
                      <div className="mt-1.5 flex gap-1">
                        <button type="button" disabled={ci === 0} onClick={() => mover(f._id, -1)} aria-label={`Volver «${f.cliente}» a ${COLUMNAS_VISTA[ci - 1] ?? c}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 disabled:opacity-30">
                          <ArrowLeft className="h-4 w-4" aria-hidden />
                        </button>
                        <button type="button" disabled={ci === COLUMNAS_VISTA.length - 1} onClick={() => mover(f._id, 1)} aria-label={`Pasar «${f.cliente}» a ${COLUMNAS_VISTA[ci + 1] ?? c}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 disabled:opacity-30">
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

const PASOS_FILTRO = [
  'Abre la hoja Pedidos y selecciona la fila de títulos.',
  'En Google Sheets: «Datos» → «Crear un filtro». En Excel: «Datos» → «Filtro».',
  'En la columna Estado, desmarca «Entregado» y «Cancelado».',
  'Ordena por «Fecha de entrega», de la más antigua a la más nueva.',
  'Arriba quedan los atrasados y lo que vence hoy. Si cada persona quiere ver solo lo suyo, en Google Sheets usa «Vistas de filtro» por responsable.',
];

const CAMPOS_REGLAS_ESTADO: Campo[] = [
  { id: 'quien', etiqueta: 'Quién cambia el estado', placeholder: 'Quien mueve el trabajo, cambia el estado' },
  { id: 'cuando', etiqueta: 'Cuándo se mira la vista de pedidos', placeholder: 'Ej.: 9:00 y 16:00' },
  { id: 'atraso', etiqueta: 'Qué se hace con un pedido atrasado', placeholder: 'Ej.: el responsable le avisa al cliente antes de las 11 y le propone una fecha' },
];

function LeccionEstado() {
  const [filas] = useFilas(K.pedidos);
  const [reglas] = useTextos(K.reglasEstado);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          ¿Cuántas veces al día te preguntan «¿cómo va lo de…?»? Cada pregunta es una señal de que el estado no está a la vista. No necesitas otra herramienta: la hoja Pedidos ya tiene la columna <strong>Estado</strong> (por hacer, en curso, entregado o cancelado) y la columna <strong>Atrasado</strong>, que se calcula sola cuando la fecha de entrega pasó y el pedido no está entregado.
        </p>
        <p>
          La regla que lo hace funcionar: <strong>quien mueve el trabajo, cambia el estado</strong>. Y una alerta: si «en curso» se llena, el equipo está empezando mucho y terminando poco.
        </p>
      </Explica>
      <DiagramaEstadosPedido className="mt-6" />
      <Subtitulo>Tus pedidos, por estado</Subtitulo>
      <Instruccion>Son las filas que anotaste en la lección 2, ordenadas por fecha de entrega. Muévelas con las flechas como lo harías en la columna Estado.</Instruccion>
      <VistaEstados />
      <Subtitulo>El filtro en tu planilla</Subtitulo>
      <ol className="mt-3 space-y-2">
        {PASOS_FILTRO.map((p, i) => (
          <li key={p} className="flex gap-3 text-slate-300">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-slate-300">{i + 1}</span>
            <span>{p}</span>
          </li>
        ))}
      </ol>
      <Subtitulo>Las reglas del estado</Subtitulo>
      <Campos clave={K.reglasEstado} campos={CAMPOS_REGLAS_ESTADO} />
      <div className="mt-4 flex flex-wrap gap-3">
        <BotonDescarga etiqueta="Descargar para la hoja Pedidos (.csv)" disabled={!montado || filas.filter(conDatos).length === 0} onClick={() => descargarPedidos(filas)} />
        <BotonDescarga
          etiqueta="Descargar reglas (.txt)"
          disabled={!montado}
          onClick={() =>
            descargarArchivo(
              'reglas-del-estado.txt',
              armarTxt('Estado de los pedidos', [
                `Cambia el estado: ${(reglas.quien ?? '').trim() || 'quien mueve el trabajo'}`,
                `Se mira la vista: ${(reglas.cuando ?? '').trim() || '(definir)'}`,
                `Pedido atrasado: ${(reglas.atraso ?? '').trim() || '(definir)'}`,
                '',
                'EL FILTRO',
                ...PASOS_FILTRO.map((p, i) => `${i + 1}. ${p}`),
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · El resumen del día ───────────────────────────────────────

const CAMPOS_RESUMEN: Campo[] = [
  { id: 'hora', etiqueta: 'A qué hora lo lees', placeholder: 'Ej.: 8:30, de lunes a viernes' },
  { id: 'donde', etiqueta: 'Dónde estás a esa hora', placeholder: 'Ej.: en la tostaduría, con el primer café' },
  { id: 'quien', etiqueta: 'Quién lo lee si no estás', placeholder: 'Ej.: Sofía' },
];

function ResumenDeHoy() {
  const [filas] = useFilas(K.pedidos);
  const montado = useMontado();
  if (!montado) return null;
  const hoy = isoLocal(new Date());
  const ayer = masDias(-1);
  const lista = filas.filter(conDatos);
  if (!lista.length) {
    return (
      <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-300">
        Cuando anotes pedidos en la <a href="#leccion-2" className="text-[#5fb2dd] underline-offset-2 hover:underline">lección 2</a>, aquí aparece tu resumen de hoy armado con esas filas.
      </p>
    );
  }
  const llego = lista.filter((f) => f.fecha === hoy || f.fecha === ayer);
  const falta = lista.filter((f) => ['Por hacer', 'En curso'].includes(estadoDe(f.estado)));
  const vence = lista.filter((f) => (f.entrega === hoy && estadoDe(f.estado) !== 'Entregado' && estadoDe(f.estado) !== 'Cancelado') || atrasado(f, hoy));
  const bloque = (t: string, xs: Fila[], vacio: string, detalle: (f: Fila) => string) => (
    <div className="border-t border-white/10 py-3 first:border-t-0 first:pt-0">
      <p className="text-xs uppercase tracking-wider text-[#5fb2dd]">
        {t} · {xs.length}
      </p>
      {xs.length ? (
        <ul className="mt-1 space-y-0.5 text-sm text-slate-100">
          {xs.map((f) => (
            <li key={f._id} className="break-words">
              {f.cliente || '(sin cliente)'} · {detalle(f)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-sm text-slate-400">{vacio}</p>
      )}
    </div>
  );
  return (
    <div className="mt-5 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Tu resumen de hoy, con tus filas</p>
      <div className="mt-3">
        {bloque('Qué llegó (ayer y hoy)', llego, 'Nada nuevo desde ayer.', (f) => [f.cantidad, f.producto].filter(Boolean).join(' × ') || 'pedido')}
        {bloque('Qué falta', falta, 'Nada pendiente.', (f) => `${estadoDe(f.estado).toLowerCase()}${f.responsable ? ` · ${f.responsable}` : ''}`)}
        {bloque('Qué vence (hoy o atrasado)', vence, 'Nada vence hoy.', (f) => (atrasado(f, hoy) ? `atrasado desde el ${fechaLegible(f.entrega)}` : 'vence hoy'))}
      </div>
    </div>
  );
}

function LeccionResumen() {
  const [r] = useTextos(K.resumen);
  const montado = useMontado();
  const intencion = `Si son las ${(r.hora ?? '').trim() || '[hora]'} y estoy ${(r.donde ?? '').trim() || '[lugar]'}, entonces abro la hoja Pedidos y leo el resumen.`;
  return (
    <>
      <Explica>
        <p>
          Partir el día leyendo cuarenta mensajes es partir el día atrasado. Mejor partir con un <strong>resumen de cinco minutos</strong> que responde tres preguntas: qué llegó, qué falta y qué vence hoy.
        </p>
        <p>
          No lo prepara nadie: lo lees directo en la hoja Pedidos, con el filtro de la lección anterior. Qué llegó son las filas con fecha de ayer u hoy; qué falta, las que están por hacer o en curso; qué vence, las que se entregan hoy o dicen «Atrasado». Después decides tú y avisas lo que cambia.
        </p>
        <p>
          Lo que más ayuda a que se vuelva costumbre es decidir de antemano <strong>a qué hora y dónde</strong> lo vas a leer, y escribirlo. En el módulo 6 lo juntas con el tablero de los lunes.
        </p>
      </Explica>
      <DiagramaResumenPlanilla className="mt-6" />
      <Pantallita titulo="Grano Norte · resumen del martes" className="mt-6">
        <p className="text-sm font-semibold">Qué llegó</p>
        <p className="text-sm">2 pedidos nuevos (Café La Subida, Estudio Contable Ríos).</p>
        <p className="mt-2 text-sm font-semibold">Qué falta</p>
        <p className="text-sm">Molido para Cowork Cerro Alegre (en curso, Sofía) · plan oficina de Estudio Ríos (en curso, Matías).</p>
        <p className="mt-2 text-sm font-semibold">Qué vence hoy</p>
        <p className="text-sm">Cowork Cerro Alegre, atrasado desde ayer: Sofía le avisa antes de las 11.</p>
        <p className="mt-2 text-sm text-slate-400">Decide Camila: ¿se adelanta el tueste para Café La Subida?</p>
      </Pantallita>
      <Subtitulo>Tu resumen de hoy</Subtitulo>
      <ResumenDeHoy />
      <Subtitulo>A qué hora y dónde</Subtitulo>
      <Campos clave={K.resumen} campos={CAMPOS_RESUMEN} />
      {montado && (r.hora?.trim() || r.donde?.trim()) ? (
        <p className="mt-3 rounded-xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-3 text-sm text-slate-100" aria-live="polite">
          {intencion}
        </p>
      ) : null}
      <Freno>El resumen ordena; no responde ni cambia nada solo. Las decisiones del día las toma una persona.</Freno>
      <p className="mt-4 text-sm text-slate-400">
        Con tu IA: pega tus filas y pídele el resumen en las tres preguntas. Lo revisas tú antes de avisarle a nadie. Leerlo directo en la hoja toma lo mismo.
      </p>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mi rutina del resumen (.txt)"
          disabled={!montado}
          onClick={() =>
            descargarArchivo(
              'resumen-del-dia.txt',
              armarTxt('Resumen del día', [
                intencion,
                `Si no estoy, lo lee: ${(r.quien ?? '').trim() || '(definir)'}`,
                '',
                'EN LA HOJA PEDIDOS (5 minutos)',
                'QUÉ LLEGÓ: filas con fecha de ayer u hoy.',
                'QUÉ FALTA: estado «Por hacer» o «En curso», con su responsable.',
                'QUÉ VENCE: fecha de entrega hoy, o columna Atrasado = «Sí».',
                'DECISIONES PARA HOY:',
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
  const [filas] = useFilas(K.pedidos);
  const [reglas] = useTextos(K.reglasEstado);
  const [c] = useTextos(K.checklist);
  const [r] = useTextos(K.resumen);
  const montado = useMontado();
  const negocio = useNegocio();
  const hoy = montado ? isoLocal(new Date()) : '';
  const pedidos = montado ? filas.filter(conDatos) : [];
  const atrasados = pedidos.filter((f) => atrasado(f, hoy));
  const procesos = montado ? [1, 2, 3].filter((n) => v[`n${n}`]?.trim()).map((n) => `${v[`n${n}`]!.trim()} (${pasosDe(v[`p${n}`]).length} pasos)`) : [];
  return (
    <CierreModulo
      numero={3}
      area="operacion"
      hoja="Pedidos"
      pruebaReal={[
        { id: 'p1', texto: 'Anoté cada pedido de la semana en la hoja Pedidos el mismo día que llegó.' },
        { id: 'p2', texto: 'Usé el checklist en cada entrega y recién ahí marqué «Entregado».' },
        { id: 'p3', texto: 'Leí el resumen del día en la hoja al menos 4 mañanas.' },
        { id: 'p4', texto: 'Alguien del equipo cambió el estado de un pedido sin que yo se lo pidiera.' },
        { id: 'p5', texto: 'Ningún pedido atrasado pasó un día sin que alguien le avisara al cliente.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Tus 3 procesos" valor={procesos.join('\n')} leccion={1} />
          <FilaResumen
            etiqueta="Hoja Pedidos"
            valor={pedidos.length ? `${pedidos.length} ${pedidos.length === 1 ? 'pedido anotado' : 'pedidos anotados'} · ${atrasados.length} ${atrasados.length === 1 ? 'atrasado' : 'atrasados'}` : ''}
            leccion={2}
          />
          <FilaResumen etiqueta="Checklist de entrega" valor={montado && c.tipo?.trim() ? `${c.tipo.trim()} · ${pasosDe(c.items).length} puntos` : ''} leccion={3} />
          <FilaResumen
            etiqueta="Estado de los pedidos"
            valor={montado && (reglas.quien?.trim() || reglas.cuando?.trim()) ? `Lo cambia ${reglas.quien?.trim() || 'quien mueve el trabajo'}${reglas.cuando?.trim() ? ` · se mira ${reglas.cuando.trim()}` : ''}` : ''}
            leccion={4}
          />
          <FilaResumen etiqueta="Resumen del día" valor={montado && r.hora?.trim() ? `${r.hora.trim()}${r.donde?.trim() ? ` · ${r.donde.trim()}` : ''}${r.quien?.trim() ? ` · si no estoy, ${r.quien.trim()}` : ''}` : ''} leccion={5} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-3-pedidos-y-operacion.txt',
          armarTxt(
            'Módulo 3 · Pedidos y operación',
            [
              ...[1, 2, 3].flatMap((n) => [`PROCESO ${n}: ${(v[`n${n}`] ?? '').trim() || '(pendiente)'}`, ...pasosDe(v[`p${n}`]).map((x, i) => `${i + 1}. ${x}`), '']),
              `CHECKLIST DE ENTREGA: ${(c.tipo ?? '').trim() || '(pendiente)'}`,
              ...pasosDe(c.items).map((x) => `[ ] ${x}`),
              '',
              'HOJA PEDIDOS',
              ...(pedidos.length
                ? pedidos.map((f, i) => `${i + 1}. ${fechaLegible(f.fecha)} · ${f.cliente ?? ''} · ${[f.cantidad, f.producto].filter(Boolean).join(' × ')} · entrega ${fechaLegible(f.entrega) || '(sin fecha)'} · ${f.responsable ?? ''} · ${estadoDe(f.estado)}${atrasado(f, hoy) ? ' · ATRASADO' : ''}`)
                : ['(pendiente)']),
              `Cambia el estado: ${(reglas.quien ?? '').trim() || 'quien mueve el trabajo'} · Se mira: ${(reglas.cuando ?? '').trim() || '(definir)'}`,
              '',
              `RESUMEN DEL DÍA: ${(r.hora ?? '').trim() || '(definir hora)'} · ${(r.donde ?? '').trim() || '(definir lugar)'}`,
              '',
              'RUTINA: cada mañana, 5 minutos con la hoja Pedidos (qué llegó, qué falta, qué vence).',
              'NÚMERO SEMANAL: pedidos entregados a tiempo vs. pedidos totales (columna Atrasado).',
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
    id: 'pedidos',
    bajada: 'Cada pedido que llega por WhatsApp, correo o teléfono queda en una fila: cliente, qué pidió, para cuándo y quién lo entrega.',
    portada: APOYO.celularMensajes,
    posicion: 'center 40%',
    contenido: <LeccionPedidos />,
    checklist: [
      { id: 'l2a', texto: 'Hice la práctica de los 4 mensajes.' },
      { id: 'l2b', texto: 'Anoté mis pedidos de esta semana con las columnas de la hoja.' },
      { id: 'l2c', texto: 'Los pegué en la hoja Pedidos de mi planilla.' },
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
    id: 'estado',
    bajada: 'Por hacer, en curso, entregado: filtras la hoja Pedidos y ves qué está atrasado sin preguntarle a nadie.',
    portada: APOYO.tableroKanban,
    contenido: <LeccionEstado />,
    checklist: [
      { id: 'l4a', texto: 'Ordené mis pedidos por estado y fecha de entrega.' },
      { id: 'l4b', texto: 'Armé el filtro en mi hoja Pedidos.' },
      { id: 'l4c', texto: 'Definí quién cambia el estado y qué se hace con un atrasado.' },
    ],
  },
  {
    id: 'resumen',
    bajada: 'Qué llegó, qué falta y qué vence: lo lees en la hoja Pedidos en 5 minutos cada mañana.',
    portada: FOTOS.cafeCerca,
    posicion: 'center 30%',
    contenido: <LeccionResumen />,
    checklist: [
      { id: 'l5a', texto: 'Leí mi resumen de hoy con mis filas.' },
      { id: 'l5b', texto: 'Escribí a qué hora y dónde lo voy a leer.' },
      { id: 'l5c', texto: 'Definí quién lo lee si no estoy.' },
    ],
  },
];

export default function Modulo3Content() {
  return (
    <ModuloCurso
      numero={3}
      intro="Cada pedido, en una fila. Agregas la hoja Pedidos a tu planilla: al terminar tienes tus 3 procesos escritos, el checklist de entrega, cada pedido de la semana anotado con su estado y un resumen que lees en 5 minutos cada mañana."
      portada={APOYO.escenaDespacho}
      portadaPosicion="center 40%"
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
