// Fotos de Álvaro (reales o generadas con su avatar) para usar como imágenes de apoyo en los productos.
// Regla de marca (VPM/Villelabs/marca/GUIA-DE-MARCA.md): imagen en cada sección; rotar looks; nunca la polera blanca.
export const FOTOS = {
  cafe: { src: '/fotos/avatar-cafe.jpg', alt: 'Álvaro Villena en una cafetería con su notebook y un café', w: 1400, h: 'vertical' },
  cafeCerca: { src: '/fotos/alvaro-avatar-yt0.jpg', alt: 'Álvaro Villena explicando en una cafetería', w: 1400, h: 'vertical' },
  analista: { src: '/fotos/avatar-analista.jpg', alt: 'Álvaro Villena frente a pantallas con datos', w: 1400, h: 'vertical' },
  explicando: { src: '/fotos/alvaro-avatar-yt2.jpg', alt: 'Álvaro Villena explicando en su escritorio', w: 1400, h: 'vertical' },
  // «escritorio» (polera burdeo) lo descartó Álvaro el 7-nov; ahora apunta al look «Instructor tech».
  escritorio: { src: '/fotos/avatar-instructor.jpg', alt: 'Álvaro Villena explicando con una tablet frente a una pantalla con un diagrama', w: 1600, h: 'horizontal' },
  instructor: { src: '/fotos/avatar-instructor.jpg', alt: 'Álvaro Villena explicando con una tablet frente a una pantalla con un diagrama', w: 1600, h: 'horizontal' },
  pizarra: { src: '/fotos/avatar-pizarra.jpg', alt: 'Álvaro Villena dibujando un diagrama en una pizarra de vidrio', w: 1600, h: 'horizontal' },
  tutorial: { src: '/fotos/avatar-tutorial.jpg', alt: 'Álvaro Villena grabando un tutorial frente al micrófono y dos monitores', w: 1600, h: 'horizontal' },
  oficina: { src: '/fotos/avatar-oficina-creativa.jpg', alt: 'Álvaro Villena trabajando en su notebook en una oficina', w: 1400, h: 'horizontal' },
  podcaster: { src: '/fotos/avatar-podcaster.jpg', alt: 'Álvaro Villena con audífonos frente al micrófono', w: 1400, h: 'vertical' },
  podcasterCerca: { src: '/fotos/alvaro-podcast.jpg', alt: 'Álvaro Villena sonriendo con audífonos', w: 1080, h: 'cuadrada' },
  casual: { src: '/fotos/alvaro-casual.webp', alt: 'Álvaro Villena de pie con un café', w: 0, h: 'vertical' },
  retrato: { src: '/fotos/alvaro-portrait.webp', alt: 'Retrato de Álvaro Villena', w: 0, h: 'vertical' },
  trabajando: { src: '/fotos/alvaro-working.webp', alt: 'Álvaro Villena trabajando en su notebook', w: 0, h: 'vertical' },
  ciudad: { src: '/fotos/alvaro-ciudad.jpg', alt: 'Álvaro Villena en una terraza con la ciudad de fondo', w: 0, h: 'vertical' },
} as const;
