import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/features/public/components/section-title";
export const faqData = [
  {
    id: "services",
    question: "What services does your agency provide?",
    answer:
      "We offer end-to-end digital services including brand strategy, UI/UX design, web and app development and growth-focused marketing solutions.",
  },
  {
    id: "startup-fit",
    question: "Do you work with startups or only large companies?",
    answer:
      "We work with startups, growing businesses and established brands. Our process is flexible and tailored to match your goals and scale.",
  },
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary by scope, but most projects take between 2-6 weeks. We provide a clear timeline after the discovery phase.",
  },
  {
    id: "support",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer maintenance, optimization and growth support packages to ensure your product continues to perform and evolve.",
  },
];

export function Faq() {
  return (
    <section className="py-20 2xl:py-32" id="faq">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          description="Everything you need to know about working with our agency. If you have more questions, feel free to reach out."
          heading="Frequently asked questions"
          title="FAQ"
        />

        <Accordion className="space-y-3" collapsible type="single">
          {faqData.map((faq, i) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              key={faq.id}
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
              <AccordionItem
                className="rounded-xl border border-border/60 bg-card/70 px-4"
                value={faq.id}
              >
                <AccordionTrigger className="py-4 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
