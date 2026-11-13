// Página de venta de la Guía 1 (/guia, 8-nov-2026). Lo que incluye se describe desde contenido-v2.ts
// y los componentes de components/productos/guia/v2: si la guía cambia, revisar estos textos.
// Venta en Hotmart (producto 8918629): CLP 14.990, pago único o 12 cuotas, garantía de 7 días.
// v1.2 (8-nov-2026): copy con las palabras del comprador (investigacion/demanda-mercado-2026-11-08.html): «clientes
// nuevos», «tu primer CRM», «sin envío masivo»; la IA es ayuda, no gancho. Sin cupón ni cuenta regresiva.

export const PRECIO_GUIA = {
  clp: 14990,
  texto: '$14.990',
  cuotas: '12 cuotas de $1.249',
  garantiaDias: 7,
} as const;

export const PROBLEMAS = [
  'Sales a buscar clientes un lunes con ganas y el jueves ya no sabes a quién le escribiste.',
  'Mandas el catálogo en PDF y casi nadie responde.',
  'Si no te contestan, no vuelves a escribir.',
  'Vendes cuando llega un referido; el resto del mes, esperas.',
];

export const PARA_QUIEN_GUIA = {
  si: [
    'Tienes una pyme o un equipo de 3 a 15 personas y las ventas dependen de ti.',
    'Vendes un servicio o productos a otras empresas o profesionales, por WhatsApp, correo o LinkedIn.',
    'Hoy vives de referidos y quieres clientes nuevos todas las semanas, sin esperar a que alguien te recomiende.',
    'Puedes darle una tarde a armar el sistema y 20 minutos al día a usarlo.',
  ],
  no: [
    'Buscas mandar mensajes masivos, automatizar envíos o comprar bases de datos: aquí se escribe uno a uno.',
    'Quieres que alguien salga a buscar clientes por ti sin que tú le escribas a nadie.',
    'Le vendes a consumidores finales por catálogo y redes: la guía está pensada para venderle uno a uno a empresas o profesionales.',
    'Ya tienes una rutina diaria para buscar clientes, con seguimientos y la planilla al día.',
  ],
};

export const FAQ_GUIA: { q: string; a: string }[] = [
  {
    q: '¿Cómo accedo después de pagar?',
    a: 'Apenas se confirma el pago, Hotmart te manda un correo con el acceso. Desde ahí abres la guía y partes por el diagnóstico de 9 preguntas.',
  },
  {
    q: '¿Se guarda mi avance?',
    a: 'Sí, en el navegador donde usas la guía: puedes cerrarla y volver cuando quieras, y sigues donde quedaste. El avance no pasa solo a otro computador ni sobrevive si borras los datos del navegador, así que conviene descargar tu planilla en Excel cada vez que avances.',
  },
  {
    q: '¿Sirve en el celular?',
    a: 'Sí. La guía está hecha para leerse y usarse en el celular. Para llenar tu planilla de 20 posibles clientes es más cómodo un computador, pero puedes hacerlo también desde el teléfono.',
  },
  {
    q: '¿Cuánto tiempo me toma?',
    a: 'Entre 2,5 y 3 horas para el diagnóstico y las 6 partes: lo haces en una tarde o lo repartes en la semana. Después viene la prueba real: 20 minutos al día durante 5 días hábiles, que puedes hacer desde el celular, entre una cosa y otra.',
  },
  {
    q: '¿Me pueden bloquear el WhatsApp?',
    a: 'La guía está hecha para que no pase. No mandas nada masivo: escribes uno a uno, a mano. Y por WhatsApp solo le escribes a quien ya te conoce o te dio su número (clientes, referidos, tu agenda); a los demás, el primer mensaje va por correo, LinkedIn o Instagram, como pide la política de WhatsApp Business.',
  },
  {
    q: 'Ya lo intenté y nadie me respondió. ¿Por qué esto sería distinto?',
    a: 'Casi siempre pasa por mandar el catálogo o el mismo mensaje a todos, y por no volver a escribir. La guía te muestra la diferencia con ejemplos de «así no» y «así sí», y te deja los seguimientos con fecha: casi la mitad de las respuestas llega en un seguimiento, no en el primer mensaje.',
  },
  {
    q: '¿Necesito un CRM?',
    a: 'No. La planilla de la guía es tu primer CRM: anotas a cada posible cliente con su estado, su próximo paso y su fecha, y la usas gratis en Google Sheets o en Excel.',
  },
  {
    q: '¿Tengo que usar inteligencia artificial?',
    a: 'No. Todo funciona a mano, con las plantillas. Si quieres ayuda, cada parte trae instrucciones listas para pegar en Claude o ChatGPT: te ayudan a redactar el borrador y tú lo revisas y decides qué mandas.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'No. La planilla la armas dentro de la guía y la bajas en Excel o la pasas a Google Sheets. No hay nada que instalar.',
  },
  {
    q: '¿Sirve para mi rubro?',
    a: 'El caso que recorre la guía es una tostaduría que le vende a cafeterías y oficinas, pero el método sirve para cualquier negocio que pueda encontrar a sus clientes y escribirles uno a uno: servicios, distribución, agencias o profesionales independientes. La parte 4 trae el mismo mensaje escrito para una distribuidora, una empresa de mantención, una agencia y una oficina de contabilidad.',
  },
  {
    q: '¿Puedo pagar en cuotas?',
    a: `Sí. Son ${PRECIO_GUIA.texto} en un solo pago o en ${PRECIO_GUIA.cuotas}, en el pago seguro de Hotmart. Para dimensionarlo: basta un cliente nuevo para que la guía se pague varias veces.`,
  },
  {
    q: '¿Y si no me sirve?',
    a: `Tienes ${PRECIO_GUIA.garantiaDias} días de garantía. Si en ese plazo sientes que la guía no es para ti, pides la devolución desde Hotmart y te devuelven el total.`,
  },
];

// Testimonios: hueco preparado, vacío a propósito. Solo testimonios reales, con nombre, negocio y permiso escrito
// (la idea es pedirlos a quienes hagan la prueba de 5 días). Mientras esté vacío, la página no muestra la sección.
export type Testimonio = { nombre: string; negocio: string; texto: string; resultado?: string };
export const TESTIMONIOS: Testimonio[] = [];
