import Image from "next/image";

import { radialSvg } from "@/components/shared/radialSvg";

import styles from "./diagHero.module.css";
import { DIAGNOSTICO_URL, INGRESAR_URL } from "./links";

const VIDRIO_STOPS =
  "<stop stop-color='rgba(249,249,249,1)' offset='0.21154'/><stop stop-color='rgba(249,249,249,1)' offset='0.56731'/><stop stop-color='rgba(249,249,249,1)' offset='0.75962'/><stop stop-color='rgba(255,255,255,1)' offset='1'/>";

// Paneles de vidrio detrás de la directiva (1100:7784 y 1100:7785).
const vidrioAlto = radialSvg(150, 600, "1.0418e-13 -94.054 23.514 -9.3537e-14 75 829.73", VIDRIO_STOPS, 0.44);
const vidrioBajo = radialSvg(150, 451, "1.0418e-13 -70.697 23.514 -7.0309e-14 75 623.68", VIDRIO_STOPS, 0.44);

// Hero del diagnóstico (1100:7766): texto a la izquierda y la directiva rodeada de íconos a la derecha.
export function DiagHero() {
  return (
    <section className={styles.section} aria-labelledby="diagnostico-hero-title">
      <div className={styles.clip} aria-hidden="true">
        <div className={styles.decorStage}>
          <div className={styles.decor}>
            <div className={styles.decorInner}>
              <img src="/images/banner/decorativo-3d.webp" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.copy}>
          <div className={styles.text}>
            <div className={styles.titles}>
              <p className={styles.eyebrow}>Comunidad directiva Sumun</p>
              <h1 id="diagnostico-hero-title" className={styles.title}>
                Conozcan el nivel de madurez en Inteligencia Artificial de su institución
              </h1>
            </div>
            <p className={styles.lead}>
              Realicen un diagnóstico institucional y reciban un reporte personalizado con
              fortalezas, oportunidades y recomendaciones para avanzar hacia una integración
              estratégica de la inteligencia artificial.
            </p>
          </div>
          <div className={styles.buttons}>
            <a href={DIAGNOSTICO_URL} className={`btn ${styles.primary}`}>
              Comenzar diagnóstico
            </a>
            <a href={INGRESAR_URL} className={`btn ${styles.secondary}`}>
              Ingresar
            </a>
          </div>
        </div>

        {/* Main Content: 806 × 714 en (634, 50), recortado. */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.circulo} data-parallax="slow">
            <Image src="/images/masterclass/circulo-hero.png" width={4096} height={3724} sizes="1064px" alt="" preload />
          </div>
          <div className={styles.directiva}>
            <Image
              src="/images/diagnostico/directiva.webp"
              width={1008}
              height={1068}
              sizes="744px"
              alt=""
              preload
            />
          </div>
          <div className={styles.velo} />
          <div className={styles.vidrioAlto} style={{ backgroundImage: vidrioAlto }} />
          <div className={styles.vidrioBajo} style={{ backgroundImage: vidrioBajo }} />
          <img className={styles.elipse301} src="/images/diagnostico/elipse-301.svg" alt="" width={471} height={473} />
          <img className={styles.elipse302} src="/images/diagnostico/elipse-302.svg" alt="" width={699} height={698} />

          <div className={styles.chart}>
            <img src="/images/diagnostico/ic-chart.svg" alt="" width={17.81} height={17.81} />
          </div>
          <div className={`${styles.icono} ${styles.people}`}>
            <img src="/images/diagnostico/ic-people.svg" alt="" />
          </div>
          <div className={`${styles.icono} ${styles.books}`}>
            <img src="/images/diagnostico/ic-books.svg" alt="" />
          </div>
          <div className={`${styles.icono} ${styles.calendar}`}>
            <img src="/images/diagnostico/ic-calendar.svg" alt="" />
          </div>
          <div className={styles.play}>
            <img className={styles.playE53} src="/images/diagnostico/elipse-53.svg" alt="" />
            <img className={styles.playE54} src="/images/diagnostico/elipse-54.svg" alt="" />
            <span className={styles.playIcon}>
              <img src="/images/diagnostico/ic-play.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
