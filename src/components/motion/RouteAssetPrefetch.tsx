"use client";

import { useEffect } from "react";

import { prefetchRouteAssets } from "./routeAssets";

/*
 * Escucha la intención de navegar (mouse encima, foco con teclado o dedo apoyado en un link interno)
 * y precarga las imágenes principales de esa página. Ver routeAssets.ts.
 */
export function RouteAssetPrefetch() {
  useEffect(() => {
    const onIntent = (event: Event) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      const href = anchor?.getAttribute("href");
      if (href && href.startsWith("/") && !anchor?.hasAttribute("download")) {
        prefetchRouteAssets(href);
      }
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    document.addEventListener("touchstart", onIntent, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("touchstart", onIntent);
    };
  }, []);

  return null;
}
