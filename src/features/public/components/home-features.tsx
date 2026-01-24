import { UploadIcon, VideoIcon, ZapIcon } from "lucide-react";
import { motion } from "motion/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionTitle } from "@/features/public/components/section-title";

export const featuresData = [
  {
    icon: UploadIcon,
    title: "Discovery & Planning",
    desc: "We understand your goals, audience and challenges to craft a clear, actionable strategy.",
  },
  {
    icon: ZapIcon,
    title: "Design & Development",
    desc: "High-quality design and scalable development focused on performance and usability.",
  },
  {
    icon: VideoIcon,
    title: "Launch & Growth",
    desc: "By combining agile launchesa and data-driven optimization, we create a powerful engine.",
  },
];
export function Features() {
  return (
    <section className="py-20 2xl:py-32" id="features">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          description="From strategy to execution, we help businesses build strong digital products and meaningful customer experiences."
          heading="Everything your brand needs to grow"
          title="Services"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuresData.map((feature, i) => (
            <motion.div
              className="transition duration-300 hover:-translate-y-1"
              initial={{ y: 100, opacity: 0 }}
              key={feature.title}
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
              <Card className="border-border/60 bg-card/60 shadow-sm backdrop-blur">
                <CardHeader className="gap-3">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon size={22} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
