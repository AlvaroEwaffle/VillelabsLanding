// Caso Grano Norte: Camila, dueña de la tostaduría. Personaje dibujado con el motor de personajes
// de Villelab LXD (copia adaptada, amarillo → #5fb2dd), renderizado a WebP transparente 327×560.
// Reutilizable por los otros productos: public/productos/caso/camila-<pose>-<expresion>.webp
export const CAMILA = {
  saludo: { src: '/productos/caso/camila-saludo-feliz.webp', alt: 'Camila, dueña de Grano Norte, saluda sonriendo' },
  celular: { src: '/productos/caso/camila-celular-sonrie.webp', alt: 'Camila revisa WhatsApp en su celular' },
  notebook: { src: '/productos/caso/camila-notebook-sonrie.webp', alt: 'Camila con su notebook, trabajando en su planilla' },
  pensando: { src: '/productos/caso/camila-pensando-pensativa.webp', alt: 'Camila pensando con la mano en el mentón' },
  celebrando: { src: '/productos/caso/camila-celebrando-feliz.webp', alt: 'Camila celebra con los brazos arriba' },
  preocupada: { src: '/productos/caso/camila-preocupada-preocupada.webp', alt: 'Camila preocupada, con las manos juntas' },
  retrato: { src: '/productos/caso/camila-retrato-sonrie.webp', alt: 'Retrato de Camila, dueña de Grano Norte' },
} as const;
export type PoseCamila = keyof typeof CAMILA;
