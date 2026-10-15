"use client";

import Image from "next/image";
import { useRef } from "react";

import styles from "./novedades.module.css";
import { useAlLlegar } from "./useAlLlegar";

type Nota = {
  image: { src: string; width: number; height: number; className: string };
  tag: string;
  title: string;
  text: string;
  authors: string[];
  byline: string;
};

const destacada: Nota = {
  image: {
    src: "/images/conversaciones-sumun/nota-cultura.jpg",
    width: 1800,
    height: 1013,
    className: styles.fotoCultura,
  },
  tag: "Cultura",
  title: "La cultura como suelo del aprendizaje",
  text: "En esta Conversación SUMUN, el filósofo y pedagogo Gregorio Luri reflexiona sobre la cultura como el suelo donde arraiga la educación: un espacio donde los saberes no solo se adquieren, sino que se heredan y se reinterpretan.",
  authors: ["Gregorio Luri", "Ernesto Núñez"],
  byline: "Gregorio Luri | Ernesto Núñez",
};

const notas: Nota[] = [
  {
    image: {
      src: "/images/conversaciones-sumun/nota-conectar.jpg",
      width: 1100,
      height: 618,
      className: styles.fotoConectar,
    },
    tag: "Inteligencia curricular",
    title: "Conectar, pensar y educar en tiempos complejos",
    text: "En un entorno global marcado por la incertidumbre y el cambio acelerado, la educación debe preparar a estudiantes capaces de pensar críticamente, actuar con autonomía y adaptarse con sentido. Esta propuesta invita a repensar el rol de la escuela como guía en medio de la complejidad contemporánea.",
    authors: ["Renato Opertti"],
    byline: "Renato Operetti",
  },
  {
    image: {
      src: "/images/conversaciones-sumun/nota-glocal.jpg",
      width: 900,
      height: 600,
      className: styles.fotoGlocal,
    },
    tag: "Inteligencia curricular",
    title: "Educación Glocal: entre lo local y lo global",
    text: "Frente a un mundo hiperconectado, surge el desafío de educar personas con mirada global pero firmemente ancladas en sus contextos. Este enfoque glocal propone una educación que integra lo tecnológico con lo cultural, y que potencia identidades sólidas en diálogo con el mundo.",
    authors: ["Renato Opertti"],
    byline: "Renato Operetti",
  },
];

function Meta({ nota, chica }: { nota: Nota; chica?: boolean }) {
  return (
    <div className={chica ? `${styles.meta} ${styles.metaChica}` : styles.meta}>
      <div className={styles.avatares}>
        {/* Pendiente: fotos de avatar de cada autor. */}
        {nota.authors.map((author) => (
          <span key={author} className={styles.avatar} aria-hidden="true" />
        ))}
      </div>
      <div>
        <p className={styles.byline}>{nota.byline}</p>
        <p className={styles.fecha}>
          11 Jan 2022 <span aria-hidden="true">•</span> 5 min
        </p>
      </div>
    </div>
  );
}

function Foto({ nota }: { nota: Nota }) {
  return (
    <Image
      className={nota.image.className}
      src={nota.image.src}
      width={nota.image.width}
      height={nota.image.height}
      sizes="(min-width: 1040px) 900px, 100vw"
      alt=""
    />
  );
}

export function NovedadesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Revela la sección (una vez) cuando entra en pantalla.
  useAlLlegar(sectionRef, (section) => {
    section.dataset.revealed = "true";
  }, 0.2);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="novedades-title">
      <div className={styles.content}>
        <h2 id="novedades-title" className={styles.title}>
          Novedades
        </h2>

        <div className={styles.notas}>
          <article className={styles.destacada}>
            {/* Pendiente: círculos e íconos (mynaui-planet, chat-messages) sobre la foto. */}
            <div className={styles.media}>
              <Foto nota={destacada} />
            </div>
            <div className={styles.cuerpo}>
              <div className={styles.textos}>
                <span className={styles.tag}>{destacada.tag}</span>
                <h3 className={styles.notaTitle}>{destacada.title}</h3>
                <p className={styles.notaText}>{destacada.text}</p>
              </div>
              <Meta nota={destacada} />
            </div>
          </article>

          <div className={styles.fila}>
            {notas.map((nota) => (
              <article key={nota.title} className={styles.nota}>
                <div className={styles.mediaChica}>
                  <Foto nota={nota} />
                </div>
                <div className={styles.cuerpoChico}>
                  <div className={styles.textos}>
                    <span className={`${styles.tag} ${styles.tagChico}`}>{nota.tag}</span>
                    <h3 className={styles.notaTitleChico}>{nota.title}</h3>
                    <p className={styles.notaTextChico}>{nota.text}</p>
                  </div>
                  <Meta nota={nota} chica />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Elementos 3D de Figma (522.83 × 702, cover), girados desde su esquina superior izquierda. */}
      <div className={`${styles.decor} ${styles.decorDer}`} aria-hidden="true">
        <img loading="lazy" decoding="async" src="/images/conversaciones-sumun/decorativo-3d.webp" alt="" />
      </div>
      <div className={`${styles.decor} ${styles.decorIzq}`} aria-hidden="true">
        <img loading="lazy" decoding="async" src="/images/conversaciones-sumun/decorativo-3d.webp" alt="" />
      </div>
    </section>
  );
}
