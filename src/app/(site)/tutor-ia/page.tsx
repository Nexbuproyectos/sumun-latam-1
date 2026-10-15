import { HeroSection } from "@/components/tutor-ia/HeroSection";
import { ImpulsandoSection } from "@/components/tutor-ia/ImpulsandoSection";
import { PreguntasSection } from "@/components/tutor-ia/PreguntasSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function TutorIA() {
  return (
    <PageTransition>
      <main className="relative flex-1 overflow-x-clip">
        <HeroSection />
        <PreguntasSection />
        <ImpulsandoSection />
      </main>
    </PageTransition>
  );
}
