import Image from "next/image";

import styles from "./corazonDigital.module.css";

const H = "/images/high-tech";

type Modulo = {
  name: string;
  text: string;
  icon: string;
  iconSize: number;
  x: number;
  y: number;
  width?: number;
  // El ícono va a la derecha del texto en los módulos del lado izquierdo del círculo.
  align: "left" | "right";
};

// Posiciones del frame de Figma (contenedor de 1366 × 992).
const modulos: Modulo[] = [
  { name: "Sumun Track", text: "Donde se realizan las evaluaciones propuestas en la ruta evaluativa", icon: "i-track.svg", iconSize: 32, x: 827, y: 98, align: "left" },
  { name: "Sumun Campus", text: "Donde todos los docentes tienen acceso a todos los contenidos digitales de estudio", icon: "i-campus.svg", iconSize: 40, x: 127, y: 134, width: 383, align: "right" },
  { name: "Sumun Garden", text: "Donde se aprende a gestionar las emociones", icon: "i-garden.svg", iconSize: 32, x: 963, y: 377, align: "left" },
  { name: "Sumun Office", text: "Guarda todas las herramientas/​aplicaciones para ayudar a ser más productivo y eficiente los maestros", icon: "i-office.svg", iconSize: 40, x: 28, y: 367, width: 383, align: "right" },
  { name: "Sumun Datacenter", text: "Donde estudiantes y docentes tienen acceso a analítica de aprendizaje", icon: "i-datacenter.svg", iconSize: 36, x: 74, y: 651, align: "right" },
  { name: "Sumun Home", text: "Donde las familias tienen visibilidad del progreso curricular y recursos de apoyo", icon: "i-home.svg", iconSize: 36, x: 914, y: 641, align: "left" },
  { name: "Sumun Lobby", text: "Desde donde se accede al ecosistema digital de Sumun", icon: "i-lobby.svg", iconSize: 36, x: 491, y: 844, align: "left" },
];

// Anillos concéntricos: tamaño y centro dentro del contenedor.
const anillos = [
  { src: "e16.svg", size: 876, cx: 678, cy: 494 },
  { src: "e14.svg", size: 652, cx: 683, cy: 493 },
  { src: "e15.svg", size: 508, cx: 683, cy: 493 },
  { src: "ext-a.svg", size: 831.9, cx: 683, cy: 496, rotate: true },
  { src: "ext-b.svg", size: 788, cx: 683, cy: 496, rotate: true },
  { src: "int-a.svg", size: 379, cx: 683.5, cy: 493.5 },
  { src: "int-b.svg", size: 359, cx: 683.5, cy: 493.5 },
  { src: "e21.svg", size: 359, cx: 683.5, cy: 493.5 },
];

// Íconos flotando sobre los anillos.
const flotantes = [
  { src: "i-health.svg", w: 21.54, x: 512.5, y: 326, size: 41 },
  { src: "i-head.svg", w: 29.42, x: 762.5, y: 612.5, size: 56 },
  { src: "i-genetics.svg", w: 40.98, x: 401, y: 533, size: 78, rotate: -59.15 },
  { src: "i-chat.svg", w: 40.98, x: 805, y: 251, size: 78 },
];

export function CorazonDigitalSection() {
  return (
    <section className={styles.section} aria-labelledby="corazon-title">
      <h2 id="corazon-title" className={styles.title}>
        Corazón digital Sumun
      </h2>

      <div className={styles.stage}>
        <div className={styles.orbita} aria-hidden="true">
          {anillos.map((a) => (
            <img
              key={a.src}
              className={a.rotate ? `${styles.anillo} ${styles.anilloGira}` : styles.anillo}
              src={`${H}/${a.src}`}
              alt=""
              width={a.size}
              height={a.size}
              style={{ left: a.cx - a.size / 2, top: a.cy - a.size / 2 }}
            />
          ))}

          {flotantes.map((f) => (
            <span
              key={f.src}
              className={styles.flotante}
              style={{ left: f.x, top: f.y, width: f.size, height: f.size }}
            >
              <img src={`${H}/${f.src}`} alt="" width={f.w} height={f.w} style={f.rotate ? { rotate: `${f.rotate}deg` } : undefined} />
            </span>
          ))}

          <div className={styles.vidrio} data-parallax="slow">
            <Image src={`${H}/corazon-digital.jpg`} width={514} height={506} sizes="257px" alt="" />
          </div>
        </div>

        <ul className={styles.modulos}>
          {modulos.map((m) => (
            <li
              key={m.name}
              className={m.align === "right" ? `${styles.modulo} ${styles.moduloDerecha}` : styles.modulo}
              style={{ left: m.x, top: m.y, width: m.width }}
            >
              <span className={styles.icono} aria-hidden="true">
                <img src={`${H}/${m.icon}`} alt="" width={m.iconSize} height={m.iconSize} />
              </span>
              <div className={styles.moduloTexto}>
                <h3 className={styles.moduloTitle}>{m.name}</h3>
                <p className={styles.moduloText}>{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
