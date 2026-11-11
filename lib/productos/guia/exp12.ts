// EXP-12 (12-nov-2026) · /guia, primer experimento de la guía, ciclo diario (regla de Álvaro, 11-nov).
//   A = hero actual («Deja de vender solo cuando te llega un referido», ya es un título de dolor).
//   B = resultado: «Tus 20 posibles clientes y el primer mensaje para cada uno, en una tarde».
//   C = video primero: la muestra «El primer mensaje, a mano» (50 s) bajo el título, antes del precio y el botón.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp12, ?v=A|B|C, <html data-exp12>, «[EXP-12 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP12 = 'vl_exp12';
export const EXP12 = crearExperimento('12', CLAVE_EXP12);
