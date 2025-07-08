import { Home, User, Settings, Brain, Briefcase, Award, Languages, FolderOpen, Mail } from "lucide-react";
import { TubelightNavBar } from "@/components/ui/tubelight-navbar";

const Navigation = () => {
  const navItems = [
    { name: 'Início', url: '#hero', icon: Home },
    { name: 'Sobre', url: '#about', icon: User },
    { name: 'Skills', url: '#skills', icon: Settings },
    { name: 'IA', url: '#ai', icon: Brain },
    { name: 'Experiência', url: '#experience', icon: Briefcase },
    { name: 'Certificados', url: '#certificates', icon: Award },
    { name: 'Idiomas', url: '#languages', icon: Languages },
    { name: 'Projetos', url: '#projects', icon: FolderOpen },
    { name: 'Contato', url: '#contact', icon: Mail }
  ];

  return (
    <TubelightNavBar items={navItems} />
  );
};

export default Navigation;