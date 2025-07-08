import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-dark">
      <div className="container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Desenvolvedor
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-foreground">
            Full Stack
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Especialista em criar soluções digitais modernas e eficientes, 
            com foco em desenvolvimento web, inteligência artificial e experiência do usuário.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8 py-6"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Projetos
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary hover:bg-primary/10 text-lg px-8 py-6"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Entre em Contato
            </Button>
          </div>
          
          <div className="flex justify-center gap-6 mb-16">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-border rounded-full hover:border-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-border rounded-full hover:border-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:contato@email.com"
              className="p-3 border border-border rounded-full hover:border-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
};

export default Hero;