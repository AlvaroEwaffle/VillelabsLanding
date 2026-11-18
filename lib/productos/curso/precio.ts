// Precio del curso en USD (null = se oculta la cifra). Módulo aparte y sin dependencias para que
// components/productos/PixelMeta.tsx (en todas las páginas) lo use en el InitiateCheckout sin cargar curso.ts. curso.ts lo
// reexporta: el resto del sitio lo sigue importando desde ahí.
// 18-nov-2026 (Álvaro, chat de la sesión): USD 87. Antes CLP 29.990 (≈ USD 31) como «precio de lanzamiento» (8-nov).
// El nombre PRECIO_FUNDADOR se mantiene para no tocar los imports; ya no es precio de lanzamiento ni de fundador.
export const PRECIO_FUNDADOR: number | null = 87;
export const MONEDA_CURSO = 'USD';
