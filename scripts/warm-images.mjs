/*
 * Precalienta el caché de next/image.
 *
 * Next genera cada versión de imagen (ancho + formato) la primera vez que alguien la pide.
 * En un servidor chico eso tarda segundos por página, y después de cada deploy el caché
 * arranca vacío: el primer visitante ve las imágenes "a los tirones".
 *
 * Este script recorre las páginas, lee los srcset de cada <img> y pide la versión que elegiría
 * un navegador real (escritorio 1x y 2x, y celular 3x). Así el caché ya está listo.
 *
 * Uso: node scripts/warm-images.mjs [http://localhost:3000]
 */

const BASE = (process.argv[2] || process.env.WARM_BASE_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, "");
// Pocas a la vez para no quitarle CPU a los visitantes reales.
const CONCURRENCY = Number(process.env.WARM_CONCURRENCY || 2);
// Pantallas típicas: [ancho CSS, densidad de píxeles].
// Las de tamaño fijo (sizes="533px") no suman versiones; las relativas (vw) sí dependen de la pantalla.
const VIEWPORTS = [
  [1440, 1],
  [1440, 2],
  [1280, 1],
  [1366, 1],
  [1536, 1],
  [1920, 1],
  [390, 3],
  [414, 2],
];
// En Windows la barra de scroll le quita ~15px al ancho útil.
const SCROLLBAR = 15;

function decode(html) {
  return html.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
}

// Ancho CSS que ocupa la imagen según su atributo sizes (misma regla que el navegador).
function slotWidth(sizes, viewport) {
  if (!sizes) {
    return null;
  }
  for (const part of sizes.split(",").map((s) => s.trim())) {
    const match = part.match(/^\((max|min)-width:\s*(\d+)px\)\s+(.+)$/);
    let value = part;
    if (match) {
      const limit = Number(match[2]);
      const applies = match[1] === "max" ? viewport <= limit : viewport >= limit;
      if (!applies) {
        continue;
      }
      value = match[3];
    }
    const px = value.match(/^([\d.]+)px$/);
    if (px) {
      return Number(px[1]);
    }
    const vw = value.match(/^([\d.]+)vw$/);
    if (vw) {
      return (Number(vw[1]) / 100) * viewport;
    }
    return viewport;
  }
  return viewport;
}

// Devuelve las URLs de /_next/image que pedirían los navegadores de VIEWPORTS.
function pickUrls(imgTag) {
  const srcset = imgTag.match(/srcset="([^"]+)"/i)?.[1];
  if (!srcset) {
    const src = imgTag.match(/\ssrc="([^"]+)"/i)?.[1];
    return src && src.includes("/_next/image") ? [decode(src)] : [];
  }
  const candidates = decode(srcset)
    .split(/,\s+(?=\/)/)
    .map((entry) => {
      const [url, descriptor] = entry.trim().split(/\s+/);
      return { url, value: parseFloat(descriptor), unit: descriptor.slice(-1) };
    })
    .filter((c) => c.url.includes("/_next/image"));
  if (!candidates.length) {
    return [];
  }

  const urls = new Set();
  const sizes = imgTag.match(/sizes="([^"]+)"/i)?.[1];
  for (const [viewport, dpr] of VIEWPORTS) {
    if (candidates[0].unit === "x") {
      const wanted = candidates.find((c) => c.value >= dpr) ?? candidates.at(-1);
      urls.add(wanted.url);
      continue;
    }
    const sorted = [...candidates].sort((a, b) => a.value - b.value);
    const widths = viewport > 600 ? [viewport, viewport - SCROLLBAR] : [viewport];
    for (const width of widths) {
      const needed = (slotWidth(sizes, width) ?? width) * dpr;
      urls.add((sorted.find((c) => c.value >= needed) ?? sorted.at(-1)).url);
    }
  }
  return [...urls];
}

async function getHtml(path) {
  const response = await fetch(BASE + path);
  return response.ok ? response.text() : "";
}

async function main() {
  const started = Date.now();

  // Rutas: todas las páginas estáticas del build (incluye las que no están en el menú, como /congreso)…
  const home = await getHtml("/");
  const routes = new Set(["/"]);
  try {
    const { readFile } = await import("node:fs/promises");
    const manifest = JSON.parse(await readFile(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"));
    Object.keys(manifest.routes ?? {})
      .filter((route) => !route.startsWith("/_") && !route.startsWith("/studio") && !route.includes("."))
      .forEach((route) => routes.add(route));
  } catch {
    // Sin manifest (p. ej. corriendo contra otro servidor): alcanza con los links del home.
  }
  // …y las enlazadas desde el home (menú y footer).
  for (const [, href] of home.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (!href.startsWith("/_next") && !href.startsWith("/images") && !href.startsWith("/studio")) {
      routes.add(href);
    }
  }

  const urls = new Set();
  for (const route of routes) {
    const html = route === "/" ? home : await getHtml(route);
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      pickUrls(tag).forEach((url) => urls.add(url));
    }
  }

  const queue = [...urls];
  let done = 0;
  let failed = 0;
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      try {
        const response = await fetch(BASE + url, { headers: { Accept: "image/webp,image/*,*/*" } });
        await response.arrayBuffer();
        if (!response.ok) {
          failed += 1;
        }
      } catch {
        failed += 1;
      }
      done += 1;
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`[warm-images] ${routes.size} páginas, ${done} imágenes listas (${failed} con error) en ${seconds}s`);
}

main().catch((error) => {
  console.error("[warm-images] no se pudo precalentar:", error.message);
});
