import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Summary from "@/components/site/Summary";
import Agents from "@/components/site/Agents";
import Work from "@/components/site/Work";
import Path from "@/components/site/Path";
import Stack from "@/components/site/Stack";
import Contact from "@/components/site/Contact";
import { scene } from "@/lib/scene";
import { startSmoothScroll } from "@/lib/smooth-scroll";

// A cena 3D vem num chunk separado: o texto aparece antes do Three.js carregar.
const NightScene = lazy(() => import("@/components/three/NightScene"));

// Sem WebGL o site continua inteiro, só sem a cena.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const Index = () => {
  // a cena só renderiza no começo (hero e agentes) e no fim (contato)
  const [inStart, setInStart] = useState(true);
  const [inEnd, setInEnd] = useState(false);

  useEffect(() => {
    const stop = scene.reduced ? undefined : startSmoothScroll();

    const onPointer = (e: PointerEvent) => {
      scene.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scene.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // fontes e imagens mudam alturas depois do primeiro layout
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      stop?.();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <div className="starfield" aria-hidden="true" />
      <div className="sky-canvas" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <NightScene active={inStart || inEnd} />
          </Suspense>
        </SceneBoundary>
      </div>
      <Nav />
      <main id="content" className="page" tabIndex={-1}>
        <Hero />
        <Summary />
        <Agents onSceneVisible={setInStart} />
        <Work />
        <Path />
        <Stack />
        <Contact onSceneVisible={setInEnd} />
      </main>
    </>
  );
};

export default Index;
