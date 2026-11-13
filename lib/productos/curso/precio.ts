// Precio de lanzamiento del curso en CLP (ratificado por Álvaro el 8-nov-2026; null = se oculta la cifra). Módulo aparte
// y sin dependencias para que components/productos/PixelMeta.tsx (en todas las páginas) lo use en el InitiateCheckout sin
// cargar curso.ts. curso.ts lo reexporta: el resto del sitio lo sigue importando desde ahí.
export const PRECIO_FUNDADOR: number | null = 29990;
