import { Target, Zap, Bot, Users, Building2, UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "Ciblage Intelligent",
    description: "Notre application identifie les offres d'emploi récentes pertinentes selon vos profils.",
  },
  {
    icon: Building2,
    title: "Informations Entreprises",
    description: "Récupérez automatiquement les données clés des entreprises : secteur, taille, localisation et actualités.",
  },
  {
    icon: Users,
    title: "Enrichissement Contact",
    description: "Trouvez les bons décideurs avec leurs coordonnées professionnelles vérifiées.",
  },
  {
    icon: Zap,
    title: "Aide à la prospection",
    description: "Personnalisez vos messages et approches pour chaque prospect.",
  },
  {
    icon: UserCog,
    title: "Gestion de Profil",
    description: "Optimisez et gérez facilement votre profil professionnel pour attirer les bonnes opportunités.",
  },
  {
    icon: Bot,
    title: "Coach IA",
    description: "Un assistant IA intégré pour vous aider à chaque étape. De l'optimisation de votre profil à la rédaction de messages percutants.",
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Fonctionnalités <span className="text-primary">Puissantes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tous les outils nécessaires pour transformer votre prospection commerciale
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-medium transition-smooth group cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
