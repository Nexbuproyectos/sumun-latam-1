"use client";

import { Fragment, useState } from "react";

import styles from "./valores.module.css";

const valores = [
  {
    title: "Excelencia",
    text: "Nos comprometemos con estándares altos, decisiones informadas, hábitos y resultados sostenibles que eleven la calidad de toda la comunidad educativa",
  },
  // Pendiente: el texto de estos valores no está en el diseño.
  { title: "Compromiso compartido", text: "" },
  { title: "Mentalidad de crecimiento", text: "" },
  { title: "Valentía", text: "" },
  { title: "Responsabilidad", text: "" },
];

const tabs = ["Misión", "Visión", "Valores"] as const;
type Tab = (typeof tabs)[number];

export function ValoresSection() {
  const [activa, setActiva] = useState<Tab>("Valores");

  return (
    <section className={styles.section} aria-label="Misión, visión y valores">
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`tab-${tab}`}
            aria-selected={tab === activa}
            aria-controls="identidad-panel"
            className={tab === activa ? styles.tabActive : styles.tab}
            onClick={() => setActiva(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        {/* La composición de la izquierda es la misma para las tres pestañas. */}
        <div className={styles.media} aria-hidden="true">
          <img loading="lazy" decoding="async"
            className={styles.foto}
            src="/images/identidad/valores-foto.jpg"
            alt=""
            width={1600}
            height={1799}
          />
          <span className={styles.velo} />

          {/* Burbujas del chat (reemplazan union0/1/2.svg), detrás de sus textos. */}
          <span className={`${styles.burbuja} ${styles.burbujaMensaje}`} />
          <div className={styles.mensaje}>
            <strong>Prof. Andres Cardillo</strong>
            <p>
              Te envio un <b>nuevo reporte</b> de rendimiento escolar de Juan
              Pablo
            </p>
          </div>
          <img loading="lazy" decoding="async"
            className={styles.avatar}
            src="/images/identidad/valores-avatar.png"
            alt=""
            width={306}
            height={306}
          />

          <img loading="lazy" decoding="async"
            className={styles.campana}
            src="/images/identidad/campana.png"
            alt=""
            width={14.49}
            height={14.49}
          />

          <span className={`${styles.burbuja} ${styles.burbujaAyuda}`} />
          <p className={styles.ayuda}>¿Cómo puedo ayudarlo?</p>

          <span className={styles.brillo} />
          <span className={`${styles.burbuja} ${styles.burbujaBuscando}`} />
          <p className={styles.buscando}>Buscando recomendaciones</p>
          <img loading="lazy" decoding="async"
            className={styles.ia}
            src="/images/identidad/ia.svg"
            alt=""
            width={20.46}
            height={20.46}
          />

          {/* Círculo de vidrio con ícono, cortado por la esquina (export 4x). */}
          <img loading="lazy" decoding="async"
            className={styles.icono4x}
            src="/images/identidad/valores-icono.png"
            alt=""
            width={795}
            height={1102}
          />
          <span className={`${styles.vidrio} ${styles.vidrioChico}`} />
        </div>

        {/* Solo la columna derecha cambia con la pestaña. */}
        <div
          key={activa}
          id="identidad-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activa}`}
          className={styles.panel}
        >
          {activa === "Valores" ? (
            <>
              <h2 className={styles.title}>Nuestros valores</h2>
              <div className={styles.lista}>
                {valores.map((valor, index) => (
                  <Fragment key={valor.title}>
                    {index > 0 ? <hr className={styles.separador} /> : null}
                    <details
                      name="identidad-valores"
                      className={styles.item}
                      open={index === 0}
                    >
                      <summary className={styles.summary}>
                        {valor.title}
                        {/* Más / menos: la línea vertical se oculta al abrir. */}
                        <svg
                          className={styles.icono}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path className={styles.vertical} d="M12 5v14" />
                        </svg>
                      </summary>
                      {valor.text ? (
                        <p className={styles.text}>{valor.text}</p>
                      ) : null}
                    </details>
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            // Pendiente: contenido de Misión y Visión (no está en el diseño recibido).
            <h2 className={styles.title}>{activa}</h2>
          )}
        </div>
      </div>
    </section>
  );
}
