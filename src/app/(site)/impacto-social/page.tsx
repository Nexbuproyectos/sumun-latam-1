import { AgendaSection } from "@/components/impacto-social/AgendaSection";
import { HeroSection } from "@/components/impacto-social/HeroSection";
import { PilaresSection } from "@/components/impacto-social/PilaresSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function ImpactoSocial() {
  return (
    <PageTransition>
      <main className="relative flex-1 overflow-x-clip">
        <HeroSection />
        <PilaresSection />
        <AgendaSection />
      </main>
    </PageTransition>
  );
}
