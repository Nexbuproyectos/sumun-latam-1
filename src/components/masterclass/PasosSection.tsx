import styles from "./pasos.module.css";

const pasos = [
  {
    title: "Completen el registro",
    text: "Ingresen los datos básicos de su institución educativa para configurar su espacio de evaluación.",
  },
  {
    title: "Respondan el diagnóstico",
    text: "Involucren a los actores clave para recopilar perspectivas integrales del estado actual.",
  },
  {
    title: "Obtengan un reporte institucional",
    text: "Reciban de inmediato resultados claros y sugerencias accionables guiadas por expertos.",
  },
  {
    title: "Evaluación y seguimiento",
    text: "Comparen resultados y midan su progreso a lo largo del tiempo. Nuestro equipo los acompaña para transformar los insights en acciones concretas.",
  },
];

const LEAD =
  "Evaluamos el nivel de madurez institucional frente a la inteligencia artificial para entregar recomendaciones prácticas y personalizadas que impulsan su evolución";

type Props = {
  // null quita la bajada (así está en la landing del diagnóstico, 1100:7825).
  lead?: string | null;
  ctaHref?: string;
  // Menos aire abajo: en Diagnóstico el botón entra en el frame de 601px.
  compact?: boolean;
};

// "¿Cómo funciona el diagnóstico?" (1100:6476): 4 pasos sobre fondo azul petróleo.
export function PasosSection({ lead = LEAD, ctaHref = "#registro", compact = false }: Props) {
  return (
    <section id="como-funciona" className={compact ? `${styles.section} ${styles.compact}` : styles.section} aria-labelledby="diagnostico-title">
      <div className={styles.stage}>
        <div className={`${styles.decor} ${styles.decorIzq}`} aria-hidden="true">
          <div className={styles.decorInner}>
            <img loading="lazy" decoding="async" src="/images/banner/decorativo-3d.webp" alt="" />
          </div>
        </div>
        <div className={`${styles.decor} ${styles.decorDer}`} aria-hidden="true">
          <div className={styles.decorInner}>
            <img loading="lazy" decoding="async" src="/images/banner/decorativo-3d.webp" alt="" />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 id="diagnostico-title" className={styles.title}>
              ¿Cómo funciona el diagnóstico?
            </h2>
            {lead ? <p className={styles.lead}>{lead}</p> : null}
          </div>

          <ol className={styles.grid}>
            {pasos.map((paso, index) => (
              <li key={paso.title} className={styles.card}>
                <span className={styles.badge}>PASO {String(index + 1).padStart(2, "0")}</span>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{paso.title}</h3>
                  <p className={styles.cardDesc}>{paso.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a href={ctaHref} className={`btn ${styles.button}`}>
            Comenzar diagnóstico
          </a>
        </div>
      </div>
    </section>
  );
}
