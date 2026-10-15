import styles from "./icHero.module.css";

export function IcHero() {
  return (
    <section className={styles.section} aria-labelledby="ic-hero-title">
      {/*
       * La ola de fotos va fuera del lienzo de 1439 para escalar con la ventana y llegar a los bordes.
       * La fuente de Figma mide 1108 × 760: se sirve una versión remuestreada a 2x (WebP de alta calidad)
       * sin pasar por el optimizador, que la recomprimía y la pixelaba.
       */}
      <div className={styles.ola} aria-hidden="true">
        <img loading="lazy"
          src="/images/inteligencia/ola-hero@2x.webp"
          width={2216}
          height={1520}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.tag}>Inteligencia Curricular</p>
          <div className={styles.text}>
            <h1 id="ic-hero-title" className={styles.title}>
              Micro y Macrohabilidades
            </h1>
            <p className={styles.lead}>
              Potenciamos el desarrollo de habilidades medibles de los
              estudiantes para que aprendan más y logren mejores resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
