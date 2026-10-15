import Link from "next/link";

import styles from "./footer.module.css";

const columnas = [
  {
    title: "Nosotros",
    links: [
      { label: "Nuestro equipo", href: "/#equipo" },
      { label: "Identidad", href: "/identidad" },
    ],
  },
  {
    title: "Conversaciones Sumun",
    links: [
      { label: "High tech", href: "/high-tech" },
      { label: "Inteligencia curricular", href: "/inteligencia-curricular" },
      { label: "Cultura de alto desepeño", href: "/cultura-de-alto-desempeno" },
    ],
  },
  {
    title: "Novedades",
    links: [
      { label: "Sumun Data Center", href: "#" },
      { label: "Sumun Home", href: "#" },
      { label: "Sumun Office", href: "#" },
    ],
  },
];

const legales = [
  { label: "Políticas de privacidad", href: "#" },
  { label: "Términos del servicio", href: "#" },
  { label: "Ajustes de cookies", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              className={styles.logo}
              src="/images/footer/logo-blanco@3x.png"
              alt="Sumun"
              width={150.04}
              height={46.77}
            />
            <p className={styles.tagline}>
              Lideramos la nueva revolución educativa con IA y datos.
            </p>
          </div>

          <nav className={styles.columns} aria-label="Pie de página">
            {columnas.map((columna) => (
              <div key={columna.title} className={styles.column}>
                <p className={styles.columnTitle}>{columna.title}</p>
                <ul className={styles.links}>
                  {columna.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <Link href="/tutor-ia" className={styles.tutor}>
            <span className={styles.tutorHead}>
              <span className={styles.tutorTitle}>
                Tutor IA
                <span className={styles.stars} aria-hidden="true">
                  <img
                    src="/images/footer/estrellas.svg"
                    alt=""
                    width={19.27}
                    height={20.11}
                  />
                </span>
              </span>
              <img
                src="/images/footer/abrir.svg"
                alt=""
                width={24}
                height={24}
              />
            </span>
            <span className={styles.tutorText}>
              Conoce cómo impulsamos la educación con inteligencia artificial.
            </span>
          </Link>
        </div>

        <div className={styles.bottom}>
          <div className={styles.credits}>
            <p>© 2025 Sumun. Todos los derechos reservados.</p>
            <ul className={styles.legal}>
              {legales.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <img
                src="/images/footer/instagram.svg"
                alt=""
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="YouTube">
              <img
                src="/images/footer/youtube.svg"
                alt=""
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
