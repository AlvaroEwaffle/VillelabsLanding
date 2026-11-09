// Enlaces compartidos de la escalera de productos digitales.
// Hotmart (cuenta empresa): Guía 1 = producto 8918629, activo desde el 8-nov. Curso: pendiente.
export const LINKS = {
  esqueleto: '/esqueleto',
  workshop: '/workshop',
  /** Grabación del último workshop, abierta y gratis (camino gratuito del ciclo). */
  workshopGrabacion: '/workshop/grabacion',
  /** Página de venta (indexable) de la Guía 1. */
  guiaVenta: '/guia',
  guiaProspeccionCompra: 'https://pay.hotmart.com/H108396355K',
  guiaProspeccion: '/guia/prospeccion',
  curso: '/curso',
  // Mientras el curso no exista en Hotmart (sin precio fundador), «Quiero el curso» abre WhatsApp con Álvaro en vez
  // de un checkout roto (error 008 de Hotmart, hallazgo del análisis UX «Rodrigo», 8-nov-2026). Al crear el producto,
  // reemplazar por el link pay.hotmart.com.
  cursoCompra:
    'https://wa.me/56920115198?text=' +
    encodeURIComponent('Hola Álvaro, quiero el curso «El sistema de tu negocio» en preventa. ¿Me avisas cuando abra?'),
  cursoModulo0: '/curso/modulo-0',
  /** Upsell Fidelidapp desde el puente a WhatsApp del esqueleto (Álvaro, 8-nov-2026). */
  fidelidappWhatsapp: 'https://fidelidapp.cl/?utm_source=villelab.com&utm_medium=esqueleto&utm_campaign=puente-whatsapp',
  agendar: 'https://capu.villelab.com/schedule/reunion-descubrimiento-con-alvaro-villelabs',
} as const;
