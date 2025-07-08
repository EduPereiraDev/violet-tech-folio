import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe, Star, MessageCircle } from "lucide-react";

const Languages = () => {
  const languages = [
    {
      name: "Português",
      level: "Nativo",
      proficiency: 100,
      flag: "🇧🇷",
      description: "Idioma nativo com domínio completo em comunicação oral, escrita e técnica.",
      skills: ["Comunicação Técnica", "Documentação", "Apresentações", "Redação"]
    },
    {
      name: "Inglês", 
      level: "Intermediário/Avançado",
      proficiency: 70,
      flag: "🇺🇸",
      description: "Comunicação fluente em contextos profissionais e técnicos, com foco em desenvolvimento de software.",
      skills: ["Technical Writing", "Code Documentation", "Meetings", "API Documentation"]
    },
    {
      name: "Espanhol",
      level: "Intermediário", 
      proficiency: 50,
      flag: "🇪🇸",
      description: "Compreensão e escrita em contextos técnicos e comerciais, expandindo oportunidades de mercado.",
      skills: ["Documentación Técnica", "Comprensión Textos", "Soporte Escrito", "Traducción"]
    }
  ];

  return (
    <section id="languages" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Idiomas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comunicação multilíngue para um mundo conectado. Fluência que quebra barreiras e conecta culturas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-500/30 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-purple-300 transition-colors">
                    {lang.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">
                      {lang.level}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Proficiência</span>
                    <span className="text-sm font-bold text-purple-300">{lang.proficiency}%</span>
                  </div>
                  <Progress 
                    value={lang.proficiency} 
                    className="h-2 bg-muted"
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {lang.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">Competências</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {lang.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1.5 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-center min-h-[28px] flex items-center justify-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>Comunicação Global</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Globe className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Conectando pessoas e tecnologias através da comunicação
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
