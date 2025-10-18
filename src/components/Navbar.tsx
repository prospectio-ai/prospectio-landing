import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/prospectio-logo.png";


const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
              <img 
                src={logo} 
                alt="Prospectio Logo" 
                className="h-14 w-14 -mt-4"
              />
              <span className="text-xl font-bold">Prospectio</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Comment ça marche
            </a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Avantages
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Connexion
            </Button>
            <Button variant="hero" size="sm">
              Essai gratuit
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
