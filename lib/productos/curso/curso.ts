// Curso «Tu negocio de punta a punta» · datos únicos (página de venta + módulo 0).
// Fuente: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html (PRODUCTO 4 · CURSO), aprobado por Álvaro.

/**
 * Precio fundador de preventa. NO está ratificado: mientras sea null, la página
 * muestra solo «Precio fundador de preventa» y oculta la cifra.
 * Cuando Álvaro lo ratifique, poner el número (ej. 97) y la moneda.
 */
export const PRECIO_FUNDADOR: number | null = null;
export const MONEDA_PRECIO = 'USD';

export function textoPrecio(): string {
  return PRECIO_FUNDADOR === null
    ? 'Precio fundador de preventa'
    : `${MONEDA_PRECIO} ${PRECIO_FUNDADOR} · precio fundador de preventa`;
}

export const CURSO = {
  nombre: 'Tu negocio de punta a punta',
  promesa:
    'En 6 semanas ordenas las 5 áreas de tu negocio (marketing, ventas, operación, atención al cliente y finanzas) y armas un sistema que funciona sin que estés pegado al celular.',
  formato: [
    { etiqueta: 'Formato', valor: '7 módulos, 33 lecciones de 5–8 min' },
    { etiqueta: 'Ritmo sugerido', valor: '1 módulo por semana, 2–3 h' },
    { etiqueta: 'Videos', valor: 'Álvaro en pantalla, con demos' },
    { etiqueta: 'Cada lección', valor: 'idea → demo → plantilla → prueba real' },
    { etiqueta: 'Proyecto final', valor: 'el tablero de tu negocio' },
  ],
  comoFunciona: [
    'Lecciones cortas con el caso Grano Norte en pantalla y una plantilla para copiar.',
    'Prueba real al cierre de cada módulo: se usa con tu negocio durante la semana.',
    'Entregable que se suma al proyecto final: el tablero de tu negocio, un documento único con las 5 áreas, sus rutinas y sus frenos.',
    'Autoevaluación al cierre: semáforo del área (rojo, naranja, verde) antes y después.',
  ],
} as const;

export const CASO = {
  nombre: 'Grano Norte',
  texto:
    'Grano Norte es una tostaduría de café en Valparaíso con 6 personas. Vende café en grano y molido a cafeterías y oficinas (70 % de la venta) y a personas por Instagram y WhatsApp (30 %). Su dueña, Camila, responde sola el WhatsApp, persigue pagos a fin de mes y no tiene tiempo de buscar clientes nuevos.',
  datos: [
    { etiqueta: 'Equipo', valor: '6 personas' },
    { etiqueta: 'Mensajes', valor: '~40 al día, 6 de 10 repetidos' },
    { etiqueta: 'Ventas', valor: '35 clientes B2B activos' },
    { etiqueta: 'Dolor', valor: 'todo pasa por Camila' },
  ],
  nota: 'Es ficticio, pero está armado con los problemas que más se repiten en pymes.',
} as const;

export type AreaId = 'marketing' | 'ventas' | 'operacion' | 'atencion' | 'finanzas';

export type Area = {
  id: AreaId;
  nombre: string;
  corto: string;
  modulo: number;
  seOrdena: string;
  siNo: string;
  enGranoNorte: string;
  pasaA: string;
};

export const AREAS: Area[] = [
  {
    id: 'marketing',
    nombre: 'Marketing',
    corto: 'Que te encuentren y te escriban',
    modulo: 1,
    seOrdena: 'Tu mensaje en una frase, tus 3 temas, un calendario de contenido y los números que dicen qué pieza trae clientes.',
    siNo: 'Publicas cuando te acuerdas, no sabes qué funciona y los meses flojos te pillan sin conversaciones nuevas.',
    enGranoNorte: 'Camila publica cuando tiene un rato libre. Nadie sabe de dónde llegaron las últimas 3 cafeterías.',
    pasaA: 'Trae conversaciones que ventas convierte en clientes.',
  },
  {
    id: 'ventas',
    nombre: 'Ventas',
    corto: 'Ningún seguimiento se cae',
    modulo: 2,
    seOrdena: 'Tu cliente ideal, la lista del día, los mensajes de seguimiento, la propuesta de una página y el embudo en una planilla.',
    siNo: 'Las propuestas quedan «esperando respuesta» sin fecha y los clientes se enfrían mientras apagas incendios.',
    enGranoNorte: 'Tiene 35 clientes B2B activos y ninguna lista de prospectos: los nuevos llegan solo por recomendación.',
    pasaA: 'Cada venta cerrada entra a operación para entregarse.',
  },
  {
    id: 'operacion',
    nombre: 'Operación',
    corto: 'Entregar lo vendido sin perder tareas',
    modulo: 3,
    seOrdena: 'Tus procesos que se repiten escritos en pasos, el checklist de entrega, un tablero de estado y el resumen del día.',
    siNo: 'Cada pedido depende de que te acuerdes tú. Si faltas un día, algo se atrasa o sale mal.',
    enGranoNorte: 'Los pedidos de oficinas llegan por WhatsApp y el despacho se coordina de memoria.',
    pasaA: 'Lo entregado genera preguntas, pedidos nuevos y reclamos: eso es atención.',
  },
  {
    id: 'atencion',
    nombre: 'Atención al cliente',
    corto: 'Responder a tiempo, con tus reglas',
    modulo: 4,
    seOrdena: 'Respuestas escritas para lo repetido, un asistente que contesta con tu esqueleto, cuándo pasa a una persona y cómo se cierra un reclamo.',
    siNo: 'Respondes lo mismo 30 veces al día, tarde, y los reclamos se pierden entre los mensajes.',
    enGranoNorte: 'Llegan unos 40 mensajes al día, 6 de cada 10 repetidos, y todos los responde Camila.',
    pasaA: 'Un cliente bien atendido vuelve a comprar y paga a tiempo.',
  },
  {
    id: 'finanzas',
    nombre: 'Finanzas',
    corto: 'Cobrar a tiempo y saber cómo vas',
    modulo: 5,
    seOrdena: 'La cobranza con recordatorios, los gastos en una planilla, tus 5 números del lunes y el margen de tus productos.',
    siNo: 'Persigues pagos a fin de mes, no sabes cuánta caja tienes y no sabes qué producto te hace perder.',
    enGranoNorte: 'Camila persigue pagos a fin de mes y no sabe cuál de sus cafés deja más margen.',
    pasaA: 'Los números dicen cuánto puedes invertir en marketing: el ciclo vuelve a partir.',
  },
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
    titulo: 'Tu negocio en 5 áreas',
    duracion: '4 lecciones · 30 min',
    lecciones: [
      { titulo: 'Por qué te sientes pegado al celular', detalle: 'Todo pasa por ti porque nada está escrito. El mapa de 5 áreas y cómo se conectan.' },
      { titulo: 'Diagnóstico de 15 preguntas', detalle: 'Interactivo: devuelve un semáforo por área y el orden sugerido para hacer el curso.' },
      { titulo: 'El esqueleto de tu agente', detalle: 'Se completa o se revisa (es el mismo esqueleto gratuito). Es la base de todo lo que sigue.' },
      { titulo: 'Las reglas de freno del negocio', detalle: 'Qué decide siempre una persona: precios, plazos, plata, reclamos. Plantilla con 15 reglas para elegir.' },
    ],
    pruebaReal: 'Responder el diagnóstico con tu negocio y elegir tus reglas de freno.',
    entregable: 'Mapa con semáforo + esqueleto + reglas de freno. Es la portada del tablero.',
  },
  {
    numero: 1,
    area: 'Marketing',
    titulo: 'Que te encuentren y te escriban',
    duracion: '5 lecciones · 45 min',
    lecciones: [
      { titulo: 'Tu mensaje en una frase', detalle: 'Problema que resuelves + para quién + resultado. Ejercicio con 3 versiones y elegir.' },
      { titulo: 'Tus 3 temas', detalle: 'Lo que tu cliente quiere aprender, lo que te diferencia y la prueba (casos, clientes). Ejemplo Grano Norte: «cómo elegir café para tu cafetería», «tostado fresco vs de supermercado», «clientes que cambiaron».' },
      { titulo: 'Una semana de contenido en una tarde', detalle: 'De una idea a 5 piezas (post, historia, carrusel, reel guionado, correo). Demo paso a paso y calendario.' },
      { titulo: 'Responder comentarios y mensajes con tu tono', detalle: 'Plantillas + regla de derivar a ventas.' },
      { titulo: 'Qué pieza trae clientes', detalle: 'Medir con 3 números (alcance no; mensajes y reuniones sí) en una planilla semanal.' },
    ],
    pruebaReal: 'Publicar 5 piezas en la semana.',
    entregable: 'Frase + 3 temas + calendario de 4 semanas.',
  },
  {
    numero: 2,
    area: 'Ventas y prospección',
    titulo: 'Ningún seguimiento se cae',
    duracion: '5 lecciones · 45 min',
    lecciones: [
      { titulo: 'Cliente ideal y lista del día', detalle: 'Resumen de la Guía 1; si ya la compraste, te la saltas.' },
      { titulo: 'Primer mensaje y seguimientos', detalle: 'Con plantillas listas para adaptar.' },
      { titulo: 'De la conversación a la propuesta', detalle: 'Las 5 preguntas de la primera reunión y una propuesta de una página. Plantilla con ejemplo de Grano Norte (plan oficina).' },
      { titulo: 'Seguimiento de propuestas', detalle: 'Nadie queda «esperando respuesta» sin fecha. Recordatorio automático en borrador a los 3, 7 y 14 días.' },
      { titulo: 'Tu embudo en una planilla', detalle: 'Prospecto → conversación → propuesta → cierre, con tasas de paso y la meta semanal.' },
    ],
    pruebaReal: 'Rutina de 20 min durante 5 días + 1 propuesta enviada con el formato.',
    entregable: 'Planilla de embudo con datos reales.',
  },
  {
    numero: 3,
    area: 'Operaciones e implementaciones',
    titulo: 'Entregar lo vendido sin perder tareas',
    duracion: '5 lecciones · 45 min',
    lecciones: [
      { titulo: 'Lo que se repite se escribe', detalle: 'Elegir 3 procesos (ej.: nuevo cliente, pedido, despacho) y escribirlos en 7 pasos o menos.' },
      { titulo: 'De la reunión a las tareas', detalle: 'Notas o grabación → tareas con responsable y fecha. Demo con transcripción real.' },
      { titulo: 'Checklist de entrega por tipo de trabajo', detalle: 'La plantilla de «nuevo cliente oficina» de Grano Norte.' },
      { titulo: 'Estado de proyectos en una vista', detalle: 'Tablero simple (por hacer, en curso, listo) y quién lo actualiza.' },
      { titulo: 'El resumen del día', detalle: 'Qué llegó, qué falta, qué vence; preparado cada mañana en borrador para revisar en 5 minutos.' },
    ],
    pruebaReal: 'Llevar una semana de pedidos o proyectos con el checklist y el resumen diario.',
    entregable: '3 procesos escritos + tablero.',
  },
  {
    numero: 4,
    area: 'Atención al cliente',
    titulo: 'Responder a tiempo, con tus reglas',
    duracion: '5 lecciones · 50 min',
    lecciones: [
      { titulo: 'Los 3 tipos de mensaje', detalle: 'Repetidos, con decisión y nuevos. Medir los tuyos durante 2 días.' },
      { titulo: 'Tu asistente desde el esqueleto', detalle: 'La configuración de tu agente + preguntas trampa + correcciones (lo del Workshop 1, en profundidad).' },
      { titulo: 'Ponerlo en WhatsApp', detalle: 'Paso a paso con el chatbot de WhatsApp de Fidelidapp, sin programar. Qué contestar solo y qué derivar.' },
      { titulo: 'Cuándo pasa a una persona', detalle: 'Derivación, aviso al equipo y tiempo máximo de respuesta humana.' },
      { titulo: 'Correo de soporte y reclamos', detalle: 'Plantillas de respuesta y seguimiento hasta cerrar el caso.' },
    ],
    pruebaReal: 'Asistente funcionando una semana; registrar % de mensajes resueltos solos y derivaciones.',
    entregable: 'Asistente activo + reglas de derivación.',
  },
  {
    numero: 5,
    area: 'Administración y finanzas',
    titulo: 'Cobrar a tiempo y saber cómo vas',
    duracion: '4 lecciones · 40 min',
    lecciones: [
      { titulo: 'Cobranza sin perseguir a nadie', detalle: '3 recordatorios con tu tono (antes del vencimiento, el día, 5 días después) y cuándo llamar.' },
      { titulo: 'Gastos y facturas en una planilla', detalle: 'Categorías mínimas y cómo pasar boletas y facturas sin digitar todo a mano.' },
      { titulo: 'Tus 5 números del lunes', detalle: 'Ventas de la semana, por cobrar, pagado, caja disponible y reuniones agendadas. Reporte preparado en borrador cada lunes.' },
      { titulo: 'Precio y margen', detalle: 'Calcular el margen de tus 3 productos principales y detectar el que te hace perder.' },
    ],
    pruebaReal: 'Un ciclo de cobranza + primer reporte del lunes.',
    entregable: 'Planilla de finanzas + reporte.',
  },
  {
    numero: 6,
    area: 'Tu propia infra',
    titulo: 'Arma tu sistema propio',
    duracion: '5 lecciones · 50 min',
    lecciones: [
      { titulo: 'Del producto hecho a lo tuyo', detalle: 'Cuándo basta con una herramienta lista (como Fidelidapp) y cuándo conviene armar lo propio.' },
      { titulo: 'Tu base de información', detalle: 'Esqueleto, procesos, plantillas y reglas en un solo lugar ordenado (carpeta o proyecto en Claude) que todos tus asistentes leen.' },
      { titulo: 'Conectar correo, calendario y planillas', detalle: 'Con permisos mínimos: qué puede leer y qué solo puede dejar en borrador.' },
      { titulo: 'Tus rutinas automáticas', detalle: 'Resumen del día, lista de prospectos, reporte del lunes; cómo dejarlas corriendo a una hora fija.' },
      { titulo: 'Frenos y revisión semanal', detalle: '15 minutos los viernes para revisar qué hizo el sistema, qué falló y qué ajustar.' },
    ],
    pruebaReal: '1 rutina corriendo sola una semana.',
    entregable: 'Base de información + 1 rutina activa.',
  },
];

export const PROYECTO_FINAL = {
  titulo: 'El tablero de tu negocio',
  texto:
    'Un documento único que le muestras a tu equipo para que el negocio deje de depender de ti.',
  incluye: [
    'Mapa y semáforo de las 5 áreas, antes y después',
    'Esqueleto y reglas de freno',
    'Por cada área: su rutina (qué se hace, cuándo, quién), su plantilla y su número semanal',
    'La revisión de los viernes',
  ],
  cierre: [
    'Lección final (5 min): «Tu negocio en 6 semanas: antes y después», con el semáforo comparado.',
    'Certificado de finalización al subir el tablero.',
    'Siguiente paso opcional: una sesión de 90 min para armar contigo lo que quedó pendiente.',
  ],
} as const;

export const PREVENTA = {
  pasos: [
    { cuando: 'Hoy', modulo: 0, texto: 'Módulo 0 · El mapa: lo recibes al tiro, apenas compras.' },
    { cuando: 'Semana 1', modulo: 1, texto: 'Módulo 1 · Marketing' },
    { cuando: 'Semana 2', modulo: 2, texto: 'Módulo 2 · Ventas y prospección' },
    { cuando: 'Semana 3', modulo: 3, texto: 'Módulo 3 · Operación' },
    { cuando: 'Semana 4', modulo: 4, texto: 'Módulo 4 · Atención al cliente' },
    { cuando: 'Semana 5', modulo: 5, texto: 'Módulo 5 · Finanzas' },
    { cuando: 'Semana 6', modulo: 6, texto: 'Módulo 6 · Tu propia infra + proyecto final' },
  ],
  nota: 'Las semanas se cuentan desde la apertura de la preventa. Cada módulo queda disponible: si te atrasas, lo retomas cuando puedas.',
} as const;

export const PARA_QUIEN = {
  si: [
    'Tienes un negocio que ya vende y un equipo chico (o estás sola o solo).',
    'Todo pasa por ti: precios, pedidos, pagos y el WhatsApp.',
    'Respondes lo mismo muchas veces al día y igual se te quedan clientes sin respuesta.',
    'Persigues pagos a fin de mes y no sabes bien cuánta caja tienes.',
    'Quieres que tu equipo pueda avanzar sin preguntarte todo.',
  ],
  no: [
    'Buscas un curso de herramientas o de programación.',
    'Todavía no tienes clientes ni algo que vender.',
    'Quieres que alguien lo haga todo por ti (para eso existe la sesión hecha contigo).',
  ],
} as const;

export const FAQ: { p: string; r: string }[] = [
  {
    p: '¿Qué recibo al comprar en preventa?',
    r: 'El módulo 0 completo al tiro: el mapa de tu negocio, el diagnóstico con semáforo, el esqueleto de tu agente y las reglas de freno. Desde ahí se libera un módulo por semana hasta completar los 7.',
  },
  {
    p: '¿Cuánto tiempo necesito a la semana?',
    r: 'Entre 2 y 3 horas: unos 45 minutos de lecciones y el resto para la prueba real con tu negocio. Las lecciones duran de 5 a 8 minutos, así que caben en cualquier pausa.',
  },
  {
    p: '¿Necesito saber de tecnología?',
    r: 'No. Cada lección parte por el problema y muestra el paso a paso en pantalla. Si sabes usar WhatsApp, correo y una planilla, puedes hacer el curso.',
  },
  {
    p: '¿Qué pasa si me atraso?',
    r: 'Nada. Los módulos quedan disponibles y puedes avanzar a tu ritmo. El ritmo de un módulo por semana es una sugerencia para que veas resultados rápido.',
  },
  {
    p: '¿Sirve para mi rubro?',
    r: 'El caso de ejemplo es una tostaduría de café, pero el método es el mismo para servicios, comercio y empresas que venden a otras empresas. En cada lección lo aplicas a tu negocio.',
  },
  {
    p: '¿Funciona con las herramientas que ya uso?',
    r: 'Sí. Las plantillas son de Google Sheets y Excel, y la configuración de tu agente funciona en Claude, ChatGPT o Gemini.',
  },
  {
    p: '¿Por qué tiene precio fundador?',
    r: 'Porque compras antes de que estén todos los módulos grabados. A cambio, pagas menos que el precio final y tus dudas ayudan a armar los módulos que vienen.',
  },
  {
    p: '¿Hay certificado?',
    r: 'Sí, al subir tu tablero final recibes el certificado de finalización.',
  },
];

// ─── Módulo 0 ──────────────────────────────────────────────────────────────

export type Respuesta = 0 | 1 | 2;

export const OPCIONES_DIAGNOSTICO: { valor: Respuesta; texto: string }[] = [
  { valor: 2, texto: 'Sí' },
  { valor: 1, texto: 'A medias' },
  { valor: 0, texto: 'No' },
];

export const PREGUNTAS: { id: string; area: AreaId; texto: string }[] = [
  { id: 'm1', area: 'marketing', texto: '¿Puedes decir en una frase qué problema resuelves, para quién y qué resultado logra?' },
  { id: 'm2', area: 'marketing', texto: '¿Publicas o envías contenido al menos una vez por semana, aunque estés con harta pega?' },
  { id: 'm3', area: 'marketing', texto: '¿Sabes qué pieza o qué canal te trajo a tus últimos 3 clientes?' },
  { id: 'v1', area: 'ventas', texto: '¿Tienes una lista escrita de prospectos con la fecha del próximo contacto de cada uno?' },
  { id: 'v2', area: 'ventas', texto: '¿Cada propuesta que envías tiene una fecha de seguimiento anotada?' },
  { id: 'v3', area: 'ventas', texto: '¿Sabes cuántas conversaciones necesitas, en promedio, para cerrar una venta?' },
  { id: 'o1', area: 'operacion', texto: '¿Los procesos que más se repiten (pedido, despacho, nuevo cliente) están escritos en pasos?' },
  { id: 'o2', area: 'operacion', texto: '¿Alguien de tu equipo puede entregar un pedido completo sin preguntarte nada?' },
  { id: 'o3', area: 'operacion', texto: '¿Puedes ver en un solo lugar qué está por hacer, qué está en curso y qué está listo?' },
  { id: 'a1', area: 'atencion', texto: '¿Las preguntas que más se repiten (precio, despacho, horario) tienen una respuesta escrita?' },
  { id: 'a2', area: 'atencion', texto: '¿Los mensajes se responden el mismo día, aunque tú no estés?' },
  { id: 'a3', area: 'atencion', texto: '¿Está claro qué reclamos o pedidos tienen que pasar sí o sí por una persona?' },
  { id: 'f1', area: 'finanzas', texto: '¿Cobras con recordatorios en fechas fijas, sin tener que perseguir a nadie?' },
  { id: 'f2', area: 'finanzas', texto: '¿Sabes cuánta plata tienes por cobrar hoy, sin ponerte a revisar?' },
  { id: 'f3', area: 'finanzas', texto: '¿Conoces el margen de tus 3 productos o servicios principales?' },
];

export type Semaforo = 'rojo' | 'amarillo' | 'verde';

/** Puntaje por área: 0–6 (3 preguntas × 0–2). */
export function semaforoDe(puntaje: number): Semaforo {
  if (puntaje >= 5) return 'verde';
  if (puntaje >= 3) return 'amarillo';
  return 'rojo';
}

export const TEXTO_SEMAFORO: Record<Semaforo, { etiqueta: string; texto: string }> = {
  rojo: { etiqueta: 'Rojo', texto: 'Esta área depende de ti o de la memoria. Empieza por aquí.' },
  amarillo: { etiqueta: 'Amarillo', texto: 'Hay partes ordenadas, pero se caen cuando hay harta pega.' },
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
    titulo: 'Por qué te sientes pegado al celular',
    bajada: 'Todo pasa por ti porque nada está escrito. Este es el mapa de las 5 áreas de tu negocio y cómo se conectan.',
    checklist: [
      { id: 'l1a', texto: 'Recorrí las 5 áreas del mapa.' },
      { id: 'l1b', texto: 'Anoté qué área me quita más tiempo hoy.' },
      { id: 'l1c', texto: 'Anoté 3 decisiones que hoy pasan solo por mí.' },
    ],
  },
  {
    id: 'diagnostico',
    numero: 2,
    titulo: 'Diagnóstico de 15 preguntas',
    bajada: '3 preguntas por área. Responde pensando en cómo funciona tu negocio hoy, no en cómo te gustaría que funcionara.',
    checklist: [
      { id: 'l2a', texto: 'Respondí las 15 preguntas.' },
      { id: 'l2b', texto: 'Revisé mi semáforo por área.' },
      { id: 'l2c', texto: 'Anoté por qué módulo voy a empezar.' },
    ],
  },
  {
    id: 'esqueleto',
    numero: 3,
    titulo: 'El esqueleto de tu agente',
    bajada: 'La base de todo lo que sigue. Si ya lo hiciste, revísalo; si no, complétalo ahora (15 minutos).',
    checklist: [
      { id: 'l3a', texto: 'Completé o revisé mi esqueleto.' },
      { id: 'l3b', texto: 'Guardé el resultado en un lugar que mi equipo puede ver.' },
      { id: 'l3c', texto: 'Anoté un dato que antes no estaba escrito en ninguna parte.' },
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
  checklist: 'villelab_curso_m0_checklist',
  negocio: 'villelab_curso_m0_negocio',
} as const;
