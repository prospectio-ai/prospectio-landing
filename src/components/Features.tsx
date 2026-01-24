import { Target, Zap, Bot, Users, Building2, UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Target,
    title: "Ciblage Intelligent",
    description:
      "Notre application identifie les offres d'emploi recentes pertinentes selon vos profils.",
  },
  {
    icon: Building2,
    title: "Informations Entreprises",
    description:
      "Recuperez automatiquement les donnees cles des entreprises : secteur, taille, localisation et actualites.",
  },
  {
    icon: Users,
    title: "Enrichissement Contact",
    description:
      "Trouvez les bons decideurs avec leurs coordonnees professionnelles verifiees.",
  },
  {
    icon: Zap,
    title: "Aide a la prospection",
    description:
      "Personnalisez vos messages et approches pour chaque prospect.",
  },
  {
    icon: UserCog,
    title: "Gestion de Profil",
    description:
      "Optimisez et gerez facilement votre profil professionnel pour attirer les bonnes opportunites.",
  },
  {
    icon: Bot,
    title: "Coach IA",
    description:
      "Un assistant IA integre pour vous aider a chaque etape. De l'optimisation de votre profil a la redaction de messages percutants.",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const Icon = feature.icon;
  const tilt = useTiltEffect({ maxTilt: 8, scale: 1.02 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        ref={tilt.ref as React.RefObject<HTMLDivElement>}
        style={tilt.style}
        onMouseEnter={tilt.onMouseEnter}
        onMouseLeave={tilt.onMouseLeave}
        onMouseMove={tilt.onMouseMove}
        className="border-border hover:shadow-medium transition-smooth group cursor-pointer h-full relative overflow-hidden"
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        <CardContent className="pt-6 relative z-10">
          {/* Animated icon container */}
          <motion.div
            className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 relative"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.4 },
            }}
          >
            {/* Icon glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
            <Icon className="h-6 w-6 text-primary relative z-10" />
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {feature.description}
          </motion.p>

          {/* Animated corner accent */}
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-tl-full"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            variants={titleVariants}
          >
            Fonctionnalites{" "}
            <motion.span
              className="text-primary inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px hsl(var(--primary) / 0.5)",
              }}
            >
              Puissantes
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={titleVariants}
            transition={{ delay: 0.2 }}
          >
            Tous les outils necessaires pour transformer votre prospection
            commerciale
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
