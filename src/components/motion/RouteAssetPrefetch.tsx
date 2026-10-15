"use client";

import { useEffect } from "react";

import { prefetchRouteAssets, prefetchRoutesInSequence } from "./routeAssets";

// Solo en pantallas de escritorio se precargan de antemano todas las páginas del menú.
const DESKTOP_MIN_WIDTH = 1024;

/*
 * Prepara las páginas a las que probablemente se va a navegar (ver routeAssets.ts):
 *  - en escritorio, cuando la página actual terminó de cargar y el navegador está libre, precarga de a una
 *    las páginas del menú, así la primera navegación se ve tan fluida como las siguientes;
 *  - en cualquier dispositivo, al mostrar intención (mouse encima, foco o dedo sobre un link interno).
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

    let cancelled = false;
    let idleId: number | undefined;
    let timer: number | undefined;

    const warmMenu = () => {
      if (cancelled || window.innerWidth < DESKTOP_MIN_WIDTH) {
        return;
      }
      const hrefs = Array.from(
        new Set(
          Array.from(document.querySelectorAll<HTMLAnchorElement>("header a[href^='/']"))
            .map((a) => a.getAttribute("href")?.split("#")[0] || "/")
            .filter((href) => href !== window.location.pathname),
        ),
      );
      prefetchRoutesInSequence(hrefs);
    };

    // Después de que la página terminó de cargar y con el navegador libre.
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") {
          idleId = window.requestIdleCallback(warmMenu, { timeout: 3000 });
        } else {
          warmMenu();
        }
      }, 1500);
    };
    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("touchstart", onIntent);
      window.removeEventListener("load", schedule);
      window.clearTimeout(timer);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return null;
}
