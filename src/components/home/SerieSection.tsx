"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./serie.module.css";

const H = "/images/home-extra";

// En Figma los tres episodios repiten el mismo contenido (placeholder).
const episodios = [
  { id: "ep-1", title: "Episodio 1:", subtitle: "¿Cómo surgen las ideas que revolucionan la educación?", href: "#" },
  { id: "ep-2", title: "Episodio 1:", subtitle: "¿Cómo surgen las ideas que revolucionan la educación?", href: "#" },
  { id: "ep-3", title: "Episodio 1:", subtitle: "¿Cómo surgen las ideas que revolucionan la educación?", href: "#" },
];

export function SerieSection() {
  const [start, setStart] = useState(0);
  // Se muestran dos episodios completos; el siguiente se asoma atenuado.
  const maxStart = Math.max(0, episodios.length - 2);

  return (
    <section id="serie" className={styles.section} aria-labelledby="serie-title">
      <div className={styles.stage}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Serie documental</p>
          <h2 id="serie-title" className={styles.title}>
            La génesis de Sumun
          </h2>
        </div>

        <a href="#" className={`btn ${styles.verSerie}`}>
          Ver serie completa
          <img loading="lazy" decoding="async" src={`${H}/flecha-diagonal.svg`} alt="" width={24.1502} height={24.1502} />
        </a>

        <div className={styles.viewport}>
          <ul className={styles.track} style={{ ["--start" as string]: start }}>
            {episodios.map((ep, index) => {
              const visible = index >= start && index < start + 2;
              return (
                <li
                  key={ep.id}
                  className={visible ? styles.episodio : `${styles.episodio} ${styles.episodioAtenuado}`}
                  aria-hidden={!visible}
                  inert={!visible}
                >
                  <div className={styles.foto} aria-hidden="true">
                    <Image src={`${H}/episodio.jpg`} width={1548} height={1012} sizes="725px" alt="" />
                  </div>
                  <span className={styles.velo} aria-hidden="true" />
                  <span className={styles.degradado} aria-hidden="true" />
                  <h3 className={styles.epTitle}>
                    {ep.title}
                    <br />
                    {ep.subtitle}
                  </h3>
                  <a className={styles.epLink} href={ep.href}>
                    Ver episodio completo
                    <img loading="lazy" decoding="async" src={`${H}/link-blanco.svg`} alt="" width={14.4186} height={14.4186} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className={styles.siguiente}
          aria-label={start < maxStart ? "Siguiente episodio" : "Volver al primer episodio"}
          onClick={() => setStart((s) => (s < maxStart ? s + 1 : 0))}
        >
          <img loading="lazy" decoding="async" src={`${H}/flecha-azul.svg`} alt="" width={24} height={24} />
        </button>

        <article id="conversaciones" className={styles.conversaciones}>
          <div className={styles.convFoto} aria-hidden="true">
            <Image src={`${H}/conversaciones.jpg`} width={2847} height={1262} sizes="(min-width: 1200px) 1290px, 110vw" alt="" />
          </div>
          <span className={styles.convBrillo} aria-hidden="true" />
          <img loading="lazy" decoding="async"
            className={styles.convLogo}
            src={`${H}/conversaciones-logo.png`}
            alt="Conversaciones Sumun"
            width={401}
            height={33.437}
          />
          <p className={styles.convSub}>Conversaciones que inspiran nuevos caminos</p>
          <span className={styles.convSombra} aria-hidden="true" />
          <h3 className={styles.convTitle}>La cultura como suelo del aprendizaje</h3>
          <p className={styles.convAutor}>Por Gregorio Luri y Ernesto Núñez</p>
          <p className={styles.convText}>
            Educar no es solo transmitir conocimientos, sino cultivar una tradición
            que haga la vida más comprensible, significativa y valiosa para las
            nuevas generaciones.
          </p>
          <a className={styles.convLink} href="#">
            Ver video
            <img loading="lazy" decoding="async" src={`${H}/link-blanco-b.svg`} alt="" width={13.414} height={13.414} />
          </a>
        </article>
      </div>
    </section>
  );
}
