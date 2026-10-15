import Image from "next/image";

import styles from "./hero.module.css";

// Íconos en círculos de vidrio sobre la foto (tamaño del círculo, del ícono y su posición).
const iconos = [
  { src: "/images/impacto-social/icono-tierra.svg", size: 45, className: styles.tierra },
  { src: "/images/impacto-social/icono-reciclar.svg", size: 45, className: styles.reciclar },
  { src: "/images/impacto-social/icono-manos.svg", size: 99, className: styles.manos },
];

export function HeroSection() {
  return (
    <section className={styles.section} aria-labelledby="impacto-title">
      <div className={styles.texts}>
        <p className={styles.eyebrow}>Nuestro compromiso e impacto</p>
        <h1 id="impacto-title" className={styles.title}>
          Una educación vinculada con la sostenibilidad
        </h1>
        <p className={styles.lead}>
          <b>Transformando el mundo a través de la educación.</b>
        </p>
        <p className={styles.lead}>
          Una educación de calidad puede cambiar el mundo, por eso creamos
          libros, actividades, material digital y metodologías de enseñanza que
          fomentan la inclusión, la concienciación y la formación de ciudadanos
          responsables y justos, alineados con la sostenibilidad y la Agenda
          2030 de la ONU.
        </p>
      </div>

      <Image
        className={styles.foto}
        src="/images/impacto-social/equipo.png"
        width={2000}
        height={1334}
        sizes="58vw"
        alt="Docente chocando las manos con estudiantes en el aula"
        priority
      />

      {iconos.map((icono) => (
        <span key={icono.src} className={`${styles.icono} ${icono.className}`} aria-hidden="true">
          <img loading="lazy" decoding="async" src={icono.src} alt="" width={icono.size} height={icono.size} />
        </span>
      ))}

      {/* Pendiente: cuarto ícono (hoja, arriba) no vino en los assets. */}

      {/* Franja: caja de 2217.2 × 678.46 rotada, con el fondo exacto de Figma (sin el lightgray). */}
      <span className={styles.franja} aria-hidden="true" />
    </section>
  );
}
