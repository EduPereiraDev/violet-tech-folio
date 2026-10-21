// Estado compartilhado entre o scroll (GSAP) e a cena 3D (useFrame).
// É mutável de propósito: escrever aqui não re-renderiza o React.

export const scene = {
  /** 0 → 1 enquanto o hero sai da tela */
  hero: 0,
  /** 0 → 1 ao longo da seção dos agentes (formação + passagem pelas 7 cadeias) */
  agents: 0,
  /** cadeia em destaque, -1 = nenhuma */
  active: -1,
  /** 0 → 1 quando a cena sobe e some depois dos agentes */
  exit: 0,
  /** 0 → 1 no contato: a cena volta e o voo pousa */
  landing: 0,
  pointer: { x: 0, y: 0 },
  /** só empurra as letras depois que o mouse (ou o dedo) se mexe de verdade */
  pointerActive: false,
  reduced: false,
  /** o nome do hero é desenhado por partículas (WebGL ok e sem movimento reduzido) */
  particleName: false,
  /** as partículas do nome já começaram a voar */
  nameStarted: false,
  /** posição no mundo dos 49 nós da constelação, para as letras escorrerem até eles */
  nodeWorld: new Float32Array(49 * 3),
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** O canvas some com a saída dos agentes e reaparece no pouso. */
export function applyCanvasOpacity() {
  const el = document.querySelector<HTMLElement>(".sky-canvas");
  if (el) el.style.opacity = String(Math.max(1 - scene.exit, scene.landing));
}
