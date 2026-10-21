import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { prefersReducedMotion, scene } from './lib/scene'
import './index.css'

scene.reduced = prefersReducedMotion();

// a abertura é uma sequência; recarregar a página volta para o começo dela
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);
