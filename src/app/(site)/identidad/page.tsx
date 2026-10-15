import { EquipoSection } from "@/components/identidad/EquipoSection";
import { HeroSection } from "@/components/identidad/HeroSection";
import { NovedadesSection } from "@/components/identidad/NovedadesSection";
import { PropositoSection } from "@/components/identidad/PropositoSection";
import { ValoresSection } from "@/components/identidad/ValoresSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function Identidad() {
  return (
    <PageTransition>
      <main className="relative flex-1 overflow-x-clip">
        <HeroSection />
        <PropositoSection />
        <ValoresSection />
        <EquipoSection />
        <NovedadesSection />
      </main>
    </PageTransition>
  );
}
