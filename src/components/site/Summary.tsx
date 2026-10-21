import { Fragment, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scene } from "@/lib/scene";

const Summary = () => {
  const { t, language } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (scene.reduced) return;
      // a frase acende palavra por palavra conforme o scroll
      gsap.fromTo(
        ".summary__lead .w",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ".summary__lead", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from(".readout__item", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".readout", start: "top 85%" },
      });
    },
    { scope: root, dependencies: [language], revertOnUpdate: true },
  );

  return (
    <section className="section" ref={root} aria-label={t.nav.about}>
      <div className="wrap">
        <p className="summary__lead">
          {t.summary.lead.split(" ").map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              <span className="w">{w}</span>{" "}
            </Fragment>
          ))}
        </p>
        <p className="summary__body">{t.summary.body}</p>
        <dl className="readout">
          {t.summary.stats.map((s) => (
            <div className="readout__item" key={s.label}>
              <dt className="readout__value">{s.value}</dt>
              <dd className="readout__label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Summary;
