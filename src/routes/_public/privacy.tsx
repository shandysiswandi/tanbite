import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/features/public/components/section-title";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_public/privacy")({ head, component });

function head() {
  return {
    meta: seo({
      path: "/privacy",
      title: "Privacy Policy",
      description: "How TanBite collects, uses, and protects your information.",
    }),
  };
}

function component() {
  return (
    <section className="py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <SectionTitle
          align="left"
          description="This policy explains what data we collect, why we collect it, and how you can control it."
          heading="Privacy Policy"
          title="Legal"
        />

        <div className="space-y-8 text-muted-foreground">
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Information we collect
            </h2>
            <p>
              We collect information you provide directly, such as contact
              details and project requirements, along with basic usage data from
              your interactions with our website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              How we use information
            </h2>
            <p>
              We use your information to deliver services, respond to inquiries,
              improve our website, and communicate important updates. We do not
              sell your personal data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">Cookies</h2>
            <p>
              We use cookies and similar technologies to understand usage
              patterns and improve performance. You can control cookies through
              your browser settings.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Data retention
            </h2>
            <p>
              We retain information only as long as necessary to provide
              services or comply with legal obligations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Your rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              data by contacting us. We will respond in a reasonable timeframe.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Contact us
            </h2>
            <p>Questions about this policy? Reach us at support@tanbite.com.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
