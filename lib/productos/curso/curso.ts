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
import { PRECIO_GUIA } from '../guia/venta';
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
  // 15-nov-2026 (temario-agente, fase 3): el agente va justo después del módulo gratis. Dependencias leídas en Modulo7Content:
  // la lección 1 usa la ficha y las reglas de freno del módulo 0; la 2 acepta hojas vacías (el prompt 7.2 pregunta cuáles
  // llegaron vacías); la Tarea 1 solo necesita Productos (la hoja Pedidos ya viene armada); la Tarea 2 necesita facturas en
  // Cobranza: si todavía no hay, se practica con el ejemplo de Grano Norte y se repite al llegar a la cobranza.
  orden:
    'Lo armas justo después del módulo gratis: con tu ficha, tus productos y tus reglas de freno ya puede hacer su primera tarea. Cada hoja que llenas después es algo más que sabe de tu negocio.',
} as const;

/**
 * Sección del sistema en /curso (13-nov-2026, pedido de Álvaro: «Estructura y delega a tu agente la gestión de clientes y
 * operación»). Dos pasos visibles. «Gestión de clientes y operación» se describe SOLO con lo que el agente hizo en la prueba
 * (~/.claude/marca-alvaro/curso/modulo-7/prueba.md: 6 de 6 y 5 de 5 correctas en un proyecto de Claude): arma la fila del
 * pedido desde un WhatsApp, arma la cobranza del lunes y avisa de pedidos abiertos o facturas vencidas del mismo cliente.
 * Nada de «atiende solo», «se conecta a tu WhatsApp» ni «actualiza tu planilla solo» (promesa.md, «Lo que NO se puede decir»).
 */
export const SISTEMA_AGENTE = {
  // 15-nov-2026 (temario-agente, plan B): el agente va justo después del módulo 0 gratis; los pasos siguen ese orden.
  titulo: 'Arma tu agente y enséñale tu negocio.',
  bajada: 'Dos pasos. Primero armas tu agente con tu ficha, tus reglas de freno y tu planilla como memoria; después le enseñas cada área de tu negocio, una hoja a la vez. Te prepara el trabajo que más se repite y tú revisas y envías.',
  pasos: [
    {
      n: '1',
      nombre: 'Arma tu agente',
      modulos: 'Módulo 0 gratis + módulo 7',
      texto: 'Diagnóstico y planilla base gratis; después creas tu agente con su ficha, su memoria y tus reglas de freno, y le das su primera tarea.',
    },
    {
      n: '2',
      nombre: 'Enséñale tu negocio',
      modulos: 'Módulos 1 a 6',
      texto: 'Clientes, origen, pedidos, atención, cobranza y caja: cada hoja que llenas es algo más que tu agente sabe. Al cierre, tu tablero te muestra si te ahorra tiempo.',
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

/** Cierre de «El programa» en /curso (13-nov). 15-nov-2026: el agente ya no es el final (va justo después del módulo 0) y
 * «operando tu negocio» prometía más de lo que hace (prepara borradores cuando se lo pides). */
export const PROYECTO_AGENTE = {
  kicker: 'Al cerrar el curso',
  titulo: 'Tu agente, tu planilla completa y tu tablero',
  texto:
    'Juntas lo que armaste: el agente del principio ya conoce cada hoja de tu planilla. Le pegas un WhatsApp y te arma el pedido; el lunes le pegas tu cobranza y te dice a quién cobrar. Tú revisas el tablero, decides y envías.',
  nota: 'Lo probamos en un proyecto de Claude con cuenta pagada y la planilla en Google Sheets; en ChatGPT, en cuentas gratis y con Excel, todavía no (detalle en las preguntas frecuentes).',
} as const;

export const CURSO = {
  nombre: 'Construye con IA tu sistema de gestión CRM y ERP para tu negocio',
  apellido: 'Sin programar, en Google Sheets',
  /** Nombre completo (igual en Hotmart) para metadata y referencias desde otros productos. */
  // 15-nov-2026: así quedó en Hotmart (planes/hotmart-8921667-cambio-1115.md).
  nombreCompleto: 'Tu primer agente de IA para tu negocio, sin programar',
  promesa: `${DURACION_CURSO} Ahí quedan tus clientes y en qué va cada uno, de dónde llegan, los pedidos, la atención, la cobranza y la caja, y cada módulo trae prompts listos para copiar en ChatGPT o Claude (los del agente, probados en Claude).`,
  noEsSoftware:
    'No es un software ni una suscripción: es una planilla bien armada, con las fórmulas listas, y rutinas cortas para que el negocio no dependa de tu memoria.',
  formato: [
    { etiqueta: 'Formato', valor: '8 módulos y 38 lecciones cortas, todos listos' },
    { etiqueta: 'Duración', valor: 'menos de 2 h de contenido + unas 7 a 8 h de práctica' },
    { etiqueta: 'Herramienta', valor: 'Google Sheets (gratis) o Excel; el agente, en un proyecto de Claude' },
    { etiqueta: 'Cada lección', valor: 'idea → ejemplo → tu hoja → prueba real' },
    { etiqueta: 'Al cierre', valor: 'tu agente con tu planilla completa y tu tablero' },
  ],
  comoFunciona: [
    'Lecciones cortas con el caso Grano Norte en pantalla: ves la hoja llena antes de llenar la tuya.',
    'Cada módulo llena una hoja de la misma planilla, ya conectada con las anteriores. No empiezas de cero en cada módulo.',
    'Las lecciones donde armas algo traen su prompt listo para copiar (34 en total): la IA te arma el primer borrador y tú lo revisas. Los de las hojas sirven en ChatGPT o Claude; los 7 de tu agente los probamos solo en un proyecto de Claude con cuenta pagada.',
    'Prueba real al cierre de cada módulo: usas la hoja con tu negocio unos días antes de seguir.',
    'Tu primer agente lo armas al principio, justo después del módulo gratis, y cada módulo le enseña una parte más de tu negocio. Al cierre, el tablero que lo junta todo y el semáforo de cada pieza, antes y después.',
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
  'La IA te ayuda a armarlo: cada módulo trae prompts listos para copiar en ChatGPT o Claude, dentro de cada lección (tu hoja, las fórmulas, tus mensajes; los de tu agente, probados en Claude). No necesitas programar ni saber de IA, y lo que te devuelva lo revisas tú antes de usarlo.';

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
    area: 'Gratis · tu punto de partida',
    titulo: 'Dónde se te va el tiempo y qué le vas a delegar',
    duracion: '4 lecciones · ~11 min de video y lectura',
    lecciones: [
      { titulo: 'Por qué todo pasa por ti', detalle: 'Nada está anotado en un solo lugar, y por eso nadie te puede ayudar, ni tu equipo ni una IA. Las 5 piezas de tu negocio y la hoja donde se anota cada una.' },
      { titulo: 'Diagnóstico: por dónde empezar', detalle: 'Interactivo: 15 preguntas y un semáforo por pieza. Lo rojo es lo primero que vas a ordenar y lo primero que le vas a enseñar a tu agente.' },
      { titulo: 'Tu planilla base: lo primero que le pasas a tu IA', detalle: 'Descargas la planilla, la abres en Google Sheets y anotas qué vendes, a quién y a qué precio. Esa ficha es la que después lee tu agente.' },
      { titulo: 'Tus reglas de freno: lo que siempre decides tú', detalle: 'Precios, plazos, plata y reclamos. Eliges las tuyas de una plantilla de 15: son los límites que le vas a poner a tu agente.' },
    ],
    pruebaReal: 'Responder el diagnóstico, abrir tu planilla en Google Sheets con tus productos y elegir tus reglas de freno.',
    entregable: 'Tu semáforo, tu planilla base con la ficha y tus productos, y tus reglas de freno: todo lo que tu agente necesita para partir.',
  },
  {
    numero: 1,
    area: 'Tus clientes',
    titulo: 'Enséñale a tu agente quiénes son tus clientes',
    duracion: '5 lecciones · ~15 min de video y lectura',
    lecciones: [
      { titulo: 'Tu hoja Clientes: a quién conoce tu agente', detalle: 'Una fila por cliente o posible cliente, con su estado, su próximo paso y la fecha. Cuando le subes la planilla, tu agente sabe su nombre y en qué va cada uno. Si hiciste la Guía 1, traes tu lista.' },
      { titulo: 'Primer mensaje y seguimientos, con tu tono', detalle: 'Plantillas listas para adaptar. Las escribes una vez y te sirven de modelo para los borradores. Por WhatsApp, solo a quien ya te conoce o te dio su número.' },
      { titulo: 'De la conversación a la propuesta', detalle: 'Las 5 preguntas de la primera reunión y una propuesta de una página. La IA te arma el borrador; el precio lo decides tú. Cada propuesta queda en tu hoja Clientes con su monto.' },
      { titulo: 'Seguimiento de propuestas', detalle: 'Nadie queda «esperando respuesta» sin fecha. Es lo que le preguntas a tu agente con la planilla subida: qué propuestas siguen abiertas y cuáles son.' },
      { titulo: 'Tu embudo en la planilla', detalle: 'Cuántos hay en cada estado, cuántos pasan al siguiente y tu meta semanal, contados solos desde la hoja Clientes.' },
    ],
    pruebaReal: '20 minutos al día durante 5 días con tu hoja Clientes + 1 propuesta enviada y anotada con su fecha de seguimiento.',
    entregable: 'Hoja Clientes con tus clientes reales, cada uno con estado, próximo paso y fecha.',
  },
  {
    numero: 2,
    area: 'De dónde llegan',
    titulo: 'Enséñale a tu agente qué dices y de dónde llegan tus clientes',
    duracion: '5 lecciones · ~14 min de video y lectura',
    lecciones: [
      { titulo: 'Tu mensaje en una frase', detalle: 'Problema que resuelves + para quién + resultado. Es la frase que le das a tu agente para presentar tu negocio. Ejercicio con 3 versiones y elegir.' },
      { titulo: 'Tus 3 temas', detalle: 'Lo que tu cliente quiere aprender, lo que te diferencia y la prueba (casos, clientes). Ejemplo Grano Norte: «cómo elegir café para tu cafetería», «tostado fresco vs. de supermercado», «clientes que cambiaron».' },
      { titulo: 'Una semana de contenido en una tarde', detalle: 'De una idea a 5 piezas (post, historia, carrusel, reel con guion, correo) y un calendario. Con el prompt de la lección, ChatGPT o Claude te arman el borrador.' },
      { titulo: 'Responder comentarios y mensajes con tu tono', detalle: 'Plantillas y la regla de pasar a tu hoja Clientes a quien quiere comprar.' },
      { titulo: 'De dónde llegó cada cliente', detalle: 'La columna Origen de tu hoja Clientes y la hoja Origen: qué canal te trae clientes de verdad, no «me gusta». Con la planilla subida, tu agente lee el mismo número que tú.' },
    ],
    pruebaReal: 'Publicar 5 piezas en la semana y anotar de dónde llegó cada contacto nuevo.',
    entregable: 'Frase + 3 temas + calendario de 4 semanas + hoja Origen con tus canales.',
  },
  {
    numero: 3,
    area: 'Tus pedidos',
    titulo: 'Enséñale a tu agente cómo trabajas cada pedido',
    duracion: '5 lecciones · ~14 min de video y lectura',
    lecciones: [
      { titulo: 'Los procesos de tu negocio, escritos', detalle: 'Eliges 3 procesos (ej.: nuevo cliente, pedido, despacho) y los escribes en 7 pasos o menos. Escritos, los puede seguir una persona nueva o tu agente.' },
      { titulo: 'Del WhatsApp a la hoja Pedidos', detalle: 'Cada pedido en una fila: cliente, qué pidió, para cuándo y quién lo entrega. Son las columnas que tu agente te prepara en su primera tarea.' },
      { titulo: 'Checklist de entrega por tipo de trabajo', detalle: 'La plantilla de «nuevo cliente oficina» de Grano Norte.' },
      { titulo: 'El estado de cada pedido en una vista', detalle: 'Por hacer, en curso, entregado: filtras la hoja Pedidos y ves qué está atrasado sin preguntarle a nadie. Tu agente lee los mismos estados.' },
      { titulo: 'El resumen del día', detalle: 'Qué llegó, qué falta y qué vence: lo lees en la planilla en 5 minutos cada mañana.' },
    ],
    pruebaReal: 'Anotar una semana completa de pedidos en la hoja Pedidos y revisar el resumen cada mañana.',
    entregable: '3 procesos escritos + hoja Pedidos con una semana real.',
  },
  {
    numero: 4,
    area: 'Tu atención',
    titulo: 'Enséñale a tu agente cómo atiendes a tus clientes',
    duracion: '5 lecciones · ~15 min de video y lectura',
    lecciones: [
      { titulo: 'Los 3 tipos de mensaje', detalle: 'Repetidos, con decisión y nuevos. Cuenta los tuyos durante 2 días: lo repetido es lo primero que se delega.' },
      { titulo: 'Respuestas listas para lo repetido', detalle: 'Escribes una vez las respuestas de siempre y las dejas como respuestas rápidas de WhatsApp Business. Te sirven a ti, a tu equipo y de modelo para los borradores de tu agente.' },
      { titulo: 'La hoja Atención: cada caso hasta cerrarlo', detalle: 'Reclamos, cambios y pedidos especiales en una fila, con responsable y fecha. Ninguno se pierde entre los mensajes.' },
      { titulo: 'Cuándo pasa a una persona', detalle: 'Qué casos van siempre a ti o a tu equipo, cómo se avisa y el tiempo máximo de respuesta. Es lo mismo que le dices a tu agente: cuándo te pasa la pelota.' },
      { titulo: 'Postventa: que vuelvan a comprar', detalle: 'El mensaje después de la entrega, cuándo pedir un referido y a quién le toca volver a comprar, desde tu hoja Clientes.' },
    ],
    pruebaReal: 'Usar tus respuestas listas una semana y anotar cada caso en la hoja Atención hasta cerrarlo.',
    entregable: 'Respuestas listas + reglas de derivación + hoja Atención + mensaje de postventa.',
  },
  {
    numero: 5,
    area: 'Tu cobranza y caja',
    titulo: 'Enséñale a tu agente qué te deben y cuánta plata tienes',
    duracion: '4 lecciones · ~11 min de video y lectura',
    lecciones: [
      { titulo: 'Cobranza sin perseguir a nadie', detalle: 'La hoja Cobranza: cada factura con su vencimiento, los días de atraso calculados solos y 3 recordatorios con tu tono. Con tus facturas aquí, haces tu lunes de cobranza con tu agente y tus datos.' },
      { titulo: 'Lo que entra y lo que sale: la hoja Caja', detalle: 'Entradas y salidas con categorías mínimas y el saldo al día, sin digitar todo a mano.' },
      { titulo: 'Tu caja de las próximas 4 semanas', detalle: 'Lo que vas a cobrar y lo que tienes que pagar el próximo mes, para ver el hoyo antes de caer en él.' },
      { titulo: 'Precio y margen', detalle: 'La hoja Productos: el margen de tus 3 productos principales y el que te hace perder. Un cambio de precio lo decides tú, nunca tu agente.' },
    ],
    pruebaReal: 'Un ciclo de cobranza con los recordatorios y un mes de entradas y salidas en la hoja Caja.',
    entregable: 'Hojas Cobranza, Caja y Productos con datos reales.',
  },
  {
    numero: 6,
    area: 'Tu tablero',
    titulo: 'Tu tablero: tu negocio de un vistazo y si tu agente te ahorra tiempo',
    duracion: '5 lecciones · ~17 min de video y lectura + cierre: antes y después',
    lecciones: [
      { titulo: 'Tus números del lunes', detalle: 'Ventas del mes, propuestas abiertas, pedidos atrasados, casos abiertos, por cobrar y caja: el tablero los calcula solo desde tus hojas. Dos de ellos son los que usas para medir a tu agente.' },
      { titulo: 'Cómo se conectan las hojas', detalle: 'Qué lee cada número del tablero y qué pasa si una hoja queda sin actualizar: tu agente también se equivoca si la hoja está atrasada. Cada dato se anota en un solo lugar.' },
      { titulo: 'Compartirlo con tu equipo', detalle: 'Google Sheets con permisos: quién edita qué hoja, quién solo mira y qué decide siempre una persona.' },
      { titulo: 'Las rutinas: tú, tu equipo y tu agente', detalle: '20 minutos al día, 10 los lunes y 15 los viernes: quién actualiza cada hoja y cuándo le vuelves a subir la planilla a tu agente.' },
      { titulo: 'Cuándo una planilla ya no basta', detalle: 'Las señales para pasar a un software de CRM o ERP, y por qué tu planilla te deja listo para hacerlo.' },
    ],
    pruebaReal: 'Una semana con tus rutinas y el tablero revisado el lunes con tu equipo.',
    entregable: 'Tu planilla con su tablero, compartida con tu equipo, tus rutinas escritas y la revisión de tu agente con tus números.',
  },
  {
    // 13-nov-2026 · lote 3. Fuente: ~/.claude/marca-alvaro/curso/modulo-7/modulo-7.md (probado en Claude, ver prueba.md).
    numero: 7,
    area: 'Tu primer agente',
    titulo: 'Arma tu primer agente: quién es, qué sabe y qué nunca decide',
    duracion: '5 lecciones · ~9 min de video y lectura',
    lecciones: [
      { titulo: 'Crea tu agente y escríbele su puesto', detalle: 'Un proyecto de Claude con sus instrucciones: qué hace, qué nunca hace y cuándo te pasa la pelota. Tu ficha y tus reglas de freno del módulo gratis van adentro.' },
      { titulo: 'Dale tu planilla: su memoria', detalle: 'Subes tu planilla al proyecto (con la configuración regional Chile) y le haces una pregunta de prueba. Aunque solo tenga tu ficha y tus productos, ya sirve: te dice qué hojas le llegaron vacías.' },
      { titulo: 'Primera tarea: del WhatsApp a la fila de Pedidos', detalle: 'Pegas el mensaje del cliente y te devuelve la fila para tu hoja Pedidos y la respuesta sugerida. Solo necesita tu lista de productos. Tú revisas, pegas y envías.' },
      { titulo: 'Segunda tarea: tu lunes de cobranza', detalle: 'Pegas tu hoja Cobranza y te dice a quién escribir, a quién llamas tú y el mensaje listo, sin intereses ni amenazas. Si todavía no anotas tus facturas, la practicas con el ejemplo y la repites con las tuyas al llegar a tu cobranza.' },
      { titulo: 'Ponlo a prueba: 5 trampas y 2 números', detalle: '5 preguntas trampa, una regla por cada error y 2 números para medir si te ahorra tiempo. Así lo gestionas y lo mejoras.' },
    ],
    pruebaReal: 'Una semana: pasa todos tus pedidos de WhatsApp por la primera tarea y, si ya tienes tus facturas en la hoja Cobranza, haz un lunes de cobranza con la segunda. Anota tus minutos.',
    entregable: 'Tu proyecto con las instrucciones y la planilla subida, tus 5 trampas aprobadas y tu línea base (minutos de cobranza y pedidos corregidos), anotados en tu hoja Inicio.',
  },
];

/**
 * 15-nov-2026 (temario-agente, fase 3, plan B): orden RECOMENDADO del curso. Después del módulo 0 gratis va el agente
 * (módulo 7) y después las áreas (1 a 6). Los números visibles, las rutas (/curso/modulo-N), las claves de localStorage
 * (villelab_curso_m{N}_*), los videos (m{N}-l{i}) y los prompts NO cambian: los videos nombran módulos por número y
 * renumerar a medias deja la cabecera y el texto en desacuerdo. Solo cambia por dónde te lleva el pie y la flecha de volver.
 * Quien ya avanzó no pierde nada.
 */
export const ORDEN_RECOMENDADO = [0, 7, 1, 2, 3, 4, 5, 6] as const;

/** Los módulos en el orden recomendado (pie de página, flecha de volver y el programa de /curso). */
export const MODULOS_EN_ORDEN: Modulo[] = ORDEN_RECOMENDADO.map((n) => MODULOS.find((m) => m.numero === n)!);

export const PROYECTO_FINAL = {
  titulo: 'Tu agente, tu planilla completa y su tablero',
  texto:
    'Una sola planilla con tus clientes, pedidos, atención, cobranza y caja conectados; un agente que la usa como memoria y te prepara el trabajo que más se repite; y un tablero que tu equipo puede leer sin preguntarte.',
  incluye: [
    'Tu agente con sus instrucciones, tus reglas de freno y sus dos tareas: pasar un pedido de WhatsApp a una fila y armarte la cobranza del lunes',
    'Las hojas del sistema con tus datos reales: Clientes, Origen, Productos, Pedidos, Atención, Cobranza y Caja',
    'El tablero con tus números del lunes, calculados solos',
    'Quién actualiza cada hoja y tus reglas de freno',
    'Tus rutinas de la semana y el semáforo antes y después',
  ],
  cierre: [
    'Video final (52 s): «Tu negocio, antes y después», con el semáforo comparado.',
    'Siguiente paso opcional: una sesión de 90 min para armar contigo lo que quedó pendiente.',
    'Y tu agente, el que armaste al principio: un proyecto de Claude con tus reglas y tu planilla como memoria, probado con 5 trampas y con su línea base anotada para ver en 4 semanas si te ahorra tiempo.',
  ],
} as const;

/** Qué recibe quien compra (12-nov-2026: los módulos están grabados y abiertos; el 7, desde el 13-nov; el acceso es con código, ver /curso/acceso). */
export const ACCESO = {
  pasos: [
    // `modulo` es el número de la ruta; van en el orden recomendado (ORDEN_RECOMENDADO), con su número de siempre.
    { cuando: 'Gratis', modulo: 0, texto: 'Módulo 0 · Diagnóstico y planilla base' },
    { cuando: 'Listo', modulo: 7, texto: 'Módulo 7 · Arma tu primer agente (va justo después del 0)' },
    { cuando: 'Listo', modulo: 1, texto: 'Módulo 1 · Enséñale tus clientes' },
    { cuando: 'Listo', modulo: 2, texto: 'Módulo 2 · Enséñale de dónde llegan' },
    { cuando: 'Listo', modulo: 3, texto: 'Módulo 3 · Enséñale tus pedidos' },
    { cuando: 'Listo', modulo: 4, texto: 'Módulo 4 · Enséñale tu atención' },
    { cuando: 'Listo', modulo: 5, texto: 'Módulo 5 · Enséñale tu cobranza y caja' },
    { cuando: 'Listo', modulo: 6, texto: 'Módulo 6 · Tu tablero + cierre: antes y después' },
  ],
  nota: 'Al comprar, tu código de acceso está en tu área de miembros de Hotmart. Lo pegas una vez en este navegador y entras a los 8 módulos y a «Tus bonos» (la planilla lista y la Guía).',
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
    r: 'No. Todo se arma en Google Sheets, que es gratis con una cuenta de Google, o en Excel si ya lo tienes. Si algún día tu negocio necesita un software pagado, el módulo 6 te ayuda a ver cuándo, y tu planilla queda ordenada para pasarse. Para tu agente necesitas una cuenta de Claude: lo probamos con una cuenta pagada; según Claude, la cuenta gratis también tiene proyectos, pero ahí todavía no lo probamos (más abajo, en «¿Qué es el agente…?»).',
  },
  {
    p: '¿Cuánto tiempo me toma?',
    r: 'Menos de 2 horas de contenido (cerca de 1 h 45 de videos de un minuto y textos breves) y unas 7 a 8 horas de práctica llenando la planilla con tu negocio y armando tu agente, a tu ritmo: en una semana o en un mes, como te acomode. Tu agente lo armas al principio: el módulo gratis y el de tu agente suman unos 20 minutos de lecciones y, según nuestra estimación (todavía sin medir con alumnos), entre 1 h 15 y 1 h 45 de práctica. Después, el sistema se mantiene con 20 minutos al día y una revisión de 10 minutos los lunes.',
  },
  {
    p: '¿Tengo que saber de inteligencia artificial o de programación?',
    r: 'No. Las lecciones donde armas algo traen su prompt listo para copiar: te ayuda a armar tu hoja, las fórmulas y tus mensajes, y revisas lo que te devuelva antes de usarlo. Los de las hojas los usas en ChatGPT o Claude (la versión gratis sirve) y cambias lo que está entre [corchetes] por los datos de tu negocio. Los 7 de tu agente se rellenan solos con los datos que anotas una vez, y los probamos solo en un proyecto de Claude con cuenta pagada: en ChatGPT y en cuentas gratis, todavía no.',
  },
  {
    p: '¿Qué recibo al comprar?',
    r: `Los 8 módulos completos desde el primer día: 38 lecciones cortas con su video y su ejercicio, 34 prompts listos para la IA, la planilla del sistema (Excel o Google Sheets) con las fórmulas listas y el ejemplo de Grano Norte, y el módulo para armar tu primer agente, que va justo después del gratis. Además, dos bonos incluidos: la planilla lista (la misma planilla, en blanco y con 5 pasos y avisos adentro para usarla sola desde hoy) y la Guía «Tus próximos 20 clientes», que se vende sola a ${PRECIO_GUIA.texto} CLP. Los dos te esperan en «Tus bonos», dentro del curso. Tu código de acceso está en tu área de miembros de Hotmart.`,
  },
  {
    p: '¿Qué es tu agente y con qué IA funciona?',
    r: `${PROMESA_AGENTE.definicion} Hace dos tareas: pasa un pedido de WhatsApp a una fila de tu hoja Pedidos y te arma la cobranza del lunes, con los mensajes listos. No se conecta a tu WhatsApp ni escribe solo en tu planilla: tú copias, revisas y envías. Requisitos: lo probamos en un proyecto de Claude con cuenta pagada y con la planilla en Google Sheets; en ChatGPT, en cuentas gratis y con Excel todavía no lo probamos. Tu planilla tiene que estar con la configuración regional Chile (en Google Sheets: Archivo › Configuración), para que las fechas entren bien. Se hace en el computador.`,
  },
  {
    p: '¿Puedo armar mi agente antes de llenar todas las hojas?',
    r: 'Sí, y es lo que te proponemos. Con tu ficha, tus productos y tus reglas de freno del módulo gratis ya puede hacer su primera tarea: pasar un pedido de WhatsApp a una fila de tu hoja Pedidos. Para la cobranza del lunes necesita tus facturas en la hoja Cobranza; mientras tanto, la practicas con el ejemplo de Grano Norte. Cada hoja que llenas después es algo más que sabe de tu negocio: se la vuelves a subir cada lunes.',
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
    bajada: 'Qué decide siempre una persona: precios, plazos, plata, reclamos. Elige las tuyas de esta plantilla y ajústalas. Estas reglas van dentro de tu agente en el módulo 7.',
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
