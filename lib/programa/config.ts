import type { ConfigPrograma } from './tipos';

/**
 * Lo que GitHub no sabe: qué fase estamos mirando, cuándo empieza y termina
 * cada sprint y con qué meta, y cómo se llama de verdad cada login.
 *
 * Vive en código y no en Firestore porque cambia con el planning, no con la
 * daily — y así queda versionado junto al snapshot que lo acompaña.
 */
export const CONFIGS: Record<string, ConfigPrograma> = {
  prtech: {
    slug: 'prtech',
    fase_foco: 'Fase 1 · La plataforma',
    sprints: [
      {
        nombre: 'Sprint 1',
        desde: '2026-09-10',
        hasta: '2026-09-24',
        meta: 'v0.1 en producción con aislamiento real entre cuentas.',
      },
      {
        nombre: 'Sprint 2',
        desde: '2026-09-25',
        hasta: '2026-10-08',
        meta: 'La cuenta de cliente reemplaza al PIN y el portal muestra cobertura real.',
      },
      {
        nombre: 'Sprint 3',
        desde: '2026-10-09',
        hasta: '2026-10-22',
        meta: 'Por definir en el planning.',
      },
      {
        nombre: 'Sprint 4',
        desde: '2026-10-23',
        hasta: '2026-11-05',
        meta: 'Por definir en el planning.',
      },
    ],
    equipo: {
      AlvaroEwaffle: 'Álvaro',
      jsstagno90: 'Juan',
      'Mel-Lopez21': 'Melanie',
    },
  },
};

export const PROGRAMAS = Object.keys(CONFIGS);

/**
 * La llave de la URL. Rotarla es cambiar esta línea y volver a desplegar: la
 * ruta vieja deja de existir en el build siguiente.
 */
export const LLAVES = ['szkIoOQ40giu'] as const;
