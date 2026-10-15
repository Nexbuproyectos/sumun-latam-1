"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import styles from "./comunidad.module.css";
import { REGISTRAR_URL } from "./links";

type Icono = "cpu" | "trending" | "school" | "dashboard" | "shield";
type Beneficio = { icon: Icono; title: string; text: string };
type Rol = {
  id: string;
  label: string;
  // Recorte de la foto dentro de su caja (valores de Figma).
  photo: { src: string; box: string; img: string };
  beneficios: Beneficio[];
};

const ICON_COLORS: Record<Icono, string> = {
  cpu: "#0083af",
  trending: "#f15a2e",
  school: "#00afa5",
  dashboard: "#0095cd",
  shield: "#268e9e",
};

const CONFIDENCIAL: Beneficio = {
  icon: "shield",
  title: "Participamos de forma rápida y confidencial",
  text: "Nuestra participación es rápida y anónima, y suma a un diagnóstico representativo de toda la institución.",
};

/*
 * Solo "Administrativo" tiene textos en Figma (es la pestaña activa del diseño).
 * Los beneficios de los otros roles son PROVISORIOS: hay que reemplazarlos por los definitivos.
 */
const roles: Rol[] = [
  {
    id: "directivos",
    label: "Directivos",
    photo: { src: "/images/diagnostico/directiva.png", box: styles.fotoDirectivos, img: styles.imgDirectivos },
    beneficios: [
      { icon: "cpu", title: "Tomamos decisiones con evidencia", text: "Contamos con una lectura clara del nivel de madurez en IA para definir prioridades estratégicas." },
      { icon: "trending", title: "Proyectamos el crecimiento institucional", text: "Identificamos oportunidades para integrar la IA en el plan de desarrollo de la institución." },
      { icon: "school", title: "Alineamos a toda la comunidad", text: "Comprendemos cómo vive la IA cada rol y construimos una visión compartida." },
      { icon: "dashboard", title: "Priorizamos inversiones y recursos", text: "Orientamos la inversión en herramientas y formación hacia donde genera mayor impacto." },
      { icon: "shield", title: "Lideramos con criterio y seguridad", text: "Definimos lineamientos para un uso ético y responsable de la inteligencia artificial." },
    ],
  },
  {
    id: "estudiantes",
    label: "Estudiantes",
    photo: { src: "/images/diagnostico/estudiante.png", box: styles.fotoEstudiantes, img: styles.imgEstudiantes },
    beneficios: [
      { icon: "cpu", title: "Nuestra voz también cuenta", text: "Compartimos cómo usamos la IA para aprender dentro y fuera del aula." },
      { icon: "trending", title: "Aprendemos mejor", text: "Ayudamos a identificar dónde la IA puede potenciar nuestro aprendizaje." },
      { icon: "school", title: "Usamos la IA con responsabilidad", text: "Reflexionamos sobre el uso ético y seguro de las herramientas digitales." },
      { icon: "dashboard", title: "Mejoramos nuestra experiencia", text: "Contribuimos a priorizar herramientas y recursos que nos sirvan de verdad." },
      CONFIDENCIAL,
    ],
  },
  {
    id: "docentes",
    label: "Docentes",
    photo: { src: "/images/diagnostico/docente.png", box: styles.fotoDocentes, img: styles.imgDocentes },
    beneficios: [
      { icon: "cpu", title: "Visibilizamos nuestras prácticas", text: "Mostramos cómo la IA ya forma parte de la planificación, la enseñanza y la evaluación." },
      { icon: "trending", title: "Ganamos tiempo para enseñar", text: "Detectamos tareas que la IA puede simplificar para enfocarnos en los estudiantes." },
      { icon: "school", title: "Nuestra mirada pedagógica guía el diagnóstico", text: "Aportamos criterio sobre cuándo usar IA, cuándo no hacerlo y con qué propósito." },
      { icon: "dashboard", title: "Identificamos necesidades de formación", text: "Orientamos la capacitación hacia lo que realmente necesitamos en el aula." },
      CONFIDENCIAL,
    ],
  },
  {
    id: "familia",
    label: "Familia",
    photo: { src: "/images/diagnostico/familia.png", box: styles.fotoFamilia, img: styles.imgFamilia },
    beneficios: [
      { icon: "cpu", title: "Acompañamos el aprendizaje en casa", text: "Contamos cómo se usa la IA en el hogar y en las tareas escolares." },
      { icon: "trending", title: "Nos informamos y participamos", text: "Entendemos cómo la institución integra la inteligencia artificial en la formación." },
      { icon: "school", title: "Nuestra mirada completa el diagnóstico", text: "Aportamos la perspectiva del hogar: la madurez institucional involucra a toda la comunidad." },
      { icon: "dashboard", title: "Construimos confianza", text: "Conocemos los criterios de uso seguro y responsable de la IA en la institución." },
      CONFIDENCIAL,
    ],
  },
  {
    id: "administrativo",
    label: "Administrativo",
    photo: { src: "/images/diagnostico/administrativo.png", box: styles.fotoAdministrativo, img: styles.imgAdministrativo },
    beneficios: [
      { icon: "cpu", title: "Nuestro trabajo también impulsa la evolución", text: "Hacemos visible cómo la inteligencia artificial impacta los procesos administrativos, operativos y de gestión." },
      { icon: "trending", title: "Ganamos eficiencia en nuestro día a día", text: "Detectamos oportunidades de eficiencia sin perder el foco en el servicio a la comunidad." },
      { icon: "school", title: "Nuestra mirada completa el diagnóstico", text: "Aportamos una perspectiva esencial: la madurez institucional no es solo pedagógica." },
      { icon: "dashboard", title: "Mejoramos procesos y herramientas", text: "Contribuimos a priorizar mejoras en sistemas, flujos y herramientas del día a día." },
      CONFIDENCIAL,
    ],
  },
];

// "Un diagnóstico construido por toda la comunidad educativa" (1100:7861, 1100:7702, 1100:7902).
export function ComunidadSection() {
  // En Figma la pestaña activa es "Administrativo".
  const [activo, setActivo] = useState(roles.length - 1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const rol = roles[activo];

  // Flechas arriba/abajo (y Inicio/Fin) recorren las pestañas, como pide el patrón de tabs.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowDown: activo + 1,
      ArrowRight: activo + 1,
      ArrowUp: activo - 1,
      ArrowLeft: activo - 1,
      Home: 0,
      End: roles.length - 1,
    };
    if (!(event.key in keys)) {
      return;
    }
    event.preventDefault();
    const next = (keys[event.key] + roles.length) % roles.length;
    setActivo(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby="comunidad-title">
      <div className={styles.stage}>
        <div className={styles.header}>
          <h2 id="comunidad-title" className={styles.title}>
            Un diagnóstico construido por toda la comunidad educativa
          </h2>
          <p className={styles.lead}>
            Cada rol aporta información clave para comprender cómo se vive la inteligencia
            artificial en la institución y convertir esos datos en decisiones estratégicas que
            beneficien a todos.
          </p>
        </div>

        <div className={styles.grid}>
          <div
            className={styles.roles}
            role="tablist"
            aria-label="Roles de la comunidad educativa"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {roles.map((item, index) => {
              const selected = index === activo;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`rol-${item.id}`}
                  aria-selected={selected}
                  aria-controls="rol-panel"
                  tabIndex={selected ? 0 : -1}
                  className={selected ? `${styles.rol} ${styles.rolActivo}` : styles.rol}
                  onClick={() => setActivo(index)}
                >
                  <span className={`${styles.foto} ${item.photo.box}`} aria-hidden="true">
                    <img className={item.photo.img} src={item.photo.src} alt="" />
                  </span>
                  <span className={styles.rolLabel}>{item.label}</span>
                  <img
                    className={styles.flecha}
                    src="/images/diagnostico/flecha-rol.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <ul
            key={rol.id}
            id="rol-panel"
            className={styles.beneficios}
            role="tabpanel"
            aria-labelledby={`rol-${rol.id}`}
          >
            {rol.beneficios.map((beneficio) => (
              <li key={beneficio.title} className={styles.beneficio}>
                <span className={styles.badge} style={{ background: ICON_COLORS[beneficio.icon] }} aria-hidden="true">
                  <img src={`/images/diagnostico/ic-${beneficio.icon}.svg`} alt="" width={20} height={20} />
                </span>
                <span className={styles.beneficioText}>
                  <span className={styles.beneficioTitle}>{beneficio.title}</span>
                  <span className={styles.beneficioDesc}>{beneficio.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a href={REGISTRAR_URL} className={`btn ${styles.button}`}>
          Registrar institución
        </a>
      </div>

      {/* Onda de vidrio (1439 × 778, estirada como en Figma): pasa por encima del modelo de madurez. */}
      <div className={styles.onda} aria-hidden="true">
        <img src="/images/diagnostico/onda.png" alt="" />
      </div>
    </section>
  );
}
