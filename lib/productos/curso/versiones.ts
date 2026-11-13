// Curso como producto vivo (mismo formato que lib/productos/guia/versiones.ts): se revisa y actualiza, y cada
// cambio queda aquí. La primera entrada es la versión vigente; /curso y el módulo 0 muestran su número y fecha.
// Al publicar un cambio: agregar una entrada arriba (fecha ISO + 1-3 cambios).

export { fechaLarga } from '@/lib/productos/guia/versiones';

export type VersionCurso = { version: string; fecha: string; cambios: string[] };

export const VERSIONES_CURSO: VersionCurso[] = [
  {
    version: '1.3',
    fecha: '2026-11-13',
    cambios: [
      'Nuevo módulo 7: tu primer agente, un asistente en un proyecto de Claude que usa tu planilla como memoria, pasa pedidos de WhatsApp a tu hoja Pedidos y te arma la cobranza del lunes. Tú revisas y tú envías.',
      'Ahora son 8 módulos, 38 lecciones y 34 prompts. Duración: cerca de 1 h 45 de lecciones cortas y unas 7 a 8 horas de práctica.',
      'El Tablero cuenta cada pedido una vez por su N°, aunque tenga varias filas.',
    ],
  },
  {
    version: '1.2',
    fecha: '2026-11-12',
    cambios: [
      'Los 7 módulos están listos: entras hoy y avanzas a tu ritmo.',
      'Los 27 prompts para tu IA quedan dentro de las lecciones, con botón copiar, en los 7 módulos.',
      'Duración medida: cerca de 1 h 30 de lecciones cortas y unas 6 horas de práctica.',
    ],
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
