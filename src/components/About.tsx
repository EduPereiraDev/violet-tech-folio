import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Globe, Smartphone } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Desenvolvimento Full Stack",
      description: "Experiência completa em front-end e back-end, criando aplicações robustas e escaláveis."
    },
    {
      icon: Database,
      title: "Banco de Dados",
      description: "Expertise em diferentes tipos de bancos de dados, desde SQL até NoSQL e soluções em nuvem."
    },
    {
      icon: Globe,
      title: "Tecnologias Web",
      description: "Domínio das tecnologias web modernas para criar experiências digitais excepcionais."
    },
    {
      icon: Smartphone,
      title: "Aplicações Responsivas",
      description: "Desenvolvimento de interfaces que funcionam perfeitamente em todos os dispositivos."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de soluções inovadoras 
              e eficientes. Com anos de experiência em desenvolvimento de software, especializo-me em 
              criar aplicações que combinam performance, usabilidade e design moderno.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:shadow-glow-card transition-all duration-300 hover:border-primary/50 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;