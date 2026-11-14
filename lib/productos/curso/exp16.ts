// EXP-16 (propuesta 14-nov-2026 17:00, experimentador; desplegada el 14-nov con los obligatorios del revisor adversario) · /curso
// «dar antes de pedir» en el aterrizaje de los anuncios. Entró el mismo 14-nov: EXP-15 se cerró antes de plazo «sin conclusión»
// (decisión del coordinador: venta comprometida al 18-nov y el 90 % del tráfico pagado se va antes de 10 s) y quedó su B fija
// para A y B, sin script (no comparte ?v= ni la etiqueta de Slack).
// Lectura por anuncio: la visita lleva utm_content en el aviso de Slack, «meta / curso-nov26 (anuncio v17-m0-hero)» o
// «(anuncio x14-chat-vs-agente)», y el registro lo lleva en sus etiquetas (utm-content:…). real.mjs arma porAnuncio.
// Problema (corte 14-nov 17:00): el tráfico de Meta aterriza en #parte-gratis-hero y en 360×560 ve solo un formulario de 3 campos
// (la promesa del H1 queda arriba, fuera de pantalla). 68 visitas pagadas desde el 13-nov 22:37: 6 con ≥10 s, 0 registros.
//   A = control: el aterrizaje de hoy (contexto + «Deja tu correo y mira el módulo 0» + formulario).
//   B = UNA cosa distinta: el video de la lección 1 del módulo 0 («Por qué todo pasa por ti», 57 s, v09-m0-l1, play grande al
//       centro) arriba del formulario, a la vista y sin pedir nada; el formulario queda igual, debajo, para las lecciones 2 a 4
//       (título «Mira la lección 1 aquí arriba. Las 2 a 4, gratis con tu correo» y bajada «3 lecciones cortas más: …»).
// Hipótesis: una visita fría que viene de un reel sigue mirando si lo primero que ve es un video y no un formulario; quien ve
// la lección 1 deja el correo para las 2 a 4 más que quien recibe el formulario en frío.
// Métrica: registros al módulo 0 por visita real pagada (curso-nov26). Desempate: % con play o ≥10 s, y luego scroll ≥50 %.
// Corte: 2–4 días (mínimo 48 h) o 100 visitas reales por variante.
// Mecánica en lib/productos/experimento.ts: localStorage vl_exp16, ?v=A|B, <html data-exp16>, «[EXP-16 X]» en Slack.

import { crearExperimento } from '../experimento';

export const CLAVE_EXP16 = 'vl_exp16';
export const EXP16 = crearExperimento('16', CLAVE_EXP16, {}, 'AB');
