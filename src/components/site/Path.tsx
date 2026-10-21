import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scene } from "@/lib/scene";

const Path = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (scene.reduced) {
        gsap.set(".timeline__fill", { scaleY: 1 });
        return;
      }
      // a linha do tempo se preenche junto com o scroll
      gsap.to(".timeline__fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: true },
      });
    },
    { scope: root },
  );

  const { education } = t.path;

  return (
    <section id="path" className="section" ref={root} aria-labelledby="path-title">
      <div className="wrap">
        <p className="kicker">{t.path.kicker}</p>
        <h2 id="path-title" className="section-title display">
          {t.path.title}
        </h2>
        <div className="timeline">
          <span className="timeline__fill" aria-hidden="true" />
          <ol className="timeline__list">
          {t.path.jobs.map((j, i) => (
            <li className={`stop${i === 0 ? " is-current" : ""}`} key={j.period}>
              <span className="stop__period">{j.period}</span>
              <div className="stop__body">
                <h3 className="stop__role">{j.role}</h3>
                <p className="stop__org">{j.org}</p>
                <ul className="stop__points">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="stop">
            <span className="stop__period">{education.period}</span>
            <div className="stop__body">
              <h3 className="stop__role">{education.role}</h3>
              <p className="stop__org">{education.org}</p>
              <ul className="stop__points">
                <li>{education.note}</li>
              </ul>
            </div>
          </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Path;
