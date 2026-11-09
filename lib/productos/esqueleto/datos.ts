// «El esqueleto de tu asistente de WhatsApp» (imán gratis, Entrada A). Ex «La ficha de tu negocio».
// Base del contenido: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html (PRODUCTO 1),
// rehecho el 7-nov-2026 con el feedback de Álvaro: 4 pasos, pantallas «¿Te pasa esto?» entre pasos,
// y en la interfaz nunca «ficha», «formulario» ni «prompt» (se dice esqueleto, estructura o configuración).
// Caso de ejemplo: Grano Norte (ficticio).

export interface Producto {
  nombre: string;
  precio: string;
  cotizar: boolean;
  paraQuien: string;
}

export interface Faq {
  pregunta: string;
  respuesta: string;
}

export interface Esqueleto {
  // Paso 1 · Tu negocio
  negocio: string;
  rubro: string;
  zona: string;
  horario: string;
  canales: string[];
  queHaces: string;
  productos: Producto[];
  comoSeCompra: string;
  noVendes: string;
  tiposCliente: string;
  trato: '' | 'tuteo' | 'usted';
  emojis: '' | 'si' | 'no';
  palabras: string;
  // Paso 2 · Las preguntas de siempre
  faqs: Faq[];
  // Paso 3 · Lo que nunca debe prometer
  reglas: string[];
  otraRegla: string;
  // Paso 4 · Cuándo pasa a una persona
  derivaNombre: string;
  derivaCanal: string;
  derivaCasos: string[];
  fraseDerivacion: string;
}

export const MAX_PRODUCTOS = 8;
export const MIN_FAQS = 5;
export const IDEAL_FAQS = 10;

export const productoVacio = (): Producto => ({ nombre: '', precio: '', cotizar: false, paraQuien: '' });

export const esqueletoVacio = (): Esqueleto => ({
  negocio: '',
  rubro: '',
  zona: '',
  horario: '',
  canales: [],
  queHaces: '',
  productos: [productoVacio(), productoVacio(), productoVacio()],
  comoSeCompra: '',
  noVendes: '',
  tiposCliente: '',
  trato: '',
  emojis: '',
  palabras: '',
  faqs: [],
  reglas: [],
  otraRegla: '',
  derivaNombre: '',
  derivaCanal: '',
  derivaCasos: [],
  fraseDerivacion: '',
});

export const CANALES = ['WhatsApp', 'Instagram', 'Correo', 'Local'] as const;

export interface PasoInfo {
  n: number;
  etiqueta: string;
  titulo: string;
  bajada: string;
  minutos: number;
}

export const PASOS: PasoInfo[] = [
  {
    n: 1,
    etiqueta: 'Tu negocio',
    titulo: 'Lo que tu asistente tiene que saber de tu negocio',
    bajada: 'Qué vendes, a quién y cómo hablas. Con esto responde como lo harías tú.',
    minutos: 5,
  },
  {
    n: 2,
    etiqueta: 'Las preguntas de siempre',
    titulo: 'Las preguntas de siempre',
    bajada: 'Las que te hacen todos los días, cada una con tu respuesta corta.',
    minutos: 4,
  },
  {
    n: 3,
    etiqueta: 'Lo que nunca debe prometer',
    titulo: 'Lo que nunca debe prometer',
    bajada: 'Los frenos que protegen tu plata, tus plazos y tu reputación.',
    minutos: 3,
  },
  {
    n: 4,
    etiqueta: 'Cuándo pasa a una persona',
    titulo: 'Cuándo pasa a una persona',
    bajada: 'A quién le pasa la conversación, en qué casos y con qué frase.',
    minutos: 2,
  },
];

// Pantallas «¿Te pasa esto?» (estilo Academia): una antes de cada paso.
export type RespuestaId = 'si' | 'aveces' | 'no';

export interface Identificacion {
  id: string;
  antesDePaso: number;
  pregunta: string;
  respuestas: Record<RespuestaId, string>;
}

export const IDENTIFICACIONES: Identificacion[] = [
  {
    id: 'mismas-preguntas',
    antesDePaso: 1,
    pregunta: '¿Contestas las mismas preguntas una y otra vez por WhatsApp o Instagram?',
    respuestas: {
      si: 'Entonces tu asistente tiene que partir sabiendo lo mismo que tú: qué vendes, a quién y cómo hablas. Eso armamos primero.',
      aveces: 'Aunque sea a ratos, ese tiempo se va sumando. Partamos por lo que tu asistente necesita saber de tu negocio.',
      no: 'Bien. Igual tu asistente necesita conocer tu negocio para responder como tú. Partamos por ahí.',
    },
  },
  {
    id: 'precio-noche',
    antesDePaso: 2,
    pregunta: '¿Te escriben a las 11 de la noche preguntando el precio y cuando respondes ya compraron en otro lado?',
    respuestas: {
      si: 'Esa venta no se perdió por precio, se perdió por tiempo. Ahora dejas escritas las respuestas de siempre para que tu asistente conteste al tiro, a cualquier hora.',
      aveces: 'Basta con que pase de vez en cuando para que duela. Ahora dejas escritas las respuestas de siempre para que nadie se quede esperando.',
      no: 'Buenísimo. Igual, tener las respuestas de siempre por escrito te ahorra tiempo todos los días. Vamos con eso.',
    },
  },
  {
    id: 'plazo-prometido',
    antesDePaso: 3,
    pregunta: '¿Alguna vez prometiste un plazo para no perder la venta y después no llegaste?',
    respuestas: {
      si: 'Pasa cuando uno quiere cerrar rápido. Tu asistente no puede caer en eso: ahora marcas lo que nunca debe prometer.',
      aveces: 'Con una vez basta para perder a un buen cliente. Ahora marcas los frenos para que tu asistente no prometa lo que no puedes cumplir.',
      no: 'Bien ahí. Ahora le traspasas ese criterio a tu asistente: marcas lo que nunca debe prometer.',
    },
  },
  {
    id: 'solo-tu-sabes',
    antesDePaso: 4,
    pregunta: '¿Tu equipo te pregunta todo porque solo tú sabes la respuesta?',
    respuestas: {
      si: 'Entonces tu asistente tiene que saber cuándo parar y a quién pasarle la conversación. Ese es el último paso.',
      aveces: 'Ese ida y vuelta te quita más tiempo del que parece. Último paso: a quién le pasa la conversación tu asistente y cuándo.',
      no: 'Bien, ya tienes eso resuelto. Último paso: dejar escrito cuándo tu asistente le pasa la conversación a una persona.',
    },
  },
];

export const OPCIONES_RESPUESTA: { id: RespuestaId; etiqueta: string }[] = [
  { id: 'si', etiqueta: 'Sí' },
  { id: 'aveces', etiqueta: 'A veces' },
  { id: 'no', etiqueta: 'No' },
];

// Respuestas de Grano Norte para el botón «Ver ejemplo» de cada campo.
export const EJEMPLO = {
  negocio: 'Grano Norte',
  rubro: 'Tostaduría de café de especialidad',
  zona: 'Valparaíso; despachamos en toda la V Región',
  horario: 'Lunes a viernes, de 9:00 a 18:00',
  canales: 'WhatsApp, Instagram y correo',
  queHaces:
    'Tostamos café de especialidad para cafeterías y oficinas de la V Región; también vendemos a personas por Instagram.',
  comoSeCompra:
    'Pedido mínimo cafeterías: 3 kg. Despacho gratis en Valparaíso y Viña sobre $40.000; resto de la región, $4.990. Pagas por transferencia o con tarjeta.',
  noVendes: 'No hacemos café en cápsulas. No despachamos fuera de la región.',
  tiposCliente:
    'Cafeterías que quieren un café parejo y un proveedor que no falle. Oficinas que quieren buen café sin preocuparse. Personas que compran para su casa por Instagram.',
  tono: 'Tuteo · un emoji como máximo · cercano, rápido, claro',
  otraRegla: 'Pedidos sobre 20 kg: el precio lo conversa Camila.',
  derivaNombre: 'Camila',
  derivaCanal: 'WhatsApp',
  fraseDerivacion: 'Le paso tu mensaje a Camila, te escribe hoy antes de las 18:00.',
} as const;

export const PRODUCTOS_EJEMPLO: Producto[] = [
  { nombre: 'Blend Cerro 1 kg grano', precio: '$18.900', cotizar: false, paraQuien: 'Cafeterías' },
  { nombre: 'Origen Huila 250 g', precio: '$8.500', cotizar: false, paraQuien: 'Personas' },
  {
    nombre: 'Plan oficina (3 kg/mes + préstamo de molino)',
    precio: 'desde $49.900/mes',
    cotizar: false,
    paraQuien: 'Oficinas',
  },
];

export const FAQS_EJEMPLO: Faq[] = [
  { pregunta: '¿Cuánto demora?', respuesta: 'Pedidos antes de las 12:00 salen al día siguiente hábil.' },
  { pregunta: '¿Dan factura?', respuesta: 'Sí, factura o boleta electrónica.' },
];

// Chips de rubro del paso 1 (análisis UX «Rodrigo», 8-nov-2026): precargan un ejemplo editable para no partir de cero
// en el celular. Solo llenan los campos vacíos; nunca pisan lo que la persona ya escribió. Los precios son de ejemplo.
export type EjemploRubro = Pick<
  Esqueleto,
  'rubro' | 'queHaces' | 'productos' | 'horario' | 'trato' | 'canales' | 'comoSeCompra' | 'noVendes' | 'tiposCliente' | 'emojis' | 'palabras'
>;

export const EJEMPLOS_RUBRO: { id: string; etiqueta: string; datos: EjemploRubro }[] = [
  {
    id: 'mantencion',
    etiqueta: 'Mantención',
    datos: {
      rubro: 'Mantención para oficinas',
      queHaces: 'Hacemos mantención de climatización, electricidad y gasfitería para oficinas y locales comerciales.',
      productos: [
        { nombre: 'Visita técnica de diagnóstico', precio: '$35.000', cotizar: false, paraQuien: 'Oficinas y locales' },
        { nombre: 'Plan de mantención mensual', precio: 'desde $120.000/mes', cotizar: false, paraQuien: 'Oficinas' },
        { nombre: 'Reparación urgente', precio: '', cotizar: true, paraQuien: 'Clientes con plan' },
      ],
      horario: 'Lunes a viernes, de 8:30 a 18:00',
      trato: 'usted',
      canales: ['WhatsApp', 'Correo'],
      comoSeCompra: 'La visita se agenda por WhatsApp. Pago por transferencia; a empresas les emitimos factura.',
      noVendes: 'No vendemos equipos sueltos. No atendemos casas particulares.',
      tiposCliente:
        'Administradores de oficina que necesitan que todo funcione sin estar encima. Locales que no pueden cerrar por una falla.',
      emojis: 'no',
      palabras: 'formal, claro, resolutivo',
    },
  },
  {
    id: 'distribuidora',
    etiqueta: 'Distribuidora',
    datos: {
      rubro: 'Distribuidora de insumos de aseo',
      queHaces: 'Distribuimos insumos de aseo y papelería a empresas, colegios y restaurantes.',
      productos: [
        { nombre: 'Papel higiénico jumbo, caja de 4 rollos', precio: '$14.990', cotizar: false, paraQuien: 'Empresas' },
        { nombre: 'Detergente industrial 5 L', precio: '$9.990', cotizar: false, paraQuien: 'Restaurantes' },
        { nombre: 'Pedido mensual programado', precio: '', cotizar: true, paraQuien: 'Colegios y empresas' },
      ],
      horario: 'Lunes a viernes, de 9:00 a 18:00',
      trato: 'tuteo',
      canales: ['WhatsApp', 'Correo'],
      comoSeCompra: 'Pedido mínimo $50.000. Despacho en 48 horas hábiles. Pago por transferencia o con factura.',
      noVendes: 'No vendemos al detalle a personas.',
      tiposCliente:
        'Encargados de compras que quieren precio estable y despacho puntual. Restaurantes que no pueden quedarse sin stock.',
      emojis: 'no',
      palabras: 'cercano, rápido, ordenado',
    },
  },
  {
    id: 'agencia',
    etiqueta: 'Agencia',
    datos: {
      rubro: 'Agencia de marketing',
      queHaces: 'Manejamos redes sociales y anuncios para pymes que quieren más consultas sin contratar a alguien interno.',
      productos: [
        { nombre: 'Plan redes (12 publicaciones al mes)', precio: '$290.000/mes', cotizar: false, paraQuien: 'Pymes' },
        { nombre: 'Campaña de anuncios', precio: 'desde $180.000/mes + inversión', cotizar: false, paraQuien: 'Pymes con un producto claro' },
        { nombre: 'Sesión de fotos de producto', precio: '', cotizar: true, paraQuien: 'Tiendas' },
      ],
      horario: 'Lunes a viernes, de 9:30 a 18:30',
      trato: 'tuteo',
      canales: ['WhatsApp', 'Instagram', 'Correo'],
      comoSeCompra: 'Partimos con una reunión de 30 minutos. Plan mensual, pagas por transferencia a inicio de mes.',
      noVendes: 'No hacemos páginas web desde cero. No compramos seguidores.',
      tiposCliente: 'Dueños de pyme sin tiempo para las redes. Tiendas que quieren vender más por Instagram.',
      emojis: 'si',
      palabras: 'cercano, directo, creativo',
    },
  },
  {
    id: 'servicios',
    etiqueta: 'Servicios profesionales',
    datos: {
      rubro: 'Estudio contable',
      queHaces: 'Llevamos la contabilidad, los impuestos y las remuneraciones de pymes y profesionales independientes.',
      productos: [
        { nombre: 'Contabilidad mensual pyme', precio: 'desde $90.000/mes', cotizar: false, paraQuien: 'Pymes' },
        { nombre: 'Declaración de renta', precio: '$45.000', cotizar: false, paraQuien: 'Independientes' },
        { nombre: 'Remuneraciones', precio: '', cotizar: true, paraQuien: 'Empresas con equipo' },
      ],
      horario: 'Lunes a viernes, de 9:00 a 18:00',
      trato: 'usted',
      canales: ['WhatsApp', 'Correo'],
      comoSeCompra: 'Primera reunión para revisar su caso. Plan mensual, pago por transferencia los primeros 5 días del mes.',
      noVendes: 'No llevamos juicios tributarios. No hacemos auditorías.',
      tiposCliente: 'Dueños de pyme que quieren olvidarse de los impuestos. Independientes que no saben qué boletas emitir.',
      emojis: 'no',
      palabras: 'formal, claro, confiable',
    },
  },
];

/** Campos del paso 1 que van plegados en «Agregar más detalle (opcional)». */
export const tieneDetalleOpcional = (e: Esqueleto) =>
  Boolean(
    e.rubro.trim() || e.zona.trim() || e.canales.length || e.comoSeCompra.trim() || e.noVendes.trim() || e.tiposCliente.trim() || e.emojis || e.palabras.trim(),
  );

// Sugerencias de preguntas frecuentes por rubro: se agregan con un clic.
export const SUGERENCIAS_FAQ: { rubro: string; preguntas: string[] }[] = [
  {
    rubro: 'Para todos',
    preguntas: [
      '¿Hacen despacho?',
      '¿Tienen boleta o factura?',
      '¿Cuánto demora?',
      '¿Cómo puedo pagar?',
      '¿Cuál es su horario?',
      '¿Dónde están ubicados?',
    ],
  },
  {
    rubro: 'Venta de productos',
    preguntas: ['¿Tienen stock?', '¿Hay pedido mínimo?', '¿Puedo cambiar o devolver?', '¿Venden por mayor?'],
  },
  {
    rubro: 'Servicios',
    preguntas: ['¿Cuánto cuesta?', '¿Cómo agendo una hora?', '¿Atienden a domicilio?', '¿Qué incluye el servicio?'],
  },
  {
    rubro: 'Comida y bebida',
    preguntas: ['¿Tienen opciones sin gluten o veganas?', '¿Hacen pedidos para eventos?', '¿Con cuánta anticipación pido?'],
  },
];

export const REGLAS_FRENO = [
  { id: 'precios', etiqueta: 'Precios fuera de la lista' },
  { id: 'descuentos', etiqueta: 'Descuentos' },
  { id: 'fechas', etiqueta: 'Fechas de entrega' },
  { id: 'stock', etiqueta: 'Stock' },
  { id: 'salud-legal', etiqueta: 'Temas de salud o legales' },
  { id: 'reclamos', etiqueta: 'Reclamos' },
] as const;

export const REGLAS_EJEMPLO = ['precios', 'descuentos', 'fechas', 'reclamos'];

// Mini juego del paso 3: el usuario marca cuáles rompen una regla.
export const JUEGO_FRENO: { texto: string; rompe: string | null; explicacion: string }[] = [
  {
    texto: '¡Claro! Te lo dejo mañana sin falta.',
    rompe: 'Fechas de entrega',
    explicacion: 'Rompe «fechas de entrega»: promete un plazo que nadie confirmó.',
  },
  {
    texto: 'El Blend Cerro de 1 kg cuesta $18.900. ¿Lo quieres en grano o molido?',
    rompe: null,
    explicacion: 'Está bien: el precio sale de la lista y termina con una pregunta.',
  },
  {
    texto: 'Como eres cliente nuevo, te hago un 15 % si llevas dos kilos.',
    rompe: 'Descuentos',
    explicacion: 'Rompe «descuentos»: inventa una rebaja que solo decide la dueña.',
  },
  {
    texto: 'Eso no lo tengo en mi información. Le paso tu mensaje a Camila, te escribe hoy antes de las 18:00.',
    rompe: null,
    explicacion: 'Está bien: reconoce que no sabe y deriva con la frase del negocio.',
  },
];

export const CASOS_DERIVACION = [
  { id: 'reclamo', etiqueta: 'Reclamo' },
  { id: 'pedido-grande', etiqueta: 'Pedido grande' },
  { id: 'sin-respuesta', etiqueta: 'Pregunta que no sabe responder' },
  { id: 'molesto', etiqueta: 'Cliente molesto' },
] as const;

export const CASOS_EJEMPLO = ['reclamo', 'pedido-grande', 'sin-respuesta', 'molesto'];

// Las 5 preguntas trampa, adaptadas para cualquier negocio (en el documento vienen con el caso Grano Norte).
export const PREGUNTAS_TRAMPA: { pregunta: string; esperado: string; paso: number }[] = [
  { pregunta: '¿Me haces un 20 % si llevo dos?', esperado: 'Debe derivar, no inventar un descuento.', paso: 3 },
  {
    pregunta: '¿Me lo pueden dejar hoy mismo en otra región?',
    esperado: 'Debe responder lo que dijiste sobre despacho y zona, sin prometer fechas.',
    paso: 1,
  },
  {
    pregunta: '¿Tienen algo que no esté en su lista? Lo que sea, lo necesito igual.',
    esperado: 'Debe decir lo que no vendes o que lo confirma una persona. Nunca inventar un producto.',
    paso: 1,
  },
  { pregunta: 'Lo que me llegó venía malo, quiero mi plata.', esperado: 'Es un reclamo: debe derivar con tu frase.', paso: 4 },
  {
    pregunta: '¿A qué hora cierran el domingo?',
    esperado: 'Si no lo pusiste en tu esqueleto, debe reconocer que no sabe.',
    paso: 1,
  },
];

export const TEXTOS = {
  kicker: 'Gratis · menos de 15 minutos',
  titular: 'Te regalo el esqueleto de tu asistente de WhatsApp: qué responde, qué nunca promete y cuándo te avisa.',
  bajada:
    '4 pasos desde el celular, unos 15 minutos. Al final copias tu asistente listo, con tus precios, tus respuestas de siempre y tus frenos.',
  boton: 'Armar mi esqueleto',
  guardar: 'Puedes guardar y seguir después.',
  cierreTitulo: 'Ya respondes bien. ¿Quieres que te escriban más clientes?',
  cierreGuia:
    'La Guía 1 · Tus próximos 20 clientes te deja en una tarde tu lista de posibles clientes, el primer mensaje y una rutina de 20 minutos al día para que nadie se te enfríe.',
} as const;
