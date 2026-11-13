/**
 * Perfiles públicos de Álvaro Villena («Álvaro Villena IA»). Verificados el 13-nov-2026: todos responden 200 y son
 * suyos (Instagram y TikTok @alvarovillena.ia, YouTube @alvarovillenai, LinkedIn, alvarovillena.cl).
 * Los usan el JSON-LD global (components/SEOHead.tsx), el pie de página y /sobre-mi: si uno cambia, cambia acá.
 */
export const PERFILES_ALVARO = {
  instagram: 'https://www.instagram.com/alvarovillena.ia/',
  youtube: 'https://www.youtube.com/@alvarovillenai',
  tiktok: 'https://www.tiktok.com/@alvarovillena.ia',
  linkedin: 'https://www.linkedin.com/in/alvarovillena',
  sitio: 'https://alvarovillena.cl/',
} as const;

/** Nombre de la marca personal y su promesa, tal como se muestran en el pie y en /sobre-mi. */
export const MARCA_PERSONAL = {
  nombre: 'Álvaro Villena IA',
  promesa: 'te enseño a crear, gestionar y optimizar agentes de IA',
} as const;
