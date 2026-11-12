// EXP-14 (12-nov-2026, 17:00) · /esqueleto. Dos variantes por 2-4 días (lectura el 14-nov a las 17:00 como mínimo; plazo
// máximo 16-nov). Reemplaza a EXP-11 (A/B/C de un día, sin ganador: muestra < 30 visitas por variante).
//   A = control = la A de EXP-11 («Tu asistente de WhatsApp, escrito en 15 minutos», botón «Empezar»; el correo se pide
//       recién al final, tras los 4 pasos).
//   B = correo en la primera pantalla: nombre + correo bajo el título, antes del paso 1; el registro sale ahí mismo.
// Hipótesis: pedir el correo al entrar (cuando la persona ya llegó con intención) sube los registros por visita real,
// porque hoy ninguna visita llega al paso 5 donde recién se pide (0 registros desde el 8-nov).
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp14, ?v=A|B, <html data-exp14>, «[EXP-14 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP14 = 'vl_exp14';
export const EXP14 = crearExperimento('14', CLAVE_EXP14, {}, 'AB');
