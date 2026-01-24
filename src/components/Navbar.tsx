import { Button } from "@/components/ui/button";
import logo from "@/assets/prospectio-logo.png";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Fonctionnalites" },
  { href: "#how-it-works", label: "Comment ca marche" },
  { href: "#benefits", label: "Avantages" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position for background transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navVariants = {
    initial: {
      backgroundColor: "hsl(var(--background) / 0)",
      backdropFilter: "blur(0px)",
      borderBottomColor: "hsl(var(--border) / 0)",
    },
    scrolled: {
      backgroundColor: "hsl(var(--background) / 0.85)",
      backdropFilter: "blur(20px)",
      borderBottomColor: "hsl(var(--border) / 1)",
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.nav
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className="fixed top-0 w-full border-b z-50"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <motion.img
              src={logo}
              alt="Prospectio Logo"
              className="h-14 w-14 -mt-4"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            />
            <span className="text-xl font-bold">Prospectio</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className="text-sm text-muted-foreground hover:text-foreground animated-underline transition-smooth"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-3"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "https://dev.prospectio.fr")}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Connexion</span>
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-md"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="hero"
                size="sm"
                onClick={() => (window.location.href = "https://dev.prospectio.fr")}
                className="shimmer-effect"
              >
                Essai gratuit
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
                className="block text-sm text-muted-foreground hover:text-foreground py-2 animated-underline transition-smooth"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "https://dev.prospectio.fr")}
                className="justify-start"
              >
                Connexion
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={() => (window.location.href = "https://dev.prospectio.fr")}
                className="shimmer-effect"
              >
                Essai gratuit
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
