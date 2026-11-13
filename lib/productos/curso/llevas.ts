// Sección «Qué te llevas / Qué vas a aprender» de /curso (13-nov-2026, pedido de Álvaro: «en la segunda sección, debajo del
// hero, bien destacados, bien animados»). Solo lo que entregan los módulos publicados, sin certificado ni cifras de resultados.
// 13-nov-2026 (rama feat/curso-m7-final): con el módulo 7 publicado, 8 módulos, 38 lecciones y 34 prompts; el agente se
// describe con lo que hizo en la prueba (~/.claude/marca-alvaro/curso/modulo-7/prueba.md). Fuentes: HOJAS y CURSO.comoFunciona (curso.ts), FAQ «¿Qué recibo?», y el outline
// del 13-nov (~/.claude/marca-alvaro/planes/pdf/Outline-curso-2026-11-13.html: 33 lecciones, 27 prompts, ~28 min de video).

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
