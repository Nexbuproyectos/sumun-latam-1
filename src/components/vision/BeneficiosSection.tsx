import type { CSSProperties } from "react";

import { radialSvg } from "../shared/radialSvg";

import styles from "./beneficios.module.css";

const B = "/images/beneficios";

// Posición absoluta en px (valores del frame de Figma).
function at(left: number, top: number, width?: number, height?: number): CSSProperties {
  return { left, top, width, height };
}

const stopsBarra =
  "<stop stop-color='rgba(249,249,249,1)' offset='0.39423'/><stop stop-color='rgba(218,245,254,1)' offset='0.81731'/><stop stop-color='rgba(227,214,211,1)' offset='0.86298'/><stop stop-color='rgba(236,183,168,1)' offset='0.90865'/><stop stop-color='rgba(245,152,125,1)' offset='0.95433'/><stop stop-color='rgba(254,121,83,1)' offset='1'/>";

const stopsCirculo =
  "<stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(252,214,203,1)' offset='0.25'/><stop stop-color='rgba(248,173,151,1)' offset='0.5'/><stop stop-color='rgba(245,131,98,1)' offset='0.75'/><stop stop-color='rgba(243,111,72,1)' offset='0.875'/><stop stop-color='rgba(241,90,46,1)' offset='1'/>";

const stopsCirculoInterior =
  "<stop stop-color='rgba(254,254,254,1)' offset='0.22105'/><stop stop-color='rgba(251,213,202,1)' offset='0.41578'/><stop stop-color='rgba(248,172,150,1)' offset='0.61052'/><stop stop-color='rgba(244,131,98,1)' offset='0.80526'/><stop stop-color='rgba(243,111,72,1)' offset='0.90263'/><stop stop-color='rgba(241,90,46,1)' offset='1'/>";

// Barras de vidrio del gráfico (tarjeta 1).
const barras = [
  { key: "b1", l: 268.88, t: 191.39, w: 51.837, h: 277.697, m: "3.6003e-14 -43.531 8.1258 -4.3292e-14 25.918 384.02" },
  { key: "b2", l: 142.99, t: 348.14, w: 51.837, h: 120.953, m: "3.6003e-14 -18.96 8.1258 -1.8856e-14 25.918 167.26" },
  { key: "b3", l: 80.04, t: 378.99, w: 51.837, h: 90.097, m: "3.6003e-14 -14.123 8.1258 -1.4046e-14 25.918 124.59" },
];
const barra4 = { l: 207.17, t: 297.54, w: 50.603, h: 171.555, m: "3.5146e-14 -26.892 7.9323 -2.6745e-14 25.301 237.24" };

function Barra({ l, t, w, h, m }: { l: number; t: number; w: number; h: number; m: string }) {
  return (
    <span
      className={styles.barra}
      style={{ ...at(l, t, w, h), backgroundImage: radialSvg(w, h, m, stopsBarra, 0.27) }}
    />
  );
}

// Círculos concéntricos (tarjeta 7): centro, tamaño y degradado.
const circulos = [
  { cx: 287, cy: 138, w: 558, h: 556, m: "1.7084e-15 27.8 -27.9 1.7023e-15 279 278", s: stopsCirculo },
  { cx: 284.02, cy: 138, w: 478, h: 478, m: "1.4635e-15 23.9 -23.9 1.4635e-15 239 239", s: stopsCirculo },
  { cx: 283.52, cy: 137.5, w: 379, h: 379, m: "1.1604e-15 18.95 -18.95 1.1604e-15 189.5 189.5", s: stopsCirculo },
  { cx: 283.52, cy: 138, w: 315, h: 314, m: "9.6441e-16 15.7 -15.75 9.6135e-16 157.5 157", s: stopsCirculoInterior, borde: true },
  { cx: 283.52, cy: 137.5, w: 239, h: 239, m: "6.5445e-16 10.688 -10.688 6.5445e-16 119.5 119.5", s: stopsCirculo },
  { cx: 283.52, cy: 137.5, w: 141, h: 141, m: "3.861e-16 6.3054 -6.3054 3.861e-16 70.5 70.5", s: stopsCirculo },
];

const lineas349 = [
  { t: 86, src: "linea-349a.svg" },
  { t: 60, src: "linea-349b.svg" },
  { t: 38, src: "linea-349b.svg" },
  { t: 16, src: "linea-349b.svg" },
];
const lineas530 = [181, 155, 133, 111, 278, 252, 230, 208];
const lineas267 = [379.83, 353.83, 331.83, 309.83, 289.83, 261.83];

// Foto recortada con capas (varios íconos de la tarjeta 7 superponen recortes).
function Capa({ src, style, className }: { src: string; style: CSSProperties; className?: string }) {
  return (
    <span className={`${styles.capa} ${className ?? ""}`}>
      <img src={src} alt="" style={style} />
    </span>
  );
}

const recorteA: CSSProperties = { left: "-31.79%", top: "-11.73%", width: "161.09%", height: "111.73%" };
const recorteC: CSSProperties = { left: "-23.75%", top: 0, width: "147.5%", height: "100%" };
const recorteFamiliaA: CSSProperties = { left: "-10.87%", top: 0, width: "121.74%", height: "100%" };
const recorteFamiliaB: CSSProperties = { left: "-9.74%", top: "0.4%", width: "150.47%", height: "100.43%" };

// Foto mini de los íconos de 39 y 10 px: cuatro capas superpuestas en Figma.
function FotoMini() {
  return (
    <>
      <Capa src={`${B}/foto-a.png`} style={recorteA} />
      <Capa src={`${B}/foto-c.png`} style={recorteC} className={styles.capa94} />
      <Capa src={`${B}/foto-b.jpg`} style={{ inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <Capa src={`${B}/foto-e.jpg`} style={{ left: "-2.1%", top: 0, width: "104.2%", height: "100%" }} />
    </>
  );
}

export function BeneficiosSection() {
  return (
    <section className={styles.section} aria-labelledby="beneficios-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="beneficios-title" className={styles.title}>
            Los beneficios que <br />
            Sumun trae a tu comunidad educativa
          </h2>
          <p className={styles.lead}>¿Qué obtiene la comunidad educativa con Sumun?</p>
        </div>

        <div className={styles.grid}>
          {/* 1. Obtención de resultados */}
          <article className={`${styles.card} ${styles.cardResultados}`}>
            <img className={styles.abs} style={at(77, 202)} src={`${B}/ia-mini.svg`} alt="" width={11} height={11} />
            <h3 className={styles.textResultados} style={at(37, 33, 289)}>
              <strong>Obtención de resultados: </strong>
              <br />
              mejores aprendizajes, medibles y sostenibles.
            </h3>

            <div className={styles.art} aria-hidden="true">
              <img className={styles.abs} style={at(226.7, 196.58)} src={`${B}/ellipse-9.svg`} alt="" width={30.8553} height={30.8553} />
              <span className={styles.rotado} style={{ ...at(308.57, 98.87, 98.598, 98.598), transform: "rotate(9.05deg)" }}>
                <img className={styles.abs} style={{ left: "37.57%", top: 0 }} src={`${B}/ellipse-8.svg`} alt="" width={61.5597} height={49.2991} />
              </span>
              <span className={styles.rotado} style={{ ...at(363.43, -4.86, 98.598, 98.598), transform: "rotate(9.05deg)" }}>
                <img className={styles.abs} style={{ left: 0, top: 0 }} src={`${B}/ellipse-10.svg`} alt="" width={98.5983} height={98.5983} />
              </span>
              <span className={styles.rotado} style={{ ...at(290.51, -1.26, 36.779, 36.779), transform: "rotate(17deg)" }}>
                <img className={styles.abs} style={{ left: "11.51%", top: "11.51%" }} src={`${B}/star-1.svg`} alt="" width={28.3104} height={28.3104} />
              </span>

              <span className={styles.chatCard} style={at(43.9, 168.95, 306.203, 313.646)} />
              {lineas267.map((t) => (
                <img key={t} className={styles.abs} style={at(67.65, t - 0.62)} src={`${B}/linea-267.svg`} alt="" width={267} height={1.23421} />
              ))}
              {barras.map(({ key, ...b }) => (
                <Barra key={key} {...b} />
              ))}

              <img className={styles.abs} style={at(15.1, 143.1)} src={`${B}/burbuja-1a.svg`} alt="" width={313.611} height={85.2473} />
              <img className={styles.abs} style={at(-11.93, 117.55)} src={`${B}/burbuja-1b.svg`} alt="" width={402.642} height={166.2} />
              <img className={styles.abs} style={at(19.04, 148.53)} src={`${B}/burbuja-1c.svg`} alt="" width={311.064} height={72.6995} />
              <p className={styles.burbujaText} style={{ ...at(53.9, 171.7, 255.169), fontWeight: 800 }}>
                Necesito ayuda con los números 🥲
              </p>

              <Barra {...barra4} />

              <span className={styles.botonMate} style={at(61, 477, 267.928, 43.893)}>
                <img src={`${B}/icon-book.svg`} alt="" width={21.9463} height={21.9463} />
                Comenzar con Matemáticas
              </span>

              <span className={styles.avatar} style={at(254.41, 308.23, 63.233, 63.233)}>
                <Capa src={`${B}/foto-a.png`} style={recorteA} />
                <Capa src={`${B}/foto-b.jpg`} style={{ left: "-168.63%", top: "-37.03%", width: "358.85%", height: "238.82%" }} />
              </span>
              <img className={styles.abs} style={at(108.35, 225.76)} src={`${B}/burbuja-2.svg`} alt="" width={215.493} height={95.1285} />
              <p className={styles.burbujaText} style={{ ...at(150.07, 252.66, 134.529), fontWeight: 700 }}>
                Vamos a intentarlo!
              </p>
            </div>
          </article>

          <div className={styles.subgrid}>
            {/* 2. Uso estratégico de datos */}
            <article className={`${styles.card} ${styles.cardDatos}`}>
              <div className={styles.art} aria-hidden="true">
                {lineas349.map(({ t, src }) => (
                  <img key={t} className={styles.abs} style={at(25, t - 0.62)} src={`${B}/${src}`} alt="" width={349} height={1.23421} />
                ))}
                {lineas530.map((t) => (
                  <img key={t} className={styles.abs} style={at(25, t - 0.62)} src={`${B}/linea-530.svg`} alt="" width={530} height={1.23421} />
                ))}
                <img className={styles.abs} style={at(-21.31, 31.71)} src={`${B}/chart-a.svg`} alt="" width={625.61} height={276.783} />
                <img className={styles.abs} style={at(-44.97, 11)} src={`${B}/chart-b.svg`} alt="" width={691.01} height={342.183} />
                <img className={styles.abs} style={at(-47.01, 10)} src={`${B}/chart-c.svg`} alt="" width={693.03} height={344.183} />

                <span className={styles.punto52} style={at(297.5, 16)}><span /></span>
                <span className={styles.sombraAnillo} style={{ left: 325.27, top: 41.91 }} />
                <span className={styles.punto52} style={at(32, 26)}>
                  <span />
                  <span className={styles.sombraAnillo} style={{ left: 37.27, top: 25.91 }} />
                </span>
                <span className={styles.punto52} style={at(152, 69)}><span /></span>
                <span className={styles.sombraAnillo} style={{ left: 181.27, top: 94.91 }} />
              </div>
              <h3 className={styles.textDatos} style={at(25, 167, 317)}>
                <strong>Uso estratégico de datos </strong>pedagógicos en tiempo real para
                tomar decisiones con <strong>evidencia.</strong>
              </h3>
            </article>

            {/* 3. Personalización con IA */}
            <article className={`${styles.card} ${styles.cardPersonalizacion}`}>
              <h3 className={styles.textPersonalizacion}>
                <strong>Personalización del aprendizaje</strong> potenciado con
                <b> inteligencia artificial, </b>de forma continua.
              </h3>
              <div className={styles.art} aria-hidden="true">
                <span className={styles.sombraNaranja} />
                <img className={styles.abs} style={at(122, 192.29)} src={`${B}/pill-creando.svg`} alt="" width={132.708} height={55.6117} />
                <span className={styles.creando}>Creando</span>
                <img className={styles.abs} style={at(211.42, 208.05)} src={`${B}/ia-creando.svg`} alt="" width={16.3746} height={16.3746} />
              </div>
            </article>

            {/* 4. Familias */}
            <article className={`${styles.card} ${styles.cardFamilias}`}>
              <span className={styles.familiasVelo} aria-hidden="true" />
              <h3 className={styles.textFamilias}>
                <strong>Familias informadas y partícipes</strong> <span>del proceso educativo</span>
              </h3>
              <div className={styles.art} aria-hidden="true">
                <img className={styles.abs} style={at(54, 98)} src={`${B}/ellipse-49.svg`} alt="" width={287} height={287} />
                <span className={styles.planeta} style={at(105, 106, 39.859, 39.859)}>
                  <span className={styles.planetaBrillo} />
                  <img src={`${B}/icon-planet.svg`} alt="" width={20.4808} height={20.4808} />
                </span>
                <span className={styles.fotoFamilia} style={at(74, 120, 247, 247)}>
                  <Capa src={`${B}/familia-a.jpg`} style={recorteFamiliaA} />
                  <Capa src={`${B}/familia-b.jpg`} style={recorteFamiliaB} />
                  <span className={styles.burbujaBrillo} />
                </span>
                <span className={`${styles.vidrio} ${styles.vidrioAtom}`} style={at(8, 183, 126.824, 126.824)}>
                  <img src={`${B}/atom-126.svg`} alt="" width={52.9475} height={52.9515} />
                </span>
                <span className={`${styles.vidrio} ${styles.vidrioChat}`} style={at(278, 125, 70.659, 70.659)}>
                  <img src={`${B}/icon-chat.svg`} alt="" width={35.7222} height={35.7222} style={{ translate: "2.46px -1.16px" }} />
                </span>
              </div>
            </article>

            {/* 5. Clima escolar */}
            <article className={`${styles.card} ${styles.cardClima}`}>
              <div className={styles.art} aria-hidden="true">
                <span className={styles.climaFoto} style={at(-22, -9, 436, 410)}>
                  <img src={`${B}/clima.jpg`} alt="" style={{ left: "4.36%", top: "0.61%", width: "87.39%", height: "62.02%" }} />
                </span>
                <span className={styles.climaVelo} style={at(-112, -78, 602, 398)} />
              </div>
              <h3 className={styles.textClima}>
                Un clima escolar positivo que fortalece el{" "}
                <strong>bienestar y el sentido de pertenencia.</strong>
              </h3>
            </article>
          </div>

          {/* 6. Acompañamiento al maestro */}
          <article className={`${styles.card} ${styles.cardMaestro}`}>
            <span className={styles.maestroFoto} style={at(-155, -95, 512, 453)} aria-hidden="true">
              <img src={`${B}/maestro.png`} alt="" style={{ left: "-16.24%", top: "14.47%", width: "132.48%", height: "100%" }} />
            </span>
            <h3 className={styles.maestroTitle} style={at(314, 69, 228)}>
              Acompañamiento al maestro
            </h3>
            <p className={styles.maestroText} style={at(314, 132, 216)}>
              Planificación y evaluación, a través del análisis del trabajo en las
              aulas para generar contenidos específicos y dirigidos.
            </p>
          </article>

          {/* 7. Y lo más importante */}
          <article className={`${styles.card} ${styles.cardImportante}`}>
            <div className={styles.art} aria-hidden="true">
              {circulos.map((c) => (
                <span
                  key={c.w}
                  className={c.borde ? `${styles.circulo} ${styles.circuloBorde}` : styles.circulo}
                  style={{
                    left: c.cx - c.w / 2,
                    top: c.cy - c.h / 2,
                    width: c.w,
                    height: c.h,
                    backgroundImage: radialSvg(c.w, c.h, c.m, c.s, 0.2),
                  }}
                />
              ))}
              <span className={`${styles.circulo} ${styles.circuloCentro}`} style={at(283.52 - 36.5, 137.5 - 36.5, 73, 73)} />

              <span className={styles.fotoDifusa} style={{ ...at(513, 12, 145, 145), filter: "blur(4.95px)", opacity: 0.54 }}>
                <Capa src={`${B}/foto-a.png`} style={recorteA} />
              </span>
              <span className={styles.fotoDifusa} style={{ ...at(-79.98, 84, 84, 84), filter: "blur(5.7px)", opacity: 0.56 }}>
                <Capa src={`${B}/foto-c.png`} style={recorteC} />
              </span>

              <span className={`${styles.vidrioNaranja}`} style={{ ...at(148, 83, 64.839, 64.839), borderWidth: 0.926 }}>
                <img src={`${B}/atom-64.svg`} alt="" width={27.0695} height={27.0734} />
                <span className={styles.fotoIcono} style={at(2.96, 2.96, 57.058, 57.058)}>
                  <img src={`${B}/foto-d.png`} alt="" style={{ inset: 0, width: "100%", height: "100%", objectPosition: "bottom" }} />
                </span>
              </span>
              <span className={styles.vidrioNaranja} style={{ ...at(360, 40, 86, 86), borderWidth: 1.229 }}>
                <img src={`${B}/atom-86.svg`} alt="" width={35.9041} height={35.9081} />
                <span className={styles.fotoIcono} style={at(3.93, 3.93, 75.68, 75.68)}>
                  <Capa src={`${B}/familia-a.jpg`} style={recorteFamiliaA} />
                  <Capa src={`${B}/familia-b.jpg`} style={recorteFamiliaB} />
                </span>
              </span>
              <span className={`${styles.vidrioNaranja} ${styles.vidrioGrande}`} style={at(-21, 150, 230, 230)}>
                <img src={`${B}/atom-230.svg`} alt="" width={96.0226} height={96.0305} />
                <span className={styles.fotoIcono} style={at(10.51, 10.51, 202.4, 202.4)}>
                  <Capa src={`${B}/foto-c.png`} style={recorteC} className={styles.capa94} />
                </span>
              </span>
              <span className={styles.vidrioNaranja} style={{ ...at(266, 157, 39, 39), borderWidth: 0.557 }}>
                <img src={`${B}/atom-39.svg`} alt="" width={16.2821} height={16.286} />
                <span className={styles.fotoIconoSinBrillo} style={at(1.78, 1.78, 34.32, 34.32)}>
                  <FotoMini />
                </span>
              </span>
              <span className={styles.vidrioNaranja} style={{ ...at(263, 115, 10, 10), borderWidth: 0.143 }}>
                <img src={`${B}/atom-10.svg`} alt="" width={4.17489} height={4.17508} />
                <span className={styles.fotoIconoSinBrillo} style={at(0.46, 0.46, 8.8, 8.8)}>
                  <FotoMini />
                </span>
              </span>
            </div>
            <h3 className={styles.importanteTitle} style={{ left: 40, top: 39 }}>
              Y lo más importante
            </h3>
            <p className={styles.importanteText} style={at(305, 216, 245)}>
              Una comunidad educativa en su mejor versión
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
