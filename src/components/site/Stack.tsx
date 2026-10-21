import { useLanguage } from "@/contexts/LanguageContext";

const Stack = () => {
  const { t } = useLanguage();

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="wrap stack">
        <div>
          <p className="kicker">{t.stack.kicker}</p>
          <h2 id="stack-title" className="section-title display">
            {t.stack.title}
          </h2>
          <dl className="stack__groups">
            {t.stack.groups.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="kicker">{t.certs.kicker}</p>
          <ul className="certs">
            {t.certs.main.map((c) => (
              <li className="cert" key={c.name}>
                {c.img ? (
                  <img src={c.img} alt="" width={68} height={68} loading="lazy" />
                ) : (
                  <span className="cert__mark" aria-hidden="true">
                    OCI
                  </span>
                )}
                <div>
                  <p className="cert__name">{c.name}</p>
                  <p className="cert__meta">
                    {c.issuer}, {c.date}
                    {c.href && (
                      <>
                        {" "}
                        <a href={c.href} target="_blank" rel="noopener noreferrer">
                          {t.certs.verify}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="certs__others">
            {t.certs.others.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <div className="langs">
            <h3>{t.stack.langs}</h3>
            {t.stack.langItems.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
