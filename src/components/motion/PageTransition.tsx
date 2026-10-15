"use client";

import { ViewTransition } from "react";
import { useEffect, useState } from "react";

import styles from "./pageTransition.module.css";

// Pasa a true después de la primera página: de ahí en más las entradas las anima View Transition.
let didFirstPaint = false;

/*
 * Envuelve el contenido de cada página: al navegar, la página que sale se desvanece
 * hacia arriba y la que entra aparece desde abajo (estilos en globals.css).
 * Va en cada page.tsx porque los layouts persisten entre navegaciones.
 *
 * La primera carga del sitio entra con una animación solo de CSS: arranca con el HTML,
 * sin esperar a que cargue el JavaScript (antes la página quedaba invisible hasta hidratar).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  // Se decide una vez por página: en el servidor y en la hidratación da lo mismo (sin desajustes).
  const [firstPaint] = useState(() => !didFirstPaint);

  useEffect(() => {
    didFirstPaint = true;
  }, []);

  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className={firstPaint ? `${styles.page} ${styles.firstPaint}` : styles.page}>{children}</div>
    </ViewTransition>
  );
}
