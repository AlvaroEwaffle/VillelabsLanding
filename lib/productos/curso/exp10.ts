// EXP-10 (12-nov-2026) · /curso, ciclo diario (regla de Álvaro, 11-nov: cada día queda el ganador y entran 2 retadores).
// Ronda anterior EXP-08 (10/11-nov): ganó A «resultado» (mediana ~14 s; C «tablero» 4 s, retirada).
//   A = ganadora de EXP-08 (título de resultado, foto, video bajo la franja).
//   B = estructura (ex C2): por qué este curso + quién lo arma + módulo 0 + en qué se basa, bajo el hero.
//   C = video primero: el video de venta (49 s) bajo el título, antes del botón y de la franja.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp10, ?v=A|B|C, <html data-exp10>, «[EXP-10 X]» en Slack.

import { crearExperimento, type Variante } from '../experimento';

export type VarianteExp10 = Variante;
export const CLAVE_EXP10 = 'vl_exp10';
export const EXP10 = crearExperimento('10', CLAVE_EXP10);

export const SCRIPT_EXP10 = EXP10.script;
export const asignarVarianteExp10 = EXP10.asignar;
export const varianteExp10 = EXP10.variante;
export const etiquetaVarianteExp10 = () => { const v = EXP10.variante(); return v ? EXP10.etiqueta(v) : undefined; };
export const avisarVarianteExp10 = EXP10.avisar;
