import Image from "next/image";

import { radialSvg } from "@/components/shared/radialSvg";

import styles from "./congresoHero.module.css";
import { CERTIFICADO_URL } from "./links";

// Fundido blanco hacia los bordes del círculo de paneles (1100:8066).
const fundido = radialSvg(
  1890,
  1719,
  "0.0000076533 -85.709 94.235 0.0000084182 942.15 785.03",
  "<stop stop-color='rgba(255,255,255,0)' offset='0.5'/><stop stop-color='rgba(254,254,254,1)' offset='1'/>",
);

// Hero "Gracias por ser parte de Hackeando la Ciudad 2026" (1100:8064 + 1100:8133).
export function CongresoHero() {
  return (
    <section className={styles.section} aria-labelledby="congreso-title">
      <div className={styles.fondo} aria-hidden="true">
        <div className={styles.fondoStage}>
          <div className={styles.decor}>
            <div className={styles.decorInner}>
              <img loading="lazy" decoding="async" src="/images/banner/decorativo-3d.webp" alt="" />
            </div>
          </div>
          <div className={styles.circulo} data-parallax="slow">
            <Image
              className={styles.circuloA}
              src="/images/masterclass/circulo-hero.png"
              width={4096}
              height={3724}
              sizes="3553px"
              alt=""
              preload
            />
            <Image
              className={styles.circuloB}
              src="/images/masterclass/circulo-hero.png"
              width={4096}
              height={3724}
              sizes="2412px"
              alt=""
            />
            <span className={styles.fundido} style={{ backgroundImage: fundido }} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.logos}>
          <span className={styles.logoSumun}>
            <img loading="lazy" decoding="async" src="/images/congreso/logo-sumun.webp" alt="Sumun" />
          </span>
          <img loading="lazy" decoding="async" className={styles.divisor} src="/images/congreso/divisor.svg" alt="" aria-hidden="true" width={0.288} height={71} />
          <img loading="lazy" decoding="async"
            src="/images/congreso/logo-hackeando.svg"
            alt="Hackeando la ciudad 2026, Panamá"
            width={133.797}
            height={68.394}
          />
        </div>

        <div className={styles.text}>
          <h1 id="congreso-title" className={styles.title}>
            <span className={styles.titleA}>Gracias por ser parte de</span>
            <span className={styles.titleB}>Hackeando la Ciudad 2026</span>
          </h1>
          <p className={styles.lead}>
            Seguimos conversando sobre bienestar, acompañamiento y educación digital para
            construir nuevas formas de acompañar a nuestras comunidades educativas.
          </p>
        </div>

        <div className={styles.buttons}>
          <a href={CERTIFICADO_URL} className={`btn ${styles.primary}`}>
            Descargar mi certificado
          </a>
          <a href="#recursos" className={`btn ${styles.secondary}`}>
            Ver recursos
          </a>
        </div>
      </div>
    </section>
  );
}
