import { createFileRoute } from "@tanstack/react-router";
import { CTA } from "@/features/public/components/home-cta";
import { Faq } from "@/features/public/components/home-faq";
import { Features } from "@/features/public/components/home-features";
import { Hero } from "@/features/public/components/home-hero";
import RootNavbar from "@/features/public/components/root-navbar";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: seo({
      path: "/",
      title: "Home",
      description: "Description",
    }),
  }),
  component: () => (
    <>
      <RootNavbar />
      <Hero />
      <Features />
      <Faq />
      <CTA />
    </>
  ),
});
