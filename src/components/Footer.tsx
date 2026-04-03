import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-gradient-dark border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                {t.tagline}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            </div>
            
            {/* Links Rápidos */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t.nav_title}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t.nav_links.about}
                  </a>
                </li>
                <li>
                  <a 
                    href="#skills" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a 
                    href="#ai" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t.nav_links.ai}
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t.nav_links.projects}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t.nav_links.contact}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Redes Sociais */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t.social_title}
              </h4>
              <div className="flex gap-4 mb-4">
                <a 
                  href="https://github.com/EduPereiraDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-xl hover:bg-primary/10 hover:border-primary border border-transparent transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/eduardo-pereira-dos-santos-035311320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-xl hover:bg-primary/10 hover:border-primary border border-transparent transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:pereirassantosedu@gmail.com"
                  className="p-3 bg-secondary rounded-xl hover:bg-primary/10 hover:border-primary border border-transparent transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.social_text}
              </p>
            </div>
          </div>
          
          {/* Linha Divisória */}
          <div className="border-t border-border pt-8">
            <div className="flex justify-center items-center">
              <p className="text-muted-foreground text-sm">
                {t.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;