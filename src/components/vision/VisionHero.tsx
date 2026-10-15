import Image from "next/image";

import styles from "./visionHero.module.css";

// Iconos en círculos de vidrio (tamaño del círculo y del SVG según Figma).
const iconos = [
  { id: "chart", className: styles.iconChart, src: "/images/vision/chart.svg", width: 45.8217, height: 45.8169 },
  { id: "atom", className: styles.iconAtom, src: "/images/vision/atom.svg", width: 35.7275, height: 35.7295 },
  { id: "book", className: styles.iconBook, src: "/images/vision/book.svg", width: 23.6364, height: 23.6364 },
];

export function VisionHero() {
  return (
    <section className={styles.section} aria-labelledby="vision-hero-title">
      <div className={styles.stage}>
        <div className={styles.ola} aria-hidden="true">
          <Image
            src="/images/propuesta/ola.png"
            width={4096}
            height={2215}
            sizes="170vw"
            alt=""
            preload
          />
        </div>

        <div className={styles.copy}>
          <h1 id="vision-hero-title" className={styles.title}>
            Conoce nuestro sistema educativo
          </h1>
          <p className={styles.lead}>
            Sumun hackea los procesos del aprendizaje. Reconfigura la manera en
            la que el acto educativo sucede y pone al servicio de los colegios
            las herramientas necesarias y las mejores prácticas para hacerlo.
          </p>
        </div>

        {/* Foto + iconos: lienzo de 749 × 700 en (0, 170) del frame de Figma. */}
        <div className={styles.visual}>
          {/* El icono grande va detrás de la foto (así está en el diseño). */}
          <span className={`${styles.glass} ${styles.iconHandshake}`} aria-hidden="true">
            <img loading="lazy" decoding="async" src="/images/vision/handshake.svg" alt="" width={77.2927} height={77.2927} />
          </span>

          <div className={styles.photo}>
            <Image
              src="/images/vision/estudiantes.png"
              width={2731}
              height={4096}
              sizes="1320px"
              alt="Dos estudiantes sonriendo"
              preload
            />
          </div>

          {iconos.map((icono) => (
            <span
              key={icono.id}
              className={`${styles.glass} ${icono.className}`}
              aria-hidden="true"
            >
              <img loading="lazy" decoding="async" src={icono.src} alt="" width={icono.width} height={icono.height} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
