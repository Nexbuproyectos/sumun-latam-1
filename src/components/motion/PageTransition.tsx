"use client";

import { ViewTransition } from "react";
import { useEffect, useState } from "react";

import styles from "./pageTransition.module.css";

// Solo la primera pintura del sitio (no cada navegación: eso lo cubre View Transition).
let didFirstPaint = false;

/*
 * Envuelve el contenido de cada página: al navegar, la página que sale se desvanece
 * hacia arriba y la que entra aparece desde abajo (estilos en globals.css).
 * Va en cada page.tsx porque los layouts persisten entre navegaciones.
 * La primera carga del sitio entra con un fade suave.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(didFirstPaint);

  useEffect(() => {
    if (didFirstPaint) {
      setReady(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      didFirstPaint = true;
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => {
      didFirstPaint = true;
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className={`${styles.page} ${ready ? styles.ready : styles.entering}`}>{children}</div>
    </ViewTransition>
  );
}
