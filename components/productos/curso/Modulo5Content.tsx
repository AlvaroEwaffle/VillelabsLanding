'use client';

/*
 * /curso/modulo-5 — Módulo 5 «Cobranza y caja: cobrar a tiempo y saber cuánta plata tienes» (curso v1.1,
 * «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets», 8-nov-2026).
 * 4 lecciones, una por hoja de la planilla del sistema: Cobranza, Caja, la caja de las próximas 4 semanas y
 * Productos (precio y margen). Cierre con prueba real, semáforo antes/después y entregable.
 * Columnas iguales a las de lib/productos/curso/plantilla.ts. Los montos de Grano Norte son ficticios, en pesos.
 * La IA es opcional: el módulo funciona completo sin ella.
 */

import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { CATEGORIAS_CAJA } from '@/lib/productos/curso/plantilla';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaCobranza, DiagramaMargen } from '@/components/productos/diagramas/modulos';
import { DiagramaCuatroSemanas, DiagramaHojaCaja } from '@/components/productos/diagramas/sistema-m56';
import {
  BloqueCopiar,
  BotonDescarga,
  Campos,
  CierreModulo,
  Explica,
  FilaResumen,
  FotoBanda,
  Freno,
  Instruccion,
  ModuloCurso,
  Subtitulo,
  TablaEditable,
  armarCsv,
  armarIcs,
  armarTxt,
  claveModulo,
  descargarArchivo,
  fechaCorta,
  numero,
  pesos,
  sumarDias,
  useFilas,
  useNegocio,
  useTextos,
  type Campo,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  cobranza: claveModulo(5, 'cobranza'),
  factura: claveModulo(5, 'factura'),
  hojaCobranza: claveModulo(5, 'hoja_cobranza'),
  caja: claveModulo(5, 'caja'),
  flujo: claveModulo(5, 'flujo'),
  margen: claveModulo(5, 'margen'),
};

const claseInput =
  'mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none';

const DIA_MS = 86400000;
const hoyUTC = () => {
  const d = new Date();
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
};
const isoMs = (iso?: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null;
};
const isoDe = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const legible = (iso?: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};
const pagado = (f: Fila) => /^s[ií]/i.test((f.pagado ?? '').trim());

/** Vencimiento de una factura: el que escribiste o, si no, emisión + 30 días (lo mismo que la planilla). */
function vencimientoDe(f: Fila): string {
  if (isoMs(f.vence) !== null) return f.vence;
  const e = isoMs(f.emision);
  return e === null ? '' : isoDe(e + 30 * DIA_MS);
}

function atrasoDe(f: Fila, hoy: number): number | null {
  const v = isoMs(vencimientoDe(f));
  if (v === null || pagado(f)) return null;
  return Math.max(0, Math.round((hoy - v) / DIA_MS));
}

// ─── Lección 1 · Cobranza ──────────────────────────────────────────────────

const CAMPOS_COBRANZA: Campo[] = [
  { id: 'antes', etiqueta: '3 días antes del vencimiento', filas: 3 },
  { id: 'dia', etiqueta: 'El día del vencimiento', filas: 2 },
  { id: 'despues', etiqueta: '5 días después', filas: 3 },
  { id: 'llamar', etiqueta: 'Cuándo llamas tú', placeholder: 'Ej.: a los 10 días, o antes si el monto supera $500.000' },
];

const EJEMPLO_COBRANZA = {
  antes: 'Hola, [nombre]: te recuerdo que la factura [número] por [monto] vence el [fecha]. Te dejo los datos para transferir. ¡Gracias!',
  dia: 'Hola, [nombre]: hoy vence la factura [número] por [monto]. Si ya la pagaste, no te preocupes por este mensaje.',
  despues: 'Hola, [nombre]: la factura [número] por [monto] venció el [fecha]. ¿Me confirmas cuándo la puedes pagar? Si hay algún problema, lo vemos.',
  llamar: 'A los 10 días sin respuesta, o antes si el monto supera lo de un mes de café.',
};

const COLUMNAS_COBRANZA = [
  { id: 'documento', etiqueta: 'Factura o boleta', placeholder: 'Ej.: F-1021' },
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Igual que en tu hoja Clientes' },
  { id: 'monto', etiqueta: 'Monto', tipo: 'numero' as const, placeholder: '$' },
  { id: 'emision', etiqueta: 'Emisión', tipo: 'fecha' as const },
  { id: 'vence', etiqueta: 'Vence (si no, a 30 días)', tipo: 'fecha' as const },
  { id: 'pagado', etiqueta: 'Pagado (Sí / No)', placeholder: 'No' },
];

function ejemploCobranza(): Record<string, string>[] {
  const h = hoyUTC();
  const d = (n: number) => isoDe(h + n * DIA_MS);
  return [
    { documento: 'F-1021', cliente: 'Cafetería Puerto Dulce', monto: '96000', emision: d(-40), vence: '', pagado: 'No' },
    { documento: 'F-1022', cliente: 'Estudio Contable Ríos', monto: '58000', emision: d(-25), vence: '', pagado: 'No' },
    { documento: 'F-1018', cliente: 'Cowork Cerro Alegre', monto: '64000', emision: d(-45), vence: '', pagado: 'Sí' },
    { documento: 'B-0310', cliente: 'Daniela Ríos', monto: '11000', emision: d(-2), vence: '', pagado: 'No' },
  ];
}

function csvCobranza(filas: Fila[]) {
  const h = hoyUTC();
  return armarCsv(
    ['Factura o boleta', 'Cliente', 'Pedido N°', 'Monto', 'Emisión', 'Vencimiento', 'Pagado', 'Fecha de pago', 'Días de atraso', 'Próximo recordatorio'],
    filas.map((f) => {
      const a = atrasoDe(f, h);
      return [f.documento ?? '', f.cliente ?? '', '', numero(f.monto) || '', legible(f.emision), legible(vencimientoDe(f)), pagado(f) ? 'Sí' : 'No', '', a ?? '', ''];
    }),
  );
}

function LeccionCobranza() {
  const [c] = useTextos(K.cobranza);
  const [f, setF] = useTextos(K.factura);
  const [hoja] = useFilas(K.hojaCobranza);
  const montado = useMontado();
  const fechas = f.vence ? [-3, 0, 5, 10].map((d) => ({ d, f: sumarDias(f.vence, d) })) : [];
  const etiquetas: Record<number, string> = { [-3]: 'Recordatorio amable', 0: 'Aviso del día', 5: 'Factura vencida', 10: 'Llamas tú' };
  const h = hoyUTC();
  const filas = montado ? hoja.filter((x) => (x.documento ?? '').trim() || (x.cliente ?? '').trim()) : [];
  const porCobrar = filas.filter((x) => !pagado(x)).reduce((s, x) => s + numero(x.monto), 0);
  const vencido = filas.filter((x) => (atrasoDe(x, h) ?? 0) > 0).reduce((s, x) => s + numero(x.monto), 0);
  return (
    <>
      <Explica>
        <p>
          Perseguir pagos a fin de mes es incómodo para ti y para tu cliente. Con <strong>fechas fijas</strong>, deja de ser personal: es simplemente cómo funciona tu negocio.
        </p>
        <p>
          Para eso necesitas dos cosas. La primera, <strong>la hoja Cobranza</strong>: cada factura o boleta en una fila, con su monto, su emisión y su vencimiento. La planilla calcula sola los días de atraso, y el tablero suma lo que tienes por cobrar y lo vencido. La segunda, <strong>tres recordatorios con tu tono</strong>: 3 días antes del vencimiento, el mismo día y 5 días después. Si no hay respuesta, llamas.
        </p>
      </Explica>
      <DiagramaCobranza className="mt-6" />
      <Pantallita titulo="Grano Norte · hoja Cobranza" className="mt-6">
        <p className="text-sm">F-1021 · Cafetería Puerto Dulce · $96.000 · emitida hace 40 días, venció hace 10: «Llamar hoy».</p>
        <p className="mt-2 text-sm text-slate-400">Antes, Camila se enteraba a fin de mes. Ahora la fila le avisa el día que vence.</p>
      </Pantallita>

      <Subtitulo>1 · Tu hoja Cobranza</Subtitulo>
      <Instruccion>Anota las facturas o boletas que tienes sin pagar (y las de este mes). Si no escribes el vencimiento, se cuenta a 30 días de la emisión, como en la planilla.</Instruccion>
      <TablaEditable clave={K.hojaCobranza} columnas={COLUMNAS_COBRANZA} ejemplo={montado ? ejemploCobranza() : undefined} etiquetaFila="Factura" textoAgregar="Agregar factura o boleta" maxFilas={60} />
      {filas.length ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Por cobrar</p>
              <p className="mt-1 font-serif text-2xl text-white">{pesos(porCobrar)}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-300">Vencido</p>
              <p className="mt-1 font-serif text-2xl text-white">{pesos(vencido)}</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-sm text-slate-200">
            {filas.map((x) => {
              const a = atrasoDe(x, h);
              return (
                <li key={x._id} className="flex flex-wrap justify-between gap-x-3">
                  <span className="min-w-0">
                    {(x.documento ?? '').trim() || 'Sin número'} · {(x.cliente ?? '').trim() || 'sin cliente'}
                  </span>
                  <span className={`font-mono text-xs ${a ? 'text-rose-300' : 'text-slate-400'}`}>
                    {pagado(x) ? 'pagada' : a ? `${a} días de atraso` : vencimientoDe(x) ? `vence ${legible(vencimientoDe(x))}` : 'sin fecha'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <Subtitulo>2 · Tus 3 recordatorios</Subtitulo>
      <Campos clave={K.cobranza} campos={CAMPOS_COBRANZA} ejemplo={EJEMPLO_COBRANZA} />

      <Subtitulo>3 · Las fechas de una factura real</Subtitulo>
      <Instruccion>Pon el vencimiento de una factura y descarga los recordatorios a tu calendario. En la planilla, anótalos en la columna «Próximo recordatorio».</Instruccion>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="col-span-2 block text-xs text-slate-400">
          Cliente y número de factura
          <input value={f.cliente ?? ''} onChange={(e) => setF((p) => ({ ...p, cliente: e.target.value }))} placeholder="Ej.: Puerto Dulce · F-1021" className={claseInput} />
        </label>
        <label className="block min-w-0 text-xs text-slate-400">
          Vence el
          <input type="date" value={f.vence ?? ''} onChange={(e) => setF((p) => ({ ...p, vence: e.target.value }))} className={claseInput} />
        </label>
        <label className="block min-w-0 text-xs text-slate-400">
          Monto
          <input inputMode="numeric" value={f.monto ?? ''} onChange={(e) => setF((p) => ({ ...p, monto: e.target.value }))} placeholder="$" className={claseInput} />
        </label>
      </div>
      {montado && fechas.length ? (
        <ul className="mt-4 space-y-1.5 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4 text-sm text-slate-200" aria-live="polite">
          {fechas.map((x) => (
            <li key={x.d} className="flex justify-between gap-3">
              <span>{etiquetas[x.d]}</span>
              <span className="font-mono text-[#5fb2dd]">{x.f ? fechaCorta(x.f) : ''}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <Freno>Los recordatorios los envía o revisa una persona. Los acuerdos de pago y cualquier cambio de datos bancarios los decide siempre una persona (y un cambio de cuenta se confirma por teléfono).</Freno>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BotonDescarga etiqueta="Descargar hoja Cobranza (.csv)" disabled={!filas.length} onClick={() => descargarArchivo('hoja-cobranza.csv', csvCobranza(filas), 'text/csv')} />
        <BotonDescarga
          etiqueta="Descargar recordatorios (.ics)"
          disabled={!montado || !fechas.length}
          onClick={() =>
            descargarArchivo(
              'cobranza-recordatorios.ics',
              armarIcs(
                fechas
                  .filter((x) => x.f)
                  .map((x) => ({
                    fecha: x.f!,
                    titulo: `Cobranza · ${etiquetas[x.d]} · ${(f.cliente ?? '').trim() || 'factura'}`,
                    detalle: x.d === -3 ? c.antes ?? '' : x.d === 0 ? c.dia ?? '' : x.d === 5 ? c.despues ?? '' : 'Llamar al cliente.',
                  })),
              ),
              'text/calendar',
            )
          }
        />
        <BotonDescarga
          etiqueta="Descargar mensajes (.txt)"
          disabled={!montado || !c.antes?.trim()}
          onClick={() => descargarArchivo('cobranza-mensajes.txt', armarTxt('Cobranza sin perseguir a nadie', CAMPOS_COBRANZA.flatMap((x) => [x.etiqueta.toUpperCase(), (c[x.id] ?? '').trim() || '(sin escribir)', ''])))}
        />
      </div>
    </>
  );
}

// ─── Lección 2 · La hoja Caja ─────────────────────────────────────────────

const COLUMNAS_CAJA = [
  { id: 'fecha', etiqueta: 'Fecha', tipo: 'fecha' as const },
  { id: 'concepto', etiqueta: 'Concepto', placeholder: 'Ej.: pago F-1018, arriendo, café verde' },
  { id: 'categoria', etiqueta: 'Categoría', placeholder: 'Saldo inicial, Cobranza, Insumos…' },
  { id: 'entra', etiqueta: 'Entra', tipo: 'numero' as const, placeholder: '$' },
  { id: 'sale', etiqueta: 'Sale', tipo: 'numero' as const, placeholder: '$' },
];

function ejemploCaja(): Record<string, string>[] {
  const h = hoyUTC();
  const d = (n: number) => isoDe(h + n * DIA_MS);
  return [
    { fecha: d(-30), concepto: 'Saldo de la cuenta al empezar', categoria: 'Saldo inicial', entra: '850000', sale: '' },
    { fecha: d(-14), concepto: 'Pago F-1018 Cowork Cerro Alegre', categoria: 'Cobranza', entra: '64000', sale: '' },
    { fecha: d(-12), concepto: 'Café verde, saco de 30 kg', categoria: 'Insumos', entra: '', sale: '320000' },
    { fecha: d(-10), concepto: 'Arriendo de la tostaduría', categoria: 'Arriendo', entra: '', sale: '280000' },
    { fecha: d(-9), concepto: 'Pago F-1019 Oficinas Bahía', categoria: 'Cobranza', entra: '116000', sale: '' },
    { fecha: d(-5), concepto: 'Ventas por Instagram de la semana', categoria: 'Venta al contado', entra: '42000', sale: '' },
    { fecha: d(-1), concepto: 'Bencina despachos', categoria: 'Despacho', entra: '', sale: '35000' },
  ];
}

function saldosCaja(filas: Fila[]) {
  let saldo = 0;
  return filas.map((f) => {
    saldo += numero(f.entra) - numero(f.sale);
    return { f, saldo };
  });
}

/** Saldo de la hoja Caja guardada en este navegador (lo usa la lección 3). */
function useSaldoCaja() {
  const [filas] = useFilas(K.caja);
  const montado = useMontado();
  const conDatos = montado ? filas.filter((f) => numero(f.entra) || numero(f.sale)) : [];
  return conDatos.length ? conDatos.reduce((s, f) => s + numero(f.entra) - numero(f.sale), 0) : null;
}

const PROMPT_BOLETA = [
  'Te adjunto la foto de una boleta o factura. Devuélveme UNA línea separada por punto y coma, sin nada más:',
  'fecha (DD-MM-AAAA); concepto; categoría; monto (solo números)',
  '',
  `La categoría tiene que ser una de esta lista: ${CATEGORIAS_CAJA.filter((c) => c !== 'Saldo inicial').join(', ')}.`,
  'Si un dato no se lee bien, escribe «REVISAR» en ese campo; no lo inventes.',
].join('\n');

function LeccionCaja() {
  const [filas] = useFilas(K.caja);
  const montado = useMontado();
  const conDatos = montado ? filas.filter((f) => numero(f.entra) || numero(f.sale)) : [];
  const lineas = saldosCaja(conDatos);
  const saldo = lineas.length ? lineas[lineas.length - 1].saldo : 0;
  const salidas = new Map<string, number>();
  conDatos.forEach((f) => {
    if (numero(f.sale)) salidas.set((f.categoria ?? '').trim() || 'Sin categoría', (salidas.get((f.categoria ?? '').trim() || 'Sin categoría') ?? 0) + numero(f.sale));
  });
  const totalSale = Array.from(salidas.values()).reduce((s, x) => s + x, 0);
  return (
    <>
      <Explica>
        <p>
          ¿Sabes cuánta plata tienes hoy sin abrir el banco? La <strong>hoja Caja</strong> responde eso: una fila por cada movimiento, con lo que <strong>entra</strong> y lo que <strong>sale</strong>, y el saldo calculado solo. No es contabilidad: es saber cuánto tienes para decidir.
        </p>
        <p>
          La primera fila es el saldo de tu cuenta el día que empiezas. Después anotas cada pago que recibes (lo marcas también como pagado en Cobranza) y cada gasto. Con <strong>pocas categorías</strong> basta; si dudas dónde va un gasto, la categoría sobra. Diez minutos cada viernes y la hoja queda al día.
        </p>
      </Explica>
      <DiagramaHojaCaja className="mt-6" />
      <FotoBanda foto={APOYO.finanzas} posicion="center 45%" />
      <Subtitulo>Las categorías de la planilla</Subtitulo>
      <ul className="mt-3 flex flex-wrap gap-2">
        {CATEGORIAS_CAJA.map((c) => (
          <li key={c} className="rounded-full border border-white/15 px-3 py-1 text-sm text-slate-200">
            {c}
          </li>
        ))}
      </ul>
      <Instruccion>Puedes cambiarlas en la planilla. Mientras menos, mejor.</Instruccion>
      <Subtitulo>Tu hoja Caja del mes</Subtitulo>
      <TablaEditable clave={K.caja} columnas={COLUMNAS_CAJA} ejemplo={montado ? ejemploCaja() : undefined} etiquetaFila="Movimiento" textoAgregar="Agregar movimiento" maxFilas={80} />
      {lineas.length ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Saldo al día</p>
          <p className={`mt-1 font-serif text-3xl ${saldo < 0 ? 'text-rose-300' : 'text-white'}`}>{pesos(saldo)}</p>
          {totalSale > 0 ? (
            <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
              <li className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">En qué se fue la plata</li>
              {Array.from(salidas.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([cat, v]) => (
                  <li key={cat} className="text-sm text-slate-200">
                    <div className="flex justify-between gap-3">
                      <span className="min-w-0 truncate">{cat}</span>
                      <span className="font-mono">{pesos(v)}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[#5fb2dd]" style={{ width: `${(v / totalSale) * 100}%` }} />
                    </div>
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · la caja" className="mt-6">
        <p className="text-sm">Camila creía que tenía «más o menos un millón». La hoja dijo $437.000: el café verde y el arriendo habían salido la misma quincena.</p>
      </Pantallita>
      <details className="group mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-sm text-slate-200 [&::-webkit-details-marker]:hidden">
          Opcional · si usas ChatGPT o Claude, pasa una boleta sin digitarla
        </summary>
        <p className="mt-2 text-sm text-slate-300">Le mandas la foto de la boleta con este texto y te devuelve la fila lista. Revisa siempre el monto antes de pegarlo. Sin IA, la anotas a mano: son diez segundos.</p>
        <BloqueCopiar titulo="Texto para copiar · de la boleta a la hoja Caja" texto={PROMPT_BOLETA} className="mt-3" />
      </details>
      <Freno>La hoja Caja la lleva una persona. Los pagos los hace una persona, y a un asistente le pasas la boleta, nunca tus claves ni los datos de tu cuenta bancaria.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar hoja Caja (.csv)"
          disabled={!lineas.length}
          onClick={() =>
            descargarArchivo(
              'hoja-caja.csv',
              armarCsv(
                ['Fecha', 'Concepto', 'Categoría', 'Entra', 'Sale', 'Saldo'],
                lineas.map(({ f, saldo: s }) => [legible(f.fecha), f.concepto ?? '', f.categoria ?? '', numero(f.entra) || '', numero(f.sale) || '', Math.round(s)]),
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · Tu caja de las próximas 4 semanas ─────────────────────────

const SEMANAS = [1, 2, 3, 4];

const EJEMPLO_FLUJO: Record<string, string> = {
  caja: '437000',
  e1: '98000',
  s1: '35000',
  e2: '40000',
  s2: '320000',
  e3: '40000',
  s3: '280000',
  e4: '51000',
  s4: '35000',
};

function proyectar(v: Record<string, string>) {
  let saldo = numero(v.caja);
  return SEMANAS.map((i) => {
    saldo += numero(v[`e${i}`]) - numero(v[`s${i}`]);
    return { i, entra: numero(v[`e${i}`]), sale: numero(v[`s${i}`]), saldo };
  });
}

/** Cobros por semana desde la hoja Cobranza de la lección 1: facturas sin pagar que vencen en los próximos 28 días. */
function useCobrosPorSemana() {
  const [hoja] = useFilas(K.hojaCobranza);
  const montado = useMontado();
  const h = hoyUTC();
  const porSemana = [0, 0, 0, 0];
  let hay = false;
  if (montado)
    hoja.forEach((f) => {
      const v = isoMs(vencimientoDe(f));
      if (v === null || pagado(f)) return;
      const d = Math.round((v - h) / DIA_MS);
      if (d < 0 || d > 27) return;
      porSemana[Math.floor(d / 7)] += numero(f.monto);
      hay = true;
    });
  return hay ? porSemana : null;
}

function LeccionCuatroSemanas() {
  const [m, setM] = useTextos(K.flujo);
  const montado = useMontado();
  const v = montado ? m : {};
  const saldoCaja = useSaldoCaja();
  const cobros = useCobrosPorSemana();
  const lleno = numero(v.caja) !== 0 || SEMANAS.some((i) => v[`e${i}`]?.trim() || v[`s${i}`]?.trim());
  const filas = proyectar(v);
  const hoyo = filas.find((f) => f.saldo < 0);
  const traer = () =>
    setM((p) => ({
      ...p,
      ...(saldoCaja !== null ? { caja: String(Math.round(saldoCaja)) } : {}),
      ...(cobros ? Object.fromEntries(cobros.map((x, i) => [`e${i + 1}`, String(x)])) : {}),
    }));
  return (
    <>
      <Explica>
        <p>
          Saber cuánta caja tienes hoy sirve. Saber cuánta vas a tener <strong>en tres semanas</strong> te salva. Casi todos los apretones de caja se ven venir: una compra grande, el arriendo y una factura que no te pagan, todo en la misma semana.
        </p>
        <p>
          La cuenta es simple: <strong>caja de hoy + lo que vas a cobrar − lo que tienes que pagar</strong>, semana por semana. Lo que vas a cobrar sale de tu hoja Cobranza (las facturas que vencen en las próximas 4 semanas); lo que tienes que pagar, de tus gastos fijos y las compras que ya sabes. Si una semana queda bajo cero, ahí está el hoyo, y tienes tiempo para moverte.
        </p>
      </Explica>
      <DiagramaCuatroSemanas className="mt-6" />
      <Subtitulo>Tu calculadora de 4 semanas</Subtitulo>
      <Instruccion>Montos aproximados. Lo importante no es acertar al peso: es ver qué semana se pone difícil.</Instruccion>
      <div className="mt-2 flex flex-col items-start gap-1">
        {!lleno ? (
          <button type="button" onClick={() => setM(() => EJEMPLO_FLUJO)} className="inline-flex min-h-[44px] items-center text-sm text-[#5fb2dd] hover:text-white">
            + Ver con los números de Grano Norte
          </button>
        ) : null}
        {montado && (saldoCaja !== null || cobros) ? (
          <button type="button" onClick={traer} className="inline-flex min-h-[44px] items-center text-left text-sm text-[#5fb2dd] hover:text-white">
            + Traer mi saldo de la hoja Caja y mis cobros de la hoja Cobranza
          </button>
        ) : null}
      </div>
      <label className="mt-3 block text-sm text-slate-300">
        Caja de hoy
        <input inputMode="numeric" value={v.caja ?? ''} onChange={(e) => setM((p) => ({ ...p, caja: e.target.value }))} placeholder="$" className={claseInput} />
      </label>
      <ul className="mt-3 space-y-2">
        {filas.map((f) => (
          <li key={f.i} className={`rounded-xl border p-3 ${f.saldo < 0 && lleno ? 'border-rose-400/50 bg-rose-500/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-slate-100">Semana {f.i}</p>
              {lleno ? <p className={`font-mono text-sm ${f.saldo < 0 ? 'text-rose-300' : 'text-[#5fb2dd]'}`}>{pesos(f.saldo)}</p> : null}
            </div>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <label className="block min-w-0 text-xs text-slate-400">
                Vas a cobrar
                <input inputMode="numeric" value={v[`e${f.i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`e${f.i}`]: e.target.value }))} placeholder="$" className={claseInput} />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Tienes que pagar
                <input inputMode="numeric" value={v[`s${f.i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`s${f.i}`]: e.target.value }))} placeholder="$" className={claseInput} />
              </label>
            </div>
          </li>
        ))}
      </ul>
      {lleno ? (
        <div className={`mt-4 rounded-2xl border p-4 ${hoyo ? 'border-rose-400/50 bg-rose-500/[0.06]' : 'border-[#5fb2dd]/40 bg-[#2175a1]/10'}`} aria-live="polite">
          {hoyo ? (
            <>
              <p className="text-white">
                El hoyo está en la <strong>semana {hoyo.i}</strong>: quedarías en {pesos(hoyo.saldo)}.
              </p>
              <p className="mt-1 text-sm text-slate-300">Tienes tiempo: cobra antes lo vencido, mueve una compra a la semana siguiente o conversa un plazo con un proveedor.</p>
            </>
          ) : (
            <p className="text-white">Ninguna semana queda bajo cero. Repite la cuenta cada viernes: con una factura que no te paguen, cambia.</p>
          )}
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · semana 3" className="mt-6">
        <p className="text-sm">La cuenta mostró el hoyo con dos semanas de anticipación: café verde y arriendo seguidos. Camila llamó por la F-1021 vencida ($96.000) y pidió el café verde en dos partes. La semana 3 quedó en positivo.</p>
      </Pantallita>
      <Freno>Pedir un crédito, postergar un pago o dar un plazo especial a un cliente lo decide siempre una persona.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis 4 semanas (.csv)"
          disabled={!lleno}
          onClick={() =>
            descargarArchivo(
              'caja-4-semanas.csv',
              armarCsv(['Semana', 'Vas a cobrar', 'Tienes que pagar', 'Saldo al cierre'], [['Hoy', '', '', numero(v.caja)], ...filas.map((f) => [`Semana ${f.i}`, f.entra, f.sale, Math.round(f.saldo)])]),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · Precio y margen (hoja Productos) ─────────────────────────

const PRODUCTOS = [1, 2, 3];
const COSTOS = [
  { id: 'insumos', t: 'Insumos' },
  { id: 'envase', t: 'Envase' },
  { id: 'despacho', t: 'Despacho' },
  { id: 'comision', t: 'Comisión de pago (%)' },
];

const EJEMPLO_MARGEN: Record<string, string> = {
  n1: 'Café en grano 1 kg (cafeterías)',
  precio1: '16000',
  insumos1: '8200',
  envase1: '600',
  despacho1: '200',
  comision1: '0',
  n2: 'Café en grano 250 g (Instagram)',
  precio2: '5500',
  insumos2: '2100',
  envase2: '450',
  despacho2: '0',
  comision2: '3',
  n3: 'Plan oficina 4 kg al mes',
  precio3: '58000',
  insumos3: '33000',
  envase3: '2400',
  despacho3: '14000',
  comision3: '0',
};

function calcularMargen(v: Record<string, string>, i: number) {
  const precio = numero(v[`precio${i}`]);
  const costo = numero(v[`insumos${i}`]) + numero(v[`envase${i}`]) + numero(v[`despacho${i}`]) + (precio * numero(v[`comision${i}`])) / 100;
  const margen = precio - costo;
  return { nombre: (v[`n${i}`] ?? '').trim(), precio, costo, margen, pct: precio > 0 ? margen / precio : 0 };
}

function LeccionMargen() {
  const [m, setM] = useTextos(K.margen);
  const montado = useMontado();
  const v = montado ? m : {};
  const res = PRODUCTOS.map((i) => calcularMargen(v, i)).filter((r) => r.precio > 0);
  const peor = res.length > 1 ? [...res].sort((a, b) => a.pct - b.pct)[0] : null;
  return (
    <>
      <Explica>
        <p>
          Vender más de un producto que te hace perder plata es trabajar más para ganar menos. El <strong>margen</strong> es lo que te queda después de los costos directos de cada venta: insumos, envase, despacho y comisiones. Con eso pagas arriendo, sueldos y, al final, ganas.
        </p>
        <p>
          En tu planilla, la <strong>hoja Productos</strong> ya tiene tu lista de precios desde el módulo 0. Ahora le sumas el <strong>costo</strong> de cada uno, y la hoja calcula sola el margen en pesos y en porcentaje (el tablero muestra el promedio). Hazlo con tus 3 productos principales. Cuando uno deja poco, tienes tres caminos: <strong>subir el precio, bajar un costo o dejar de venderlo</strong>.
        </p>
      </Explica>
      <DiagramaMargen className="mt-6" />
      <Subtitulo>Tu calculadora de margen</Subtitulo>
      <Instruccion>Montos por unidad vendida. El costo total que te da aquí es el que va en la columna «Costo» de tu hoja Productos.</Instruccion>
      {!res.length ? (
        <button type="button" onClick={() => setM(() => EJEMPLO_MARGEN)} className="mt-2 inline-flex min-h-[44px] items-center text-sm text-[#5fb2dd] hover:text-white">
          + Ver con los productos de Grano Norte
        </button>
      ) : null}
      <div className="mt-3 space-y-3">
        {PRODUCTOS.map((i) => {
          const r = calcularMargen(v, i);
          return (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <label className="block text-xs text-slate-400">
                Producto {i}
                <input value={v[`n${i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`n${i}`]: e.target.value }))} placeholder="Nombre, igual que en tu hoja Productos" className={claseInput} />
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                <label className="block min-w-0 text-xs text-slate-400">
                  Precio
                  <input inputMode="numeric" value={v[`precio${i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`precio${i}`]: e.target.value }))} className={claseInput} />
                </label>
                {COSTOS.map((c) => (
                  <label key={c.id} className="block min-w-0 text-xs text-slate-400">
                    {c.t}
                    <input inputMode="numeric" value={v[`${c.id}${i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`${c.id}${i}`]: e.target.value }))} className={claseInput} />
                  </label>
                ))}
              </div>
              {r.precio > 0 ? (
                <div className="mt-3" aria-live="polite">
                  <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
                    <span className="bg-[#24314d]" style={{ width: `${Math.min(100, (r.costo / r.precio) * 100)}%` }} />
                    <span className={r.margen >= 0 ? 'bg-[#5fb2dd]' : 'bg-rose-500'} style={{ width: `${Math.max(0, r.pct * 100)}%` }} />
                  </div>
                  <p className={`mt-1 text-sm ${r.margen < 0 ? 'text-rose-300' : 'text-slate-200'}`}>
                    Costo {pesos(r.costo)} · margen {pesos(r.margen)} por unidad · {Math.round(r.pct * 100)} %
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {peor ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="text-white">
            El que menos deja: <strong>{peor.nombre || 'sin nombre'}</strong> ({Math.round(peor.pct * 100)} %).
          </p>
          <p className="mt-1 text-sm text-slate-300">¿Subes el precio, bajas un costo (por ejemplo, despacho mínimo o envase) o dejas de venderlo? Anota tu decisión y revísala en 4 semanas.</p>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · la sorpresa" className="mt-6">
        <p className="text-sm">El plan oficina, que Camila creía el mejor, dejaba menos margen por el despacho incluido. Decidió cobrar despacho bajo cierto volumen, y lo dejó escrito en su hoja Productos.</p>
      </Pantallita>
      <Freno>Un cambio de precio lo decide una persona y se avisa con tiempo a los clientes que ya compran. En la planilla, la hoja Productos la edita solo esa persona (lo ves en el módulo 6).</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar para mi hoja Productos (.csv)"
          disabled={!res.length}
          onClick={() =>
            descargarArchivo(
              'hoja-productos.csv',
              armarCsv(
                ['Producto o servicio', 'Unidad', 'Costo', 'Precio', 'Margen $', 'Margen %'],
                res.map((r) => [r.nombre, '', Math.round(r.costo), Math.round(r.precio), Math.round(r.margen), `${Math.round(r.pct * 100)} %`]),
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Cierre ────────────────────────────────────────────────────────────────

function Cierre() {
  const [c] = useTextos(K.cobranza);
  const [hoja] = useFilas(K.hojaCobranza);
  const [caja] = useFilas(K.caja);
  const [flujo] = useTextos(K.flujo);
  const [m] = useTextos(K.margen);
  const montado = useMontado();
  const negocio = useNegocio();
  const h = hoyUTC();
  const facturas = montado ? hoja.filter((x) => (x.documento ?? '').trim() || (x.cliente ?? '').trim()) : [];
  const porCobrar = facturas.filter((x) => !pagado(x)).reduce((s, x) => s + numero(x.monto), 0);
  const vencido = facturas.filter((x) => (atrasoDe(x, h) ?? 0) > 0).reduce((s, x) => s + numero(x.monto), 0);
  const movimientos = montado ? caja.filter((f) => numero(f.entra) || numero(f.sale)) : [];
  const saldo = movimientos.reduce((s, f) => s + numero(f.entra) - numero(f.sale), 0);
  const semanas = montado && (numero(flujo.caja) || SEMANAS.some((i) => flujo[`e${i}`] || flujo[`s${i}`])) ? proyectar(flujo) : [];
  const hoyo = semanas.find((x) => x.saldo < 0);
  const margenes = PRODUCTOS.map((i) => calcularMargen(montado ? m : {}, i)).filter((r) => r.precio > 0);
  return (
    <CierreModulo
      numero={5}
      area="finanzas"
      hoja="Cobranza, Caja y Productos"
      pruebaReal={[
        { id: 'p1', texto: 'Pasé a la hoja Cobranza todas las facturas sin pagar.' },
        { id: 'p2', texto: 'Envié los recordatorios que tocaban, con mi tono.' },
        { id: 'p3', texto: 'Anoté en la hoja Caja las entradas y salidas del mes.' },
        { id: 'p4', texto: 'Hice la cuenta de las próximas 4 semanas.' },
        { id: 'p5', texto: 'Anoté el costo de mis productos y decidí qué hacer con el de menor margen.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Hoja Cobranza" valor={facturas.length ? `${facturas.length} documentos · por cobrar ${pesos(porCobrar)} · vencido ${pesos(vencido)}` : ''} leccion={1} />
          <FilaResumen etiqueta="Recordatorios" valor={montado && c.antes?.trim() ? `3 recordatorios listos · llamas: ${(c.llamar ?? '').trim() || '(definir)'}` : ''} leccion={1} />
          <FilaResumen etiqueta="Hoja Caja" valor={movimientos.length ? `${movimientos.length} movimientos · saldo ${pesos(saldo)}` : ''} leccion={2} />
          <FilaResumen etiqueta="Las próximas 4 semanas" valor={semanas.length ? (hoyo ? `Hoyo en la semana ${hoyo.i} (${pesos(hoyo.saldo)})` : 'Ninguna semana bajo cero') : ''} leccion={3} />
          <FilaResumen etiqueta="Hoja Productos · margen" valor={margenes.map((r) => `${r.nombre || 'Producto'}: ${Math.round(r.pct * 100)} %`).join('\n')} leccion={4} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-5-cobranza-y-caja.txt',
          armarTxt(
            'Módulo 5 · Cobranza y caja',
            [
              'HOJA COBRANZA',
              ...(facturas.length
                ? [
                    ...facturas.map((x) => {
                      const a = atrasoDe(x, h);
                      return `- ${(x.documento ?? '').trim() || 'Sin número'} · ${(x.cliente ?? '').trim() || 'sin cliente'} · ${pesos(numero(x.monto))} · ${pagado(x) ? 'pagada' : a ? `${a} días de atraso` : `vence ${legible(vencimientoDe(x)) || '(sin fecha)'}`}`;
                    }),
                    `Por cobrar: ${pesos(porCobrar)} · vencido: ${pesos(vencido)}`,
                  ]
                : ['(pendiente)']),
              '',
              'RECORDATORIOS (3 días antes · el día · 5 días después · llamado)',
              ...CAMPOS_COBRANZA.map((x) => `- ${x.etiqueta}: ${(c[x.id] ?? '').trim() || '(pendiente)'}`),
              '',
              `HOJA CAJA: ${movimientos.length ? `${movimientos.length} movimientos · saldo ${pesos(saldo)}` : '(pendiente)'}`,
              '',
              'LAS PRÓXIMAS 4 SEMANAS',
              ...(semanas.length ? [`Caja de hoy: ${pesos(numero(flujo.caja))}`, ...semanas.map((x) => `- Semana ${x.i}: cobras ${pesos(x.entra)} · pagas ${pesos(x.sale)} · saldo ${pesos(x.saldo)}`)] : ['(pendiente)']),
              '',
              'HOJA PRODUCTOS · MARGEN',
              ...(margenes.length ? margenes.map((r) => `- ${r.nombre || 'Producto'}: precio ${pesos(r.precio)} · costo ${pesos(r.costo)} · margen ${pesos(r.margen)} (${Math.round(r.pct * 100)} %)`) : ['(pendiente)']),
              '',
              'RUTINA: recordatorios de cobranza en fechas fijas; hoja Caja al día cada viernes; la cuenta de 4 semanas cada viernes; costos y precios a fin de mes.',
              'EN EL TABLERO: por cobrar, vencido, próximas 4 semanas, caja hoy y margen promedio.',
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
    id: 'cobranza',
    bajada: 'La hoja Cobranza con cada factura y su vencimiento, los días de atraso calculados solos y 3 recordatorios con tu tono.',
    portada: FOTOS.cafe,
    posicion: 'center 25%',
    contenido: <LeccionCobranza />,
    checklist: [
      { id: 'l1a', texto: 'Anoté mis facturas sin pagar en la hoja Cobranza.' },
      { id: 'l1b', texto: 'Escribí mis 3 recordatorios y cuándo llamo yo.' },
      { id: 'l1c', texto: 'Cargué los recordatorios de una factura real.' },
    ],
  },
  {
    id: 'caja',
    bajada: 'Una fila por movimiento, pocas categorías y el saldo al día, sin abrir el banco.',
    portada: APOYO.planilla,
    contenido: <LeccionCaja />,
    checklist: [
      { id: 'l2a', texto: 'Anoté el saldo inicial de mi cuenta.' },
      { id: 'l2b', texto: 'Pasé las entradas y salidas de este mes.' },
      { id: 'l2c', texto: 'Agendé 10 minutos los viernes para dejar la hoja al día.' },
    ],
  },
  {
    id: 'cuatro-semanas',
    bajada: 'Caja de hoy + lo que vas a cobrar − lo que tienes que pagar, semana por semana, para ver el hoyo antes de caer en él.',
    portada: APOYO.calendario,
    contenido: <LeccionCuatroSemanas />,
    checklist: [
      { id: 'l3a', texto: 'Hice la cuenta de mis próximas 4 semanas.' },
      { id: 'l3b', texto: 'Sé qué semana se pone más apretada.' },
      { id: 'l3c', texto: 'Decidí qué hago si una semana queda bajo cero.' },
    ],
  },
  {
    id: 'margen',
    bajada: 'El costo y el margen de tus 3 productos principales en la hoja Productos, y cuál te está haciendo perder.',
    portada: FOTOS.analista,
    posicion: 'center 30%',
    contenido: <LeccionMargen />,
    checklist: [
      { id: 'l4a', texto: 'Calculé el costo y el margen de mis 3 productos.' },
      { id: 'l4b', texto: 'Los anoté en mi hoja Productos.' },
      { id: 'l4c', texto: 'Anoté qué voy a hacer con el que menos deja.' },
    ],
  },
];

export default function Modulo5Content() {
  return (
    <ModuloCurso
      numero={5}
      intro="Cobrar a tiempo y saber cuánta plata tienes. Al terminar tienes tus hojas Cobranza, Caja y Productos con datos reales: cada factura con su vencimiento y sus recordatorios, el saldo al día, la caja de las próximas 4 semanas y el margen de tus productos."
      portada={APOYO.finanzas}
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
