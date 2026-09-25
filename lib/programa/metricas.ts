import crudo from './data/prtech.metricas.json';
import { rag, type Rag } from './derivar';

/**
 * Los números de producto. Todos salen de `prtech.metricas.json`, que solo
 * acepta mediciones fechadas y con fuente.
 *
 * La regla, otra vez: **no se interpolan puntos**. Si hace cinco días que
 * nadie mide, el número correcto es el de hace cinco días, dicho con su edad
 * al lado — no una estimación de hoy que parezca fresca. Lo único que se
 * calcula son derivadas de dos mediciones reales, y van marcadas como tales.
 */

export interface Medicion {
  fecha: string;
  fuente: string;
  corpus_documentos?: number;
  corpus_unicos?: number;
  corpus_mb_datos?: number;
  corpus_mb_indices?: number;
  cuota_mb?: number;
  ingesta_diaria?: number;
  medios_activos?: number;
  medios_congelados?: number;
  periodistas_total?: number;
  periodistas_reales?: number;
  periodistas_con_email?: number;
}

const MEDICIONES = (crudo as { mediciones: Medicion[] }).mediciones;

/** La última medición que trae ese campo — no siempre se mide todo. */
function ultima<K extends keyof Medicion>(campo: K): { valor: NonNullable<Medicion[K]>; fecha: string } | null {
  for (let i = MEDICIONES.length - 1; i >= 0; i--) {
    const v = MEDICIONES[i][campo];
    if (v !== undefined && v !== null) return { valor: v as NonNullable<Medicion[K]>, fecha: MEDICIONES[i].fecha };
  }
  return null;
}

const DIA = 86_400_000;

export type Origen = 'medido' | 'derivado' | 'proyectado';

export interface Numero {
  clave: string;
  titulo: string;
  valor: string;
  /** La segunda línea: qué significa, o de qué se compone. */
  detalle: string;
  estado: Rag;
  origen: Origen;
  fecha: string;
}

export interface Grupo {
  titulo: string;
  bajada: string;
  numeros: Numero[];
}

export interface Producto {
  grupos: Grupo[];
  /** Fecha de la medición más reciente, sea del campo que sea. */
  medidoEl: string;
  diasDesdeLaMedicion: number;
  fuente: string;
  /** El titular: cuándo se llena la base, si nadie hace nada. */
  saturacion: { fecha: string; diasDesdeHoy: number; mbPorDia: number; unicosPorDia: number } | null;
}

function fmt(n: number): string {
  return n.toLocaleString('es-CL');
}

export function producto(hoy = new Date()): Producto {
  const u = MEDICIONES[MEDICIONES.length - 1];
  const p = MEDICIONES.length > 1 ? MEDICIONES[MEDICIONES.length - 2] : null;

  const docs = ultima('corpus_documentos');
  const unicos = ultima('corpus_unicos');
  const mbDatos = ultima('corpus_mb_datos');
  const mbIndices = ultima('corpus_mb_indices');
  const cuota = ultima('cuota_mb');
  const ingesta = ultima('ingesta_diaria');
  const activos = ultima('medios_activos');
  const congelados = ultima('medios_congelados');
  const periodistas = ultima('periodistas_reales');
  const conEmail = ultima('periodistas_con_email');

  // ── Derivadas de dos mediciones reales ───────────────────────────────────
  let unicosPorDia: number | null = null;
  if (p && u.corpus_unicos !== undefined && p.corpus_unicos !== undefined) {
    const dias = (Date.parse(u.fecha) - Date.parse(p.fecha)) / DIA;
    if (dias > 0) unicosPorDia = (u.corpus_unicos - p.corpus_unicos) / dias;
  }

  const usado = (mbDatos?.valor ?? 0) + (mbIndices?.valor ?? 0);
  const tope = cuota?.valor ?? 0;
  const pctDisco = tope ? Math.round((usado / tope) * 100) : null;

  let saturacion: Producto['saturacion'] = null;
  if (unicosPorDia && unicosPorDia > 0 && usado > 0 && tope > usado && unicos) {
    const kbPorDoc = (usado * 1024) / unicos.valor;
    const mbPorDia = (unicosPorDia * kbPorDoc) / 1024;
    const fecha = new Date(Date.parse(mbDatos!.fecha) + ((tope - usado) / mbPorDia) * DIA);
    saturacion = {
      fecha: fecha.toISOString().slice(0, 10),
      diasDesdeHoy: Math.round((fecha.getTime() - hoy.getTime()) / DIA),
      mbPorDia,
      unicosPorDia,
    };
  }

  const dup = docs && unicos ? docs.valor / unicos.valor : null;
  const mediosTotal = activos && congelados ? activos.valor + congelados.valor : null;
  const pctEmail = periodistas && conEmail ? (conEmail.valor / periodistas.valor) * 100 : null;

  const n = (
    clave: string, titulo: string, valor: string, detalle: string,
    estado: Rag, origen: Origen, fecha: string,
  ): Numero => ({ clave, titulo, valor, detalle, estado, origen, fecha });

  const grupos: Grupo[] = [
    {
      titulo: 'Lo que el radar ve',
      bajada: 'El corpus es el activo: sin cobertura no hay señal que vender.',
      numeros: [
        unicos && n('unicos', 'Artículos únicos', fmt(unicos.valor),
          docs ? `${fmt(docs.valor)} guardados, ${fmt(docs.valor - unicos.valor)} duplicados` : '',
          'v', 'medido', unicos.fecha),
        activos && n('medios', 'Medios activos', mediosTotal ? `${activos.valor} de ${mediosTotal}` : String(activos.valor),
          congelados ? `${congelados.valor} fuentes configuradas dejaron de traer` : '',
          // Que la mitad de las fuentes esté muerta no es un detalle técnico:
          // es cobertura que el cliente cree tener y no tiene.
          mediosTotal ? rag((activos.valor / mediosTotal) * 100, 80, 60) : 'a',
          'medido', activos.fecha),
        ingesta && n('ingesta', 'Entran por día', fmt(ingesta.valor),
          unicosPorDia ? `${fmt(Math.round(unicosPorDia))} quedan tras deduplicar` : 'artículos brutos',
          'v', 'medido', ingesta.fecha),
        dup && unicos && n('dup', 'Factor de duplicación', `${dup.toFixed(2)}x`,
          'Cada artículo se guarda casi dos veces',
          rag(dup, 1.2, 1.6, true), 'derivado', unicos.fecha),
      ].filter(Boolean) as Numero[],
    },
    {
      titulo: 'A quién podemos llegar',
      bajada: 'La difusión no se limita por medios, se limita por correos.',
      numeros: [
        periodistas && n('periodistas', 'Periodistas en base', fmt(periodistas.valor),
          'fichas que pasan validación', 'v', 'medido', periodistas.fecha),
        conEmail && periodistas && n('email', 'Con correo', fmt(conEmail.valor),
          pctEmail ? `${pctEmail.toFixed(0)}% de la base — el techo real de un envío` : '',
          rag(pctEmail ?? 0, 50, 25), 'derivado', conEmail.fecha),
      ].filter(Boolean) as Numero[],
    },
    {
      titulo: 'Lo que puede romperse',
      bajada: 'El corpus crece más rápido de lo que el plan aguanta.',
      numeros: [
        pctDisco !== null && n('disco', 'Almacenamiento', `${pctDisco}%`,
          `${usado} MB de ${tope} · M0`, rag(pctDisco, 60, 80, true), 'medido', mbDatos!.fecha),
        saturacion && n('saturacion', 'Se llena el', saturacion.fecha,
          `dentro de ${saturacion.diasDesdeHoy} días, al ritmo de ${saturacion.mbPorDia.toFixed(1)} MB/día`,
          rag(saturacion.diasDesdeHoy, 30, 14), 'proyectado', mbDatos!.fecha),
      ].filter(Boolean) as Numero[],
    },
  ];

  const medidoEl = u.fecha;
  return {
    grupos,
    medidoEl,
    diasDesdeLaMedicion: Math.round((hoy.getTime() - Date.parse(medidoEl)) / DIA),
    fuente: u.fuente,
    saturacion,
  };
}
