# edupereiradev.netlify.app

Portfólio do **Eduardo Pereira dos Santos**, Líder Técnico (Tech Lead) e AI Engineer.

O site é um voo noturno: luzes de cidade passando embaixo e, no céu, a constelação dos 49 agentes do sistema multiagente. Conforme o scroll, a constelação vira as 7 cadeias, os projetos entram como faixas de controle de tráfego aéreo e o contato fecha com o pouso.

## Stack

- React 18, TypeScript e Vite
- Three.js com @react-three/fiber (cena em `src/components/three/NightScene.tsx`, carregada sob demanda)
- GSAP ScrollTrigger e Lenis para o scroll
- Archivo Variable (eixo de largura) como única família tipográfica
- Tailwind só para utilitários; o design system está em `src/index.css`

## Conteúdo

Todo o texto, em português e inglês, fica em `src/content.ts`. A fonte da verdade é o CV-mestre (`~/Projetos/carreira/cv/cv-mestre.md`): nada entra no site sem evidência lá, e nenhum cliente é citado pelo nome.

Para mandar o link já em inglês: `https://edupereiradev.netlify.app/?lang=en`.

## Rodar

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Deploy

Netlify, com `netlify.toml` (Node 22, `npm run build`, publica `dist`).
