"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./header.module.css";

type SubItem = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; items?: SubItem[] };

// Las secciones sin página propia llevan a su bloque del home (ancla).
const navItems: NavItem[] = [
  {
    label: "Visión del producto",
    href: "/vision-general",
    items: [
      { label: "Visión general", href: "/vision-general", description: "Nuestro sistema educativo" },
      { label: "High Tech", href: "/high-tech", description: "IA y datos al servicio del aprendizaje" },
      { label: "Inteligencia curricular", href: "/inteligencia-curricular", description: "Micro y macrohabilidades" },
      { label: "Cultura de alto desempeño", href: "/cultura-de-alto-desempeno", description: "Mucho más que solo ambiente" },
    ],
  },
  {
    label: "Conversaciones Sumun",
    href: "/conversaciones-sumun",
    items: [
      { label: "Conversaciones Sumun", href: "/conversaciones-sumun", description: "Voces que inspiran nuevos caminos" },
      { label: "Serie documental", href: "/#serie", description: "La génesis de Sumun" },
    ],
  },
  {
    label: "Nosotros",
    href: "/identidad",
    items: [
      { label: "Identidad", href: "/identidad", description: "Propósito y valores de Sumun" },
      { label: "Impacto social", href: "/impacto-social", description: "Nuestro compromiso con la comunidad" },
      { label: "Nuestro equipo", href: "/#equipo", description: "Ellos lo hacen posible" },
      { label: "Nuestros aliados", href: "/#aliados" },
    ],
  },
  {
    label: "Recursos",
    href: "/tutor-ia",
    items: [
      { label: "Tutor IA", href: "/tutor-ia", description: "Aprendizaje personalizado 24/7" },
      { label: "Diagnóstico IA", href: "/diagnostico", description: "Madurez en IA de su institución" },
      { label: "Masterclass", href: "/masterclass", description: "Cómo incorporar IA en educación" },
    ],
  },
  { label: "Noticias", href: "/#novedades" },
];

// Páginas con hero oscuro: el header va en una píldora blanca (variante de Figma).
const PILL_ROUTES = [
  "/vision-general",
  "/inteligencia-curricular",
  "/cultura-de-alto-desempeno",
  "/high-tech",
  // Vistas de la rama vistas-yohan que en Figma llevan el header como píldora blanca.
  "/tutor-ia",
  "/conversaciones-sumun",
  "/impacto-social",
  "/masterclass",
  "/congreso",
];

// Todas las páginas del menú (sin anclas ni duplicados), para precargarlas.
const PREFETCH_ROUTES = Array.from(
  new Set(
    navItems
      .flatMap((item) => [item.href, ...(item.items ?? []).map((sub) => sub.href)])
      .map((href) => href.split("#")[0] || "/"),
  ),
);

function isActive(item: NavItem, pathname: string) {
  return item.items ? item.items.some((sub) => sub.href === pathname) : item.href === pathname;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  /*
   * Precarga todas las páginas del menú cuando el navegador queda libre.
   * Next solo precarga los <Link> visibles, y los del desplegable están ocultos: sin esto,
   * la primera navegación esperaba la descarga y la View Transition se saltaba o arrancaba tarde.
   */
  useEffect(() => {
    const prefetchAll = () => PREFETCH_ROUTES.forEach((href) => router.prefetch(href));
    // Safari no tiene requestIdleCallback: ahí se usa un timeout.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetchAll, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetchAll, 1200);
    return () => clearTimeout(timer);
  }, [router]);
  const pill = PILL_ROUTES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);

  // Al bajar, el header queda fijo y pasa a una píldora de vidrio compacta.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cambiar de página se cierran los menús (ajuste de estado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
    setOpen(false);
  }

  // Escape cierra todo; el panel mobile también se cierra si la pantalla vuelve a ser ancha.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1101px)");
    const closeAll = () => {
      setOpen(false);
      setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", onKey);
    media.addEventListener("change", closeAll);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", closeAll);
    };
  }, []);

  // Pequeña demora al cerrar para que el mouse pueda pasar del link al panel.
  const openMenu = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };

  return (
    <header
      className={scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className={pill || scrolled ? `${styles.bar} ${styles.barPill}` : styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label="Sumun, inicio">
          {/* Logo de Figma remuestreado a su proporción final (99 × 30.4) a 3x para que se vea nítido. */}
          <img
            className={styles.logo}
            src="/images/header/logo@3x.png"
            alt="Sumun"
            width={99.01}
            height={30.36}
          />
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          {navItems.map((item) => {
            const active = isActive(item, pathname);
            const linkClass = active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

            if (!item.items) {
              return (
                <Link key={item.label} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              );
            }

            const expanded = menu === item.label;
            const panelId = `submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

            return (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(item.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    scheduleClose();
                  }
                }}
              >
                <button
                  type="button"
                  className={linkClass}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setMenu(expanded ? null : item.label)}
                >
                  {item.label}
                  <img
                    className={expanded ? styles.chevronOpen : undefined}
                    src="/images/header/chevron-down.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>

                <div id={panelId} className={expanded ? `${styles.dropdown} ${styles.dropdownOpen}` : styles.dropdown}>
                  <ul className={styles.dropdownList}>
                    {item.items.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className={sub.href === pathname ? `${styles.dropdownLink} ${styles.dropdownLinkActive}` : styles.dropdownLink}
                          tabIndex={expanded ? 0 : -1}
                          onClick={() => setMenu(null)}
                        >
                          <span className={styles.dropdownLabel}>{sub.label}</span>
                          {sub.description ? (
                            <span className={styles.dropdownDesc}>{sub.description}</span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <Link href="/tutor-ia" className={`btn ${styles.demo}`}>
          Demo IA
          <img src="/images/header/ai.svg" alt="" width={24} height={24} />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={open ? styles.burgerOpen : styles.burger} />
        </button>
      </div>

      <div
        id="menu-mobile"
        className={open ? styles.panelOpen : styles.panel}
        hidden={!open}
      >
        <nav aria-label="Principal (mobile)" className={styles.panelNav}>
          {navItems.map((item) => {
            if (!item.items) {
              return (
                <Link key={item.label} href={item.href} className={styles.panelLink} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              );
            }

            const expanded = mobileSub === item.label;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  className={styles.panelLink}
                  aria-expanded={expanded}
                  onClick={() => setMobileSub(expanded ? null : item.label)}
                >
                  {item.label}
                  <img
                    className={expanded ? styles.chevronOpen : undefined}
                    src="/images/header/chevron-down.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
                <ul className={expanded ? `${styles.panelSub} ${styles.panelSubOpen}` : styles.panelSub} hidden={!expanded}>
                  {item.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className={sub.href === pathname ? `${styles.panelSubLink} ${styles.dropdownLinkActive}` : styles.panelSubLink}
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
        <Link href="/tutor-ia" className={`btn ${styles.panelDemo}`} onClick={() => setOpen(false)}>
          Demo IA
          <img src="/images/header/ai.svg" alt="" width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}
