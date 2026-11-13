// Planilla del sistema del curso «El sistema de tu negocio» (v1.1, 8-nov-2026): tu primer CRM y ERP en un .xlsx
// que se abre en Google Sheets o Excel. Se genera en el navegador con exceljs (import dinámico), igual que la
// planilla de la Guía 1 (lib/productos/guia/planilla.ts), y continúa desde ella: la hoja Clientes usa los mismos
// estados y, si la persona hizo la guía en este navegador, trae su lista de posibles clientes.
//
// Hojas: Inicio · Clientes (CRM) · Origen · Productos · Pedidos · Atención · Cobranza · Caja · Tablero.
// Solo fórmulas que funcionan igual en Excel 2010+ y Google Sheets (COUNTIFS, SUMIFS, INDEX/MATCH, EOMONTH):
// nada de FILTER, UNIQUE, MAXIFS ni matrices dinámicas. Las celdas vacías se escriben como null, no '' (COUNTA
// contaría los textos vacíos y falsearía el tablero).
import type { Workbook, Worksheet } from 'exceljs';
import { HOJAS, QUE_ES } from './curso';

export const ESTADOS_CLIENTE = ['Sin mensaje', 'Contactado', 'Respondió', 'Conversación', 'Propuesta', 'Cliente', 'Inactivo', 'Descartado'];
export const CANALES = ['Referido', 'Cliente antiguo', 'Instagram', 'WhatsApp', 'Google', 'LinkedIn', 'Sitio web', 'Visita o feria', 'Otro'];
export const ESTADOS_PEDIDO = ['Por hacer', 'En curso', 'Entregado', 'Cancelado'];
export const TIPOS_CASO = ['Consulta', 'Pedido especial', 'Reclamo', 'Cambio o devolución', 'Postventa'];
export const ESTADOS_CASO = ['Abierto', 'Cerrado'];
export const CATEGORIAS_CAJA = ['Saldo inicial', 'Cobranza', 'Venta al contado', 'Insumos', 'Sueldos', 'Arriendo', 'Impuestos', 'Despacho', 'Otros'];

/** Filas útiles por hoja. Las fórmulas del tablero leen hasta la fila FIN, así que se pueden agregar filas. */
const FILAS = 200;
const FIN = 500;
const FIN_ORIGEN = 16;
const FIN_PRODUCTOS = 51;

const AZUL = 'FF2175A1';
const CELESTE = 'FF5FB2DD';
const NOCHE = 'FF0F172A';
const GRIS = 'FF475569';
const FONDO_SUAVE = 'FFEAF4FA';

export type ProductoFicha = { nombre: string; precio: string; costo?: string };
export type FichaNegocio = { negocio: string; queVendes: string; aQuien: string; productos: ProductoFicha[] };
/** Fila de la Guía 1 (lib/productos/guia/progreso-v2.ts), solo los campos que se usan. */
export type ClienteGuia = { nombre: string; empresa: string; email: string; whatsapp: string; fuente: string; senal: string; estado: string; proximo: string; fecha: string };

export type DatosPlantilla = {
  ficha?: Partial<FichaNegocio>;
  clientesGuia?: ClienteGuia[];
  /** Llena todas las hojas con el caso Grano Norte para ver cómo queda. */
  ejemplo?: boolean;
  /** Fecha de referencia del ejemplo (para pruebas); por defecto, hoy. */
  hoy?: Date;
};

const GUIA_KEY = 'vl-guia-prospeccion-v2';

/** Lee la lista de la Guía 1 guardada en este navegador (vacía si no la hizo o si no hay acceso a localStorage). */
export function leerClientesGuia(): ClienteGuia[] {
  try {
    const raw = window.localStorage.getItem(GUIA_KEY);
    const p = raw ? (JSON.parse(raw) as { prospectos?: Partial<ClienteGuia>[] }) : null;
    return (p?.prospectos ?? [])
      .filter((f) => (f.nombre ?? '').trim() || (f.empresa ?? '').trim())
      .map((f) => ({
        nombre: f.nombre ?? '',
        empresa: f.empresa ?? '',
        email: f.email ?? '',
        whatsapp: f.whatsapp ?? '',
        fuente: f.fuente ?? '',
        senal: f.senal ?? '',
        estado: f.estado ?? '',
        proximo: f.proximo ?? '',
        fecha: f.fecha ?? '',
      }));
  } catch {
    return [];
  }
}

// ─── Utilidades ────────────────────────────────────────────────────────────

const t = (v?: string | null) => (v && v.trim() ? v.trim() : null);
const num = (v?: string | number | null) => {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (!v) return null;
  const n = Number(String(v).replace(/[^\d,-]/g, '').replace(',', '.'));
  return Number.isFinite(n) && String(v).match(/\d/) ? n : null;
};
const isoAFecha = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
};
/** Fecha UTC a medianoche, `dias` desde `base` (las fechas de Excel no tienen zona horaria). */
const dia = (base: Date, dias: number) => new Date(Date.UTC(base.getFullYear(), base.getMonth(), base.getDate() + dias));
/** Un día de este mes que no se pase de hoy: el ejemplo siempre cae en «ventas del mes». */
const diaDelMes = (base: Date, atras: number) => dia(base, -Math.min(atras, base.getDate() - 1));

const FMT_PESOS = '"$"#,##0';
const FMT_FECHA = 'dd-mm-yyyy';

function cabecera(ws: Worksheet) {
  const r = ws.getRow(1);
  r.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  r.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } };
  r.alignment = { vertical: 'middle', wrapText: true };
  r.height = 30;
  ws.views = [{ state: 'frozen', ySplit: 1 }];
}

function lista(ws: Worksheet, col: string, valores: string[] | string, estricta = true) {
  const formulae = Array.isArray(valores) ? [`"${valores.join(',')}"`] : [valores];
  for (let n = 2; n <= FILAS + 1; n++) {
    ws.getCell(`${col}${n}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae,
      showErrorMessage: estricta,
      errorStyle: 'warning',
      error: 'Elige un valor de la lista.',
    };
  }
}

function formato(ws: Worksheet, col: string, fmt: string, hasta = FILAS + 1) {
  for (let n = 2; n <= hasta; n++) ws.getCell(`${col}${n}`).numFmt = fmt;
}

/** Escribe filas desde la fila 2 y completa hasta FILAS con las fórmulas de la hoja. */
function llenar(ws: Worksheet, filas: (string | number | Date | null)[][], formulas: Record<string, (n: number) => string>, hasta = FILAS + 1) {
  for (let n = 2; n <= hasta; n++) {
    const datos = filas[n - 2];
    if (datos) datos.forEach((v, i) => (ws.getRow(n).getCell(i + 1).value = v));
    for (const [col, f] of Object.entries(formulas)) ws.getCell(`${col}${n}`).value = { formula: f(n) };
  }
}

// ─── El ejemplo: Grano Norte ──────────────────────────────────────────────

function ejemploGranoNorte(hoy: Date) {
  const productos: ProductoFicha[] = [
    { nombre: 'Café en grano 1 kg', precio: '16000', costo: '9000' },
    { nombre: 'Café molido 1 kg', precio: '16500', costo: '9600' },
    { nombre: 'Café en grano 250 g', precio: '5500', costo: '2715' },
    { nombre: 'Plan oficina 4 kg al mes', precio: '58000', costo: '49400' },
    { nombre: 'Despacho Valparaíso', precio: '3000', costo: '3500' },
  ];
  const clientes: (string | number | Date | null)[][] = [
    ['Paula Soto', 'Cafetería Puerto Dulce', '+56 9 5555 0101', 'paula@puertodulce.cl', 'Referido', 'Cliente', 'Ofrecer el plan mensual', dia(hoy, 3), null, dia(hoy, -6), 'Compra cada 2 semanas'],
    ['Jorge Lagos', 'Oficinas Bahía SpA', '+56 9 5555 0102', 'jorge@bahia.cl', 'LinkedIn', 'Propuesta', 'Seguimiento de la propuesta', dia(hoy, 0), 174000, null, '3 planes oficina'],
    ['Daniela Ríos', 'Café La Subida', '+56 9 5555 0103', null, 'Instagram', 'Conversación', 'Enviar muestra de 250 g', dia(hoy, 1), null, null, 'Abrió hace 2 meses'],
    ['Tomás Vera', 'Cowork Cerro Alegre', '+56 9 5555 0104', 'tomas@cowork.cl', 'Referido', 'Cliente', 'Preguntar cómo les fue', dia(hoy, 5), null, dia(hoy, -10), null],
    ['Carla Muñoz', 'Restorán Mirador', null, 'carla@mirador.cl', 'Google', 'Contactado', 'Segundo mensaje con un caso', dia(hoy, -1), null, null, 'Escribió por el sitio'],
    ['Andrés Pino', 'Panadería Las Rocas', null, null, 'Visita o feria', 'Sin mensaje', 'Primer mensaje por correo', dia(hoy, 2), null, null, 'Lo conocí en la feria'],
    ['Marta Ríos', 'Estudio Contable Ríos', '+56 9 5555 0107', 'marta@riosconta.cl', 'Cliente antiguo', 'Cliente', null, null, null, dia(hoy, -20), 'Plan oficina'],
    ['Felipe Araya', 'Hostal Azul', null, null, 'Instagram', 'Descartado', null, null, null, null, 'Compra en supermercado'],
  ];
  const pedidos: (string | number | Date | null)[][] = [
    [1, diaDelMes(hoy, 9), 'Cafetería Puerto Dulce', 'Café en grano 1 kg', 6, null, null, diaDelMes(hoy, 8), 'Matías', 'Entregado'],
    [2, diaDelMes(hoy, 7), 'Estudio Contable Ríos', 'Plan oficina 4 kg al mes', 1, null, null, diaDelMes(hoy, 5), 'Matías', 'Entregado'],
    [3, diaDelMes(hoy, 5), 'Cowork Cerro Alegre', 'Café molido 1 kg', 4, null, null, dia(hoy, -2), 'Sofía', 'En curso'],
    [4, diaDelMes(hoy, 2), 'Cafetería Puerto Dulce', 'Café en grano 1 kg', 5, null, null, dia(hoy, 1), 'Matías', 'Por hacer'],
    [5, diaDelMes(hoy, 1), 'Café La Subida', 'Café en grano 250 g', 2, null, null, dia(hoy, 2), 'Sofía', 'Por hacer'],
  ];
  const atencion: (string | number | Date | null)[][] = [
    [dia(hoy, -3), 'Cowork Cerro Alegre', 'WhatsApp', 'Reclamo', 'El molido llegó muy fino para su cafetera', 'Camila', 'Abierto', null],
    [dia(hoy, -6), 'Restorán Mirador', 'Correo', 'Consulta', '¿Despachan los sábados?', 'Sofía', 'Cerrado', dia(hoy, -6)],
    [dia(hoy, -2), 'Oficinas Bahía SpA', 'WhatsApp', 'Pedido especial', 'Quieren café descafeinado para una sala', 'Camila', 'Abierto', null],
    [dia(hoy, -8), 'Cafetería Puerto Dulce', 'WhatsApp', 'Postventa', 'Mensaje a los 7 días de la entrega: todo bien, pidió repetir', 'Sofía', 'Cerrado', dia(hoy, -7)],
  ];
  const cobranza: (string | number | Date | null)[][] = [
    ['F-1021', 'Cafetería Puerto Dulce', 1, 96000, dia(hoy, -40), null, 'No', null, null, 'Llamar hoy'],
    ['F-1022', 'Estudio Contable Ríos', 2, 58000, dia(hoy, -25), null, 'No', null, null, 'Recordatorio el día que vence'],
    ['F-1018', 'Cowork Cerro Alegre', null, 64000, dia(hoy, -45), null, 'Sí', dia(hoy, -14), null, null],
    ['F-1019', 'Oficinas Bahía SpA', null, 116000, dia(hoy, -38), null, 'Sí', dia(hoy, -9), null, null],
    ['B-0310', 'Daniela Ríos', null, 11000, dia(hoy, -2), null, 'No', null, null, null],
  ];
  const caja: (string | number | Date | null)[][] = [
    [dia(hoy, -30), 'Saldo de la cuenta al empezar', 'Saldo inicial', 850000, null],
    [dia(hoy, -14), 'Pago F-1018 Cowork Cerro Alegre', 'Cobranza', 64000, null],
    [dia(hoy, -12), 'Café verde, saco de 30 kg', 'Insumos', null, 320000],
    [dia(hoy, -10), 'Arriendo de la tostaduría', 'Arriendo', null, 280000],
    [dia(hoy, -9), 'Pago F-1019 Oficinas Bahía', 'Cobranza', 116000, null],
    [dia(hoy, -5), 'Ventas por Instagram de la semana', 'Venta al contado', 42000, null],
    [dia(hoy, -1), 'Bencina despachos', 'Despacho', null, 35000],
  ];
  return {
    ficha: { negocio: 'Grano Norte', queVendes: 'Café en grano y molido, tostado en Valparaíso', aQuien: 'Cafeterías y oficinas de la región (70 %) y personas por Instagram (30 %)', productos },
    clientes,
    pedidos,
    atencion,
    cobranza,
    caja,
  };
}

// ─── Construcción del libro ───────────────────────────────────────────────

export async function construirPlantillaSistema(datos: DatosPlantilla = {}): Promise<Workbook> {
  const mod = await import('exceljs');
  // En el navegador llega como default; en Node (pruebas con jiti) a veces como el módulo mismo.
  const ExcelJS = (mod.default ?? mod) as typeof mod.default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Villelab · El sistema de tu negocio';
  wb.created = new Date();
  wb.calcProperties.fullCalcOnLoad = true;

  const hoy = datos.hoy ?? new Date();
  const ej = datos.ejemplo ? ejemploGranoNorte(hoy) : null;
  const ficha: FichaNegocio = {
    negocio: ej?.ficha.negocio ?? datos.ficha?.negocio ?? '',
    queVendes: ej?.ficha.queVendes ?? datos.ficha?.queVendes ?? '',
    aQuien: ej?.ficha.aQuien ?? datos.ficha?.aQuien ?? '',
    productos: (ej?.ficha.productos ?? datos.ficha?.productos ?? []).filter((p) => p.nombre.trim()),
  };
  const nombre = ficha.negocio.trim() || 'Mi negocio';

  // --- Inicio ---
  const wi = wb.addWorksheet('Inicio', { properties: { tabColor: { argb: NOCHE } } });
  wi.columns = [{ width: 24 }, { width: 70 }, { width: 34 }];
  wi.getCell('A1').value = `El sistema de ${nombre}`;
  wi.getCell('A1').font = { bold: true, size: 18, color: { argb: NOCHE } };
  wi.getCell('A2').value = 'Tu primer CRM y ERP en una planilla. Curso «El sistema de tu negocio» · Villelab.';
  wi.getCell('A2').font = { italic: true, color: { argb: GRIS } };
  wi.getCell('A4').value = 'CRM';
  wi.getCell('B4').value = `Es ${QUE_ES.crm} Aquí: la hoja Clientes.`;
  wi.getCell('A5').value = 'ERP';
  wi.getCell('B5').value = `Es ${QUE_ES.erp} Aquí: todas las hojas juntas, y el Tablero las resume.`;
  wi.getCell('B6').value = 'No es un software: es esta planilla, con las fórmulas listas, más 20 minutos al día. Tú llenas filas; los totales se calculan solos.';
  wi.getCell('B6').font = { italic: true, color: { argb: GRIS } };
  for (const c of ['A4', 'A5']) wi.getCell(c).font = { bold: true, color: { argb: AZUL } };

  wi.getCell('A8').value = 'Ficha del negocio';
  wi.getCell('A8').font = { bold: true, size: 13, color: { argb: NOCHE } };
  const filasFicha: [string, string][] = [
    ['Negocio', ficha.negocio],
    ['Qué vendes', ficha.queVendes],
    ['A quién le vendes', ficha.aQuien],
  ];
  filasFicha.forEach(([k, v], i) => {
    wi.getCell(`A${9 + i}`).value = k;
    wi.getCell(`B${9 + i}`).value = t(v);
    wi.getCell(`B${9 + i}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: FONDO_SUAVE } };
  });
  wi.getCell('B12').value = 'Tu lista de precios va en la hoja Productos.';
  wi.getCell('B12').font = { italic: true, color: { argb: GRIS } };

  wi.getCell('A14').value = 'Las hojas';
  wi.getCell('A14').font = { bold: true, size: 13, color: { argb: NOCHE } };
  ['Hoja', 'Qué guarda', 'Quién la actualiza y cuándo'].forEach((h, i) => {
    const c = wi.getRow(15).getCell(i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } };
  });
  HOJAS.forEach((h, i) => {
    const r = wi.getRow(16 + i);
    r.getCell(1).value = `${h.nombre} · módulo ${h.modulo}`;
    r.getCell(2).value = h.guarda;
    r.getCell(3).value = h.quien;
    r.alignment = { wrapText: true, vertical: 'top' };
  });
  const finHojas = 16 + HOJAS.length;
  wi.getCell(`A${finHojas + 1}`).value = 'Tus rutinas';
  wi.getCell(`A${finHojas + 1}`).font = { bold: true, size: 13, color: { argb: NOCHE } };
  const rutinas: [string, string][] = [
    ['Cada día · 20 min', 'Clientes: a quién le toca hoy (fecha del próximo paso). Pedidos: qué llegó, qué falta y qué vence.'],
    ['Lunes · 10 min', 'Mira el Tablero con tu equipo y elige qué se arregla esta semana.'],
    ['Viernes · 15 min', 'Revisa que cada hoja esté al día: casos abiertos en Atención, pagos en Cobranza, movimientos en Caja.'],
    ['Fin de mes', 'Revisa precios y costos en Productos y compara el mes en el Tablero.'],
  ];
  rutinas.forEach(([k, v], i) => {
    wi.getCell(`A${finHojas + 2 + i}`).value = k;
    wi.getCell(`B${finHojas + 2 + i}`).value = v;
    wi.getCell(`B${finHojas + 2 + i}`).alignment = { wrapText: true };
  });
  const finRutinas = finHojas + 2 + rutinas.length;
  wi.getCell(`A${finRutinas + 1}`).value = 'Para Google Sheets';
  wi.getCell(`A${finRutinas + 1}`).font = { bold: true };
  wi.getCell(`B${finRutinas + 1}`).value =
    'Sube este archivo a Google Drive, haz clic derecho y elige «Abrir con» → Google Sheets. Después, «Archivo» → «Guardar como Hojas de cálculo de Google». Las fórmulas y las listas desplegables se mantienen.';
  wi.getCell(`B${finRutinas + 1}`).alignment = { wrapText: true };
  wi.getCell(`A${finRutinas + 2}`).value = 'Con IA';
  wi.getCell(`A${finRutinas + 2}`).font = { bold: true };
  wi.getCell(`B${finRutinas + 2}`).value =
    'Pégale una hoja a ChatGPT o Claude y pídele que te diga qué está incompleto o qué cliente se está enfriando. Revisa siempre lo que te responde: tú decides.';
  wi.getCell(`B${finRutinas + 2}`).alignment = { wrapText: true };
  if (datos.ejemplo) {
    wi.getCell('C1').value = 'Ejemplo: Grano Norte (caso ficticio del curso)';
    wi.getCell('C1').font = { bold: true, color: { argb: AZUL } };
  }

  // --- Clientes (CRM) ---
  const wcl = wb.addWorksheet('Clientes', { properties: { tabColor: { argb: AZUL } } });
  wcl.columns = [
    { header: 'Nombre', width: 20 },
    { header: 'Empresa', width: 26 },
    { header: 'WhatsApp o teléfono', width: 18 },
    { header: 'Correo', width: 24 },
    { header: 'Origen', width: 16 },
    { header: 'Estado', width: 15 },
    { header: 'Próximo paso', width: 30 },
    { header: 'Fecha del próximo paso', width: 14 },
    { header: 'Monto de la propuesta', width: 14 },
    { header: 'Última compra', width: 13 },
    { header: 'Notas', width: 30 },
  ];
  cabecera(wcl);
  const desdeGuia = (datos.clientesGuia ?? []).map((f) => [
    t(f.nombre),
    t(f.empresa),
    t(f.whatsapp),
    t(f.email),
    t(f.fuente),
    f.estado === 'Cerrado' ? 'Cliente' : t(f.estado) ?? 'Sin mensaje',
    t(f.proximo),
    isoAFecha(f.fecha),
    null,
    null,
    t(f.senal),
  ]);
  llenar(wcl, ej ? ej.clientes : desdeGuia, {});
  lista(wcl, 'E', `Origen!$A$2:$A$${FIN_ORIGEN}`, false);
  lista(wcl, 'F', ESTADOS_CLIENTE);
  formato(wcl, 'H', FMT_FECHA);
  formato(wcl, 'I', FMT_PESOS);
  formato(wcl, 'J', FMT_FECHA);

  // --- Origen (se calcula sola desde Clientes) ---
  const wo = wb.addWorksheet('Origen');
  wo.columns = [
    { header: 'Canal', width: 18 },
    { header: 'Contactos', width: 12 },
    { header: 'Clientes', width: 12 },
    { header: 'De contacto a cliente', width: 14 },
    { header: 'Qué vas a hacer este mes', width: 40 },
  ];
  cabecera(wo);
  const C = `Clientes!$E$2:$E$${FIN}`;
  const E = `Clientes!$F$2:$F$${FIN}`;
  llenar(
    wo,
    CANALES.map((c) => [c]),
    {
      B: (n) => `IF(A${n}="","",COUNTIF(${C},A${n}))`,
      C: (n) => `IF(A${n}="","",COUNTIFS(${C},A${n},${E},"Cliente"))`,
      D: (n) => `IF(OR(B${n}="",B${n}=0),"",C${n}/B${n})`,
    },
    FIN_ORIGEN,
  );
  formato(wo, 'D', '0%', FIN_ORIGEN);
  wo.getCell(`A${FIN_ORIGEN + 2}`).value = 'Se llena sola con la columna Origen de tu hoja Clientes. Puedes cambiar o agregar canales en la columna A.';
  wo.getCell(`A${FIN_ORIGEN + 2}`).font = { italic: true, color: { argb: GRIS } };

  // --- Productos ---
  const wp = wb.addWorksheet('Productos');
  wp.columns = [
    { header: 'Producto o servicio', width: 28 },
    { header: 'Unidad', width: 12 },
    { header: 'Costo', width: 12 },
    { header: 'Precio', width: 12 },
    { header: 'Margen $', width: 12 },
    { header: 'Margen %', width: 11 },
  ];
  cabecera(wp);
  llenar(
    wp,
    ficha.productos.map((p) => [t(p.nombre), null, num(p.costo), num(p.precio)]),
    {
      E: (n) => `IF(AND(ISNUMBER(C${n}),ISNUMBER(D${n})),D${n}-C${n},"")`,
      F: (n) => `IF(AND(ISNUMBER(E${n}),ISNUMBER(D${n})),IF(D${n}>0,E${n}/D${n},""),"")`,
    },
    FIN_PRODUCTOS,
  );
  for (const c of ['C', 'D', 'E']) formato(wp, c, FMT_PESOS, FIN_PRODUCTOS);
  formato(wp, 'F', '0%', FIN_PRODUCTOS);
  wp.getCell(`A${FIN_PRODUCTOS + 2}`).value = 'El costo y el margen se trabajan en el módulo 5. Si un margen sale negativo, ese producto te hace perder plata.';
  wp.getCell(`A${FIN_PRODUCTOS + 2}`).font = { italic: true, color: { argb: GRIS } };

  // --- Pedidos ---
  const wpe = wb.addWorksheet('Pedidos');
  wpe.columns = [
    { header: 'N°', width: 6 },
    { header: 'Fecha', width: 12 },
    { header: 'Cliente', width: 26 },
    { header: 'Producto', width: 26 },
    { header: 'Cantidad', width: 10 },
    { header: 'Precio unitario', width: 13 },
    { header: 'Total', width: 13 },
    { header: 'Fecha de entrega', width: 13 },
    { header: 'Responsable', width: 14 },
    { header: 'Estado', width: 13 },
    { header: 'Atrasado', width: 10 },
  ];
  cabecera(wpe);
  llenar(wpe, ej ? ej.pedidos : [], {
    // El precio se completa desde Productos; si vendiste a otro precio, escríbelo encima.
    F: (n) => `IF(D${n}="","",IFERROR(VLOOKUP(D${n},Productos!$A$2:$D$${FIN_PRODUCTOS},4,0),""))`,
    G: (n) => `IF(AND(ISNUMBER(E${n}),ISNUMBER(F${n})),E${n}*F${n},"")`,
    K: (n) => `IF(AND(ISNUMBER(H${n}),H${n}<TODAY(),J${n}<>"Entregado",J${n}<>"Cancelado"),"Sí","")`,
  });
  lista(wpe, 'D', `Productos!$A$2:$A$${FIN_PRODUCTOS}`, false);
  lista(wpe, 'J', ESTADOS_PEDIDO);
  formato(wpe, 'B', FMT_FECHA);
  formato(wpe, 'H', FMT_FECHA);
  formato(wpe, 'F', FMT_PESOS);
  formato(wpe, 'G', FMT_PESOS);

  // --- Atención ---
  const wa = wb.addWorksheet('Atención');
  wa.columns = [
    { header: 'Fecha', width: 12 },
    { header: 'Cliente', width: 24 },
    { header: 'Canal', width: 12 },
    { header: 'Tipo', width: 18 },
    { header: 'Qué pasó', width: 40 },
    { header: 'Responsable', width: 14 },
    { header: 'Estado', width: 11 },
    { header: 'Fecha de cierre', width: 13 },
    { header: 'Días abierto', width: 11 },
  ];
  cabecera(wa);
  llenar(wa, ej ? ej.atencion : [], {
    I: (n) => `IF(NOT(ISNUMBER(A${n})),"",IF(ISNUMBER(H${n}),H${n}-A${n},TODAY()-A${n}))`,
  });
  lista(wa, 'D', TIPOS_CASO);
  lista(wa, 'G', ESTADOS_CASO);
  formato(wa, 'A', FMT_FECHA);
  formato(wa, 'H', FMT_FECHA);
  formato(wa, 'I', '0');

  // --- Cobranza ---
  const wco = wb.addWorksheet('Cobranza');
  wco.columns = [
    { header: 'Factura o boleta', width: 14 },
    { header: 'Cliente', width: 26 },
    { header: 'Pedido N°', width: 10 },
    { header: 'Monto', width: 13 },
    { header: 'Emisión', width: 12 },
    { header: 'Vencimiento', width: 12 },
    { header: 'Pagado', width: 9 },
    { header: 'Fecha de pago', width: 12 },
    { header: 'Días de atraso', width: 11 },
    { header: 'Próximo recordatorio', width: 28 },
  ];
  cabecera(wco);
  llenar(wco, ej ? ej.cobranza : [], {
    // Vence a 30 días de la emisión (lo más común en pymes); si tu plazo es otro, escríbelo encima.
    F: (n) => `IF(ISNUMBER(E${n}),E${n}+30,"")`,
    I: (n) => `IF(OR(NOT(ISNUMBER(F${n})),G${n}="Sí"),"",MAX(0,TODAY()-F${n}))`,
  });
  lista(wco, 'G', ['Sí', 'No']);
  formato(wco, 'D', FMT_PESOS);
  for (const c of ['E', 'F', 'H']) formato(wco, c, FMT_FECHA);
  formato(wco, 'I', '0');

  // --- Caja ---
  const wca = wb.addWorksheet('Caja');
  wca.columns = [
    { header: 'Fecha', width: 12 },
    { header: 'Concepto', width: 34 },
    { header: 'Categoría', width: 16 },
    { header: 'Entra', width: 13 },
    { header: 'Sale', width: 13 },
    { header: 'Saldo', width: 14 },
  ];
  cabecera(wca);
  llenar(wca, ej ? ej.caja : [], {
    F: (n) => `IF(AND(D${n}="",E${n}=""),"",SUM($D$2:D${n})-SUM($E$2:E${n}))`,
  });
  lista(wca, 'C', CATEGORIAS_CAJA, false);
  formato(wca, 'A', FMT_FECHA);
  for (const c of ['D', 'E', 'F']) formato(wca, c, FMT_PESOS);
  wca.getCell(`H2`).value = 'La primera fila es el saldo de tu cuenta el día que empiezas (categoría «Saldo inicial»).';
  wca.getCell(`H2`).font = { italic: true, color: { argb: GRIS } };

  // --- Tablero ---
  const wt = wb.addWorksheet('Tablero', { properties: { tabColor: { argb: CELESTE } } });
  wt.columns = [{ width: 44 }, { width: 18 }, { width: 22 }];
  wt.getCell('A1').value = `Tablero de ${nombre}`;
  wt.getCell('A1').font = { bold: true, size: 18, color: { argb: NOCHE } };
  wt.getCell('A2').value = 'Se calcula solo desde tus hojas. Revísalo los lunes, 10 minutos, con tu equipo.';
  wt.getCell('A2').font = { italic: true, color: { argb: GRIS } };

  const R = (hoja: string, col: string, fin = FIN) => `'${hoja}'!$${col}$2:$${col}$${fin}`;
  const inicioMes = 'DATE(YEAR(TODAY()),MONTH(TODAY()),1)';
  type Metrica = { label: string; f: string; fmt?: string; alerta?: (celda: string) => string };
  const secciones: { titulo: string; metricas: Metrica[] }[] = [
    {
      titulo: 'Clientes y ventas (CRM) · módulo 1',
      metricas: [
        { label: 'Clientes activos', f: `COUNTIF(${R('Clientes', 'F')},"Cliente")` },
        { label: 'Posibles clientes en conversación o propuesta', f: `COUNTIF(${R('Clientes', 'F')},"Conversación")+COUNTIF(${R('Clientes', 'F')},"Propuesta")` },
        { label: 'Propuestas abiertas ($)', f: `SUMIFS(${R('Clientes', 'I')},${R('Clientes', 'F')},"Propuesta")`, fmt: FMT_PESOS },
        {
          label: 'Próximos pasos para hoy o atrasados',
          f: `COUNTIFS(${R('Clientes', 'H')},"<="&TODAY(),${R('Clientes', 'F')},"<>Descartado")`,
          alerta: (c) => `IF(${c}>0,"Revisar hoy","Al día")`,
        },
      ],
    },
    {
      titulo: 'Marketing y origen · módulo 2',
      metricas: [
        {
          label: 'Canal que más clientes te trae',
          f: `IF(MAX(${R('Origen', 'C', FIN_ORIGEN)})=0,"Aún sin datos",INDEX(${R('Origen', 'A', FIN_ORIGEN)},MATCH(MAX(${R('Origen', 'C', FIN_ORIGEN)}),${R('Origen', 'C', FIN_ORIGEN)},0)))`,
        },
        {
          label: 'Contactos con su origen anotado',
          // Filas con nombre o empresa (una fila de la Guía 1 puede traer solo la empresa).
          f: `IFERROR(SUMPRODUCT(((${R('Clientes', 'A')}&${R('Clientes', 'B')})<>"")*(${R('Clientes', 'E')}<>""))/SUMPRODUCT(--((${R('Clientes', 'A')}&${R('Clientes', 'B')})<>"")),0)`,
          fmt: '0%',
        },
      ],
    },
    {
      titulo: 'Pedidos y operación · módulo 3',
      metricas: [
        {
          label: 'Ventas del mes',
          f: `SUMIFS(${R('Pedidos', 'G')},${R('Pedidos', 'B')},">="&${inicioMes},${R('Pedidos', 'B')},"<="&EOMONTH(TODAY(),0),${R('Pedidos', 'J')},"<>Cancelado")`,
          fmt: FMT_PESOS,
        },
        { label: 'Pedidos por entregar', f: `COUNTIF(${R('Pedidos', 'J')},"Por hacer")+COUNTIF(${R('Pedidos', 'J')},"En curso")` },
        { label: 'Pedidos atrasados', f: `COUNTIF(${R('Pedidos', 'K')},"Sí")`, alerta: (c) => `IF(${c}>0,"Revisar hoy","Al día")` },
      ],
    },
    {
      titulo: 'Atención y postventa · módulo 4',
      metricas: [
        { label: 'Casos abiertos', f: `COUNTIF(${R('Atención', 'G')},"Abierto")` },
        {
          label: 'Reclamos abiertos',
          f: `COUNTIFS(${R('Atención', 'D')},"Reclamo",${R('Atención', 'G')},"Abierto")`,
          alerta: (c) => `IF(${c}>0,"Lo ve una persona","Al día")`,
        },
      ],
    },
    {
      titulo: 'Cobranza y caja · módulo 5',
      metricas: [
        { label: 'Por cobrar', f: `SUMIFS(${R('Cobranza', 'D')},${R('Cobranza', 'G')},"<>Sí")`, fmt: FMT_PESOS },
        {
          label: 'Vencido sin pagar',
          f: `SUMIFS(${R('Cobranza', 'D')},${R('Cobranza', 'G')},"<>Sí",${R('Cobranza', 'F')},"<"&TODAY())`,
          fmt: FMT_PESOS,
          alerta: (c) => `IF(${c}>0,"Cobrar esta semana","Al día")`,
        },
        {
          label: 'Por cobrar en las próximas 4 semanas',
          f: `SUMIFS(${R('Cobranza', 'D')},${R('Cobranza', 'G')},"<>Sí",${R('Cobranza', 'F')},">="&TODAY(),${R('Cobranza', 'F')},"<="&(TODAY()+28))`,
          fmt: FMT_PESOS,
        },
        { label: 'Caja hoy', f: `SUM(${R('Caja', 'D')})-SUM(${R('Caja', 'E')})`, fmt: FMT_PESOS },
        { label: 'Margen promedio de tus productos', f: `IFERROR(AVERAGE(${R('Productos', 'F', FIN_PRODUCTOS)}),"")`, fmt: '0%' },
      ],
    },
  ];
  let fila = 4;
  for (const s of secciones) {
    const c = wt.getCell(`A${fila}`);
    c.value = s.titulo;
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    for (const col of ['A', 'B', 'C']) wt.getCell(`${col}${fila}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } };
    fila += 1;
    for (const m of s.metricas) {
      wt.getCell(`A${fila}`).value = m.label;
      const v = wt.getCell(`B${fila}`);
      v.value = { formula: m.f };
      v.font = { bold: true, size: 13, color: { argb: AZUL } };
      if (m.fmt) v.numFmt = m.fmt;
      if (m.alerta) {
        wt.getCell(`C${fila}`).value = { formula: m.alerta(`B${fila}`) };
        wt.getCell(`C${fila}`).font = { italic: true, color: { argb: GRIS } };
      }
      fila += 1;
    }
    fila += 1;
  }
  wt.getCell(`A${fila}`).value = 'Si un número no te calza, el problema casi siempre está en una hoja sin actualizar, no en la fórmula.';
  wt.getCell(`A${fila}`).font = { italic: true, color: { argb: GRIS } };

  return wb;
}

export function nombreArchivoPlantilla(d: DatosPlantilla) {
  if (d.ejemplo) return 'sistema-grano-norte-ejemplo.xlsx';
  const base = (d.ficha?.negocio ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return base ? `sistema-${base}.xlsx` : 'el-sistema-de-tu-negocio.xlsx';
}

export async function descargarPlantillaSistema(d: DatosPlantilla) {
  const wb = await construirPlantillaSistema(d);
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivoPlantilla(d);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
