import Image from "next/image";

import styles from "./compromiso.module.css";

type Props = {
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
  // En la Masterclass el niño va más arriba respecto del texto (1100:6455).
  alto?: boolean;
};

export function CompromisoSection({ buttonLabel = "Conoce la marca", buttonHref = "#", className, alto = false }: Props) {
  return (
    <section id="compromiso" className={[styles.section, alto ? styles.alto : "", className ?? ""].filter(Boolean).join(" ")} aria-labelledby="compromiso-title">
      <div className={styles.stage}>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.decor} data-parallax="slow">
            <img src="/images/banner/decorativo-3d.png" alt="" />
          </div>
          <div className={styles.nino}>
            <Image src="/images/home-extra/columpio.png" width={1536} height={1024} sizes="855px" alt="" />
          </div>
        </div>

        <div className={styles.copy}>
          <h2 id="compromiso-title" className={styles.title}>
            El <strong>compromiso</strong>
            <br />
            con la comunidad
          </h2>
          <p className={styles.text}>
            En Sumun, la educación <strong>trasciende las aulas</strong>, conectando
            profundamente con las personas y su entorno como una revolución
            colectiva. Creemos que el{" "}
            <strong>
              conocimiento es un bien compartido y la tecnología actúa como un
              puente
            </strong>{" "}
            para reducir brechas, acortar distancias y empoderar a todos a
            alcanzar <strong>su mejor versión</strong>.
          </p>
          <a href={buttonHref} className={styles.button}>
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
