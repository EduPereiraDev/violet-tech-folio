import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chainSizes } from "@/content";
import { applyCanvasOpacity, scene } from "@/lib/scene";

// Parte da seção usada para a esfera virar cadeias; o resto passa pelas 7 cadeias.
const FORMATION = 0.22;

const Agents = ({ onSceneVisible }: { onSceneVisible: (visible: boolean) => void }) => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      gsap.to(scene, {
        agents: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: scene.reduced ? true : 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const next =
              p < FORMATION ? -1 : Math.min(chainSizes.length - 1, Math.floor(((p - FORMATION) / (1 - FORMATION)) * chainSizes.length));
            if (next !== scene.active) {
              scene.active = next;
              setActive(next);
            }
          },
        },
      });

      // depois da última cadeia, a cena sobe e some; aí o canvas para de renderizar
      gsap.to(scene, {
        exit: 1,
        ease: "none",
        onUpdate: applyCanvasOpacity,
        scrollTrigger: {
          trigger: root.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          onLeave: () => onSceneVisible(false),
          onEnterBack: () => onSceneVisible(true),
        },
      });

      if (!scene.reduced) {
        gsap.from(".agents__panel > *", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 35%" },
        });
      }
    },
    { scope: root },
  );

  return (
    <section id="agents" className="agents" ref={root} aria-labelledby="agents-title">
      <div className="agents__stage">
        <div className="wrap">
          <div className="agents__panel">
            <p className="kicker">{t.agents.kicker}</p>
            <h2 id="agents-title" className="agents__title display">
              {t.agents.title}
            </h2>
            <p className="agents__intro">{t.agents.intro}</p>
            <ol className="chains">
              {t.agents.chains.map((c, i) => (
                <li key={c.name} className={`chain${active === i ? " is-active" : ""}`} aria-current={active === i ? "step" : undefined}>
                  <span className="chain__count">
                    {chainSizes[i]}
                    <span className="sr-only"> {t.agents.agentsWord}</span>
                  </span>
                  <span className="chain__name">{c.name}</span>
                  <span className="chain__detail">
                    <span>{c.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="agents__proof">
              <strong>{t.agents.proof}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agents;
