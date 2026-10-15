import styles from "./pilaresMockups.module.css";

const P = "/images/pilares";

// Puntos del escaneo (x, y, variante de color) dentro del recorte de 248 × 234.
const puntos: [number, number, "a" | "b" | "c"][] = [
  [54.57, 198, "a"], [76.57, 207, "b"], [69.57, 216, "c"], [62.57, 224, "b"],
  [77.57, 233, "c"], [54.57, 241, "c"], [69.57, 250, "a"], [115.57, 251, "c"],
  [131.57, 241, "c"], [108.57, 234, "b"], [169.57, 243, "b"], [192.57, 233, "a"],
  [176.57, 224, "b"], [162.57, 217, "a"], [183.57, 207, "c"], [169.57, 200, "c"],
  [115.57, 224, "a"], [130.57, 216, "c"], [123.57, 207, "c"], [116.57, 198, "c"],
  [76.57, 259, "a"],
];

// Los mismos puntos en el reflejo (desplazados -239.56 en y, sin los de la fila inferior).
const puntosReflejo: [number, number, "a" | "b" | "c"][] = [
  [54.57, -41.56, "a"], [76.57, -32.56, "b"], [69.57, -23.56, "c"], [62.57, -15.56, "b"],
  [77.57, -6.56, "c"], [192.57, -6.56, "a"], [176.57, -15.56, "b"], [162.57, -22.56, "a"],
  [183.57, -32.56, "c"], [169.57, -39.56, "c"], [115.57, -15.56, "a"], [130.57, -23.56, "c"],
  [123.57, -32.56, "c"], [116.57, -41.56, "c"],
];

function Punto({ x, y, v }: { x: number; y: number; v: "a" | "b" | "c" }) {
  return (
    <img
      className={styles.punto}
      src={`${P}/punto-${v}.svg`}
      alt=""
      width={7}
      height={7}
      style={{ left: x, top: y }}
    />
  );
}

/* High Tech: escáner de evaluaciones (507 × 602). */
export function HighTechMockup() {
  return (
    <div className={styles.highTech} aria-hidden="true">
      <div className={styles.htPhone} />
      <div className={styles.htNotch} />
      <p className={styles.htLabel}>Escaner de evalucaciones</p>

      <div className={styles.scan}>
        <div className={styles.scanImage}>
          <img src={`${P}/escaneo.jpg`} alt="" width={443} height={702} />
          <span className={styles.scanGlow} />
        </div>
        {puntos.map(([x, y, v], i) => (
          <Punto key={i} x={x} y={y} v={v} />
        ))}
      </div>

      <div className={styles.scanReflejo}>
        <div className={styles.scanReflejoImage}>
          <img src={`${P}/escaneo-reflejo.png`} alt="" width={443} height={702} />
        </div>
        {puntosReflejo.map(([x, y, v], i) => (
          <Punto key={i} x={x} y={y} v={v} />
        ))}
      </div>

      <img className={styles.lineas} src={`${P}/lineas-escaner.svg`} alt="" width={409.2} height={123.481} />
      <div className={styles.htBlanco} />
      <img className={styles.botonEscaner} src={`${P}/boton-escaner.svg`} alt="" width={114.839} height={113.839} />
      <div className={styles.htFade} />

      <div className={styles.stats}>
        <span className={styles.statNum} style={{ left: 246, top: 34.5 }}>21</span>
        <span className={styles.statLabel} style={{ left: 225.5, top: 44.86 }}>Correctas</span>
        <span className={styles.statNum} style={{ left: 246, top: 79.5 }}>0</span>
        <span className={styles.statLabel} style={{ left: 225.5, top: 88.86 }}>Icompletas</span>
        <span className={styles.statNum} style={{ left: 331, top: 35.5 }}>9</span>
        <span className={styles.statLabel} style={{ left: 309, top: 44.86 }}>Incorrectas</span>
        <span className={styles.statNum} style={{ left: 331, top: 79.5 }}>2</span>
        <span className={styles.statLabel} style={{ left: 310, top: 88.86 }}>Ilegible</span>
        <img className={styles.statIcon} style={{ left: 234.5, top: 35.5 }} src={`${P}/icon-check.svg`} alt="" width={13.8125} height={13.8125} />
        <img className={styles.statIcon} style={{ left: 234.5, top: 80.5 }} src={`${P}/icon-attention.svg`} alt="" width={15.5833} height={15.5833} />
        <img className={styles.statIcon} style={{ left: 317.5, top: 80.5 }} src={`${P}/icon-caution.svg`} alt="" width={17} height={14.875} />
        <img className={styles.statIcon} style={{ left: 319, top: 35.5 }} src={`${P}/icon-x.svg`} alt="" width={13.8125} height={13.8125} />
      </div>

      <img className={styles.anilloResultado} src={`${P}/anillo-resultado.svg`} alt="" width={241.452} height={241.452} />
      <div className={styles.anilloBorde}>
        <img src={`${P}/anillo-resultado-borde.svg`} alt="" width={237.624} height={225.328} />
      </div>
      <div className={styles.resultado}>
        <span className={styles.resultadoNum}>75%</span>
        <span className={styles.resultadoLabel}>Resultado</span>
      </div>
    </div>
  );
}

const materias = [
  { pct: "90%", name: "Ciencias Naturales", top: -9, textLeft: 74, tile: styles.tileBook, icon: "icon-book.svg", w: 31.5471, h: 31.5471, iconStyle: { left: 21.81, top: 25.39 } },
  { pct: "80%", name: "Ciencias sociales", top: 79, textLeft: 77, tile: styles.tileAtom, icon: "icon-atom.svg", w: 26.1156, h: 26.1167, iconStyle: { left: 25.02, top: 28.41 } },
  { pct: "78%", name: "Matemáticas", top: 167, textLeft: 83, tile: styles.tileMath, icon: "icon-math.svg", w: 29.5683, h: 29.5683, iconStyle: { left: 23.16, top: 24.96 } },
];

/* Inteligencia curricular: perfil del estudiante (472 × 561). */
export function CurricularMockup() {
  return (
    <div className={styles.curricular} aria-hidden="true">
      <div className={styles.icPhone} />
      <div className={styles.icNotch} />
      <p className={styles.icName}>Jazmín Gonzaléz</p>
      <p className={styles.icId}>ID 531-345</p>
      <div className={styles.icFadeTop} />

      <div className={styles.avatar}>
        <img src={`${P}/estudiante.jpg`} alt="" width={112.737} height={112.737} />
      </div>

      <div className={styles.icTabs}>
        <span style={{ left: 0 }}>Progresos</span>
        <span style={{ left: 73.66 }}>Resumen</span>
        <span style={{ left: 142.66 }}>Notas</span>
      </div>

      <div className={styles.anilloAsistencia}>
        <img src={`${P}/anillo-asistencia.png`} alt="" width={331.237} height={313.699} />
      </div>
      <div className={styles.sombraAsistencia} />
      <div className={styles.asistencia}>
        <span className={styles.asistenciaNum}>35/45</span>
        <span className={styles.asistenciaLabel}>Asistencia</span>
      </div>

      <div className={styles.materias}>
        {materias.map((m) => (
          <div key={m.name} className={styles.materia} style={{ top: m.top }}>
            <span className={styles.materiaPct} style={{ left: m.textLeft }}>{m.pct}</span>
            <span className={styles.materiaName} style={{ left: m.textLeft }}>{m.name}</span>
            <span className={`${styles.tile} ${m.tile}`} />
            <img className={styles.materiaIcon} style={m.iconStyle} src={`${P}/${m.icon}`} alt="" width={m.w} height={m.h} />
          </div>
        ))}
      </div>

      <div className={styles.icFadeBottom} />
    </div>
  );
}
