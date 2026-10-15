"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./recursos.module.css";

type Recurso = { autor: string; titulo: string; imagen: string; archivo: string };

// Presentaciones del congreso. "Nombre de autor" y los archivos ("#") están así en Figma: faltan los datos reales.
const recursos: Recurso[] = [
  { autor: "Eddie Tapiero", titulo: "Cuando un sueño se convierte en estrategia", imagen: "/images/congreso/recurso-1.jpg", archivo: "#" },
  { autor: "Nombre de autor", titulo: "Diversidad, género y evidencia para educar", imagen: "/images/congreso/recurso-2.jpg", archivo: "#" },
  { autor: "Gustavo Rodríguez", titulo: "Terpel Panamá", imagen: "/images/congreso/recurso-3.jpg", archivo: "#" },
  { autor: "Ernesto Nuñez", titulo: "23 manos una duda", imagen: "/images/congreso/recurso-4.jpg", archivo: "#" },
  { autor: "Hector Ruiz", titulo: "El esfuerzo inteligente detrás del aprendizaje eficaz", imagen: "/images/congreso/recurso-5.jpg", archivo: "#" },
  { autor: "Nombre de autor", titulo: "Hay ciudades que se visitan. Panamá se interpreta", imagen: "/images/congreso/recurso-6.jpg", archivo: "#" },
];

// La grilla muestra 6 recursos (2 filas de 3); las flechas pasan de página cuando haya más.
const POR_PAGINA = 6;

// "Revive y profundiza lo que compartimos" (1100:8179).
export function RecursosSection() {
  const [pagina, setPagina] = useState(0);
  const paginas = Math.ceil(recursos.length / POR_PAGINA);
  const visibles = recursos.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);

  return (
    <section id="recursos" className={styles.section} aria-labelledby="recursos-title">
      <div className={styles.stage}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h2 id="recursos-title" className={styles.title}>
              Revive y profundiza lo que compartimos
            </h2>
            <p className={styles.lead}>
              Accede a los contenidos y recursos del Congreso para continuar las conversaciones y
              llevar nuevas ideas de transformación a tu comunidad educativa.
            </p>
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Recursos anteriores"
              disabled={pagina === 0}
              onClick={() => setPagina((p) => p - 1)}
            >
              <img loading="lazy" decoding="async" className={styles.arrowPrev} src="/images/diagnostico/flecha-carrusel.svg" alt="" width={24} height={24} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Más recursos"
              disabled={pagina >= paginas - 1}
              onClick={() => setPagina((p) => p + 1)}
            >
              <img loading="lazy" decoding="async" className={styles.arrowNext} src="/images/diagnostico/flecha-carrusel.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        <ul key={pagina} className={styles.grid} aria-live="polite">
          {visibles.map((recurso) => (
            <li key={recurso.titulo} className={styles.card}>
              <div className={styles.media}>
                <Image src={recurso.imagen} width={760} height={626} sizes="380px" alt="" />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <p className={styles.autor}>{recurso.autor}</p>
                  <h3 className={styles.titulo}>{recurso.titulo}</h3>
                </div>
                <a className={styles.descargar} href={recurso.archivo} download>
                  <img loading="lazy" decoding="async" src="/images/congreso/descargar.svg" alt="" width={22} height={22} />
                  Descargar
                  <span className="sr-only">: {recurso.titulo}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
