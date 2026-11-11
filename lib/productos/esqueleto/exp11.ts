// EXP-11 (12-nov-2026) · /esqueleto, ciclo diario (regla de Álvaro, 11-nov).
// Ronda anterior EXP-09: ganó A «Tu asistente de WhatsApp, escrito en 15 minutos» (única que llegó al formulario).
//   A = ganadora de EXP-09.
//   B = estructura (ex C2): por qué este esqueleto y no un prompt suelto + quién lo arma, bajo el botón.
//   C = video primero: el video de bienvenida (40 s) bajo el título, antes del botón.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp11, ?v=A|B|C, <html data-exp11>, «[EXP-11 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP11 = 'vl_exp11';
export const EXP11 = crearExperimento('11', CLAVE_EXP11);
