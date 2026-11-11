// EXP-08 (10-nov-2026) · tres heros para /curso (A resultado · B dolor · C demostración), 1/3 cada uno.
// Motivo: GA4 del 10-nov, la gente que llega desde el anuncio de Meta «Ordena tu negocio» se queda ~1 s y solo 2 %
// llega al 90 % de scroll. Aprobado por Álvaro por WhatsApp.
//
// Mecánica común en lib/productos/experimento.ts (localStorage vl_exp08, ?v=A|B|C, <html data-exp08>).

import { crearExperimento, type Variante } from '../experimento';

export type VarianteExp08 = Variante;
export const CLAVE_EXP08 = 'vl_exp08';
export const EXP08 = crearExperimento('08', CLAVE_EXP08);

export const SCRIPT_EXP08 = EXP08.script;
export const asignarVarianteExp08 = EXP08.asignar;
export const varianteExp08 = EXP08.variante;
export const avisarVarianteExp08 = EXP08.avisar;
