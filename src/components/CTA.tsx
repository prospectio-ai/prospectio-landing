import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Magnetic effect for primary CTA button
  const magneticPrimary = useMagneticEffect({ strength: 0.2, maxDistance: 150 });
  const magneticSecondary = useMagneticEffect({ strength: 0.15, maxDistance: 100 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient blobs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Pret a booster votre{" "}
            <motion.span
              className="text-primary inline-block relative"
              whileHover={{
                scale: 1.05,
              }}
            >
              prospection
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ originX: 0 }}
              />
            </motion.span>
            ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Rejoignez les freelances qui automatisent leur prospection avec
            Prospectio.
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA with magnetic effect */}
            <motion.div
              ref={magneticPrimary.ref as React.RefObject<HTMLDivElement>}
              style={magneticPrimary.style}
              onMouseEnter={magneticPrimary.onMouseEnter}
              onMouseLeave={magneticPrimary.onMouseLeave}
              onMouseMove={magneticPrimary.onMouseMove}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="hero"
                size="lg"
                className="group shimmer-effect animate-pulse-glow relative overflow-hidden"
                onClick={() => (window.location.href = "https://dev.prospectio.fr")}
              >
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  Demarrer gratuitement
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            {/* Secondary CTA with magnetic effect */}
            <motion.div
              ref={magneticSecondary.ref as React.RefObject<HTMLDivElement>}
              style={magneticSecondary.style}
              onMouseEnter={magneticSecondary.onMouseEnter}
              onMouseLeave={magneticSecondary.onMouseLeave}
              onMouseMove={magneticSecondary.onMouseMove}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">
                  Reserver une demo (Bientot disponible)
                </span>
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-md"
                  initial={{
                    boxShadow: "inset 0 0 0 1px hsl(var(--border))",
                  }}
                  whileHover={{
                    boxShadow: "inset 0 0 0 2px hsl(var(--primary))",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground mt-6"
          >
            <motion.span
              className="inline-flex items-center gap-6 flex-wrap justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              {[
                "Sans engagement",
                "Essai gratuit 14 jours",
                "Aucune carte bancaire requise",
              ].map((text, index) => (
                <motion.span
                  key={index}
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="text-primary"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 1.3 + index * 0.1,
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.28l-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L6.75 9.19l3.97-3.97a.75.75 0 1 1 1.06 1.06z"
                    />
                  </motion.svg>
                  {text}
                </motion.span>
              ))}
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
