import { Link } from "@tanstack/react-router";
import { Menu, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RootNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", hash: "#" },
    { name: "Features", hash: "#features" },
    { name: "FAQ", hash: "#faq" },
  ];

  return (
    <motion.nav
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-5 right-0 left-0 z-50 px-4"
      initial={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between rounded-2xl border border-border/60 bg-background/80 p-3 shadow-sm backdrop-blur-md">
        <Link hash="#" to="/" viewTransition>
          <img
            alt="logo"
            className="h-8"
            height={32}
            src="/favicon-32x32.png"
            width={32}
          />
        </Link>

        <div className="hidden items-center gap-8 font-medium text-muted-foreground text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              className="transition hover:text-foreground"
              hash={link.hash}
              key={link.name}
              to="/"
              viewTransition
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="hidden p-4 sm:flex" variant="default">
            <Link to="/login" viewTransition>
              Get Started
            </Link>
          </Button>
        </div>

        <Button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="ghost"
        >
          <Menu className="size-6" />
        </Button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/80 font-medium text-foreground text-lg backdrop-blur-md transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {navLinks.map((link) => (
          <Link
            hash={link.hash}
            key={link.name}
            onClick={() => setIsOpen(false)}
            to="/"
            viewTransition
          >
            {link.name}
          </Link>
        ))}

        <Button asChild variant="default">
          <Link to="/login" viewTransition>
            Get Started
          </Link>
        </Button>

        <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost">
          <XCircle className="size-5" />
        </Button>
      </div>
    </motion.nav>
  );
}
