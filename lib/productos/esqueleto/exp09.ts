// EXP-09 (10-nov-2026) · tres heros para /esqueleto (A resultado · B dolor · C demostración), 1/3 cada uno.
// Misma mecánica que EXP-08 /curso (lib/productos/experimento.ts): localStorage vl_exp09, ?v=A|B|C para QA,
// <html data-exp09> antes de pintar, «[EXP-09 X]» en Slack y dataLayer `exp09_variante`.
// Pedido de Álvaro por WhatsApp: «aplicar misma lógica para esqueleto».

import { crearExperimento } from '../experimento';

// 11-nov-2026 (Álvaro por WhatsApp): C «esqueleto lleno primero» se retira (0 de 14 visitas avanzaron) y entra C2,
// la variante de ESTRUCTURA: por qué funciona + quién lo hizo + qué trae, arriba. Clave nueva vl_exp09b; Slack «[EXP-09 C2]».
export const CLAVE_EXP09 = 'vl_exp09b';
export const EXP09 = crearExperimento('09', CLAVE_EXP09, { C: 'C2' });
