import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const skills = [
    {
      category: "Linguagens de Programação",
      items: [
        { name: "TypeScript", level: 95, color: "from-blue-500 to-blue-600" },
        { name: "Python", level: 90, color: "from-yellow-500 to-yellow-600" },
        { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-500" },
        { name: "C#", level: 85, color: "from-purple-500 to-purple-600" },
        { name: ".NET", level: 85, color: "from-purple-600 to-blue-600" }
      ]
    },
    {
      category: "Tecnologias & Ferramentas",
      items: [
        { name: "React", level: 95, color: "from-cyan-400 to-cyan-500" },
        { name: "Docker", level: 80, color: "from-blue-600 to-blue-700" },
        { name: "Git", level: 90, color: "from-orange-500 to-red-500" },
        { name: "GCP", level: 75, color: "from-green-500 to-blue-500" }
      ]
    },
    {
      category: "Tecnologias Web",
      items: [
        { name: "HTML", level: 95, color: "from-orange-500 to-orange-600" },
        { name: "CSS", level: 90, color: "from-blue-500 to-blue-600" }
      ]
    }
  ];

  const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
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
                  <div className="space-y-4">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <SkillBar 
                        key={skillIndex}
                        name={skill.name}
                        level={skill.level}
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