"use client";

import Image from "next/image";
import { useRef } from "react";

import styles from "./impulsando.module.css";
import { useAlLlegar } from "./useAlLlegar";

export function ImpulsandoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Al llegar a la sección, las formas se corren hacia los costados y descubren el contenido.
  useAlLlegar(sectionRef, (section) => {
    section.dataset.revealed = "true";
  });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="impulsando-title"
    >
      <div className={styles.stage}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Tutor IA</p>
          <h2 id="impulsando-title" className={styles.title}>
            Impulsando el aprendizaje{" "}
            <span className={styles.accent}>personalizado</span>
          </h2>
          <p className={styles.lead}>
            Nuestro Tutor IA ofrece un acompañamiento personalizado 24/7,
            transformando la educación con inteligencia artificial que va más
            allá de respuestas simples. Fomenta el pensamiento crítico, la
            reflexión profunda y el autoaprendizaje, fortaleciendo el potencial
            de los estudiantes.
          </p>
        </div>

        <div className={styles.mockup}>
          <div className={styles.mockupImage}>
            <Image
              src="/images/tutor-ia/impulsando-mockup.jpg"
              width={1262}
              height={872}
              sizes="(min-width: 1100px) 940px, 90vw"
              alt="Vista previa del Tutor IA de Sumun"
            />
          </div>
          <span className={styles.veil} aria-hidden="true" />
          <a href="#" className={styles.demo}>
            Ver demo IA
            <img src="/images/tutor-ia/ia-blanco.svg" alt="" width={15} height={15} />
          </a>
        </div>

        {/* Formas de vidrio: arrancan en su posición de Figma, encima de todo. */}
        <div className={`${styles.forma} ${styles.formaIzq}`} aria-hidden="true">
          <Image
            src="/images/tutor-ia/forma-izq.png"
            width={2400}
            height={1149}
            sizes="82vw"
            alt=""
          />
        </div>
        <div className={`${styles.forma} ${styles.formaDer}`} aria-hidden="true">
          <Image
            src="/images/tutor-ia/forma-der.png"
            width={2400}
            height={1811}
            sizes="78vw"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
