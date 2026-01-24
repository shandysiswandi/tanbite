"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Hero() {
  const trustedUserImages = [
    {
      id: "client-1",
      src: "/client-1.jpg",
    },
    {
      id: "client-2",
      src: "/client-2.jpg",
    },
    {
      id: "client-3",
      src: "/client-3.jpg",
    },
  ];

  const galleryStripImages = [
    {
      id: "gallery-1",
      src: "/gallery-1.jpg",
    },
    {
      id: "gallery-2",
      src: "/gallery-2.jpg",
    },
    {
      id: "gallery-3",
      src: "/gallery-3.jpg",
    },
  ];

  const trustedLogosText = [
    { id: "logo-startups", label: "Startups" },
    { id: "logo-scaleups", label: "Scale-ups" },
    { id: "logo-founders", label: "Founders" },
    { id: "logo-global-teams", label: "Global teams" },
    { id: "logo-creative-brands", label: "Creative brands" },
  ];

  return (
    <>
      <section className="relative z-10" id="home">
        <div className="mx-auto flex min-h-screen max-w-8xl items-center justify-center px-4 pt-32 max-md:w-screen max-md:overflow-hidden md:pt-26">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="text-left">
              <motion.a
                className="mb-6 inline-flex items-center justify-start gap-3 rounded-full border border-border/60 bg-card/70 py-1.5 pr-4 pl-3 backdrop-blur"
                href="/#"
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
                <AvatarGroup>
                  {trustedUserImages.map((image) => (
                    <Avatar key={image.id}>
                      <AvatarImage
                        alt={`Client ${image.id}`}
                        height={50}
                        src={image.src}
                        width={50}
                      />
                    </Avatar>
                  ))}
                </AvatarGroup>
                <span className="text-muted-foreground text-xs">
                  Trusted by brands & founders worldwide
                </span>
              </motion.a>

              <motion.h1
                className="mb-6 max-w-xl font-bold text-4xl leading-tight md:text-5xl"
                initial={{ y: 60, opacity: 0 }}
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
                We design & build <br />
                <span className="bg-linear-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                  high-impact digital experiences
                </span>
              </motion.h1>

              <motion.p
                className="mb-8 max-w-lg text-muted-foreground"
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
                A creative digital agency helping startups and businesses grow
                through thoughtful design, scalable development and
                performance-driven strategy.
              </motion.p>

              <motion.div
                className="mb-8 flex flex-col items-center gap-4 sm:flex-row"
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

                <Button asChild className="p-4" size="lg" variant="secondary">
                  <Link to="/services" viewTransition>
                    <Play className="size-4" />
                    View our services
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center overflow-hidden rounded-lg border border-border/60 bg-card/70 text-foreground text-sm max-sm:justify-center sm:inline-flex"
                initial={{ y: 60, opacity: 0 }}
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
                <div className="flex items-center gap-2 p-2 px-3 transition-colors hover:bg-muted/50 sm:px-6.5">
                  <Zap className="size-4 text-primary" />
                  <div>
                    <div>Strategy-led execution</div>
                    <div className="text-muted-foreground text-xs">
                      Focused on growth & results
                    </div>
                  </div>
                </div>

                <Separator className="hidden sm:block" orientation="vertical" />

                <div className="flex items-center gap-2 p-2 px-3 transition-colors hover:bg-muted/50 sm:px-6.5">
                  <Check className="size-4 text-primary" />
                  <div>
                    <div>Full-service delivery</div>
                    <div className="text-muted-foreground text-xs">
                      Design, dev & marketing
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: modern mockup card */}
            <motion.div
              className="mx-auto w-full max-w-lg"
              initial={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.5,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
            >
              <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/70 shadow-2xl">
                <div className="relative aspect-16/10 bg-muted/30">
                  <img
                    alt="agency-work-preview"
                    className="h-full w-full object-cover object-center"
                    height={663}
                    src="/main-image.webp"
                    width={994}
                  />

                  <Badge
                    className="absolute top-4 left-4 bg-background/70 text-foreground"
                    variant="secondary"
                  >
                    Branding • Web • Growth
                  </Badge>

                  <div className="absolute right-4 bottom-4">
                    <Button
                      className="rounded-full"
                      size="sm"
                      variant="secondary"
                    >
                      <Play className="size-4" />
                      <span className="text-xs">See case study</span>
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="mt-4 flex items-center justify-start gap-3">
                {galleryStripImages.map((image, i) => (
                  <motion.div
                    className="h-10 w-14 overflow-hidden rounded-lg border border-border/60 bg-card"
                    initial={{ y: 20, opacity: 0 }}
                    key={image.id}
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
                    <img
                      alt="project-thumbnail"
                      className="h-full w-full object-cover"
                      height={40}
                      src={image.src}
                      width={56}
                    />
                  </motion.div>
                ))}
                <motion.div
                  className="ml-2 flex items-center gap-2 text-muted-foreground text-sm"
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
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 duration-300" />

                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </div>
                  20+ completed projects
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <motion.section
        className="border-border/60 border-y bg-muted/10 max-md:mt-10"
        initial={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        viewport={{ once: true }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="w-full overflow-hidden py-6">
            <div className="flex min-w-max animate-marquee items-center justify-center gap-14 whitespace-nowrap">
              {trustedLogosText
                .concat(
                  trustedLogosText.map((logo) => ({
                    id: `${logo.id}-repeat`,
                    label: logo.label,
                  }))
                )
                .map((logo) => (
                  <span
                    className="mx-6 font-semibold text-muted-foreground text-sm tracking-wide transition-colors hover:text-foreground md:text-base"
                    key={logo.id}
                  >
                    {logo.label}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
