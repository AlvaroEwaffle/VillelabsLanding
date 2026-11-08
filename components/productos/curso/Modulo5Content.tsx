'use client';

/*
 * /curso/modulo-5 — Módulo 5 «Administración y finanzas: cobrar a tiempo y saber cómo vas».
 * 4 lecciones + cierre (prueba real, semáforo antes/después, entregable: planilla de finanzas + reporte del lunes).
 * Los montos de Grano Norte son ficticios y en pesos chilenos.
 */

import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaBoletaPlanilla, DiagramaCincoNumeros, DiagramaCobranza, DiagramaMargen } from '@/components/productos/diagramas/modulos';
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
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type LeccionDef,
} from './leccion';

const K = {
  cobranza: claveModulo(5, 'cobranza'),
  factura: claveModulo(5, 'factura'),
  categorias: claveModulo(5, 'categorias'),
  gastos: claveModulo(5, 'gastos'),
  numeros: claveModulo(5, 'numeros'),
  margen: claveModulo(5, 'margen'),
};

const claseInput =
  'mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none';

// ─── Lección 1 · Cobranza ──────────────────────────────────────────────────

const CAMPOS_COBRANZA: Campo[] = [
  { id: 'antes', etiqueta: '3 días antes del vencimiento', filas: 3 },
  { id: 'dia', etiqueta: 'El día del vencimiento', filas: 2 },
  { id: 'despues', etiqueta: '5 días después', filas: 3 },
  { id: 'llamar', etiqueta: 'Cuándo llamas tú', placeholder: 'Ej.: a los 10 días, o antes si el monto supera $500.000' },
];

const EJEMPLO_COBRANZA = {
  antes: 'Hola, [nombre]: te recuerdo que la factura [número] por [monto] vence el [fecha]. Te dejo los datos para transferir. ¡Gracias!',
  dia: 'Hola, [nombre]: hoy vence la factura [número] por [monto]. Si ya la pagaste, ignora este mensaje.',
  despues: 'Hola, [nombre]: la factura [número] por [monto] venció el [fecha]. ¿Me confirmas cuándo la puedes pagar? Si hay algún problema, lo vemos.',
  llamar: 'A los 10 días sin respuesta, o antes si el monto supera lo de un mes de café.',
};

function LeccionCobranza() {
  const [c] = useTextos(K.cobranza);
  const [f, setF] = useTextos(K.factura);
  const montado = useMontado();
  const fechas = f.vence ? [-3, 0, 5, 10].map((d) => ({ d, f: sumarDias(f.vence, d) })) : [];
  const etiquetas: Record<number, string> = { [-3]: 'Recordatorio amable', 0: 'Aviso del día', 5: 'Factura vencida', 10: 'Llamas tú' };
  return (
    <>
      <Explica>
        <p>
          Perseguir pagos a fin de mes es incómodo para ti y para tu cliente. Con <strong>fechas fijas</strong>, deja de ser personal: es simplemente cómo funciona tu negocio.
        </p>
        <p>
          Son tres recordatorios con tu tono: <strong>3 días antes</strong> del vencimiento, <strong>el mismo día</strong> y <strong>5 días después</strong>. Si no hay respuesta, llamas. Cortos, amables y con lo necesario para pagar: número de factura, monto y cómo transferir.
        </p>
      </Explica>
      <DiagramaCobranza className="mt-6" />
      <Pantallita titulo="Grano Norte · recordatorio" className="mt-6">
        <p className="text-sm">«Hola, Paula: te recuerdo que la factura 1.284 de Estudio Sur vence el viernes 20. Te dejo los datos para transferir. ¡Gracias!»</p>
        <p className="mt-2 text-sm text-slate-400">Sin amenazas, sin explicaciones largas. El tercero pregunta cuándo, no por qué.</p>
      </Pantallita>
      <Subtitulo>1 · Tus 3 recordatorios</Subtitulo>
      <Campos clave={K.cobranza} campos={CAMPOS_COBRANZA} ejemplo={EJEMPLO_COBRANZA} />
      <Subtitulo>2 · Prueba con una factura real</Subtitulo>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="col-span-2 block text-xs text-slate-400">
          Cliente y número de factura
          <input value={f.cliente ?? ''} onChange={(e) => setF((p) => ({ ...p, cliente: e.target.value }))} placeholder="Ej.: Estudio Sur · factura 1.284" className={claseInput} />
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
      <Freno>Los mensajes se preparan en borrador y los revisa una persona. Los acuerdos de pago y cualquier cambio de datos bancarios los decide siempre una persona (y un cambio de cuenta se confirma por teléfono).</Freno>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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

// ─── Lección 2 · Gastos ───────────────────────────────────────────────────

const CATEGORIAS = [
  { id: 'insumos', texto: 'Insumos y materia prima' },
  { id: 'envases', texto: 'Envases y embalaje' },
  { id: 'despacho', texto: 'Despacho y transporte' },
  { id: 'arriendo', texto: 'Arriendo y gastos comunes' },
  { id: 'sueldos', texto: 'Sueldos y honorarios' },
  { id: 'servicios', texto: 'Servicios básicos e internet' },
  { id: 'marketing', texto: 'Marketing y publicidad' },
  { id: 'herramientas', texto: 'Herramientas y suscripciones' },
  { id: 'impuestos', texto: 'Impuestos y contabilidad' },
  { id: 'otros', texto: 'Otros' },
];

const COLUMNAS_GASTOS = [
  { id: 'fecha', etiqueta: 'Fecha', tipo: 'fecha' as const },
  { id: 'monto', etiqueta: 'Monto', tipo: 'numero' as const, placeholder: '$' },
  { id: 'proveedor', etiqueta: 'Proveedor', placeholder: 'A quién le pagaste' },
  { id: 'categoria', etiqueta: 'Categoría', placeholder: 'Una de tu lista' },
];

const EJEMPLO_GASTOS = [
  { fecha: '2026-10-03', monto: '420000', proveedor: 'Importadora de café verde', categoria: 'Insumos y materia prima' },
  { fecha: '2026-10-07', monto: '96000', proveedor: 'Bolsas kraft con válvula', categoria: 'Envases y embalaje' },
  { fecha: '2026-10-15', monto: '88000', proveedor: 'Bencina y peajes', categoria: 'Despacho y transporte' },
  { fecha: '2026-10-28', monto: '35000', proveedor: 'Publicidad en Instagram', categoria: 'Marketing y publicidad' },
];

const PROMPT_BOLETA = [
  'Te adjunto la foto de una boleta o factura. Extrae estos datos y devuélvelos en UNA línea separada por punto y coma, sin nada más:',
  'fecha (AAAA-MM-DD); proveedor; monto total (solo números); categoría',
  '',
  'La categoría tiene que ser una de esta lista: [pega tu lista de categorías].',
  'Si un dato no se lee bien, escribe «REVISAR» en ese campo; no lo inventes.',
].join('\n');

function LeccionGastos() {
  const [cats] = useMarcas(K.categorias);
  const [gastos] = useFilas(K.gastos);
  const montado = useMontado();
  const elegidas = montado ? CATEGORIAS.filter((c) => cats[c.id]).map((c) => c.texto) : [];
  const totales = new Map<string, number>();
  if (montado) gastos.forEach((g) => totales.set((g.categoria ?? '').trim() || 'Sin categoría', (totales.get((g.categoria ?? '').trim() || 'Sin categoría') ?? 0) + numero(g.monto)));
  const total = Array.from(totales.values()).reduce((s, x) => s + x, 0);
  return (
    <>
      <Explica>
        <p>
          ¿Boletas en la billetera, en el auto y en el correo? No necesitas un sistema contable nuevo: necesitas <strong>una planilla, pocas categorías y diez minutos a la semana</strong>.
        </p>
        <p>
          Para no digitar todo a mano, le sacas foto a la boleta y un asistente (ChatGPT, Claude o Gemini leen fotos) extrae la fecha, el proveedor, el monto y la categoría. Tú revisas y pegas la línea en la planilla.
        </p>
      </Explica>
      <DiagramaBoletaPlanilla className="mt-6" />
      <FotoBanda foto={APOYO.finanzas} posicion="center 45%" />
      <Subtitulo>1 · Tus categorías (8 o menos)</Subtitulo>
      <Instruccion>Pocas y claras. Si dudas dónde va un gasto, la categoría sobra.</Instruccion>
      <Elegibles clave={K.categorias} opciones={CATEGORIAS} />
      <BloqueCopiar
        titulo="Prompt · de la boleta a la planilla"
        texto={PROMPT_BOLETA.replace('[pega tu lista de categorías]', elegidas.join(', ') || '[pega tu lista de categorías]')}
        nota="Adjunta la foto junto con el prompt. Revisa siempre el monto antes de pegarlo."
      />
      <Subtitulo>2 · Tu planilla del mes</Subtitulo>
      <TablaEditable clave={K.gastos} columnas={COLUMNAS_GASTOS} ejemplo={EJEMPLO_GASTOS} etiquetaFila="Gasto" textoAgregar="Agregar gasto" maxFilas={60} />
      {total > 0 ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Por categoría</p>
          <ul className="mt-2 space-y-1.5">
            {Array.from(totales.entries())
              .sort((a, b) => b[1] - a[1])
              .map(([cat, v]) => (
                <li key={cat} className="text-sm text-slate-200">
                  <div className="flex justify-between gap-3">
                    <span className="min-w-0 truncate">{cat}</span>
                    <span className="font-mono">{pesos(v)}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#5fb2dd]" style={{ width: `${(v / total) * 100}%` }} />
                  </div>
                </li>
              ))}
          </ul>
          <p className="mt-3 text-sm text-white">Total: {pesos(total)}</p>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · octubre" className="mt-6">
        <p className="text-sm">Camila descubrió que los envases le costaban casi lo mismo que el despacho. No lo sabía hasta verlo en una fila.</p>
      </Pantallita>
      <Freno>A un asistente le pasas la boleta, no tus claves ni los datos completos de tu cuenta bancaria. Los pagos los sigue haciendo una persona.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar planilla de gastos (.csv)"
          onClick={() =>
            descargarArchivo(
              'planilla-de-gastos.csv',
              armarCsv(
                ['Fecha', 'Proveedor', 'Categoría', 'Monto'],
                [...gastos.map((g) => [g.fecha ?? '', g.proveedor ?? '', g.categoria ?? '', numero(g.monto) || '']), [], ['Categorías'], ...elegidas.map((c) => [c])],
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · Los 5 números del lunes ──────────────────────────────────

const NUMEROS = [
  { id: 'ventas', t: 'Ventas de la semana', plata: true },
  { id: 'cobrar', t: 'Por cobrar', plata: true },
  { id: 'pagado', t: 'Pagado esta semana', plata: true },
  { id: 'caja', t: 'Caja disponible', plata: true },
  { id: 'reuniones', t: 'Reuniones agendadas', plata: false },
];

const EJEMPLO_NUMEROS: Record<string, string> = { ventas: '1850000', ventas_a: '1620000', cobrar: '2300000', cobrar_a: '1900000', pagado: '1400000', pagado_a: '1550000', caja: '3100000', caja_a: '3050000', reuniones: '3', reuniones_a: '1' };

function LeccionNumeros() {
  const [n, setN] = useTextos(K.numeros);
  const montado = useMontado();
  const negocio = useNegocio();
  const v = montado ? n : {};
  const lleno = NUMEROS.some((x) => v[x.id]?.trim());
  const fmt = (x: (typeof NUMEROS)[number], s?: string) => (x.plata ? pesos(numero(s)) : String(numero(s)));
  const reporte = NUMEROS.map((x) => {
    const a = numero(v[x.id]);
    const b = numero(v[`${x.id}_a`]);
    const delta = v[`${x.id}_a`]?.trim() ? (a > b ? '↑' : a < b ? '↓' : '=') : '';
    return `${x.t}: ${fmt(x, v[x.id])} ${delta}${delta && b ? ` (antes ${fmt(x, v[`${x.id}_a`])})` : ''}`;
  });
  const prompt = [
    `Cada lunes a las 8:00 prepara en borrador el reporte de ${negocio.trim() || '[mi negocio]'} con estos 5 números, comparados con la semana anterior:`,
    ...NUMEROS.map((x, i) => `${i + 1}. ${x.t}`),
    'Fuentes: [planilla de ventas], [planilla de cobros], [planilla de gastos], [saldo que anoto el viernes] y [calendario].',
    'Formato: una línea por número con flecha ↑ ↓ = y, al final, máximo 2 cosas que merecen atención.',
    'No envíes nada: déjalo como borrador para revisar.',
  ].join('\n');
  return (
    <>
      <Explica>
        <p>
          No necesitas un tablero con cincuenta indicadores. Necesitas <strong>cinco números cada lunes</strong>: ventas de la semana, lo que tienes por cobrar, lo que ya te pagaron, la caja disponible y las reuniones agendadas para la semana que viene.
        </p>
        <p>
          El valor no está en un número suelto, sino en compararlo con la semana anterior. Si algo sube o baja dos semanas seguidas, ahí hay una decisión. El reporte se puede preparar solo, en borrador, cada lunes temprano; tú lo lees con el primer café.
        </p>
      </Explica>
      <DiagramaCincoNumeros className="mt-6" />
      <Subtitulo>Tus 5 números</Subtitulo>
      <Instruccion>Pon los de esta semana y, si los tienes, los de la anterior.</Instruccion>
      {!lleno ? (
        <button type="button" onClick={() => setN(() => EJEMPLO_NUMEROS)} className="mt-2 inline-flex min-h-[44px] items-center text-sm text-[#5fb2dd] hover:text-white">
          + Ver con los números de Grano Norte
        </button>
      ) : null}
      <ul className="mt-3 space-y-2">
        {NUMEROS.map((x) => (
          <li key={x.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-sm text-slate-100">{x.t}</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <label className="block min-w-0 text-xs text-slate-400">
                Esta semana
                <input inputMode="numeric" value={v[x.id] ?? ''} onChange={(e) => setN((p) => ({ ...p, [x.id]: e.target.value }))} className={claseInput} />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Semana anterior
                <input inputMode="numeric" value={v[`${x.id}_a`] ?? ''} onChange={(e) => setN((p) => ({ ...p, [`${x.id}_a`]: e.target.value }))} className={claseInput} />
              </label>
            </div>
          </li>
        ))}
      </ul>
      {lleno ? (
        <Pantallita titulo={`Reporte del lunes · ${negocio.trim() || 'mi negocio'}`} className="mt-6">
          <ul className="space-y-1 text-sm">
            {reporte.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Pantallita>
      ) : null}
      <BloqueCopiar titulo="Prompt · reporte del lunes" texto={montado ? prompt : ''} nota="Cambia lo que está entre [corchetes] por tus planillas reales. En el módulo 6 lo dejas programado." />
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar reporte (.txt)" disabled={!lleno} onClick={() => descargarArchivo('reporte-del-lunes.txt', armarTxt('Reporte del lunes', [...reporte, '', 'PROMPT', prompt], negocio))} />
      </div>
    </>
  );
}

// ─── Lección 4 · Precio y margen ──────────────────────────────────────────

const PRODUCTOS = [1, 2, 3];
const COSTOS = [
  { id: 'insumos', t: 'Insumos' },
  { id: 'envase', t: 'Envase' },
  { id: 'despacho', t: 'Despacho' },
  { id: 'comision', t: 'Comisión de pago (%)' },
];

const EJEMPLO_MARGEN: Record<string, string> = {
  n1: 'Café en grano 1 kg (cafeterías)',
  precio1: '18000',
  insumos1: '8200',
  envase1: '600',
  despacho1: '900',
  comision1: '0',
  n2: 'Café molido 250 g (Instagram)',
  precio2: '7500',
  insumos2: '2100',
  envase2: '450',
  despacho2: '0',
  comision2: '3',
  n3: 'Plan oficina (5 kg cada 2 semanas)',
  precio3: '85000',
  insumos3: '41000',
  envase3: '3000',
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
          Calcúlalo para tus 3 productos principales. Cuando uno deja poco, tienes tres caminos: <strong>subir el precio, bajar un costo o dejar de venderlo</strong>.
        </p>
      </Explica>
      <DiagramaMargen className="mt-6" />
      <Subtitulo>Tu calculadora de margen</Subtitulo>
      <Instruccion>Montos por unidad vendida. Los de Grano Norte son de ejemplo.</Instruccion>
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
                <input value={v[`n${i}`] ?? ''} onChange={(e) => setM((p) => ({ ...p, [`n${i}`]: e.target.value }))} placeholder="Nombre" className={claseInput} />
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
                    Margen {pesos(r.margen)} por unidad · {Math.round(r.pct * 100)} %
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
        <p className="text-sm">El plan oficina, que Camila creía el mejor, dejaba menos margen por el despacho incluido. Decidió cobrar despacho bajo cierto volumen.</p>
      </Pantallita>
      <Freno>Un cambio de precio lo decide una persona y se avisa con tiempo a los clientes que ya compran.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar margen (.csv)"
          disabled={!res.length}
          onClick={() =>
            descargarArchivo(
              'precio-y-margen.csv',
              armarCsv(
                ['Producto', 'Precio', 'Costos directos', 'Margen', 'Margen %'],
                res.map((r) => [r.nombre, Math.round(r.precio), Math.round(r.costo), Math.round(r.margen), `${Math.round(r.pct * 100)} %`]),
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
  const [cats] = useMarcas(K.categorias);
  const [gastos] = useFilas(K.gastos);
  const [n] = useTextos(K.numeros);
  const [m] = useTextos(K.margen);
  const montado = useMontado();
  const negocio = useNegocio();
  const margenes = PRODUCTOS.map((i) => calcularMargen(montado ? m : {}, i)).filter((r) => r.precio > 0);
  const numeros = montado && NUMEROS.some((x) => n[x.id]?.trim()) ? NUMEROS.map((x) => `${x.t}: ${x.plata ? pesos(numero(n[x.id])) : numero(n[x.id])}`) : [];
  const categorias = montado ? CATEGORIAS.filter((x) => cats[x.id]).map((x) => x.texto) : [];
  return (
    <CierreModulo
      numero={5}
      area="finanzas"
      pruebaReal={[
        { id: 'p1', texto: 'Cargué los recordatorios de las facturas que vencen este mes.' },
        { id: 'p2', texto: 'Envié los recordatorios que tocaban (revisados por mí).' },
        { id: 'p3', texto: 'Pasé las boletas de la semana a la planilla.' },
        { id: 'p4', texto: 'El lunes leí mi primer reporte de 5 números.' },
        { id: 'p5', texto: 'Tomé una decisión sobre mi producto de menor margen.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Cobranza" valor={montado && c.antes?.trim() ? `3 recordatorios listos · llamas: ${(c.llamar ?? '').trim() || '(definir)'}` : ''} leccion={1} />
          <FilaResumen etiqueta="Planilla de gastos" valor={montado && (categorias.length || gastos.length) ? `${categorias.length} categorías · ${gastos.length} gastos anotados` : ''} leccion={2} />
          <FilaResumen etiqueta="Tus 5 números del lunes" valor={numeros.join('\n')} leccion={3} />
          <FilaResumen etiqueta="Margen" valor={margenes.map((r) => `${r.nombre || 'Producto'}: ${Math.round(r.pct * 100)} %`).join('\n')} leccion={4} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-5-finanzas.txt',
          armarTxt(
            'Módulo 5 · Administración y finanzas',
            [
              'COBRANZA (3 días antes · el día · 5 días después · llamado)',
              ...CAMPOS_COBRANZA.map((x) => `- ${x.etiqueta}: ${(c[x.id] ?? '').trim() || '(pendiente)'}`),
              '',
              `CATEGORÍAS DE GASTOS: ${categorias.join(', ') || '(pendiente)'}`,
              `Gastos anotados: ${gastos.length}`,
              '',
              'REPORTE DEL LUNES',
              ...(numeros.length ? numeros : ['(pendiente)']),
              '',
              'MARGEN POR PRODUCTO',
              ...(margenes.length ? margenes.map((r) => `- ${r.nombre || 'Producto'}: precio ${pesos(r.precio)} · margen ${pesos(r.margen)} (${Math.round(r.pct * 100)} %)`) : ['(pendiente)']),
              '',
              'RUTINA DEL ÁREA: recordatorios de cobranza en fechas fijas; boletas a la planilla cada viernes; reporte de 5 números cada lunes.',
              'NÚMERO SEMANAL: por cobrar (y caja disponible).',
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
    bajada: '3 recordatorios con tu tono (antes del vencimiento, el día y 5 días después) y cuándo llamar.',
    portada: FOTOS.cafe,
    posicion: 'center 25%',
    contenido: <LeccionCobranza />,
    checklist: [
      { id: 'l1a', texto: 'Escribí mis 3 recordatorios.' },
      { id: 'l1b', texto: 'Definí cuándo llamo yo.' },
      { id: 'l1c', texto: 'Cargué los recordatorios de una factura real.' },
    ],
  },
  {
    id: 'gastos',
    bajada: 'Categorías mínimas y cómo pasar boletas y facturas sin digitar todo a mano.',
    portada: APOYO.planilla,
    contenido: <LeccionGastos />,
    checklist: [
      { id: 'l2a', texto: 'Elegí 8 categorías o menos.' },
      { id: 'l2b', texto: 'Pasé una boleta con el prompt y la revisé.' },
      { id: 'l2c', texto: 'Descargué la planilla y la dejé en mi carpeta.' },
    ],
  },
  {
    id: 'numeros',
    bajada: 'Ventas de la semana, por cobrar, pagado, caja disponible y reuniones agendadas. Un reporte en borrador cada lunes.',
    portada: APOYO.tableroLaptop,
    contenido: <LeccionNumeros />,
    checklist: [
      { id: 'l3a', texto: 'Completé mis 5 números de esta semana.' },
      { id: 'l3b', texto: 'Sé de dónde sale cada número.' },
      { id: 'l3c', texto: 'Agendé 10 minutos los lunes para leer el reporte.' },
    ],
  },
  {
    id: 'margen',
    bajada: 'El margen de tus 3 productos principales y cuál te está haciendo perder.',
    portada: FOTOS.analista,
    posicion: 'center 30%',
    contenido: <LeccionMargen />,
    checklist: [
      { id: 'l4a', texto: 'Calculé el margen de mis 3 productos.' },
      { id: 'l4b', texto: 'Identifiqué el que menos deja.' },
      { id: 'l4c', texto: 'Anoté qué voy a hacer con él.' },
    ],
  },
];

export default function Modulo5Content() {
  return (
    <ModuloCurso
      numero={5}
      intro="Cobrar a tiempo y saber cómo vas. Al terminar tienes la cobranza con recordatorios en fechas fijas, tus gastos en una planilla, tu reporte de 5 números del lunes y el margen de tus productos."
      portada={APOYO.finanzas}
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
