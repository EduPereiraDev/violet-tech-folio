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
      // o letreiro "liga" piscando quando a foto entra, como neon acendendo
      gsap
        .timeline({ scrollTrigger: { trigger: ".portrait", start: "top 70%" } })
        .fromTo(".portrait", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo(
          ".portrait img",
          { filter: "brightness(0.18) saturate(0.4)" },
          {
            keyframes: [
              { filter: "brightness(0.9) saturate(1.1)", duration: 0.07 },
              { filter: "brightness(0.25) saturate(0.5)", duration: 0.09 },
              { filter: "brightness(1) saturate(1.1)", duration: 0.06 },
              { filter: "brightness(0.55) saturate(0.8)", duration: 0.12 },
              { filter: "brightness(1) saturate(1)", duration: 0.5 },
            ],
          },
          0.1,
        )
        .fromTo(".summary-stage", { "--glow": 0 }, { "--glow": 1, duration: 1.2, ease: "power2.out" }, 0.3);
      // a imagem desliza mais devagar que a página
      gsap.fromTo(
        ".portrait img",
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 4,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: ".summary-stage", start: "top bottom", end: "bottom top", scrub: true },
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
    <section className="summary-section" ref={root} aria-label={t.nav.about}>
      <div className="summary-stage">
        <figure className="portrait">
          <img
            src="/eduardo-1200.jpg"
            srcSet="/eduardo-720.jpg 720w, /eduardo-1200.jpg 1200w"
            sizes="(max-width: 860px) 100vw, min(60vw, 1030px)"
            width={1200}
            height={1501}
            alt={t.summary.photoAlt}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="wrap">
          <div className="summary__text">
            <p className="summary__lead">
              {t.summary.lead.split(" ").map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  <span className="w">{w}</span>{" "}
                </Fragment>
              ))}
            </p>
            <p className="summary__body">{t.summary.body}</p>
          </div>
        </div>
      </div>
      <div className="wrap">
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
