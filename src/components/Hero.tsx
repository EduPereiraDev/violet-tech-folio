import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Full Stack", "Front Stack", "Back Stack", "AI Stack", "Web Stack"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-dark">
      <div className="container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Desenvolvedor
          </h1>
          <div className="h-20 md:h-24 flex items-center justify-center mb-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground relative">
              <span className="relative inline-block min-w-[300px] md:min-w-[400px] text-center">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex items-center justify-center font-semibold"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -30 : 30,
                            opacity: 0,
                          }
                    }
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      duration: 0.4
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Eduardo Pereira, especialista em criar soluções digitais modernas e eficientes, 
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
              href="https://github.com/EduPereiraDev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-border rounded-full hover:border-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/eduardo-pereira-dos-santos-035311320" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-border rounded-full hover:border-primary hover:shadow-glow-primary transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:pereirassantosedu@gmail.com"
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