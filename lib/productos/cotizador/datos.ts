// /cotizador — «Cotiza tu agente» (borrador 12-nov-2026, preview; no está en producción).
// Contenido de las tarjetas, las tres preguntas y los ejemplos. Los ejemplos son mensajes de muestra rotulados
// «ejemplo»: no son clientes, cifras ni resultados reales. Precios: lib/precios.ts (espejo del price book).
//
// 12-nov-2026 (pedido de Álvaro): se suman Administración y Operación. «Cobranza y seguimiento» se pisaba con
// Administración (las dos recuerdan pagos), así que quedó fusionada dentro de Administración.

export type TrabajoId =
  | 'licitaciones'
  | 'prospeccion'
  | 'marketing'
  | 'whatsapp'
  | 'correo'
  | 'administracion'
  | 'operacion'
  | 'otro';

export type Linea = { de: 'agente' | 'cliente' | 'nota'; texto: string };

export interface Trabajo {
  id: TrabajoId;
  nombre: string;
  /** Versión corta para la tarjeta (2 columnas a 360 px). */
  corto: string;
  /** Qué hace cada día, completo (panel del ejemplo y resultado). */
  diario: string;
  /** Mensaje de muestra que entrega el agente. Vacío en «otro». */
  ejemplo: Linea[];
}

export const TRABAJOS: Trabajo[] = [
  {
    id: 'licitaciones',
    nombre: 'Licitaciones',
    corto: 'Revisa Mercado Público y te avisa las que calzan.',
    diario: 'Revisa Mercado Público cada mañana y te avisa las que calzan con tu rubro.',
    ejemplo: [
      { de: 'agente', texto: 'Buenos días. Hoy salieron 3 licitaciones que calzan con tu rubro (aseo industrial):' },
      { de: 'agente', texto: '1) Aseo de un liceo municipal, Región de Valparaíso · cierra el viernes.\n2) Aseo de oficinas de un servicio público, Santiago · cierra en 9 días.\n3) Limpieza de vidrios en altura, Rancagua · cierra en 12 días.' },
      { de: 'agente', texto: '¿Te armo la lista de documentos de la primera?' },
    ],
  },
  {
    id: 'prospeccion',
    nombre: 'Prospección',
    corto: 'Arma la lista de posibles clientes y el primer mensaje.',
    diario: 'Arma la lista de posibles clientes y deja escrito el primer mensaje.',
    ejemplo: [
      { de: 'agente', texto: 'Te dejé 10 posibles clientes nuevos en la planilla (clínicas dentales de Ñuñoa), con su contacto público.' },
      { de: 'agente', texto: 'Primer mensaje listo para la primera:\n«Hola, Carolina. Vi que su clínica abrió una segunda sede. Ayudo a clínicas a confirmar horas por WhatsApp para que no se pierdan pacientes. ¿Le muestro cómo funciona en 15 minutos?»' },
      { de: 'agente', texto: '¿Lo mando así o lo cambias?' },
    ],
  },
  {
    id: 'marketing',
    nombre: 'Marketing',
    corto: 'Programa tus publicaciones y te dice qué funcionó.',
    diario: 'Prepara y programa tus publicaciones y te reporta qué funcionó.',
    ejemplo: [
      { de: 'agente', texto: 'Quedaron programadas las 3 publicaciones de la semana: lunes, miércoles y viernes a las 20:00.' },
      { de: 'agente', texto: 'La semana pasada, la que más comentarios tuvo fue el antes y después. La de precios casi no tuvo.' },
      { de: 'agente', texto: '¿Hago otro antes y después para el viernes?' },
    ],
  },
  {
    id: 'whatsapp',
    nombre: 'Atención por WhatsApp',
    corto: 'Responde lo de siempre y te pasa lo que es para ti.',
    diario: 'Responde las preguntas de siempre y te pasa las que son para ti.',
    ejemplo: [
      { de: 'cliente', texto: 'Hola, ¿hacen despacho a Maipú?' },
      { de: 'agente', texto: 'Hola, sí despachamos a Maipú de lunes a viernes. ¿Me das tu dirección para decirte el valor?' },
      { de: 'nota', texto: 'A ti: una clienta pide precio especial por una compra grande. Esa te la dejo a ti.' },
    ],
  },
  {
    id: 'correo',
    nombre: 'Correo y agenda',
    corto: 'Ordena tu bandeja, deja borradores y agenda.',
    diario: 'Ordena tu bandeja, deja borradores y coordina reuniones.',
    ejemplo: [
      { de: 'agente', texto: 'Revisé tu bandeja: 4 correos necesitan respuesta y te dejé los borradores listos para revisar.' },
      { de: 'agente', texto: 'Al proveedor le propuse martes 10:00 o jueves 16:00 para la reunión. Te aviso cuando confirme.' },
      { de: 'agente', texto: 'El resto lo archivé: eran avisos y publicidad.' },
    ],
  },
  {
    id: 'administracion',
    nombre: 'Administración',
    corto: 'Ordena facturas y pagos y te avisa lo que vence.',
    diario:
      'Ordena facturas y pagos, concilia lo que entró y salió, te avisa lo que vence esta semana y recuerda los cobros y propuestas pendientes.',
    ejemplo: [
      { de: 'agente', texto: 'Revisé la cartola contra tus facturas: todo calza menos un depósito que no sé de quién es. ¿Me dices?' },
      { de: 'agente', texto: 'Esta semana vencen 2 facturas por cobrar. Te dejé listo un recordatorio amable para cada cliente.' },
      { de: 'agente', texto: 'La propuesta que mandaste el lunes sigue sin respuesta. ¿Le escribo mañana?' },
    ],
  },
  {
    id: 'operacion',
    nombre: 'Operación',
    corto: 'Sigue pedidos y proyectos y avisa lo atrasado.',
    diario: 'Sigue cada pedido o proyecto, avisa lo que está atrasado y le recuerda a tu equipo lo que toca hoy.',
    ejemplo: [
      { de: 'agente', texto: 'Hoy hay 6 pedidos en curso. Uno está atrasado: el de la ferretería, que debía salir ayer.' },
      { de: 'agente', texto: 'A Pedro le recordé que hoy le toca la entrega en Providencia y a Marta, la compra de materiales.' },
      { de: 'agente', texto: '¿Le aviso a la ferretería que sale mañana?' },
    ],
  },
  {
    id: 'otro',
    nombre: 'Otro',
    corto: 'Cuéntame qué tarea se repite en tu negocio.',
    diario: 'Lo que me contaste: en la reunión vemos si un agente tiene sentido para eso.',
    ejemplo: [],
  },
];

export const trabajo = (id: TrabajoId) => TRABAJOS.find((t) => t.id === id)!;

export type PersonasId = '1-2' | '3-15' | '15+';
export type UsoId = 'whatsapp' | 'correo' | 'planilla' | 'otro';
export type LicenciaId = 'si' | 'no' | 'nose';

export const PERSONAS: { id: PersonasId; etiqueta: string }[] = [
  { id: '1-2', etiqueta: '1 a 2' },
  { id: '3-15', etiqueta: '3 a 15' },
  { id: '15+', etiqueta: 'Más de 15' },
];

export const USOS: { id: UsoId; etiqueta: string }[] = [
  { id: 'whatsapp', etiqueta: 'WhatsApp' },
  { id: 'correo', etiqueta: 'Correo' },
  { id: 'planilla', etiqueta: 'Planilla' },
  { id: 'otro', etiqueta: 'Otro' },
];

export const LICENCIAS: { id: LicenciaId; etiqueta: string }[] = [
  { id: 'si', etiqueta: 'Sí' },
  { id: 'no', etiqueta: 'No' },
  { id: 'nose', etiqueta: 'No sé' },
];

export const etiqueta = <T extends string>(lista: { id: T; etiqueta: string }[], id: T | null | undefined) =>
  lista.find((x) => x.id === id)?.etiqueta ?? '';
