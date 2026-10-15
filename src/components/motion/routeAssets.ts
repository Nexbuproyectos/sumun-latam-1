/*
 * Precarga lo que se ve primero de una página (imágenes del hero y fuentes) antes de navegar a ella.
 *
 * Por qué: Next precarga el contenido de la ruta pero no sus imágenes. La primera vez que se entraba
 * a una página, la animación de entrada arrancaba con el hero vacío y las imágenes iban apareciendo
 * de a una (~30 pedidos de 300–900 ms en Render). La segunda vez, con todo en caché, se veía perfecta.
 * Con esto la primera vez se ve igual que la segunda.
 *
 * Cómo: se pide el HTML estático de la ruta (cacheado en el servidor) y se descargan:
 *  - las imágenes marcadas como principales (<link rel="preload"> que genera next/image con `preload`),
 *  - todas las imágenes de las dos primeras secciones (el hero y lo que asoma debajo),
 *  - las fuentes de la página.
 * Las imágenes se bajan con `new Image()` usando el mismo srcset/sizes que la página real, así el
 * navegador elige la misma versión y después la toma de su caché.
 */

const requested = new Map<string, Promise<void>>();
const warmed = new Set<string>();
const fonts = new Set<string>();
// Referencias vivas mientras descargan.
const pending = new Set<HTMLImageElement>();

type Connection = { saveData?: boolean; effectiveType?: string };

function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection;
}

// Ahorro de datos activado o conexión lenta: no se precarga nada.
export function canPrefetch() {
  const info = connection();
  if (info?.saveData) {
    return false;
  }
  return !info?.effectiveType || info.effectiveType === "4g";
}

function warmImage(src: string | null, srcset: string | null, sizes: string | null) {
  if ((!src || src.startsWith("data:")) && !srcset) {
    return;
  }
  const key = `${srcset ?? ""}|${src ?? ""}|${sizes ?? ""}`;
  if (warmed.has(key)) {
    return;
  }
  warmed.add(key);
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low";
  if (sizes) {
    img.sizes = sizes;
  }
  if (srcset) {
    img.srcset = srcset;
  }
  if (src) {
    img.src = src;
  }
  pending.add(img);
  const release = () => pending.delete(img);
  img.addEventListener("load", release, { once: true });
  img.addEventListener("error", release, { once: true });
}

function warmFont(link: Element) {
  const href = link.getAttribute("href");
  if (!href || fonts.has(href)) {
    return;
  }
  fonts.add(href);
  const copy = document.createElement("link");
  copy.rel = "preload";
  copy.as = "font";
  copy.href = href;
  copy.type = link.getAttribute("type") ?? "font/woff2";
  copy.crossOrigin = "anonymous";
  document.head.appendChild(copy);
}

export function prefetchRouteAssets(href: string | null | undefined): Promise<void> {
  if (!href || typeof window === "undefined" || !canPrefetch()) {
    return Promise.resolve();
  }
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return Promise.resolve();
  }
  const path = url.pathname;
  if (url.origin !== window.location.origin || path === window.location.pathname || path.startsWith("/studio")) {
    return Promise.resolve();
  }
  const existing = requested.get(path);
  if (existing) {
    return existing;
  }

  const job = fetch(path, { credentials: "same-origin", priority: "low" } as RequestInit)
    .then((response) => (response.ok ? response.text() : ""))
    .then((html) => {
      if (!html) {
        return;
      }
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.head.querySelectorAll('link[rel="preload"][as="image"]').forEach((link) => {
        warmImage(link.getAttribute("href"), link.getAttribute("imagesrcset"), link.getAttribute("imagesizes"));
      });
      doc.head.querySelectorAll('link[rel="preload"][as="font"]').forEach(warmFont);
      // Las dos primeras secciones: lo que se ve al entrar y lo que asoma justo debajo.
      Array.from(doc.querySelectorAll("main section"))
        .slice(0, 2)
        .forEach((section) =>
          section
            .querySelectorAll("img")
            .forEach((img) => warmImage(img.getAttribute("src"), img.getAttribute("srcset"), img.getAttribute("sizes"))),
        );
    })
    .catch(() => {
      // Se reintenta en la próxima oportunidad.
      requested.delete(path);
    });
  requested.set(path, job);
  return job;
}

// Precarga varias rutas de a una, con una pausa entre cada una para no competir con la página actual.
export async function prefetchRoutesInSequence(hrefs: string[], pauseMs = 600) {
  for (const href of hrefs) {
    if (!canPrefetch()) {
      return;
    }
    await prefetchRouteAssets(href);
    await new Promise((resolve) => setTimeout(resolve, pauseMs));
  }
}
