import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, Brain, Languages } from "lucide-react";

const Certificates = () => {
  const renderIcon = (icon: string) => {
    if (icon.startsWith('/')) {
      // É uma imagem
      return (
        <div className="p-2 rounded-lg border-2 border-purple-500/30 bg-purple-500/5">
          <img 
            src={icon} 
            alt="Certificate badge" 
            className="w-10 h-10 object-contain rounded-md"
          />
        </div>
      );
    } else {
      // É um ícone do Lucide
      return (
        <div className="p-2 rounded-lg border-2 border-purple-500/30 bg-purple-500/10">
          {icon === 'brain' ? (
            <Brain className="h-10 w-10 text-purple-400" />
          ) : (
            <Languages className="h-10 w-10 text-purple-400" />
          )}
        </div>
      );
    }
  };

  const certificates = [
    {
      name: "Google Workspace Sales Credential",
      issuer: "Google",
      category: "Cloud & Productivity",
      description: "Credencial de vendas para Google Workspace, demonstrando conhecimento em soluções de produtividade empresarial.",
      icon: "/pvg6p63tn9s4i3s3vsr8vnozu7ns.webp"
    },
    {
      name: "Monday Partner Admin",
      issuer: "Monday.com",
      category: "Project Management",
      description: "Certificação em administração de parceiros Monday.com, focada em gestão de projetos e workflows.",
      icon: "/Property-1partner-admin-Property-2desktop.png"
    },
    {
      name: "Monday CRM",
      issuer: "Monday.com", 
      category: "CRM & Sales",
      description: "Especialização em Monday CRM para gestão de relacionamento com clientes e processos de vendas.",
      icon: "/CRM-1024x1024-1.png"
    },
    {
      name: "Tech Week - IA",
      issuer: "Tech Week",
      category: "Artificial Intelligence",
      description: "Participação em evento especializado em Inteligência Artificial e suas aplicações tecnológicas.",
      icon: "brain"
    },
    {
      name: "Small Talk 2 Me - English",
      issuer: "Small Talk 2 Me",
      category: "Language Learning",
      description: "Certificação em inglês focada em conversação e comunicação efetiva no ambiente profissional.",
      icon: "languages"
    }
  ];

  return (
    <section id="certificates" className="py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certificações
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Certificações e qualificações que validam minha expertise em diferentes áreas da tecnologia e negócios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {certificates.map((cert, index) => (
            <Card 
              key={index} 
              className="w-full max-w-sm group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-500/30 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center">{renderIcon(cert.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <Award className="h-5 w-5 text-purple-400 mt-1" />
                    </div>
                    <Badge variant="outline" className="text-xs mb-3 border-purple-500/30 text-purple-300">
                      {cert.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-purple-300 transition-colors">
                  {cert.name}
                </h3>
                
                <p className="text-sm text-purple-300 font-medium mb-3">
                  {cert.issuer}
                </p>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Certificado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Award className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Sempre buscando novas certificações e conhecimentos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
