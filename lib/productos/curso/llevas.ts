// Sección «Qué te llevas / Qué vas a aprender» de /curso (13-nov-2026, pedido de Álvaro: «en la segunda sección, debajo del
// hero, bien destacados, bien animados»). Solo lo que entregan los módulos publicados, sin certificado ni cifras de resultados.
// 13-nov-2026 (rama feat/curso-m7-final): con el módulo 7 publicado, 8 módulos, 38 lecciones y 34 prompts; el agente se
// describe con lo que hizo en la prueba (~/.claude/marca-alvaro/curso/modulo-7/prueba.md). Fuentes: HOJAS y CURSO.comoFunciona (curso.ts), FAQ «¿Qué recibo?», y el outline
// del 13-nov (~/.claude/marca-alvaro/planes/pdf/Outline-curso-2026-11-13.html: 33 lecciones, 27 prompts, ~28 min de video).

import { PRECIO_GUIA } from '../guia/venta';

export const LLEVAS = [
  {
    clave: '9 hojas',
    titulo: 'Tu planilla, ya conectada',
    texto: 'Inicio, Clientes, Origen, Productos, Pedidos, Atención, Cobranza, Caja y Tablero. La descargas en el módulo 0 y las fórmulas vienen listas: tú llenas filas.',
  },
  {
    clave: '34 prompts',
    titulo: 'Textos listos para la IA',
    texto: 'Dentro de las lecciones, para copiar en ChatGPT o Claude (los 7 de tu agente, probados en un proyecto de Claude). La IA te arma el primer borrador y tú lo revisas.',
  },
  {
    clave: '1 ejemplo lleno',
    titulo: 'Grano Norte, para mirar antes de llenar',
    texto: 'La misma planilla con todas sus hojas llenas, de una tostaduría de café inventada, para que veas cómo queda.',
  },
  {
    clave: '38 lecciones',
    titulo: 'Cortas y a tu ritmo',
    texto: 'Al comprar entras a los 8 módulos completos. No se cierran: avanzas cuando puedes y retomas donde quedaste.',
  },
] as const;

/**
 * Pack del curso (13-nov-2026, decisión de Álvaro): el mismo producto de Hotmart (8921667), al mismo precio, incluye dos bonos.
 * Se entregan solos dentro del curso, en «Tus bonos» (/curso/bonos). La Guía se sigue vendiendo sola: su precio se dice tal
 * cual, sin precio tachado ni «valor total» inventado, sin «por tiempo limitado», cupos ni fechas.
 */
export const PACK = {
  titulo: 'Curso (8 módulos) + la planilla lista + la Guía «Tus próximos 20 clientes»',
  bonos: [
    {
      clave: 'Bono 1',
      titulo: 'La planilla lista',
      texto: 'La misma planilla del curso, en blanco y con instrucciones adentro: 5 pasos para partir, las celdas que se calculan solas en gris y avisos si una fecha o un monto quedan mal escritos. Para usarla sola desde hoy, aunque no hayas visto las lecciones.',
      corto: 'La misma planilla, con 5 pasos y avisos adentro para usarla sola desde hoy.',
    },
    {
      clave: 'Bono 2',
      titulo: 'La Guía «Tus próximos 20 clientes»',
      texto: `En una tarde armas tu lista de 20 posibles clientes, el primer mensaje y los seguimientos con fecha. Se vende sola a ${PRECIO_GUIA.texto} CLP; con el curso viene incluida.`,
      corto: `Se vende sola a ${PRECIO_GUIA.texto} CLP; aquí viene incluida.`,
    },
  ],
  entrega: 'Los dos bonos te esperan dentro del curso, en «Tus bonos», apenas entras con tu código.',
} as const;

/** Una por módulo (0–7), del objetivo real de cada uno, en lenguaje llano. */
export const APRENDES = [
  { modulo: 0, texto: 'Ver tu negocio completo en un mapa: qué está en rojo y por dónde partir.' },
  { modulo: 1, texto: 'Que ningún cliente se te pierda: cada uno con su próximo paso y su fecha.' },
  { modulo: 2, texto: 'Saber de dónde llegan tus clientes y armar una semana de publicaciones en una tarde.' },
  { modulo: 3, texto: 'Anotar cada pedido en una fila y ver qué está atrasado sin preguntarle a nadie.' },
  { modulo: 4, texto: 'Responder rápido lo que se repite y seguir cada reclamo hasta cerrarlo.' },
  { modulo: 5, texto: 'Cobrar a tiempo y ver la caja de tus próximas 4 semanas.' },
  { modulo: 6, texto: 'Leer tus números del lunes en un tablero que se calcula solo.' },
  { modulo: 7, texto: 'Delegar a un agente de IA el trabajo que se repite: te arma la fila de cada pedido de WhatsApp y la cobranza del lunes. Tú revisas y envías.' },
] as const;

/**
 * Tiempo medido (auditoría 12-nov: ~28 min de video + ~70 min de lectura = cerca de 1 h 30) + módulo 7 (3 min 16 s de video
 * + ~6 min de lectura) ≈ 1 h 45. Práctica: 6 h 20–7 h 30 + 50–67 min del módulo 7 = «unas 7 a 8 horas». Sin redondear hacia arriba.
 */
export const TIEMPO = {
  grande: 'Menos de 2 horas',
  detalle: 'de contenido (cerca de 1 h 45), y unas 7 a 8 horas de práctica a tu ritmo, armando tu planilla y tu agente.',
  apoyo: 'Lecciones de unos 3 minutos: el contenido lo ves en una tarde.',
} as const;
