// /cotizador — «Cotiza tu agente» (borrador 12-nov-2026, preview; no está en producción).
// Contenido de las tarjetas y las tres preguntas. Precios: lib/precios.ts (espejo del price book).
// 12-nov-2026 (Álvaro probó el preview): sin ejemplo desplegable al tocar una tarjeta («va tapando las otras opciones»).
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

export interface Trabajo {
  id: TrabajoId;
  nombre: string;
  /** Versión corta para la tarjeta (2 columnas a 360 px). */
  corto: string;
  /** Qué hace cada día, completo (resultado). */
  diario: string;
}

export const TRABAJOS: Trabajo[] = [
  {
    id: 'licitaciones',
    nombre: 'Licitaciones',
    corto: 'Revisa Mercado Público y te avisa las que calzan.',
    diario: 'Revisa Mercado Público cada mañana y te avisa las que calzan con tu rubro.',
  },
  {
    id: 'prospeccion',
    nombre: 'Prospección',
    corto: 'Arma la lista de posibles clientes y el primer mensaje.',
    diario: 'Arma la lista de posibles clientes y deja escrito el primer mensaje.',
  },
  {
    id: 'marketing',
    nombre: 'Marketing',
    corto: 'Programa tus publicaciones y te dice qué funcionó.',
    diario: 'Prepara y programa tus publicaciones y te reporta qué funcionó.',
  },
  {
    id: 'whatsapp',
    nombre: 'Atención por WhatsApp',
    corto: 'Responde lo de siempre y te pasa lo que es para ti.',
    diario: 'Responde las preguntas de siempre y te pasa las que son para ti.',
  },
  {
    id: 'correo',
    nombre: 'Correo y agenda',
    corto: 'Ordena tu bandeja, deja borradores y agenda.',
    diario: 'Ordena tu bandeja, deja borradores y coordina reuniones.',
  },
  {
    id: 'administracion',
    nombre: 'Administración',
    corto: 'Ordena facturas y pagos y te avisa lo que vence.',
    diario:
      'Ordena facturas y pagos, concilia lo que entró y salió, te avisa lo que vence esta semana y recuerda los cobros y propuestas pendientes.',
  },
  {
    id: 'operacion',
    nombre: 'Operación',
    corto: 'Sigue pedidos y proyectos y avisa lo atrasado.',
    diario: 'Sigue cada pedido o proyecto, avisa lo que está atrasado y le recuerda a tu equipo lo que toca hoy.',
  },
  {
    id: 'otro',
    nombre: 'Otro',
    corto: 'Cuéntame qué tarea se repite en tu negocio.',
    diario: 'Lo que me contaste: en la reunión vemos si un agente tiene sentido para eso.',
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
