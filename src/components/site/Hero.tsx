import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scene } from "@/lib/scene";
import { scrollToId } from "@/lib/smooth-scroll";

const Hero = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // o scroll do hero acelera o voo e afasta a constelação
      gsap.to(scene, {
        hero: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      if (scene.reduced) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".hero__line > span", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.15)
        .from(".hero__role", { opacity: 0, y: 16, duration: 1 }, 0.35)
        .from(".hero__headline, .hero__facts li, .hero__cta > *", { opacity: 0, y: 24, duration: 1.1, stagger: 0.06 }, 0.7)
        .from(".hero__scroll", { opacity: 0, duration: 1 }, 1.3);

      gsap.to(".hero__inner", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="top" className="hero" ref={root}>
      <div className="wrap hero__inner">
        <p className="hero__role">{t.hero.role}</p>
        <h1 className="hero__name display">
          <span className="hero__line">
            <span>{t.hero.first}</span>
          </span>
          <span className="hero__line hero__line--indent">
            <span>{t.hero.last}</span>
          </span>
        </h1>
        <p className="hero__headline">{t.hero.headline}</p>
        <ul className="hero__facts">
          {t.hero.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="hero__cta">
          <a
            className="btn btn--amber"
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("work");
            }}
          >
            {t.hero.ctaWork}
          </a>
          <a
            className="btn btn--ghost"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
          >
            {t.hero.ctaContact}
          </a>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>{t.hero.scroll}</span>
        <i />
      </div>
    </section>
  );
};

export default Hero;
