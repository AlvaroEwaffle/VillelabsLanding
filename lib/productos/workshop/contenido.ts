import { LINKS } from '@/lib/productos/links';
import { CURSO, MODULOS } from '@/lib/productos/curso/curso';

// Textos del Workshop 1, tomados del documento aprobado
// VPM/Villelabs/productos-digitales/contenido-primeros-productos.html (Producto 2 y Entrada B).

export const PROMESA =
  'En 45 minutos te muestro cómo el esqueleto de tu asistente se convierte en uno que responde por WhatsApp las preguntas de siempre, sin inventar nada y pasándote lo importante.';

export const LO_QUE_TE_LLEVAS = [
  'Saber qué mensajes puede responder un asistente y cuáles siempre van a una persona.',
  'Ver tu esqueleto funcionando: primero en Claude y luego en un chatbot de WhatsApp real.',
  'Salir con tus reglas de freno y tu frase de derivación escritas.',
];

export const AGENDA = [
  { min: '0–8', titulo: 'El problema y lo que cuesta', texto: 'Cuántos mensajes se quedan sin responder y cuánto tiempo se va en contestar lo mismo.' },
  { min: '8–15', titulo: 'Las 3 piezas de un asistente que no se manda solo', texto: 'El esqueleto, las reglas de freno y el canal.' },
  { min: '15–28', titulo: 'Demo en vivo', texto: 'El esqueleto de un negocio de ejemplo, primero en Claude y después respondiendo por WhatsApp.' },
  { min: '28–33', titulo: 'Tu turno', texto: 'Escribes la pregunta que más te hacen y la respondemos en vivo.' },
  { min: '33–45', titulo: 'Cuándo pasa a una persona y preguntas', texto: 'Las reglas de derivación, los 4 errores comunes y tus dudas.' },
];

export const PREGUNTAS_FRECUENTES = [
  { q: '¿Cuánto cuesta?', a: 'Nada. Es gratis, en vivo por YouTube y dura 45 minutos: 30 de contenido y 15 de preguntas.' },
  { q: '¿Dónde es?', a: 'En un directo de YouTube. Te mandamos el link por correo y WhatsApp antes de empezar; no necesitas instalar nada y tus preguntas las escribes en el chat.' },
  { q: '¿Y si no puedo ir en vivo?', a: 'Inscríbete igual: al día siguiente te llega la grabación.' },
  { q: '¿Tengo que armar mi esqueleto antes?', a: 'No es obligatorio. Si lo armas antes, lo ves funcionando en vivo; si no, lo recibes igual al final.' },
  { q: '¿Necesito saber de tecnología?', a: 'No. Todo se muestra paso a paso con un negocio de ejemplo, y tú lo repites con el tuyo.' },
];

export const RANGOS_MENSAJES = ['Menos de 10', 'Entre 10 y 30', 'Entre 30 y 60', 'Más de 60'];

// ---------------------------------------------------------------------------
// Caso hilo: Grano Norte (ficticio)
// ---------------------------------------------------------------------------

export const ESQUELETO_GRANO_NORTE = {
  basico: 'Tostamos café de especialidad para cafeterías y oficinas de la V Región; también vendemos a personas por Instagram.',
  productos: [
    { nombre: 'Blend Cerro 1 kg grano', precio: '$18.900', para: 'cafeterías' },
    { nombre: 'Origen Huila 250 g', precio: '$8.500', para: 'personas' },
    { nombre: 'Plan oficina (3 kg/mes + préstamo de molino)', precio: 'desde $49.900/mes', para: 'oficinas' },
  ],
  compra: 'Pedido mínimo cafeterías: 3 kg. Despacho gratis en Valparaíso y Viña sobre $40.000; resto de la región, $4.990.',
  noVende: 'No vendemos cápsulas ni despachamos fuera de la V Región.',
  faq: [
    { q: '¿Cuánto demora?', a: 'Pedidos antes de las 12:00 salen al día siguiente hábil.' },
    { q: '¿Dan factura?', a: 'Sí, factura o boleta electrónica.' },
  ],
  tono: 'Tuteo, cercano y claro. Máximo 3 frases. Un emoji como máximo.',
  reglas: [
    'No inventes precios, descuentos ni productos.',
    'No prometas fechas distintas a las de las preguntas frecuentes.',
    'Si no sabes algo, dilo y deriva.',
    'Reclamos, pedidos sobre 20 kg o clientes molestos: deriva siempre.',
  ],
  derivacion: 'Le paso tu mensaje a Camila, te escribe hoy antes de las 18:00.',
};

export const PREGUNTA_TRAMPA = 'Hola! me hacen descuento si llevo 2 kilos?';
// Respuesta «sin reglas»: ilustra lo que dice el documento (el asistente regala un 20 % de descuento).
export const RESPUESTA_SIN_REGLAS = '¡Hola! Claro, llevando 2 kilos te dejo un 20 % de descuento. ¿Te lo despacho mañana?';
export const RESPUESTA_CON_REGLAS =
  '¡Hola! Los descuentos los ve Camila directamente. Le paso tu mensaje y te escribe hoy antes de las 18:00. ¿Es para cafetería u oficina?';

// Curso v1.1 (8-nov-2026): sale de lib/productos/curso/curso.ts para no desalinearse.
export const MODULOS_CURSO = MODULOS.map((m) => ({ n: m.numero, area: m.area, titulo: m.titulo }));

// ---------------------------------------------------------------------------
// Notas del presentador (tecla N): guion del minuto a minuto, por diapositiva.
// ---------------------------------------------------------------------------

export type Nota = { bloque: string; guion: string[]; indicaciones?: string[] };

export const NOTAS: Nota[] = [
  {
    bloque: '0–3 · Bienvenida',
    guion: ['«Bienvenidos. En 45 minutos vas a ver tu negocio respondiendo solo las preguntas de siempre.»'],
  },
  {
    bloque: '0–3 · Por qué hago esto',
    guion: [
      '«Antes de partir, por qué hago esto, y la verdad nomás. Uno: me gusta. Dos: llevo años trabajando en esto y lo que les muestro lo aprendí haciéndolo. Tres: vendo productos que resuelven justamente esto. Hoy igual se llevan todo gratis, y al final les cuento qué hay si quieren seguir.»',
    ],
    indicaciones: ['Máximo 1 minuto. Dilo mirando a cámara, sin leer.'],
  },
  {
    bloque: '0–3 · Encuesta',
    guion: ['«Antes, una pregunta en el chat: ¿cuántos mensajes tienes hoy sin responder? Pon solo el número.»'],
    indicaciones: ['Lee 3 o 4 números en voz alta y saca el promedio: es el ancla de todo el workshop.'],
  },
  {
    bloque: '3–8 · El problema y lo que cuesta',
    guion: [
      '«Camila, de Grano Norte, recibe 40 mensajes al día. Seis de cada diez son la misma pregunta: precio, despacho, horario. Cada respuesta le toma 2 minutos, así que son 48 minutos diarios en lo mismo. Y el mensaje que contesta tarde, muchas veces ya le compró a otro.»',
    ],
  },
  {
    bloque: '3–8 · Los 3 tipos de mensaje',
    guion: [],
    indicaciones: [
      'Repetidos: responde el asistente.',
      'Con decisión (precio especial, fecha, reclamo): responde una persona.',
      'Nuevos: el asistente avisa y deriva.',
    ],
  },
  {
    bloque: '8–15 · Las 3 piezas',
    guion: ['«La mayoría arma el bot al revés: parte por la herramienta. Nosotros partimos por el esqueleto. Con un buen esqueleto, la herramienta da casi lo mismo.»'],
    indicaciones: [
      'Encuesta rápida: «¿Ya armaste tu esqueleto?» Sí / A medias / No.',
      'A los «No»: link del esqueleto en el chat, lo arman durante la demo.',
    ],
  },
  {
    bloque: '15 · Lo que vamos a hacer ahora',
    guion: [],
    indicaciones: [
      'Anuncia los 4 pasos de la demo en orden: el esqueleto → probarlo en Claude → preguntas trampa sin y con reglas → WhatsApp en vivo.',
      'A quien no armó su esqueleto: link en el chat, lo arma durante la demo.',
    ],
  },
  {
    bloque: '15 · Pase a la demo en vivo',
    guion: [],
    indicaciones: ['Cambia a tu pantalla: comparte la pantalla y abre el esqueleto de Grano Norte.', 'Las 3 diapositivas siguientes quedan de respaldo si falla algo en vivo.'],
  },
  {
    bloque: '15–28 · Demo, paso 1 y 2',
    guion: [],
    indicaciones: [
      'Paso 1 (3 min): el esqueleto de Grano Norte en pantalla, paso por paso, mostrando qué hace cada parte.',
      'Paso 2 (3 min): pega la configuración del asistente en Claude y haz 3 preguntas normales. Responde bien.',
    ],
  },
  {
    bloque: '15–28 · Demo, paso 3 (el momento «ajá»)',
    guion: [],
    indicaciones: [
      'Paso 3 (3 min): las preguntas trampa. Primero con el esqueleto sin reglas de freno: el asistente regala un 20 % de descuento.',
      'Luego con reglas: deriva. Este contraste es el momento «ajá» del workshop.',
    ],
  },
  {
    bloque: '15–28 · Demo, paso 4 (WhatsApp en vivo)',
    guion: [],
    indicaciones: [
      'Paso 4 (4 min): el mismo esqueleto cargado en el chatbot de WhatsApp de Fidelidapp.',
      'Escribe desde tu celular (pantalla compartida) y que se vea llegar la respuesta.',
      'Luego manda un reclamo y muestra el aviso a Camila.',
    ],
  },
  {
    bloque: '28–33 · Tu turno',
    guion: ['«Escribe en el chat la pregunta que más te hacen tus clientes. Tomo tres y las respondemos en vivo con el asistente de Grano Norte para ver qué pasa cuando no sabe.»'],
    indicaciones: ['Las preguntas entran al asistente tal cual. Cuando algo no está en el esqueleto, muestra cómo reconoce que no sabe y deriva.'],
  },
  {
    bloque: '33–38 · Cuándo pasa a una persona',
    guion: [],
    indicaciones: [
      'Reglas de derivación: reclamos, pedidos grandes, clientes molestos, todo lo que no está en el esqueleto.',
      'Ejercicio de 2 minutos: cada uno escribe su frase de derivación en el chat («Le paso tu mensaje a ___, te escribe ___»). Comenta 2.',
    ],
  },
  {
    bloque: '33–38 · Los 4 errores comunes',
    guion: [],
    indicaciones: ['Esqueleto sin lista de lo que NO vendes · respuestas largas · prometer tiempos · no avisarle a nadie cuando deriva.'],
  },
  {
    bloque: '38–45 · Siguiente paso y cierre',
    guion: [
      '«Hoy vimos una pieza de tu negocio: la atención al cliente. Lo que les pasa a la mayoría es que cuando ordenan una, se les cae otra. En el curso "El sistema de tu negocio" armas tu primer CRM y ERP en Google Sheets: tus clientes, los pedidos, la atención, la cobranza y la caja en una sola planilla, con un tablero que miras los lunes. Para quienes están aquí, el precio especial dura 72 horas; el link está en el chat.»',
      '«Mañana te llega la grabación y la plantilla de reglas de freno.»',
    ],
    indicaciones: ['Pega el link del curso en el chat. Luego responde las preguntas del chat (41–45).'],
  },
];

// ---------------------------------------------------------------------------
// «Siguiente paso» (components/productos/SiguientePaso.tsx): pago = curso; gratis = ciclo de aprendizaje.
// ---------------------------------------------------------------------------

export const PASO_CURSO = {
  titulo: `Curso «${CURSO.nombre}»`,
  descripcion:
    'Tu primer CRM y ERP en Google Sheets: juntas tus clientes, pedidos, atención, cobranza y caja en una planilla, con un tablero que revisas los lunes. Cerca de 1 h 45 de lecciones y unas 7 a 8 horas de práctica, a tu ritmo. Sin pagar software.',
  href: LINKS.curso,
  cta: 'Ver el curso',
  evento: 'siguiente_paso_curso',
};

export const GRATIS_ESQUELETO = {
  titulo: 'Arma el esqueleto de tu asistente',
  descripcion: '4 pasos, 15 minutos. Llévalo listo y lo trabajamos en vivo con el tuyo.',
  href: LINKS.esqueleto,
  cta: 'Armar mi esqueleto',
  evento: 'siguiente_paso_esqueleto',
};

export const GRATIS_GRABACION = {
  titulo: 'Mira la grabación del último workshop',
  descripcion: 'Gratis y a tu ritmo, mientras llega el próximo en vivo.',
  href: LINKS.workshopGrabacion,
  cta: 'Ver la grabación',
  evento: 'siguiente_paso_grabacion',
};

export const GRATIS_PROXIMO_WORKSHOP = {
  titulo: 'Inscríbete al próximo en vivo',
  descripcion: '45 minutos, gratis. Traes tu esqueleto y lo vemos funcionando con tus preguntas.',
  href: LINKS.workshop,
  cta: 'Reservar mi cupo',
  evento: 'siguiente_paso_workshop',
};

export const PASOS_DEMO = [
  { n: 1, t: 'El esqueleto', d: 'El de Grano Norte en pantalla, paso por paso.' },
  { n: 2, t: 'Probarlo en Claude', d: 'Tres preguntas normales de clientes.' },
  { n: 3, t: 'Preguntas trampa', d: 'Primero sin reglas de freno, después con reglas.' },
  { n: 4, t: 'WhatsApp en vivo', d: 'La misma configuración respondiendo desde un celular.' },
];
