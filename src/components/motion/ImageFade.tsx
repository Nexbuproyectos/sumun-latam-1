"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const FADE_MS = 600;

/*
 * Las imágenes que todavía no cargaron aparecen con un fundido cuando llegan,
 * en vez de pintarse de golpe (o a franjas) a mitad de la animación.
 * Las que ya están en caché no se tocan: se ven al instante.
 * Estilos en globals.css ([data-img-fade]).
 */
export function ImageFade() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    const timers = new Set<number>();

    const prepare = (img: HTMLImageElement) => {
      // Los grupos con su propia entrada (p. ej. las capas del banner) no se tocan.
      if (img.dataset.imgFade || (img.complete && img.naturalWidth > 0) || img.closest("[data-img-group]")) {
        return;
      }
      img.dataset.imgFade = "pending";
      const reveal = () => {
        img.dataset.imgFade = "in";
        // Al terminar se quita la marca para no pisar otras transiciones de la imagen (hover, etc.).
        const timer = window.setTimeout(() => {
          delete img.dataset.imgFade;
          timers.delete(timer);
        }, FADE_MS);
        timers.add(timer);
      };
      img.addEventListener("load", reveal, { once: true });
      img.addEventListener("error", reveal, { once: true });
    };

    main.querySelectorAll("img").forEach(prepare);

    // Imágenes que aparecen después (pestañas, páginas de un carrusel, etc.).
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            prepare(node);
          } else if (node instanceof Element) {
            node.querySelectorAll("img").forEach(prepare);
          }
        });
      }
    });
    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      main.querySelectorAll<HTMLImageElement>("img[data-img-fade]").forEach((img) => {
        delete img.dataset.imgFade;
      });
    };
  }, [pathname]);

  return null;
}
