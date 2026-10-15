import Image from "next/image";
import Link from "next/link";

import styles from "./diagnosticoCta.module.css";
import { DIAGNOSTICO_URL } from "./links";

const bullets = [
  "Evaluación ágil completada en menos de 10 minutos.",
  "Reporte completo con recomendaciones accionables.",
  "Mapeado según estándares globales de madurez digital escolar.",
];

// "Diagnóstico de Madurez en IA" sobre fondo oscuro (1100:8063 + 1100:8150 + 1100:8303).
export function DiagnosticoCta() {
  return (
    <section className={styles.section} aria-labelledby="congreso-diagnostico-title">
      <div className={styles.stage}>
        <div className={styles.copy}>
          <div className={styles.text}>
            <p className={styles.eyebrow}>Diagnóstico de Madurez en IA</p>
            <div className={styles.block}>
              <div className={styles.heading}>
                <h2 id="congreso-diagnostico-title" className={styles.title}>
                  El futuro se construye desde donde estás hoy
                </h2>
                <p className={styles.question}>
                  ¿Qué tan preparada está tu institución para integrar la inteligencia artificial?
                </p>
              </div>
              <p className={styles.body}>
                Descúbrelo con una <strong>herramienta gratuita</strong> que reúne la mirada de toda
                la comunidad educativa para conocer su nivel de madurez en IA, identificar
                oportunidades y obtener recomendaciones prácticas para{" "}
                <strong>
                  acompañar la incorporación de nuevas herramientas de inteligencia artificial en
                  la institución.
                </strong>
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.buttons}>
              <a href={DIAGNOSTICO_URL} className={`btn ${styles.primary}`}>
                Comenzar diagnóstico
              </a>
              <Link href="/diagnostico" className={`btn ${styles.secondary}`}>
                Conocer el programa
              </Link>
            </div>
            <ul className={styles.bullets}>
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <img loading="lazy" decoding="async" src="/images/congreso/check.svg" alt="" width={20} height={20} />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <Image
            src="/images/congreso/tablet.png"
            width={1537}
            height={1023}
            sizes="(max-width: 1100px) 100vw, 1175px"
            alt=""
          />
        </div>

        {/* Rectangle 3206: fundido con desenfoque que funde la tablet con el fondo. */}
        <span className={styles.fundido} aria-hidden="true" />
      </div>
    </section>
  );
}
