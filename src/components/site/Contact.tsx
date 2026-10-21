import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Copy, Github, Linkedin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { links } from "@/content";
import { applyCanvasOpacity, scene } from "@/lib/scene";
import { scrollToId } from "@/lib/smooth-scroll";

const Contact = ({ onSceneVisible }: { onSceneVisible: (visible: boolean) => void }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // fim da viagem: a cidade volta embaixo e o voo desacelera até pousar
      gsap.to(scene, {
        landing: 1,
        ease: "none",
        onUpdate: applyCanvasOpacity,
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "top 15%",
          scrub: true,
          onEnter: () => onSceneVisible(true),
          onLeaveBack: () => onSceneVisible(false),
        },
      });
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="contact" className="contact" ref={root} aria-labelledby="contact-title">
      <div className="wrap">
        <p className="kicker">{t.contact.kicker}</p>
        <h2 id="contact-title" className="contact__title display">
          {t.contact.title}
        </h2>
        <p className="contact__text">{t.contact.text}</p>
        <a className="contact__email" href={`mailto:${links.email}`}>
          {links.email.split("@")[0]}@
          <wbr />
          {links.email.split("@")[1]}
        </a>
        <div className="contact__row">
          <button className="btn btn--amber" type="button" onClick={copy} aria-live="polite">
            {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <a className="btn btn--ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} aria-hidden="true" />
            {t.contact.linkedin}
          </a>
          <a className="btn btn--ghost" href={links.github} target="_blank" rel="noopener noreferrer">
            <Github size={18} aria-hidden="true" />
            {t.contact.github}
          </a>
          <a className="btn btn--ghost" href={links.phoneHref} aria-label={`${t.contact.phone} ${links.phone}`}>
            <Phone size={18} aria-hidden="true" />
            {links.phone}
          </a>
        </div>

        <footer className="footer" style={{ marginTop: "clamp(5rem, 14vh, 9rem)" }}>
          <span>© 2026 Eduardo Pereira dos Santos. {t.contact.location}.</span>
          <span>{t.footer.made}</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
          >
            {t.footer.top}
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
