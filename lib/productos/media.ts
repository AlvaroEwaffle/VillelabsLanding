// Los .mp4 viven en el GCS de Ewaffle (Álvaro, 8-nov-2026: «los videos los podemos almacenar en el gcs de Ewaffle,
// ahí almaceno todo mi contenido»). Los posters (.jpg) y subtítulos (.vtt) siguen en public/videos: son livianos y
// el <track> necesita mismo origen. Subir un video nuevo:
//   gcloud storage cp -n public/videos/<id>.mp4 gs://ewaffle/alvaro-ia/villelab/videos/   (y no comitear el .mp4)
export const VIDEOS_MP4 = 'https://storage.googleapis.com/ewaffle/alvaro-ia/villelab/videos';
// GCS sirve los .mp4 con «Cache-Control: public, max-age=3600»: sobrescribir un objeto no invalida la caché. Si un video
// cambia, se sube con sufijo nuevo (<id>-v2.mp4) y se anota aquí; el .jpg y el .vtt siguen con el id sin sufijo.
// 13-nov-2026: m7-l1…l5 v2 = corte justo tras la última palabra + cortina de cierre Villelab (el avatar quedaba «por hablar»).
const VERSION_MP4: Partial<Record<string, string>> = {
  'm7-l1': 'v2',
  'm7-l2': 'v2',
  'm7-l3': 'v2',
  'm7-l4': 'v2',
  'm7-l5': 'v2',
};
export const mp4 = (id: string) => `${VIDEOS_MP4}/${id}${VERSION_MP4[id] ? `-${VERSION_MP4[id]}` : ''}.mp4`;
