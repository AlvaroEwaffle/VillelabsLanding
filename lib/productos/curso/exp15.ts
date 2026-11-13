// EXP-15 (13-nov-2026) · /curso «promesa automatizar». Pedido de Álvaro (chat, ~11:10): «la promesa debe ser tipo "aprende a
// automatizar tu negocio", y que CRM y ERP aparezcan como keywords por ahí». Entra como experimento, no como reemplazo.
// Reemplaza a EXP-13, cerrada el 13-nov sin potencia (desde el 12-nov 17:00, visitas reales: A 8 · 0 bajan ≥25 % · 0 clics ·
// 0 registros; B 6 · 2 bajan ≥25 % · 0 clics · 0 registros). Quedó la B de EXP-13 («módulo 0 primero») como base para todos.
//   A = control: H1 del anuncio v17 «Ordena tu negocio en una planilla…» (el mismo de EXP-13).
//   B = antetítulo con la pregunta de los anuncios y el reel del 13-nov + H1 «automatizar» + bajada con CRM y ERP + chips que los explican.
// Lo demás es igual en A y B (botón «Mira gratis el módulo 0», formulario, sección «Qué te llevas / Qué vas a aprender»).
// Hipótesis: una promesa de resultado («automatizar») con las palabras que la gente busca (CRM, ERP) hace que más visitas
// bajen ≥25 % y se registren al módulo 0 que la promesa «planilla».
// Métrica: registros al módulo 0 por visita real; desempate: interesadas (≥25 % de scroll), clic al botón principal.
// Corte: lunes 16-nov 17:00 o 100 visitas reales por variante, lo que ocurra primero.
// Regla de verdad: «automatizar» solo promete lo que hacen los módulos 0–6 publicados (fórmulas y tablero que se calculan
// solos, prompts que arman cada hoja). Nada del agente (módulo 7, sin publicar).
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp15, ?v=A|B, <html data-exp15>, «[EXP-15 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP15 = 'vl_exp15';
export const EXP15 = crearExperimento('15', CLAVE_EXP15, {}, 'AB');

/** Textos de la variante B (revisados por el revisor adversario antes del deploy). */
export const PROMESA_EXP15 = {
  antetitulo: '¿Tu negocio vive en tu celular, un cuaderno y tres Excel?',
  // Revisor adversario (13-nov): «Aprende a automatizar tu negocio» a secas NO PASA (el curso publicado enseña a anotar a mano,
  // mensajes uno a uno y 20 min al día; lo único automático son las cuentas). Versión que pasa, con el verbo y CRM/ERP:
  titulo: 'Aprende a automatizar los números de tu negocio',
  bajada:
    'Tu CRM y tu ERP en una sola planilla, con ayuda de la IA y sin programar: tú anotas clientes, pedidos y pagos, y los atrasos, la caja y el tablero se calculan solos.',
  chips: [
    { clave: 'CRM', texto: 'tus clientes y lo que les vendes' },
    { clave: 'ERP', texto: 'pedidos, cobranza y caja' },
  ],
} as const;
