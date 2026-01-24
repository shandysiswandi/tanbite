import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTA() {
  return (
    <section className="px-4 py-20 2xl:pb-32">
      <div className="mx-auto max-w-6xl">
        <Card className="relative overflow-hidden rounded-3xl border-primary/20 p-12 text-center shadow-lg md:p-16">
          <div className="relative z-10 flex flex-col items-center">
            <motion.h2
              className="mb-6 text-balance font-semibold text-2xl text-foreground sm:text-4xl"
              initial={{ y: 60, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
              }}
              viewport={{ once: true }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Ready to grow your brand?
            </motion.h2>
            <motion.p
              className="mx-auto mb-10 max-w-xl text-muted-foreground max-sm:text-sm"
              initial={{ y: 60, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Partner with our agency to design, build and scale digital
              products that deliver real business results.
            </motion.p>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <Button asChild className="p-4" size="lg" variant="default">
                <Link to="/login" viewTransition>
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
