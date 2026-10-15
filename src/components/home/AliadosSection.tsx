import styles from "./aliados.module.css";

const H = "/images/home-extra";

const aliados = [
  { name: "ISTE", src: "aliado-iste.png", width: 110, height: 45.048 },
  { name: "UNESCO", src: "aliado-unesco.png", width: 207, height: 44.766 },
  { name: "AWS", src: "aliado-aws.png", width: 74, height: 44 },
  { name: "oneclick", src: "aliado-oneclick.png", width: 223, height: 45 },
];

export function AliadosSection() {
  return (
    <section id="aliados" className={styles.section} aria-labelledby="aliados-title">
      <h2 id="aliados-title" className={styles.title}>
        Nuestros aliados
      </h2>
      <ul className={styles.logos}>
        {aliados.map((a) => (
          <li key={a.name}>
            <img loading="lazy" decoding="async" src={`${H}/${a.src}`} alt={a.name} width={a.width} height={a.height} />
          </li>
        ))}
      </ul>
    </section>
  );
}
