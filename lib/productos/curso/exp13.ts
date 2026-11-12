// EXP-13 (12-nov-2026, 17:00) · /curso. Método vigente desde el 12-nov: dos variantes por 2-4 días (se lee el 14-nov a las
// 17:00 como mínimo; plazo máximo 16-nov). Reemplaza a EXP-10 (A/B/C de un día, sin ganador: muestra < 30 visitas por variante).
//   A = control = la A de EXP-10 (título de resultado, botón de compra primero, barra fija de compra en celular).
//   B = «módulo 0 primero»: «Mira gratis el módulo 0» como botón principal con el formulario a la vista, la compra pasa a
//       enlace secundario, barra fija de celular = «Mira gratis el módulo 0», sin «primeros 20 alumnos», y la duración
//       dicha igual en todas partes: 7 módulos, unas 5 horas de lecciones.
// Hipótesis: si la primera acción que se ofrece es gratis (módulo 0 con el correo), en vez de pagar, suben los registros
// por visita real, porque hoy el tráfico frío de Meta no llega al botón de compra (0 clics a Hotmart reales el 11-nov).
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp13, ?v=A|B, <html data-exp13>, «[EXP-13 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP13 = 'vl_exp13';
export const EXP13 = crearExperimento('13', CLAVE_EXP13, {}, 'AB');
