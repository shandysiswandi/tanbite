import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionTitle } from "@/features/public/components/section-title";

export const plansData = [
  {
    id: "starter",
    name: "Starter",
    price: "$499",
    desc: "Best for early-stage startups.",
    credits: "One-time",
    features: [
      "Project discovery & planning",
      "UI/UX design",
      "Basic website development",
      "1 revision round",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Growth",
    price: "$1,499",
    desc: "Growing teams and businesses.",
    credits: "Monthly",
    features: [
      "Everything in Starter",
      "Advanced UI/UX design",
      "Custom development",
      "Performance optimization",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "ultra",
    name: "Scale",
    price: "$3,999",
    desc: "For brands ready to scale fast.",
    credits: "Custom",
    features: [
      "Everything in Growth",
      "Dedicated project manager",
      "Ongoing optimization",
      "Marketing & growth support",
      "Chat + Email support",
    ],
  },
];

export function Pricing() {
  return (
    <section
      className="border-border/60 border-t bg-muted/20 py-20"
      id="pricing"
    >
      <div className="mx-auto max-w-8xl px-4">
        <SectionTitle
          description="Flexible agency packages designed to fit startups, growing teams and established brands."
          heading="Simple, transparent pricing"
          title="Pricing"
        />

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {plansData.map((plan, i) => (
            <motion.div
              className="transition duration-500 hover:scale-102"
              initial={{ y: 150, opacity: 0 }}
              key={plan.id}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.1 + i * 0.1,
              }}
              viewport={{ once: true }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <Card
                className={`h-full border-border/60 bg-card/70 backdrop-blur ${
                  plan.popular ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {plan.popular ? (
                      <Badge variant="default">Most popular</Badge>
                    ) : null}
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="font-bold text-3xl text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      / {plan.credits}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.desc}</p>
                </CardHeader>

                <CardContent className="space-y-3">
                  {plan.features.map((feat) => (
                    <div
                      className="flex items-center gap-3 text-muted-foreground text-sm"
                      key={`${plan.id}-${feat}`}
                    >
                      <Check className="size-4 text-primary" />
                      {feat}
                    </div>
                  ))}
                </CardContent>

                <CardFooter>
                  {plan.popular ? (
                    <Button className="w-full" size="lg" variant="default">
                      Get started
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" variant="secondary">
                      Get started
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
