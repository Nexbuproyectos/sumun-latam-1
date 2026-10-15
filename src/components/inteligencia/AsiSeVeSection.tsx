import Image from "next/image";
import type { CSSProperties } from "react";

import { radialSvg } from "../shared/radialSvg";
import styles from "./asiSeVe.module.css";

const I = "/images/inteligencia";

function at(left: number, top: number, width?: number, height?: number): CSSProperties {
  return { left, top, width, height };
}

const veloMaestra1 = radialSvg(
  425,
  599,
  "1.865e-13 51.118 -36.262 -1.1254 212.5 235",
  "<stop stop-color='rgba(217,217,217,0)' offset='0.027468'/><stop stop-color='rgba(217,217,217,0)' offset='0.4'/><stop stop-color='rgba(240,240,240,0.67835)' offset='0.69372'/><stop stop-color='rgba(251,251,251,1)' offset='1'/>",
);

const veloMaestra2 = radialSvg(
  425,
  599,
  "-0.050002 49.568 -35.162 -1.1268 213 250.5",
  "<stop stop-color='rgba(217,217,217,0)' offset='0.027468'/><stop stop-color='rgba(217,217,217,0)' offset='0.4'/><stop stop-color='rgba(240,240,240,0.67835)' offset='0.78711'/><stop stop-color='rgba(251,251,251,1)' offset='1'/>",
);

// Tarjetas "Ayuda curricular" apiladas (atrás → adelante).
const pildoras = [
  { style: { ...at(57.51, 456.14, 244.97, 60.53), opacity: 0.4, borderRadius: 13.6 }, title: "Ciencias", sub: "Fisica, química, biologia y astronomia", scale: 0.81, color: "#0a857e", icon: "mae-atom-a.svg", iw: 23.8788 },
  { style: { ...at(39.37, 436.34, 283.85, 70.14), opacity: 0.89, borderRadius: 15.76 }, title: "Ciencias", sub: "Fisica, química, biologia y astronomia", scale: 0.94, color: "#0a857e", icon: "mae-atom-b.svg", iw: 27.6692 },
  { style: { ...at(29, 415.14, 302, 74.63), borderRadius: 16.77 }, title: "Ayuda curricular", sub: "Fisica, química, biologia y más...", scale: 1, color: "#fff", icon: "mae-search.svg", iw: 36.2314, front: true },
];

export function AsiSeVeSection() {
  return (
    <section className={styles.section} aria-labelledby="asi-se-ve-title">
      <div className={styles.stage}>
        <h2 id="asi-se-ve-title" className={styles.title}>
          Así se ve la Inteligencia Curricular Sumun
        </h2>

        <ul className={styles.cards}>
          {/* Estudiantes */}
          <li className={`${styles.card} ${styles.cardEstudiantes}`}>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.velo} style={at(-176, -17, 843, 610)} />
              <img style={at(-87.64, -79)} src={`${I}/est-ellipse.svg`} alt="" width={439} height={439} />
              <span className={styles.planeta} style={at(-9.63, -66.76, 60.97, 60.97)}>
                <img src={`${I}/est-planet.svg`} alt="" width={31.3278} height={31.3278} />
              </span>
              <span className={styles.fotoCirculo} style={at(-47, -44, 347, 347)}>
                <span className={styles.capa}>
                  <img src={`${I}/estudiante-a.jpg`} alt="" style={{ left: "-43.47%", top: "1.95%", width: "189.5%", height: "284.22%" }} />
                </span>
                <span className={styles.capa}>
                  <img src={`${I}/estudiante-b.jpg`} alt="" style={{ left: "-76.35%", top: "-14.21%", width: "262.36%", height: "174.93%" }} />
                </span>
              </span>
              <span className={`${styles.vidrio} ${styles.vidrioAtom}`} style={at(-31, 229, 181, 181)}>
                <img src={`${I}/est-atom.svg`} alt="" width={75.5657} height={75.5695} />
              </span>
              <span className={`${styles.vidrio} ${styles.vidrioChat}`} style={at(287.5, 30, 88, 88)}>
                <img src={`${I}/est-chat.svg`} alt="" width={44.4892} height={44.4892} style={{ translate: "3.06px -1.45px" }} />
              </span>
              <span className={`${styles.vidrio} ${styles.vidrioChart}`} style={at(256, 248, 63, 63)}>
                <img src={`${I}/est-chart.svg`} alt="" width={26.5447} height={26.5418} style={{ translate: "2.19px -1.04px" }} />
              </span>
            </div>
            <p className={styles.cardText}>
              <strong>Estudiantes</strong> que piensan antes de actuar
            </p>
          </li>

          {/* Maestros */}
          <li className={`${styles.card} ${styles.cardMaestros}`}>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.veloRadial} style={{ ...at(-14, 0, 425, 599), backgroundImage: veloMaestra1 }} />
              <span className={styles.fotoMaestra} style={at(-172, -9, 683, 780)}>
                <Image src={`${I}/maestra.jpg`} width={626} height={626} sizes="683px" alt="" />
              </span>
              <span className={styles.veloRadial} style={{ ...at(-14, 0, 425, 599), backgroundImage: veloMaestra2 }} />
              <span className={styles.bandaDifusa} style={at(-290, -71, 1342, 257)} />
              {pildoras.map((p) => (
                <span
                  key={p.style.top as number}
                  className={p.front ? `${styles.pildora} ${styles.pildoraFrente}` : styles.pildora}
                  style={p.style}
                >
                  <span
                    className={p.front ? `${styles.tile} ${styles.tileFrente}` : styles.tile}
                    style={{ opacity: p.front ? 1 : 0.4, width: 60.87 * p.scale, height: 61.87 * p.scale, left: 9.22 * p.scale, top: 6.71 * p.scale, borderRadius: 18 * p.scale }}
                  >
                    <img src={`${I}/${p.icon}`} alt="" width={p.iw} height={p.iw} />
                  </span>
                  <span className={styles.pildoraTitle} style={{ color: p.color, fontSize: 17.47 * p.scale, left: 81.6 * p.scale, top: 16 * p.scale }}>
                    {p.title}
                  </span>
                  <span className={styles.pildoraSub} style={{ color: p.color, fontSize: 11.65 * p.scale, left: 82 * p.scale, top: 41 * p.scale }}>
                    {p.sub}
                  </span>
                </span>
              ))}
            </div>
            <p className={`${styles.cardText} ${styles.cardTextTop}`}>
              <strong>Maestros</strong> comprometidos que enseñan con propósito
            </p>
          </li>

          {/* Escuelas */}
          <li className={`${styles.card} ${styles.cardEscuelas}`}>
            <div className={styles.art} aria-hidden="true">
              <img style={at(-25.6, -230.6)} src={`${I}/esc-ellipse.svg`} alt="" width={707.2} height={707.2} />
              <span className={styles.escuelasDegradado} style={at(-24, 0, 415, 574)} />
              <span className={styles.velo} style={at(-176, -12, 843, 605)} />
            </div>
            <p className={styles.cardText}>
              <strong>Escuelas </strong>que mejoran sus resultados
            </p>
          </li>
        </ul>

        <div className={styles.moebius} aria-hidden="true" data-parallax="fast">
          <Image src={`${I}/moebius.png`} width={842} height={838} sizes="593px" alt="" />
        </div>
      </div>
    </section>
  );
}
