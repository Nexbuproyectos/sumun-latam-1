"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./novedades.module.css";

type Noticia = {
  id: string;
  title: string;
  text: string;
  href: string;
  image: { src: string; width: number; height: number; className?: string };
};

const noticias: Noticia[] = [
  {
    id: "data-center",
    title: "SUMUN Data Center",
    text: "La toma de decisiones pedagógicas nunca había estado tan bien informada.",
    href: "#",
    image: { src: "/images/novedades/data-center.jpg", width: 766, height: 700 },
  },
  {
    id: "home",
    title: "SUMUN Home",
    text: "Un espacio donde estudiantes, docentes y familias pueden conectarse con claridad y propósito.",
    href: "#",
    image: { src: "/images/novedades/home.jpg", width: 766, height: 700 },
  },
  {
    id: "office",
    title: "Sumun Office",
    text: "Lanzamiento de Sumun en Colombia en Mesa Nacional",
    href: "#",
    image: { src: "/images/novedades/office.jpg", width: 766, height: 700 },
  },
  {
    id: "office-lanzamiento",
    title: "Sumun Office",
    text: "Lanzamiento de Sumun en Colombia en Mesa Nacional",
    href: "#",
    image: {
      src: "/images/novedades/aula.jpg",
      width: 626,
      height: 417,
      className: styles.aula,
    },
  },
];

const COUNT = noticias.length;
const VISIBLE = 3;
// La pista repite la lista 3 veces para que el loop sea continuo.
const track = [...noticias, ...noticias, ...noticias];

// Lleva cualquier posición a su equivalente en la copia del medio de la pista.
function normalize(pos: number) {
  return ((((pos - COUNT) % COUNT) + COUNT) % COUNT) + COUNT;
}

export function NovedadesSection() {
  // Índice (en la pista) de la primera tarjeta visible. Arranca en la copia del medio.
  const [pos, setPos] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const startX = useRef<number | null>(null);

  function go(delta: number) {
    // Sin animación no hay transitionend: normalizamos a la copia del medio en el momento.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setPos((current) => normalize(current + delta));
      return;
    }
    setAnimate(true);
    setPos((current) => current + delta);
  }

  // Al terminar la transición, si salimos de la copia del medio, saltamos sin animar.
  function onTransitionEnd() {
    if (pos >= COUNT * 2 || pos < COUNT) {
      setAnimate(false);
      setPos(normalize);
    }
  }

  return (
    <section id="novedades" className={styles.section} aria-labelledby="novedades-title">
      <div className={styles.stage}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Novedades</p>
            <h2 id="novedades-title" className={styles.title}>
              Lo último de Sumun
            </h2>
            <p className={styles.lead}>
              Te mantenemos al día con las nuevas funcionalidades, ideas y
              herramientas que transforman la experiencia educativa
            </p>
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Noticia anterior"
              onClick={() => go(-1)}
            >
              <img
                className={styles.arrowPrev}
                src="/images/novedades/flecha.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Noticia siguiente"
              onClick={() => go(1)}
            >
              <img
                className={styles.arrowNext}
                src="/images/novedades/flecha.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <div
          className={styles.viewport}
          data-no-reveal
          role="region"
          aria-roledescription="carrusel"
          aria-label="Novedades"
          onPointerDown={(event) => {
            startX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (startX.current === null) {
              return;
            }
            const delta = event.clientX - startX.current;
            startX.current = null;
            if (delta <= -50) {
              go(1);
            } else if (delta >= 50) {
              go(-1);
            }
          }}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          <ul
            className={styles.track}
            style={{
              ["--pos" as string]: pos,
              transition: animate ? undefined : "none",
            }}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget) {
                onTransitionEnd();
              }
            }}
          >
            {track.map((noticia, index) => {
              const visible = index >= pos && index < pos + VISIBLE;

              return (
                <li
                  key={`${noticia.id}-${index}`}
                  className={visible ? styles.card : styles.cardDimmed}
                  aria-hidden={!visible}
                  inert={!visible}
                >
                  <div className={styles.media}>
                    <Image
                      className={noticia.image.className}
                      src={noticia.image.src}
                      width={noticia.image.width}
                      height={noticia.image.height}
                      sizes="383px"
                      alt=""
                      draggable={false}
                    />
                    {noticia.image.className ? (
                      <span className={styles.veil} aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.cardTitle}>{noticia.title}</h3>
                    <p className={styles.cardText}>{noticia.text}</p>
                    <a className={styles.link} href={noticia.href}>
                      Leer noticia completa
                      <img
                        src="/images/novedades/link.svg"
                        alt=""
                        width={13.414}
                        height={13.414}
                      />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
