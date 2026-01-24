import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libraries/utils/tailwind";

interface SectionTitleProps {
  title?: string;
  heading?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  heading,
  description,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        align === "left" ? "items-start text-left" : "items-center text-center"
      )}
    >
      {title ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
          viewport={{ once: true }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          <Badge className="uppercase tracking-wide" variant="secondary">
            {title}
          </Badge>
        </motion.div>
      ) : null}
      {heading ? (
        <motion.h2
          className="text-balance font-semibold text-2xl text-foreground md:text-4xl"
          initial={{ y: 40, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 70,
            mass: 1,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          {heading}
        </motion.h2>
      ) : null}
      {description ? (
        <motion.p
          className="max-w-xl text-muted-foreground text-sm md:text-base"
          initial={{ y: 40, opacity: 0 }}
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
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
