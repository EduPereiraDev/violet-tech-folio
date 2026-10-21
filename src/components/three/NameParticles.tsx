import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { scene } from "@/lib/scene";
import { CAMERA_START, makeGlowMaterial, NEON, smooth, WARM } from "./glow";

// O nome do hero feito de luz: as partículas saem da cidade, voam até o desenho exato das letras
// do <h1> (que continua no DOM, invisível, para leitores de tela e busca), fogem do mouse e,
// com o scroll, escorrem para os 49 nós da constelação.

const PLANE_Z = 0;
const POINT_SCALE = 10;

type Target = { x: number; y: number; step: number };

/** Bloco do hero e sua altura sem transform: o parallax dele é lido do GSAP, sem medir o layout. */
let innerEl: HTMLElement | null = null;
let innerH0 = 0;

/** Desenha cada linha do nome num canvas 2D com a mesma fonte do DOM e amostra os pixels. */
function sampleName(maxPoints: number): Target[] {
  // o GSAP move o .hero__inner (parallax); a medida tem que ser da posição sem transform
  const inner = document.querySelector<HTMLElement>(".hero__inner");
  const savedTransform = inner?.style.transform ?? "";
  if (inner) inner.style.transform = "none";
  innerEl = inner;
  innerH0 = inner?.getBoundingClientRect().height ?? 0;
  const spans = Array.from(document.querySelectorAll<HTMLElement>(".hero__line > span"));
  const layers = spans.map((span) => {
    const range = document.createRange();
    range.selectNodeContents(span);
    const r = range.getBoundingClientRect();
    const cs = getComputedStyle(span);
    const pad = 8;
    const w = Math.ceil(r.width) + pad * 2;
    const h = Math.ceil(r.height) + pad * 2;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const c = ctx as CanvasRenderingContext2D & { fontStretch?: string; letterSpacing?: string };
    if ("fontStretch" in c) c.fontStretch = parseFloat(cs.fontStretch) >= 112 ? "expanded" : "normal";
    if ("letterSpacing" in c) c.letterSpacing = cs.letterSpacing;
    const m = ctx.measureText(span.textContent ?? "");
    ctx.fillStyle = "#fff";
    ctx.fillText(span.textContent ?? "", pad, pad + m.fontBoundingBoxAscent);
    const data = ctx.getImageData(0, 0, w, h).data;
    let filled = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
    return { data, w, h, left: r.left - pad, top: r.top + window.scrollY - pad, filled };
  });

  if (inner) inner.style.transform = savedTransform;

  const total = layers.reduce((n, l) => n + l.filled, 0);
  const step = Math.max(1.6, Math.sqrt(total / maxPoints));
  const out: Target[] = [];
  for (const l of layers) {
    for (let y = 0; y < l.h; y += step) {
      for (let x = 0; x < l.w; x += step) {
        const jx = x + Math.random() * step * 0.6;
        const jy = y + Math.random() * step * 0.6;
        const idx = (Math.floor(jy) * l.w + Math.floor(jx)) * 4 + 3;
        if (l.data[idx] > 128) out.push({ x: l.left + jx, y: l.top + jy, step });
      }
    }
  }
  return out;
}

const NameParticles = () => {
  const size = useThree((s) => s.size);
  const dpr = useThree((s) => s.viewport.dpr);
  const camera = useThree((s) => s.camera);
  const mat = useMemo(() => makeGlowMaterial(false, POINT_SCALE), []);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const state = useRef<{
    n: number;
    start: Float32Array;
    /** posição de cada partícula na página (px, com scrollY = 0) */
    screen: Float32Array;
    jitter: Float32Array;
    /** agente (0–48) para onde a partícula escorre e quando ela começa a escorrer */
    node: Uint16Array;
    flow: Float32Array;
    offset: Float32Array;
    delay: Float32Array;
    dur: Float32Array;
    swirl: Float32Array;
    t0: number;
    assembled: boolean;
  } | null>(null);
  const clock = useThree((s) => s.clock);
  const points = useRef<THREE.Points>(null);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), -PLANE_Z), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    if (!scene.particleName) return;
    let cancelled = false;

    const build = (keepAssembled: boolean) => {
      // o fallback de texto já entrou (cena atrasada): não some com o nome de novo
      if (!scene.particleName) return;
      const mobile = size.width < 760;
      const points = sampleName(mobile ? 3000 : 11000);
      if (!points.length) return;

      // a mesma câmera do topo da página: o ponto na tela vira um ponto no plano z = 0
      const cam = new THREE.PerspectiveCamera(CAMERA_START.fov, size.width / size.height, 0.1, 200);
      cam.position.set(0, CAMERA_START.y, CAMERA_START.z);
      cam.lookAt(0, CAMERA_START.lookY, 0);
      cam.updateMatrixWorld();
      const v = new THREE.Vector3();
      const dir = new THREE.Vector3();

      const n = points.length;
      const target = new Float32Array(n * 3);
      const screen = new Float32Array(n * 2);
      const jitter = new Float32Array(n);
      const node = new Uint16Array(n);
      const flow = new Float32Array(n);
      const start = new Float32Array(n * 3);
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const sz = new Float32Array(n);
      const seed = new Float32Array(n);
      const delay = new Float32Array(n);
      const dur = new Float32Array(n);
      const swirl = new Float32Array(n);
      const c = new THREE.Color();
      let minX = Infinity;
      let maxX = -Infinity;

      points.forEach((p, i) => {
        v.set((p.x / size.width) * 2 - 1, -(p.y / size.height) * 2 + 1, 0.5).unproject(cam);
        dir.copy(v).sub(cam.position).normalize();
        const t = (PLANE_Z - cam.position.z) / dir.z;
        target[i * 3] = cam.position.x + dir.x * t;
        target[i * 3 + 1] = cam.position.y + dir.y * t;
        target[i * 3 + 2] = PLANE_Z;
        screen[i * 2] = p.x;
        screen[i * 2 + 1] = p.y;
        jitter[i] = (Math.random() - 0.5) * 0.04;
        minX = Math.min(minX, target[i * 3]);
        maxX = Math.max(maxX, target[i * 3]);
        // partem das luzes da cidade, lá embaixo
        start[i * 3] = (Math.random() - 0.5) * 22;
        start[i * 3 + 1] = -2.6;
        start[i * 3 + 2] = -28 + Math.random() * 30;
        c.copy(WARM).lerp(NEON, Math.random() < 0.22 ? 0.8 : Math.random() * 0.2);
        col.set([c.r, c.g, c.b], i * 3);
        sz[i] = ((p.step * 3.8 * CAMERA_START.z) / POINT_SCALE) * (0.8 + Math.random() * 0.45);
        seed[i] = Math.random();
        swirl[i] = (Math.random() - 0.5) * 3;
      });
      points.forEach((_, i) => {
        // varredura da esquerda para a direita, com bastante aleatoriedade
        const sweep = (target[i * 3] - minX) / Math.max(maxX - minX, 0.001);
        delay[i] = 0.15 + sweep * 0.7 + Math.random() * 0.9;
        dur[i] = 1.5 + Math.random() * 0.9;
        // fatias vizinhas do nome vão para o mesmo agente, cada partícula no seu tempo
        node[i] = Math.max(0, Math.min(48, Math.floor(sweep * 49 + (Math.random() - 0.5) * 3)));
        flow[i] = 0.04 + sweep * 0.22 + Math.random() * 0.22;
      });
      pos.set(keepAssembled ? target : start);

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      geo.setDrawRange(0, n);

      state.current = {
        n,
        start,
        screen,
        jitter,
        node,
        flow,
        offset: new Float32Array(n * 2),
        delay,
        dur,
        swirl,
        t0: clock.elapsedTime,
        assembled: keepAssembled,
      };
      if (!keepAssembled) {
        scene.nameStarted = true;
        document.documentElement.classList.add("particle-name");
      }
    };

    // a fonte precisa estar carregada para o desenho bater com o DOM
    document.fonts.load("800 100px 'Archivo Variable'").finally(() => {
      if (!cancelled) build(state.current !== null);
    });

    return () => {
      cancelled = true;
    };
    // reconstrói ao redimensionar; depois da primeira vez, já monta pronto
  }, [size.width, size.height, geo, clock]);

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );

  useFrame((_, rawDt) => {
    const s = state.current;
    if (!s || !points.current) return;
    // depois do hero as partículas já viraram constelação: nada para calcular nem desenhar
    const visible = scene.hero < 0.95;
    points.current.visible = visible;
    if (!visible) return;
    const dt = Math.min(rawDt, 0.05);
    const pos = geo.attributes.position.array as Float32Array;
    const elapsed = clock.elapsedTime - s.t0;

    // mouse: ponto no plano do nome
    ndc.set(scene.pointer.x, -scene.pointer.y);
    ray.setFromCamera(ndc, camera);
    const hasHit = scene.pointerActive && scene.hero < 0.5 && ray.ray.intersectPlane(plane, hit) !== null;
    const R = 0.75;

    // o nome fica "colado" na página: cada ponto da tela vira um ponto no plano z = 0
    // a partir da câmera atual, então ele sobe com o scroll como um texto de verdade
    const e = camera.matrixWorld.elements;
    const persp = camera as THREE.PerspectiveCamera;
    const tanH = Math.tan(THREE.MathUtils.degToRad(persp.fov / 2));
    const aspect = size.width / size.height;
    const cx = e[12], cy = e[13], cz = e[14];
    // a página sobe com o scroll e o bloco do hero ainda tem parallax: segue os dois.
    // O deslocamento vem do valor que o GSAP guarda; medir o layout aqui (getBoundingClientRect,
    // logo depois do GSAP escrever o transform) forçava reflow a cada frame e travava o nome no celular.
    if (!innerEl?.isConnected) {
      innerEl = document.querySelector<HTMLElement>(".hero__inner");
      if (innerEl) innerH0 = innerEl.offsetHeight;
    }
    const shift = innerEl
      ? (Number(gsap.getProperty(innerEl, "yPercent")) / 100) * innerH0 + Number(gsap.getProperty(innerEl, "y"))
      : 0;
    const scrollY = window.scrollY - shift;

    let done = true;
    for (let i = 0; i < s.n; i++) {
      const i3 = i * 3;
      let x: number;
      let y: number;
      let z: number;
      const nx = ((s.screen[i * 2] / size.width) * 2 - 1) * tanH * aspect;
      const ny = (-((s.screen[i * 2 + 1] - scrollY) / size.height) * 2 + 1) * tanH;
      const dx0 = -e[8] + e[0] * nx + e[4] * ny;
      const dy0 = -e[9] + e[1] * nx + e[5] * ny;
      const dz0 = -e[10] + e[2] * nx + e[6] * ny;
      const t = (PLANE_Z - cz) / dz0;
      const tx = cx + dx0 * t;
      const ty = cy + dy0 * t;
      const tz = PLANE_Z + s.jitter[i];

      const k = s.assembled ? 1 : Math.min(Math.max((elapsed - s.delay[i]) / s.dur[i], 0), 1);
      if (k < 1) {
        done = false;
        const ease = 1 - Math.pow(1 - k, 3);
        const arc = Math.sin(ease * Math.PI);
        x = s.start[i3] + (tx - s.start[i3]) * ease + arc * s.swirl[i];
        y = s.start[i3 + 1] + (ty - s.start[i3 + 1]) * ease + arc * 1.2;
        z = s.start[i3 + 2] + (tz - s.start[i3 + 2]) * ease;
      } else {
        x = tx;
        y = ty;
        z = tz;
      }

      // as letras fogem do mouse e voltam com mola
      const o = i * 2;
      if (hasHit && k >= 1) {
        const dx = x + s.offset[o] - hit.x;
        const dy = y + s.offset[o + 1] - hit.y;
        const d = Math.hypot(dx, dy);
        if (d < R && d > 0.0001) {
          const f = (1 - d / R) * 3.2 * dt;
          s.offset[o] += (dx / d) * f;
          s.offset[o + 1] += (dy / d) * f;
        }
      }
      s.offset[o] -= s.offset[o] * Math.min(dt * 3.5, 1);
      s.offset[o + 1] -= s.offset[o + 1] * Math.min(dt * 3.5, 1);
      x += s.offset[o];
      y += s.offset[o + 1];

      // scroll: cada partícula escorre para um dos 49 agentes
      const c = smooth(s.flow[i], s.flow[i] + 0.42, scene.hero);
      if (c > 0) {
        const c2 = c * c;
        const nd = s.node[i] * 3;
        x += (scene.nodeWorld[nd] - x) * c2;
        y += (scene.nodeWorld[nd + 1] - y) * c2;
        z += (scene.nodeWorld[nd + 2] - z) * c2;
      }

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }
    if (done) s.assembled = true;
    geo.attributes.position.needsUpdate = true;

    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uPixelRatio.value = dpr;
    mat.uniforms.uFade.value = 1 - smooth(0.55, 0.95, scene.hero);
  });

  if (!scene.particleName) return null;
  return <points ref={points} geometry={geo} material={mat} frustumCulled={false} renderOrder={2} />;
};

export default NameParticles;
