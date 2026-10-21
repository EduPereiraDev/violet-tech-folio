import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { chainSizes } from "@/content";
import { scene } from "@/lib/scene";
import { CAMERA_START, COOL, LAMP, makeGlowMaterial, NEON, smooth, TOUCH, WARM } from "./glow";
import NameParticles from "./NameParticles";

// Voo noturno nas cores da foto do Eduardo: neon laranja, luz quente de janela e o azul
// do poste. Luzes de cidade passando embaixo, estrelas em cima e, no meio,
// a constelação dos 49 agentes, que vira 7 cadeias conforme o scroll.

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
    // no toque fica pouco mais da metade das luzes; a cidade continua com a mesma cara
    if (TOUCH && r() > 0.55) return;
    pos.push(x, -2.6, z);
    col.push(c.r, c.g, c.b);
    size.push(s);
    seed.push(r());
  };
  const pick = () => {
    const v = r();
    return v < 0.5 ? NEON : v < 0.88 ? WARM : COOL;
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
      push(x0 + Math.sin(ang) * d, z0 + Math.cos(ang) * d, NEON, 9 + r() * 6);
    }
  }
  // uma pista de pouso com luzes de borda e de eixo
  for (let z = -60; z < -24; z += 0.7) {
    push(-7.2, z, WARM, 16);
    push(-5.6, z, WARM, 16);
    if (Math.round(z * 10) % 14 === 0) push(-6.4, z, NEON, 13);
  }

  return { pos, col, size, seed };
}

function buildStars() {
  const r = rng(99);
  const pos: number[] = [];
  const col: number[] = [];
  const size: number[] = [];
  const seed: number[] = [];
  for (let i = 0; i < (TOUCH ? 700 : 1400); i++) {
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
      col.copy(LAMP).lerp(NEON, g);
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
      col.copy(LAMP).multiplyScalar(0.5).lerp(NEON, Math.min(parts.glow[a], parts.glow[b]));
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
      col.copy(WARM).lerp(NEON, Math.min(parts.glow[a], parts.glow[b]));
      pulseCol[j * 3] = col.r;
      pulseCol[j * 3 + 1] = col.g;
      pulseCol[j * 3 + 2] = col.b;
    });
    parts.pulseGeo.attributes.position.needsUpdate = true;
    parts.pulseGeo.attributes.aColor.needsUpdate = true;

    // no celular a constelação fica atrás do texto: some depois do hero e volta para os agentes
    // com o nome em partículas, a constelação nasce das letras conforme o scroll; no celular ela
    // fica atrás do texto e só volta para os agentes
    const heroFade = scene.particleName ? smooth(0.3, 0.85, scene.hero) : 1;
    const fade = (mobile ? Math.max(scene.particleName ? 0 : 1 - scene.hero * 0.85, form) : Math.max(heroFade, form)) * (1 - scene.landing);
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

      // posição no mundo de cada nó, para as letras do hero escorrerem até eles
      inner.current.updateWorldMatrix(true, false);
      for (let i = 0; i < graph.count; i++) {
        tmp.copy(parts.current[i]).applyMatrix4(inner.current.matrixWorld);
        scene.nodeWorld[i * 3] = tmp.x;
        scene.nodeWorld[i * 3 + 1] = tmp.y;
        scene.nodeWorld[i * 3 + 2] = tmp.z;
      }
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
    const y = CAMERA_START.y - scene.hero * 0.25 + e * 1.5;
    camera.position.set(0, THREE.MathUtils.lerp(y, -0.6, scene.landing), CAMERA_START.z - scene.hero * 0.5);
    look.set(0, THREE.MathUtils.lerp(THREE.MathUtils.lerp(CAMERA_START.lookY, 0.6, a) + e * 3.2, 0.9, scene.landing), 0);
    camera.lookAt(look);
    // o nome em partículas projeta a partir desta câmera no mesmo frame
    camera.updateMatrixWorld();
  });
  return null;
};

// Resolução adaptativa. A GPU do celular é quem limita: com o canvas lento, o nome que acompanha
// o scroll engasga. O nível fica no estado do NightScene e vai para o <Canvas dpr>, porque o R3F
// reaplica a prop dpr a cada render e desfaria um setDpr direto no store.
const DPR_LEVELS = [1, 0.8, 0.65, 0.5];

const AdaptiveDpr = ({ level, onLevel }: { level: number; onLevel: (level: number) => void }) => {
  const acc = useRef({
    time: 0,
    frames: 0,
    warmup: 2,
    bad: 0,
    good: 0,
    /** fps das janelas ruins seguidas, para comparar com uma média e não com uma janela só */
    badFps: [] as number[],
    recovered: false,
    locked: false,
    /** depois de baixar, confere se adiantou; se não, o gargalo não é a GPU (ex.: economia de bateria a 30 fps) */
    probe: null as null | { from: number; before: number; skip: boolean; samples: number[] },
  });

  useFrame((_, dt) => {
    const a = acc.current;
    if (dt > 0.5) {
      // aba voltando do fundo ou cena religada: os primeiros frames não contam
      a.warmup = 1.5;
      a.time = 0;
      a.frames = 0;
      return;
    }
    if (a.warmup > 0) {
      a.warmup -= dt;
      return;
    }
    a.time += dt;
    a.frames++;
    if (a.time < 1) return;
    const fps = a.frames / a.time;
    a.time = 0;
    a.frames = 0;

    if (a.probe) {
      // a primeira janela depois da troca inclui a realocação do canvas: não conta
      if (a.probe.skip) {
        a.probe.skip = false;
        return;
      }
      a.probe.samples.push(fps);
      if (a.probe.samples.length < 3) return;
      const n = a.probe.samples.length;
      const mean = a.probe.samples.reduce((x, y) => x + y, 0) / n;
      const sd = Math.sqrt(a.probe.samples.reduce((x, y) => x + (y - mean) ** 2, 0) / n);
      // só desfaz quando a falta de ganho é clara e estável (ex.: limite de 30 fps da bateria);
      // com FPS oscilando, o ganho é ambíguo e o nível novo fica
      if (mean <= a.probe.before * 1.05 && sd < mean * 0.1) {
        onLevel(a.probe.from);
        a.locked = true;
      }
      a.probe = null;
      return;
    }
    if (a.locked) return;

    if (fps < 45) {
      a.bad++;
      a.badFps.push(fps);
      if (a.badFps.length > 3) a.badFps.shift();
      a.good = 0;
    } else if (fps > 57) {
      a.good++;
      a.bad = 0;
      a.badFps = [];
    } else {
      a.bad = 0;
      a.badFps = [];
      a.good = 0;
    }

    // só baixa com 3 janelas ruins seguidas: uma travada passageira não derruba a qualidade
    if (a.bad >= 3 && level < DPR_LEVELS.length - 1) {
      const before = a.badFps.slice(-3).reduce((x, y) => x + y, 0) / Math.min(a.badFps.length, 3);
      a.bad = 0;
      a.badFps = [];
      // se já tinha subido uma vez e voltou a pesar, este é o nível certo: para de oscilar
      if (a.recovered) a.locked = true;
      a.probe = { from: level, before, skip: true, samples: [] };
      onLevel(level + 1);
    } else if (a.good >= 8 && level > 0 && !a.recovered) {
      a.good = 0;
      a.recovered = true;
      onLevel(level - 1);
    }
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

const NightScene = ({ active }: { active: boolean }) => {
  const [level, setLevel] = useState(0);
  const base = Math.min(Math.max(window.devicePixelRatio || 1, 1), TOUCH ? 1.25 : 1.75);
  const dpr = Math.max(0.6, base * DPR_LEVELS[level]);

  return (
    <Canvas
      frameloop={!active ? "never" : scene.reduced ? "demand" : "always"}
      dpr={dpr}
      camera={{ fov: CAMERA_START.fov, near: 0.1, far: 200, position: [0, CAMERA_START.y, CAMERA_START.z] }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      // o canvas monta dentro de um Suspense; um resize garante a medida certa no primeiro frame
      onCreated={() => requestAnimationFrame(() => window.dispatchEvent(new Event("resize")))}
    >
      <CameraRig />
      <Stars />
      <City />
      <Constellation />
      <NameParticles />
      {scene.reduced ? <RedrawOnScroll /> : <AdaptiveDpr level={level} onLevel={setLevel} />}
    </Canvas>
  );
};

export default NightScene;
