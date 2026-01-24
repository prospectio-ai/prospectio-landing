import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: "2",
    numericValue: 2,
    suffix: "",
    label: "Base de donnees",
    description: "Offres d'emploi analysees",
  },
  {
    value: "5h",
    numericValue: 5,
    suffix: "h",
    label: "Gagnees par semaine",
    description: "En automatisation",
  },
  {
    value: "3x",
    numericValue: 3,
    suffix: "x",
    label: "Plus de reponses",
    description: "Qu'avec la prospection manuelle",
  },
  {
    value: "10+",
    numericValue: 10,
    suffix: "+",
    label: "Modeles d'IA",
    description: "A votre disposition",
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isInView: boolean;
}

const AnimatedCounter = ({ value, suffix, isInView }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
      });
      return controls.stop;
    }
  }, [count, value, isInView]);

  return (
    <motion.span className="text-5xl font-bold text-primary">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

interface StatCardProps {
  stat: Stat;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card className="border-border hover:shadow-soft transition-smooth text-center group relative overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ boxShadow: "inset 0 0 0 0 hsl(var(--primary) / 0)" }}
          whileHover={{
            boxShadow: "inset 0 0 0 2px hsl(var(--primary) / 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />

        <CardContent className="pt-8 pb-6 relative z-10">
          {/* Animated counter */}
          <motion.div
            className="mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: index * 0.15 + 0.3,
            }}
          >
            <AnimatedCounter
              value={stat.numericValue}
              suffix={stat.suffix}
              isInView={isInView}
            />
          </motion.div>

          {/* Label */}
          <motion.div
            className="text-lg font-semibold mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {stat.label}
          </motion.div>

          {/* Description */}
          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            {stat.description}
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/20 rounded-t-full"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1, backgroundColor: "hsl(var(--primary) / 0.5)" }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto relative z-10">
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
            Des resultats{" "}
            <motion.span
              className="text-primary inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px hsl(var(--primary) / 0.5)",
              }}
            >
              concrets
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Notre plateforme delivre des resultats mesurables pour accelerer
            votre croissance commerciale
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
