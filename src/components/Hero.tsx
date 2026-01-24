import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax effect for the hero image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Text animation variants for staggered word reveal
  const headlineWords = ["Prospectez", "les"];
  const highlightedWords = ["bonnes", "personnes", "au", "bon", "moment"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.6,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      {/* Subtle gradient overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 gradient-hero -z-10"
      />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Animated headline with staggered word reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ perspective: "1000px" }}
            >
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}
              <br className="hidden sm:block" />
              <span className="text-primary">
                {highlightedWords.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-3"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Animated paragraph */}
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Prospectio vous aide a identifier et qualifier les personnes, a
              les contacter efficacement et de maniere personnalisee. Le tout au
              moment adequat pour maximiser vos chances de conversion.
            </motion.p>

            {/* Animated CTA button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="hero"
                size="lg"
                className="group shimmer-effect animate-pulse-glow"
                onClick={() => (window.location.href = "https://dev.prospectio.fr")}
              >
                Demarrer ma prospection{" "}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Floating hero image with parallax */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative animate-float"
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 gradient-accent blur-3xl opacity-20 rounded-3xl scale-110" />

              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-3xl animate-spin-slow" />

              <motion.img
                src={heroImage}
                alt="Professionnels collaborant"
                className="relative rounded-2xl shadow-medium w-full h-auto"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.4 },
                }}
              />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -left-4 top-1/4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">IA Active</span>
                </div>
              </motion.div>

              {/* Stats badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -right-4 bottom-1/4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-soft"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3x</div>
                  <div className="text-xs text-muted-foreground">Plus de reponses</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
