import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Solo WebP: AVIF pesa un poco menos pero tarda mucho más en generarse en un servidor chico.
    formats: ["image/webp"],
    // Menos anchos posibles = menos versiones que generar y más aciertos de caché.
    // Se quita 3840 (el más caro); 2560 alcanza para pantallas retina de 1440px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [64, 128, 256, 384],
    // Las imágenes optimizadas se guardan 31 días en el navegador y en el servidor.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        // Archivos de /public/images (SVG, decorativos sin optimizar): sin esto el navegador
        // los revalida en cada navegación. Se sirven del caché y se actualizan en segundo plano.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
