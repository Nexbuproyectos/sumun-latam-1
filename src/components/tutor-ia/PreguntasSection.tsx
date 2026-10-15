"use client";

import { useRef } from "react";

import styles from "./preguntas.module.css";
import { useAlLlegar } from "./useAlLlegar";

const items = [
  {
    title: "Aprendizaje impulsado por preguntas",
    paragraphs: [
      "Técnica pedagógica que fomenta el aprendizaje activo y el pensamiento crítico mediante el uso de preguntas guiadas y reflexivas, en lugar de proporcionar respuestas directas",
      "Se enfoca en descomponer temas complejos en pasos accesibles y comprensibles. Se adapta a los distintos niveles de desarrollo, estilos de aprendizaje y ritmos individuales.",
    ],
  },
  // Pendiente: el texto de estos ítems no está en el diseño.
  { title: "Uso exclusivo pedagógico: la verdadera IA educativa", paragraphs: [] },
  { title: "Seguridad y trazabilidad: Confianza y control", paragraphs: [] },
  { title: "Disponible en todas las áreas: Apoyo integral", paragraphs: [] },
  { title: "Personalización y adaptación a necesidades especiales", paragraphs: [] },
];

export function PreguntasSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // El primer ítem se abre (animado) cuando la sección entra en pantalla.
  useAlLlegar(sectionRef, (section) => {
    const primero = section.querySelector("details");
    if (primero) {
      primero.open = true;
    }
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Acordeón nativo: `name` compartido hace que solo quede uno abierto. */}
      <div className={styles.list}>
        {items.map((item) => (
          <details
            key={item.title}
            name="tutor-ia-caracteristicas"
            className={styles.item}
          >
            <summary className={styles.summary}>
              <img loading="lazy" decoding="async"
                className={styles.arrow}
                src="/images/tutor-ia/flecha.svg"
                alt=""
                width={36}
                height={36}
              />
              {item.title}
            </summary>
            {item.paragraphs.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}
          </details>
        ))}
      </div>

      <div className={styles.video}>
        <video
          src="/videos/tutor-ia.mp4"
          poster="/images/tutor-ia/video-poster.jpg"
          width={640}
          height={1056}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Demostración del Tutor IA"
        />
      </div>
    </section>
  );
}
