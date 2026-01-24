import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const Index = () => {
  const prefersReducedMotion = useReducedMotion();

  // Handle smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          // Update URL without scrolling
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [prefersReducedMotion]);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={prefersReducedMotion ? {} : pageVariants}
    >
      {/* Global page background gradient */}
      <div className="fixed inset-0 -z-20 bg-background" />

      {/* Animated background mesh */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 -z-10 opacity-30"
          style={{
            background: `
              radial-gradient(
                ellipse at 20% 20%,
                hsl(var(--primary) / 0.1) 0%,
                transparent 50%
              ),
              radial-gradient(
                ellipse at 80% 80%,
                hsl(var(--primary) / 0.08) 0%,
                transparent 50%
              )
            `,
          }}
          animate={{
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <CTA />
      </main>
      <Footer />

      {/* Scroll progress indicator */}
      {!prefersReducedMotion && <ScrollProgressIndicator />}
    </motion.div>
  );
};

// Scroll progress indicator component
const ScrollProgressIndicator = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
      style={{
        scaleX: 0,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
      // Use inline style for scroll progress
      ref={(el) => {
        if (!el) return;

        const updateProgress = () => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollTop / docHeight;
          el.style.transform = `scaleX(${progress})`;
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", updateProgress);
      }}
    />
  );
};

export default Index;
