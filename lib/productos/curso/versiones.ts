// Curso como producto vivo (mismo formato que lib/productos/guia/versiones.ts): se revisa y actualiza, y cada
// cambio queda aquí. La primera entrada es la versión vigente; /curso y el módulo 0 muestran su número y fecha.
// Al publicar un cambio: agregar una entrada arriba (fecha ISO + 1-3 cambios).

export { fechaLarga } from '@/lib/productos/guia/versiones';

// 13-nov-2026: `porque` = la razón verdadera (lo que se midió o se corrigió), en primera persona. Si no consta, no va.
// Cuando se publique el módulo 7, su entrada va arriba y pasa a ser la destacada en /curso (sección «Reviso este curso…»).
export type VersionCurso = { version: string; fecha: string; cambios: string[]; porque?: string };

/**
 * Fecha de la versión 1.4 (módulo 7) = el día en que se publique en producción. Si se publica otro día, cambiar SOLO esta
 * constante (formato ISO). La muestran /curso («Producto vivo») y el módulo 0.
 */
export const FECHA_PUBLICACION_M7 = '2026-11-13';

export const VERSIONES_CURSO: VersionCurso[] = [
  {
    version: '1.4',
    fecha: FECHA_PUBLICACION_M7,
    cambios: [
      'Nuevo módulo 7, el proyecto final: un agente de IA que trabaja con tu planilla. Le pegas un WhatsApp y te arma la fila del pedido; el lunes le pegas tu cobranza y te dice a quién cobrar. Tú revisas y envías.',
      'Los prompts del agente se rellenan solos con los datos de tu negocio, que anotas una vez.',
      'El Tablero cuenta cada pedido una vez por su N°, aunque tenga varias filas.',
      'Ahora son 8 módulos, 38 lecciones y 34 prompts: menos de 2 horas de contenido (cerca de 1 h 45) y unas 7 a 8 horas de práctica.',
    ],
    porque:
      'Incluí un agente que trabaja con tu planilla porque una planilla ordenada igual hay que llenarla y leerla, y lo que más se repite es pasar pedidos de WhatsApp y cobrar el lunes. Lo probé en un proyecto de Claude con el caso Grano Norte: hizo bien las dos tareas en todas las pruebas y no se saltó las reglas de freno (no aceptó un descuento ni confirmó una fecha sin despacho).',
  },
  {
    version: '1.3',
    fecha: '2026-11-13',
    cambios: [
      'La planilla se descarga una vez, en el módulo 0, y en los módulos siguientes sigues trabajando la misma: cada módulo llena una hoja.',
    ],
    porque: 'Cada módulo volvía a ofrecerte bajar la planilla vacía, como si partieras de cero. Ahora la bajas una vez, en el módulo 0, y la vas llenando.',
  },
  {
    version: '1.2',
    fecha: '2026-11-12',
    cambios: [
      'Los 7 módulos están listos: entras hoy y avanzas a tu ritmo.',
      'Los 27 prompts para tu IA quedan dentro de las lecciones, con botón copiar, en los 7 módulos.',
      'Duración medida: cerca de 1 h 30 de lecciones cortas y unas 6 horas de práctica.',
    ],
    porque:
      'Medí cuánto duran de verdad los videos y la lectura y ajusté la duración que dice la página. Dejé los 27 prompts dentro de las lecciones, y como los 7 módulos ya estaban grabados, dejó de ser preventa.',
  },
  {
    version: '1.1',
    fecha: '2026-11-08',
    cambios: [
      'Nuevo enfoque: «El sistema de tu negocio», tu primer CRM y ERP en Google Sheets. Cada módulo agrega una hoja a la misma planilla, y el módulo 6 la junta en un tablero.',
      'Planilla del sistema descargable (Excel o Google Sheets) con las hojas conectadas y las fórmulas del tablero listas, con o sin el ejemplo de Grano Norte.',
      'La IA entra como ayuda para redactar y armar fórmulas. Por WhatsApp, solo a quien ya te conoce.',
    ],
  },
  {
    version: '1.0',
    fecha: '2026-11-07',
    cambios: ['Primera versión como «Tu negocio de punta a punta»: módulo 0 con mapa, diagnóstico, esqueleto y reglas de freno.'],
  },
];

export const VERSION_CURSO = VERSIONES_CURSO[0];
