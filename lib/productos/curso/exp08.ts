// EXP-08 (10-nov-2026) · tres heros para /curso (A resultado · B dolor · C demostración), 1/3 cada uno.
// Motivo: GA4 del 10-nov, la gente que llega desde el anuncio de Meta «Ordena tu negocio» se queda ~1 s y solo 2 %
// llega al 90 % de scroll. Aprobado por Álvaro por WhatsApp.
//
// Mecánica común en lib/productos/experimento.ts (localStorage vl_exp08, ?v=A|B|C, <html data-exp08>).

import { crearExperimento, type Variante } from '../experimento';

export type VarianteExp08 = Variante;
// 11-nov-2026 (Álvaro por WhatsApp): C «tablero primero» se retira (4 s de mediana vs ~14 s de A y B) y entra C2,
// la variante de ESTRUCTURA: por qué este curso y no otro + quién lo arma + en qué se basa + módulo 0 arriba.
// Clave nueva (vl_exp08b) para que quien vio la C vieja vuelva a sortearse; en Slack sale «[EXP-08 C2]».
export const CLAVE_EXP08 = 'vl_exp08b';
export const EXP08 = crearExperimento('08', CLAVE_EXP08, { C: 'C2' });

export const SCRIPT_EXP08 = EXP08.script;
export const asignarVarianteExp08 = EXP08.asignar;
export const varianteExp08 = EXP08.variante;
export const etiquetaVarianteExp08 = () => { const v = EXP08.variante(); return v ? EXP08.etiqueta(v) : undefined; };
export const avisarVarianteExp08 = EXP08.avisar;
