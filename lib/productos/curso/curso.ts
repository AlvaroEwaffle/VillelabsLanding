// Curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets» · datos únicos (página de venta + módulos).
// v1.0 (7-nov-2026): «Tu negocio de punta a punta», contenido-primeros-productos.html (PRODUCTO 4 · CURSO).
// v1.1 (8-nov-2026): reposicionado como «construye tu primer CRM y ERP» a pedido de Álvaro, con las
// investigaciones de demanda y de evidencia (VPM/Villelabs/productos-digitales/investigacion/). Ver versiones.ts.

/**
 * Precio ratificado por Álvaro el 8-nov-2026 («1 si ok 29990 59990»): fundador $29.990 para los primeros 20
 * alumnos, después $59.990. Quien compró la Guía 1 tiene el cupón GUIA1CURSO (33,34 %, queda en ~$19.990).
 * Hotmart: producto 8921667, garantía 7 días, pago único o en cuotas.
 */
export const PRECIO_FUNDADOR: number | null = 29990;
export const PRECIO_NORMAL = 59990;
export const CUPOS_FUNDADOR = 20;
export const MONEDA_PRECIO = 'CLP';
export const PRECIO_CURSO = { cuponGuia: 'GUIA1CURSO', precioConCupon: 19990, garantiaDias: 7 };

const clp = (n: number) => '$' + n.toLocaleString('es-CL');

export function textoPrecio(): string {
  return PRECIO_FUNDADOR === null
    ? 'Precio de preventa'
    : `${clp(PRECIO_FUNDADOR)} precio de preventa`; // 12-nov-2026: sin «primeros 20 alumnos» (cupo sin respaldo), en A y en B
}

/** Variante B de EXP-13 (12-nov-2026): sin «primeros 20 alumnos» (cupo sin respaldo verificable en la página). */
export function textoPrecioSinCupo(): string {
  return PRECIO_FUNDADOR === null ? 'Precio de preventa' : `${clp(PRECIO_FUNDADOR)} precio de preventa`;
}

/** Variante B de EXP-13: solo el cupón (el «después sube» va atado al cupo, que en B no se muestra). */
export function textoPrecioDetalleSinCupo(): string {
  return `Si compraste la guía, con el cupón ${PRECIO_CURSO.cuponGuia} te queda en ${clp(PRECIO_CURSO.precioConCupon)}.`;
}

export function textoPrecioDetalle(): string {
  return `Si compraste la guía, con el cupón ${PRECIO_CURSO.cuponGuia} te queda en ${clp(PRECIO_CURSO.precioConCupon)}.`;
}

export const CURSO = {
  nombre: 'Construye con IA tu CRM y ERP',
  apellido: 'Sin programar, en Google Sheets',
  /** Nombre completo para metadata, certificado y referencias desde otros productos. */
  nombreCompleto: 'Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar en 5 horas',
  promesa:
    'En 6 semanas, con 5 horas de lecciones y tu hoja a tu ritmo, armas con IA (con prompts listos para pegar) el sistema de tu negocio en una planilla que ya sabes usar: tus clientes y en qué va cada uno, de dónde llegan, los pedidos, la atención, la cobranza y la caja, conectados en un tablero que revisas los lunes en 10 minutos.',
  noEsSoftware:
    'No es un software ni una suscripción: es una planilla bien armada, con las fórmulas listas, y rutinas cortas para que el negocio no dependa de tu memoria.',
  formato: [
    { etiqueta: 'Formato', valor: '7 módulos, 33 lecciones, unas 5 horas' },
    { etiqueta: 'Ritmo sugerido', valor: '1 módulo por semana, 2 a 3 h' },
    { etiqueta: 'Herramienta', valor: 'Google Sheets (gratis) o Excel' },
    { etiqueta: 'Cada lección', valor: 'idea → ejemplo → tu hoja → prueba real' },
    { etiqueta: 'Proyecto final', valor: 'tu ERP en Google Sheets con su tablero' },
  ],
  comoFunciona: [
    'Lecciones cortas con el caso Grano Norte en pantalla: ves la hoja llena antes de llenar la tuya.',
    'Cada módulo agrega una hoja a la misma planilla, ya conectada con las anteriores. No empiezas de cero cada semana.',
    'Prueba real al cierre de cada módulo: usas la hoja con tu negocio durante la semana.',
    'Semáforo de cada pieza (rojo, naranja, verde) antes y después, y al final el tablero que lo junta todo.',
  ],
} as const;

/** Qué es un CRM y qué es un ERP, en una línea y sin jerga. */
export const QUE_ES = {
  crm: 'el lugar donde ves a todos tus clientes y en qué va cada uno.',
  erp: 'el sistema donde se juntan ventas, pedidos, cobranza y caja.',
  aqui: 'En este curso los dos viven en una planilla de Google Sheets que armas tú, con las fórmulas listas. Si algún día necesitas un software, tu planilla ya está ordenada para pasarse.',
} as const;

/** 12-nov-2026 (Álvaro, WA 18:03): el título del curso lleva «con IA»; la IA arma el sistema con los prompts de cada módulo. */
export const IA_OPCIONAL =
  'La IA te ayuda a armarlo: cada módulo trae prompts listos para pegar en ChatGPT, Claude o Gemini (tu hoja, las fórmulas, tus mensajes), y los recibes en tu área de miembros. No necesitas programar ni saber de IA, y lo que te devuelva lo revisas tú antes de usarlo.';

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
    duracion: '4 lecciones · 30 min',
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
    duracion: '5 lecciones · 45 min',
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
    duracion: '5 lecciones · 45 min',
    lecciones: [
      { titulo: 'Tu mensaje en una frase', detalle: 'Problema que resuelves + para quién + resultado. Ejercicio con 3 versiones y elegir.' },
      { titulo: 'Tus 3 temas', detalle: 'Lo que tu cliente quiere aprender, lo que te diferencia y la prueba (casos, clientes). Ejemplo Grano Norte: «cómo elegir café para tu cafetería», «tostado fresco vs. de supermercado», «clientes que cambiaron».' },
      { titulo: 'Una semana de contenido en una tarde', detalle: 'De una idea a 5 piezas (post, historia, carrusel, reel con guion, correo) y un calendario. Si quieres, ChatGPT o Claude te arman el borrador.' },
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
    duracion: '5 lecciones · 45 min',
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
    duracion: '5 lecciones · 50 min',
    lecciones: [
      { titulo: 'Los 3 tipos de mensaje', detalle: 'Repetidos, con decisión y nuevos. Cuenta los tuyos durante 2 días.' },
      { titulo: 'Respuestas listas para lo repetido', detalle: 'Escribes una vez las respuestas de siempre y las dejas como respuestas rápidas de WhatsApp Business. Si usas IA, el mismo texto le sirve.' },
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
    duracion: '4 lecciones · 40 min',
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
    duracion: '5 lecciones · 50 min',
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
    'Lección final (5 min): «Tu negocio en 6 semanas: antes y después», con el semáforo comparado.',
    'Certificado de finalización al entregar tu proyecto final.',
    'Siguiente paso opcional: una sesión de 90 min para armar contigo lo que quedó pendiente.',
  ],
} as const;

export const PREVENTA = {
  pasos: [
    { cuando: 'Hoy', modulo: 0, texto: 'Módulo 0 · El mapa y tu planilla base: lo recibes al tiro, apenas compras.' },
    { cuando: 'Semana 1', modulo: 1, texto: 'Módulo 1 · Clientes y ventas (tu CRM)' },
    { cuando: 'Semana 2', modulo: 2, texto: 'Módulo 2 · Marketing y origen' },
    { cuando: 'Semana 3', modulo: 3, texto: 'Módulo 3 · Pedidos y operación' },
    { cuando: 'Semana 4', modulo: 4, texto: 'Módulo 4 · Atención y postventa' },
    { cuando: 'Semana 5', modulo: 5, texto: 'Módulo 5 · Cobranza y caja' },
    { cuando: 'Semana 6', modulo: 6, texto: 'Módulo 6 · El tablero + proyecto final' },
  ],
  nota: 'Las semanas se cuentan desde la apertura de la preventa. Cada módulo queda disponible: si te atrasas, lo retomas cuando puedas.',
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
    r: 'No. Todo se arma en Google Sheets, que es gratis con una cuenta de Google, o en Excel si ya lo tienes. Si algún día tu negocio necesita un software pagado, el módulo 6 te ayuda a ver cuándo, y tu planilla queda ordenada para pasarse.',
  },
  {
    p: '¿Cuánto tiempo necesito a la semana?',
    r: 'Entre 2 y 3 horas mientras haces el curso: unos 45 minutos de lecciones y el resto para llenar la hoja con tu negocio. Después, el sistema se mantiene con 20 minutos al día y una revisión de 10 minutos los lunes. Lo puedes llenar desde el celular, entre una cosa y otra.',
  },
  {
    p: '¿Tengo que saber de inteligencia artificial o de programación?',
    r: 'No. Cada módulo trae prompts listos: textos para pegar en ChatGPT, Claude o Gemini (la versión gratis sirve) que recibes en tu área de miembros (los de cada módulo, junto con el módulo) y te ayudan a armar tu hoja, las fórmulas y tus mensajes. Cambias los datos por los de tu negocio y revisas lo que te devuelva antes de usarlo. Si prefieres no usar IA, la planilla y las plantillas funcionan igual.',
  },
  {
    p: '¿Qué recibo al comprar en preventa?',
    r: 'El módulo 0 al tiro: el mapa de tu sistema, el diagnóstico con semáforo, la planilla base y tus reglas de freno. Desde ahí se libera un módulo por semana hasta completar los 7.',
  },
  {
    p: '¿Qué pasa si me atraso?',
    r: 'Nada. Los módulos quedan disponibles y puedes avanzar a tu ritmo. El ritmo de un módulo por semana es una sugerencia para que veas resultados rápido.',
  },
  {
    p: '¿Sirve para mi rubro?',
    r: 'El caso es una tostaduría que le vende a empresas, pero las hojas son las mismas para una distribuidora, un servicio de mantención, una agencia o una consultora: clientes, pedidos o trabajos, atención, cobranza y caja. En cada lección la ajustas a tu negocio.',
  },
  {
    p: '¿Por qué tiene precio de preventa?',
    r: 'Porque compras antes de que estén todos los módulos grabados, y tus dudas ayudan a armar los módulos que vienen.',
  },
  {
    p: '¿Hay certificado?',
    r: 'Sí. Al entregar tu proyecto final (tu planilla con su tablero) recibes el certificado de finalización.',
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
