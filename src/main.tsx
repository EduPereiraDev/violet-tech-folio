import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { prefersReducedMotion, scene } from './lib/scene'
import './index.css'

scene.reduced = prefersReducedMotion();

// O nome do hero vira partículas só com WebGL e sem movimento reduzido. Se a cena não começar
// em 2,5 s (rede lenta, GPU bloqueada), o texto normal aparece.
const hasWebGL = (() => {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl"));
  } catch {
    return false;
  }
})();
scene.particleName = hasWebGL && !scene.reduced;
if (scene.particleName) {
  document.documentElement.classList.add("particle-name");
  setTimeout(() => {
    if (scene.nameStarted) return;
    // a cena demorou: o nome fica como texto e as partículas não entram mais
    scene.particleName = false;
    document.documentElement.classList.remove("particle-name");
  }, 2500);
}

// a abertura é uma sequência; recarregar a página volta para o começo dela
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);
