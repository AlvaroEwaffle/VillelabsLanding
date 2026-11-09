import { Fraunces } from 'next/font/google';

// Fraunces para los títulos (font-serif) de los productos digitales.
// El layout raíz no la carga (solo (proposals)), así que cada página de producto envuelve con fraunces.variable.
export const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});
