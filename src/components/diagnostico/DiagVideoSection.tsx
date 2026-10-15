import Image from "next/image";

import styles from "./diagVideo.module.css";
import { ESTUDIO_URL } from "./links";

function Ola({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Image src="/images/masterclass/ola-video.png" width={2880} height={2880} sizes="2070px" alt="" />
    </div>
  );
}

// Cristóbal Cobo sobre fondo oscuro (1100:8037). Aún no hay video real: se muestra la portada.
export function DiagVideoSection() {
  return (
    <section className={styles.section} aria-labelledby="diag-criterio-title">
      {/* La ola de vidrio asoma arriba y abajo de la franja; dentro va otra copia recortada. */}
      <div className={styles.fueraStage}>
        <Ola className={styles.olaFuera} />
      </div>
      <div className={styles.fondo}>
        <div className={styles.fondoStage}>
          <Ola className={styles.olaDentro} />
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Cristóbal Cobo</p>
          <h2 id="diag-criterio-title" className={styles.title}>
            La IA en educación funciona solo cuando se implementa con criterio
          </h2>
          <p className={styles.text}>
            <strong>La evidencia recopilada por Stanford University </strong>
            muestra que la inteligencia artificial puede generar beneficios relevantes en
            educación, como mejorar el desempeño de los estudiantes y apoyar la eficiencia de los
            docentes. Sin embargo, sus resultados dependen significativamente de cómo, cuándo y
            con qué propósito se utiliza.
          </p>
          <p className={styles.text}>
            Evaluar el nivel de madurez en IA de cada establecimiento educativo resulta
            fundamental para orientar decisiones informadas sobre cuándo utilizar IA, cuándo no
            hacerlo y bajo qué criterios pedagógicos incorporarla.
          </p>
          <a href={ESTUDIO_URL} className={styles.descarga}>
            <img loading="lazy" decoding="async" src="/images/diagnostico/archivo-blanco.svg" alt="" width={20} height={20} />
            Descargar estudio completo →
          </a>
        </div>

        <div className={styles.video}>
          <Image
            src="/images/masterclass/video-cobo.jpg"
            width={2275}
            height={4096}
            sizes="(max-width: 1100px) 90vw, 533px"
            alt="Cristóbal Cobo hablando a cámara"
          />
          <img loading="lazy" decoding="async"
            className={styles.play}
            src="/images/masterclass/play.svg"
            alt=""
            aria-hidden="true"
            width={89.677}
            height={88}
          />
        </div>
      </div>
    </section>
  );
}
