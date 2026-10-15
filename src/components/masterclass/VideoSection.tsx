import Image from "next/image";

import styles from "./video.module.css";

// Video de Cristóbal Cobo + invitación (1100:6457). Aún no hay video real: se muestra la portada.
export function VideoSection() {
  return (
    <section className={styles.section} aria-labelledby="criterio-title">
      <div className={styles.stage}>
        <div className={styles.ola} aria-hidden="true" data-parallax="fast">
          <Image src="/images/masterclass/ola-video.png" width={2880} height={2880} sizes="1085px" alt="" />
        </div>

        <div className={styles.video}>
          <Image
            src="/images/masterclass/video-cobo.png"
            width={2275}
            height={4096}
            sizes="(max-width: 1100px) 90vw, 533px"
            alt="Cristóbal Cobo hablando a cámara"
          />
          <img
            className={styles.play}
            src="/images/masterclass/play.svg"
            alt=""
            aria-hidden="true"
            width={89.677}
            height={88}
          />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Cristóbal Cobo</p>
          <h2 id="criterio-title" className={styles.title}>
            La IA en educación funciona solo cuando se implementa con criterio
          </h2>
          <p className={styles.text}>
            La evidencia recopilada por Stanford University muestra que la inteligencia
            artificial puede generar beneficios relevantes en educación, como mejorar el
            desempeño de los estudiantes y apoyar la eficiencia de los docentes. Sin embargo,
            sus resultados dependen significativamente de cómo, cuándo y con qué propósito se
            utiliza.
          </p>
          <div className={styles.text}>
            <p>
              Te invitamos a participar de nuestra{" "}
              <strong>
                masterclass gratuita con Cristóbal Cobo, el 4 de noviembre · 5:00 p. m. ·
                Colombia.
              </strong>
            </p>
            <p>
              Conoce en qué consiste el diagnóstico de madurez en IA y cómo evaluar el nivel de
              cada institución educativa para orientar decisiones sobre cuándo utilizar IA,
              cuándo no hacerlo y bajo qué criterios pedagógicos incorporarla.
            </p>
          </div>
          <div className={styles.buttons}>
            <a href="#registro" className={`btn ${styles.primary}`}>
              Comenzar diagnóstico
            </a>
            <a href="#registro" className={`btn ${styles.secondary}`}>
              Registrarme en la Masterclass
            </a>
          </div>
          <a href="#" className={styles.descarga}>
            <img src="/images/masterclass/archivo.svg" alt="" width={20} height={20} />
            <span>Descargar estudio completo</span>
          </a>
        </div>
      </div>
    </section>
  );
}
