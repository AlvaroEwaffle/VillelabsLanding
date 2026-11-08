import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  // Solo desarrollo: permite abrir el dev server desde el celular en la red local (no comitear).
  allowedDevOrigins: ['192.168.100.250', '192.168.100.38'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
