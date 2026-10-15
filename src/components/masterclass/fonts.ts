import { Geist, Inter, Montserrat } from "next/font/google";

// Tipografías que solo usa la landing de Masterclass: se cargan en esta página y no en todo el sitio.
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
