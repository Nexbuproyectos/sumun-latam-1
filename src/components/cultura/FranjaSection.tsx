import Image from "next/image";
import type { CSSProperties } from "react";

import styles from "./franja.module.css";

const C = "/images/cultura";

type Burbuja = {
  x: number;
  y: number;
  size: number;
  inner: number;
  blur?: number;
  src: string;
  img: CSSProperties;
  aro?: string;
};

// Fotos en círculo flotando sobre la onda (posiciones del frame de Figma, relativas a la franja).
const burbujas: Burbuja[] = [
  { x: 46, y: 77, size: 79, inner: 70.222, blur: 2.508, src: "c-maestro.jpg", img: { left: -29.26, top: 0, width: 105.51, height: 70.22 } },
  { x: 204, y: 277, size: 115, inner: 102.222, src: "c-alumnos.jpg", img: { left: -32.37, top: 0, width: 166.35, height: 102.22 } },
  { x: 1278, y: 252, size: 137, inner: 121.778, blur: 1, src: "c-ninos.jpg", img: { left: -30.64 + 183.045 * 0.1384, top: -0.12 - 122 * 0.0612, width: 183.045 * 0.7084, height: 122 * 1.5941 } },
  { x: 1278, y: 73, size: 62, inner: 55.111, blur: 2.2, src: "c-familia.jpg", img: { left: -9.67, top: 0.33, width: 82.49, height: 55 }, aro: "c-aro-a.svg" },
  { x: 1067, y: 432, size: 109, inner: 96.889, src: "c-implante.png", img: { left: -13.47 - 145.964 * 0.0106, top: -0.23 - 97.321 * 0.103, width: 145.964 * 1.1148, height: 97.321 * 1.1487 } },
  { x: 322, y: 441, size: 58, inner: 51.556, blur: 2, src: "c-tablet.jpg", img: { left: 0, top: 0, width: 77.32, height: 51.56 }, aro: "c-aro-b.svg" },
];

const iconos = [
  { x: 1176, y: 166, size: 86, bg: true, src: "i-global.svg", w: 54.5974, h: 53.2948, offset: "0.64px 0.64px" },
  { x: 1202, y: 373, size: 50, src: "i-tablet.svg", w: 16.8611, h: 21.0764, offset: "0.37px 0.37px", sombra: true },
  { x: 192, y: 174, size: 53, bg: true, blur: 1.293, src: "i-math.svg", w: 28.2951, h: 28.2951, offset: "-0.72px 0.78px" },
  { x: 65, y: 289, size: 79, src: "i-stars.svg", w: 42.1757, h: 42.1757, offset: "-1.07px 0.77px" },
];

export function FranjaSection() {
  return (
    <section className={styles.section} aria-label="Cultura escolar">
      <div className={styles.fondo} aria-hidden="true">
        <Image src={`${C}/franja-fondo.jpg`} width={1380} height={921} sizes="100vw" alt="" />
      </div>
      <div className={styles.onda} aria-hidden="true">
        <Image src={`${C}/franja-onda.jpg`} width={1439} height={655} sizes="100vw" alt="" />
      </div>
      <span className={styles.fadeTop} aria-hidden="true" />

      <div className={styles.stage}>
        <p className={styles.frase}>
          La escuela no solo transmite saberes, sino que también propicia formas
          de estar juntos, de hablar, de mirar, de escuchar y de escribir.
        </p>

        {burbujas.map((b) => (
          <span
            key={b.src}
            className={styles.burbuja}
            style={{ left: b.x, top: b.y, width: b.size, height: b.size, filter: b.blur ? `blur(${b.blur}px)` : undefined }}
            aria-hidden="true"
          >
            <span className={styles.burbujaFoto} style={{ width: b.inner, height: b.inner }}>
              <img src={`${C}/${b.src}`} alt="" style={b.img} />
            </span>
            {b.aro ? <img className={styles.aro} src={`${C}/${b.aro}`} alt="" width={b.size} height={b.size} /> : null}
          </span>
        ))}

        {iconos.map((i) => (
          <span
            key={i.src}
            className={i.bg ? `${styles.icono} ${styles.iconoFondo}` : styles.icono}
            style={{ left: i.x, top: i.y, width: i.size, height: i.size, filter: i.blur ? `blur(${i.blur}px)` : undefined }}
            aria-hidden="true"
          >
            <img
              src={`${C}/${i.src}`}
              alt=""
              width={i.w}
              height={i.h}
              style={{ translate: i.offset, filter: i.sombra ? "drop-shadow(0 0 2.77px rgba(0,0,0,0.25))" : undefined }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
