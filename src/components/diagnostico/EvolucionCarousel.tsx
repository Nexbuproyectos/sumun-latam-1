"use client";

import { useEffect, useRef, useState } from "react";

import { radialSvg } from "@/components/shared/radialSvg";

import styles from "./evolucion.module.css";

// Velo radial sobre cada foto (Figma: "Content Rounded Edge"). La primera usa el SVG exportado.
const velo = radialSvg(
  385,
  350,
  "3.9748e-14 29.721 -32.687 -0.65325 182.01 167",
  "<stop stop-color='rgba(217,217,217,0)' offset='0.4'/><stop stop-color='rgba(240,240,240,0.67835)' offset='0.69372'/><stop stop-color='rgba(251,251,251,1)' offset='1'/>",
);

// Cada foto es un recorte de una tira de 6 imágenes (a o b) sobre una foto base.
const tarjetas = [
  { title: "Visión integral", text: "Evalúen todas las áreas estratégicas de su institución, desde lo académico hasta lo administrativo.", width: 375, tira: "a", left: "-7.04%" },
  { title: "Recomendaciones personalizadas", text: "Reciban un plan de acción adaptado y enfocado en las necesidades específicas de su comunidad.", width: 374, tira: "a", left: "-118.96%" },
  { title: "Benchmarking", text: "Comparen su nivel de madurez con otras instituciones de la región para identificar su posicionamiento.", width: 375, tira: "b", left: "-12.04%", top: "-26.64%" },
  { title: "Estrategia basada en datos", text: "Tomen decisiones informadas con evidencia y métricas sólidas sobre madurez digital.", width: 374, tira: "a", left: "-327.1%" },
  { title: "Acompañamiento experto", text: "Accedan a orientación especializada y de alta calidad para transicionar con confianza.", width: 383, tira: "b", left: "-442.52%" },
  { title: "Resultados inmediatos", text: "Obtengan su reporte detallado al instante en cuanto su comunidad termine la evaluación.", width: 383, tira: "a", left: "-543.25%" },
];

// "Cómo el diagnóstico de madurez en IA impulsa la evolución de su institución" (1100:7905).
export function EvolucionCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = viewport.current;
    if (!el) {
      return;
    }
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Avanza de a una tarjeta (ancho + separación de la pista, que cambia en mobile).
  function go(direction: 1 | -1) {
    const el = viewport.current;
    const card = el?.querySelector("li");
    if (!el || !card?.parentElement) {
      return;
    }
    const gap = parseFloat(getComputedStyle(card.parentElement).columnGap) || 0;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  }

  return (
    <section className={styles.section} aria-labelledby="evolucion-title">
      <div className={styles.stage}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h2 id="evolucion-title" className={styles.title}>
              Cómo el diagnóstico de madurez en IA impulsa la evolución de su institución
            </h2>
            <p className={styles.lead}>
              Acceso a recursos exclusivos, actualizaciones constantes y herramientas que
              potencian su experiencia educativa
            </p>
          </div>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} aria-label="Anterior" disabled={edges.start} onClick={() => go(-1)}>
              <img className={styles.arrowPrev} src="/images/diagnostico/flecha-carrusel.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" className={styles.arrow} aria-label="Siguiente" disabled={edges.end} onClick={() => go(1)}>
              <img className={styles.arrowNext} src="/images/diagnostico/flecha-carrusel.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        <div
          ref={viewport}
          className={styles.viewport}
          data-no-reveal
          role="region"
          aria-roledescription="carrusel"
          aria-label="Beneficios del diagnóstico"
          tabIndex={0}
        >
          <ul className={styles.track}>
            {tarjetas.map((tarjeta, index) => (
              <li key={tarjeta.title} className={styles.card} style={{ width: tarjeta.width }}>
                <div className={styles.media} aria-hidden="true">
                  <img className={styles.base} src="/images/diagnostico/carrusel-base.png" alt="" />
                  <img
                    className={styles.tira}
                    src={`/images/diagnostico/carrusel-${tarjeta.tira}.png`}
                    alt=""
                    style={{ left: tarjeta.left, top: tarjeta.top }}
                  />
                  {index === 0 ? (
                    <img className={styles.veloSvg} src="/images/diagnostico/carrusel-velo.svg" alt="" />
                  ) : (
                    <span className={styles.velo} style={{ backgroundImage: velo }} />
                  )}
                </div>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{tarjeta.title}</h3>
                  <p className={styles.cardDesc}>{tarjeta.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
