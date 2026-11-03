/*
 * Precios públicos de Villelabs. Fuente: VPM/Villelabs/pricing/price-book.json (repo Vilo).
 * Si cambia el price book, cambia acá y se actualizan home, catálogo, servicios y /agentes.
 *
 * Agentes como servicio (decisión de Álvaro, 3-nov-2026):
 *   1. Reunión de descubrimiento: gratis, 30 minutos.
 *   2. Implementación: desde 12 UF (≈ CLP 500.000; UF 3-nov-2026 = 41.263,57 → 12 UF ≈ 495.163).
 *   3. Mantenimiento: 4 UF al mes.
 * Reemplaza el precio anterior (instalación USD 2.420 + USD 2.960/mes).
 * Todos los valores van SIN IVA: Villelab emite factura exenta (decisión de Álvaro, 3-nov-2026).
 */

export const PRECIOS_AGENTES = {
  implementacionUF: 12,
  mantenimientoUF: 4,
  licenciaUsdMin: 25,
  licenciaUsdMax: 30,
} as const;

export const PRECIO_CTO_USD = 3500;

export const uf = (n: number) => `${n.toLocaleString('es-CL')} UF`;
export const usd = (n: number) => `USD $${n.toLocaleString('es-CL')}`;

export const NOTA_IVA = {
  es: 'Valores exentos de IVA (factura exenta).',
  en: 'VAT-exempt prices (exempt invoice).',
};

export const TEXTO_PRECIO_AGENTES = {
  es: `implementación desde ${uf(PRECIOS_AGENTES.implementacionUF)} + mantenimiento ${uf(PRECIOS_AGENTES.mantenimientoUF)}/mes`,
  en: `setup from ${uf(PRECIOS_AGENTES.implementacionUF)} + upkeep ${uf(PRECIOS_AGENTES.mantenimientoUF)}/month (UF = Chilean inflation-indexed unit)`,
};
