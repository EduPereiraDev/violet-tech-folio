import * as THREE from "three";

// Peças compartilhadas da cena: cores da foto do Eduardo e o material de "luz" (pontos com brilho aditivo).

export const NEON = new THREE.Color("#ff6a1f");
export const LAMP = new THREE.Color("#8fc6d2");
export const WARM = new THREE.Color("#ffd6a3");
export const COOL = new THREE.Color("#a6d6e0");

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

export const makeGlowMaterial = (move: boolean, scale: number) =>
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

export const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/** Câmera no topo da página (hero = 0). O nome em partículas é projetado a partir dela. */
export const CAMERA_START = { y: 0.5, z: 7.6, lookY: 1.35, fov: 45 };
