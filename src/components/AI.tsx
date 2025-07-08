import { Card, CardContent } from "@/components/ui/card";
import { Brain, Cpu, Database, Zap } from "lucide-react";

const AI = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Desenvolvimento de modelos inteligentes para análise preditiva e automação de processos complexos."
    },
    {
      icon: Cpu,
      title: "Deep Learning",
      description: "Implementação de redes neurais profundas para reconhecimento de padrões e processamento de dados."
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Análise e visualização de dados para extrair insights valiosos e orientar decisões estratégicas."
    },
    {
      icon: Zap,
      title: "Automação IA",
      description: "Criação de soluções automatizadas que utilizam IA para otimizar fluxos de trabalho e produtividade."
    }
  ];

  return (
    <section id="ai" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Inteligência Artificial
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Especialização em tecnologias de IA e machine learning, criando soluções inteligentes 
              que transformam dados em valor e automatizam processos complexos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {aiFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:shadow-glow-card transition-all duration-300 hover:border-primary/50 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Card className="bg-gradient-primary/5 border-primary/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  Transformando o Futuro com IA
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A inteligência artificial não é apenas o futuro - é o presente. Utilizo as mais modernas 
                  tecnologias de IA para criar soluções que não apenas resolvem problemas atuais, mas 
                  antecipam necessidades futuras, proporcionando vantagem competitiva real para negócios e projetos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AI;