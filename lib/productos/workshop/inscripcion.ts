import { WORKSHOP_DURACION_MIN, WORKSHOP_TITULO, WORKSHOP_ZONA_HORARIA, fechaWorkshop } from './config';
import { registrarLead } from '@/lib/productos/leads';

export type Inscripcion = {
  nombre: string;
  correo: string;
  whatsapp: string;
  rubro: string;
  mensajesDia: string;
};

const CLAVE_LOCAL = 'villelab_workshop1_inscripcion';

/**
 * Registra la inscripción en Fidelidapp (cuenta «Alvaro Villena», etiqueta producto:workshop) y la
 * deja también en el navegador para la confirmación. Ver lib/productos/leads.ts.
 * Pendiente: recordatorios de 24 h y 1 h como automatización en Fidelidapp.
 */
export async function registrarInscripcion(datos: Inscripcion): Promise<void> {
  try {
    window.localStorage.setItem(CLAVE_LOCAL, JSON.stringify({ ...datos, fecha: new Date().toISOString() }));
  } catch {
    // Navegación privada o almacenamiento bloqueado: la confirmación se muestra igual.
  }
  await registrarLead({
    nombre: datos.nombre,
    correo: datos.correo,
    whatsapp: datos.whatsapp,
    producto: 'workshop',
    detalles: { workshop: 'workshop-1-atencion', rubro: datos.rubro, mensajes: datos.mensajesDia },
  });
}

/** Evento para GTM → GA4 (mismo patrón que lib/ga4.ts). */
export function trackWorkshopRegistro(datos: Pick<Inscripcion, 'rubro' | 'mensajesDia'>) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: 'workshop_registro',
    workshop: 'workshop_1_atencion',
    rubro: datos.rubro,
    mensajes_dia: datos.mensajesDia,
  });
}

const dos = (n: number) => String(n).padStart(2, '0');
// Texto de .ics: escapar \ ; , y saltos de línea (RFC 5545).
const txt = (v: string) => v.replace(/\\/g, '\\\\').replace(/[;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

/** Archivo .ics del workshop, o null si la fecha sigue «Por confirmar». */
export function generarIcs(urlInscripcion: string): string | null {
  const f = fechaWorkshop();
  if (!f) return null;
  // Aritmética sobre la hora local «ingenua» (sin zona) para sumar la duración.
  const inicio = new Date(Date.UTC(f.anio, f.mes - 1, f.dia, f.hora, f.minuto));
  const fin = new Date(inicio.getTime() + WORKSHOP_DURACION_MIN * 60_000);
  const local = (d: Date) =>
    `${d.getUTCFullYear()}${dos(d.getUTCMonth() + 1)}${dos(d.getUTCDate())}T${dos(d.getUTCHours())}${dos(d.getUTCMinutes())}00`;
  const ahora = new Date();
  const stamp = `${ahora.getUTCFullYear()}${dos(ahora.getUTCMonth() + 1)}${dos(ahora.getUTCDate())}T${dos(ahora.getUTCHours())}${dos(ahora.getUTCMinutes())}00Z`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Villelab//Workshop 1//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:workshop1-${local(inicio)}@villelab.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${WORKSHOP_ZONA_HORARIA}:${local(inicio)}`,
    `DTEND;TZID=${WORKSHOP_ZONA_HORARIA}:${local(fin)}`,
    `SUMMARY:${txt(`Workshop · ${WORKSHOP_TITULO}`)}`,
    `DESCRIPTION:${txt(`45 min · gratis · en vivo por YouTube con Álvaro Villena. El link del directo te llega por correo y WhatsApp. Más info: ${urlInscripcion}`)}`,
    'LOCATION:En línea (link por correo y WhatsApp)',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:El workshop empieza en 1 hora',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function descargarIcs(urlInscripcion: string) {
  const ics = generarIcs(urlInscripcion);
  if (!ics) return;
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workshop-villelab.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
