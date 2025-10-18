import { Briefcase, Mail, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Prospectio</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Votre assistant de prospection intelligent pour identifier et contacter les bonnes personnes.
            </p>
            {/* <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
            </div> */}
          </div>
          
          {/* <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Tarifs</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Démo</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">FAQ</a></li>
            </ul>
          </div> */}
          
          {/* <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">À propos</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Carrières</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
            </ul>
          </div> */}
          
          {/* <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Confidentialité</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Conditions</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">RGPD</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Cookies</a></li>
            </ul>
          </div> */}
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Prospectio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
