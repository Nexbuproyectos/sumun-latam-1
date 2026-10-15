import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ImageFade } from "@/components/motion/ImageFade";
import { NavigationProgress } from "@/components/motion/NavigationProgress";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { RouteAssetPrefetch } from "@/components/motion/RouteAssetPrefetch";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="scroll-progress" aria-hidden="true" />
      <NavigationProgress />
      <Header />
      {children}
      <Footer />
      <RevealObserver />
      <ImageFade />
      <RouteAssetPrefetch />
    </div>
  );
}
