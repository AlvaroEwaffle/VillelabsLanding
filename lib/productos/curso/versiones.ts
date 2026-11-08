// Curso como producto vivo (mismo formato que lib/productos/guia/versiones.ts): se revisa y actualiza, y cada
// cambio queda aquí. La primera entrada es la versión vigente; /curso y el módulo 0 muestran su número y fecha.
// Al publicar un cambio: agregar una entrada arriba (fecha ISO + 1-3 cambios).

export { fechaLarga } from '@/lib/productos/guia/versiones';

export type VersionCurso = { version: string; fecha: string; cambios: string[] };

export const VERSIONES_CURSO: VersionCurso[] = [
  {
    version: '1.1',
    fecha: '2026-11-08',
    cambios: [
      'Nuevo enfoque: «El sistema de tu negocio», tu primer CRM y ERP en Google Sheets. Cada módulo agrega una hoja a la misma planilla, y el módulo 6 la junta en un tablero.',
      'Planilla del sistema descargable (Excel o Google Sheets) con las hojas conectadas y las fórmulas del tablero listas, con o sin el ejemplo de Grano Norte.',
      'La IA pasa a ser una ayuda opcional: el curso funciona completo sin ella. Por WhatsApp, solo a quien ya te conoce.',
    ],
  },
  {
    version: '1.0',
    fecha: '2026-11-07',
    cambios: ['Lanzamiento en preventa como «Tu negocio de punta a punta»: módulo 0 con mapa, diagnóstico, esqueleto y reglas de freno.'],
  },
];

export const VERSION_CURSO = VERSIONES_CURSO[0];
