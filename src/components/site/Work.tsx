import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scene } from "@/lib/scene";

const Work = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (scene.reduced) return;
      // cada strip entra no painel como uma faixa de controle sendo encaixada
      gsap.utils.toArray<HTMLElement>(".strip").forEach((strip) => {
        gsap.from(strip, {
          xPercent: 14,
          rotate: 0.8,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: strip, start: "top 90%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".build").forEach((row) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" className="section" ref={root} aria-labelledby="work-title">
      <div className="wrap">
        <div className="work__head">
          <div>
            <p className="kicker">{t.work.kicker}</p>
            <h2 id="work-title" className="section-title display">
              {t.work.title}
            </h2>
          </div>
          <p className="work__intro">{t.work.intro}</p>
        </div>

        <div className="board">
          {t.work.strips.map((s) => (
            <article className="strip" data-status={s.status} key={s.code} aria-labelledby={`strip-${s.code}`}>
              <div className="strip__code">
                <span className="strip__callsign">{s.code}</span>
                <span className="strip__status">{s.statusLabel}</span>
              </div>
              <div>
                <h3 id={`strip-${s.code}`} className="strip__title">
                  {s.title}
                </h3>
                <p className="strip__client">{s.client}</p>
                <p className="strip__summary">{s.summary}</p>
                <ul className="strip__stack">
                  {s.stack.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="strip__route">
                <div>
                  <span className="strip__label">{t.work.from}</span>
                  <p className="from">{s.from}</p>
                </div>
                <div>
                  <span className="strip__label">{t.work.to}</span>
                  <p className="to">{s.to}</p>
                </div>
                <div className="strip__role">
                  <span className="strip__label">{t.work.role}</span>
                  <p>{s.role}</p>
                </div>
              </div>
              <dl className="strip__metrics">
                {s.metrics.map((m) => (
                  <div className="strip__metric" key={m.label}>
                    <dt>
                      <b>{m.value}</b>
                    </dt>
                    <dd>
                      <span>{m.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="section" style={{ paddingBottom: 0 }}>
          <p className="kicker">{t.builds.kicker}</p>
          <h2 className="section-title display">{t.builds.title}</h2>
          <ul className="builds">
            {t.builds.items.map((b) => (
              <li className="build" key={b.title}>
                <div>
                  <h3 className="build__title">{b.title}</h3>
                  <p className="build__tag">{b.tag}</p>
                </div>
                <div>
                  <p className="build__text">{b.text}</p>
                  <p className="build__meta">{b.metrics}</p>
                  {b.href && (
                    <a className="build__link" href={b.href} target="_blank" rel="noopener noreferrer">
                      {t.builds.viewCode}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Work;
