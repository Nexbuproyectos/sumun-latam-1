import type { Metadata } from "next";

import { ComunidadSection } from "@/components/diagnostico/ComunidadSection";
import { DiagHero } from "@/components/diagnostico/DiagHero";
import { DiagVideoSection } from "@/components/diagnostico/DiagVideoSection";
import { EvolucionCarousel } from "@/components/diagnostico/EvolucionCarousel";
import { DIAGNOSTICO_URL } from "@/components/diagnostico/links";
import { MadurezSection } from "@/components/diagnostico/MadurezSection";
import { ReporteSection } from "@/components/diagnostico/ReporteSection";
import { CompromisoSection } from "@/components/home/CompromisoSection";
import { inter } from "@/components/masterclass/fonts";
import { PasosSection } from "@/components/masterclass/PasosSection";
import { PageTransition } from "@/components/motion/PageTransition";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Diagnóstico de madurez en IA | Sumun",
  description:
    "Conozcan el nivel de madurez en inteligencia artificial de su institución y reciban un reporte personalizado con recomendaciones.",
};

export default function Diagnostico() {
  return (
    <PageTransition>
      <main className={`relative flex-1 overflow-x-clip ${inter.variable}`}>
        <DiagHero />
        <PasosSection lead={null} ctaHref={DIAGNOSTICO_URL} compact />
        <ComunidadSection />
        <MadurezSection />
        <ReporteSection />
        <DiagVideoSection />
        <EvolucionCarousel />
        <CompromisoSection buttonLabel="Conoce Sumun" buttonHref="/identidad" className={styles.compromiso} alto />
      </main>
    </PageTransition>
  );
}
