import Image from "next/image";

import styles from "./culturaCards.module.css";

const C = "/images/cultura";

const burbujasChart = [
  { x: 10.1, y: 69.96, pct: "60%", icon: "paper-a.svg" },
  { x: 108.95, y: 128.47, pct: "30%", icon: "paper-b.svg" },
  { x: 214, y: 30, pct: "80%", icon: "paper-c.svg" },
];

export function CulturaCardsSection() {
  return (
    <section className={styles.section} aria-labelledby="cultura-cards-title">
      {/* Fundido difuminado sobre el borde con la franja (Rectangle 211 en Figma). */}
      <img className={styles.fundido} src={`${C}/fundido.png`} alt="" aria-hidden="true" />
      <h2 id="cultura-cards-title" className={styles.title}>
        Así se ve la Cultura Sumun
      </h2>

      <div className={styles.grid}>
        <div className={styles.row1}>
          <article className={`${styles.card} ${styles.cardClima}`}>
            <img data-parallax="slow" className={styles.corazon} src="/images/inteligencia/corazon.webp" alt="" width={409} height={361} aria-hidden="true" />
            <h3 className={styles.cardTitle}>Mejor clima escolar</h3>
            <p className={`${styles.cardSub} ${styles.subClima}`}>Donde cada uno es bienvenido</p>
          </article>

          <article className={`${styles.card} ${styles.cardPertenencia}`}>
            <span className={styles.fadeArriba} aria-hidden="true" />
            <h3 className={`${styles.cardTitle} ${styles.oscuro}`}>
              Mayor sentido <br />
              de pertenencia
            </h3>
            <p className={`${styles.cardSub} ${styles.oscuro} ${styles.subPertenencia}`}>
              Todos formando parte de algo más grande
            </p>
            <div className={styles.onda} aria-hidden="true">
              <Image src={`${C}/onda.png`} width={1954} height={1404} sizes="459px" alt="" />
            </div>
          </article>

          <article className={`${styles.card} ${styles.cardEquipos}`}>
            <div className={styles.anillos} aria-hidden="true">
              <Image src={`${C}/anillos.png`} width={1024} height={715} sizes="381px" alt="" />
            </div>
            <h3 className={styles.cardTitle}>Equipos cohesionados</h3>
            <p className={`${styles.cardSub} ${styles.subEquipos}`}>Trabajando juntos llegamos más lejos</p>
          </article>
        </div>

        <div className={styles.row2}>
          <article className={`${styles.card} ${styles.cardEstudiantes}`}>
            <div className={styles.chart} aria-hidden="true">
              <img className={styles.chartSvg} src={`${C}/chart.svg`} alt="" width={478.212} height={365.908} />
              {burbujasChart.map((b) => (
                <span key={b.pct} className={styles.burbujaChart} style={{ left: b.x, top: b.y }}>
                  <img src={`${C}/${b.icon}`} alt="" width={20.988} height={26.712} />
                  <span>{b.pct}</span>
                </span>
              ))}
            </div>
            <h3 className={`${styles.cardTitle} ${styles.oscuro} ${styles.titleEstudiantes}`}>
              Estudiantes comprometidos
            </h3>
            <p className={`${styles.cardSub} ${styles.oscuro} ${styles.subEstudiantes}`}>
              Alma, mente y cuerpo enfocados en su mejor versión
            </p>
          </article>

          <article className={`${styles.card} ${styles.cardComunidad}`}>
            <div className={styles.comunidadFoto} aria-hidden="true">
              <Image src={`${C}/comunidad.jpg`} width={626} height={417} sizes="726px" alt="" />
            </div>
            <img className={styles.comunidadVelo} src={`${C}/velo-comunidad.svg`} alt="" width={584} height={364} aria-hidden="true" />
            <h3 className={`${styles.cardTitle} ${styles.oscuro} ${styles.titleComunidad}`}>
              Comunidad más humana y feliz
            </h3>
            <p className={`${styles.cardSub} ${styles.oscuro} ${styles.subComunidad}`}>
              La calidez y cercanía que
              <br />
              todos necesitamos
            </p>
            <span className={`${styles.vidrio} ${styles.vidrioCabeza}`} aria-hidden="true">
              <img src={`${C}/i-head-love.svg`} alt="" width={61.6471} height={61.6471} />
            </span>
            <span className={`${styles.vidrio} ${styles.vidrioManos}`} aria-hidden="true">
              <img src={`${C}/i-handshake.svg`} alt="" width={38.1176} height={38.1176} />
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
