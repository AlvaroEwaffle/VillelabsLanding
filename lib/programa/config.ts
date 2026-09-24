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
  fidelidapp: {
    slug: 'fidelidapp',
    // La fase con más items abiertos (11 de 24) y la más urgente: el 88% de las
    // sesiones del wizard no envía el primer formulario (VPM/Fidelidapp/wizard-auditoria-2026-09.md).
    fase_foco: 'Fase 1 · Que nadie se pierda',
    // TODO Álvaro: fechas y meta provisionales — el board (GitHub Projects #2)
    // ya trae 17 issues en Sprint 1 y 6 en Sprint 2, pero sin fechas ni meta
    // propias. Puestas a 2 semanas, mismo ritmo que PR Tech, para no dejar el
    // semáforo sin calcular; corregir en el próximo planning.
    sprints: [
      {
        nombre: 'Sprint 1',
        desde: '2026-09-17',
        hasta: '2026-09-30',
        meta: 'Por definir en el planning.',
      },
      {
        nombre: 'Sprint 2',
        desde: '2026-10-01',
        hasta: '2026-10-14',
        meta: 'Por definir en el planning.',
      },
    ],
    equipo: {
      AlvaroEwaffle: 'Álvaro',
    },
  },
};

export const PROGRAMAS = Object.keys(CONFIGS);

/**
 * La llave de la URL. Rotarla es cambiar esta línea y volver a desplegar: la
 * ruta vieja deja de existir en el build siguiente.
 */
export const LLAVES = ['szkIoOQ40giu'] as const;

/**
 * Del código de épica del documento a las etiquetas que existen hoy en GitHub.
 *
 * Hace falta un mapa a mano porque el documento del 14-sep cita issues `[EPIC]`
 * —#13, #3, #6…— que ya no existen: se borraron cuando las épicas pasaron de
 * ser issues a ser etiquetas. Una épica no se cierra, se vacía, y una issue que
 * nunca se cierra ensucia el backlog.
 *
 * Así que la unión es por etiqueta y está escrita, no adivinada. Si una etiqueta
 * de acá no existe en el snapshot, la página lo dice en vez de mostrar cero.
 */
export const EPICA_A_ETIQUETAS: Record<string, string[]> = {
  '01': ['epic: espejo-y-registro', 'epic: mirror-defectos'],
  '02': ['epic: cuestionario'],
  '03': ['epic: reportes-pdf-ppt'],
  '04': ['epic: pago-suscripcion'],
  '05': ['epic: estrategia-pr'],
  '06': ['epic: pide-mas'],
  '07': ['epic: portal-cuenta', 'epic: roles-permisos', 'epic: panel-multicuenta'],
  '08': ['epic: envio-correos', 'epic: ingesta-csv', 'epic: datos-personales'],
  '09': ['epic: pauta-medios'],
};

/** Épicas que viven solo en GitHub: nacieron después del documento. */
export const ETIQUETAS_SIN_DOC = ['epic: radar', 'epic: operacion'];
