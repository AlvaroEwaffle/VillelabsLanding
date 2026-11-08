// Página de venta de la Guía 1 (/guia, 8-nov-2026). Lo que incluye se describe desde contenido-v2.ts
// y los componentes de components/productos/guia/v2: si la guía cambia, revisar estos textos.
// Venta en Hotmart (producto 8918629): CLP 14.990, pago único o 12 cuotas, garantía de 7 días.

export const PRECIO_GUIA = {
  clp: 14990,
  texto: '$14.990',
  cuotas: '12 cuotas de $1.249',
  garantiaDias: 7,
} as const;

export const PROBLEMAS = [
  'Prospectas un lunes con ganas y el jueves ya no sabes a quién le escribiste.',
  'Mandas el catálogo en PDF y casi nadie responde.',
  'Si no te contestan, no vuelves a escribir.',
  'Vendes cuando llega un referido; el resto del mes, esperas.',
];

export const PARA_QUIEN_GUIA = {
  si: [
    'Tienes una pyme o un equipo de 3 a 15 personas y las ventas dependen de ti.',
    'Vendes por WhatsApp, correo o LinkedIn, uno a uno.',
    'Quieres clientes nuevos todas las semanas, no solo cuando alguien te recomienda.',
    'Puedes darle una tarde a armar el sistema y 20 minutos al día a usarlo.',
  ],
  no: [
    'Buscas mandar mensajes masivos o comprar bases de datos: aquí se escribe uno a uno.',
    'Quieres que alguien prospecte por ti sin que tú le escribas a nadie.',
    'Ya tienes una rutina diaria de prospección, con seguimientos y la planilla al día.',
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
    a: 'Sí. La guía está hecha para leerse y usarse en el celular. Para llenar tu planilla de 20 prospectos es más cómodo un computador, pero puedes hacerlo también desde el teléfono.',
  },
  {
    q: '¿Cuánto tiempo me toma?',
    a: 'Entre 2,5 y 3 horas para el diagnóstico y las 6 partes: lo haces en una tarde o lo repartes en la semana. Después viene la prueba real: 20 minutos al día durante 5 días hábiles.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'No. La planilla la armas dentro de la guía y la bajas en Excel o la pasas a Google Sheets. Si quieres ayuda para redactar, cada parte trae instrucciones listas para pegar en ChatGPT o Claude; si prefieres, lo haces a mano con las plantillas.',
  },
  {
    q: '¿Sirve para mi rubro?',
    a: 'El caso que recorre la guía es una tostaduría que le vende a cafeterías y oficinas, pero el método sirve para cualquier negocio que pueda encontrar a sus clientes y escribirles uno a uno: servicios, distribución, agencias o profesionales independientes.',
  },
  {
    q: '¿Puedo pagar en cuotas?',
    a: `Sí. Son ${PRECIO_GUIA.texto} en un solo pago o en ${PRECIO_GUIA.cuotas}, en el pago seguro de Hotmart.`,
  },
  {
    q: '¿Y si no me sirve?',
    a: `Tienes ${PRECIO_GUIA.garantiaDias} días de garantía. Si en ese plazo sientes que la guía no es para ti, pides la devolución desde Hotmart y te devuelven el total.`,
  },
];
