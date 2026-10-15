"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import styles from "./tutor.module.css";

export function TutorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Respaldo para navegadores sin animaciones ligadas al scroll:
  // los vidrios se abren con una transición al entrar la sección en pantalla.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || CSS.supports("animation-timeline: view()")) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tutor-ia"
      className={styles.section}
      aria-labelledby="tutor-title"
    >
      <div className={styles.stage}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Tutor IA</p>
          <h2 id="tutor-title" className={styles.title}>
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
              src="/images/tutor/mockup.jpg"
              width={1262}
              height={872}
              sizes="(min-width: 1100px) 940px, 90vw"
              alt="Vista previa del Tutor IA de Sumun"
            />
          </div>
          <span className={styles.veil} aria-hidden="true" />
          <a href="#" className={styles.demo}>
            Ver demo IA
            <img loading="lazy" decoding="async"
              src="/images/tutor/ia-blanco.svg"
              alt=""
              width={19.4606}
              height={19.4606}
            />
          </a>
        </div>

        <div className={`${styles.forma} ${styles.formaIzq}`} aria-hidden="true">
          <Image
            src="/images/tutor/forma-izq.png"
            width={1024}
            height={491}
            sizes="82vw"
            alt=""
          />
        </div>
        <div className={`${styles.forma} ${styles.formaDer}`} aria-hidden="true">
          <Image
            src="/images/tutor/forma-der.png"
            width={1024}
            height={773}
            sizes="78vw"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
