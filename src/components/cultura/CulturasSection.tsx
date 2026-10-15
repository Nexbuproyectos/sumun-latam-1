import Image from "next/image";

import styles from "./culturas.module.css";

const C = "/images/cultura";

const culturas = [
  { icon: "i-trophy.svg", w: 36, h: 36, title: ["Cultura del Esfuerzo por el Logro", "y la Excelencia"], text: "Celebramos el trabajo constante y la pasión por superar metas." },
  { icon: "i-people.svg", w: 33.7533, h: 36, title: ["Cultura del Impulso Colectivo"], text: "Fomentamos la colaboración como motor de cambio. Juntos, estudiantes, familias y maestros construyen una comunidad unida." },
  { icon: "i-heart.svg", w: 36, h: 36, title: ["Cultura del Balance Emocional", "y Resiliencia"], text: "Priorizamos el bienestar, ayudando a los estudiantes a gestionar emociones y superar retos con confianza" },
  { icon: "i-idea.svg", w: 36, h: 36, title: ["Cultura de la Inspiración"], text: "Encendemos la chispa de la creatividad y la motivación para que todos se atrevan a soñar en grande y actuar con propósito." },
];

export function CulturasSection() {
  return (
    <section className={styles.section} aria-labelledby="culturas-title">
      <div className={styles.decor} aria-hidden="true" data-parallax="fast">
        <img src="/images/banner/decorativo-3d.webp" alt="" />
      </div>

      <div className={styles.stage}>
        <div className={styles.card}>
          <span className={styles.brillo} aria-hidden="true" />
          <div className={styles.intro}>
            <h2 id="culturas-title" className={styles.title}>
              Culturas que forjan futuros
            </h2>
            <p className={styles.lead}>
              La cultura es una fuerza que impulsa a estudiantes, familias y
              educadores hacia su mejor versión. Creamos un ecosistema dinámico
              donde el aprendizaje cobra vida, inspirando crecimiento, conexión y
              propósito compartido
            </p>
          </div>

          <ul className={styles.lista}>
            {culturas.map((c) => (
              <li key={c.icon} className={styles.item}>
                <span className={styles.itemIcono} aria-hidden="true">
                  <img src={`${C}/${c.icon}`} alt="" width={c.w} height={c.h} />
                </span>
                <div className={styles.itemTexto}>
                  <h3 className={styles.itemTitle}>
                    {c.title[0]}
                    {c.title[1] ? (
                      <>
                        <br />
                        {c.title[1]}
                      </>
                    ) : null}
                  </h3>
                  <p className={styles.itemText}>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup del IA Tutor (captura exportada de Figma) */}
        <div className={styles.mockup}>
          <Image
            src={`${C}/tutor-mockup.jpg`}
            width={1412}
            height={1110}
            sizes="(min-width: 1100px) 709px, 100vw"
            alt="Vista del IA Tutor de Sumun: explora por materias"
          />
        </div>
        <img className={styles.cursor} src={`${C}/cursor.svg`} alt="" width={93.143} height={95.0594} aria-hidden="true" />
      </div>
    </section>
  );
}
