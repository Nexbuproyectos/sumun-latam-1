/*
 * Precarga las imágenes principales y las fuentes de una página cuando el usuario muestra intención
 * de ir (pasa el mouse por el link, lo enfoca o abre un menú).
 *
 * Por qué: al navegar, React espera a las imágenes visibles de la página nueva (hasta ~0.8 s) antes
 * de mostrarla. Next precarga el contenido de la ruta pero no sus imágenes, así que la primera vez
 * la pantalla quedaba congelada. Si las imágenes ya están en caché al hacer click, la página entra al instante.
 *
 * Cómo: se pide el HTML estático de la ruta (ya está cacheado en el servidor) y se copian sus
 * <link rel="preload"> de imágenes y fuentes al documento actual. Son las mismas pistas que el servidor
 * genera para esa página (next/image con `preload`, fuentes de next/font), con su srcset y sizes exactos,
 * así que el navegador baja justo la versión que después va a usar.
 */

const requested = new Set<string>();
const injected = new Set<string>();

function shouldSkip() {
  // Respeta el "ahorro de datos" del usuario.
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

function inject(link: Element) {
  const as = link.getAttribute("as");
  const key = `${as}|${link.getAttribute("imagesrcset") ?? ""}|${link.getAttribute("href") ?? ""}`;
  if (injected.has(key)) {
    return;
  }
  injected.add(key);
  const copy = document.createElement("link");
  for (const attr of ["rel", "as", "href", "imagesrcset", "imagesizes", "type", "crossorigin", "media"]) {
    const value = link.getAttribute(attr);
    if (value !== null) {
      copy.setAttribute(attr, value);
    }
  }
  // Prioridad baja: no compite con lo que se está viendo ahora.
  copy.setAttribute("fetchpriority", "low");
  document.head.appendChild(copy);
}

export function prefetchRouteAssets(href: string | null | undefined) {
  if (!href || typeof window === "undefined" || shouldSkip()) {
    return;
  }
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return;
  }
  const path = url.pathname;
  if (url.origin !== window.location.origin || path === window.location.pathname || path.startsWith("/studio")) {
    return;
  }
  if (requested.has(path)) {
    return;
  }
  requested.add(path);

  fetch(path, { credentials: "same-origin", priority: "low" } as RequestInit)
    .then((response) => (response.ok ? response.text() : ""))
    .then((html) => {
      if (!html) {
        return;
      }
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.head
        .querySelectorAll('link[rel="preload"][as="image"], link[rel="preload"][as="font"]')
        .forEach(inject);
    })
    .catch(() => {
      // Se reintenta en la próxima intención.
      requested.delete(path);
    });
}
