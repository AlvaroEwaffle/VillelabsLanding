// Workshop 1 · «Que ningún cliente se te quede sin respuesta».
//
// FECHA Y HORA: la única constante que hay que editar cuando Álvaro confirme.
// - Mientras diga 'Por confirmar', la página lo muestra tal cual y oculta «Agregar a mi calendario».
// - Al confirmar, escribe la fecha en formato 'AAAA-MM-DDTHH:MM' en hora de Chile (America/Santiago),
//   por ejemplo '2026-11-26T19:00'. La página la formatea y el botón genera el .ics de 45 minutos.
export const WORKSHOP_FECHA: string = 'Por confirmar';

export const WORKSHOP_DURACION_MIN = 45;
export const WORKSHOP_ZONA_HORARIA = 'America/Santiago';
export const WORKSHOP_TITULO = 'Que ningún cliente se te quede sin respuesta';

export type FechaWorkshop = { anio: number; mes: number; dia: number; hora: number; minuto: number };

/** Devuelve la fecha parseada o null si todavía está «Por confirmar» (o mal escrita). */
export function fechaWorkshop(valor: string = WORKSHOP_FECHA): FechaWorkshop | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(valor.trim());
  if (!m) return null;
  const [anio, mes, dia, hora, minuto] = m.slice(1).map(Number);
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31 || hora > 23 || minuto > 59) return null;
  return { anio, mes, dia, hora, minuto };
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** Texto para mostrar: «jueves 26 de noviembre · 19:00 h (hora de Chile)» o «Por confirmar». */
export function fechaWorkshopTexto(valor: string = WORKSHOP_FECHA): string {
  const f = fechaWorkshop(valor);
  if (!f) return valor.trim() || 'Por confirmar';
  const diaSemana = DIAS[new Date(Date.UTC(f.anio, f.mes - 1, f.dia)).getUTCDay()];
  const hh = String(f.hora).padStart(2, '0');
  const mm = String(f.minuto).padStart(2, '0');
  return `${diaSemana} ${f.dia} de ${MESES[f.mes - 1]} · ${hh}:${mm} h (hora de Chile)`;
}
