import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Content, type Lang } from "@/content";

interface LanguageContextType {
  language: Lang;
  t: Content;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "lang";

const initialLanguage = (): Lang => {
  // ?lang=en permite mandar o link já em inglês para recrutadores de fora
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "pt" || fromUrl === "en") return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // storage bloqueado: segue para o idioma do navegador
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
};

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  t: content.pt,
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Lang>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = content[language].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content[language].meta.description);
    // textos de tamanhos diferentes mudam a altura da página: recalcula os pontos de scroll
    requestAnimationFrame(() => ScrollTrigger.refresh());
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // sem persistência, sem problema
    }
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === "pt" ? "en" : "pt"));

  return (
    <LanguageContext.Provider value={{ language, t: content[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
