// Los .mp4 viven en el GCS de Ewaffle (Álvaro, 8-nov-2026: «los videos los podemos almacenar en el gcs de Ewaffle,
// ahí almaceno todo mi contenido»). Los posters (.jpg) y subtítulos (.vtt) siguen en public/videos: son livianos y
// el <track> necesita mismo origen. Subir un video nuevo:
//   gcloud storage cp -n public/videos/<id>.mp4 gs://ewaffle/alvaro-ia/villelab/videos/   (y no comitear el .mp4)
export const VIDEOS_MP4 = 'https://storage.googleapis.com/ewaffle/alvaro-ia/villelab/videos';
export const mp4 = (id: string) => `${VIDEOS_MP4}/${id}.mp4`;
