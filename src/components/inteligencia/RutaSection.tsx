"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./ruta.module.css";

const I = "/images/inteligencia";

type Etapa = {
  id: string;
  label: string;
  title: string;
  icon: { src: string; w: number; h: number; rotate?: boolean };
  photo: { src: string; w: number; h: number; className: string };
  // El degradado oscuro va a la izquierda o a la derecha según dónde está el texto.
  side: "left" | "right";
};

const etapas: Etapa[] = [
  {
    id: "partida",
    label: "Punto de partida",
    title: "Punto de partida",
    icon: { src: "ruta-home.svg", w: 51.3834, h: 51.3834 },
    photo: { src: "ruta-partida.jpg", w: 3840, h: 2160, className: styles.fotoPartida },
    side: "left",
  },
  {
    id: "estaciones",
    label: "Estaciones",
    title: "Estaciones",
    icon: { src: "ruta-route.svg", w: 51.3834, h: 51.3834, rotate: true },
    photo: { src: "ruta-estaciones.jpg", w: 2048, h: 1080, className: styles.fotoEstaciones },
    side: "right",
  },
  {
    id: "llegada",
    label: "Punto de llegada",
    title: "Punto de llegada",
    icon: { src: "ruta-medal.svg", w: 47.437, h: 48.1719 },
    photo: { src: "ruta-llegada.jpg", w: 2048, h: 1080, className: styles.fotoLlegada },
    side: "left",
  },
];

const AUTOPLAY_MS = 7000;

function Contenido({ id }: { id: string }) {
  if (id === "partida") {
    return (
      <p className={styles.texto}>
        Prepara al estudiante para desarrollar la macrohabilidad, promoviendo la
        conciencia metacognitiva y autorregulación sobre las microhabilidades
        que abordará.
      </p>
    );
  }
  if (id === "estaciones") {
    return (
      <p className={styles.texto}>
        Son espacios donde los estudiantes adquieren, consolidan y aproximan las
        microhabilidades.
      </p>
    );
  }
  return (
    <>
      <p className={styles.textoLlegada}>
        Evalúa el logro de la macrohabilidad, incluyendo:
      </p>
      <p className={styles.textoItem}>
        <strong>Preparación para la evaluación:</strong> Técnicas de estudio para
        prepararse a exámenes.
      </p>
      <p className={styles.textoItem}>
        <b>Autoevaluación:</b> Percepción del estudiante sobre su desarrollo y
        compromisos adquiridos
      </p>
    </>
  );
}

export function RutaSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % etapas.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <section className={styles.section} aria-labelledby="ruta-title">
      <div className={styles.intro}>
        <h2 id="ruta-title" className={styles.title}>
          Ruta Sumun ¡Así lo logramos!
        </h2>
        <p className={styles.lead}>
          El método didáctico de Sumun organiza el aprendizaje en itinerarios
          organizados en tres etapas
        </p>
      </div>

      <div
        className={styles.card}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Etapas de la Ruta Sumun"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {etapas.map((etapa, index) => {
          const isActive = index === active;
          return (
            <div
              key={etapa.id}
              id={`ruta-${etapa.id}`}
              role="tabpanel"
              aria-labelledby={`ruta-tab-${etapa.id}`}
              aria-hidden={!isActive}
              className={isActive ? `${styles.slide} ${styles.slideActive}` : styles.slide}
            >
              <div className={`${styles.foto} ${etapa.photo.className}`} aria-hidden="true">
                <Image
                  src={`${I}/${etapa.photo.src}`}
                  width={etapa.photo.w}
                  height={etapa.photo.h}
                  sizes="(min-width: 1200px) 1370px, 120vw"
                  alt=""
                />
              </div>
              <span className={styles.tinte} aria-hidden="true" />
              <span
                className={etapa.side === "left" ? styles.degradadoIzq : styles.degradadoDer}
                aria-hidden="true"
              />

              <img
                className={`${styles.linea} ${styles[`linea_${etapa.id}`]}`}
                src={`${I}/${etapa.id === "llegada" ? "ruta-linea-lleg.svg" : "ruta-linea.svg"}`}
                alt=""
                width={992.5}
                height={241.5}
                aria-hidden="true"
              />
              {etapa.id === "estaciones" ? (
                <img
                  className={`${styles.linea} ${styles.linea_estaciones_b}`}
                  src={`${I}/ruta-linea-est-b.svg`}
                  alt=""
                  width={892.5}
                  height={241.5}
                  aria-hidden="true"
                />
              ) : null}

              <div className={`${styles.contenido} ${styles[`contenido_${etapa.id}`]}`}>
                {etapa.id !== "estaciones" ? (
                  <span className={styles.icono} aria-hidden="true">
                    <img
                      src={`${I}/${etapa.icon.src}`}
                      alt=""
                      width={etapa.icon.w}
                      height={etapa.icon.h}
                    />
                  </span>
                ) : null}
                <h3 className={styles.etapaTitle}>{etapa.title}</h3>
                <Contenido id={etapa.id} />
                {etapa.id === "estaciones" ? (
                  <span className={styles.icono} aria-hidden="true">
                    <img
                      src={`${I}/${etapa.icon.src}`}
                      alt=""
                      width={etapa.icon.w}
                      height={etapa.icon.h}
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.pasos} role="tablist" aria-label="Etapas">
        {etapas.map((etapa, index) => (
          <button
            key={etapa.id}
            id={`ruta-tab-${etapa.id}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`ruta-${etapa.id}`}
            className={index === active ? `${styles.paso} ${styles.pasoActivo}` : styles.paso}
            onClick={() => setActive(index)}
          >
            <span className={styles.pasoNum}>{index + 1}</span>
            {etapa.label}
          </button>
        ))}
      </div>
    </section>
  );
}
