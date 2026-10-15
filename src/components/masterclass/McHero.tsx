import Image from "next/image";

import styles from "./mcHero.module.css";
import { RegistroForm } from "./RegistroForm";

// Hero de la Masterclass (1100:6515): texto a la izquierda y formulario de inscripción a la derecha.
export function McHero() {
  return (
    <section className={styles.section} aria-labelledby="masterclass-title">
      {/* El vidrio 3D queda recortado por el hero; el círculo de paneles sobresale hacia la sección de abajo. */}
      <div className={styles.clip} aria-hidden="true">
        <div className={styles.decorStage}>
          <div className={styles.decor}>
            <div className={styles.decorInner}>
              <img src="/images/banner/decorativo-3d.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.circulo} aria-hidden="true" data-parallax="slow">
          <Image
            src="/images/masterclass/circulo-hero.png"
            width={4096}
            height={3724}
            sizes="(max-width: 1100px) 100vw, 914px"
            alt=""
            preload
          />
        </div>

        <div className={styles.copy}>
          <div className={styles.text}>
            <div className={styles.titles}>
              <p className={styles.eyebrow}>Masterclass - Cristóbal Cobo</p>
              <h1 id="masterclass-title" className={styles.title}>
                Cómo incorporar IA en educación
              </h1>
            </div>
            <p className={styles.lead}>
              Acompáñanos en una sesión práctica para entender cómo la IA puede mejorar la
              experiencia educativa, desde la evaluación hasta la personalización del
              aprendizaje.{" "}
              <strong>
                Cristóbal Cobo compartirá casos, ejercicios y recomendaciones para que puedas
                empezar a aplicar IA de forma segura y efectiva en tu institución. Además, nos
                explicará cómo utilizar el diagnóstico de IA y cómo traducir sus resultados.
              </strong>
            </p>
          </div>
          <a href="#registro" className={`btn ${styles.button}`}>
            Comenzar diagnóstico
          </a>
        </div>

        <div className={styles.form}>
          <RegistroForm />
        </div>
      </div>
    </section>
  );
}
