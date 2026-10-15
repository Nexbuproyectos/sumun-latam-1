import Image from "next/image";

import styles from "./hero.module.css";

export function HeroSection() {
  return (
    <section className={styles.section} aria-labelledby="tutor-ia-title">
      <Image
        className={styles.fondo}
        src="/images/tutor-ia/fondo-hero.png"
        width={2880}
        height={2352}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        priority
      />
      <div className={styles.content}>
        <div className={styles.texts}>
          <p className={styles.eyebrow}>Tutor IA</p>
          <h1 id="tutor-ia-title" className={styles.title}>
            Aprender con el corazón y la mente para lograr{" "}
            <span className={styles.accent}>la mejor versión</span>
          </h1>
          <p className={styles.lead}>
            El Tutor IA acompaña, guía y motiva a estudiantes, docentes y
            familias en cada etapa del aprendizaje. Personaliza la experiencia
            educativa sin reemplazar al maestro ni a la familia: los potencia,
            los complementa y está disponible en todo momento.
          </p>
        </div>

        <a href="#" className={`btn ${styles.cta}`}>
          Comenzar ahora
          <img loading="lazy" decoding="async" src="/images/tutor-ia/ia.svg" alt="" width={22.16} height={22.16} />
        </a>
      </div>

      <div className={styles.stage}>
        <Image
          className={styles.mockup}
          src="/images/tutor-ia/mockup.png"
          width={2072}
          height={1085}
          sizes="72vw"
          alt="Vista previa del Tutor IA: explora por materias"
        />

        {/* Tarjetas flotantes, en orden de capas de Figma (las últimas quedan arriba). */}
        <Image
          className={`${styles.card} ${styles.estudiar}`}
          src="/images/tutor-ia/estudiar-teoria.png"
          width={483}
          height={223}
          sizes="15vw"
          alt="Estudiar teoría: quiero repasar conceptos teóricos"
        />
        <p className={`${styles.pill} ${styles.explicame}`}>
          <img loading="lazy" decoding="async" src="/images/tutor-ia/explicame-emoji.webp" alt="" width={40} height={40} />
          Explícame
        </p>
        <Image
          className={`${styles.card} ${styles.tareas}`}
          src="/images/tutor-ia/ayuda-tareas.jpg"
          width={438}
          height={328}
          sizes="11vw"
          alt="Ayuda con tareas: resuelve dudas específicas de tus deberes"
        />
        <Image
          className={`${styles.foto} ${styles.tareasFoto}`}
          src="/images/tutor-ia/ayuda-tareas-foto.png"
          width={496}
          height={496}
          sizes="9vw"
          alt=""
        />
        <Image
          className={`${styles.card} ${styles.preparar}`}
          src="/images/tutor-ia/preparar-examen.jpg"
          width={441}
          height={326}
          sizes="12vw"
          alt="Preparar examen: estudia y practica para tus exámenes"
        />
        <Image
          className={`${styles.card} ${styles.revisar}`}
          src="/images/tutor-ia/revisar-conceptos.jpg"
          width={436}
          height={322}
          sizes="12vw"
          alt="Revisar conceptos: refuerza conceptos que no tienes claros"
        />
        <p className={`${styles.pill} ${styles.ayudame}`}>
          <img loading="lazy" decoding="async" src="/images/tutor-ia/ayudame-emoji.webp" alt="" width={40} height={40} />
          Ayúdame con
        </p>
        <Image
          className={`${styles.card} ${styles.seguimiento}`}
          src="/images/tutor-ia/seguimiento.png"
          width={468}
          height={193}
          sizes="21vw"
          alt="Seguimiento: monitorea el progreso y participación de tus estudiantes"
        />
        <Image
          className={`${styles.foto} ${styles.seguimientoFoto}`}
          src="/images/tutor-ia/seguimiento-foto.png"
          width={576}
          height={576}
          sizes="10vw"
          alt=""
        />
        <Image
          className={`${styles.card} ${styles.crear}`}
          src="/images/tutor-ia/crear-actividades.png"
          width={467}
          height={191}
          sizes="21vw"
          alt="Crear actividades: diseña actividades personalizadas con IA para tus estudiantes"
        />
        <Image
          className={`${styles.foto} ${styles.crearFoto}`}
          src="/images/tutor-ia/crear-actividades-foto.png"
          width={536}
          height={536}
          sizes="10vw"
          alt=""
        />
      </div>

      <span className={styles.niebla} aria-hidden="true" />
    </section>
  );
}
