// Exportaciones de la planilla del alumno: .xlsx (exceljs, import dinámico), TSV para Google Sheets y CSV.
import type { DiaPrueba, Fila } from './progreso-v2';
import { filaConDatos, puntaje } from './progreso-v2';

export const ESTADOS = ['Sin mensaje', 'Contactado', 'Respondió', 'Conversación', 'Propuesta', 'Cerrado', 'Descartado'];

const CABECERA = [
  'Nombre',
  'Empresa',
  'Email',
  'WhatsApp',
  'Fuente',
  'Señal',
  'Encaje (1-3)',
  'Señal (1-3)',
  'Acceso (1-3)',
  'Puntaje',
  'Estado',
  'Próximo paso',
  'Fecha',
];

const fechaLegible = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};
const aFecha = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
};

function filasPlanas(filas: Fila[]) {
  return filas.filter(filaConDatos).map((f) => [
    f.nombre,
    f.empresa,
    f.email,
    f.whatsapp,
    f.fuente,
    f.senal,
    f.encaje,
    f.senalPts,
    f.acceso,
    puntaje(f) ? String(puntaje(f)) : '',
    f.estado,
    f.proximo,
    fechaLegible(f.fecha),
  ]);
}

export function aTSV(filas: Fila[]) {
  const limpio = (v: string) => v.replace(/[\t\r\n]+/g, ' ');
  return [CABECERA, ...filasPlanas(filas)].map((r) => r.map(limpio).join('\t')).join('\n');
}

export function descargarCSV(filas: Fila[]) {
  const celda = (v: string) => (/[,"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const texto = [CABECERA, ...filasPlanas(filas)].map((r) => r.map(celda).join(',')).join('\r\n');
  bajar(new Blob(['﻿' + texto], { type: 'text/csv;charset=utf-8' }), 'mi-sistema-de-ventas.csv');
}

function bajar(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const AZUL = 'FF2175A1';
const NOCHE = 'FF0F172A';

export async function construirXLSX(filas: Fila[], prueba: DiaPrueba[]) {
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Villelab · Guía 1';
  wb.created = new Date();
  wb.calcProperties.fullCalcOnLoad = true;

  const cabecera = (ws: import('exceljs').Worksheet) => {
    const r = ws.getRow(1);
    r.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    r.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } };
    r.alignment = { vertical: 'middle' };
    r.height = 22;
    ws.views = [{ state: 'frozen', ySplit: 1 }];
  };

  // --- Posibles clientes (tu primer CRM) ---
  const ws = wb.addWorksheet('Posibles clientes');
  ws.columns = [
    { header: CABECERA[0], width: 22 },
    { header: CABECERA[1], width: 24 },
    { header: CABECERA[2], width: 26 },
    { header: CABECERA[3], width: 16 },
    { header: CABECERA[4], width: 18 },
    { header: CABECERA[5], width: 32 },
    { header: CABECERA[6], width: 12 },
    { header: CABECERA[7], width: 12 },
    { header: CABECERA[8], width: 12 },
    { header: CABECERA[9], width: 10 },
    { header: CABECERA[10], width: 15 },
    { header: CABECERA[11], width: 26 },
    { header: CABECERA[12], width: 13 },
  ];
  cabecera(ws);
  const conDatos = filas.filter(filaConDatos);
  const total = Math.max(20, conDatos.length);
  for (let i = 0; i < total; i++) {
    const f = conDatos[i];
    const n = i + 2;
    const num = (v?: string) => (v && /^\d+$/.test(v) ? Number(v) : null);
    // Celdas vacías como null (no ''): COUNTA cuenta los textos vacíos y falsearía el Dashboard.
    const t = (v?: string) => (v && v.trim() ? v : null);
    ws.addRow([
      t(f?.nombre),
      t(f?.empresa),
      t(f?.email),
      t(f?.whatsapp),
      t(f?.fuente),
      t(f?.senal),
      num(f?.encaje),
      num(f?.senalPts),
      num(f?.acceso),
      { formula: `IF(COUNT(G${n}:I${n})=0,"",SUM(G${n}:I${n}))` },
      f ? f.estado || 'Sin mensaje' : null,
      t(f?.proximo),
      f ? aFecha(f.fecha) : null,
    ]);
    ws.getCell(`M${n}`).numFmt = 'dd-mm-yyyy';
    ws.getCell(`K${n}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${ESTADOS.join(',')}"`],
    };
    for (const c of ['G', 'H', 'I'])
      ws.getCell(`${c}${n}`).dataValidation = { type: 'whole', operator: 'between', allowBlank: true, formulae: [1, 3] };
  }
  const ultima = total + 1;

  // --- Prueba 5 días ---
  const wp = wb.addWorksheet('Prueba 5 días');
  wp.columns = [
    { header: 'Día', width: 10 },
    { header: 'Enviados', width: 12 },
    { header: 'Respuestas', width: 12 },
    { header: 'Conversaciones', width: 16 },
    { header: 'Tasa de respuesta', width: 18 },
  ];
  cabecera(wp);
  prueba.forEach((d, i) => {
    const n = i + 2;
    const v = (s: string) => (s === '' ? null : Number(s));
    wp.addRow([`Día ${i + 1}`, v(d.enviados), v(d.respuestas), v(d.conversaciones), { formula: `IF(N(B${n})>0,C${n}/B${n},"")` }]);
    wp.getCell(`E${n}`).numFmt = '0%';
  });
  wp.addRow(['Total', { formula: 'SUM(B2:B6)' }, { formula: 'SUM(C2:C6)' }, { formula: 'SUM(D2:D6)' }, { formula: 'IF(B7>0,C7/B7,"")' }]);
  wp.getCell('E7').numFmt = '0%';
  wp.getRow(7).font = { bold: true };
  // C10 (8-nov-2026): mismo criterio que la herramienta de la parte 6 y la pregunta 5 del quiz.
  wp.getCell('A9').value = 'Con 25 mensajes los números todavía bailan mucho. Si después de dos tandas (40 a 50 mensajes) tienes 0 o 1 respuesta, revisa tu primer mensaje (parte 4). Si te responde más de 1 de cada 5, súmale posibles clientes nuevos cada día.';
  wp.getCell('A10').value = 'Lo normal es que respondan 1 o 2 de cada 20. Cinco días sirven para partir: sigue con la rutina y compara cuando juntes 40 a 50 mensajes.';
  wp.getCell('A10').font = { italic: true, color: { argb: 'FF475569' } };
  wp.getCell('A9').font = { italic: true, color: { argb: 'FF475569' } };

  // --- Calendario ---
  const wc = wb.addWorksheet('Calendario');
  wc.columns = [
    { header: 'Fecha', width: 13 },
    { header: 'Nombre', width: 22 },
    { header: 'Empresa', width: 24 },
    { header: 'Próximo paso', width: 30 },
    { header: 'Estado', width: 15 },
  ];
  cabecera(wc);
  conDatos
    .filter((f) => f.fecha)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .forEach((f, i) => {
      wc.addRow([aFecha(f.fecha), f.nombre, f.empresa, f.proximo, f.estado]);
      wc.getCell(`A${i + 2}`).numFmt = 'dd-mm-yyyy';
    });
  if (!conDatos.some((f) => f.fecha)) wc.addRow([null, 'Aún no hay próximos pasos con fecha. Complétalos en la hoja Posibles clientes.']);

  // --- Dashboard ---
  const wd = wb.addWorksheet('Dashboard');
  wd.columns = [{ width: 32 }, { width: 16 }];
  wd.getCell('A1').value = 'Mi sistema de ventas · Dashboard de tu primer CRM';
  wd.getCell('A1').font = { bold: true, size: 16, color: { argb: NOCHE } };
  const P = `'Posibles clientes'!`;
  const T = `'Prueba 5 días'!`;
  const metricas: [string, string, string?][] = [
    ['Total de posibles clientes', `COUNTA(${P}A2:A${ultima})`],
    ['Contactados', `COUNTA(${P}A2:A${ultima})-COUNTIFS(${P}A2:A${ultima},"<>",${P}K2:K${ultima},"Sin mensaje")`],
    ['Mensajes enviados (5 días)', `${T}B7`],
    ['Respuestas', `${T}C7`],
    ['Tasa de respuesta', `IF(N(${T}B7)>0,${T}C7/${T}B7,0)`, '0%'],
    ['Conversaciones', `${T}D7`],
    ['Próximos pasos de hoy', `COUNTIF(${P}M2:M${ultima},TODAY())`],
  ];
  metricas.forEach(([label, formula, fmt], i) => {
    const r = i + 3;
    wd.getCell(`A${r}`).value = label;
    wd.getCell(`B${r}`).value = { formula };
    wd.getCell(`B${r}`).font = { bold: true, size: 13, color: { argb: AZUL } };
    if (fmt) wd.getCell(`B${r}`).numFmt = fmt;
  });

  return wb;
}

export async function descargarXLSX(filas: Fila[], prueba: DiaPrueba[]) {
  const wb = await construirXLSX(filas, prueba);
  const buf = await wb.xlsx.writeBuffer();
  bajar(
    new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    'mi-sistema-de-ventas.xlsx',
  );
}
