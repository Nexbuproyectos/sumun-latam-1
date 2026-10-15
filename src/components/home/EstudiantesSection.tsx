"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./estudiantes.module.css";

type Foto = {
  src: string;
  width: number;
  height: number;
};

type Estudiante = {
  id: string;
  label: string;
  title: string;
  text: string;
  gris: Foto;
  color: Foto;
  // Posición y tamaño de la foto dentro de la tarjeta de 380 × 433 (valores de Figma).
  photo: { top: number; left: number; width: number; height: number };
  // Degradado blanco del estado normal.
  fade: { top: number; height: number };
};

const estudiantes: Estudiante[] = [
  {
    id: "hombre-1",
    label: "Resultados",
    title: "Resultados",
    text: "Replanteamos la relación de los docentes con la tecnología, construimos, más que un entorno, una cultura completa y transformamos la manera en la que el maestro ve y activa el currículo. Más que resultados académicos, formamos personas que serán su mejor versión.",
    gris: { src: "/images/estudiantes/hombre-1-gris.png", width: 1024, height: 981 },
    color: { src: "/images/estudiantes/hombre-1-color.png", width: 4096, height: 3921 },
    photo: { top: -138, left: -108.24, width: 596.48, height: 571 },
    fade: { top: 88, height: 388 },
  },
  {
    id: "mujer",
    label: "Resultados",
    title: "Resultados",
    text: "Transformamos la manera en la que se relacionan con el entorno, el currículo y la tecnología. Más que sólo buenas notas, formamos estudiantes para ser su mejor versión.",
    gris: { src: "/images/estudiantes/mujer-gris.png", width: 635, height: 618 },
    color: { src: "/images/estudiantes/mujer-color.png", width: 635, height: 618 },
    photo: { top: 30, left: -17.54, width: 414.09, height: 403 },
    fade: { top: 88, height: 388 },
  },
  {
    id: "hombre-2",
    label: "Hábitos",
    title: "Hábitos",
    text: "Reconocemos los hábitos positivos como parte de un todo, donde el estudiante los asume como una cultura propia y no como una respuesta a un impulso autoritario. Hábitos que llevan a resultados.",
    gris: { src: "/images/estudiantes/hombre-2-gris.png", width: 471, height: 477 },
    color: { src: "/images/estudiantes/hombre-2-color.png", width: 471, height: 477 },
    photo: { top: -53, left: -50.44, width: 479.89, height: 486 },
    fade: { top: -24, height: 506 },
  },
];

// En el diseño la tarjeta del centro se muestra activa cuando no hay hover.
const DEFAULT_ACTIVE = 1;

export function EstudiantesSection() {
  const [active, setActive] = useState(DEFAULT_ACTIVE);

  return (
    <section className={styles.section} aria-labelledby="estudiantes-title">
      <div className={styles.stage}>
        <div className={styles.intro}>
          <h2 id="estudiantes-title" className={styles.title}>
            Estudiantes que progresan, mejoran y se nivelan
          </h2>
          <p className={styles.lead}>
            Visualizamos una educación que potencia los aprendizajes y mejora
            los resultados, a partir de integración de la inteligencia
            artificial y los datos en el núcleo de su misión, permitiendo
            experiencias de aprendizaje adaptadas, relevantes y significativas.
          </p>
          <a href="#" className={styles.button}>
            Conoce nuestro propósito
          </a>
        </div>

        <ul
          className={styles.cards}
          onMouseLeave={() => setActive(DEFAULT_ACTIVE)}
        >
          {estudiantes.map((item, index) => {
            const isActive = index === active;
            const photoStyle = {
              top: item.photo.top,
              left: item.photo.left,
              width: item.photo.width,
              height: item.photo.height,
            };

            return (
              <li
                key={item.id}
                className={isActive ? styles.itemActive : styles.item}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                tabIndex={0}
                aria-label={item.title}
              >
                <div className={styles.user}>
                  <span className={styles.glow} aria-hidden="true" />
                  <Image
                    className={styles.photoGris}
                    src={item.gris.src}
                    width={item.gris.width}
                    height={item.gris.height}
                    sizes="600px"
                    alt=""
                    style={photoStyle}
                  />
                  <Image
                    className={styles.photoColor}
                    src={item.color.src}
                    width={item.color.width}
                    height={item.color.height}
                    sizes="600px"
                    alt=""
                    style={photoStyle}
                  />
                  <span
                    className={styles.fade}
                    style={{ top: item.fade.top, height: item.fade.height }}
                    aria-hidden="true"
                  />
                  <p className={styles.userLabel} aria-hidden="true">
                    {item.label}
                  </p>
                </div>

                <div className={styles.mejor} aria-hidden={!isActive}>
                  <div className={styles.mejorHead}>
                    <h3 className={styles.mejorTitle}>{item.title}</h3>
                    <img loading="lazy" decoding="async"
                      className={styles.mejorIcon}
                      src="/images/estudiantes/ia.svg"
                      alt=""
                      width={31.948}
                      height={31.948}
                    />
                  </div>
                  <p className={styles.mejorText}>{item.text}</p>
                  <div className={styles.mejorFoot}>
                    <img loading="lazy" decoding="async"
                      className={styles.logo}
                      src="/images/estudiantes/sumun-logo.jpg"
                      alt="Sumun"
                    />
                    <p className={styles.tagline}>Somos esa diferencia</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
