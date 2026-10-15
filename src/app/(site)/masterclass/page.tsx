import type { Metadata } from "next";

import { CompromisoSection } from "@/components/home/CompromisoSection";
import { McHero } from "@/components/masterclass/McHero";
import { PasosSection } from "@/components/masterclass/PasosSection";
import { VideoSection } from "@/components/masterclass/VideoSection";
import { geist, inter, montserrat } from "@/components/masterclass/fonts";
import { PageTransition } from "@/components/motion/PageTransition";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Masterclass: Cómo incorporar IA en educación | Sumun",
  description:
    "Masterclass gratuita con Cristóbal Cobo sobre cómo incorporar IA en educación y cómo usar el diagnóstico de madurez en IA.",
};

export default function Masterclass() {
  return (
    <PageTransition>
      <main
        className={`relative flex-1 overflow-x-clip ${montserrat.variable} ${geist.variable} ${inter.variable}`}
      >
        <McHero />
        <VideoSection />
        <PasosSection />
        <CompromisoSection buttonLabel="Conoce Sumun" buttonHref="/identidad" className={styles.compromiso} alto />
      </main>
    </PageTransition>
  );
}
