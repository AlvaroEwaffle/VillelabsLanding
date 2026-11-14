// Curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets» · datos únicos (página de venta + módulos).
// v1.0 (7-nov-2026): «Tu negocio de punta a punta», contenido-primeros-productos.html (PRODUCTO 4 · CURSO).
// v1.1 (8-nov-2026): reposicionado como «construye tu primer CRM y ERP» a pedido de Álvaro, con las
// investigaciones de demanda y de evidencia (VPM/Villelabs/productos-digitales/investigacion/). Ver versiones.ts.

/**
 * Precio ratificado por Álvaro el 8-nov-2026: $29.990. Quien compró la Guía 1 tiene el cupón GUIA1CURSO (33,34 %,
 * queda en ~$19.990). Hotmart: producto 8921667, garantía 7 días, pago único o en cuotas.
 * 12-nov-2026 (Álvaro, «haz todos los ajustes»): se dice «precio de lanzamiento», sin fecha, sin cupos y sin «sube
 * después». Ya no se dice «preventa»: los módulos están grabados y abiertos para quien compra (8 desde el módulo 7).
 */
// 13-nov-2026: vive en ./precio (módulo chico) para que el píxel lo lea sin cargar este archivo en todas las páginas.
import { PRECIO_FUNDADOR } from './precio';
export { PRECIO_FUNDADOR };
export const PRECIO_NORMAL = 59990;
export const CUPOS_FUNDADOR = 20;
export const MONEDA_PRECIO = 'CLP';
export const PRECIO_CURSO = { cuponGuia: 'GUIA1CURSO', precioConCupon: 19990, garantiaDias: 7 };

const clp = (n: number) => '$' + n.toLocaleString('es-CL');

export function textoPrecio(): string {
  return PRECIO_FUNDADOR === null ? 'Precio de lanzamiento' : `${clp(PRECIO_FUNDADOR)} precio de lanzamiento`;
}

/**
 * 13-nov-2026 (auditoría AI SEO, arreglo 5): la misma cifra con la moneda escrita («$29.990 CLP»), para que un asistente
 * no la lea como dólares. Solo en la tarjeta de precio, fuera del primer pantallazo: el hero (EXP-15) sigue con textoPrecio().
 */
export function textoPrecioConMoneda(): string {
  return PRECIO_FUNDADOR === null ? 'Precio de lanzamiento' : `${clp(PRECIO_FUNDADOR)} ${MONEDA_PRECIO} precio de lanzamiento`;
}

/** Variante B de EXP-13 (12-nov-2026): sin «primeros 20 alumnos» (cupo sin respaldo verificable en la página). */
export function textoPrecioSinCupo(): string {
  return textoPrecio();
}

/** Variante B de EXP-13: solo el cupón (el «después sube» va atado al cupo, que en B no se muestra). */
export function textoPrecioDetalleSinCupo(): string {
  return `Si compraste la guía, con el cupón ${PRECIO_CURSO.cuponGuia} te queda en ${clp(PRECIO_CURSO.precioConCupon)}.`;
}

export function textoPrecioDetalle(): string {
  return `Si compraste la guía, con el cupón ${PRECIO_CURSO.cuponGuia} te queda en ${clp(PRECIO_CURSO.precioConCupon)}.`;
}

/**
 * Duración medida en la auditoría del 12-nov-2026 (~/.claude/marca-alvaro/curso/auditoria-2026-11-12.md): 28,3 min de
 * video (ffprobe) + ~70 min de lectura = cerca de 1 h 30 de lecciones; práctica estimada 6 h 20 a 7 h 30. Nada de «5 horas»
 * ni «6 semanas»: si cambia el contenido, se vuelve a medir antes de cambiar estas frases.
 * 13-nov-2026, módulo 7: +3 min 16 s de video (ffprobe de m7-l1…l5 v2, con cortina de cierre; antes 3 min 14 s) + ~6 min de lectura → 31,5 + ~76 ≈ 107 min = «cerca de
 * 1 h 45» (redondeado al múltiplo de 5 más cercano, no hacia arriba). Práctica del módulo 7: 50 a 67 min (criterio de la prueba,
 * sin medición con personas) → 7 h 10 a 8 h 37 = «unas 7 a 8 horas». Nada de «4 a 5 horas» (exige ruta rápida cronometrada).
 */
export const DURACION_CURSO =
  'Menos de 2 horas de contenido (cerca de 1 h 45 de lecciones cortas) y unas 7 a 8 horas de práctica, a tu ritmo. Sales con tu negocio en una planilla, un tablero que se calcula solo y un agente de IA que trabaja con esa planilla.';

/**
 * 13-nov-2026 (OK de Álvaro a la promesa del módulo 7, redacción B de ~/.claude/marca-alvaro/curso/modulo-7/promesa.md).
 * Lo que se dice del agente sale de prueba.md: probado en un proyecto de Claude (cuenta pagada); ChatGPT y cuentas gratis,
 * sin probar. La planilla necesita configuración regional Chile (con «Estados Unidos», 12-11 entra como 11 de diciembre).
 */
// 13-nov-2026 (integración final, rama feat/curso-m7-final): el H1 de /curso NO cambia (lo mide EXP-15 y el revisor objetó
// «automatizar tu negocio» a secas). De aquí se usan la definición y las condiciones; la sección del sistema y el proyecto
// final usan SISTEMA_AGENTE y PROYECTO_AGENTE (abajo).
export const PROMESA_AGENTE = {
  condiciones:
    'Lo probamos en un proyecto de Claude con cuenta pagada y Google Sheets; en ChatGPT, en cuentas gratis y en Excel, todavía no. Tu planilla necesita la configuración regional Chile.',
  definicion:
    'Tu primer agente: un asistente en un proyecto de Claude con las reglas de tu negocio y tu planilla como memoria. Hace tareas cuando se las pides; tú revisas y tú envías.',
} as const;

/**
 * Sección del sistema en /curso (13-nov-2026, pedido de Álvaro: «Estructura y delega a tu agente la gestión de clientes y
 * operación»). Dos pasos visibles. «Gestión de clientes y operación» se describe SOLO con lo que el agente hizo en la prueba
 * (~/.claude/marca-alvaro/curso/modulo-7/prueba.md: 6 de 6 y 5 de 5 correctas en un proyecto de Claude): arma la fila del
 * pedido desde un WhatsApp, arma la cobranza del lunes y avisa de pedidos abiertos o facturas vencidas del mismo cliente.
 * Nada de «atiende solo», «se conecta a tu WhatsApp» ni «actualiza tu planilla solo» (promesa.md, «Lo que NO se puede decir»).
 */
export const SISTEMA_AGENTE = {
  titulo: 'Estructura tu negocio y delega a tu agente.',
  bajada: 'Dos pasos. Primero ordenas tu negocio en una planilla; después, un agente de IA trabaja con ella y te prepara el trabajo que más se repite.',
  pasos: [
    {
      n: '1',
      nombre: 'Estructura',
      modulos: 'Módulos 0 a 6',
      texto: 'Clientes, pedidos, cobranza y caja en tu planilla: tu CRM y tu ERP, hoja por hoja, con un tablero que se calcula solo.',
    },
    {
      n: '2',
      nombre: 'Delega',
      modulos: 'Módulo 7',
      texto: 'Un agente de IA que trabaja con esa planilla: la usa como memoria para prepararte pedidos y cobranza.',
    },
  ],
  gestion: {
    titulo: 'Gestión de clientes y operación',
    items: [
      { nombre: 'Te arma el pedido', texto: 'Le pegas el WhatsApp del cliente y te devuelve la fila para tu hoja Pedidos y la respuesta sugerida, sin confirmar fechas ni descuentos que no decidiste.' },
      { nombre: 'Te avisa qué cobrar', texto: 'Le pegas tu hoja Cobranza y te dice a quién escribir, a quién llamas tú y el mensaje listo, con el total vencido y lo que vence esta semana.' },
      { nombre: 'Cruza lo que ya sabes', texto: 'Si el cliente que te escribe tiene un pedido abierto o una factura vencida según la planilla que le subiste, te lo avisa.' },
    ],
    cierre: 'El agente prepara; tú revisas y envías. No se conecta a tu WhatsApp ni escribe solo en tu planilla.',
  },
} as const;

/** Cierre de «El programa» en /curso: el módulo 7 como proyecto final (pedido de Álvaro del 13-nov). */
export const PROYECTO_AGENTE = {
  kicker: 'Proyecto final',
  titulo: 'Tu agente operando tu negocio a través de un tablero',
  texto:
    'Juntas lo que armaste: tu planilla con sus hojas y su tablero, y un agente que trabaja con ella. Le pegas un WhatsApp y te arma el pedido; el lunes le pegas tu cobranza y te dice a quién cobrar. Tú revisas el tablero, decides y envías.',
  nota: 'Lo probamos en un proyecto de Claude con cuenta pagada y la planilla en Google Sheets; en ChatGPT, en cuentas gratis y con Excel, todavía no (detalle en las preguntas frecuentes).',
} as const;

export const CURSO = {
  nombre: 'Construye con IA tu sistema de gestión CRM y ERP para tu negocio',
  apellido: 'Sin programar, en Google Sheets',
  /** Nombre completo (igual en Hotmart) para metadata y referencias desde otros productos. */
  nombreCompleto: 'Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar',
  promesa: `${DURACION_CURSO} Ahí quedan tus clientes y en qué va cada uno, de dónde llegan, los pedidos, la atención, la cobranza y la caja, y cada módulo trae prompts listos para copiar en ChatGPT o Claude (los del agente, probados en Claude).`,
  noEsSoftware:
    'No es un software ni una suscripción: es una planilla bien armada, con las fórmulas listas, y rutinas cortas para que el negocio no dependa de tu memoria.',
  formato: [
    { etiqueta: 'Formato', valor: '8 módulos y 38 lecciones cortas, todos listos' },
    { etiqueta: 'Duración', valor: 'menos de 2 h de contenido + unas 7 a 8 h de práctica' },
    { etiqueta: 'Herramienta', valor: 'Google Sheets (gratis) o Excel; el agente, en un proyecto de Claude' },
    { etiqueta: 'Cada lección', valor: 'idea → ejemplo → tu hoja → prueba real' },
    { etiqueta: 'Proyecto final', valor: 'tu agente operando tu negocio a través de un tablero' },
  ],
  comoFunciona: [
    'Lecciones cortas con el caso Grano Norte en pantalla: ves la hoja llena antes de llenar la tuya.',
    'Cada módulo llena una hoja de la misma planilla, ya conectada con las anteriores. No empiezas de cero en cada módulo.',
    'Las lecciones donde armas algo traen su prompt listo para copiar (34 en total): la IA te arma el primer borrador y tú lo revisas. Los de los módulos 0 a 6 sirven en ChatGPT o Claude; los 7 del módulo 7 los probamos solo en un proyecto de Claude con cuenta pagada.',
    'Prueba real al cierre de cada módulo: usas la hoja con tu negocio unos días antes de seguir.',
    'Semáforo de cada pieza (rojo, naranja, verde) antes y después, el tablero que lo junta todo y, al cierre, tu primer agente trabajando con tu planilla.',
  ],
} as const;

/** Qué es un CRM y qué es un ERP, en una línea y sin jerga. */
export const QUE_ES = {
  crm: 'el lugar donde ves a todos tus clientes y en qué va cada uno.',
  erp: 'el sistema donde se juntan ventas, pedidos, cobranza y caja.',
  aqui: 'En este curso los dos viven en una planilla de Google Sheets que armas tú, con las fórmulas listas. Si algún día necesitas un software, tu planilla ya está ordenada para pasarse.',
} as const;

/**
 * 12-nov-2026 (Álvaro, WA 18:03): el título del curso lleva «con IA»; la IA arma el sistema con los prompts de cada módulo.
 * 12-nov-2026 noche: los prompts (27; 34 con el módulo 7) quedan DENTRO de las lecciones (lib/productos/curso/prompts.ts), con botón copiar.
 */
export const IA_OPCIONAL =
  'La IA te ayuda a armarlo: cada módulo trae prompts listos para copiar en ChatGPT o Claude, dentro de cada lección (tu hoja, las fórmulas, tus mensajes; los del agente del módulo 7, probados en Claude). No necesitas programar ni saber de IA, y lo que te devuelva lo revisas tú antes de usarlo.';

export const CASO = {
  nombre: 'Grano Norte',
  texto:
    'Grano Norte es una tostaduría de café en Valparaíso con 6 personas. Vende café en grano y molido a cafeterías y oficinas (70 % de la venta) y a personas por Instagram y WhatsApp (30 %). Su dueña, Camila, tiene a sus clientes repartidos entre el WhatsApp, un cuaderno y un Excel que nadie actualiza. Persigue pagos a fin de mes y no sabe cuánta caja va a tener.',
  datos: [
    { etiqueta: 'Equipo', valor: '6 personas' },
    { etiqueta: 'Clientes', valor: '35 empresas activas' },
    { etiqueta: 'Mensajes', valor: '~40 al día, 6 de 10 repetidos' },
    { etiqueta: 'Hoy', valor: 'WhatsApp, cuaderno y un Excel' },
  ],
  nota: 'Es ficticio, pero está armado con los problemas que más se repiten en pymes.',
} as const;

export type AreaId = 'marketing' | 'ventas' | 'operacion' | 'atencion' | 'finanzas';

export type Area = {
  id: AreaId;
  nombre: string;
  /** Hoja (o hojas) de la planilla del sistema que se arma en ese módulo. */
  hoja: string;
  corto: string;
  modulo: number;
  seOrdena: string;
  siNo: string;
  enGranoNorte: string;
  /** Cómo se conecta con el resto del sistema. */
  pasaA: string;
};

// Las 5 piezas del sistema, en el orden del curso. El tablero (módulo 6) las junta.
// Los id se mantienen (marketing, ventas…) para no perder diagnósticos guardados en el navegador.
export const AREAS: Area[] = [
  {
    id: 'ventas',
    nombre: 'Clientes y ventas',
    hoja: 'Clientes',
    corto: 'Tu CRM: ningún cliente se te pierde',
    modulo: 1,
    seOrdena: 'Una fila por cliente o posible cliente, con su estado, su próximo paso y la fecha. Los mensajes de seguimiento, la propuesta de una página y tu embudo contado solo.',
    siNo: 'Tus clientes viven en el WhatsApp y en tu memoria. Las cotizaciones quedan «esperando respuesta» y se enfrían mientras apagas incendios.',
    enGranoNorte: 'Camila tiene 35 empresas como clientes, repartidas entre el WhatsApp y un cuaderno. Nadie más sabe a quién le toca un seguimiento.',
    pasaA: 'Cada venta cerrada pasa a Pedidos, y cada cliente anota de dónde llegó.',
  },
  {
    id: 'marketing',
    nombre: 'Marketing y origen',
    hoja: 'Origen',
    corto: 'Saber qué canal te trae clientes',
    modulo: 2,
    seOrdena: 'Tu mensaje en una frase, tus 3 temas, un calendario de contenido y la hoja Origen, que cuenta cuántos clientes te trae cada canal.',
    siNo: 'Publicas cuando te acuerdas y no sabes si tus clientes llegan por un referido, por Instagram o por Google. Los meses flojos te pillan sin conversaciones nuevas.',
    enGranoNorte: 'Camila publica cuando tiene un rato libre. Nadie sabe de dónde llegaron las últimas 3 cafeterías.',
    pasaA: 'Lee la columna Origen de tu hoja Clientes y te dice dónde poner tu tiempo.',
  },
  {
    id: 'operacion',
    nombre: 'Pedidos y operación',
    hoja: 'Pedidos',
    corto: 'Cada pedido, en una fila',
    modulo: 3,
    seOrdena: 'Tus procesos que se repiten escritos en pasos, el checklist de entrega y la hoja Pedidos: qué se pidió, para cuándo, quién lo entrega y en qué va.',
    siNo: 'Cada pedido depende de que te acuerdes tú. Si faltas un día, algo se atrasa o sale mal.',
    enGranoNorte: 'Los pedidos de oficinas llegan por WhatsApp y el despacho se coordina de memoria.',
    pasaA: 'Cada pedido entregado pasa a Cobranza, y sus dudas o reclamos, a Atención.',
  },
  {
    id: 'atencion',
    nombre: 'Atención y postventa',
    hoja: 'Atención',
    corto: 'Responder a tiempo y que vuelvan a comprar',
    modulo: 4,
    seOrdena: 'Respuestas escritas para lo repetido, cuándo pasa a una persona, la hoja Atención con cada caso hasta cerrarlo y el mensaje después de la entrega.',
    siNo: 'Respondes lo mismo 30 veces al día y los reclamos se pierden entre los mensajes. Nadie le vuelve a escribir al cliente después de la entrega.',
    enGranoNorte: 'Llegan unos 40 mensajes al día, 6 de cada 10 repetidos, y todos los responde Camila.',
    pasaA: 'Un cliente bien atendido vuelve a comprar: vuelve a tu hoja Clientes.',
  },
  {
    id: 'finanzas',
    nombre: 'Cobranza y caja',
    hoja: 'Cobranza y Caja',
    corto: 'Cobrar a tiempo y saber cuánta plata tienes',
    modulo: 5,
    seOrdena: 'La hoja Cobranza con vencimientos y recordatorios, la hoja Caja con lo que entra y sale, tu caja de las próximas 4 semanas y el margen de tus productos.',
    siNo: 'Persigues pagos a fin de mes, no sabes cuánta caja vas a tener y no sabes qué producto te hace perder.',
    enGranoNorte: 'Camila persigue pagos a fin de mes y no sabe cuál de sus cafés le deja más margen.',
    pasaA: 'Lo que cobras entra a Caja, y la caja te dice cuánto puedes invertir para vender más.',
  },
];

/** Las hojas de la planilla del sistema, en el orden en que aparecen en el archivo. */
export const HOJAS: { nombre: string; modulo: number; guarda: string; quien: string }[] = [
  { nombre: 'Inicio', modulo: 0, guarda: 'La ficha de tu negocio, qué hace cada hoja y tus rutinas.', quien: 'Tú, una vez.' },
  { nombre: 'Clientes', modulo: 1, guarda: 'Tu CRM: cada cliente y posible cliente, en qué va y cuál es el próximo paso.', quien: 'Quien vende · todos los días.' },
  { nombre: 'Origen', modulo: 2, guarda: 'Cuántos contactos y clientes te trae cada canal. Se calcula solo desde Clientes.', quien: 'Nadie: se llena sola.' },
  { nombre: 'Productos', modulo: 0, guarda: 'Tu lista de precios y, desde el módulo 5, el costo y el margen de cada producto.', quien: 'Tú · cuando cambia un precio.' },
  { nombre: 'Pedidos', modulo: 3, guarda: 'Cada pedido en una fila: cliente, producto, total, fecha de entrega, responsable y estado.', quien: 'Quien recibe el pedido · al llegar.' },
  { nombre: 'Atención', modulo: 4, guarda: 'Reclamos, cambios y pedidos especiales, cada uno abierto hasta cerrarlo.', quien: 'Quien atiende · al llegar el caso.' },
  { nombre: 'Cobranza', modulo: 5, guarda: 'Cada factura o boleta con su vencimiento y los días de atraso, calculados solos.', quien: 'Quien cobra · al facturar y al pagar.' },
  { nombre: 'Caja', modulo: 5, guarda: 'Lo que entra y lo que sale, con el saldo al día.', quien: 'Quien lleva la plata · cada semana.' },
  { nombre: 'Tablero', modulo: 6, guarda: 'Tus números del lunes, calculados solos desde las otras hojas.', quien: 'Nadie lo llena: se mira los lunes.' },
];

export type Leccion = { titulo: string; detalle: string };

export type Modulo = {
  numero: number;
  area: string;
  titulo: string;
  duracion: string;
  lecciones: Leccion[];
  pruebaReal: string;
  entregable: string;
};

export const MODULOS: Modulo[] = [
  {
    numero: 0,
    area: 'El mapa',
    titulo: 'El sistema de tu negocio en una planilla',
    duracion: '4 lecciones · ~11 min de video y lectura',
    lecciones: [
      { titulo: 'Por qué todo pasa por ti', detalle: 'Nada está anotado en un solo lugar. Qué es un CRM, qué es un ERP y las hojas de tu sistema.' },
      { titulo: 'Diagnóstico de 15 preguntas', detalle: 'Interactivo: devuelve un semáforo por pieza del sistema y el orden sugerido para hacer el curso.' },
      { titulo: 'Tu planilla base y la ficha del negocio', detalle: 'Descargas la planilla del sistema, la abres en Google Sheets y anotas qué vendes, a quién y a qué precio.' },
      { titulo: 'Las reglas de freno del negocio', detalle: 'Qué decide siempre una persona: precios, plazos, plata, reclamos. Plantilla con 15 reglas para elegir.' },
    ],
    pruebaReal: 'Responder el diagnóstico, abrir tu planilla en Google Sheets con tus productos y elegir tus reglas de freno.',
    entregable: 'Mapa con semáforo + planilla base con la ficha del negocio + reglas de freno. Es la portada de tu sistema.',
  },
  {
    numero: 1,
    area: 'Clientes y ventas',
    titulo: 'Tu primer CRM: ningún cliente se te pierde',
    duracion: '5 lecciones · ~15 min de video y lectura',
    lecciones: [
      { titulo: 'De la Guía 1 a tu hoja Clientes', detalle: 'Una fila por cliente o posible cliente, con su estado, su próximo paso y la fecha. Si hiciste la Guía 1, traes tu lista; si no, partes con tus clientes de hoy.' },
      { titulo: 'Primer mensaje y seguimientos', detalle: 'Plantillas listas para adaptar. Por WhatsApp, solo a quien ya te conoce o te dio su número.' },
      { titulo: 'De la conversación a la propuesta', detalle: 'Las 5 preguntas de la primera reunión y una propuesta de una página. Cada propuesta queda en tu CRM con su monto.' },
      { titulo: 'Seguimiento de propuestas', detalle: 'Nadie queda «esperando respuesta» sin fecha: cada propuesta tiene su próximo paso y la planilla te muestra cuáles tocan hoy.' },
      { titulo: 'Tu embudo en la planilla', detalle: 'Cuántos hay en cada estado, cuántos pasan al siguiente y tu meta semanal, contados solos desde la hoja Clientes.' },
    ],
    pruebaReal: '20 minutos al día durante 5 días con tu hoja Clientes + 1 propuesta enviada y anotada con su fecha de seguimiento.',
    entregable: 'Hoja Clientes con tus clientes reales, cada uno con estado, próximo paso y fecha.',
  },
  {
    numero: 2,
    area: 'Marketing y origen',
    titulo: 'De dónde llegan tus clientes',
    duracion: '5 lecciones · ~14 min de video y lectura',
    lecciones: [
      { titulo: 'Tu mensaje en una frase', detalle: 'Problema que resuelves + para quién + resultado. Ejercicio con 3 versiones y elegir.' },
      { titulo: 'Tus 3 temas', detalle: 'Lo que tu cliente quiere aprender, lo que te diferencia y la prueba (casos, clientes). Ejemplo Grano Norte: «cómo elegir café para tu cafetería», «tostado fresco vs. de supermercado», «clientes que cambiaron».' },
      { titulo: 'Una semana de contenido en una tarde', detalle: 'De una idea a 5 piezas (post, historia, carrusel, reel con guion, correo) y un calendario. Con el prompt de la lección, ChatGPT o Claude te arman el borrador.' },
      { titulo: 'Responder comentarios y mensajes con tu tono', detalle: 'Plantillas y la regla de pasar a tu hoja Clientes a quien quiere comprar.' },
      { titulo: 'De dónde llegó cada cliente', detalle: 'La columna Origen de tu CRM y la hoja Origen: qué canal te trae clientes de verdad, no «me gusta».' },
    ],
    pruebaReal: 'Publicar 5 piezas en la semana y anotar de dónde llegó cada contacto nuevo.',
    entregable: 'Frase + 3 temas + calendario de 4 semanas + hoja Origen con tus canales.',
  },
  {
    numero: 3,
    area: 'Pedidos y operación',
    titulo: 'Cada pedido, en una fila',
    duracion: '5 lecciones · ~14 min de video y lectura',
    lecciones: [
      { titulo: 'Lo que se repite se escribe', detalle: 'Elegir 3 procesos (ej.: nuevo cliente, pedido, despacho) y escribirlos en 7 pasos o menos.' },
      { titulo: 'Del WhatsApp a la hoja Pedidos', detalle: 'Cada pedido que llega por WhatsApp, correo o teléfono se anota en una fila: cliente, qué pidió, para cuándo y quién lo entrega.' },
      { titulo: 'Checklist de entrega por tipo de trabajo', detalle: 'La plantilla de «nuevo cliente oficina» de Grano Norte.' },
      { titulo: 'El estado de cada pedido en una vista', detalle: 'Por hacer, en curso, entregado: filtras la hoja Pedidos y ves qué está atrasado sin preguntarle a nadie.' },
      { titulo: 'El resumen del día', detalle: 'Qué llegó, qué falta y qué vence: lo lees en la planilla en 5 minutos cada mañana.' },
    ],
    pruebaReal: 'Anotar una semana completa de pedidos en la hoja Pedidos y revisar el resumen cada mañana.',
    entregable: '3 procesos escritos + hoja Pedidos con una semana real.',
  },
  {
    numero: 4,
    area: 'Atención y postventa',
    titulo: 'Responder a tiempo y que vuelvan a comprar',
    duracion: '5 lecciones · ~15 min de video y lectura',
    lecciones: [
      { titulo: 'Los 3 tipos de mensaje', detalle: 'Repetidos, con decisión y nuevos. Cuenta los tuyos durante 2 días.' },
      { titulo: 'Respuestas listas para lo repetido', detalle: 'Escribes una vez las respuestas de siempre y las dejas como respuestas rápidas de WhatsApp Business. Con el prompt de la lección, la IA te arma el primer borrador.' },
      { titulo: 'La hoja Atención: cada caso hasta cerrarlo', detalle: 'Reclamos, cambios y pedidos especiales en una fila, con responsable y fecha. Ninguno se pierde entre los mensajes.' },
      { titulo: 'Cuándo pasa a una persona', detalle: 'Qué casos van siempre a ti o a tu equipo, cómo se avisa y el tiempo máximo de respuesta.' },
      { titulo: 'Postventa: que vuelvan a comprar', detalle: 'El mensaje después de la entrega, cuándo pedir un referido y a quién le toca volver a comprar, desde tu hoja Clientes.' },
    ],
    pruebaReal: 'Usar tus respuestas listas una semana y anotar cada caso en la hoja Atención hasta cerrarlo.',
    entregable: 'Respuestas listas + reglas de derivación + hoja Atención + mensaje de postventa.',
  },
  {
    numero: 5,
    area: 'Cobranza y caja',
    titulo: 'Cobrar a tiempo y saber cuánta plata tienes',
    duracion: '4 lecciones · ~11 min de video y lectura',
    lecciones: [
      { titulo: 'Cobranza sin perseguir a nadie', detalle: 'La hoja Cobranza: cada factura con su vencimiento, los días de atraso calculados solos y 3 recordatorios con tu tono.' },
      { titulo: 'Lo que entra y lo que sale: la hoja Caja', detalle: 'Entradas y salidas con categorías mínimas y el saldo al día, sin digitar todo a mano.' },
      { titulo: 'Tu caja de las próximas 4 semanas', detalle: 'Lo que vas a cobrar y lo que tienes que pagar el próximo mes, para ver el hoyo antes de caer en él.' },
      { titulo: 'Precio y margen', detalle: 'La hoja Productos: el margen de tus 3 productos principales y el que te hace perder.' },
    ],
    pruebaReal: 'Un ciclo de cobranza con los recordatorios y un mes de entradas y salidas en la hoja Caja.',
    entregable: 'Hojas Cobranza, Caja y Productos con datos reales.',
  },
  {
    numero: 6,
    area: 'El tablero',
    titulo: 'El tablero que lo junta todo',
    duracion: '5 lecciones · ~17 min de video y lectura + cierre: antes y después',
    lecciones: [
      { titulo: 'Tus números del lunes', detalle: 'Ventas del mes, propuestas abiertas, pedidos atrasados, casos abiertos, por cobrar y caja: el tablero los calcula solo desde tus hojas.' },
      { titulo: 'Cómo se conectan las hojas', detalle: 'Qué lee cada número del tablero y qué pasa si una hoja queda sin actualizar. Cada dato se anota en un solo lugar.' },
      { titulo: 'Compartirlo con tu equipo', detalle: 'Google Sheets con permisos: quién edita qué hoja, quién solo mira y qué decide siempre una persona.' },
      { titulo: 'Las rutinas de tu sistema', detalle: '20 minutos al día, 10 los lunes y 15 los viernes: a qué hora, dónde y quién actualiza cada hoja.' },
      { titulo: 'Cuándo una planilla ya no basta', detalle: 'Las señales para pasar a un software de CRM o ERP, y por qué tu planilla te deja listo para hacerlo.' },
    ],
    pruebaReal: 'Una semana con tus rutinas y el tablero revisado el lunes con tu equipo.',
    entregable: 'Tu ERP en Google Sheets con su tablero, compartido con tu equipo, y tus rutinas escritas.',
  },
  {
    // 13-nov-2026 · lote 3. Fuente: ~/.claude/marca-alvaro/curso/modulo-7/modulo-7.md (probado en Claude, ver prueba.md).
    numero: 7,
    area: 'Tu primer agente',
    titulo: 'Tu primer agente, trabajando con tu planilla',
    duracion: '5 lecciones · ~9 min de video y lectura',
    lecciones: [
      { titulo: 'Crea tu asistente con sus instrucciones', detalle: 'Un proyecto de Claude con sus instrucciones: qué hace, qué nunca hace y cuándo te pasa la pelota. Tus reglas de freno del módulo 0 van adentro.' },
      { titulo: 'Dale tu planilla: la memoria de tu agente', detalle: 'Subes tu planilla al proyecto (con la configuración regional Chile) y le haces una pregunta de prueba para ver que usa tus productos y tus clientes.' },
      { titulo: 'Tarea uno: del WhatsApp a la fila de Pedidos', detalle: 'Pegas el mensaje del cliente y te devuelve la fila para tu hoja Pedidos y la respuesta sugerida. Tú revisas, pegas y envías.' },
      { titulo: 'Tarea dos: el lunes de cobranza', detalle: 'Pegas tu hoja Cobranza y te dice a quién escribir, a quién llamas tú y el mensaje listo, sin intereses ni amenazas.' },
      { titulo: 'Gestiona y mejora tu agente', detalle: '5 preguntas trampa, una regla por cada error y 2 números para medir si te ahorra tiempo.' },
    ],
    pruebaReal: 'Una semana: pasa todos tus pedidos de WhatsApp por la Tarea 1 y haz un lunes de cobranza con la Tarea 2. Anota tus minutos.',
    entregable: 'Tu proyecto con las instrucciones y la planilla subida, tus 5 trampas aprobadas y tu línea base (minutos de cobranza y pedidos corregidos), anotados en tu hoja Inicio.',
  },
];

export const PROYECTO_FINAL = {
  titulo: 'Tu ERP en Google Sheets con su tablero',
  texto:
    'Una sola planilla con tus clientes, pedidos, atención, cobranza y caja conectados, y un tablero que tu equipo puede leer sin preguntarte.',
  incluye: [
    'Las hojas del sistema con tus datos reales: Clientes, Origen, Productos, Pedidos, Atención, Cobranza y Caja',
    'El tablero con tus números del lunes, calculados solos',
    'Quién actualiza cada hoja y tus reglas de freno',
    'Tus rutinas de la semana y el semáforo antes y después',
  ],
  cierre: [
    'Video final (52 s): «Tu negocio, antes y después», con el semáforo comparado.',
    'Siguiente paso opcional: una sesión de 90 min para armar contigo lo que quedó pendiente.',
    'Y en el módulo 7, tu primer agente: un proyecto de Claude con tus reglas y tu planilla como memoria, probado con 5 trampas y un lunes de cobranza.',
  ],
} as const;

/** Qué recibe quien compra (12-nov-2026: los módulos están grabados y abiertos; el 7, desde el 13-nov; el acceso es con código, ver /curso/acceso). */
export const ACCESO = {
  pasos: [
    { cuando: 'Listo', modulo: 0, texto: 'Módulo 0 · El mapa y tu planilla base' },
    { cuando: 'Listo', modulo: 1, texto: 'Módulo 1 · Clientes y ventas (tu CRM)' },
    { cuando: 'Listo', modulo: 2, texto: 'Módulo 2 · Marketing y origen' },
    { cuando: 'Listo', modulo: 3, texto: 'Módulo 3 · Pedidos y operación' },
    { cuando: 'Listo', modulo: 4, texto: 'Módulo 4 · Atención y postventa' },
    { cuando: 'Listo', modulo: 5, texto: 'Módulo 5 · Cobranza y caja' },
    { cuando: 'Listo', modulo: 6, texto: 'Módulo 6 · El tablero + cierre: antes y después' },
    { cuando: 'Listo', modulo: 7, texto: 'Módulo 7 · Tu primer agente, trabajando con tu planilla' },
  ],
  nota: 'Al comprar, tu código de acceso está en tu área de miembros de Hotmart. Lo pegas una vez en este navegador y entras a los 8 módulos.',
} as const;

export const PARA_QUIEN = {
  si: [
    'Tienes una pyme que ya vende, con un equipo de 3 a 15 personas (o estás partiendo con una o dos).',
    'Vendes por WhatsApp, por correo y por recomendación, y tus clientes viven repartidos en tu celular.',
    'Tienes un Excel a medias, o varios, y ninguno dice la verdad.',
    'Persigues pagos a fin de mes y no sabes bien cuánta caja vas a tener.',
    'Quieres que tu equipo sepa en qué va cada cliente y cada pedido sin preguntarte.',
  ],
  no: [
    'Buscas aprender a programar o a implementar un software de CRM o ERP.',
    'Todavía no tienes clientes ni algo que vender.',
    'Quieres que alguien lo arme todo por ti (para eso existe la sesión hecha contigo).',
  ],
} as const;

export const FAQ: { p: string; r: string }[] = [
  {
    p: '¿Qué es un CRM y qué es un ERP?',
    r: `Un CRM es ${QUE_ES.crm} Un ERP es ${QUE_ES.erp} En este curso los dos viven en una planilla de Google Sheets que armas tú, hoja por hoja.`,
  },
  {
    p: 'No sé de tecnología. ¿Lo puedo hacer?',
    r: 'Sí. Si sabes escribir en una planilla y usar WhatsApp, puedes hacer el curso. Las fórmulas ya vienen hechas: tú llenas filas. Cada lección muestra el paso a paso en pantalla con el caso Grano Norte, y la planilla trae un ejemplo lleno para que veas cómo queda.',
  },
  {
    p: 'Ya tengo un Excel, pero está desordenado. ¿Me sirve?',
    r: 'Sí, es el punto de partida más común. No empiezas de cero: en cada módulo pasas a la hoja nueva solo lo que sirve (tus clientes, los pedidos abiertos, las facturas pendientes) y el resto queda archivado.',
  },
  {
    p: '¿Necesito pagar un CRM o un software?',
    r: 'No. Todo se arma en Google Sheets, que es gratis con una cuenta de Google, o en Excel si ya lo tienes. Si algún día tu negocio necesita un software pagado, el módulo 6 te ayuda a ver cuándo, y tu planilla queda ordenada para pasarse. Para el agente del módulo 7 necesitas una cuenta de Claude: lo probamos con una cuenta pagada; según Claude, la cuenta gratis también tiene proyectos, pero ahí todavía no lo probamos (más abajo, en «¿Qué es el agente…?»).',
  },
  {
    p: '¿Cuánto tiempo me toma?',
    r: 'Menos de 2 horas de contenido (cerca de 1 h 45 de videos de un minuto y textos breves) y unas 7 a 8 horas de práctica llenando la planilla con tu negocio y armando tu agente, a tu ritmo: en una semana o en un mes, como te acomode. Después, el sistema se mantiene con 20 minutos al día y una revisión de 10 minutos los lunes.',
  },
  {
    p: '¿Tengo que saber de inteligencia artificial o de programación?',
    r: 'No. Las lecciones donde armas algo traen su prompt listo para copiar: te ayuda a armar tu hoja, las fórmulas y tus mensajes, y revisas lo que te devuelva antes de usarlo. Los de los módulos 0 a 6 los usas en ChatGPT o Claude (la versión gratis sirve) y cambias lo que está entre [corchetes] por los datos de tu negocio. Los 7 del módulo 7, los de tu agente, se rellenan solos con los datos que anotas una vez, y los probamos solo en un proyecto de Claude con cuenta pagada: en ChatGPT y en cuentas gratis, todavía no.',
  },
  {
    p: '¿Qué recibo al comprar?',
    r: 'Los 8 módulos completos desde el primer día: 38 lecciones cortas con su video y su ejercicio, 34 prompts listos para la IA, la planilla del sistema (Excel o Google Sheets) con las fórmulas listas y el ejemplo de Grano Norte, y el módulo 7 para armar tu primer agente. Tu código de acceso está en tu área de miembros de Hotmart.',
  },
  {
    p: '¿Qué es el agente del módulo 7 y con qué IA funciona?',
    r: `${PROMESA_AGENTE.definicion} Hace dos tareas: pasa un pedido de WhatsApp a una fila de tu hoja Pedidos y te arma la cobranza del lunes, con los mensajes listos. No se conecta a tu WhatsApp ni escribe solo en tu planilla: tú copias, revisas y envías. Requisitos: lo probamos en un proyecto de Claude con cuenta pagada y con la planilla en Google Sheets; en ChatGPT, en cuentas gratis y con Excel todavía no lo probamos. Tu planilla tiene que estar con la configuración regional Chile (en Google Sheets: Archivo › Configuración), para que las fechas entren bien. Se hace en el computador.`,
  },
  {
    p: '¿Qué pasa si me atraso?',
    r: 'Nada. Los módulos no se cierran: avanzas a tu ritmo y retomas donde quedaste. Tu avance se guarda en el navegador donde trabajas.',
  },
  {
    p: '¿Sirve para mi rubro?',
    r: 'El caso es una tostaduría que le vende a empresas, pero las hojas son las mismas para una distribuidora, un servicio de mantención, una agencia o una consultora: clientes, pedidos o trabajos, atención, cobranza y caja. En cada lección la ajustas a tu negocio.',
  },
  {
    p: '¿Y si no me sirve?',
    r: `Tienes ${PRECIO_CURSO.garantiaDias} días de garantía: si sientes que no es para ti, pides la devolución desde Hotmart.`,
  },
];

// ─── Módulo 0 ──────────────────────────────────────────────────────────────

export type Respuesta = 0 | 1 | 2;

export const OPCIONES_DIAGNOSTICO: { valor: Respuesta; texto: string }[] = [
  { valor: 2, texto: 'Sí' },
  { valor: 1, texto: 'A medias' },
  { valor: 0, texto: 'No' },
];

// En el orden de AREAS (clientes y ventas primero). Los id no cambian para no perder respuestas guardadas.
export const PREGUNTAS: { id: string; area: AreaId; texto: string }[] = [
  { id: 'v1', area: 'ventas', texto: '¿Tienes en un solo lugar a todos tus clientes y posibles clientes, con en qué va cada uno?' },
  { id: 'v2', area: 'ventas', texto: '¿Cada propuesta o cotización que envías tiene una fecha de seguimiento anotada?' },
  { id: 'v3', area: 'ventas', texto: '¿Sabes cuántas conversaciones necesitas, en promedio, para cerrar una venta?' },
  { id: 'm1', area: 'marketing', texto: '¿Puedes decir en una frase qué problema resuelves, para quién y qué resultado logra?' },
  { id: 'm2', area: 'marketing', texto: '¿Publicas o les envías algo a tus clientes al menos una vez por semana, aunque estés con harta pega?' },
  { id: 'm3', area: 'marketing', texto: '¿Sabes de dónde llegaron tus últimos 10 clientes (referido, Instagram, Google, una visita)?' },
  { id: 'o1', area: 'operacion', texto: '¿Los procesos que más se repiten (pedido, despacho, nuevo cliente) están escritos en pasos?' },
  { id: 'o2', area: 'operacion', texto: '¿Cada pedido queda anotado en un solo lugar, con su fecha de entrega y quién lo entrega?' },
  { id: 'o3', area: 'operacion', texto: '¿Puedes ver en un minuto qué pedidos están atrasados, sin preguntarle a nadie?' },
  { id: 'a1', area: 'atencion', texto: '¿Las preguntas que más se repiten (precio, despacho, horario) tienen una respuesta escrita?' },
  { id: 'a2', area: 'atencion', texto: '¿Cada reclamo o pedido especial queda anotado hasta que se cierra?' },
  { id: 'a3', area: 'atencion', texto: '¿Les escribes a tus clientes después de la entrega para saber cómo les fue o para que vuelvan a comprar?' },
  { id: 'f1', area: 'finanzas', texto: '¿Cobras con recordatorios en fechas fijas, sin tener que perseguir a nadie?' },
  { id: 'f2', area: 'finanzas', texto: '¿Sabes cuánta plata tienes por cobrar hoy, y cuánto está vencido, sin ponerte a revisar?' },
  { id: 'f3', area: 'finanzas', texto: '¿Sabes cuánta caja vas a tener en 4 semanas más?' },
];

export type Semaforo = 'rojo' | 'amarillo' | 'verde';

/** Puntaje por área: 0–6 (3 preguntas × 0–2). */
export function semaforoDe(puntaje: number): Semaforo {
  if (puntaje >= 5) return 'verde';
  if (puntaje >= 3) return 'amarillo';
  return 'rojo';
}

export const TEXTO_SEMAFORO: Record<Semaforo, { etiqueta: string; texto: string }> = {
  rojo: { etiqueta: 'Rojo', texto: 'Esta pieza depende de ti o de tu memoria. Empieza por aquí.' },
  amarillo: { etiqueta: 'Naranja', texto: 'Hay partes anotadas, pero se caen cuando hay harta pega.' },
  verde: { etiqueta: 'Verde', texto: 'Está ordenada. Revisa el módulo para afinar y medir.' },
};

export function calcularResultado(respuestas: Record<string, Respuesta>) {
  const porArea = AREAS.map((area, indice) => {
    const preguntas = PREGUNTAS.filter((p) => p.area === area.id);
    const puntaje = preguntas.reduce((s, p) => s + (respuestas[p.id] ?? 0), 0);
    return { area, indice, puntaje, semaforo: semaforoDe(puntaje) };
  });
  // Orden sugerido: primero lo más rojo; a igual puntaje, el orden natural del curso.
  const orden = [...porArea].sort((a, b) => a.puntaje - b.puntaje || a.indice - b.indice);
  return { porArea, orden };
}

export type ReglaFreno = { id: string; categoria: string; texto: string };

export const REGLAS_FRENO: ReglaFreno[] = [
  { id: 'r1', categoria: 'Precios', texto: 'Ningún descuento ni precio especial sale sin que yo lo apruebe.' },
  { id: 'r2', categoria: 'Precios', texto: 'Se cotiza solo con la lista de precios vigente. Si algo no está en la lista, lo cotiza una persona.' },
  { id: 'r3', categoria: 'Precios', texto: 'Ninguna promoción se anuncia antes de estar aprobada y con fecha de término.' },
  { id: 'r4', categoria: 'Plazos', texto: 'Ninguna fecha de entrega se compromete sin confirmar stock o capacidad con [responsable].' },
  { id: 'r5', categoria: 'Plazos', texto: 'Un cambio de fecha a un cliente lo avisa siempre una persona, nunca un mensaje automático.' },
  { id: 'r6', categoria: 'Plata', texto: 'Ningún pago sobre $[monto] sale sin la aprobación de [nombre].' },
  { id: 'r7', categoria: 'Plata', texto: 'Devoluciones y reembolsos los autoriza siempre una persona.' },
  { id: 'r8', categoria: 'Plata', texto: 'Los datos bancarios de un proveedor no se cambian por correo o WhatsApp sin llamar antes para confirmar.' },
  { id: 'r9', categoria: 'Reclamos', texto: 'Todo reclamo pasa a una persona dentro de [2] horas hábiles.' },
  { id: 'r10', categoria: 'Reclamos', texto: 'Las compensaciones por un error (reposición, regalo, descuento) las decide una persona.' },
  { id: 'r11', categoria: 'Clientes', texto: 'Ningún cliente nuevo recibe crédito o pago a plazo sin revisión de [nombre].' },
  { id: 'r12', categoria: 'Clientes', texto: 'Contratos y condiciones especiales los firma solo [nombre].' },
  { id: 'r13', categoria: 'Equipo', texto: 'Contrataciones, despidos y cambios de sueldo los decido yo.' },
  { id: 'r14', categoria: 'Datos', texto: 'Nunca se comparten datos de un cliente con otro cliente ni con terceros.' },
  { id: 'r15', categoria: 'Comunicación', texto: 'Lo que se publica a nombre del negocio lo revisa una persona antes de salir.' },
];

export type LeccionM0 = {
  id: string;
  numero: number;
  titulo: string;
  bajada: string;
  checklist: { id: string; texto: string }[];
};

export const LECCIONES_M0: LeccionM0[] = [
  {
    id: 'mapa',
    numero: 1,
    titulo: 'Por qué todo pasa por ti',
    bajada: 'Todo pasa por ti porque nada está anotado en un solo lugar. Este es el mapa de tu sistema: qué es un CRM, qué es un ERP y las hojas que vas a armar.',
    checklist: [
      { id: 'l1a', texto: 'Recorrí las 5 piezas del mapa y el tablero.' },
      { id: 'l1b', texto: 'Anoté qué pieza me quita más tiempo hoy.' },
      { id: 'l1c', texto: 'Anoté 3 decisiones que hoy pasan solo por mí.' },
    ],
  },
  {
    id: 'diagnostico',
    numero: 2,
    titulo: 'Diagnóstico de 15 preguntas',
    bajada: '3 preguntas por pieza del sistema. Responde pensando en cómo funciona tu negocio hoy, no en cómo te gustaría que funcionara.',
    checklist: [
      { id: 'l2a', texto: 'Respondí las 15 preguntas.' },
      { id: 'l2b', texto: 'Revisé mi semáforo por pieza.' },
      { id: 'l2c', texto: 'Anoté por qué módulo voy a empezar.' },
    ],
  },
  {
    id: 'planilla',
    numero: 3,
    titulo: 'Tu planilla base y la ficha del negocio',
    bajada: 'La base de todo lo que sigue: una sola planilla, con la ficha de tu negocio y tu lista de precios. Toma 15 minutos.',
    checklist: [
      { id: 'l3a', texto: 'Descargué mi planilla y la abrí en Google Sheets o Excel.' },
      { id: 'l3b', texto: 'Anoté la ficha del negocio y mis productos con su precio.' },
      { id: 'l3c', texto: 'La guardé en una carpeta que mi equipo puede ver.' },
    ],
  },
  {
    id: 'reglas',
    numero: 4,
    titulo: 'Las reglas de freno del negocio',
    bajada: 'Qué decide siempre una persona: precios, plazos, plata, reclamos. Elige las tuyas de esta plantilla y ajústalas.',
    checklist: [
      { id: 'l4a', texto: 'Elegí al menos 5 reglas.' },
      { id: 'l4b', texto: 'Cambié los [corchetes] por montos, plazos y nombres reales.' },
      { id: 'l4c', texto: 'Descargué mis reglas y se las mostré a mi equipo.' },
    ],
  },
];

export const CLAVES_STORAGE = {
  diagnostico: 'villelab_curso_m0_diagnostico',
  reglas: 'villelab_curso_m0_reglas',
  ficha: 'villelab_curso_m0_ficha',
  checklist: 'villelab_curso_m0_checklist',
  negocio: 'villelab_curso_m0_negocio',
} as const;
