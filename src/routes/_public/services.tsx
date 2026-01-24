import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/features/public/components/section-title";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_public/services")({ head, component });

function head() {
  return {
    meta: seo({
      path: "/services",
      title: "Services",
      description: "Strategy, design, and development services from TanBite.",
    }),
  };
}

function component() {
  return (
    <section className="py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <SectionTitle
          align="left"
          description="From strategy to launch, we help teams build products that scale."
          heading="Services"
          title="What we do"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 text-muted-foreground shadow-sm">
            <h2 className="font-semibold text-foreground text-lg">
              Discovery & Strategy
            </h2>
            <p className="mt-2 text-sm">
              Product positioning, user research, and roadmap definition to
              align teams and outcomes.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 text-muted-foreground shadow-sm">
            <h2 className="font-semibold text-foreground text-lg">
              Design & UX
            </h2>
            <p className="mt-2 text-sm">
              Brand systems, UX flows, and high-fidelity UI that feel polished
              and accessible.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 text-muted-foreground shadow-sm">
            <h2 className="font-semibold text-foreground text-lg">
              Development
            </h2>
            <p className="mt-2 text-sm">
              Scalable front-end and backend delivery with performance and
              reliability in mind.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 text-muted-foreground shadow-sm">
            <h2 className="font-semibold text-foreground text-lg">
              Growth & Optimization
            </h2>
            <p className="mt-2 text-sm">
              Continuous improvements, analytics, and experiments to keep
              results compounding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
