import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  FileCode, 
  Component, 
  Container, 
  GitBranch, 
  Cloud, 
  Braces,
  Database,
  Server,
  Brain,
  Box,
  Layers,
  Globe,
  Shield,
  Cpu,
  Workflow,
  Terminal,
  Blocks,
  type LucideIcon
} from "lucide-react";

const Skills = () => {
  const skills = [
    {
      category: "Linguagens",
      items: [
        { name: "TypeScript", icon: Code2, color: "text-blue-500" },
        { name: "JavaScript", icon: Braces, color: "text-yellow-400" },
        { name: "Python", icon: FileCode, color: "text-yellow-500" },
        { name: "C#", icon: Code2, color: "text-purple-500" },
        { name: "SQL", icon: Database, color: "text-sky-400" },
        { name: "HTML/CSS", icon: Globe, color: "text-orange-500" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", icon: Component, color: "text-cyan-400" },
        { name: "Vue.js", icon: Layers, color: "text-emerald-500" },
        { name: "Angular", icon: Shield, color: "text-red-500" },
        { name: "Next.js", icon: Blocks, color: "text-white" },
        { name: "Tailwind CSS", icon: Layers, color: "text-sky-400" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: Server, color: "text-green-500" },
        { name: "NestJS", icon: Box, color: "text-red-400" },
        { name: "FastAPI", icon: Cpu, color: "text-teal-400" },
        { name: "Flask", icon: Terminal, color: "text-gray-300" },
        { name: ".NET", icon: Code2, color: "text-purple-600" }
      ]
    },
    {
      category: "Banco de Dados",
      items: [
        { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
        { name: "MongoDB", icon: Database, color: "text-green-500" },
        { name: "Supabase", icon: Database, color: "text-emerald-400" },
        { name: "Neo4j", icon: Workflow, color: "text-sky-300" }
      ]
    },
    {
      category: "DevOps & Cloud",
      items: [
        { name: "Docker", icon: Container, color: "text-blue-500" },
        { name: "Kubernetes", icon: Box, color: "text-blue-400" },
        { name: "AWS", icon: Cloud, color: "text-orange-400" },
        { name: "GCP", icon: Cloud, color: "text-green-400" },
        { name: "Azure", icon: Cloud, color: "text-sky-500" },
        { name: "Git", icon: GitBranch, color: "text-orange-500" }
      ]
    },
    {
      category: "IA & Automação",
      items: [
        { name: "Google Gemini", icon: Brain, color: "text-blue-400" },
        { name: "AI Agents", icon: Cpu, color: "text-purple-400" },
        { name: "OpenAI", icon: Brain, color: "text-emerald-400" },
        { name: "Automações", icon: Workflow, color: "text-pink-400" }
      ]
    }
  ];

  const SkillIcon = ({ name, icon: IconComponent, color }: { name: string; icon: LucideIcon; color: string }) => (
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
              Stack completa construída em projetos reais — do frontend ao deploy em cloud, passando por IA e automação.
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