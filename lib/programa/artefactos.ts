/**
 * El índice del repositorio. Cada artefacto es una página propia.
 *
 * Por qué separados y no un documento largo: se leen en momentos distintos.
 * El tablero se mira en la daily, el alcance cuando alguien discute si algo
 * entra, el charter cuando entra gente nueva. Un solo documento obliga a
 * todos a hojear lo que no vinieron a buscar.
 *
 * `vivo` dice de dónde sale el contenido. No es decoración: cambia cuánto hay
 * que desconfiar de lo que se lee.
 */
export type Frescura = 'vivo' | 'mixto' | 'escrito';

export interface Artefacto {
  slug: string;
  titulo: string;
  bajada: string;
  /** Qué pregunta contesta. Si no contesta ninguna, no debería existir. */
  pregunta: string;
  frescura: Frescura;
  fuente: string;
  icono: string;
}

export const FRESCURA: Record<Frescura, { etiqueta: string; detalle: string }> = {
  vivo: {
    etiqueta: 'en vivo',
    detalle: 'Sale de GitHub en cada sync. Si el board cambia, esto cambia.',
  },
  mixto: {
    etiqueta: 'mixto',
    detalle: 'El texto se escribió una vez; el estado sale de GitHub.',
  },
  escrito: {
    etiqueta: 'escrito',
    detalle: 'Lo redactamos nosotros. Cambia cuando alguien decide cambiarlo.',
  },
};

export const ARTEFACTOS: Artefacto[] = [
  {
    slug: 'scrum',
    titulo: 'Scrum Board',
    bajada: 'El producto en números, burndown, burnup, historias y RAID.',
    pregunta: '¿Cómo vamos esta semana, y qué nos está frenando?',
    frescura: 'vivo',
    fuente: 'GitHub Projects v2 + las notas que dejamos acá',
    icono: 'tablero',
  },
  {
    slug: 'fase-1',
    titulo: 'Fase 1 · Alcance',
    bajada: 'Las 23 historias con su criterio de aceptación, y el recorrido pantalla por pantalla.',
    pregunta: '¿Qué entregamos en esta fase, y cómo sabemos que está hecho?',
    frescura: 'mixto',
    fuente: 'Kick-off del 22-sep · estado desde GitHub',
    icono: 'alcance',
  },
  {
    slug: 'roadmap',
    titulo: 'Roadmap y épicas',
    bajada: 'El recorrido completo del cliente, las fases y el backlog por épica.',
    pregunta: '¿Dónde encaja esto en el producto entero?',
    frescura: 'mixto',
    fuente: 'AI Journey Backlog del 14-sep · estado desde GitHub',
    icono: 'mapa',
  },
  {
    slug: 'charter',
    titulo: 'Program Charter',
    bajada: 'Por qué existe el programa, quién decide qué, y qué todavía no está decidido.',
    pregunta: 'Entro nuevo al equipo: ¿qué necesito saber antes de opinar?',
    frescura: 'escrito',
    fuente: 'Redactado por el PM, revisado con Álvaro',
    icono: 'carta',
  },
  {
    slug: 'pipeline',
    titulo: 'Pipeline',
    bajada: 'Rama, pruebas, build, PR, merge y despliegue en Railway — de punta a punta.',
    pregunta: '¿Cómo llega un cambio de mi máquina a producción, y qué se rompe si me salto un paso?',
    frescura: 'escrito',
    fuente: 'Verificado contra el repo `prtech-ai` el 23-sep-2026',
    icono: 'pipeline',
  },
];
