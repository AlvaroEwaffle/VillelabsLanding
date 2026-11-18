// EXP-21 (corte del 18-nov-2026 17:00, experimentador) · /curso. Primera ronda con el precio nuevo (curso USD 87, publicado el
// 18-nov 17:26) y sin tráfico pagado (las campañas de Meta a /curso y /esqueleto se pausaron el 18-nov ~13:30; los anuncios
// ahora mandan al perfil de Instagram y a /lista). Lo que llega es tibio: perfil, DM, YouTube, la lista del taller.
// Base (A) = la B de EXP-16, que ganó por desempate (lección 1 del módulo 0 a la vista arriba del formulario; 0 registros en
// las dos, ≥10 s 11/48 contra 4/55). Desde este corte la lección 1 es fija para todos y EXP-16 ya no marca nada.
//
// Dos retadores diseñados; corre UNO a la vez como B (regla de Álvaro: 2 variantes por 2–4 días). RETADOR_EXP21 elige cuál:
//   1 = formulario de un solo campo (solo el correo) en el aterrizaje. Sin nombre ni WhatsApp; el nombre del lead sale de la
//       parte del correo antes de la @ (etiqueta nombre:desde-correo en Fidelidapp). Es la EXP-18 diseñada el 15-nov.
//       Hipótesis: 3 campos es mucho para quien recién llega; con 1 campo, más gente deja el correo y entra al módulo 0.
//   2 = botón principal del hero «Mira gratis el módulo 0» → «Mira la lección 1, sin correo» (mismo destino: el bloque de la
//       lección 1 y el formulario). Hipótesis: hoy nadie toca el play (0 de 48); si el botón promete algo que no pide nada,
//       más gente llega a la lección 1 y, después de verla, deja el correo para las otras 3.
// Métrica: registros al módulo 0 por visita real a /curso, por variante. Desempate: play de la lección 1 o ≥10 s, luego
// scroll ≥50 %. Clic a comprar y ventas NO se comparan con EXP-13/15/16 (precio casi 3 veces mayor).
// Corte: 2–4 días desde el deploy o 30 visitas reales por variante. Con <15 por variante se dice y se decide con la mejor señal.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp21 (clave nueva: todos se sortean de nuevo), ?v=A|B,
// <html data-exp21>, «[EXP-21 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP21 = 'vl_exp21';
export const EXP21 = crearExperimento('21', CLAVE_EXP21, {}, 'AB');

/** Qué retador corre como B. Cambiarlo es un deploy y abre una ronda nueva (no se mezclan). */
export const RETADOR_EXP21: 1 | 2 = 1;
