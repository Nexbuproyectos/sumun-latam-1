"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { DIAGNOSTICO_URL } from "./links";
import styles from "./reporte.module.css";

const funciones = [
  {
    title: "Diagnóstico de IA institucional",
    text: "Aplique un diagnóstico inteligente a todos los miembros de su institución según su rol.",
    width: 425,
  },
  {
    title: "Métricas en tiempo real",
    text: "Visualice el avance del diagnóstico por rol y los resultados a medida que se completan.",
    width: 492,
  },
  {
    title: "Recursos de madurez institucional",
    text: "Acceda a recursos y planes de acción personalizados para fortalecer la madurez en IA de su institución.",
    width: 486,
  },
];

// Enlace de ejemplo del mockup (Figma): cada institución tendrá el suyo.
const ENLACE = "sumun.io/diagnostico/abc123";

const invitados = [
  { rol: "Directivos", src: "/images/diagnostico/directiva.png", className: styles.invDirectivos },
  { rol: "Docentes", src: "/images/diagnostico/docente.png", className: styles.invDocentes },
  { rol: "Estudiante", src: "/images/diagnostico/estudiante.png", className: styles.invEstudiante },
  { rol: "Familia", src: "/images/diagnostico/familia.png", className: styles.invFamilia },
  { rol: "Administrativo", src: "/images/diagnostico/administrativo.png", className: styles.invAdministrativo },
];

// "Reciba su reporte…" (1100:7620): funciones a la izquierda y el mockup del producto a la derecha.
export function ReporteSection() {
  const [activa, setActiva] = useState(0);
  const [copiado, setCopiado] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copiar(rol: string) {
    try {
      await navigator.clipboard.writeText(`https://${ENLACE}`);
    } catch {
      // Sin permiso de portapapeles igual se muestra la confirmación: es un mockup.
    }
    setCopiado(rol);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopiado(null), 1600);
  }

  return (
    <section className={styles.section} aria-labelledby="reporte-title">
      <div className={styles.stage}>
        <div className={styles.copy}>
          <h2 id="reporte-title" className={styles.title}>
            Reciba su reporte y lleve a su institución al siguiente nivel de madurez en IA.
          </h2>

          <ul className={styles.funciones}>
            {funciones.map((funcion, index) => (
              <li key={funcion.title}>
                <button
                  type="button"
                  className={index === activa ? `${styles.funcion} ${styles.funcionActiva}` : styles.funcion}
                  aria-current={index === activa ? "true" : undefined}
                  onMouseEnter={() => setActiva(index)}
                  onFocus={() => setActiva(index)}
                  onClick={() => setActiva(index)}
                >
                  <span className={styles.flecha} aria-hidden="true">
                    <img src="/images/diagnostico/flecha-diagonal.svg" alt="" width={61} height={61} />
                  </span>
                  <span className={styles.funcionText}>
                    <span className={styles.funcionTitle}>{funcion.title}</span>
                    <span className={styles.funcionDesc} style={{ maxWidth: funcion.width }}>
                      {funcion.text}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <a href={DIAGNOSTICO_URL} className={`btn ${styles.button}`}>
            Comenzar diagnóstico
          </a>
        </div>

        {/* Mockup "Diagnóstico de IA institucional": 790 × 847, recortado. */}
        <div className={styles.mockup}>
          <img className={styles.brillo} src="/images/diagnostico/elipse-303.svg" alt="" aria-hidden="true" />
          <div className={styles.ipads} aria-hidden="true" data-parallax="slow">
            <Image
              src="/images/diagnostico/ipads.png"
              width={4000}
              height={3000}
              sizes="1047px"
              alt=""
            />
          </div>
          <div className={styles.fundido} aria-hidden="true" />

          <div className={styles.tarjeta}>
            <div className={styles.tarjetaHeader}>
              <p className={styles.tarjetaTitle}>Sume perspectivas, construya una visión completa</p>
              <p className={styles.tarjetaDesc}>
                Invite a cada actor de su comunidad educativa a completar el diagnóstico. Cuantas
                más voces se integren, más objetiva será la visión de su institución.
              </p>
            </div>
            <ul className={styles.invitados}>
              {invitados.map((invitado) => (
                <li key={invitado.rol} className={`${styles.invitado} ${invitado.className}`}>
                  <span className={styles.invFoto} aria-hidden="true">
                    <img src={invitado.src} alt="" />
                  </span>
                  <span className={styles.invInfo}>
                    <span className={styles.invRol}>{invitado.rol}</span>
                    <span className={styles.enlace}>
                      <span className={styles.enlaceUrl}>{ENLACE}</span>
                      <button
                        type="button"
                        className={styles.copiar}
                        aria-label={`Copiar enlace para ${invitado.rol}`}
                        onClick={() => copiar(invitado.rol)}
                      >
                        <img src="/images/diagnostico/ic-copiar.svg" alt="" width={6.193} height={6.193} />
                        <span aria-live="polite">{copiado === invitado.rol ? "¡Copiado!" : "Copiar enlace"}</span>
                      </button>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
