import { FileText, Sparkles, Search, Users } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Définissez vos critères",
    description: "Renseignez votre profil, vos critères de qualification.",
    step: "01",
  },
  {
    icon: Search,
    title: "Recherches d'offres récentes",
    description: "Identification des offres récentes et pertinentes.",
    step: "02",
  },
  {
    icon: Users,
    title: "Recherche de prospects",
    description: "Identification des prospects correspondant à vos critères.",
    step: "03",
  },
  {
    icon: Sparkles,
    title: "Aide à la prospection par IA",
    description: "Personnalisation des messages et approches pour chaque prospect. Demandez conseil auprès de notre assistant IA intégré.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Comment ça <span className="text-primary">marche</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trois étapes simples pour automatiser votre prospection commerciale
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary opacity-20" style={{ width: '80%', marginLeft: '10%' }} />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center shadow-medium z-10 relative">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm text-primary z-20">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground max-w-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
