import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "2",
    label: "Base de données",
    description: "Offres d'emploi analysées",
  },
  {
    value: "5h",
    label: "Gagnées par semaine",
    description: "En automatisation",
  },
  {
    value: "3x",
    label: "Plus de réponses",
    description: "Qu'avec la prospection manuelle",
  },
  {
    value: "10+",
    label: "Modéles d'IA",
    description: "A votre disposition",
  },
];

const Stats = () => {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Des résultats <span className="text-primary">concrets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre plateforme délivre des résultats mesurables pour accélérer votre croissance commerciale
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:shadow-soft transition-smooth text-center">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
