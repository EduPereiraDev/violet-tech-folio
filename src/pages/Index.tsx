import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import AI from "@/components/AI";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Languages from "@/components/Languages";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <AI />
      <Experience />
      <Certificates />
      <Languages />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
