import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const Certificates = () => {
  const { language } = useLanguage();
  const t = translations[language].certificates;
  const renderIcon = (icon: string) => {
    if (icon.startsWith('/')) {
      return (
        <div className="p-2 rounded-lg border-2 border-purple-500/30 bg-purple-500/5">
          <img 
            src={icon} 
            alt="Certificate badge" 
            className="w-14 h-14 object-contain"
          />
        </div>
      );
    }
    return (
      <div className="p-2 rounded-lg border-2 border-purple-500/30 bg-purple-500/10">
        <Award className="h-10 w-10 text-purple-400" />
      </div>
    );
  };

  const certificates = [
    {
      name: "AWS Certified Security – Specialty",
      issuer: "Amazon Web Services",
      category: "Security — Advanced",
      description: t.items[0].description,
      icon: "/aws-security-specialty.png",
      date: t.items[0].date,
      expires: t.items[0].expires,
      link: "https://www.credly.com/badges/32b82b1c-79b5-4078-9eec-f1a16cabc0be/linked_in"
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      category: "Developer — Intermediate",
      description: t.items[1].description,
      icon: "/aws-developer-associate.png",
      date: t.items[1].date,
      expires: t.items[1].expires,
      link: "https://www.credly.com/badges/37cdb65e-9600-4dd4-a9b1-ab5a5dc38f67/linked_in"
    },
    {
      name: "Monday Partner Admin",
      issuer: "Monday.com",
      category: "Project Management",
      description: t.items[2].description,
      icon: "/Property-1partner-admin-Property-2desktop.png",
      date: null,
      expires: null,
      link: null
    },
    {
      name: "Monday CRM",
      issuer: "Monday.com",
      category: "CRM & Sales",
      description: t.items[3].description,
      icon: "/CRM-1024x1024-1.png",
      date: null,
      expires: null,
      link: null
    }
  ];

  return (
    <section id="certificates" className="py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {certificates.map((cert, index) => (
            <Card 
              key={index} 
              className={`w-full max-w-sm group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-500/30 bg-card/50 backdrop-blur-sm ${
                cert.link ? 'border-purple-500/20' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center">{renderIcon(cert.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <Award className="h-5 w-5 text-purple-400 mt-1" />
                    </div>
                    <Badge variant="outline" className="text-xs mb-3 border-purple-500/30 text-purple-300">
                      {cert.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-purple-300 transition-colors">
                  {cert.name}
                </h3>
                
                <p className="text-sm text-purple-300 font-medium mb-3">
                  {cert.issuer}
                </p>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                  {cert.date && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{cert.date} — {t.valid_until} {cert.expires}</span>
                    </div>
                  )}
                  {!cert.date && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{t.certified}</span>
                    </div>
                  )}
                  {cert.link && (
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>{t.verify}</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Award className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              {t.footer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
