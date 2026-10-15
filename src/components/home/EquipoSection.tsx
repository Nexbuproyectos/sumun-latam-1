import Image from "next/image";

import styles from "./equipo.module.css";

type Integrante = {
  name: string;
  country: string;
  role: string;
  photo: {
    src: string;
    width: number;
    height: number;
    // Posición y tamaño de la foto dentro del recuadro de 181 × 286 (valores de Figma).
    box: React.CSSProperties;
  };
};

const equipo: Integrante[] = [
  {
    name: "Ahana Datta",
    country: "India",
    role: "Directora Global de Innovación Digital y Analítica",
    photo: {
      src: "/images/equipo/ahana-datta.png",
      width: 486,
      height: 591,
      box: { top: -33, left: -23.87, width: 282.06, height: 343 },
    },
  },
  {
    name: "Ernesto Núñez",
    country: "México",
    role: "Director Global de Producto e Investigación",
    photo: {
      src: "/images/equipo/ernesto-nunez.png",
      width: 800,
      height: 800,
      // Recorte de Figma: caja 349 × 262 en (-85.71, 24) con la imagen al 133.04% de alto, desplazada -4.46%.
      box: {
        top: 12.31,
        left: -85.71,
        width: 348.58,
        height: 348.56,
        clipPath: "inset(11.69px 0 0 0)",
      },
    },
  },
  {
    name: "Víctor Lomba",
    country: "España",
    role: "Director del Proyecto Sumun",
    photo: {
      src: "/images/equipo/victor-lomba.png",
      width: 1055,
      height: 1280,
      box: { top: 0, left: -139.19, width: 427.77, height: 519 },
    },
  },
  {
    name: "Andrés Guerrero",
    country: "Colombia",
    role: "Director Global de Coaching y Consultoría Académica",
    photo: {
      src: "/images/equipo/andres-guerrero.png",
      width: 4096,
      height: 2731,
      box: { top: -26, left: -284.29, width: 724.41, height: 483 },
    },
  },
  {
    name: "José Málaga",
    country: "España",
    role: "Director Global de Tecnología",
    photo: {
      src: "/images/equipo/jose-malaga.png",
      width: 4096,
      height: 2731,
      box: { top: 0, left: -204.39, width: 557.93, height: 372 },
    },
  },
  {
    name: "Andrea Muñoz",
    country: "Colombia",
    role: "Directora Global de Marketing",
    photo: {
      src: "/images/equipo/andrea-munoz.png",
      width: 4096,
      height: 2730,
      box: { top: 0, left: -188.48, width: 535.63, height: 357 },
    },
  },
  {
    name: "Milan Sahu",
    country: "India",
    role: "Heading Strategic Initiatives",
    photo: {
      src: "/images/equipo/milan-sahu.png",
      width: 1685,
      height: 1421,
      box: { top: 0, left: -133.78, width: 449.41, height: 379 },
    },
  },
];

export function EquipoSection() {
  return (
    <section id="equipo" className={styles.section} aria-labelledby="equipo-title">
      <div className={styles.stage}>
        <div className={`${styles.decor} ${styles.decorTop}`} aria-hidden="true" data-parallax="slow">
          <img loading="lazy" decoding="async" src="/images/banner/decorativo-3d.webp" alt="" />
        </div>
        <div className={`${styles.decor} ${styles.decorBottom}`} aria-hidden="true" data-parallax="fast">
          <img loading="lazy" decoding="async" src="/images/banner/decorativo-3d.webp" alt="" />
        </div>

        <div className={styles.content}>
          <div className={styles.intro}>
            <h2 id="equipo-title" className={styles.title}>
              Ellos lo hacen <span className={styles.accent}>posible</span>
            </h2>
            <p className={styles.lead}>
              Un equipo diverso y multidisciplinario de arquitectos de una
              revolución silenciosa que combina la IA, la ciencia de datos y el
              desarrollo de habilidades para responder a las necesidades
              singulares de cada estudiante
            </p>
          </div>

          <ul className={styles.cards}>
            {equipo.map((persona) => (
              <li key={persona.name} className={styles.card}>
                <div className={styles.photo}>
                  <Image
                    src={persona.photo.src}
                    width={persona.photo.width}
                    height={persona.photo.height}
                    sizes="760px"
                    alt={persona.name}
                    style={persona.photo.box}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{persona.name}</p>
                  <p className={styles.country}>{persona.country}</p>
                  <p className={styles.role}>{persona.role}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.closing}>
            No seguimos el futuro, lo construimos. Y esto, apenas comienza.
          </p>
        </div>
      </div>
    </section>
  );
}
