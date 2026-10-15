"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./navigationProgress.module.css";

/**
 * Barra superior al navegar: feedback inmediato al clickear un link interno,
 * antes de que llegue el RSC / View Transition (evita el “corte duro”).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);
  const safetyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const nextPath = url.pathname;
      if (nextPath === window.location.pathname && url.hash) return;
      if (nextPath === window.location.pathname && !url.search) return;

      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
      setDone(false);
      setActive(true);
      // Por si la navegación falla o es tan cacheada que no dispara cambio.
      safetyTimer.current = window.setTimeout(() => setDone(true), 8000);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
    };
  }, []);

  // Llegó la página nueva: la barra se completa (ajuste durante el render, sin efecto en cascada).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (active) {
      setDone(true);
    }
  }

  // Completa: se desvanece y se oculta.
  useEffect(() => {
    if (!done) return;
    window.clearTimeout(safetyTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setActive(false);
      setDone(false);
    }, 320);
    return () => window.clearTimeout(hideTimer.current);
  }, [done]);

  if (!active && !done) return null;

  return (
    <div
      className={`${styles.bar} ${done ? styles.done : styles.loading}`}
      role="progressbar"
      aria-hidden="true"
    />
  );
}
