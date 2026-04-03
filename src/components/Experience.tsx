import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, ArrowRight, Code, TrendingUp, Monitor, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;

  const experiences = [
    {
      company: "ALEST",
      position: t.jobs[0].position,
      type: "CLT",
      period: t.jobs[0].period,
      location: "São Paulo, BR",
      status: "current",
      description: t.jobs[0].description,
      technologies: ["React", "Vue.js", "Angular", "TypeScript", "Node.js", "NestJS", "Python", "FastAPI", "C#", ".NET", "PostgreSQL", "MongoDB", "Docker", "AWS", "GCP", "Azure"],
      achievements: t.jobs[0].achievements,
      icon: "monitor"
    },
    {
      company: "VIDA + SAÚDE",
      position: t.jobs[1].position,
      type: "Horista",
      period: t.jobs[1].period,
      location: "Alfenas, MG",
      status: "completed",
      description: t.jobs[1].description,
      technologies: ["Excel", "Microsoft 365", "Sistemas de Faturamento", "Análise de Dados"],
      achievements: t.jobs[1].achievements,
      icon: "chart"
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-purple-500 border-2 border-background shadow-lg hidden md:block">
                  {exp.status === 'current' && (
                    <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping"></div>
                  )}
                </div>

                <Card className={`ml-0 md:ml-20 group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-500/30 ${exp.status === 'current' ? 'border-purple-500/50 bg-purple-500/5' : 'bg-card/50'} backdrop-blur-sm`}>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-purple-400 p-2 rounded-lg bg-purple-500/10">
                            {exp.icon === "monitor" ? <Monitor className="h-6 w-6" /> : <BarChart3 className="h-6 w-6" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-foreground group-hover:text-purple-300 transition-colors">
                                {exp.position}
                              </h3>
                              {exp.status === 'current' && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  {t.current_badge}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4 text-purple-400" />
                                <span className="font-medium text-purple-300">{exp.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{exp.location}</span>
                              </div>
                              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                                {exp.type}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="h-4 w-4 text-purple-400" />
                              <span className="text-sm font-medium text-purple-300">{t.achievements_label}</span>
                            </div>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <ArrowRight className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Code className="h-4 w-4 text-purple-400" />
                              <span className="text-sm font-medium text-purple-300">{t.tech_label}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Briefcase className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              {t.footer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
