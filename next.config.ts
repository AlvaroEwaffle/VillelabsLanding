import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  // Solo desarrollo: permite abrir el dev server desde el celular en la red local (no comitear).
  allowedDevOrigins: ['192.168.100.250', '192.168.100.38'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 13-nov-2026 (velocidad en celular): el CSS va en línea dentro del HTML en vez de 3 archivos que bloquean el primer
  // pintado. Ahorra una ida y vuelta de red antes de ver el hero (H1, bajada y botón) con datos móviles.
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
