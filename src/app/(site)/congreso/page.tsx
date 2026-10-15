import type { Metadata } from "next";

import { CongresoHero } from "@/components/congreso/CongresoHero";
import { DiagnosticoCta } from "@/components/congreso/DiagnosticoCta";
import { RecursosSection } from "@/components/congreso/RecursosSection";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Hackeando la Ciudad 2026 | Sumun",
  description:
    "Gracias por ser parte de Hackeando la Ciudad 2026. Descarga tu certificado y los recursos del congreso.",
};

// Landing post-congreso "Mensaje de congreso" (1100:8062): se comparte por enlace, no va en el menú.
export default function Congreso() {
  return (
    <PageTransition>
      <main className="relative flex-1 overflow-x-clip">
        <CongresoHero />
        <DiagnosticoCta />
        <RecursosSection />
      </main>
    </PageTransition>
  );
}
