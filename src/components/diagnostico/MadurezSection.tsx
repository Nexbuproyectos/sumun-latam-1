import styles from "./madurez.module.css";
import { DIAGNOSTICO_URL } from "./links";

// Orden de la matriz: fila de arriba (más madurez) y fila de abajo.
const estadios = [
  {
    title: "Integrador",
    text: "La IA está integrada en procesos clave y genera impacto medible",
    img: "/images/diagnostico/madurez-integrador.png",
    className: styles.integrador,
  },
  {
    title: "Transformador",
    text: "La IA impulsa la innovación y la mejora continua en toda la institución",
    img: "/images/diagnostico/madurez-transformador.png",
    className: styles.transformador,
  },
  {
    title: "Inicial",
    text: "Uso incipiente y exploratorio de herramientas de IA",
    img: "/images/diagnostico/madurez-inicial.png",
    className: styles.inicial,
  },
  {
    title: "En desarrollo",
    text: "La IA se utiliza de forma aislada en algunas áreas de la institución",
    img: "/images/diagnostico/madurez-desarrollo.png",
    className: styles.desarrollo,
  },
];

// "Modelo de madurez institucional en IA" (1100:7864): matriz de 4 estadios con sus dos ejes.
export function MadurezSection() {
  return (
    <section className={styles.section} aria-labelledby="madurez-title">
      <div className={styles.stage}>
        <div className={styles.header}>
          <h2 id="madurez-title" className={styles.title}>
            Modelo de madurez institucional en IA
          </h2>
          <p className={styles.lead}>
            Evaluamos el nivel de madurez institucional frente a la inteligencia artificial para
            entregar recomendaciones prácticas y personalizadas que impulsan su evolución
          </p>
        </div>

        <div className={styles.matriz}>
          <div className={styles.ejes} aria-hidden="true">
            <img className={styles.masArriba} src="/images/diagnostico/eje-mas.svg" alt="" width={46} height={46} />
            <img className={styles.ejeVertical} src="/images/diagnostico/eje-vertical.svg" alt="" width={7.364} height={465} />
            <img className={styles.menos} src="/images/diagnostico/eje-menos.svg" alt="" width={46} height={46} />
            <img className={styles.ejeHorizontal} src="/images/diagnostico/eje-horizontal.svg" alt="" width={7.364} height={948} />
            <img className={styles.masDerecha} src="/images/diagnostico/eje-mas.svg" alt="" width={46} height={46} />
          </div>
          <p className={styles.labelVertical}>MADUREZ ORGANIZACIONAL</p>
          <p className={styles.labelHorizontal}>ADOPCIÓN Y USO DE IA</p>

          <ul className={styles.grid}>
            {estadios.map((estadio) => (
              <li key={estadio.title} className={`${styles.card} ${estadio.className}`}>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{estadio.title}</h3>
                  <p className={styles.cardDesc}>{estadio.text}</p>
                </div>
                <img className={styles.cardImg} src={estadio.img} alt="" />
              </li>
            ))}
          </ul>
        </div>

        <a href={DIAGNOSTICO_URL} className={`btn ${styles.button}`}>
          Descubre en qué estadio se encuentra tu institución y decide a donde quieres llevarla
        </a>
      </div>
    </section>
  );
}
