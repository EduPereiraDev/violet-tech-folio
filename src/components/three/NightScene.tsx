import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { chainSizes } from "@/content";
import { scene } from "@/lib/scene";

// Voo noturno: luzes de cidade passando embaixo, estrelas em cima e, no meio,
// a constelação dos 49 agentes, que vira 7 cadeias conforme o scroll.

const AMBER = new THREE.Color("#ffb547");
const CYAN = new THREE.Color("#7fd6f0");
const WARM = new THREE.Color("#ffe9c9");
const COOL = new THREE.Color("#a9d8ff");

const glowVertex = /* glsl */ `
  uniform float uTime;
  uniform float uTravel;
  uniform float uMove;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uFade;
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    if (uMove > 0.5) p.z = mod(p.z + uTravel, 100.0) - 90.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = -mv.z;
    float twinkle = 0.7 + 0.3 * sin(uTime * (0.8 + aSeed * 2.4) + aSeed * 50.0);
    float fade = uMove > 0.5 ? smoothstep(92.0, 28.0, dist) * smoothstep(1.0, 5.0, dist) : 1.0;
    vAlpha = fade * twinkle * uFade;
    vColor = aColor;
    gl_PointSize = min(aSize * uPixelRatio * uScale / max(dist, 0.1), 64.0);
  }
`;

const glowFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = pow(smoothstep(0.5, 0.0, d), 2.2);
    gl_FragColor = vec4(vColor * glow * 1.5, glow * vAlpha);
  }
`;

const makeGlowMaterial = (move: boolean, scale: number) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTravel: { value: 0 },
      uMove: { value: move ? 1 : 0 },
      uPixelRatio: { value: 1 },
      uScale: { value: scale },
      uFade: { value: 1 },
    },
    vertexShader: glowVertex,
    fragmentShader: glowFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

// Gerador determinístico: a cidade é sempre a mesma a cada visita.
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const gauss = (r: () => number) => {
  const u = Math.max(r(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
};

function buildCity() {
  const r = rng(7);
  const pos: number[] = [];
  const col: number[] = [];
  const size: number[] = [];
  const seed: number[] = [];
  const push = (x: number, z: number, c: THREE.Color, s: number) => {
    pos.push(x, -2.6, z);
    col.push(c.r, c.g, c.b);
    size.push(s);
    seed.push(r());
  };
  const pick = () => {
    const v = r();
    return v < 0.58 ? AMBER : v < 0.9 ? WARM : COOL;
  };

  // bairros
  for (let k = 0; k < 46; k++) {
    const cx = (r() - 0.5) * 100;
    const cz = -90 + r() * 100;
    const spread = 1.2 + r() * 3.6;
    const count = 90 + Math.floor(r() * 190);
    for (let i = 0; i < count; i++) {
      push(cx + gauss(r) * spread, cz + gauss(r) * spread, pick(), 10 + r() * 22);
    }
  }
  // avenidas
  for (let k = 0; k < 16; k++) {
    const x0 = (r() - 0.5) * 90;
    const z0 = -90 + r() * 100;
    const ang = (r() - 0.5) * Math.PI;
    const len = 18 + r() * 30;
    for (let d = 0; d < len; d += 0.32) {
      push(x0 + Math.sin(ang) * d, z0 + Math.cos(ang) * d, AMBER, 9 + r() * 6);
    }
  }
  // uma pista de pouso com luzes de borda e de eixo
  for (let z = -60; z < -24; z += 0.7) {
    push(-7.2, z, WARM, 16);
    push(-5.6, z, WARM, 16);
    if (Math.round(z * 10) % 14 === 0) push(-6.4, z, AMBER, 13);
  }

  return { pos, col, size, seed };
}

function buildStars() {
  const r = rng(99);
  const pos: number[] = [];
  const col: number[] = [];
  const size: number[] = [];
  const seed: number[] = [];
  for (let i = 0; i < 1400; i++) {
    const theta = r() * Math.PI * 2;
    const y = 0.05 + r() * 0.95;
    const rad = Math.sqrt(1 - y * y);
    pos.push(Math.cos(theta) * rad * 70, y * 40 - 4, Math.sin(theta) * rad * 70 - 20);
    const c = r() < 0.85 ? WARM : COOL;
    col.push(c.r, c.g, c.b);
    size.push(14 + r() * 26);
    seed.push(r());
  }
  return { pos, col, size, seed };
}

function attributes(geo: THREE.BufferGeometry, data: { pos: number[]; col: number[]; size: number[]; seed: number[] }) {
  geo.setAttribute("position", new THREE.Float32BufferAttribute(data.pos, 3));
  geo.setAttribute("aColor", new THREE.Float32BufferAttribute(data.col, 3));
  geo.setAttribute("aSize", new THREE.Float32BufferAttribute(data.size, 1));
  geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(data.seed, 1));
  return geo;
}

const City = () => {
  const { geo, mat } = useMemo(
    () => ({ geo: attributes(new THREE.BufferGeometry(), buildCity()), mat: makeGlowMaterial(true, 30) }),
    [],
  );
  const travel = useRef(0);
  const dpr = useThree((s) => s.viewport.dpr);

  useFrame((state, dt) => {
    const cruise = 1.4 + scene.hero * 5 + scene.agents * 2;
    const speed = scene.reduced ? 0 : THREE.MathUtils.lerp(cruise, 0.35, scene.landing);
    travel.current += Math.min(dt, 0.05) * speed;
    mat.uniforms.uTime.value = scene.reduced ? 0 : state.clock.elapsedTime;
    mat.uniforms.uTravel.value = travel.current;
    // depois do hero a cidade baixa a luz para o texto ter contraste
    mat.uniforms.uFade.value = THREE.MathUtils.lerp(1 - scene.hero * 0.68, 0.85, scene.landing);
    mat.uniforms.uPixelRatio.value = dpr;
  });

  return <points geometry={geo} material={mat} frustumCulled={false} />;
};

const Stars = () => {
  const { geo, mat } = useMemo(
    () => ({ geo: attributes(new THREE.BufferGeometry(), buildStars()), mat: makeGlowMaterial(false, 24) }),
    [],
  );
  const dpr = useThree((s) => s.viewport.dpr);
  useFrame((state) => {
    mat.uniforms.uTime.value = scene.reduced ? 0 : state.clock.elapsedTime;
    mat.uniforms.uPixelRatio.value = dpr;
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
};

// ---------- constelação dos agentes ----------

type Graph = {
  count: number;
  chainOf: number[];
  sphere: THREE.Vector3[];
  chains: THREE.Vector3[];
  edges: [number, number][];
};

function buildGraph(): Graph {
  const chainOf: number[] = [];
  const firstOf: number[] = [];
  chainSizes.forEach((n, c) => {
    firstOf.push(chainOf.length);
    for (let i = 0; i < n; i++) chainOf.push(c);
  });
  const count = chainOf.length;

  // forma 1: uma esfera de Fibonacci
  const sphere = chainOf.map((_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    return new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(1.75);
  });

  // forma 2: a cadeia 0 no centro e as outras seis em anel
  const chains: THREE.Vector3[] = [];
  chainSizes.forEach((n, c) => {
    const center =
      c === 0
        ? new THREE.Vector3(0, 0, 0)
        : new THREE.Vector3(
            Math.cos(Math.PI / 2 + (c - 1) * (Math.PI / 3)) * 1.95,
            Math.sin(Math.PI / 2 + (c - 1) * (Math.PI / 3)) * 1.95,
            0,
          );
    const ring = c === 0 ? 0.16 : 0.2 + n * 0.03;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + c;
      chains.push(new THREE.Vector3(center.x + Math.cos(a) * ring, center.y + Math.sin(a) * ring, Math.sin(a * 2) * 0.12));
    }
  });

  const edges: [number, number][] = [];
  chainSizes.forEach((n, c) => {
    const f = firstOf[c];
    for (let i = 0; i < n - 1; i++) edges.push([f + i, f + i + 1]);
    if (n > 2) edges.push([f + n - 1, f]);
    if (c > 0) edges.push([firstOf[0] + (c % 2), f]);
  });
  // a esteira entre as cadeias de fora
  for (let c = 1; c < chainSizes.length; c++) {
    const next = c === chainSizes.length - 1 ? 1 : c + 1;
    edges.push([firstOf[c] + Math.floor(chainSizes[c] / 2), firstOf[next]]);
  }

  return { count, chainOf, sphere, chains, edges };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

const PULSES = 28;

const Constellation = () => {
  const graph = useMemo(buildGraph, []);
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const dpr = useThree((s) => s.viewport.dpr);
  const size = useThree((s) => s.size);

  const parts = useMemo(() => {
    const n = graph.count;
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
    nodeGeo.setAttribute("aColor", new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
    nodeGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(new Float32Array(n), 1));
    nodeGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(Array.from({ length: n }, (_, i) => (i * 0.618) % 1), 1));

    const e = graph.edges.length;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(e * 6), 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(e * 6), 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(PULSES * 3), 3));
    pulseGeo.setAttribute("aColor", new THREE.Float32BufferAttribute(new Float32Array(PULSES * 3), 3));
    pulseGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(new Float32Array(PULSES).fill(18), 1));
    pulseGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(new Float32Array(PULSES), 1));
    const pulses = Array.from({ length: PULSES }, (_, i) => ({
      edge: (i * 7) % e,
      t: (i * 0.37) % 1,
      speed: 0.35 + ((i * 0.53) % 1) * 0.6,
    }));

    return {
      nodeGeo,
      nodeMat: makeGlowMaterial(false, 54),
      lineGeo,
      lineMat,
      pulseGeo,
      pulseMat: makeGlowMaterial(false, 30),
      pulses,
      glow: new Float32Array(n),
      current: graph.sphere.map((v) => v.clone()),
    };
  }, [graph]);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const col = useMemo(() => new THREE.Color(), []);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const time = scene.reduced ? 0 : state.clock.elapsedTime;
    const mobile = size.width < 760 || size.width / size.height < 0.85;
    const form = scene.reduced ? (scene.agents > 0.08 ? 1 : 0) : smooth(0.0, 0.2, scene.agents);
    const spin = time * 0.12;
    const cos = Math.cos(spin);
    const sin = Math.sin(spin);

    const nodePos = parts.nodeGeo.attributes.position.array as Float32Array;
    const nodeCol = parts.nodeGeo.attributes.aColor.array as Float32Array;
    const nodeSize = parts.nodeGeo.attributes.aSize.array as Float32Array;

    for (let i = 0; i < graph.count; i++) {
      const stagger = Math.min(Math.max(form * 1.35 - (i / graph.count) * 0.35, 0), 1);
      const k = stagger * stagger * (3 - 2 * stagger);
      const s = graph.sphere[i];
      // a esfera gira; as cadeias ficam de frente para a câmera
      tmp.set(s.x * cos + s.z * sin, s.y, -s.x * sin + s.z * cos);
      tmp.lerp(graph.chains[i], k);
      parts.current[i].copy(tmp);
      nodePos[i * 3] = tmp.x;
      nodePos[i * 3 + 1] = tmp.y;
      nodePos[i * 3 + 2] = tmp.z;

      const target = scene.active === graph.chainOf[i] ? 1 : 0;
      // sem animação contínua (movimento reduzido) o destaque vai direto ao valor final
      parts.glow[i] = scene.reduced ? target : parts.glow[i] + (target - parts.glow[i]) * Math.min(dt * 6, 1);
      const g = parts.glow[i];
      col.copy(CYAN).lerp(AMBER, g);
      nodeCol[i * 3] = col.r;
      nodeCol[i * 3 + 1] = col.g;
      nodeCol[i * 3 + 2] = col.b;
      nodeSize[i] = (graph.chainOf[i] === 0 ? 30 : 22) + g * 16;
    }
    parts.nodeGeo.attributes.position.needsUpdate = true;
    parts.nodeGeo.attributes.aColor.needsUpdate = true;
    parts.nodeGeo.attributes.aSize.needsUpdate = true;

    const linePos = parts.lineGeo.attributes.position.array as Float32Array;
    const lineCol = parts.lineGeo.attributes.color.array as Float32Array;
    for (let j = 0; j < graph.edges.length; j++) {
      const [a, b] = graph.edges[j];
      const pa = parts.current[a];
      const pb = parts.current[b];
      const o = j * 6;
      linePos[o] = pa.x;
      linePos[o + 1] = pa.y;
      linePos[o + 2] = pa.z;
      linePos[o + 3] = pb.x;
      linePos[o + 4] = pb.y;
      linePos[o + 5] = pb.z;
      col.copy(CYAN).multiplyScalar(0.5).lerp(AMBER, Math.min(parts.glow[a], parts.glow[b]));
      lineCol[o] = lineCol[o + 3] = col.r;
      lineCol[o + 1] = lineCol[o + 4] = col.g;
      lineCol[o + 2] = lineCol[o + 5] = col.b;
    }
    parts.lineGeo.attributes.position.needsUpdate = true;
    parts.lineGeo.attributes.color.needsUpdate = true;

    const pulsePos = parts.pulseGeo.attributes.position.array as Float32Array;
    const pulseCol = parts.pulseGeo.attributes.aColor.array as Float32Array;
    parts.pulses.forEach((p, j) => {
      if (!scene.reduced) p.t += dt * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = (p.edge + 11) % graph.edges.length;
      }
      const [a, b] = graph.edges[p.edge];
      tmp.copy(parts.current[a]).lerp(parts.current[b], p.t);
      pulsePos[j * 3] = tmp.x;
      pulsePos[j * 3 + 1] = tmp.y;
      pulsePos[j * 3 + 2] = tmp.z;
      col.copy(WARM).lerp(AMBER, Math.min(parts.glow[a], parts.glow[b]));
      pulseCol[j * 3] = col.r;
      pulseCol[j * 3 + 1] = col.g;
      pulseCol[j * 3 + 2] = col.b;
    });
    parts.pulseGeo.attributes.position.needsUpdate = true;
    parts.pulseGeo.attributes.aColor.needsUpdate = true;

    // no celular a constelação fica atrás do texto: some depois do hero e volta para os agentes
    const fade = (mobile ? Math.max(1 - scene.hero * 0.85, form) : 1) * (1 - scene.landing);
    for (const m of [parts.nodeMat, parts.pulseMat]) {
      m.uniforms.uTime.value = time;
      m.uniforms.uPixelRatio.value = dpr;
      m.uniforms.uFade.value = fade;
    }
    parts.lineMat.opacity = 0.85 * fade;

    // enquadramento: à direita no desktop, em cima no celular
    if (group.current && inner.current) {
      const a = scene.reduced ? form : smooth(0, 0.2, scene.agents);
      const exit = scene.reduced ? 0 : scene.exit;
      const heroX = mobile ? 0 : 2.5;
      const agentsX = mobile ? 0 : 2.0;
      const heroY = mobile ? 2.55 : 0.95;
      const agentsY = mobile ? 1.45 : 0.15;
      const scale = (mobile ? THREE.MathUtils.lerp(0.58, 0.68, a) : THREE.MathUtils.lerp(1, 0.86, a)) * (1 - exit * 0.4);
      group.current.position.set(
        THREE.MathUtils.lerp(heroX, agentsX, a),
        THREE.MathUtils.lerp(heroY, agentsY, a) + exit * 2.2,
        scene.reduced ? 0 : -scene.hero * 0.6 * (1 - a),
      );
      group.current.scale.setScalar(scale);
      const px = scene.reduced ? 0 : scene.pointer.x;
      const py = scene.reduced ? 0 : scene.pointer.y;
      inner.current.rotation.y += (px * 0.35 - inner.current.rotation.y) * Math.min(dt * 3, 1);
      inner.current.rotation.x += (-py * 0.25 + (1 - a) * 0.15 - inner.current.rotation.x) * Math.min(dt * 3, 1);
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <lineSegments geometry={parts.lineGeo} material={parts.lineMat} frustumCulled={false} />
        <points geometry={parts.nodeGeo} material={parts.nodeMat} frustumCulled={false} />
        <points geometry={parts.pulseGeo} material={parts.pulseMat} frustumCulled={false} />
      </group>
    </group>
  );
};

const CameraRig = () => {
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    if (scene.reduced) {
      // movimento reduzido: um enquadramento só, sem câmera presa ao scroll
      camera.position.set(0, 0.4, 7.4);
      camera.lookAt(look.set(0, 1.0, 0));
      return;
    }
    const a = smooth(0, 0.2, scene.agents);
    // no pouso a câmera desce e volta a olhar para o horizonte
    const e = scene.exit * (1 - scene.landing);
    const y = 0.5 - scene.hero * 0.25 + e * 1.5;
    camera.position.set(0, THREE.MathUtils.lerp(y, -0.6, scene.landing), 7.6 - scene.hero * 0.5);
    look.set(0, THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.35, 0.6, a) + e * 3.2, 0.9, scene.landing), 0);
    camera.lookAt(look);
  });
  return null;
};

// Com movimento reduzido a cena é estática: só redesenha quando o scroll muda o estado.
const RedrawOnScroll = () => {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [invalidate]);
  return null;
};

const NightScene = ({ active }: { active: boolean }) => (
  <Canvas
    frameloop={!active ? "never" : scene.reduced ? "demand" : "always"}
    dpr={[1, 1.75]}
    camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0.5, 7.6] }}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    // o canvas monta dentro de um Suspense; um resize garante a medida certa no primeiro frame
    onCreated={() => requestAnimationFrame(() => window.dispatchEvent(new Event("resize")))}
  >
    <Stars />
    <City />
    <Constellation />
    <CameraRig />
    {scene.reduced && <RedrawOnScroll />}
  </Canvas>
);

export default NightScene;
