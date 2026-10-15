"use client";

import Image from "next/image";
import { useRef } from "react";

import styles from "./agenda.module.css";
import { useAlLlegar } from "./useAlLlegar";

const ods = [4, 5, 8, 10, 12, 13, 16, 17];

// Destello de cada tarjeta: ciclo y desfase distintos (fijos, para que no choquen con la hidratación),
// así nunca brillan todas juntas.
const destellos = [
  [7.3, 0.4], [9.1, 3.2], [8.2, 5.9], [10.4, 1.7],
  [7.8, 6.8], [9.7, 2.5], [8.6, 4.4], [10.9, 7.6],
];

export function AgendaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useAlLlegar(sectionRef, (section) => {
    section.dataset.revealed = "true";
  }, 0.2);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="agenda-title">
      <div className={styles.content}>
        <div className={styles.texts}>
          <h2 id="agenda-title" className={styles.title}>
            Compromiso con la Agenda 2030
          </h2>
          <div className={styles.parrafos}>
            <p>
              En 2022, lanzamos nuestro Plan Director de Sostenibilidad, alineado
              con la Agenda 2030 de la ONU. Priorizamos ocho Objetivos de
              Desarrollo Sostenible (ODS) para generar un impacto positivo en las
              personas y el planeta.
            </p>
            <p>
              Cada compromiso implica unas metas e indicadores de rendimiento con
              el objetivo de lograr un impacto positivo real en las personas y en
              el planeta, lo que dará lugar a cambios internos y externos a la
              organización.
            </p>
          </div>
        </div>

        <ul className={styles.grilla}>
          {ods.map((n, i) => (
            <li
              key={n}
              className={styles.ods}
              style={
                {
                  "--i": i,
                  "--ciclo": `${destellos[i][0]}s`,
                  "--desfase": `${destellos[i][1]}s`,
                } as React.CSSProperties
              }
            >
              <Image
                src={`/images/impacto-social/ods/ods-${String(n).padStart(2, "0")}.png`}
                width={400}
                height={400}
                sizes="129px"
                alt={`Objetivo de Desarrollo Sostenible ${n}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Elementos 3D (522.83 × 702, cover) girados desde su esquina superior izquierda. */}
      <div className={`${styles.decor} ${styles.decorIzq}`} aria-hidden="true">
        <img loading="lazy" decoding="async" src="/images/impacto-social/decorativo-3d.webp" alt="" />
      </div>
      <div className={`${styles.decor} ${styles.decorDer}`} aria-hidden="true">
        <img loading="lazy" decoding="async" src="/images/impacto-social/decorativo-3d.webp" alt="" />
      </div>
    </section>
  );
}
