"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Bloques que aparecen al hacer scroll (sin tocar cada componente).
const SELECTOR = "main section :is(h1, h2, h3, p, article, li, a[class], ol, ul[class])";
const STAGGER_MS = 90;
const MAX_DELAY_MS = 450;

/*
 * Marca los bloques de contenido de <main> y los revela con una animación de entrada
 * cuando llegan a la pantalla. Los estilos están en globals.css ([data-reveal]).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const set = new Set(candidates);

    // Solo el bloque más externo: si un <li> ya se revela, su <p> interno no.
    const targets = candidates.filter((el) => {
      let parent = el.parentElement;
      while (parent && parent.tagName !== "MAIN") {
        if (set.has(parent)) {
          return false;
        }
        parent = parent.parentElement;
      }
      // Sin caja (oculto por CSS en este tamaño de pantalla): nunca se cruzaría con la pantalla.
      if (el.getClientRects().length === 0) {
        return false;
      }
      // Decorativos, paneles de pestañas (cambian de contenido) y ocultos quedan fuera.
      return !el.closest("[aria-hidden='true'], [data-no-reveal], [role='tabpanel'], [hidden]");
    });

    // Escalonado entre hermanos del mismo contenedor.
    const counters = new Map<Element | null, number>();
    for (const el of targets) {
      const index = counters.get(el.parentElement) ?? 0;
      counters.set(el.parentElement, index + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`);
      el.dataset.reveal = "pending";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            // Ya quedó por encima de la pantalla (llegada por ancla o scroll restaurado): se muestra sin animar.
            if (entry.boundingClientRect.bottom < 0) {
              observer.unobserve(el);
              delete el.dataset.reveal;
              el.style.removeProperty("--reveal-delay");
            }
            continue;
          }
          observer.unobserve(el);
          el.dataset.reveal = "in";
          el.addEventListener(
            "animationend",
            () => {
              delete el.dataset.reveal;
              el.style.removeProperty("--reveal-delay");
            },
            { once: true },
          );
        }
      },
      // threshold 0: los carruseles miden varias pantallas de ancho y nunca llegan a un % visible alto.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      targets.forEach((el) => {
        delete el.dataset.reveal;
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
