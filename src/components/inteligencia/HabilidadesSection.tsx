import styles from "./habilidades.module.css";

type Item = { text: string; bold?: boolean };

const culturaIc: Item[] = [
  { text: "Enfocado en micro y macrohabilidades del proceso de aprendizaje.", bold: false },
  { text: "Propósito de mejora continua entre maestros, familias y directivos", bold: true },
  { text: "Ecosistema digital guiado por datos para la mejora continua de los estudiantes", bold: false },
];

const sinSumunIc = [
  "Currículo centrado en contenidos y asignaturas",
  "Medición solo en exámenes, no procesos",
  "Miedo a la tecnología",
];

type Props = {
  boxTitle?: string;
  items?: Item[];
  sinSumun?: string[];
  className?: string;
  // En High Tech la tarjeta "Sin Sumun" es más ancha (784px) porque sus textos son largos.
  wideSinSumun?: boolean;
};

// Bloque compartido por Inteligencia Curricular, Cultura de alto desempeño y High Tech (cambian los textos).
export function HabilidadesSection({
  boxTitle = "Cultura Sumun",
  items = culturaIc,
  sinSumun = sinSumunIc,
  className,
  wideSinSumun = false,
}: Props) {
  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
      aria-labelledby="habilidades-title"
    >
      <div className={styles.stage}>
        <h2 id="habilidades-title" className={styles.title}>
          Hackeamos el desarrollo de habilidades
        </h2>

        <img loading="lazy" decoding="async"
          className={styles.corazon}
          data-parallax="slow"
          src="/images/inteligencia/corazon.webp"
          alt=""
          width={376}
          height={333}
          aria-hidden="true"
        />

        <div className={styles.cultura}>
          <h3 className={styles.culturaTitle}>{boxTitle}</h3>
          <ul className={styles.culturaList}>
            {items.map((item) => (
              <li
                key={item.text}
                className={item.bold ? styles.culturaItemBold : styles.culturaItem}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className={wideSinSumun ? `${styles.sinSumun} ${styles.sinSumunWide}` : styles.sinSumun}>
          <h3 className={styles.sinTitle}>Sin Sumun</h3>
          <ul className={styles.sinList}>
            {sinSumun.map((item) => (
              <li key={item}>
                <img loading="lazy" decoding="async" src="/images/inteligencia/icon-x.svg" alt="" width={24} height={24} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
