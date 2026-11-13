// Genera los datos de «En qué se basa esta guía» a partir de la base de evidencia de la Guía 1.
// Fuente: lib/productos/guia/base-evidencia-guia1.json, copia de trabajo (ya corregida el 8-nov-2026) de
// VPM/Villelabs/productos-digitales/investigacion/base-evidencia-guia1-2026-11-08.json.
// Uso: npm run guia:evidencia   (después de editar el JSON en una revisión trimestral)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = join(raiz, 'lib/productos/guia');
const base = JSON.parse(readFileSync(join(dir, 'base-evidencia-guia1.json'), 'utf8'));

// Fecha de la revisión y de la próxima (revisión trimestral: enero, abril, julio y octubre).
const REVISION = { fecha: '2026-11-08', proxima: 'enero de 2027' };

// Temas en el orden de la guía. Cada afirmación va en un solo tema.
const TEMAS = [
  { id: 'a-quien', titulo: 'A quién escribirle', ids: ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08'] },
  { id: 'respuestas', titulo: 'Cuántos te van a responder', ids: ['C09', 'C10'] },
  { id: 'mensaje', titulo: 'El primer mensaje', ids: ['C11', 'C12', 'C13', 'C14', 'C15', 'C16'] },
  { id: 'canal', titulo: 'Por dónde escribirle', ids: ['C30'] },
  { id: 'seguimientos', titulo: 'Los seguimientos', ids: ['C17', 'C18', 'C19', 'C20', 'C21', 'C22', 'C23'] },
  { id: 'rutina', titulo: 'La rutina de 20 minutos', ids: ['C24', 'C25', 'C26', 'C27', 'C28', 'C29'] },
  { id: 'ayuda', titulo: 'Claude o ChatGPT como ayuda', ids: ['C31', 'C32'] },
  { id: 'guia', titulo: 'Cómo está armada la guía', ids: ['C33', 'C34'] },
];

const VEREDICTOS = ['fuerte', 'moderada', 'débil', 'sin respaldo'];
const ids = new Set(base.map((x) => x.id));
const enTemas = TEMAS.flatMap((t) => t.ids);
for (const x of base) {
  if (!VEREDICTOS.includes(x.veredicto)) throw new Error(`${x.id}: veredicto «${x.veredicto}» no se publica (corrige la guía y el JSON primero)`);
  if (!enTemas.includes(x.id)) throw new Error(`${x.id} no está en ningún tema`);
  for (const f of x.fuentes) if (!/^https?:\/\//.test(f.url)) throw new Error(`${x.id}: fuente sin link (${f.autor})`);
}
for (const id of enTemas) if (!ids.has(id)) throw new Error(`Tema con ${id}, que no existe en el JSON`);

const afirmaciones = base.map(({ id, afirmacion, seccionGuia, veredicto, resumen, fuentes }) => ({
  id,
  afirmacion,
  seccionGuia,
  veredicto,
  resumen,
  fuentes: fuentes.map(({ autor, anio, titulo, tipo, url }) => ({ autor, anio, titulo, tipo, url })),
}));
const conteo = {
  fuerte: base.filter((x) => x.veredicto === 'fuerte').length,
  moderada: base.filter((x) => x.veredicto === 'moderada').length,
  criterio: base.filter((x) => x.veredicto === 'débil' || x.veredicto === 'sin respaldo').length,
  total: base.length,
};

const aviso = '// GENERADO por scripts/guia/evidencia.mjs desde base-evidencia-guia1.json. No editar a mano: edita el JSON y corre `npm run guia:evidencia`.\n';

writeFileSync(
  join(dir, 'evidencia-resumen.ts'),
  `${aviso}// Versión liviana para la guía (cliente): solo fechas y conteos.\n\n` +
    `export const REVISION_EVIDENCIA = ${JSON.stringify(REVISION)} as const;\n\n` +
    `export const CONTEO_EVIDENCIA = ${JSON.stringify(conteo)} as const;\n`,
);

writeFileSync(
  join(dir, 'evidencia.ts'),
  `${aviso}// Sección «En qué se basa esta guía» de /guia. Orden: fuerte (visible), moderada por tema y, al final,\n` +
    `// débil y sin respaldo agrupadas como «criterio práctico, para ajustar con tus números».\n\n` +
    `export { CONTEO_EVIDENCIA, REVISION_EVIDENCIA } from './evidencia-resumen';\n\n` +
    `export type Veredicto = 'fuerte' | 'moderada' | 'débil' | 'sin respaldo';\n` +
    `export type FuenteEvidencia = { autor: string; anio: number | null; titulo: string; tipo: string; url: string };\n` +
    `export type Afirmacion = { id: string; afirmacion: string; seccionGuia: string; veredicto: Veredicto; resumen: string; fuentes: FuenteEvidencia[] };\n` +
    `export type TemaEvidencia = { id: string; titulo: string; ids: string[] };\n\n` +
    `export const AFIRMACIONES: Afirmacion[] = ${JSON.stringify(afirmaciones, null, 2)};\n\n` +
    `export const TEMAS_EVIDENCIA: TemaEvidencia[] = ${JSON.stringify(TEMAS, null, 2)};\n\n` +
    `const porId = new Map(AFIRMACIONES.map((a) => [a.id, a]));\n` +
    `export const esCriterio = (v: Veredicto) => v === 'débil' || v === 'sin respaldo';\n\n` +
    `/** Respaldo fuerte, en el orden de la guía (va visible primero). */\n` +
    `export const FUERTES = AFIRMACIONES.filter((a) => a.veredicto === 'fuerte');\n\n` +
    `/** Respaldo moderado, agrupado por tema. */\n` +
    `export const MODERADAS_POR_TEMA = TEMAS_EVIDENCIA.map((t) => ({\n` +
    `  ...t,\n` +
    `  items: t.ids.map((id) => porId.get(id)!).filter((a) => a.veredicto === 'moderada'),\n` +
    `})).filter((t) => t.items.length > 0);\n\n` +
    `/** Lo débil o sin respaldo, en el orden de la guía: criterio práctico, para ajustar con tus números. */\n` +
    `export const CRITERIO_PRACTICO = AFIRMACIONES.filter((a) => esCriterio(a.veredicto));\n`,
);

console.log(`evidencia.ts: ${conteo.fuerte} fuertes, ${conteo.moderada} moderadas, ${conteo.criterio} de criterio práctico (${conteo.total} en total).`);
