import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  FileCode, 
  Component, 
  Container, 
  GitBranch, 
  Cloud, 
  FileText, 
  Palette,
  Braces,
  Database
} from "lucide-react";

const Skills = () => {
  const skills = [
    {
      category: "Linguagens de Programação",
      items: [
        { name: "TypeScript", icon: Code2, color: "text-blue-500" },
        { name: "Python", icon: FileCode, color: "text-yellow-500" },
        { name: "JavaScript", icon: Braces, color: "text-yellow-400" },
        { name: "C#", icon: Code2, color: "text-purple-500" },
        { name: ".NET", icon: Database, color: "text-purple-600" }
      ]
    },
    {
      category: "Tecnologias & Ferramentas",
      items: [
        { name: "React", icon: Component, color: "text-cyan-400" },
        { name: "Docker", icon: Container, color: "text-blue-600" },
        { name: "Git", icon: GitBranch, color: "text-orange-500" },
        { name: "GCP", icon: Cloud, color: "text-green-500" }
      ]
    },
    {
      category: "Tecnologias Web",
      items: [
        { name: "HTML", icon: FileText, color: "text-orange-500" },
        { name: "CSS", icon: Palette, color: "text-blue-500" }
      ]
    }
  ];

  const SkillIcon = ({ name, icon: IconComponent, color }: { name: string; icon: any; color: string }) => (
    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
      <div className="p-4 bg-card border border-border rounded-xl mb-3 group-hover:border-primary/50 group-hover:shadow-glow-primary/20 transition-all duration-300">
        <IconComponent className={`w-8 h-8 ${color}`} />
      </div>
      <span className="text-sm font-medium text-foreground text-center">{name}</span>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-tight bg-gradient-primary bg-clip-text text-transparent">
              Skills & Tecnologias
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Conjunto abrangente de tecnologias e linguagens que domino para criar soluções completas e modernas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:shadow-glow-card transition-all duration-300 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-center text-primary">
                    {skillGroup.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-6 justify-items-center">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <SkillIcon 
                        key={skillIndex}
                        name={skill.name}
                        icon={skill.icon}
                        color={skill.color}
                      />
                    ))}
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

export default Skills;