import { Home, User, Settings, Brain, Briefcase, Award, Languages, FolderOpen, Mail } from "lucide-react";
import { TubelightNavBar } from "@/components/ui/tubelight-navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const Navigation = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  const navItems = [
    { name: t.home, url: '#hero', icon: Home },
    { name: t.about, url: '#about', icon: User },
    { name: t.skills, url: '#skills', icon: Settings },
    { name: t.ai, url: '#ai', icon: Brain },
    { name: t.experience, url: '#experience', icon: Briefcase },
    { name: t.certificates, url: '#certificates', icon: Award },
    { name: t.languages, url: '#languages', icon: Languages },
    { name: t.projects, url: '#projects', icon: FolderOpen },
    { name: t.contact, url: '#contact', icon: Mail }
  ];

  return (
    <div className="relative">
      <TubelightNavBar items={navItems} />
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300 text-sm font-semibold text-primary"
        aria-label="Toggle language"
      >
        <span className="text-base">{language === "pt" ? "🇧🇷" : "🇺🇸"}</span>
        <span>{language === "pt" ? "PT" : "EN"}</span>
      </button>
    </div>
  );
};

export default Navigation;