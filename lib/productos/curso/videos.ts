// Videos de las lecciones de los módulos 1 a 6 del curso v1.1 (lote 2, 8-nov-2026).
// Archivos en public/videos/<id>.{mp4,jpg,vtt}; Álvaro (avatar HeyGen) solo abre y cierra, el resto son gráficos con su voz.
// Generado por alvaro-reels/src/productos/tools/videos-ts-l2.mjs: si una lección no está aquí, muestra «Video próximamente».
import type { VideoId } from '@/components/productos/VideoProducto';

export type VideoCurso = { id: VideoId; duracion: string; segundos: number };

export const VIDEOS_CURSO: Partial<Record<string, VideoCurso>> = {
  'm1-l1': { id: 'm1-l1', duracion: '58 s', segundos: 58 },
  'm1-l2': { id: 'm1-l2', duracion: '61 s', segundos: 61 },
  'm1-l3': { id: 'm1-l3', duracion: '59 s', segundos: 59 },
  'm1-l4': { id: 'm1-l4', duracion: '61 s', segundos: 61 },
  'm1-l5': { id: 'm1-l5', duracion: '56 s', segundos: 56 },
  'm2-l1': { id: 'm2-l1', duracion: '50 s', segundos: 50 },
  'm2-l2': { id: 'm2-l2', duracion: '43 s', segundos: 43 },
  'm2-l3': { id: 'm2-l3', duracion: '54 s', segundos: 54 },
  'm2-l4': { id: 'm2-l4', duracion: '45 s', segundos: 45 },
  'm2-l5': { id: 'm2-l5', duracion: '52 s', segundos: 52 },
  'm3-l1': { id: 'm3-l1', duracion: '53 s', segundos: 53 },
  'm3-l2': { id: 'm3-l2', duracion: '53 s', segundos: 53 },
  'm3-l3': { id: 'm3-l3', duracion: '50 s', segundos: 50 },
  'm3-l4': { id: 'm3-l4', duracion: '52 s', segundos: 52 },
  'm3-l5': { id: 'm3-l5', duracion: '56 s', segundos: 56 },
  'm4-l1': { id: 'm4-l1', duracion: '58 s', segundos: 58 },
  'm4-l2': { id: 'm4-l2', duracion: '53 s', segundos: 53 },
  'm4-l3': { id: 'm4-l3', duracion: '59 s', segundos: 59 },
  'm4-l4': { id: 'm4-l4', duracion: '41 s', segundos: 41 },
  'm4-l5': { id: 'm4-l5', duracion: '54 s', segundos: 54 },
  'm5-l1': { id: 'm5-l1', duracion: '57 s', segundos: 57 },
  'm5-l2': { id: 'm5-l2', duracion: '44 s', segundos: 44 },
  'm5-l3': { id: 'm5-l3', duracion: '43 s', segundos: 43 },
  'm5-l4': { id: 'm5-l4', duracion: '43 s', segundos: 43 },
  'm6-l1': { id: 'm6-l1', duracion: '43 s', segundos: 43 },
  'm6-l2': { id: 'm6-l2', duracion: '48 s', segundos: 48 },
  'm6-l3': { id: 'm6-l3', duracion: '42 s', segundos: 42 },
  'm6-l4': { id: 'm6-l4', duracion: '44 s', segundos: 44 },
  'm6-l5': { id: 'm6-l5', duracion: '46 s', segundos: 46 },
  'm6-final': { id: 'm6-final', duracion: '52 s', segundos: 52 },
};
