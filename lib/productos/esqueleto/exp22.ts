// EXP-22 (corte del 18-nov-2026 17:00, experimentador) · /esqueleto. Reemplaza a EXP-19 (cerrada: cumplió su muestra, A 79 y
// B 81 visitas reales X14 desde el 17-nov 07:04; B 1 «Armar» contra 0 de A, no llegó a los 2 que pedía su regla → queda A).
// El anuncio X14 se pausó el 18-nov ~13:30: desde ahora llega tráfico tibio (DM «comenta ESQUELETO», perfil de Instagram).
// Base (A) = portada ganadora de EXP-14 para todos (el titular X14 sale del código).
//
// Dos retadores diseñados; corre UNO a la vez como B (regla de Álvaro: 2 variantes por 2–4 días). RETADOR_EXP22 elige cuál:
//   1 = «Armar mi esqueleto» lleva directo al paso 1: sale la pantalla «¿Te pasa esto?» antes del paso 1 (las de los pasos
//       2 a 4 siguen). «Atrás» en el paso 1 vuelve a la portada. Hipótesis: el 17-nov, 2 de 3 personas que tocaron «Armar»
//       se fueron en esa pregunta sin llegar al paso 1; quien viene de un DM ya dijo que quiere el esqueleto, la pregunta le
//       sobra. Sin ella, más gente llega al paso 1 y al registro.
//   2 = bajada de la portada «…qué nunca promete y cuándo te avisa.» → «…qué nunca promete y cuándo te pasa la conversación.»
//       (recomendado pendiente del revisor del 16-nov). Hipótesis: «te avisa» suena a algo que corre solo; «te pasa la
//       conversación» dice lo que de verdad hace el esqueleto y sube el clic «Armar».
// Métrica: con el retador 1, llegadas al paso 1 por clic «Armar» y registros por visita real; con el retador 2, clics «Armar»
// por visita real. Desempate: registros, luego scroll ≥50 % y ≥10 s.
// Corte: 2–4 días desde el deploy o 30 visitas reales por variante. Con <15 por variante se dice y se decide con la mejor señal.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp22 (clave nueva), ?v=A|B, <html data-exp22>, «[EXP-22 X]».

import { crearExperimento } from '../experimento';

export const CLAVE_EXP22 = 'vl_exp22';
export const EXP22 = crearExperimento('22', CLAVE_EXP22, {}, 'AB');

/** Qué retador corre como B. Cambiarlo es un deploy y abre una ronda nueva (no se mezclan). */
export const RETADOR_EXP22: 1 | 2 = 1;
