import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero -z-10" />
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Prospectez les{" "}
              <span className="text-primary">
                bonnes personnes au bon moment
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Prospectio vous aide à identifier et qualifier les personnes, 
              à les contacter efficacement et de manière personnalisée.
              Le tout au moment adéquat pour maximiser vos chances de conversion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = 'https://dev.prospectio.fr'}>
                Démarrer ma prospection{" "}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 gradient-accent blur-3xl opacity-20 rounded-3xl" />
              <img
                src={heroImage}
                alt="Professionnels collaborant"
                className="relative rounded-2xl shadow-medium w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
