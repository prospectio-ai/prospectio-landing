import { FileText, Sparkles, Search, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  step: string;
}

const steps: Step[] = [
  {
    icon: FileText,
    title: "Definissez vos criteres",
    description: "Renseignez votre profil, vos criteres de qualification.",
    step: "01",
  },
  {
    icon: Search,
    title: "Recherches d'offres recentes",
    description: "Identification des offres recentes et pertinentes.",
    step: "02",
  },
  {
    icon: Users,
    title: "Recherche de prospects",
    description: "Identification des prospects correspondant a vos criteres.",
    step: "03",
  },
  {
    icon: Sparkles,
    title: "Aide a la prospection par IA",
    description:
      "Personnalisation des messages et approches pour chaque prospect. Demandez conseil aupres de notre assistant IA integre.",
    step: "04",
  },
];

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
}

const StepCard = ({ step, index, totalSteps }: StepCardProps) => {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="inline-flex flex-col items-center">
        {/* Icon container with animations */}
        <div className="relative mb-6">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full gradient-accent"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={
              isInView
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />

          {/* Main icon circle */}
          <motion.div
            className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center shadow-medium z-10 relative"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px hsl(var(--primary) / 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={isInView ? { rotate: [0, 360] } : {}}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5,
              }}
              className="absolute inset-0 rounded-full border-2 border-white/20 border-dashed"
            />
            <Icon className="h-10 w-10 text-white relative z-10" />
          </motion.div>

          {/* Step number badge */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm text-primary z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: index * 0.2 + 0.3,
            }}
          >
            {step.step}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          className="text-2xl font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-muted-foreground max-w-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* Connecting line to next step (desktop only) */}
      {index < totalSteps - 1 && (
        <motion.div
          className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.2 + 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ originX: 0 }}
        >
          <div className="w-full h-full line-animated rounded-full" />
          {/* Arrow at the end */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + 1 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Comment ca{" "}
            <motion.span
              className="text-primary inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px hsl(var(--primary) / 0.5)",
              }}
            >
              marche
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Quatre etapes simples pour automatiser votre prospection commerciale
          </motion.p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
