import Image from "next/image";
import type { CSSProperties } from "react";

import { radialSvg } from "../shared/radialSvg";
import styles from "./microMacro.module.css";

const I = "/images/inteligencia";

function at(left: number, top: number, width?: number, height?: number): CSSProperties {
  return { left, top, width, height };
}

const brilloPildora = (w: number, h: number, m: string) =>
  radialSvg(
    w,
    h,
    m,
    "<stop stop-color='rgba(242,242,242,1)' offset='0.15103'/><stop stop-color='rgba(255,255,255,0.85)' offset='0.79896'/>",
  );

// Tarjetas "Explora por materias" giradas (atrás → adelante). cx/cy = centro del bounding box de Figma.
const pildoras = [
  {
    cx: 96 + 340.844 / 2, cy: 281 + 152.946 / 2, w: 330.953, h: 81.781, rot: 12.78, opacity: 0.7, radius: 18.378, border: 0.919,
    brillo: { l: -45.11, t: -24.07, w: 486.139, h: 353.556, m: "-17.71 12.312 -13.31 -31.975 306.72 39.864" },
    tile: { l: 10.11, t: 7.35, w: 66.705, h: 67.799, r: 19.684, bg: "rgba(220,197,203,0.29)" },
    icon: { src: "mac-atom-a.svg", w: 32.2601, h: 32.2616 },
    title: { text: "Ciencias", cx: 128.89, t: 16.66, size: 19.148, color: "#d4d4d4" },
    sub: { text: "Fisica, química, biologia y astronomia", cx: 198.9, t: 44.11, size: 12.766, color: "#eee" },
  },
  {
    cx: 91.74 + 388.001 / 2, cy: 245.82 + 115.12 / 2, w: 383.485, h: 94.762, rot: 3.06, opacity: 0.7, radius: 21.295, border: 1.065,
    brillo: { l: -52.27, t: -27.89, w: 563.304, h: 409.676, m: "-20.521 14.266 -15.422 -37.05 355.41 46.191" },
    tile: { l: 11.72, t: 8.52, w: 77.293, h: 78.561, r: 22.808, bg: "rgba(0,175,165,0.33)" },
    icon: { src: "mac-atom-b.svg", w: 37.3808, h: 37.3825 },
    title: { text: "Ciencias", cx: 148.92, t: 19.3, size: 22.188, color: "#eee" },
    sub: { text: "Gramática, análisis literario y redacción", cx: 230.93, t: 51.12, size: 13.059, color: "#eee" },
  },
  {
    cx: 80 + 419.57 / 2, cy: 154 + 173.942 / 2, w: 408, h: 100.82, rot: -10.57, opacity: 1, radius: 22.656, border: 1.432, front: true,
    brillo: { l: -54.48, t: -28.54, w: 599.315, h: 435.865, m: "3.9368 14.531 -24.141 1.2454 299.28 -34.451" },
    tile: { l: 12.46, t: 9.06, w: 82.235, h: 83.583, r: 24.266, bg: "#0095cd" },
    icon: { src: "mac-search.svg", w: 48.9483, h: 48.9483 },
    title: { text: "Explora por materias", cx: 227.73, t: 21.67, size: 23.606, color: "#0095cd" },
    sub: { text: "Elige la mocrohablidad a entrenar", cx: 236.26, t: 55.27, size: 15.737, color: "#0095cd" },
  },
];

const stopsFrenteBrillo =
  "<stop stop-color='rgba(218,245,254,1)' offset='0.15103'/><stop stop-color='rgba(183,196,201,0.7)' offset='0.44898'/><stop stop-color='rgba(147,147,147,0.4)' offset='0.74693'/>";

const vidrioMicro = radialSvg(
  1399,
  1018,
  "14.05 33.3 -57.002 10.749 555 395.5",
  "<stop stop-color='rgba(245,245,245,0)' offset='0'/><stop stop-color='rgba(164,164,164,0.2)' offset='0.18498'/><stop stop-color='rgba(216,216,216,0.22)' offset='0.43381'/><stop stop-color='rgba(255,255,255,1)' offset='0.67788'/>",
);

export function MicroMacroSection() {
  return (
    <section className={styles.section} aria-labelledby="micro-macro-title">
      <div className={styles.linezoA} aria-hidden="true">
        <Image src={`${I}/linezo.png`} width={1620} height={940} sizes="920px" alt="" />
      </div>
      <div className={styles.linezoB} aria-hidden="true">
        <Image src={`${I}/linezo.png`} width={1620} height={940} sizes="920px" alt="" />
      </div>

      <div className={styles.stage}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            Micro y Macrohabilidades: El corazón del enfoque curricular.
          </p>
          <h2 id="micro-macro-title" className={styles.title}>
            Permite evaluar el proceso de aprendizaje, no solo el resultado final.
          </h2>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Macrohabilidades</h3>
            <div className={styles.art} aria-hidden="true">
              {pildoras.map((p) => (
                <span
                  key={p.rot}
                  className={styles.pildora}
                  style={{
                    left: p.cx - p.w / 2,
                    top: p.cy - p.h / 2,
                    width: p.w,
                    height: p.h,
                    borderRadius: p.radius,
                    borderWidth: p.border,
                    opacity: p.opacity,
                    transform: `rotate(${p.rot}deg)`,
                    boxShadow: p.front ? "13.59px 13.59px 44.18px 0 rgba(158,158,158,0.22)" : undefined,
                  }}
                >
                  <span
                    className={styles.pildoraBrillo}
                    style={{
                      ...at(p.brillo.l, p.brillo.t, p.brillo.w, p.brillo.h),
                      backgroundImage: p.front
                        ? radialSvg(p.brillo.w, p.brillo.h, p.brillo.m, stopsFrenteBrillo, 0.24)
                        : brilloPildora(p.brillo.w, p.brillo.h, p.brillo.m),
                    }}
                  />
                  <span
                    className={styles.pildoraTile}
                    style={{ ...at(p.tile.l, p.tile.t, p.tile.w, p.tile.h), borderRadius: p.tile.r, background: p.tile.bg }}
                  >
                    <img loading="lazy" decoding="async" src={`${I}/${p.icon.src}`} alt="" width={p.icon.w} height={p.icon.h} />
                  </span>
                  <span className={styles.pildoraTitle} style={{ left: p.title.cx, top: p.title.t, fontSize: p.title.size, color: p.title.color }}>
                    {p.title.text}
                  </span>
                  <span className={styles.pildoraSub} style={{ left: p.sub.cx, top: p.sub.t, fontSize: p.sub.size, color: p.sub.color }}>
                    {p.sub.text}
                  </span>
                </span>
              ))}
            </div>
            <p className={styles.cardText} style={{ top: 485 }}>
              <strong>Grandes capacidades que combinan pensamiento</strong>, conocimiento y
              acción. Incluye uno o más procesos cognitivos y está sujeta a un
              conjunto de contenidos curriculares articulados.
            </p>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Microhabilidades</h3>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.telefono} style={at(169, 131, 266, 326)}>
                <span style={{ ...at(-528, -381, 1399, 1018), backgroundImage: vidrioMicro }} />
              </span>

              <img loading="lazy" decoding="async" style={at(52.38, 208.01)} src={`${I}/mic-burbuja-b.svg`} alt="" width={341.781} height={70.2937} />
              <span className={styles.burbujaText} style={{ left: 79.71, top: 223.69, fontSize: 12.471 }}>
                En que tema académico puedo ayudarte hoy?
              </span>

              <img loading="lazy" decoding="async" style={at(270.41, 290.31)} src={`${I}/mic-burbuja-a.svg`} alt="" width={205.113} height={75.3416} />
              <span className={styles.burbujaText} style={{ left: 307.55, top: 305.82, fontSize: 15.038 }}>
                Números enteros
              </span>

              <span className={styles.sombraNaranja} />
              <img loading="lazy" decoding="async" style={at(114.44, 372.6)} src={`${I}/mic-pill.svg`} alt="" width={232.615} height={69.5055} />
              <span className={styles.burbujaText} style={{ left: 148.87, top: 389.38, fontSize: 15.608 }}>
                Creando ejercicio
              </span>
              <img loading="lazy" decoding="async" style={at(288.79, 389.38)} src={`${I}/mic-ia.svg`} alt="" width={24.0978} height={24.0978} />

              <span className={styles.botonMicro}>
                <img loading="lazy" decoding="async" src={`${I}/mic-brain.svg`} alt="" width={16.417} height={16.4155} />
                Quiero comenzar una microhabilidad
              </span>
            </div>
            <p className={styles.cardText} style={{ top: 505, fontWeight: 500 }}>
              Pasos más pequeños que construyen las capacidades. Permite evaluar y
              desarrollar paso a paso el proceso de aprendizaje de un estudiante.
            </p>
          </article>

          {/* "Map actor": en Figma es un bloque visual sin contenido (placeholder de video/mapa). */}
          <div className={styles.mapa} aria-hidden="true">
            <Image src={`${I}/video-placeholder.jpg`} width={1176} height={418} sizes="(min-width: 1200px) 1177px, 100vw" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
