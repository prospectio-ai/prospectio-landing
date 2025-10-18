import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero -z-10" />
      
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Prêt à booster votre{" "}
            <span className="text-primary">
              prospection
            </span>
            ?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rejoignez les freelances qui automatisent leur prospection avec Prospectio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group">
              Démarrer gratuitement (Bientôt disponible)
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Réserver une démo (Bientôt disponible)
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            ✓ Sans engagement • ✓ Essai gratuit 14 jours • ✓ Aucune carte bancaire requise
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
