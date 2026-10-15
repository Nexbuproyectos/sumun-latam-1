import Image from "next/image";

import styles from "./asiSeVeHt.module.css";

// Exportadas de la instancia "Pestaña HIGHT TECH" (cada tarjeta superpone varias fotos recortadas).
const fotos = [
  { src: "/images/high-tech/foto-1.jpg", alt: "Estudiante sonriendo frente a su computadora" },
  { src: "/images/high-tech/foto-2.jpg", alt: "Docente con una carpeta en el aula" },
  { src: "/images/high-tech/foto-3.jpg", alt: "Madre e hijo revisando el celular juntos" },
  { src: "/images/high-tech/foto-4.jpg", alt: "Mujer riendo mientras usa una tablet" },
];

export function AsiSeVeHtSection() {
  return (
    <section className={styles.section} aria-labelledby="ht-asi-title">
      <h2 id="ht-asi-title" className={styles.title}>
        Así se ve High Tech de Sumun
      </h2>
      <ul className={styles.fotos}>
        {fotos.map((foto) => (
          <li key={foto.src} className={styles.foto}>
            <Image src={foto.src} width={560} height={1502} sizes="(min-width: 1200px) 280px, 50vw" alt={foto.alt} />
          </li>
        ))}
      </ul>
    </section>
  );
}
