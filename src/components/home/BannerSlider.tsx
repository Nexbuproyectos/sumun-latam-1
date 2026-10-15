"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

import type { BannerSlide } from "@/sanity/lib/banner";

import styles from "./banner.module.css";

const titleComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <h1 className={styles.heading}>{children}</h1>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

const textComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.text}>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

const MASK_URL = "/images/banner/anillo-frente-mask.svg";

export function BannerSlider({ slides }: { slides: BannerSlide[] }) {
  const count = slides.length;
  const multi = count > 1;
  const startX = useRef(0);
  const moved = useRef(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const slide = slides[index] ?? slides[0];
  const stageRef = useRef<HTMLDivElement>(null);
  // Las capas del visual (anillo, niño, vidrio) aparecen juntas cuando todas cargaron, no a pedazos.
  const [layersReady, setLayersReady] = useState(false);

  // Se piden con prioridad alta desde el <head>, antes de que el navegador llegue al <img>.
  const first = slides[0];
  if (first) {
    preload(first.imageUrl, { as: "image", fetchPriority: "high" });
    if (first.backgroundUrl) {
      preload(first.backgroundUrl, { as: "image", fetchPriority: "high" });
    }
  }
  preload("/images/banner/anillo-frente.webp", { as: "image", fetchPriority: "high" });
  // La máscara CSS del anillo delantero se pide en modo CORS: el preload tiene que coincidir.
  preload(MASK_URL, { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });

  useEffect(() => {
    const root = stageRef.current;
    if (!root) {
      return;
    }
    let cancelled = false;
    // decode() espera a que la imagen esté descargada y lista para pintarse de una sola vez.
    const layers = Array.from(root.querySelectorAll<HTMLImageElement>("img[data-layer]"));
    // También la máscara: si el anillo llega antes que ella, se ve un instante sin recortar.
    const mask = new Image();
    mask.crossOrigin = "anonymous";
    mask.src = MASK_URL;
    Promise.all([...layers, mask].map((img) => img.decode().catch(() => undefined))).then(() => {
      if (!cancelled) {
        setLayersReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!multi || paused || dragging) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [count, multi, paused, dragging]);

  function onPointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!multi || (event.target as HTMLElement).closest("a, button")) {
      return;
    }

    moved.current = false;
    startX.current = event.clientX;
    setDragging(true);
    setPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!dragging) {
      return;
    }

    if (Math.abs(event.clientX - startX.current) > 6) {
      moved.current = true;
    }
  }

  function onPointerUp(event: React.PointerEvent<HTMLElement>) {
    if (!dragging) {
      return;
    }

    const delta = event.clientX - startX.current;
    setDragging(false);
    setPaused(false);

    if (delta <= -60) {
      setIndex((current) => (current + 1) % count);
    } else if (delta >= 60) {
      setIndex((current) => (current - 1 + count) % count);
    }
  }

  if (!slide) {
    return null;
  }

  return (
    <section
      className={layersReady ? styles.section : `${styles.section} ${styles.layersPending}`}
      data-img-group
      aria-roledescription="carrusel"
      aria-label="Banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className={dragging ? styles.bannerDragging : styles.banner}>
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.decorClip} aria-hidden="true">
            <div className={`${styles.decor} ${styles.decorA}`}>
              <img src="/images/banner/decorativo-3d.webp" alt="" draggable={false} data-layer />
            </div>
            <div className={`${styles.decor} ${styles.decorB}`}>
              <img src="/images/banner/decorativo-3d.webp" alt="" draggable={false} data-layer />
            </div>
          </div>

          <div key={slide.id} className={styles.visual}>
            {slide.backgroundUrl ? (
              <div className={styles.fondo} aria-hidden="true">
                <img src={slide.backgroundUrl} alt="" draggable={false} fetchPriority="high" data-layer />
              </div>
            ) : null}
            <div className={styles.objetoBox}>
              <img
                className={styles.objeto}
                src={slide.imageUrl}
                alt={slide.imageAlt}
                draggable={false}
                fetchPriority="high"
                data-layer
              />
            </div>
            <div className={styles.visualFade} />
            <img className={`${styles.dotCyan} ${styles.dotCyanA}`} src="/images/banner/punto.svg" alt="" />
            <img className={`${styles.dotCyan} ${styles.dotCyanB}`} src="/images/banner/punto.svg" alt="" />
            <img className={`${styles.dotCyan} ${styles.dotCyanC}`} src="/images/banner/punto.svg" alt="" />
          </div>

          {/* Tramo delantero del anillo: pasa por delante del niño y tapa el corte inferior (Mask group en Figma). */}
          <div className={styles.anilloFrente} aria-hidden="true">
            <img src="/images/banner/anillo-frente.webp" alt="" draggable={false} fetchPriority="high" data-layer />
          </div>

          <img className={`${styles.dotCyan} ${styles.dotCyanD}`} src="/images/banner/punto.svg" alt="" />
          <img className={`${styles.dotCyan} ${styles.dotCyanE}`} src="/images/banner/punto.svg" alt="" />
          <img className={`${styles.dotCyan} ${styles.dotCyanF}`} src="/images/banner/punto.svg" alt="" />

          <div key={`${slide.id}-copy`} className={styles.copy}>
            <div className={styles.stack}>
              <PortableText value={slide.title} components={titleComponents} />
              <PortableText value={slide.text} components={textComponents} />
            </div>
            <a
              className={styles.button}
              href={slide.buttonHref}
              onClick={(event) => {
                if (moved.current) {
                  event.preventDefault();
                }
              }}
            >
              {slide.buttonLabel}
            </a>
          </div>

          {multi ? (
            <div className={styles.dots} role="tablist" aria-label="Slides">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className={itemIndex === index ? styles.dotActive : styles.dot}
                  aria-label={`Slide ${itemIndex + 1}`}
                  aria-selected={itemIndex === index}
                  onClick={() => setIndex(itemIndex)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dotActive} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
