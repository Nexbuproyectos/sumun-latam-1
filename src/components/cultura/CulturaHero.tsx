import Image from "next/image";

import styles from "./culturaHero.module.css";

const C = "/images/cultura";

const dias = ["L", "M", "M", "J", "V", "S", "D"];

// Barras del calendario (AM/PM). Cada barra: degradado de su color hacia blanco.
const barras = [
  { color: "#00a2ff" },
  { color: "#e2e2f0" },
  { split: ["#00a2ff", "#f15a2e"] },
  { color: "#e2e2f0" },
  { color: "#f15a2e" },
];

export function CulturaHero() {
  return (
    <section className={styles.section} aria-labelledby="cultura-hero-title">
      <div className={styles.stage}>
        <div className={styles.cinta} aria-hidden="true">
          <Image src={`${C}/cinta-hero.png`} width={1024} height={257} sizes="2050px" alt="" preload />
        </div>

        {/* Widget de pasos (difuminado, detrás de las fotos) */}
        <div className={styles.pasos} aria-hidden="true">
          <img loading="lazy" decoding="async" className={styles.pasosLinea} src={`${C}/w-linea-a.svg`} alt="" width={170.953} height={0.8634} />
          {[14.68, 77.71, 140.73].map((x) => (
            <span key={x} className={styles.paso} style={{ left: x }}>
              <span className={styles.pasoAro}>
                <span />
              </span>
              <img loading="lazy" decoding="async" src={`${C}/w-check-a.svg`} alt="" width={13.8144} height={10.3608} />
            </span>
          ))}
        </div>

        <div className={styles.copy}>
          <p className={styles.tag}>Cultura de alto desempeño</p>
          <div className={styles.text}>
            <h1 id="cultura-hero-title" className={styles.title}>
              Mucho más que <br />
              solo ambiente
            </h1>
            <p className={styles.lead}>
              La cultura Sumun reconoce que la escuela es un tejido de relaciones
              vivas entre maestros, estudiantes, familias y directivos.
            </p>
          </div>
        </div>

        {/* Calendario AM/PM */}
        <div className={styles.calendario} aria-hidden="true">
          {[34.89, 97.92, 159.83].map((y, i) => (
            <img loading="lazy" decoding="async"
              key={y}
              className={styles.calLinea}
              style={{ top: y - 1.13, left: i === 0 ? 18.01 : 19.13 }}
              src={`${C}/w-linea-b.svg`}
              alt=""
              width={222.857}
              height={1.12554}
            />
          ))}
          <span className={styles.calLabel} style={{ top: 57.4 }}>AM</span>
          <span className={styles.calLabel} style={{ top: 120.43 }}>PM</span>
          <div className={styles.calBarras}>
            {barras.map((b, i) =>
              b.split ? (
                <span key={i} className={styles.calColumna}>
                  <span className={styles.calBarraMitad} style={{ backgroundImage: `linear-gradient(-70.17deg, ${b.split[0]} 6.24%, #feffff 126.75%)` }} />
                  <span className={styles.calBarraMitad} style={{ backgroundImage: `linear-gradient(-70.17deg, ${b.split[1]} 6.24%, #feffff 126.75%)` }} />
                </span>
              ) : (
                <span key={i} className={styles.calBarra} style={{ backgroundImage: `linear-gradient(-79.69deg, ${b.color} 6.24%, #feffff 126.75%)` }} />
              ),
            )}
          </div>
        </div>

        {/* Objetivos diarios */}
        <div className={styles.objetivos} aria-hidden="true">
          <div className={styles.objTitulo}>
            <span className={styles.objFuerte}>Objetivos diarios</span>
            <span className={styles.objSuave}>Últimos 7 días</span>
          </div>
          <div className={styles.objValor}>
            <span className={styles.objFuerte}>6/7</span>
            <span className={styles.objSuave}>Alcanzados</span>
          </div>
          <div className={styles.dias}>
            {dias.map((d, i) => (
              <span key={i} className={styles.dia}>
                <img loading="lazy" decoding="async" src={`${C}/w-check-b.svg`} alt="" width={8.64865} height={6.48649} />
                <span className={styles.diaCirculo}>
                  {i === 1 ? (
                    <>
                      <img loading="lazy" decoding="async" className={styles.diaMedioA} src={`${C}/w-medio-a.svg`} alt="" width={10.8108} height={10.8108} />
                      <img loading="lazy" decoding="async" className={styles.diaMedioB} src={`${C}/w-medio-b.svg`} alt="" width={7.56757} height={12.973} />
                    </>
                  ) : (
                    <>
                      <img loading="lazy" decoding="async" className={styles.diaAnillo} src={`${C}/w-anillo.svg`} alt="" width={19.4595} height={19.4595} />
                      <img loading="lazy" decoding="async" className={styles.diaPunto} src={`${C}/w-punto.svg`} alt="" width={12.973} height={12.973} />
                    </>
                  )}
                </span>
                <span className={styles.diaLetra}>{d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Recorte de fotos (forma "Intersect" de Figma), va por encima de los widgets */}
        <div className={styles.fotos}>
          <Image
            src={`${C}/hero-fotos.png`}
            width={2000}
            height={1523}
            sizes="(min-width: 1100px) 1000px, 100vw"
            alt="Estudiantes y una maestra sonriendo"
            preload
          />
        </div>
      </div>
    </section>
  );
}
