import Image from "next/image";

import styles from "./htHero.module.css";

export function HtHero() {
  return (
    <section className={styles.section} aria-labelledby="ht-hero-title">
      <div className={styles.stage}>
        {/* Elemento 3D + niño en el columpio, girado -3.21° (como en Figma). */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualInner} data-parallax="slow">
            <img className={styles.decor} src="/images/banner/decorativo-3d.webp" alt="" />
            <div className={styles.nino}>
              <Image src="/images/home-extra/columpio.png" width={1536} height={1024} sizes="1000px" alt="" preload />
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          {/* En Figma la etiqueta dice "Cultura de alto desempeño" (copia de otra página): se usa el pilar real. */}
          <p className={styles.tag}>High Tech</p>
          <div className={styles.text}>
            <h1 id="ht-hero-title" className={styles.title}>
              IA y Data
              <br />
              Dos turbinas que impulsan el aprendizaje
            </h1>
            <p className={styles.lead}>
              La tecnología como una herramienta al servicio del aprendizaje
              activo, el pensamiento crítico y la resolución de problemas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
