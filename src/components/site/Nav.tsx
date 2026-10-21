import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToId } from "@/lib/smooth-scroll";

const sections = ["agents", "work", "path", "stack", "contact"] as const;

const Nav = () => {
  const { t, toggleLanguage } = useLanguage();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header className={`nav${solid ? " is-solid" : ""}`}>
      <a className="skip" href="#content">
        {t.nav.skip}
      </a>
      <nav className="wrap nav__bar" aria-label={t.nav.navLabel}>
        <a className="nav__brand" href="#top" onClick={go("top")}>
          Eduardo Pereira<span>.</span>
        </a>
        <ul className="nav__links">
          {sections.map((id) => (
            <li key={id}>
              <a className="nav__link" href={`#${id}`} onClick={go(id)}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__actions">
          <button className="nav__lang" type="button" onClick={toggleLanguage} aria-label={t.nav.switchLabel}>
            {t.nav.switchTo}
          </button>
          <a className="btn btn--amber btn--sm" href="#contact" onClick={go("contact")}>
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
