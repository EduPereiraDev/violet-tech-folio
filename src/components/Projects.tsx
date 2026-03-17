import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code, Database, Cpu } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Financial Control - Controle Financeiro Pessoal",
      description: "Sistema completo de controle financeiro com multi-usuário, relatórios por período (diário a anual), gráficos interativos e gestão de categorias. Arquitetura Clean com .NET 8 no backend e React no frontend.",
      technologies: ["React", "TypeScript", ".NET 8", "PostgreSQL", "Docker"],
      category: "Full Stack",
      icon: Database,
      github: "https://github.com/EduPereiraDev/financial-project",
      featured: true
    },
    {
      title: "Expert Skills - Plataforma SaaS de Análise",
      description: "Plataforma SaaS com análise automatizada via IA, dashboard em tempo real, gestão inteligente e sistema de assinaturas. Monorepo com Turborepo, Next.js 14 no frontend e NestJS no backend.",
      technologies: ["Next.js", "TypeScript", "NestJS", "Prisma", "OpenAI"],
      category: "Full Stack + IA",
      icon: Cpu,
      github: "https://github.com/EduPereiraDev/expertskill",
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-tight bg-gradient-primary bg-clip-text text-transparent">
              Portfólio de Projetos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Seleção dos meus projetos mais relevantes, demonstrando expertise em desenvolvimento 
              full stack, inteligência artificial e soluções inovadoras.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`bg-card border-border hover:shadow-glow-card transition-all duration-300 hover:border-primary/50 group ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full hover:bg-primary/10 border-primary/30"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver Código
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;